import React, { useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import authService from '../services/authService';

const AuthCheck: React.FC = () => {
  const { user } = useUser();

  useEffect(() => {
    // Get rememberMe status from storage
    const rememberMe = localStorage.getItem('rememberMe') === 'true' || sessionStorage.getItem('rememberMe') === 'true';
    
    // Send authentication status to parent window
    const authData = {
      isAuthenticated: !!user,
      user: user,
      token: authService.getStoredToken(),
      rememberMe: rememberMe
    };

    // Send message to parent window (client-side)
    window.parent.postMessage({
      type: 'AUTH_CHECK_RESULT',
      data: authData
    }, '*');
  }, [user]);

  return <div style={{ display: 'none' }} />;
};

export default AuthCheck;