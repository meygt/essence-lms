import { useApi, usePaginatedApi, useApiMutation } from './useApi';
import courseService from '../services/courseService';
import type { CourseStatistics, CreateCourseRequest, UpdateCourseRequest, CourseProgress } from '../services/courseService';
import type { Course } from '../types/course';
import { CourseStatus, CourseLevel } from '../types/course';
import type { SearchParams } from '../types/api';

// Hook for course statistics
export function useCourseStatistics() {
  return useApi<CourseStatistics>(
    () => courseService.getCourseStatistics(),
    { immediate: true }
  );
}

// Hook for paginated courses list
export function useCourses(params: SearchParams & {
  status?: CourseStatus;
  level?: CourseLevel;
  teacherId?: string;
  minPrice?: number;
  maxPrice?: number;
} = {}) {
  return usePaginatedApi(
    (apiParams) => courseService.getCourses({ ...params, ...apiParams }),
    params,
    { immediate: true }
  );
}

// Hook for single course
export function useCourse(id: string, enabled: boolean = true) {
  return useApi<Course>(
    () => courseService.getCourseById(id),
    { immediate: enabled }
  );
}

// Hook for creating course
export function useCreateCourse() {
  return useApiMutation<Course, CreateCourseRequest>(
    (courseData) => courseService.createCourse(courseData)
  );
}

// Hook for updating course
export function useUpdateCourse() {
  return useApiMutation<Course, { id: string; data: UpdateCourseRequest }>(
    ({ id, data }) => courseService.updateCourse(id, data)
  );
}

// Hook for deleting course
export function useDeleteCourse() {
  return useApiMutation<void, string>(
    (id) => courseService.deleteCourse(id)
  );
}

// Hook for searching courses
export function useSearchCourses(params: SearchParams & {
  status?: CourseStatus;
  level?: CourseLevel;
  teacherId?: string;
  minPrice?: number;
  maxPrice?: number;
} = {}) {
  return usePaginatedApi(
    (apiParams) => courseService.searchCourses({ ...params, ...apiParams }),
    params,
    { immediate: false }
  );
}

// Hook for courses by status
export function useCoursesByStatus(status: CourseStatus) {
  return usePaginatedApi(
    (params) => courseService.getCoursesByStatus(status, params),
    {},
    { immediate: true }
  );
}

// Hook for courses by level
export function useCoursesByLevel(level: CourseLevel) {
  return usePaginatedApi(
    (params) => courseService.getCoursesByLevel(level, params),
    {},
    { immediate: true }
  );
}

// Hook for courses by teacher
export function useCoursesByTeacher(teacherId: string) {
  return usePaginatedApi(
    (params) => courseService.getCoursesByTeacher(teacherId, params),
    {},
    { immediate: true }
  );
}

// Hook for courses by student
export function useCoursesByStudent(studentId: string) {
  return usePaginatedApi(
    (params) => courseService.getCoursesByStudent(studentId, params),
    {},
    { immediate: true }
  );
}

// Hook for published courses
export function usePublishedCourses() {
  return usePaginatedApi(
    (params) => courseService.getPublishedCourses(params),
    {},
    { immediate: true }
  );
}

// Hook for recent courses
export function useRecentCourses() {
  return usePaginatedApi(
    (params) => courseService.getRecentCourses(params),
    {},
    { immediate: true }
  );
}

// Hook for popular courses
export function usePopularCourses() {
  return usePaginatedApi(
    (params) => courseService.getPopularCourses(params),
    {},
    { immediate: true }
  );
}

// Hook for updating course status
export function useUpdateCourseStatus() {
  return useApiMutation<Course, { id: string; status: CourseStatus }>(
    ({ id, status }) => courseService.updateCourseStatus(id, status)
  );
}

// Hook for publishing course
export function usePublishCourse() {
  return useApiMutation<Course, string>(
    (id) => courseService.publishCourse(id)
  );
}

// Hook for unpublishing course
export function useUnpublishCourse() {
  return useApiMutation<Course, string>(
    (id) => courseService.unpublishCourse(id)
  );
}

// Hook for archiving course
export function useArchiveCourse() {
  return useApiMutation<Course, string>(
    (id) => courseService.archiveCourse(id)
  );
}

// Hook for course progress
export function useCourseProgress() {
  return useApi<CourseProgress[]>(
    () => courseService.getCourseProgress(),
    { immediate: true }
  );
}

// Hook for course enrollments
export function useCourseEnrollments(courseId: string) {
  return usePaginatedApi(
    (params) => courseService.getCourseEnrollments(courseId, params),
    {},
    { immediate: true }
  );
}

// Hook for checking user access to course
export function useCheckCourseAccess() {
  return useApiMutation<boolean, { courseId: string; userId: string }>(
    ({ courseId, userId }) => courseService.checkUserAccess(courseId, userId)
  );
}