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
  Payment as PaymentIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { usePaymentStatistics } from '../../hooks/usePayments';
import TodayScheduleSection from './TodayScheduleSection';
import RecentActivitiesSection from './RecentActivitiesSection';
import StatCard from '../ui/StatCard';

const ParentDashboard: React.FC = () => {
  const { data: paymentStats } = usePaymentStatistics();

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
          Parent Dashboard - Essence Academy
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          Monitor your child's Islamic education progress and manage payments
        </Typography>
      </Box>
      
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ width: '100%', margin: 0 }}>
        {/* Parent-specific Statistics */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Children Enrolled"
            value="0"
            icon={<PersonIcon />}
            color="#16a34a"
            onClick={() => {}}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Courses"
            value="0"
            icon={<SchoolIcon />}
            color="#0ea5e9"
            onClick={() => {}}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pending Payments"
            value={`$${paymentStats?.totalRevenue || 0}`}
            icon={<PaymentIcon />}
            color="#f59e0b"
            onClick={() => {}}
          />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Upcoming Events"
            value="0"
            icon={<ScheduleIcon />}
            color="#8b5cf6"
            onClick={() => {}}
          />
        </Grid>
        
        {/* Children's Progress Overview */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Children's Learning Progress
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              No children enrolled yet. Add your children to start tracking their Islamic education progress.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label="Add Child" 
                variant="outlined" 
                sx={{ cursor: 'pointer' }}
                onClick={() => {}}
              />
              <Chip 
                label="View Progress Reports" 
                variant="outlined" 
                sx={{ cursor: 'pointer' }}
                onClick={() => {}}
              />
            </Box>
          </Paper>
        </Grid>
        
        {/* Payment Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Payment Summary
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              No payment history available.
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Monthly Budget: $0</Typography>
              <LinearProgress 
                variant="determinate" 
                value={0} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#f59e0b'
                  }
                }}
              />
            </Box>
            
            <Chip 
              label="Make Payment" 
              variant="outlined" 
              sx={{ cursor: 'pointer' }}
              onClick={() => {}}
            />
          </Paper>
        </Grid>
        
        {/* Today's Schedule */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TodayScheduleSection />
        </Grid>
        
        {/* Recent Activities */}
        <Grid size={{ xs: 12, md: 6 }}>
          <RecentActivitiesSection />
        </Grid>
        
        {/* Communication Center */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Communication Center
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Stay connected with your child's teachers and the school administration.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label="Message Teachers" 
                variant="outlined" 
                sx={{ cursor: 'pointer' }}
                onClick={() => {}}
              />
              <Chip 
                label="View Announcements" 
                variant="outlined" 
                sx={{ cursor: 'pointer' }}
                onClick={() => {}}
              />
              <Chip 
                label="Schedule Meeting" 
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

export default ParentDashboard;