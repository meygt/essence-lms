import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Container,
} from '@mui/material';
import StatsSection from './StatsSection';
import CourseProgressSection from './CourseProgressSection';
import RecentActivitiesSection from './RecentActivitiesSection';
import TodayScheduleSection from './TodayScheduleSection';
import QuickActionsSection from './QuickActionsSection';

const AdminDashboard: React.FC = () => {
  return (
    <Container maxWidth={false} sx={{ px: { xs: 0, sm: 2 } }}>
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700, 
            color: 'text.primary',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
            lineHeight: 1.2
          }}
        >
          Admin Dashboard - Essence Academy
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          Manage your Islamic learning platform with comprehensive administrative tools
        </Typography>
      </Box>
      
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ width: '100%', margin: 0 }}>
        {/* Statistics Cards */}
        <StatsSection />
        
        {/* Course Progress Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <CourseProgressSection />
        </Grid>
        
        {/* Recent Activities */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <RecentActivitiesSection />
        </Grid>
        
        {/* Today's Schedule */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TodayScheduleSection />
        </Grid>
        
        {/* Quick Actions */}
        <Grid size={{ xs: 12, md: 6 }}>
          <QuickActionsSection />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;