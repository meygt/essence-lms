import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  People as PeopleIcon,
  Book as BookIcon,
  Event as EventIcon,
  Payment as PaymentIcon,
  TrendingUp as TrendingUpIcon,
  Message as MessageIcon,
  EmojiEvents as TrophyIcon,
  AccountBalance as AccountBalanceIcon
} from '@mui/icons-material';
import { useUser } from '../../hooks/useUser';

interface ParentStats {
  totalChildren: number;
  activeCourses: number;
  upcomingClasses: number;
  pendingPayments: number;
  totalSpent: number;
  unreadMessages: number;
  certificatesEarned: number;
  averagePerformance: number;
}

interface Child {
  id: string;
  name: string;
  age: number;
  grade: string;
  enrolledCourses: number;
  averageGrade: number;
  attendance: number;
  lastActivity: string;
  status: 'excellent' | 'good' | 'needs_attention';
  upcomingClasses: number;
}

interface UpcomingClass {
  id: string;
  childName: string;
  courseName: string;
  instructor: string;
  time: string;
  duration: string;
  type: 'lecture' | 'practice' | 'exam' | 'review';
}

interface Payment {
  id: string;
  childName: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  course: string;
}

interface Message {
  id: string;
  from: string;
  subject: string;
  childName: string;
  time: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface Certificate {
  id: string;
  childName: string;
  courseName: string;
  grade: string;
  issuedDate: string;
  instructor: string;
  type: 'completion' | 'excellence' | 'participation';
}

const ParentDashboard: React.FC = () => {
  const { user } = useUser();
  const [stats] = useState<ParentStats>({
    totalChildren: 3,
    activeCourses: 8,
    upcomingClasses: 5,
    pendingPayments: 2,
    totalSpent: 1250,
    unreadMessages: 4,
    certificatesEarned: 6,
    averagePerformance: 85
  });

  const [children] = useState<Child[]>([
    {
      id: '1',
      name: 'Ahmad Hassan',
      age: 12,
      grade: '7th Grade',
      enrolledCourses: 3,
      averageGrade: 92,
      attendance: 95,
      lastActivity: '2 hours ago',
      status: 'excellent',
      upcomingClasses: 2
    },
    {
      id: '2',
      name: 'Aisha Hassan',
      age: 10,
      grade: '5th Grade',
      enrolledCourses: 2,
      averageGrade: 88,
      attendance: 90,
      lastActivity: '1 day ago',
      status: 'good',
      upcomingClasses: 2
    },
    {
      id: '3',
      name: 'Omar Hassan',
      age: 8,
      grade: '3rd Grade',
      enrolledCourses: 3,
      averageGrade: 75,
      attendance: 82,
      lastActivity: '3 days ago',
      status: 'needs_attention',
      upcomingClasses: 1
    }
  ]);

  const [upcomingClasses] = useState<UpcomingClass[]>([
    {
      id: '1',
      childName: 'Ahmad Hassan',
      courseName: 'Qur\'an Recitation & Tajweed',
      instructor: 'Sheikh Ahmad Hassan',
      time: 'Today, 2:00 PM',
      duration: '1h 30m',
      type: 'lecture'
    },
    {
      id: '2',
      childName: 'Aisha Hassan',
      courseName: 'Arabic Language Basics',
      instructor: 'Ustadha Fatima Rahman',
      time: 'Today, 4:00 PM',
      duration: '1h',
      type: 'practice'
    },
    {
      id: '3',
      childName: 'Ahmad Hassan',
      courseName: 'Islamic Studies',
      instructor: 'Dr. Omar Al-Rashid',
      time: 'Tomorrow, 10:00 AM',
      duration: '1h',
      type: 'exam'
    },
    {
      id: '4',
      childName: 'Omar Hassan',
      courseName: 'Qur\'an Basics',
      instructor: 'Sheikh Muhammad Ali',
      time: 'Tomorrow, 3:00 PM',
      duration: '45m',
      type: 'lecture'
    }
  ]);

  const [pendingPayments] = useState<Payment[]>([
    {
      id: '1',
      childName: 'Ahmad Hassan',
      description: 'Monthly Tuition - March 2024',
      amount: 150,
      dueDate: 'March 15, 2024',
      status: 'pending',
      course: 'Qur\'an Recitation & Tajweed'
    },
    {
      id: '2',
      childName: 'Aisha Hassan',
      description: 'Course Materials Fee',
      amount: 45,
      dueDate: 'March 20, 2024',
      status: 'pending',
      course: 'Arabic Language Basics'
    },
    {
      id: '3',
      childName: 'Omar Hassan',
      description: 'Monthly Tuition - February 2024',
      amount: 120,
      dueDate: 'February 28, 2024',
      status: 'overdue',
      course: 'Qur\'an Basics'
    }
  ]);

  const [recentMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'Sheikh Ahmad Hassan',
      subject: 'Ahmad\'s Excellent Progress in Tajweed',
      childName: 'Ahmad Hassan',
      time: '2 hours ago',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '2',
      from: 'Ustadha Fatima Rahman',
      subject: 'Aisha\'s Arabic Assignment Feedback',
      childName: 'Aisha Hassan',
      time: '1 day ago',
      isRead: false,
      priority: 'low'
    },
    {
      id: '3',
      from: 'Administration',
      subject: 'Payment Reminder - Omar\'s Tuition',
      childName: 'Omar Hassan',
      time: '2 days ago',
      isRead: true,
      priority: 'high'
    },
    {
      id: '4',
      from: 'Dr. Omar Al-Rashid',
      subject: 'Upcoming Exam Schedule',
      childName: 'Ahmad Hassan',
      time: '3 days ago',
      isRead: false,
      priority: 'medium'
    }
  ]);

  const [certificates] = useState<Certificate[]>([
    {
      id: '1',
      childName: 'Ahmad Hassan',
      courseName: 'Basic Qur\'an Reading',
      grade: 'A+',
      issuedDate: '2024-01-15',
      instructor: 'Sheikh Muhammad Ali',
      type: 'excellence'
    },
    {
      id: '2',
      childName: 'Aisha Hassan',
      courseName: 'Arabic Alphabet Mastery',
      grade: 'A',
      issuedDate: '2024-01-10',
      instructor: 'Ustadha Fatima Rahman',
      type: 'completion'
    },
    {
      id: '3',
      childName: 'Ahmad Hassan',
      courseName: 'Islamic Manners & Ethics',
      grade: 'A',
      issuedDate: '2023-12-20',
      instructor: 'Dr. Omar Al-Rashid',
      type: 'completion'
    }
  ]);

  const statCards = [
    {
      title: 'My Children',
      value: stats.totalChildren.toString(),
      icon: <PeopleIcon />,
      color: '#0ea5e9',
      description: 'Enrolled students'
    },
    {
      title: 'Active Courses',
      value: stats.activeCourses.toString(),
      icon: <BookIcon />,
      color: '#16a34a',
      description: 'Across all children'
    },
    {
      title: 'Upcoming Classes',
      value: stats.upcomingClasses.toString(),
      icon: <EventIcon />,
      color: '#8b5cf6',
      description: 'This week'
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments.toString(),
      icon: <PaymentIcon />,
      color: stats.pendingPayments > 0 ? '#ef4444' : '#16a34a',
      description: 'Requires attention'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return '#16a34a';
      case 'good': return '#d97706';
      case 'needs_attention': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#16a34a';
      case 'pending': return '#f59e0b';
      case 'overdue': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  return (
    <Box>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.firstName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor your children's Islamic education progress and stay connected with their learning journey.
        </Typography>
      </Box>

      {/* Main Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48 }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {stat.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Performance Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Overall Performance
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <TrendingUpIcon sx={{ color: '#16a34a' }} />
                <Typography variant="h4" component="div">
                  {stats.averagePerformance}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={stats.averagePerformance}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#f3f4f6',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: stats.averagePerformance >= 85 ? '#16a34a' : stats.averagePerformance >= 70 ? '#f59e0b' : '#ef4444',
                    borderRadius: 4
                  }
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Average across all children
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Investment
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <AccountBalanceIcon sx={{ color: '#0ea5e9' }} />
                <Typography variant="h4" component="div">
                  ${stats.totalSpent}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Invested in Islamic education this year
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Messages
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Badge badgeContent={stats.unreadMessages} color="error">
                  <MessageIcon sx={{ color: '#8b5cf6' }} />
                </Badge>
                <Typography variant="h4" component="div">
                  {stats.unreadMessages}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  unread
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                From teachers and administration
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Children Overview */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">My Children's Progress</Typography>
                <Button size="small" color="primary">
                  View Detailed Reports
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Child</TableCell>
                      <TableCell>Courses</TableCell>
                      <TableCell>Average Grade</TableCell>
                      <TableCell>Attendance</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {children.map((child) => (
                      <TableRow key={child.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {child.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {child.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {child.grade} • Age {child.age}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {child.enrolledCourses} active
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {child.upcomingClasses} upcoming
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold" color={child.averageGrade >= 85 ? 'success.main' : child.averageGrade >= 70 ? 'warning.main' : 'error.main'}>
                            {child.averageGrade}%
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold" color={child.attendance >= 90 ? 'success.main' : child.attendance >= 80 ? 'warning.main' : 'error.main'}>
                            {child.attendance}%
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={child.status.replace('_', ' ')}
                            size="small"
                            sx={{
                              bgcolor: getStatusColor(child.status),
                              color: 'white',
                              textTransform: 'capitalize'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="small" startIcon={<MessageIcon />}>
                            Contact
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Classes */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Upcoming Classes</Typography>
                <Button size="small" color="primary">
                  View Schedule
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {upcomingClasses.slice(0, 4).map((classItem) => (
                  <Paper key={classItem.id} sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                    <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                      {classItem.childName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {classItem.courseName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                      {classItem.instructor}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="caption">
                        {classItem.time} • {classItem.duration}
                      </Typography>
                      <Chip
                        label={classItem.type}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Payments */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Payment Status</Typography>
                <Button size="small" color="primary">
                  Payment History
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell>Child</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {payment.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {payment.course}
                          </Typography>
                        </TableCell>
                        <TableCell>{payment.childName}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            ${payment.amount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color={payment.status === 'overdue' ? 'error.main' : 'text.secondary'}>
                            {payment.dueDate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={payment.status}
                            size="small"
                            sx={{
                              bgcolor: getPaymentStatusColor(payment.status),
                              color: 'white',
                              textTransform: 'capitalize'
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Messages */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Recent Messages</Typography>
                <Button size="small" color="primary">
                  View All
                </Button>
              </Box>
              <List>
                {recentMessages.slice(0, 4).map((message) => (
                  <ListItem key={message.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: getPriorityColor(message.priority) }}>
                        <MessageIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight={message.isRead ? 'normal' : 'bold'}>
                            {message.subject}
                          </Typography>
                          {!message.isRead && (
                            <Badge color="error" variant="dot" />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            From: {message.from} • {message.childName}
                          </Typography>
                          <br />
                          <Typography variant="caption" color="text.secondary">
                            {message.time}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Certificates */}
        <Grid size={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Recent Achievements</Typography>
                <Button size="small" color="primary">
                  View All Certificates
                </Button>
              </Box>
              <Grid container spacing={2}>
                {certificates.map((certificate) => (
                  <Grid size={{ xs: 12, md: 4 }} key={certificate.id}>
                    <Paper sx={{ p: 2, border: 1, borderColor: 'divider', textAlign: 'center' }}>
                      <TrophyIcon sx={{ fontSize: 40, color: certificate.type === 'excellence' ? '#f59e0b' : '#16a34a', mb: 1 }} />
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        {certificate.childName}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {certificate.courseName}
                      </Typography>
                      <Chip
                        label={`Grade: ${certificate.grade}`}
                        size="small"
                        color="success"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary" display="block">
                        {certificate.instructor}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(certificate.issuedDate).toLocaleDateString()}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ParentDashboard;