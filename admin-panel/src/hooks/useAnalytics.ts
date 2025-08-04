import { useApi } from './useApi';
import type { User } from '../types/user';

interface AnalyticsData {
  totalRevenue: number;
  totalStudents: number;
  totalCourses: number;
  totalPayments: number;
  revenueGrowth: number;
  studentGrowth: number;
  courseGrowth: number;
  paymentGrowth: number;
  // Admin specific
  courses: Array<{
    id: string;
    title: string;
    students: number;
    revenue: number;
  }>;
  topCourses: Array<{
    id: string;
    title: string;
    students: number;
    revenue: number;
  }>;
  topStudents: Array<{
    id: string;
    name: string;
    email: string;
    coursesCompleted: number;
    totalSpent: number;
  }>;
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user: User;
  }>;
  // Teacher specific
  myStudents: number;
  activeStudents: number;
  myCourses: number;
  totalAssignments: number;
  assignmentGrowth: number;
  avgCompletionRate: number;
  completionGrowth: number;
  myCoursesList: Array<{
    id: string;
    title: string;
    students: number;
    completionRate: number;
    revenue: number;
  }>;
  myTopStudents: Array<{
    id: string;
    name: string;
    email: string;
    progress: number;
    lastActivity: string;
  }>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
  }>;
  courseEnrollments: Array<{
    month: string;
    enrollments: number;
  }>;
}

// Analytics service with API integration
const analyticsService = {
  getAnalytics: async (): Promise<AnalyticsData> => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${baseUrl}/analytics/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Return empty analytics when backend is not available
      return {
        totalRevenue: 0,
        totalStudents: 0,
        totalCourses: 0,
        totalPayments: 0,
        revenueGrowth: 0,
        studentGrowth: 0,
        courseGrowth: 0,
        paymentGrowth: 0,
        courses: [],
        topCourses: [],
        topStudents: [],
        recentActivities: [],
        myStudents: 0,
        activeStudents: 0,
        myCourses: 0,
        totalAssignments: 0,
        assignmentGrowth: 0,
        avgCompletionRate: 0,
        completionGrowth: 0,
        myCoursesList: [],
        myTopStudents: [],
        monthlyRevenue: [],
        courseEnrollments: []
      };
    }
  }
};

// Hook for analytics data
export function useAnalytics() {
  return useApi<AnalyticsData>(
    () => analyticsService.getAnalytics(),
    { immediate: true }
  );
}

export type { AnalyticsData };