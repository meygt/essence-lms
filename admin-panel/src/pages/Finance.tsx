import React from 'react';
import { useUser } from '../hooks/useUser';
import AdminFinance from '../components/finance/AdminFinance';
import ParentPayments from '../components/finance/ParentPayments';
import { Box, Typography, Alert } from '@mui/material';

const Finance: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  // Render role-specific finance component
  switch (user.role) {
    case 'ADMIN':
      return <AdminFinance />;
    case 'PARENT':
      return <ParentPayments />;
    case 'TEACHER':
    case 'STUDENT':
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Access Restricted
          </Typography>
          <Alert severity="info">
            Financial management is only available for administrators and parents.
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

export default Finance;