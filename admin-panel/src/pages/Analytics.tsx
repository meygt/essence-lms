import React from 'react';
import { useUser } from '../hooks/useUser';
import AdminAnalytics from '../components/analytics/AdminAnalytics';
import TeacherAnalytics from '../components/analytics/TeacherAnalytics';
import { Box, Typography, Alert } from '@mui/material';

const Analytics: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  // Render role-specific analytics component
  switch (user.role) {
    case 'ADMIN':
      return <AdminAnalytics />;
    case 'TEACHER':
      return <TeacherAnalytics />;
    case 'STUDENT':
    case 'PARENT':
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Analytics Access Restricted
          </Typography>
          <Alert severity="info">
            Analytics are only available for administrators and teachers.
          </Alert>
        </Box>
      );
    default:
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Access Denied
          </Typography>
          <Alert severity="error">
            You do not have permission to access this page.
          </Alert>
        </Box>
      );
  }
};

export default Analytics;