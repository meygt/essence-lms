import api from './api';
// import { mockDataService } from './mockDataService';
import type { ApiResponse } from './api';
import type { PaginatedResponse, SearchParams } from '../types/api';

export interface Activity {
  id: string;
  type: 'USER_REGISTRATION' | 'PAYMENT_RECEIVED' | 'COURSE_PUBLISHED' | 'ASSIGNMENT_CREATED' | 'SYSTEM_BACKUP' | 'USER_LOGIN' | 'COURSE_ENROLLMENT' | 'CERTIFICATE_ISSUED';
  description: string;
  userId?: string;
  userName?: string;
  courseId?: string;
  courseName?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityStatistics {
  totalActivities: number;
  todayActivities: number;
  weeklyActivities: number;
  monthlyActivities: number;
  activitiesByType: Record<string, number>;
  recentActivities: Activity[];
}

class ActivityService {
  // Get activity statistics
  async getActivityStatistics(): Promise<ActivityStatistics> {
    try {
      const response = await api.get<ApiResponse<ActivityStatistics>>('/api/activities/statistics');
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch activity statistics:', error);
      // Return empty statistics instead of mock data
      return {
        totalActivities: 0,
        todayActivities: 0,
        weeklyActivities: 0,
        monthlyActivities: 0,
        activitiesByType: {},
        recentActivities: [],
      };
    }
  }

  // Get all activities with pagination
  async getActivities(params: SearchParams & {
    type?: string;
    userId?: string;
    courseId?: string;
    startDate?: string;
    endDate?: string;
  } = {}): Promise<PaginatedResponse<Activity>> {
    try {
      const response = await api.get<PaginatedResponse<Activity>>('/api/activities', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      // Return empty paginated response instead of mock data
      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: 10,
        number: 0,
        first: true,
        last: true,
        numberOfElements: 0,
        empty: true,
      };
    }
  }

  // Get activity by ID
  async getActivityById(id: string): Promise<Activity> {
    const response = await api.get<ApiResponse<Activity>>(`/api/activities/${id}`);
    return response.data.data;
  }

  // Get recent activities
  async getRecentActivities(limit: number = 10): Promise<Activity[]> {
    try {
      const response = await api.get<ApiResponse<Activity[]>>('/api/activities/recent', {
        params: { limit }
      });
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch recent activities:', error);
      // Return empty array instead of mock data
      return [];
    }
  }

  // Get activities by type
  async getActivitiesByType(type: string, params: SearchParams = {}): Promise<PaginatedResponse<Activity>> {
    const response = await api.get<PaginatedResponse<Activity>>(`/api/activities/type/${type}`, { params });
    return response.data;
  }

  // Get activities by user
  async getActivitiesByUser(userId: string, params: SearchParams = {}): Promise<PaginatedResponse<Activity>> {
    const response = await api.get<PaginatedResponse<Activity>>(`/api/activities/user/${userId}`, { params });
    return response.data;
  }

  // Get activities by course
  async getActivitiesByCourse(courseId: string, params: SearchParams = {}): Promise<PaginatedResponse<Activity>> {
    const response = await api.get<PaginatedResponse<Activity>>(`/api/activities/course/${courseId}`, { params });
    return response.data;
  }

  // Get activities by date range
  async getActivitiesByDateRange(startDate: string, endDate: string, params: SearchParams = {}): Promise<PaginatedResponse<Activity>> {
    const response = await api.get<PaginatedResponse<Activity>>('/api/activities/date-range', {
      params: { startDate, endDate, ...params }
    });
    return response.data;
  }

  // Get today's activities
  async getTodayActivities(params: SearchParams = {}): Promise<PaginatedResponse<Activity>> {
    const response = await api.get<PaginatedResponse<Activity>>('/api/activities/today', { params });
    return response.data;
  }

  // Search activities
  async searchActivities(params: SearchParams & {
    type?: string;
    userId?: string;
    courseId?: string;
    startDate?: string;
    endDate?: string;
  } = {}): Promise<PaginatedResponse<Activity>> {
    const response = await api.get<PaginatedResponse<Activity>>('/api/activities/search', { params });
    return response.data;
  }

  // Create activity log (usually done by system)
  async createActivity(activityData: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>): Promise<Activity> {
    const response = await api.post<ApiResponse<Activity>>('/api/activities', activityData);
    return response.data.data;
  }

  // Delete activity (admin only)
  async deleteActivity(id: string): Promise<void> {
    await api.delete(`/api/activities/${id}`);
  }

  // Bulk delete activities (admin only)
  async bulkDeleteActivities(ids: string[]): Promise<void> {
    await api.delete('/api/activities/bulk', { data: { ids } });
  }

  // Clear old activities (admin only)
  async clearOldActivities(olderThanDays: number): Promise<void> {
    await api.delete('/api/activities/clear-old', {
      params: { olderThanDays }
    });
  }
}

export default new ActivityService();