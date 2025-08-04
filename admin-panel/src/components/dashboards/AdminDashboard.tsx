import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
  Divider
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Book as BookIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  PersonAdd as PersonAddIcon,
  BookmarkAdd as BookmarkAddIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import { useUser } from '../../hooks/useUser';

interface AdminStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  monthlyRevenue: number;
  activeEnrollments: number;
  pendingPayments: number;
  unreadMessages: number;
  attendanceRate: number;
  completionRate: number;
  satisfactionScore: number;
  monthlyGrowth: number;
}

interface RecentActivity {
  id: string;
  type: 'enrollment' | 'payment' | 'course' | 'message' | 'attendance';
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}

interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  action?: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useUser();
  const [stats] = useState<AdminStats>({
    totalStudents: 1247,
    totalTeachers: 89,
    totalCourses: 156,
    monthlyRevenue: 45680,
    activeEnrollments: 2341,
    pendingPayments: 23,
    unreadMessages: 12,
    attendanceRate: 87,
    completionRate: 78,
    satisfactionScore: 4.6,
    monthlyGrowth: 12.5
  });

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'enrollment',
      title: 'New Student Enrollment',
      description: 'Ahmad Hassan enrolled in Qur\'an Recitation Course',
      time: '2 minutes ago',
      icon: <PersonAddIcon />,
      color: '#16a34a'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      description: 'Aisha Abdullah paid $150 for Arabic Language Course',
      time: '15 minutes ago',
      icon: <MoneyIcon />,
      color: '#d97706'
    },
    {
      id: '3',
      type: 'course',
      title: 'New Course Created',
      description: 'Islamic History & Civilization course added',
      time: '1 hour ago',
      icon: <BookmarkAddIcon />,
      color: '#0ea5e9'
    },
    {
      id: '4',
      type: 'message',
      title: 'Teacher Message',
      description: 'Sheikh Omar sent progress report for Hifz class',
      time: '2 hours ago',
      icon: <MessageIcon />,
      color: '#8b5cf6'
    },
    {
      id: '5',
      type: 'attendance',
      title: 'Attendance Alert',
      description: 'Low attendance in Friday Fiqh class (65%)',
      time: '3 hours ago',
      icon: <WarningIcon />,
      color: '#ef4444'
    }
  ]);

  const [systemAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Pending Payments',
      message: '23 students have overdue payments',
      action: 'View Payments'
    },
    {
      id: '2',
      type: 'info',
      title: 'System Backup',
      message: 'Scheduled backup will run tonight at 2:00 AM',
    },
    {
      id: '3',
      type: 'success',
      title: 'Course Completion',
      message: '45 students completed courses this month',
    }
  ]);

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents.toLocaleString(),
      icon: <PeopleIcon />,
      color: '#16a34a',
      trend: stats.monthlyGrowth,
      trendLabel: 'vs last month'
    },
    {
      title: 'Total Teachers',
      value: stats.totalTeachers.toString(),
      icon: <SchoolIcon />,
      color: '#d97706',
      trend: 5.2,
      trendLabel: 'vs last month'
    },
    {
      title: 'Active Courses',
      value: stats.totalCourses.toString(),
      icon: <BookIcon />,
      color: '#0ea5e9',
      trend: 8.1,
      trendLabel: 'vs last month'
    },
    {
      title: 'Monthly Revenue',
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: <MoneyIcon />,
      color: '#16a34a',
      trend: 15.3,
      trendLabel: 'vs last month'
    }
  ];

  const performanceMetrics = [
    {
      title: 'Attendance Rate',
      value: stats.attendanceRate,
      target: 90,
      color: stats.attendanceRate >= 85 ? '#16a34a' : '#ef4444'
    },
    {
      title: 'Course Completion',
      value: stats.completionRate,
      target: 80,
      color: stats.completionRate >= 75 ? '#16a34a' : '#ef4444'
    },
    {
      title: 'Satisfaction Score',
      value: (stats.satisfactionScore / 5) * 100,
      target: 80,
      color: stats.satisfactionScore >= 4.0 ? '#16a34a' : '#ef4444'
    }
  ];

  return (
    <Box>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.firstName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening in Essence Academy today
        </Typography>
      </Box>

      {/* Main Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>
                    {stat.icon}
                  </Avatar>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {stat.trend > 0 ? (
                    <TrendingUpIcon sx={{ color: '#16a34a', fontSize: 16 }} />
                  ) : (
                    <TrendingDownIcon sx={{ color: '#ef4444', fontSize: 16 }} />
                  )}
                  <Typography variant="body2" color={stat.trend > 0 ? '#16a34a' : '#ef4444'}>
                    {stat.trend > 0 ? '+' : ''}{stat.trend}% {stat.trendLabel}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Performance Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {performanceMetrics.map((metric, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {metric.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography variant="h4" component="div" sx={{ color: metric.color }}>
                    {metric.title === 'Satisfaction Score' ? stats.satisfactionScore.toFixed(1) : `${metric.value}%`}
                  </Typography>
                  {metric.title === 'Satisfaction Score' && (
                    <Typography variant="body2" color="text.secondary">
                      / 5.0
                    </Typography>
                  )}
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={metric.value}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#f3f4f6',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: metric.color,
                      borderRadius: 4
                    }
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Target: {metric.target}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Recent Activity</Typography>
                <Button size="small" color="primary">
                  View All
                </Button>
              </Box>
              <List>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: activity.color, width: 40, height: 40 }}>
                          {activity.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.title}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {activity.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {activity.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions & System Alerts */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Grid container spacing={3}>
            {/* Quick Actions */}
            <Grid size={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quick Actions
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<PersonAddIcon />}
                        sx={{ py: 1.5 }}
                      >
                        Add Student
                      </Button>
                    </Grid>
                    <Grid size={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<BookmarkAddIcon />}
                        sx={{ py: 1.5 }}
                      >
                        Add Course
                      </Button>
                    </Grid>
                    <Grid size={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<SchoolIcon />}
                        sx={{ py: 1.5 }}
                      >
                        Add Teacher
                      </Button>
                    </Grid>
                    <Grid size={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<AssessmentIcon />}
                        sx={{ py: 1.5 }}
                      >
                        Generate Report
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* System Alerts */}
            <Grid size={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    System Alerts
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {systemAlerts.map((alert) => (
                      <Paper
                        key={alert.id}
                        sx={{
                          p: 2,
                          border: 1,
                          borderColor: alert.type === 'warning' ? '#f59e0b' : 
                                     alert.type === 'error' ? '#ef4444' :
                                     alert.type === 'success' ? '#16a34a' : '#0ea5e9',
                          borderRadius: 2,
                          bgcolor: alert.type === 'warning' ? '#fef3c7' : 
                                  alert.type === 'error' ? '#fee2e2' :
                                  alert.type === 'success' ? '#dcfce7' : '#dbeafe'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                          {alert.type === 'warning' && <WarningIcon sx={{ color: '#f59e0b', mt: 0.5 }} />}
                          {alert.type === 'success' && <CheckCircleIcon sx={{ color: '#16a34a', mt: 0.5 }} />}
                          {alert.type === 'info' && <NotificationsIcon sx={{ color: '#0ea5e9', mt: 0.5 }} />}
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {alert.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {alert.message}
                            </Typography>
                            {alert.action && (
                              <Button size="small" sx={{ mt: 1, p: 0, minWidth: 'auto' }}>
                                {alert.action}
                              </Button>
                            )}
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;