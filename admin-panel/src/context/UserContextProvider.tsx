import React, { useState, useEffect, useMemo, useCallback, type ReactNode } from 'react';
import { ROLE_PERMISSIONS } from '../constants/permissions';
import type { User, UserContextType } from '../types/user';
import { UserContext } from './UserContextDefinition';
import authService from '../services/authService';

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const checkSession = async () => {
      try {
        if (authService.isAuthenticated() && !authService.isTokenExpired()) {
          // Try to get current user from API
          try {
            const currentUser = await authService.getCurrentUser();
            setUser({
              ...currentUser,
              permissions: ROLE_PERMISSIONS[currentUser.role] || []
            });
          } catch {
            // If API call fails, try to refresh token
            const refreshSuccess = await authService.autoRefreshToken();
            if (refreshSuccess) {
              const currentUser = await authService.getCurrentUser();
              setUser({
                ...currentUser,
                permissions: ROLE_PERMISSIONS[currentUser.role] || []
              });
            } else {
              // If refresh fails, use stored user data
              const storedUser = authService.getStoredUser();
              if (storedUser) {
                setUser({
                  ...storedUser,
                  permissions: ROLE_PERMISSIONS[storedUser.role] || []
                });
              }
            }
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = useCallback(async (email: string, password: string, rememberMe?: boolean): Promise<boolean> => {
    try {
      const response = await authService.login({ email, password, rememberMe });
      const userWithPermissions = {
        ...response.user,
        permissions: ROLE_PERMISSIONS[response.user.role] || []
      };
      setUser(userWithPermissions);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  }, []);

  const hasPermission = useCallback((permission: string): boolean => {
    if (!user) return false;
    return user.permissions?.includes(permission) || false;
  }, [user]);

  const isRole = useCallback((role: string): boolean => {
    if (!user) return false;
    return user.role === role;
  }, [user]);

  const value: UserContextType = useMemo(() => ({
    user,
    setUser,
    login,
    logout,
    isLoading,
    hasPermission,
    isRole
  }), [user, login, logout, isLoading, hasPermission, isRole]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};