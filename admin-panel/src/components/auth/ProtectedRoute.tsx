import React from 'react';
import AuthGuard from './AuthGuard';
import RoleGuard from './RoleGuard';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requiredPermissions?: string[];
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles,
  requiredPermissions,
  fallbackPath
}) => {
  return (
    <AuthGuard>
      <RoleGuard 
        allowedRoles={allowedRoles}
        requiredPermissions={requiredPermissions}
        fallbackPath={fallbackPath}
      >
        {children}
      </RoleGuard>
    </AuthGuard>
  );
};

export default ProtectedRoute;