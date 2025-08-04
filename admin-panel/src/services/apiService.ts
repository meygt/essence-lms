// API Service for backend communication

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        throw new Error('Authentication required');
      }
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  // Authentication endpoints
  async login(email: string, password: string) {
    return this.post('/auth/login', { email, password });
  }

  async register(userData: Record<string, unknown>) {
    return this.post('/auth/register', userData);
  }

  async refreshToken(refreshToken: string) {
    return this.post('/auth/refresh', { refreshToken });
  }

  async logout() {
    return this.post('/auth/logout');
  }

  // Analytics endpoints
  async getAnalytics() {
    return this.get('/analytics/dashboard');
  }

  // User management endpoints
  async getUsers(page = 0, size = 10, search = '') {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(search && { search }),
    });
    return this.get(`/users?${params}`);
  }

  async getUserById(id: string) {
    return this.get(`/users/${id}`);
  }

  async createUser(userData: Record<string, unknown>) {
    return this.post('/users', userData);
  }

  async updateUser(id: string, userData: Record<string, unknown>) {
    return this.put(`/users/${id}`, userData);
  }

  async deleteUser(id: string) {
    return this.delete(`/users/${id}`);
  }

  // Course management endpoints
  async getCourses(page = 0, size = 10, search = '') {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(search && { search }),
    });
    return this.get(`/courses?${params}`);
  }

  async getCourseById(id: string) {
    return this.get(`/courses/${id}`);
  }

  async createCourse(courseData: Record<string, unknown>) {
    return this.post('/courses', courseData);
  }

  async updateCourse(id: string, courseData: Record<string, unknown>) {
    return this.put(`/courses/${id}`, courseData);
  }

  async deleteCourse(id: string) {
    return this.delete(`/courses/${id}`);
  }

  // Payment endpoints
  async getPayments(page = 0, size = 10, search = '') {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(search && { search }),
    });
    return this.get(`/payments?${params}`);
  }

  // Calendar endpoints
  async getCalendarEvents(start?: string, end?: string) {
    const params = new URLSearchParams();
    if (start) params.append('start', start);
    if (end) params.append('end', end);
    return this.get(`/calendar/events?${params}`);
  }

  async createCalendarEvent(eventData: Record<string, unknown>) {
    return this.post('/calendar/events', eventData);
  }

  async updateCalendarEvent(id: string, eventData: Record<string, unknown>) {
    return this.put(`/calendar/events/${id}`, eventData);
  }

  async deleteCalendarEvent(id: string) {
    return this.delete(`/calendar/events/${id}`);
  }
}

export const apiService = new ApiService();
export default apiService;