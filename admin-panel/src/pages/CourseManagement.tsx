import React from 'react';
import { Box, Typography } from '@mui/material';

const CourseManagement: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Course Management
      </Typography>
      <Typography variant="body1">
        Course management functionality will be implemented here.
      </Typography>
    </Box>
  );
};

export default CourseManagement;