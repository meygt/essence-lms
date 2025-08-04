import api from './api';
import type { User } from '../types/user';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'STUDENT' | 'TEACHER' | 'PARENT';
  phoneNumber?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ConfirmResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

class AuthService {


  // Check if email is a test account
  private isTestAccount(email: string): boolean {
    const testEmails = ['admin@lms.com', 'teacher@lms.com', 'student@lms.com', 'parent@lms.com'];
    return testEmails.includes(email);
  }

  private getTestAccountByEmail(email: string): User | null {
    const testAccounts: Record<string, User> = {
      'admin@lms.com': {
        id: 'admin-001',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@lms.com',
        role: 'ADMIN',
        status: 'ACTIVE',
        phoneNumber: '+1234567890',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'teacher@lms.com': {
        id: 'teacher-001',
        firstName: 'Teacher',
        lastName: 'User',
        email: 'teacher@lms.com',
        role: 'TEACHER',
        status: 'ACTIVE',
        phoneNumber: '+1234567891',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'student@lms.com': {
        id: 'student-001',
        firstName: 'Student',
        lastName: 'User',
        email: 'student@lms.com',
        role: 'STUDENT',
        status: 'ACTIVE',
        phoneNumber: '+1234567892',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'parent@lms.com': {
        id: 'parent-001',
        firstName: 'Parent',
        lastName: 'User',
        email: 'parent@lms.com',
        role: 'PARENT',
        status: 'ACTIVE',
        phoneNumber: '+1234567893',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
    return testAccounts[email] || null;
  }

  // Generate mock token for test accounts
  private generateMockToken(user: User): string {
    return `mock_token_${user.id}_${Date.now()}`;
  }

  // Login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // For all accounts, try real API first
      const response = await api.post('/auth/login', credentials);
      
      // Handle the new backend response format
      if (response.data.success) {
        const { token, refreshToken, user } = response.data;
        
        // Store tokens based on rememberMe preference
        const storage = credentials.rememberMe ? localStorage : sessionStorage;
        storage.setItem('authToken', token);
        storage.setItem('refreshToken', refreshToken);
        storage.setItem('adminPanelUser', JSON.stringify(user));
        storage.setItem('rememberMe', credentials.rememberMe ? 'true' : 'false');
        
        // Clear from the other storage type
        const otherStorage = credentials.rememberMe ? sessionStorage : localStorage;
        otherStorage.removeItem('authToken');
        otherStorage.removeItem('refreshToken');
        otherStorage.removeItem('adminPanelUser');
        otherStorage.removeItem('rememberMe');
        otherStorage.removeItem('isTestAccount');
        
        return {
          user,
          token,
          refreshToken
        };
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (apiError) {
      console.warn('API login failed, trying test accounts:', apiError);
      
      // Fallback to test accounts if API fails
      if (this.isTestAccount(credentials.email)) {
        const testUser = this.getTestAccountByEmail(credentials.email);
        if (!testUser) {
          throw new Error('Test account not found');
        }
        
        // Validate password for test accounts - all test accounts use 'admin123'
        if (credentials.password !== 'admin123') {
          throw new Error('Invalid email or password');
        }
        
        const mockToken = this.generateMockToken(testUser);
        
        // Store test account data based on rememberMe preference
        const storage = credentials.rememberMe ? localStorage : sessionStorage;
        storage.setItem('authToken', mockToken);
        storage.setItem('adminPanelUser', JSON.stringify(testUser));
        storage.setItem('isTestAccount', 'true');
        storage.setItem('rememberMe', credentials.rememberMe ? 'true' : 'false');
        
        // Clear from the other storage type
        const otherStorage = credentials.rememberMe ? sessionStorage : localStorage;
        otherStorage.removeItem('authToken');
        otherStorage.removeItem('adminPanelUser');
        otherStorage.removeItem('isTestAccount');
        otherStorage.removeItem('rememberMe');
        
        return {
          user: testUser,
          token: mockToken,
          refreshToken: `refresh_${mockToken}`,
        };
      }
      
      // If not a test account and API failed, throw error
      throw new Error('Backend service unavailable. Please try again later or use test accounts.');
    }
  }

  // Register (if needed for admin creation)
  async register(userData: RegisterRequest): Promise<LoginResponse> {
    const response = await api.post('/auth/signup', userData);
    
    if (response.data.success) {
      const { token, refreshToken, user } = response.data;
      
      // Store tokens in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('adminPanelUser', JSON.stringify(user));
      localStorage.removeItem('isTestAccount');
      
      return {
        user,
        token,
        refreshToken
      };
    } else {
      throw new Error(response.data.message || 'Registration failed');
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear both localStorage and sessionStorage regardless of API call success
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('adminPanelUser');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('isTestAccount');
      
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('adminPanelUser');
      sessionStorage.removeItem('rememberMe');
      sessionStorage.removeItem('isTestAccount');
    }
  }

  // Refresh token
  async refreshToken(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post('/auth/refresh', { refreshToken });
    
    if (response.data.success) {
      const { token, refreshToken: newRefreshToken, user } = response.data;
      
      // Update tokens in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', newRefreshToken);
      if (user) {
        localStorage.setItem('adminPanelUser', JSON.stringify(user));
      }
      
      return {
        user: user || JSON.parse(localStorage.getItem('adminPanelUser') || '{}'),
        token,
        refreshToken: newRefreshToken
      };
    } else {
      throw new Error(response.data.message || 'Token refresh failed');
    }
  }

  // Forgot password
  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await api.post('/auth/forgot-password', data);
  }

  // Reset password
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await api.post('/auth/reset-password', data);
  }

  // Change password
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await api.post('/auth/change-password', data);
  }

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    await api.post('/auth/verify-email', { token });
  }

  // Resend verification email
  async resendVerificationEmail(): Promise<void> {
    await api.post('/auth/resend-verification');
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    // Check if we have a stored test account user
    const storedUser = this.getStoredUser();
    if (storedUser && this.isTestAccount(storedUser.email)) {
      return storedUser;
    }
    
    // For non-test accounts, use real API
    const response = await api.get('/auth/me');
    return response.data;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    return !!(token && user);
  }

  // Get stored user
  getStoredUser(): User | null {
    // Check localStorage first, then sessionStorage
    const userStr = localStorage.getItem('adminPanelUser') || sessionStorage.getItem('adminPanelUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        return null;
      }
    }
    return null;
  }

  // Get stored token
  getStoredToken(): string | null {
    // Check localStorage first, then sessionStorage
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  // Check if token is expired
  isTokenExpired(): boolean {
    const token = this.getStoredToken();
    if (!token) return true;

    // Handle mock tokens (they don't expire)
    if (token.startsWith('mock_token_')) {
      return false;
    }

    try {
      // Only try to decode real JWT tokens
      if (token.split('.').length !== 3) {
        return true;
      }
      
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  // Auto refresh token if needed
  async autoRefreshToken(): Promise<boolean> {
    if (this.isTokenExpired()) {
      try {
        await this.refreshToken();
        return true;
      } catch (error) {
        console.error('Auto refresh failed:', error);
        this.logout();
        return false;
      }
    }
    return true;
  }
}

export const authService = new AuthService();
export default authService;