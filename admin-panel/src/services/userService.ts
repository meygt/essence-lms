import api from './api';
// import { mockDataService } from './mockDataService';
import type { PaginatedResponse, PaginationParams, SearchParams } from '../types/api';
import type { User, UserRole, UserStatus } from '../types/user';

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  totalAdmins: number;
  recentUsers: number;
  userGrowthRate: number;
  studentGrowthRate?: number;
  quranStudents?: number;
  quranStudentGrowthRate?: number;
  certificatesIssued?: number;
  certificateGrowthRate?: number;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  status?: UserStatus;
}

class UserService {
  // Get user statistics
  async getUserStatistics(): Promise<UserStatistics> {
    try {
      const response = await api.get('/users/statistics');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user statistics:', error);
      // Return empty statistics instead of mock data
      return {
        totalUsers: 0,
        activeUsers: 0,
        totalStudents: 0,
        totalTeachers: 0,
        totalParents: 0,
        totalAdmins: 0,
        recentUsers: 0,
        userGrowthRate: 0,
        studentGrowthRate: 0,
        quranStudents: 0,
        quranStudentGrowthRate: 0,
        certificatesIssued: 0,
        certificateGrowthRate: 0,
      };
    }
  }

  // Get all users with pagination and filtering
  async getUsers(params: SearchParams & {
    role?: UserRole;
    status?: UserStatus;
  } = {}): Promise<PaginatedResponse<User>> {
    try {
      const response = await api.get('/users', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
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

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  // Create new user
  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await api.post('/users', userData);
    return response.data;
  }

  // Update user
  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  }

  // Delete user
  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  }

  // Search users
  async searchUsers(params: SearchParams & {
    role?: UserRole;
    status?: UserStatus;
  } = {}): Promise<PaginatedResponse<User>> {
    const response = await api.get('/users/search', { params });
    return response.data;
  }

  // Get users by role
  async getUsersByRole(role: UserRole, params: PaginationParams = {}): Promise<PaginatedResponse<User>> {
    const response = await api.get(`/users/role/${role}`, { params });
    return response.data;
  }

  // Get users by status
  async getUsersByStatus(status: UserStatus, params: PaginationParams = {}): Promise<PaginatedResponse<User>> {
    const response = await api.get(`/users/status/${status}`, { params });
    return response.data;
  }

  // Get active teachers
  async getActiveTeachers(params: PaginationParams = {}): Promise<PaginatedResponse<User>> {
    const response = await api.get('/users/active-teachers', { params });
    return response.data;
  }

  // Get active students
  async getActiveStudents(params: PaginationParams = {}): Promise<PaginatedResponse<User>> {
    const response = await api.get('/users/active-students', { params });
    return response.data;
  }

  // Get recent users
  async getRecentUsers(params: PaginationParams = {}): Promise<PaginatedResponse<User>> {
    const response = await api.get('/users/recent', { params });
    return response.data;
  }

  // Update user status
  async updateUserStatus(id: string, status: UserStatus): Promise<User> {
    const response = await api.patch(`/users/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  }

  // Update user password
  async updateUserPassword(id: string, newPassword: string): Promise<void> {
    await api.patch(`/users/${id}/password`, { newPassword });
  }

  // Get user profile
  async getUserProfile(): Promise<User> {
    const response = await api.get('/users/profile');
    return response.data;
  }

  // Update user profile
  async updateUserProfile(userData: UpdateUserRequest): Promise<User> {
    const response = await api.put('/users/profile', userData);
    return response.data;
  }
}

export const userService = new UserService();
export default userService;