import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens but don't force redirect here
      // Let the auth context handle the redirect properly
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('adminPanelUser');
      // Don't use window.location.href as it breaks React Router
      // The AuthGuard will handle the redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Common API parameters