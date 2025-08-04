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
  Schedule as ScheduleIcon,
  School as ClassIcon,
  Work as WorkshopIcon,
  MenuBook as LectureIcon,
  Quiz as ExamIcon,
  VideoCall as MeetingIcon,
} from '@mui/icons-material';
import { useTodayEvents } from '../../hooks/useCalendar';
import type { CalendarEvent } from '../../services/calendarService';

interface TodayScheduleSectionProps {
  className?: string;
}

const TodayScheduleSection: React.FC<TodayScheduleSectionProps> = ({ className }) => {
  const { data: events, loading, error } = useTodayEvents();

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'CLASS':
        return <ClassIcon />;
      case 'WORKSHOP':
        return <WorkshopIcon />;
      case 'LECTURE':
        return <LectureIcon />;
      case 'EXAM':
        return <ExamIcon />;
      case 'MEETING':
        return <MeetingIcon />;
      default:
        return <ScheduleIcon />;
    }
  };

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'CLASS':
        return '#16a34a';
      case 'WORKSHOP':
        return '#d97706';
      case 'LECTURE':
        return '#0ea5e9';
      case 'EXAM':
        return '#dc2626';
      case 'MEETING':
        return '#7c3aed';
      default:
        return '#64748b';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const todaySchedule = events?.map(event => ({
    time: formatTime(event.startTime),
    title: event.title,
    teacher: event.teacherName || 'TBA',
    type: event.type,
    status: event.status,
  })) || [];

  if (error) {
    return (
      <Paper className={className} sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ScheduleIcon color="primary" />
          Today's Schedule
        </Typography>
        <Alert severity="error">Failed to load today's schedule</Alert>
      </Paper>
    );
  }

  return (
    <Paper className={className} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ScheduleIcon color="primary" />
        Today's Schedule
      </Typography>
      
      <List sx={{ pt: 0 }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemAvatar>
                <Skeleton variant="circular" width={32} height={32} />
              </ListItemAvatar>
              <ListItemText
                primary={<Skeleton variant="text" width="60%" />}
                secondary={<Skeleton variant="text" width="40%" />}
              />
            </ListItem>
          ))
        ) : todaySchedule.length > 0 ? (
          todaySchedule.map((item, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: getEventColor(item.type), width: 32, height: 32 }}>
                  {getEventIcon(item.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                secondary={`${item.time} • ${item.teacher}`}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))
        ) : (
          <ListItem sx={{ px: 0 }}>
            <ListItemText
              primary="No events scheduled for today"
              primaryTypographyProps={{ variant: 'body2', color: 'text.secondary', textAlign: 'center' }}
            />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default TodayScheduleSection;