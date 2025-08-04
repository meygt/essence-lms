interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
}

interface AuthData {
  user: AuthUser;
  token: string;
  loginTime: number;
  rememberMe: boolean;
}

const AUTH_STORAGE_KEY = 'lms_auth_data';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

export const authUtils = {
  // Check if user is authenticated and session is valid
  isAuthenticated(): boolean {
    try {
      const authData = this.getAuthData();
      if (!authData) return false;
      
      const now = Date.now();
      const timeSinceLogin = now - authData.loginTime;
      
      // If remember me is enabled, extend session
      if (authData.rememberMe) {
        return true;
      }
      
      // Check if session has expired (30 minutes)
      return timeSinceLogin < SESSION_TIMEOUT;
    } catch {
      return false;
    }
  },

  // Get stored authentication data
  getAuthData(): AuthData | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // Store authentication data
  setAuthData(user: AuthUser, token: string, rememberMe: boolean = false): void {
    const authData: AuthData = {
      user,
      token,
      loginTime: Date.now(),
      rememberMe
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
  },

  // Clear authentication data
  clearAuthData(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  // Get dashboard URL based on user role
  getDashboardUrl(role: string): string {
    const adminBaseUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:5173';
    
    switch (role) {
      case 'student':
        return `${adminBaseUrl}/dashboard/student`;
      case 'teacher':
        return `${adminBaseUrl}/dashboard/teacher`;
      case 'parent':
        return `${adminBaseUrl}/dashboard/parent`;
      case 'admin':
        return `${adminBaseUrl}/dashboard/admin`;
      default:
        return `${adminBaseUrl}/dashboard`;
    }
  },

  // Get admin panel login URL
  getLoginUrl(): string {
    const adminBaseUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:5173';
    return `${adminBaseUrl}/login`;
  },

  // Check authentication with admin panel via postMessage
  async checkAdminPanelAuth(): Promise<AuthData | null> {
    return new Promise((resolve) => {
      const adminBaseUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:5173';
      
      // Create hidden iframe to check admin panel auth
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `${adminBaseUrl}/auth-check`;
      
      const timeout = setTimeout(() => {
        document.body.removeChild(iframe);
        resolve(null);
      }, 3000);
      
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== new URL(adminBaseUrl).origin) return;
        
        clearTimeout(timeout);
        window.removeEventListener('message', messageHandler);
        document.body.removeChild(iframe);
        
        if (event.data.type === 'AUTH_STATUS' && event.data.authenticated) {
          const authData: AuthData = {
            user: event.data.user,
            token: event.data.token,
            loginTime: Date.now(),
            rememberMe: event.data.rememberMe || false
          };
          this.setAuthData(authData.user, authData.token, authData.rememberMe);
          resolve(authData);
        } else {
          resolve(null);
        }
      };
      
      window.addEventListener('message', messageHandler);
      document.body.appendChild(iframe);
    });
  }
};