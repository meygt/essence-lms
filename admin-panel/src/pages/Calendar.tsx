import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Dialog,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  Add as AddIcon,
  ChevronLeft,
  ChevronRight,
  Event as EventIcon,
  School as SchoolIcon,
  MenuBook as QuranIcon,
  Language as ArabicIcon,
  CalendarMonth as MonthIcon,
  CalendarViewWeek as WeekIcon,
  Today as TodayIcon,
} from '@mui/icons-material';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [addEventDialog, setAddEventDialog] = useState(false);

  const [showError, setShowError] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'meeting'
  });
  const today = new Date();
  const todayString = today.toDateString();
  
  // Empty events array - would be populated from API in real application
  interface CalendarEvent {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    type: 'class' | 'workshop' | 'assessment' | 'lecture' | 'review' | 'meeting';
    color?: string;
    instructor?: string;
  }

  const events: CalendarEvent[] = [];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'class': return <SchoolIcon />;
      case 'workshop': return <ArabicIcon />;
      case 'assessment': return <EventIcon />;
      case 'lecture': return <SchoolIcon />;
      case 'review': return <QuranIcon />;
      default: return <EventIcon />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setNewEvent({
      ...newEvent,
      date: clickedDate.toISOString().split('T')[0] // Format as YYYY-MM-DD
    });
    setAddEventDialog(true);
  };

  const handleAddEvent = () => {
    setAddEventDialog(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      type: 'meeting'
    });
    setShowError(true);
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (day: number) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return checkDate.toDateString() === todayString;
  };

  const hasEvents = (day: number) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = checkDate.toISOString().split('T')[0];
    return events.some(event => event.date === dateString);
  };

  return (
    <Box>
      {showError && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          onClose={() => setShowError(false)}
        >
          This feature is not yet implemented. This is a demo interface.
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Academic Calendar
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newView) => newView && setViewMode(newView)}
            size="small"
          >
            <ToggleButton value="month">
              <MonthIcon sx={{ mr: 1 }} />
              Month
            </ToggleButton>
            <ToggleButton value="week">
              <WeekIcon sx={{ mr: 1 }} />
              Week
            </ToggleButton>
          </ToggleButtonGroup>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setAddEventDialog(true)}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
            }}
          >
            Schedule Event
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Calendar Header */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, mb: 3, background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <IconButton onClick={() => viewMode === 'month' ? navigateMonth('prev') : navigateWeek('prev')}>
                <ChevronLeft />
              </IconButton>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {viewMode === 'month' 
                    ? currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                    : `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                  }
                </Typography>
                <Button 
                  size="small" 
                  startIcon={<TodayIcon />} 
                  onClick={() => setCurrentDate(new Date())}
                  sx={{ mt: 1 }}
                >
                  Today
                </Button>
              </Box>
              <IconButton onClick={() => viewMode === 'month' ? navigateMonth('next') : navigateWeek('next')}>
                <ChevronRight />
              </IconButton>
            </Box>
            
            {/* Calendar Grid */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)', 
              gap: 1,
              textAlign: 'center'
            }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <Typography key={day} variant="subtitle2" sx={{ p: 1, fontWeight: 600, color: 'text.secondary' }}>
                  {day}
                </Typography>
              ))}
              {viewMode === 'month' ? (
                // Month View
                (() => {
                  const daysInMonth = getDaysInMonth(currentDate);
                  const firstDay = getFirstDayOfMonth(currentDate);
                  const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
                  
                  return Array.from({ length: totalCells }, (_, i) => {
                    const day = i - firstDay + 1;
                    const isCurrentMonth = day > 0 && day <= daysInMonth;
                    const isTodayCell = isCurrentMonth && isToday(day);
                    const hasEventsCell = isCurrentMonth && hasEvents(day);
                    
                    return (
                      <Box
                        key={i}
                        onClick={() => isCurrentMonth && handleDateClick(day)}
                        sx={{
                          p: 1,
                          minHeight: 50,
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          backgroundColor: isTodayCell 
                            ? 'primary.main' 
                            : isCurrentMonth 
                              ? 'rgba(255, 255, 255, 0.05)' 
                              : 'rgba(255, 255, 255, 0.02)',
                          color: isTodayCell 
                            ? 'white' 
                            : isCurrentMonth 
                              ? 'text.primary' 
                              : 'text.disabled',
                          cursor: isCurrentMonth ? 'pointer' : 'default',
                          '&:hover': isCurrentMonth ? { 
                            backgroundColor: isTodayCell ? 'primary.dark' : 'rgba(255, 255, 255, 0.1)' 
                          } : {},
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          borderRadius: 1,
                        }}
                      >
                        {isCurrentMonth && (
                          <>
                            <Typography variant="body2" sx={{ fontWeight: isTodayCell ? 'bold' : 'normal' }}>
                              {day}
                            </Typography>
                            {hasEventsCell && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  bottom: 4,
                                  right: 4,
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  backgroundColor: isTodayCell ? 'white' : 'primary.main',
                                }}
                              />
                            )}
                          </>
                        )}
                      </Box>
                    );
                  });
                })()
              ) : (
                // Week View
                (() => {
                  const startOfWeek = new Date(currentDate);
                  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
                  
                  return Array.from({ length: 7 }, (_, i) => {
                    const day = new Date(startOfWeek);
                    day.setDate(startOfWeek.getDate() + i);
                    const isTodayCell = day.toDateString() === todayString;
                    const dayEvents = events.filter(event => event.date === day.toISOString().split('T')[0]);
                    
                    return (
                      <Box
                        key={i}
                        onClick={() => handleDateClick(day.getDate())}
                        sx={{
                          p: 2,
                          minHeight: 120,
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          backgroundColor: isTodayCell 
                            ? 'rgba(103, 126, 234, 0.1)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                          borderRadius: 1,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: isTodayCell ? 'bold' : 'normal',
                            color: isTodayCell ? 'primary.main' : 'text.primary',
                            mb: 1
                          }}
                        >
                          {day.getDate()}
                        </Typography>
                        {dayEvents.slice(0, 2).map((event, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              fontSize: '0.7rem',
                              p: 0.5,
                              mb: 0.5,
                              backgroundColor: event.color,
                              color: 'white',
                              borderRadius: 0.5,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {event.title}
                          </Box>
                        ))}
                        {dayEvents.length > 2 && (
                          <Typography variant="caption" color="text.secondary">
                            +{dayEvents.length - 2} more
                          </Typography>
                        )}
                      </Box>
                    );
                  });
                })()
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Today's Events */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Today's Schedule
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {formatDate(new Date())}
            </Typography>
            
            {events.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  No events scheduled for today
                </Typography>
              </Box>
            ) : (
              <List>
                {events.slice(0, 4).map((event, index) => (
                  <React.Fragment key={event.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Box sx={{ 
                          bgcolor: event.color, 
                          color: 'white', 
                          borderRadius: '50%', 
                          width: 40, 
                          height: 40, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          {getEventIcon(event.type)}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={event.title}
                        secondary={`${event.time} • ${event.instructor}`}
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                    {index < 3 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Upcoming Events */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Upcoming Events
            </Typography>
            {events.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <EventIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No Upcoming Events
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Schedule your first event to get started
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {events.map((event) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
                    <Card sx={{ 
                      border: `2px solid ${event.color}20`,
                      '&:hover': { boxShadow: 3 }
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box sx={{ 
                            bgcolor: event.color, 
                            color: 'white', 
                            borderRadius: 1, 
                            p: 1, 
                            mr: 2 
                          }}>
                            {getEventIcon(event.type)}
                          </Box>
                          <Chip 
                            label={event.type} 
                            size="small" 
                            sx={{ 
                              bgcolor: `${event.color}20`, 
                              color: event.color,
                              textTransform: 'capitalize'
                            }} 
                          />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {event.time} • {event.date}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {event.instructor}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Add Event Dialog */}
      <Dialog open={addEventDialog} onClose={() => setAddEventDialog(false)} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Schedule New Event
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Event Title"
              fullWidth
              variant="outlined"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            
            <TextField
              label="Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            
            <TextField
              label="Time"
              type="time"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            />
            
            <FormControl fullWidth>
              <Select 
                value={newEvent.type} 
                variant="outlined"
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              >
                <MenuItem value="meeting">Meeting</MenuItem>
                <MenuItem value="class">Class</MenuItem>
                <MenuItem value="exam">Exam</MenuItem>
                <MenuItem value="event">Event</MenuItem>
                <MenuItem value="deadline">Deadline</MenuItem>
              </Select>
            </FormControl>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button 
                variant="outlined" 
                onClick={() => setAddEventDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={handleAddEvent}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  }
                }}
              >
                Schedule Event
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Calendar;