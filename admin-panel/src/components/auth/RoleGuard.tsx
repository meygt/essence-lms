import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Lock as LockIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useUser } from '../../hooks/useUser';
import { ROLE_PERMISSIONS } from '../../constants/permissions';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requiredPermissions?: string[];
  fallbackPath?: string;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles = [], 
  requiredPermissions = [],
  fallbackPath = '/dashboard'
}) => {
  const { user } = useUser();
  const navigate = useNavigate();

  // If no user is authenticated, let AuthGuard handle it
  if (!user) {
    return <>{children}</>;
  }

  // Check if user's role is in allowed roles
  const hasAllowedRole = allowedRoles.length === 0 || allowedRoles.includes(user.role);
  
  // Check if user has required permissions
  const hasRequiredPermissions = requiredPermissions.length === 0 || 
    requiredPermissions.every(permission => 
      user.permissions?.includes(permission) || 
      ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS]?.includes(permission)
    );

  // If user doesn't have access, show access denied page
  if (!hasAllowedRole || !hasRequiredPermissions) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          gap: 3,
          p: 4,
        }}
      >
        <LockIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
          You don't have permission to access this page. Your current role ({user.role}) 
          doesn't have the required permissions for this resource.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(fallbackPath)}
          >
            Go to Dashboard
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
          If you believe this is an error, please contact your administrator.
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;