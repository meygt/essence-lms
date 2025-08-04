import React from 'react';
import {
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Alert,
} from '@mui/material';
import {
  PersonAdd as NewStudentIcon,
  Payment as PaymentIcon,
  Language as ArabicIcon,
  Assignment as AssignmentIcon,
  Backup as BackupIcon,
  Login as LoginIcon,
  School as CourseIcon,
  EmojiEvents as CertificateIcon,
} from '@mui/icons-material';
import { useRecentActivities } from '../../hooks/useActivities';
import type { Activity } from '../../services/activityService';

interface RecentActivitiesSectionProps {
  className?: string;
}

const RecentActivitiesSection: React.FC<RecentActivitiesSectionProps> = ({ className }) => {
  const { data: activities, loading, error } = useRecentActivities(5);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'USER_REGISTRATION':
        return <NewStudentIcon />;
      case 'PAYMENT_RECEIVED':
        return <PaymentIcon />;
      case 'COURSE_PUBLISHED':
        return <ArabicIcon />;
      case 'ASSIGNMENT_CREATED':
        return <AssignmentIcon />;
      case 'SYSTEM_BACKUP':
        return <BackupIcon />;
      case 'USER_LOGIN':
        return <LoginIcon />;
      case 'COURSE_ENROLLMENT':
        return <CourseIcon />;
      case 'CERTIFICATE_ISSUED':
        return <CertificateIcon />;
      default:
        return <NewStudentIcon />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'USER_REGISTRATION':
        return '#16a34a';
      case 'PAYMENT_RECEIVED':
        return '#d97706';
      case 'COURSE_PUBLISHED':
        return '#0ea5e9';
      case 'ASSIGNMENT_CREATED':
        return '#7c3aed';
      case 'SYSTEM_BACKUP':
        return '#059669';
      case 'USER_LOGIN':
        return '#6366f1';
      case 'COURSE_ENROLLMENT':
        return '#f59e0b';
      case 'CERTIFICATE_ISSUED':
        return '#ec4899';
      default:
        return '#6b7280';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const recentActivities = activities?.map(activity => ({
    id: activity.id,
    text: activity.description,
    time: formatTimeAgo(activity.createdAt),
    icon: getActivityIcon(activity.type),
    color: getActivityColor(activity.type),
  })) || [];

  return (
    <Paper sx={{ 
      p: { xs: 2, sm: 3 }, 
      height: 'fit-content',
      maxHeight: { xs: 400, sm: 450 },
      backgroundColor: '#334155', 
      color: '#ffffff',
      overflow: 'hidden'
    }} className={className}>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          fontWeight: 600,
          fontSize: { xs: '1rem', sm: '1.25rem' }
        }}
      >
        Recent Activities
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mt: 2, backgroundColor: 'rgba(244, 67, 54, 0.1)' }}>
          Failed to load recent activities
        </Alert>
      )}
      
      {loading ? (
        <List sx={{ mt: { xs: 1, sm: 2 } }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <ListItem key={index} sx={{ px: 0, py: { xs: 1, sm: 1.5 } }}>
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
              <ListItemText
                primary={<Skeleton variant="text" width="80%" />}
                secondary={<Skeleton variant="text" width="40%" />}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <List sx={{ 
          mt: { xs: 1, sm: 2 },
          maxHeight: { xs: 280, sm: 350 },
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.5)',
            },
          },
        }}>
          {recentActivities.length === 0 ? (
            <Typography 
              variant="body2" 
              sx={{ 
                textAlign: 'center', 
                color: 'rgba(255, 255, 255, 0.7)',
                py: 4
              }}
            >
              No recent activities
            </Typography>
          ) : (
            recentActivities.map((activity) => (
              <ListItem key={activity.id} sx={{ px: 0, py: { xs: 1, sm: 1.5 } }}>
                <ListItemAvatar>
                  <Avatar sx={{ 
                    bgcolor: activity.color, 
                    width: { xs: 36, sm: 40 }, 
                    height: { xs: 36, sm: 40 },
                    '& svg': {
                      fontSize: { xs: 18, sm: 20 }
                    }
                  }}>
                    {activity.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 500, 
                        mb: 0.5,
                        fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                        lineHeight: 1.4
                      }}
                    >
                      {activity.text}
                    </Typography>
                  }
                  secondary={
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.6875rem', sm: '0.75rem' } }}
                    >
                      {activity.time}
                    </Typography>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      )}
    </Paper>
  );
};

export default RecentActivitiesSection;