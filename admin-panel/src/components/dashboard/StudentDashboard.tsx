import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Container,
  Paper,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  EmojiEvents as CertificateIcon,
  MenuBook as BookIcon,
} from '@mui/icons-material';

import TodayScheduleSection from './TodayScheduleSection';
import RecentActivitiesSection from './RecentActivitiesSection';
import StatCard from '../ui/StatCard';

const StudentDashboard: React.FC = () => {


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
          Student Dashboard - Essence Academy
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          Continue your Islamic learning journey with personalized progress tracking
        </Typography>
      </Box>
      
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ width: '100%', margin: 0 }}>
        {/* Student-specific Statistics */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Enrolled Courses"
            value="0"
            icon={<SchoolIcon />}
            color="#16a34a"
            onClick={() => {}}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Completed Lessons"
            value="0"
            icon={<BookIcon />}
            color="#0ea5e9"
            onClick={() => {}}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Assignments Due"
            value="0"
            icon={<AssignmentIcon />}
            color="#f59e0b"
            onClick={() => {}}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Certificates Earned"
            value="0"
            icon={<CertificateIcon />}
            color="#8b5cf6"
            onClick={() => {}}
          />
        </Grid>
        
        {/* Learning Progress */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              My Learning Progress
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              No courses enrolled yet. Start your Islamic learning journey today!
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Overall Progress</Typography>
              <LinearProgress 
                variant="determinate" 
                value={0} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#16a34a'
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary">0% Complete</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label="Browse Courses" 
                variant="outlined" 
                sx={{ cursor: 'pointer' }}
                onClick={() => {}}
              />
              <Chip 
                label="View My Courses" 
                variant="outlined" 
                sx={{ cursor: 'pointer' }}
                onClick={() => {}}
              />
            </Box>
          </Paper>
        </Grid>
        
        {/* Today's Schedule */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TodayScheduleSection />
        </Grid>
        
        {/* Recent Activities */}
        <Grid size={{ xs: 12 }}>
          <RecentActivitiesSection />
        </Grid>
        
        {/* Upcoming Assignments */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Upcoming Assignments
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No assignments due. Check back later for new assignments from your teachers.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard;