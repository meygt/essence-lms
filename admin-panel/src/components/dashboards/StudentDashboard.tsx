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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingUpIcon,
  PlayArrow as PlayIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useUser } from '../../hooks/useUser';

interface StudentStats {
  enrolledCourses: number;
  completedCourses: number;
  upcomingClasses: number;
  certificatesEarned: number;
  totalStudyHours: number;
  averageGrade: number;
  currentStreak: number;
  assignmentsPending: number;
}

interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  nextClass: string;
  totalLessons: number;
  completedLessons: number;
  status: 'active' | 'completed' | 'paused';
  grade?: string;
}

interface UpcomingClass {
  id: string;
  courseName: string;
  instructor: string;
  time: string;
  duration: string;
  type: 'lecture' | 'practice' | 'exam' | 'review';
  status: 'upcoming' | 'live' | 'completed';
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  priority: 'high' | 'medium' | 'low';
}

interface Certificate {
  id: string;
  courseName: string;
  issuedDate: string;
  grade: string;
  instructor: string;
  type: 'completion' | 'excellence' | 'participation';
}

const StudentDashboard: React.FC = () => {
  const { user } = useUser();
  const [stats] = useState<StudentStats>({
    enrolledCourses: 6,
    completedCourses: 3,
    upcomingClasses: 2,
    certificatesEarned: 3,
    totalStudyHours: 124,
    averageGrade: 87,
    currentStreak: 12,
    assignmentsPending: 4
  });

  const [enrolledCourses] = useState<EnrolledCourse[]>([
    {
      id: '1',
      title: 'Qur\'an Recitation & Tajweed',
      instructor: 'Sheikh Ahmad Hassan',
      progress: 75,
      nextClass: 'Today, 2:00 PM',
      totalLessons: 20,
      completedLessons: 15,
      status: 'active'
    },
    {
      id: '2',
      title: 'Arabic Language Fundamentals',
      instructor: 'Ustadha Aisha Abdullah',
      progress: 60,
      nextClass: 'Tomorrow, 10:00 AM',
      totalLessons: 25,
      completedLessons: 15,
      status: 'active'
    },
    {
      id: '3',
      title: 'Islamic Studies',
      instructor: 'Dr. Omar Al-Rashid',
      progress: 100,
      nextClass: 'Completed',
      totalLessons: 18,
      completedLessons: 18,
      status: 'completed',
      grade: 'A+'
    },
    {
      id: '4',
      title: 'Hifz Program - Juz 1',
      instructor: 'Hafiz Yusuf Rahman',
      progress: 40,
      nextClass: 'Wednesday, 6:00 PM',
      totalLessons: 30,
      completedLessons: 12,
      status: 'active'
    }
  ]);

  const [upcomingClasses] = useState<UpcomingClass[]>([
    {
      id: '1',
      courseName: 'Qur\'an Recitation & Tajweed',
      instructor: 'Sheikh Ahmad Hassan',
      time: '2:00 PM',
      duration: '1h 30m',
      type: 'lecture',
      status: 'upcoming'
    },
    {
      id: '2',
      courseName: 'Hifz Program - Juz 1',
      instructor: 'Hafiz Yusuf Rahman',
      time: '6:00 PM',
      duration: '1h',
      type: 'practice',
      status: 'upcoming'
    }
  ]);

  const [assignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Tajweed Rules Assessment',
      course: 'Qur\'an Recitation',
      dueDate: 'Tomorrow',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Arabic Grammar Exercise',
      course: 'Arabic Language',
      dueDate: 'In 3 days',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Memorization Progress Check',
      course: 'Hifz Program',
      dueDate: 'Next week',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Islamic History Essay',
      course: 'Islamic Studies',
      dueDate: 'Submitted',
      status: 'graded',
      grade: 'A',
      priority: 'low'
    }
  ]);

  const [certificates] = useState<Certificate[]>([
    {
      id: '1',
      courseName: 'Islamic Studies',
      issuedDate: '2024-01-15',
      grade: 'A+',
      instructor: 'Dr. Omar Al-Rashid',
      type: 'excellence'
    },
    {
      id: '2',
      courseName: 'Basic Arabic',
      issuedDate: '2023-12-20',
      grade: 'A',
      instructor: 'Ustadha Fatima Rahman',
      type: 'completion'
    },
    {
      id: '3',
      courseName: 'Qur\'an Basics',
      issuedDate: '2023-11-10',
      grade: 'B+',
      instructor: 'Sheikh Muhammad Ali',
      type: 'completion'
    }
  ]);

  const statCards = [
    {
      title: 'Enrolled Courses',
      value: stats.enrolledCourses.toString(),
      icon: <BookIcon />,
      color: '#0ea5e9',
      description: 'Currently active'
    },
    {
      title: 'Study Hours',
      value: stats.totalStudyHours.toString(),
      icon: <TimeIcon />,
      color: '#16a34a',
      description: 'Total this semester'
    },
    {
      title: 'Upcoming Classes',
      value: stats.upcomingClasses.toString(),
      icon: <EventIcon />,
      color: '#8b5cf6',
      description: 'Today'
    },
    {
      title: 'Certificates',
      value: stats.certificatesEarned.toString(),
      icon: <TrophyIcon />,
      color: '#d97706',
      description: 'Earned'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#16a34a';
      case 'completed': return '#0ea5e9';
      case 'paused': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return '#0ea5e9';
      case 'practice': return '#16a34a';
      case 'exam': return '#ef4444';
      case 'review': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <Box>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.firstName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Continue your Islamic education journey with dedication and excellence.
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

      {/* Performance Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Academic Performance
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <StarIcon sx={{ color: '#f59e0b' }} />
                <Typography variant="h4" component="div">
                  {stats.averageGrade}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={stats.averageGrade}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#f3f4f6',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: stats.averageGrade >= 85 ? '#16a34a' : stats.averageGrade >= 70 ? '#f59e0b' : '#ef4444',
                    borderRadius: 4
                  }
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Average grade across all courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Study Streak
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <TrendingUpIcon sx={{ color: '#16a34a' }} />
                <Typography variant="h4" component="div">
                  {stats.currentStreak}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  days
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Keep up the excellent consistency!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending Assignments
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <AssignmentIcon sx={{ color: stats.assignmentsPending > 0 ? '#ef4444' : '#16a34a' }} />
                <Typography variant="h4" component="div">
                  {stats.assignmentsPending}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {stats.assignmentsPending > 0 ? 'Complete them soon!' : 'All caught up!'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Today's Classes */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Today's Classes</Typography>
                <Button size="small" color="primary">
                  View Schedule
                </Button>
              </Box>
              {upcomingClasses.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {upcomingClasses.map((classItem) => (
                    <Paper key={classItem.id} sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {classItem.courseName}
                        </Typography>
                        <Chip
                          label={classItem.type}
                          size="small"
                          sx={{
                            bgcolor: getTypeColor(classItem.type),
                            color: 'white',
                            textTransform: 'capitalize'
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {classItem.instructor}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body2">
                          {classItem.time} • {classItem.duration}
                        </Typography>
                        <Button size="small" startIcon={<PlayIcon />} variant="contained">
                          Join Class
                        </Button>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                  No classes scheduled for today
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Enrolled Courses */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">My Courses</Typography>
                <Button size="small" color="primary">
                  Browse Courses
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {enrolledCourses.slice(0, 4).map((course) => (
                  <Paper key={course.id} sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {course.title}
                      </Typography>
                      <Chip
                        label={course.status}
                        size="small"
                        sx={{
                          bgcolor: getStatusColor(course.status),
                          color: 'white',
                          textTransform: 'capitalize'
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {course.instructor}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="caption">Progress:</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                      />
                      <Typography variant="caption" fontWeight="bold">
                        {course.progress}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">
                        {course.completedLessons}/{course.totalLessons} lessons
                        {course.grade && ` • Grade: ${course.grade}`}
                      </Typography>
                      <Button size="small" startIcon={<VisibilityIcon />}>
                        Continue
                      </Button>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Assignments */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Assignments</Typography>
                <Button size="small" color="primary">
                  View All
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Assignment</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assignments.slice(0, 4).map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {assignment.title}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {assignment.course}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color={assignment.status === 'pending' && assignment.priority === 'high' ? 'error.main' : 'text.secondary'}>
                            {assignment.dueDate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={assignment.status === 'graded' ? `${assignment.status} (${assignment.grade})` : assignment.status}
                            size="small"
                            color={assignment.status === 'graded' ? 'success' : assignment.status === 'submitted' ? 'info' : 'warning'}
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

        {/* Certificates */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">My Certificates</Typography>
                <Button size="small" color="primary">
                  View All
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {certificates.map((certificate) => (
                  <Paper key={certificate.id} sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {certificate.courseName}
                      </Typography>
                      <Chip
                        label={certificate.type}
                        size="small"
                        color={certificate.type === 'excellence' ? 'warning' : 'success'}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Instructor: {certificate.instructor}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Issued: {new Date(certificate.issuedDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" sx={{ ml: 2, fontWeight: 'bold', color: 'success.main' }}>
                          Grade: {certificate.grade}
                        </Typography>
                      </Box>
                      <Button size="small" startIcon={<DownloadIcon />}>
                        Download
                      </Button>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;