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
  People as PeopleIcon,
  Event as EventIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Message as MessageIcon,
  Star as StarIcon,
  PlayArrow as PlayIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useUser } from '../../hooks/useUser';

interface TeacherStats {
  myCourses: number;
  myStudents: number;
  todaysClasses: number;
  attendanceRate: number;
  completedReports: number;
  pendingReports: number;
  upcomingClasses: number;
  averageRating: number;
}

interface Course {
  id: string;
  title: string;
  studentCount: number;
  nextClass: string;
  attendanceRate: number;
  status: 'active' | 'completed' | 'upcoming';
}

interface TodaysClass {
  id: string;
  courseName: string;
  time: string;
  duration: string;
  studentCount: number;
  type: 'regular' | 'makeup' | 'exam';
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface Student {
  id: string;
  name: string;
  course: string;
  attendance: number;
  lastActivity: string;
  status: 'excellent' | 'good' | 'needs_attention';
}

const TeacherDashboard: React.FC = () => {
  const { user } = useUser();
  const [stats] = useState<TeacherStats>({
    myCourses: 8,
    myStudents: 156,
    todaysClasses: 4,
    attendanceRate: 87,
    completedReports: 12,
    pendingReports: 3,
    upcomingClasses: 2,
    averageRating: 4.7
  });

  const [myCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Qur\'an Recitation & Tajweed',
      studentCount: 24,
      nextClass: 'Today, 2:00 PM',
      attendanceRate: 92,
      status: 'active'
    },
    {
      id: '2',
      title: 'Arabic Language Fundamentals',
      studentCount: 18,
      nextClass: 'Tomorrow, 10:00 AM',
      attendanceRate: 85,
      status: 'active'
    },
    {
      id: '3',
      title: 'Islamic Studies',
      studentCount: 32,
      nextClass: 'Wednesday, 3:00 PM',
      attendanceRate: 78,
      status: 'active'
    },
    {
      id: '4',
      title: 'Hifz Program - Level 2',
      studentCount: 12,
      nextClass: 'Thursday, 9:00 AM',
      attendanceRate: 95,
      status: 'active'
    }
  ]);

  const [todaysClasses] = useState<TodaysClass[]>([
    {
      id: '1',
      courseName: 'Qur\'an Recitation & Tajweed',
      time: '2:00 PM',
      duration: '1h 30m',
      studentCount: 24,
      type: 'regular',
      status: 'upcoming'
    },
    {
      id: '2',
      courseName: 'Islamic Studies',
      time: '4:00 PM',
      duration: '1h',
      studentCount: 32,
      type: 'regular',
      status: 'upcoming'
    },
    {
      id: '3',
      courseName: 'Hifz Program - Level 2',
      time: '6:00 PM',
      duration: '45m',
      studentCount: 12,
      type: 'regular',
      status: 'upcoming'
    }
  ]);

  const [recentStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Ahmad Hassan',
      course: 'Qur\'an Recitation',
      attendance: 95,
      lastActivity: '2 hours ago',
      status: 'excellent'
    },
    {
      id: '2',
      name: 'Aisha Abdullah',
      course: 'Arabic Language',
      attendance: 88,
      lastActivity: '1 day ago',
      status: 'good'
    },
    {
      id: '3',
      name: 'Omar Al-Rashid',
      course: 'Islamic Studies',
      attendance: 65,
      lastActivity: '3 days ago',
      status: 'needs_attention'
    },
    {
      id: '4',
      name: 'Fatima Rahman',
      course: 'Hifz Program',
      attendance: 98,
      lastActivity: '1 hour ago',
      status: 'excellent'
    }
  ]);

  const statCards = [
    {
      title: 'My Courses',
      value: stats.myCourses.toString(),
      icon: <BookIcon />,
      color: '#0ea5e9',
      description: 'Active courses'
    },
    {
      title: 'My Students',
      value: stats.myStudents.toString(),
      icon: <PeopleIcon />,
      color: '#16a34a',
      description: 'Total enrolled'
    },
    {
      title: 'Today\'s Classes',
      value: stats.todaysClasses.toString(),
      icon: <EventIcon />,
      color: '#8b5cf6',
      description: 'Scheduled today'
    },
    {
      title: 'Attendance Rate',
      value: `${stats.attendanceRate}%`,
      icon: <CheckCircleIcon />,
      color: '#d97706',
      description: 'This month'
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

  const getClassStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#0ea5e9';
      case 'ongoing': return '#16a34a';
      case 'completed': return '#6b7280';
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
          Ready to inspire and educate your students today?
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
                Teaching Performance
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <StarIcon sx={{ color: '#f59e0b' }} />
                <Typography variant="h4" component="div">
                  {stats.averageRating.toFixed(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  / 5.0
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(stats.averageRating / 5) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#f3f4f6',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#f59e0b',
                    borderRadius: 4
                  }
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Student feedback rating
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Class Attendance
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <CheckCircleIcon sx={{ color: '#16a34a' }} />
                <Typography variant="h4" component="div">
                  {stats.attendanceRate}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={stats.attendanceRate}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#f3f4f6',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#16a34a',
                    borderRadius: 4
                  }
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Average across all courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Reports Status
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <AssignmentIcon sx={{ color: stats.pendingReports > 0 ? '#ef4444' : '#16a34a' }} />
                <Typography variant="h4" component="div">
                  {stats.pendingReports}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  pending
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {stats.completedReports} completed this month
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
                <Button size="small" startIcon={<AddIcon />}>
                  Add Class
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Students</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todaysClasses.map((classItem) => (
                      <TableRow key={classItem.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {classItem.courseName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {classItem.duration}
                          </Typography>
                        </TableCell>
                        <TableCell>{classItem.time}</TableCell>
                        <TableCell>{classItem.studentCount}</TableCell>
                        <TableCell>
                          <Chip
                            label={classItem.status}
                            size="small"
                            sx={{
                              bgcolor: getClassStatusColor(classItem.status),
                              color: 'white',
                              textTransform: 'capitalize'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="small" startIcon={<PlayIcon />}>
                            Start
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

        {/* My Courses */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">My Courses</Typography>
                <Button size="small" color="primary">
                  View All
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {myCourses.slice(0, 4).map((course) => (
                  <Paper key={course.id} sx={{ p: 2, border: 1, borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {course.title}
                      </Typography>
                      <Chip
                        label={course.status}
                        size="small"
                        color={course.status === 'active' ? 'success' : 'default'}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {course.studentCount} students • Next: {course.nextClass}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption">Attendance:</Typography>
                        <Typography variant="caption" fontWeight="bold" color={course.attendanceRate >= 85 ? 'success.main' : 'warning.main'}>
                          {course.attendanceRate}%
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="small" startIcon={<VisibilityIcon />}>
                          View
                        </Button>
                        <Button size="small" startIcon={<EditIcon />}>
                          Edit
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Student Activity */}
        <Grid size={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Student Performance Overview</Typography>
                <Button size="small" color="primary">
                  View All Students
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell>Course</TableCell>
                      <TableCell>Attendance</TableCell>
                      <TableCell>Last Activity</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {student.name.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" fontWeight="medium">
                              {student.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" fontWeight="bold" color={student.attendance >= 85 ? 'success.main' : 'warning.main'}>
                              {student.attendance}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {student.lastActivity}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={student.status.replace('_', ' ')}
                            size="small"
                            sx={{
                              bgcolor: getStatusColor(student.status),
                              color: 'white',
                              textTransform: 'capitalize'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="small" startIcon={<MessageIcon />}>
                            Message
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
      </Grid>
    </Box>
  );
};

export default TeacherDashboard;