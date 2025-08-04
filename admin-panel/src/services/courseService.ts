import api from './api';
// import { mockDataService } from './mockDataService';
import type { PaginatedResponse, SearchParams, PaginationParams } from '../types/api';
import type { Course, Enrollment } from '../types/course';
import { CourseStatus, CourseLevel } from '../types/course';

export interface CourseStatistics {
  totalCourses: number;
  activeCourses: number;
  publishedCourses: number;
  draftCourses: number;
  totalEnrollments: number;
  averageCompletionRate: number;
  averageRating: number;
  recentCourses: number;
  courseGrowthRate: number;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  shortDescription?: string;
  level: CourseLevel;
  price: number;
  duration: number; // in hours
  maxStudents?: number;
  prerequisites?: string[];
  learningObjectives?: string[];
  syllabus?: string;
  thumbnail?: string;
  teacherId: string;
}

export interface UpdateCourseRequest {
  title?: string;
  description?: string;
  shortDescription?: string;
  level?: CourseLevel;
  price?: number;
  duration?: number;
  maxStudents?: number;
  prerequisites?: string[];
  learningObjectives?: string[];
  syllabus?: string;
  thumbnail?: string;
  status?: CourseStatus;
}

export interface CourseProgress {
  courseId: string;
  courseName: string;
  totalStudents: number;
  completedStudents: number;
  averageProgress: number;
  completionRate: number;
  averageRating: number;
  totalRatings: number;
}

class CourseService {
  // Get course statistics
  async getCourseStatistics(): Promise<CourseStatistics> {
    try {
      const response = await api.get('/courses/statistics');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch course statistics:', error);
      // Return empty statistics instead of mock data
      return {
        totalCourses: 0,
        activeCourses: 0,
        publishedCourses: 0,
        draftCourses: 0,
        totalEnrollments: 0,
        averageCompletionRate: 0,
        averageRating: 0,
        recentCourses: 0,
        courseGrowthRate: 0,
      };
    }
  }

  // Get all courses with pagination and filtering
  async getCourses(params: SearchParams & {
    status?: CourseStatus;
    level?: CourseLevel;
    teacherId?: string;
    minPrice?: number;
    maxPrice?: number;
  } = {}): Promise<PaginatedResponse<Course>> {
    try {
      const response = await api.get('/courses', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch courses:', error);
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

  // Get course by ID
  async getCourseById(id: string): Promise<Course> {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  }

  // Create new course
  async createCourse(courseData: CreateCourseRequest): Promise<Course> {
    const response = await api.post('/courses', courseData);
    return response.data;
  }

  // Update course
  async updateCourse(id: string, courseData: UpdateCourseRequest): Promise<Course> {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  }

  // Delete course
  async deleteCourse(id: string): Promise<void> {
    await api.delete(`/courses/${id}`);
  }

  // Search courses
  async searchCourses(params: SearchParams & {
    status?: CourseStatus;
    level?: CourseLevel;
    teacherId?: string;
    minPrice?: number;
    maxPrice?: number;
  } = {}): Promise<PaginatedResponse<Course>> {
    const response = await api.get('/courses/search', { params });
    return response.data;
  }

  // Get courses by status
  async getCoursesByStatus(status: CourseStatus, params: PaginationParams = {}): Promise<PaginatedResponse<Course>> {
    const response = await api.get(`/courses/status/${status}`, { params });
    return response.data;
  }

  // Get courses by level
  async getCoursesByLevel(level: CourseLevel, params: PaginationParams = {}): Promise<PaginatedResponse<Course>> {
    const response = await api.get(`/courses/level/${level}`, { params });
    return response.data;
  }

  // Get courses by teacher
  async getCoursesByTeacher(teacherId: string, params: PaginationParams = {}): Promise<PaginatedResponse<Course>> {
    const response = await api.get(`/courses/teacher/${teacherId}`, { params });
    return response.data;
  }

  // Get courses by student
  async getCoursesByStudent(studentId: string, params: PaginationParams = {}): Promise<PaginatedResponse<Course>> {
    const response = await api.get(`/courses/student/${studentId}`, { params });
    return response.data;
  }

  // Get published courses
  async getPublishedCourses(params: PaginationParams = {}): Promise<PaginatedResponse<Course>> {
    const response = await api.get('/courses/published', { params });
    return response.data;
  }

  // Get recent courses
  async getRecentCourses(params: PaginationParams = {}): Promise<PaginatedResponse<Course>> {
    const response = await api.get('/courses/recent', { params });
    return response.data;
  }

  // Get popular courses
  async getPopularCourses(params: PaginationParams = {}): Promise<PaginatedResponse<Course>> {
    const response = await api.get('/courses/popular', { params });
    return response.data;
  }

  // Update course status
  async updateCourseStatus(id: string, status: CourseStatus): Promise<Course> {
    const response = await api.patch(`/courses/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  }

  // Publish course
  async publishCourse(id: string): Promise<Course> {
    const response = await api.patch(`/courses/${id}/publish`);
    return response.data;
  }

  // Unpublish course
  async unpublishCourse(id: string): Promise<Course> {
    const response = await api.patch(`/courses/${id}/unpublish`);
    return response.data;
  }

  // Archive course
  async archiveCourse(id: string): Promise<Course> {
    const response = await api.patch(`/courses/${id}/archive`);
    return response.data;
  }

  // Get course progress
  async getCourseProgress(params: PaginationParams = {}): Promise<CourseProgress[]> {
    try {
      const response = await api.get('/courses/progress', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch course progress:', error);
      // Return empty array instead of mock data
      return [];
    }
  }

  // Get course enrollments
  async getCourseEnrollments(courseId: string, params: PaginationParams = {}): Promise<PaginatedResponse<Enrollment>> {
    const response = await api.get(`/courses/${courseId}/enrollments`, { params });
    return response.data;
  }

  // Check user access to course
  async checkUserAccess(courseId: string, userId: string): Promise<boolean> {
    const response = await api.get(`/courses/${courseId}/access/${userId}`);
    return response.data;
  }
}

export const courseService = new CourseService();
export default courseService;