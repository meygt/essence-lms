import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Alert
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  School,
  Assignment,
  Download,
  Refresh,
  BarChart,
  Timeline
} from '@mui/icons-material';
import { useAnalytics } from '../../hooks/useAnalytics';

interface TeacherCourse {
  id: string;
  title: string;
  students: number;
  completionRate: number;
  revenue: number;
}

interface TeacherStudent {
  id: string;
  name: string;
  email: string;
  progress: number;
  lastActivity: string;
}


const TeacherAnalytics: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [timeRange, setTimeRange] = useState('month');

  const { data: analytics, loading, error } = useAnalytics();

  interface StatCardProps {
    title: string;
    value: string;
    change?: number;
    icon: React.ReactNode;
    color: string;
    subtitle?: string;
  }

  const StatCard = ({ title, value, change, icon, color, subtitle }: StatCardProps) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
            {change !== undefined && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                {change >= 0 ? (
                  <TrendingUp sx={{ color: 'success.main', mr: 0.5, fontSize: 16 }} />
                ) : (
                  <TrendingDown sx={{ color: 'error.main', mr: 0.5, fontSize: 16 }} />
                )}
                <Typography
                  variant="body2"
                  sx={{ color: change >= 0 ? 'success.main' : 'error.main' }}
                >
                  {Math.abs(change)}% from last month
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const renderOverview = () => (
    <Grid container spacing={3}>
      {/* Key Metrics for Teacher */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="My Students"
          value={analytics?.myStudents?.toString() || '0'}
          change={analytics?.studentGrowth || 0}
          icon={<People />}
          color="primary"
          subtitle={`${analytics?.activeStudents || 0} active`}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="My Courses"
          value={analytics?.myCourses?.toString() || '0'}
          change={analytics?.courseGrowth || 0}
          icon={<School />}
          color="info"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="Assignments"
          value={analytics?.totalAssignments?.toString() || '0'}
          change={analytics?.assignmentGrowth || 0}
          icon={<Assignment />}
          color="warning"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title="Avg Completion"
          value={`${analytics?.avgCompletionRate || 0}%`}
          change={analytics?.completionGrowth || 0}
          icon={<TrendingUp />}
          color="success"
        />
      </Grid>

      {/* My Courses Performance */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              My Courses Performance
            </Typography>
            {analytics?.myCoursesList && analytics.myCoursesList.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course</TableCell>
                      <TableCell align="right">Students</TableCell>
                      <TableCell align="right">Completion</TableCell>
                      <TableCell align="right">Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analytics.myCoursesList.map((course: TeacherCourse, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{course.title}</TableCell>
                        <TableCell align="right">{course.students}</TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {course.completionRate}%
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={course.completionRate}
                              sx={{ width: 60, height: 6, borderRadius: 3 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label="N/A"
                            color="default"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Alert severity="info">
                You haven't created any courses yet. Create your first course to see performance data.
              </Alert>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Top Students */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Top Students
            </Typography>
            {analytics?.myTopStudents && analytics.myTopStudents.length > 0 ? (
              <List>
                {analytics.myTopStudents.map((student: TeacherStudent, index: number) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {student.name.split(' ').map((n: string) => n[0]).join('')}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={student.name}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {student.email}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <LinearProgress
                              variant="determinate"
                              value={student.progress}
                              sx={{ flex: 1, mr: 1, height: 4, borderRadius: 2 }}
                            />
                            <Chip label={`${student.progress}%`} size="small" color="success" />
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Alert severity="info">
                No student data available yet.
              </Alert>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderStudentProgress = () => (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Student Progress Overview
            </Typography>
            <Alert severity="info">
              Student progress analytics will be available once students start enrolling in your courses.
            </Alert>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderAssignmentAnalytics = () => (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Assignment Analytics
            </Typography>
            <Alert severity="info">
              Assignment analytics will be available once you create assignments for your courses.
            </Alert>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Typography>Loading analytics...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error loading analytics: {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          My Teaching Analytics
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<Refresh />}>
            Refresh
          </Button>
          <Button variant="contained" startIcon={<Download />}>
            Export
          </Button>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab icon={<BarChart />} label="Overview" />
          <Tab icon={<People />} label="Students" />
          <Tab icon={<Assignment />} label="Assignments" />
          <Tab icon={<Timeline />} label="Performance" />
        </Tabs>
      </Box>

      {selectedTab === 0 && renderOverview()}
      {selectedTab === 1 && renderStudentProgress()}
      {selectedTab === 2 && renderAssignmentAnalytics()}
      {selectedTab === 3 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="textSecondary">
            Performance analytics coming soon...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TeacherAnalytics;