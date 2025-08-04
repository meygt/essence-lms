import { useApi, usePaginatedApi, useApiMutation } from './useApi';
import activityService from '../services/activityService';
import type { Activity, ActivityStatistics } from '../services/activityService';
import type { SearchParams } from '../types/api';

// Hook for activity statistics
export function useActivityStatistics() {
  return useApi<ActivityStatistics>(
    () => activityService.getActivityStatistics(),
    { immediate: true }
  );
}

// Hook for paginated activities list
export function useActivities(params: SearchParams & {
  type?: string;
  userId?: string;
  courseId?: string;
  startDate?: string;
  endDate?: string;
} = {}) {
  return usePaginatedApi(
    (apiParams) => activityService.getActivities({ ...params, ...apiParams }),
    params,
    { immediate: true }
  );
}

// Hook for single activity
export function useActivity(id: string, enabled: boolean = true) {
  return useApi<Activity>(
    () => activityService.getActivityById(id),
    { immediate: enabled }
  );
}

// Hook for recent activities
export function useRecentActivities(limit: number = 10) {
  return useApi<Activity[]>(
    () => activityService.getRecentActivities(limit),
    { immediate: true }
  );
}

// Hook for activities by type
export function useActivitiesByType(type: string) {
  return usePaginatedApi(
    (params) => activityService.getActivitiesByType(type, params),
    {},
    { immediate: true }
  );
}

// Hook for activities by user
export function useActivitiesByUser(userId: string) {
  return usePaginatedApi(
    (params) => activityService.getActivitiesByUser(userId, params),
    {},
    { immediate: true }
  );
}

// Hook for activities by course
export function useActivitiesByCourse(courseId: string) {
  return usePaginatedApi(
    (params) => activityService.getActivitiesByCourse(courseId, params),
    {},
    { immediate: true }
  );
}

// Hook for activities by date range
export function useActivitiesByDateRange(startDate: string, endDate: string) {
  return usePaginatedApi(
    (params) => activityService.getActivitiesByDateRange(startDate, endDate, params),
    {},
    { immediate: true }
  );
}

// Hook for today's activities
export function useTodayActivities() {
  return usePaginatedApi(
    (params) => activityService.getTodayActivities(params),
    {},
    { immediate: true }
  );
}

// Hook for searching activities
export function useSearchActivities(params: SearchParams & {
  type?: string;
  userId?: string;
  courseId?: string;
  startDate?: string;
  endDate?: string;
} = {}) {
  return usePaginatedApi(
    (apiParams) => activityService.searchActivities({ ...params, ...apiParams }),
    params,
    { immediate: false }
  );
}

// Hook for creating activity
export function useCreateActivity() {
  return useApiMutation<Activity, Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>>(
    (activityData) => activityService.createActivity(activityData)
  );
}

// Hook for deleting activity
export function useDeleteActivity() {
  return useApiMutation<void, string>(
    (id) => activityService.deleteActivity(id)
  );
}

// Hook for bulk deleting activities
export function useBulkDeleteActivities() {
  return useApiMutation<void, string[]>(
    (ids) => activityService.bulkDeleteActivities(ids)
  );
}

// Hook for clearing old activities
export function useClearOldActivities() {
  return useApiMutation<void, number>(
    (olderThanDays) => activityService.clearOldActivities(olderThanDays)
  );
}