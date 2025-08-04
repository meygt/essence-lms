import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import type { PaginatedResponse } from '../types/api';

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseApiOptions<T = unknown> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error | null) => void;
}

// Generic hook for API calls
export function useApi<T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiState<T> {
  const { immediate = true, onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(getErrorMessage(err));
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return {
    data,
    loading,
    error: error ? error.message : null,
    refetch: fetchData,
  };
}

// Hook for API mutations (POST, PUT, DELETE)
export function useApiMutation<T, P = unknown>(
  apiCall: (params: P) => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const { onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (params: P) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(params);
      setData(result);
      onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(getErrorMessage(err));
      setError(error);
      onError?.(error);
      throw err;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSuccess, onError]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error: error ? error.message : null,
    mutate,
    reset,
  };
}

// Hook for paginated API calls
export function usePaginatedApi<T>(
  apiCall: (params: Record<string, unknown>) => Promise<PaginatedResponse<T>>,
  initialParams: Record<string, unknown> = {},
  options: UseApiOptions<PaginatedResponse<T>> = {}
) {
  const { immediate = true, onSuccess, onError } = options;
  const [data, setData] = useState<T[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);
  const [params, setParams] = useState<Record<string, unknown>>(initialParams);

  const fetchData = useCallback(async (newParams?: Record<string, unknown>) => {
    try {
      setLoading(true);
      setError(null);
      const finalParams = { ...params, ...newParams };
      const result = await apiCall(finalParams);
      setData(result.content);
      setTotalElements(result.totalElements);
      setTotalPages(result.totalPages);
      setCurrentPage(result.number);
      setPageSize(result.size);
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(getErrorMessage(err));
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  const updateParams = useCallback((newParams: Record<string, unknown>) => {
    setParams(prev => ({ ...prev, ...newParams }));
    fetchData(newParams);
  }, [fetchData]);

  const goToPage = useCallback((page: number) => {
    updateParams({ page });
  }, [updateParams]);

  const changePageSize = useCallback((size: number) => {
    updateParams({ size, page: 0 });
  }, [updateParams]);

  return {
    data,
    totalElements,
    totalPages,
    currentPage,
    pageSize,
    loading,
    error: error ? error.message : null,
    refetch: fetchData,
    updateParams,
    goToPage,
    changePageSize,
  };
}

// Utility function to extract error messages
function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    if (error.message) {
      return error.message;
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}

export { getErrorMessage };