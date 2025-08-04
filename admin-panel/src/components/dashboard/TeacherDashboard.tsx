import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Container,
  Paper,
  Chip,
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useCourseStatistics } from '../../hooks/useCourses';
import { useUserStatistics } from '../../hooks/useUsers';
import TodayScheduleSection from './TodayScheduleSection';
import RecentActivitiesSection from './RecentActivitiesSection';
import StatCard from '../ui/StatCard';

const TeacherDashboard: React.FC = () => {
  const { data: courseStats } = useCourseStatistics();
  const { data: userStats } = useUserStatistics();

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
          Teacher Dashboard - Essence Academy
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          Manage your courses and track student progress in Islamic education
        </Typography>
      </Box>
      
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ width: '100%', margin: 0 }}>
        {/* Teacher-specific Statistics */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="My Courses"
            value={String(courseStats?.totalCourses || 0)}
            icon={<SchoolIcon />}
            color="#16a34a"

            onClick={() => {}}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="My Students"
            value={String(userStats?.totalStudents || 0)}
            icon={<PeopleIcon />}
            color="#0ea5e9"

            onClick={() => {}}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Assignments"
            value="0"
            icon={<AssignmentIcon />}
            color="#f59e0b"

            onClick={() => {}}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Today's Classes"
            value="0"
            icon={<ScheduleIcon />}
            color="#8b5cf6"

            onClick={() => {}}
          />
        </Grid>
        
        {/* Today's Schedule */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TodayScheduleSection />
        </Grid>
        
        {/* Recent Activities */}
        <Grid size={{ xs: 12, md: 6 }}>
          <RecentActivitiesSection />
        </Grid>
        
        {/* Quick Course Management */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Course Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              No courses available. Create your first course to start teaching.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label="Create New Course" 
                variant="outlined" 
                sx={{ cursor: 'pointer' }}
                onClick={() => {}}
              />
              <Chip 
                label="View All Courses" 
                variant="outlined" 
                sx={{ cursor: 'pointer' }}
                onClick={() => {}}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherDashboard;