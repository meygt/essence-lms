import { useApi, usePaginatedApi, useApiMutation } from './useApi';
import userService from '../services/userService';
import type { UserStatistics, CreateUserRequest, UpdateUserRequest } from '../services/userService';
import type { User } from '../types/user';
import { UserRole, UserStatus } from '../types/user';
import type { SearchParams } from '../types/api';

// Hook for user statistics
export function useUserStatistics() {
  return useApi<UserStatistics>(
    () => userService.getUserStatistics(),
    { immediate: true }
  );
}

// Hook for paginated users list
export function useUsers(params: SearchParams & {
  role?: UserRole;
  status?: UserStatus;
} = {}) {
  return usePaginatedApi(
    (apiParams) => userService.getUsers({ ...params, ...apiParams }),
    params,
    { immediate: true }
  );
}

// Hook for single user
export function useUser(id: string, enabled: boolean = true) {
  return useApi<User>(
    () => userService.getUserById(id),
    { immediate: enabled }
  );
}

// Hook for creating user
export function useCreateUser() {
  return useApiMutation<User, CreateUserRequest>(
    (userData) => userService.createUser(userData)
  );
}

// Hook for updating user
export function useUpdateUser() {
  return useApiMutation<User, { id: string; data: UpdateUserRequest }>(
    ({ id, data }) => userService.updateUser(id, data)
  );
}

// Hook for deleting user
export function useDeleteUser() {
  return useApiMutation<void, string>(
    (id) => userService.deleteUser(id)
  );
}

// Hook for searching users
export function useSearchUsers(params: SearchParams & {
  role?: UserRole;
  status?: UserStatus;
} = {}) {
  return usePaginatedApi(
    (apiParams) => userService.searchUsers({ ...params, ...apiParams }),
    params,
    { immediate: false }
  );
}

// Hook for users by role
export function useUsersByRole(role: UserRole) {
  return usePaginatedApi(
    (params) => userService.getUsersByRole(role, params),
    {},
    { immediate: true }
  );
}

// Hook for users by status
export function useUsersByStatus(status: UserStatus) {
  return usePaginatedApi(
    (params) => userService.getUsersByStatus(status, params),
    {},
    { immediate: true }
  );
}

// Hook for active teachers
export function useActiveTeachers() {
  return usePaginatedApi(
    (params) => userService.getActiveTeachers(params),
    {},
    { immediate: true }
  );
}

// Hook for active students
export function useActiveStudents() {
  return usePaginatedApi(
    (params) => userService.getActiveStudents(params),
    {},
    { immediate: true }
  );
}

// Hook for recent users
export function useRecentUsers() {
  return usePaginatedApi(
    (params) => userService.getRecentUsers(params),
    {},
    { immediate: true }
  );
}

// Hook for updating user status
export function useUpdateUserStatus() {
  return useApiMutation<User, { id: string; status: UserStatus }>(
    ({ id, status }) => userService.updateUserStatus(id, status)
  );
}

// Hook for updating user password
export function useUpdateUserPassword() {
  return useApiMutation<void, { id: string; newPassword: string }>(
    ({ id, newPassword }) => userService.updateUserPassword(id, newPassword)
  );
}

// Hook for user profile
export function useUserProfile() {
  return useApi<User>(
    () => userService.getUserProfile(),
    { immediate: true }
  );
}

// Hook for updating user profile
export function useUpdateUserProfile() {
  return useApiMutation<User, UpdateUserRequest>(
    (userData) => userService.updateUserProfile(userData)
  );
}