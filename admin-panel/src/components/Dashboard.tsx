import React from 'react';
import { useUser } from '../hooks/useUser';
import AdminDashboard from './dashboards/AdminDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';
import StudentDashboard from './dashboards/StudentDashboard';
import ParentDashboard from './dashboards/ParentDashboard';
import { Box, Typography, Paper } from '@mui/material';

const Dashboard: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Please log in to access the dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You need to be authenticated to view this content.
          </Typography>
        </Paper>
      </Box>
    );
  }

  // Render the appropriate dashboard based on user role
  switch (user.role) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'TEACHER':
      return <TeacherDashboard />;
    case 'STUDENT':
      return <StudentDashboard />;
    case 'PARENT':
      return <ParentDashboard />;
    default:
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom color="error">
              Unknown User Role
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your account role is not recognized. Please contact the administrator.
            </Typography>
          </Paper>
        </Box>
      );
  }
};

export default Dashboard;