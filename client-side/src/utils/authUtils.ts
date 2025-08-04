export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  profilePicture?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  permissions?: string[];
}

export interface AuthCheckResult {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  rememberMe: boolean;
}

export const authUtils = {
  /**
   * Check authentication status by opening admin panel in hidden iframe
   */
  checkAuthStatus: (): Promise<AuthCheckResult> => {
    return new Promise((resolve, reject) => {
      const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:5173';
      const iframe = document.createElement('iframe');
      iframe.src = `${adminUrl}/auth-check`;
      iframe.style.display = 'none';
      
      const timeout = setTimeout(() => {
        document.body.removeChild(iframe);
        reject(new Error('Auth check timeout'));
      }, 10000); // 10 second timeout
      
      const messageHandler = (event: MessageEvent) => {
        // Verify origin for security
        const allowedOrigins = [
          'http://localhost:5173',
          'https://admin.essenceqa.org',
          process.env.NEXT_PUBLIC_ADMIN_URL
        ].filter(Boolean);
        
        if (!allowedOrigins.includes(event.origin)) {
          return;
        }
        
        if (event.data.type === 'AUTH_CHECK_RESULT') {
          clearTimeout(timeout);
          window.removeEventListener('message', messageHandler);
          document.body.removeChild(iframe);
          resolve(event.data.data);
        }
      };
      
      window.addEventListener('message', messageHandler);
      document.body.appendChild(iframe);
    });
  },
  
  /**
   * Get dashboard URL based on user role
   */
  getDashboardUrl: (role: string): string => {
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:5173';
    
    switch (role.toUpperCase()) {
      case 'ADMIN':
        return `${adminUrl}/dashboard`;
      case 'TEACHER':
        return `${adminUrl}/dashboard`;
      case 'STUDENT':
        return `${adminUrl}/dashboard`;
      case 'PARENT':
        return `${adminUrl}/dashboard`;
      default:
        return `${adminUrl}/dashboard`;
    }
  },
  
  /**
   * Redirect to admin panel login
   */
  redirectToLogin: (): void => {
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:5173';
    window.location.href = `${adminUrl}/login`;
  },
  
  /**
   * Redirect to admin panel signup
   */
  redirectToSignup: (): void => {
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:5173';
    window.location.href = `${adminUrl}/signup`;
  }
};