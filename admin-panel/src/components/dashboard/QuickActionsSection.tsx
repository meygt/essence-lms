import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Paper,
  Avatar,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  School as SchoolIcon,
  Schedule as ScheduleIcon,
  EmojiEvents as CertificateIcon,
} from '@mui/icons-material';

interface QuickActionsSectionProps {
  className?: string;
}

const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({ className }) => {
  const navigate = useNavigate();

  const quickActions = [
    { 
      title: 'Add Student', 
      icon: <PersonAddIcon />, 
      color: '#16a34a',
      onClick: () => navigate('/users/create')
    },
    { 
      title: 'Create Course', 
      icon: <SchoolIcon />, 
      color: '#d97706',
      onClick: () => navigate('/courses/create')
    },
    { 
      title: 'Schedule Event', 
      icon: <ScheduleIcon />, 
      color: '#0ea5e9',
      onClick: () => navigate('/calendar/create')
    },
    { 
      title: 'Issue Certificate', 
      icon: <CertificateIcon />, 
      color: '#7c3aed',
      onClick: () => navigate('/certificates/create')
    },
  ];

  return (
    <Paper className={className} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {quickActions.map((action, index) => (
          <Grid size={{ xs: 6, sm: 3 }} key={index}>
            <Card 
              sx={{ 
                textAlign: 'center', 
                cursor: 'pointer',
                transition: 'all 0.2s',
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                }
              }}
              onClick={action.onClick}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Avatar sx={{ 
                  bgcolor: action.color, 
                  mx: 'auto', 
                  mb: 1,
                  width: 40,
                  height: 40,
                }}>
                  {action.icon}
                </Avatar>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500,
                    lineHeight: 1.3
                  }}
                >
                  {action.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default QuickActionsSection;