import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  // TextField,
  // InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  CircularProgress,
  Alert,
  LinearProgress,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  // Search as SearchIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  TrendingUp as TrendingUpIcon,
  // CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { useTheme } from '../hooks/useTheme';
// import { useUser } from '../hooks/useUser';

interface Child {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  enrolledCourses: Course[];
  overallProgress: number;
  totalAssignments: number;
  completedAssignments: number;
  averageGrade: number;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  grade: number;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  enrollmentDate: string;
  lastActivity: string;
  assignments: Assignment[];
  upcomingDeadlines: Deadline[];
}

interface Assignment {
  id: string;
  title: string;
  type: 'HOMEWORK' | 'QUIZ' | 'PROJECT' | 'EXAM';
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
  grade?: number;
  maxGrade: number;
  dueDate: string;
  submittedDate?: string;
}

interface Deadline {
  id: string;
  title: string;
  type: 'ASSIGNMENT' | 'QUIZ' | 'EXAM' | 'PROJECT';
  dueDate: string;
  courseTitle: string;
}

const ChildrenProgress: React.FC = () => {
  const { isDarkMode } = useTheme();
  // const { user } = useUser();
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  // const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchChildrenProgress = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call to fetch children progress
        // const response = await fetch('/api/children/progress');
        // const childrenData = await response.json();
        
        // Temporary empty array until backend is ready
        const childrenData: Child[] = [];
        
        setChildren(childrenData);
        if (childrenData.length > 0) {
          setSelectedChild(childrenData[0].id);
        }
      } catch (error) {
        console.error('Error fetching children progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChildrenProgress();
  }, []);

  const selectedChildData = children.find(child => child.id === selectedChild);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return '#10b981';
      case 'COMPLETED': return '#3b82f6';
      case 'PAUSED': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getAssignmentTypeColor = (type: string) => {
    switch (type) {
      case 'HOMEWORK': return '#10b981';
      case 'QUIZ': return '#3b82f6';
      case 'PROJECT': return '#8b5cf6';
      case 'EXAM': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return '#10b981';
    if (grade >= 80) return '#3b82f6';
    if (grade >= 70) return '#f59e0b';
    return '#ef4444';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (children.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          No children found. Please ensure your children are enrolled in courses.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
        Children's Progress
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: isDarkMode ? '#94a3b8' : '#64748b' }}>
        Monitor your children's academic progress and performance
      </Typography>

      {/* Child Selection */}
      <Box sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>Select Child</InputLabel>
          <Select
            value={selectedChild}
            label="Select Child"
            onChange={(e) => setSelectedChild(e.target.value)}
            sx={{
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode ? '#475569' : '#d1d5db',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode ? '#64748b' : '#9ca3af',
              },
              '& .MuiSelect-select': {
                color: isDarkMode ? '#f1f5f9' : '#1f2937',
              },
            }}
          >
            {children.map((child) => (
              <MenuItem key={child.id} value={child.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <PersonIcon />
                  </Avatar>
                  {child.firstName} {child.lastName}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedChildData && (
        <>
          {/* Overview Cards */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
            <Card sx={{
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TrendingUpIcon sx={{ color: '#10b981' }} />
                  <Box>
                    <Typography variant="h4" sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', fontWeight: 600 }}>
                      {selectedChildData.overallProgress}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                      Overall Progress
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SchoolIcon sx={{ color: '#3b82f6' }} />
                  <Box>
                    <Typography variant="h4" sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', fontWeight: 600 }}>
                      {selectedChildData.enrolledCourses.length}
                    </Typography>
                    <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                      Enrolled Courses
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <AssignmentIcon sx={{ color: '#8b5cf6' }} />
                  <Box>
                    <Typography variant="h4" sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', fontWeight: 600 }}>
                      {selectedChildData.completedAssignments}/{selectedChildData.totalAssignments}
                    </Typography>
                    <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                      Assignments
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <QuizIcon sx={{ color: getGradeColor(selectedChildData.averageGrade) }} />
                  <Box>
                    <Typography variant="h4" sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', fontWeight: 600 }}>
                      {selectedChildData.averageGrade.toFixed(1)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                      Average Grade
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Tabs */}
          <Card sx={{
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          }}>
            <Tabs
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(newValue)}
              sx={{
                borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                '& .MuiTab-root': {
                  color: isDarkMode ? '#94a3b8' : '#64748b',
                },
                '& .Mui-selected': {
                  color: isDarkMode ? '#f1f5f9' : '#1e293b',
                },
              }}
            >
              <Tab label="Courses" />
              <Tab label="Recent Assignments" />
              <Tab label="Upcoming Deadlines" />
            </Tabs>

            <CardContent>
              {selectedTab === 0 && (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3 }}>
                  {selectedChildData.enrolledCourses.map((course) => (
                    <Card
                      key={course.id}
                      sx={{
                        backgroundColor: isDarkMode ? '#334155' : '#f8fafc',
                        border: isDarkMode ? '1px solid #475569' : '1px solid #e2e8f0',
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', mb: 1 }}>
                              {course.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b', mb: 1 }}>
                              Instructor: {course.instructor}
                            </Typography>
                          </Box>
                          <Chip
                            label={course.status}
                            size="small"
                            sx={{
                              backgroundColor: getStatusColor(course.status),
                              color: 'white',
                              fontWeight: 500,
                            }}
                          />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                              Progress
                            </Typography>
                            <Typography variant="body2" sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', fontWeight: 600 }}>
                              {course.progress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={course.progress}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: isDarkMode ? '#475569' : '#e2e8f0',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: '#10b981',
                              },
                            }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                              Current Grade
                            </Typography>
                            <Typography variant="h6" sx={{ color: getGradeColor(course.grade), fontWeight: 600 }}>
                              {course.grade}%
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                              Last Activity
                            </Typography>
                            <Typography variant="body2" sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
                              {new Date(course.lastActivity).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}

              {selectedTab === 1 && (
                <List>
                  {selectedChildData.enrolledCourses.flatMap(course => 
                    course.assignments.map(assignment => (
                      <React.Fragment key={assignment.id}>
                        <ListItem>
                          <ListItemIcon>
                            <AssignmentIcon sx={{ color: getAssignmentTypeColor(assignment.type) }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
                                  {assignment.title}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                  <Chip
                                    label={assignment.type}
                                    size="small"
                                    sx={{
                                      backgroundColor: getAssignmentTypeColor(assignment.type),
                                      color: 'white',
                                      fontWeight: 500,
                                    }}
                                  />
                                  {assignment.grade !== undefined && (
                                    <Typography variant="h6" sx={{ color: getGradeColor(assignment.grade), fontWeight: 600 }}>
                                      {assignment.grade}/{assignment.maxGrade}
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                                  Course: {course.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                  {assignment.submittedDate && (
                                    <> • Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}</>
                                  )}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))
                  )}
                </List>
              )}

              {selectedTab === 2 && (
                <List>
                  {selectedChildData.enrolledCourses.flatMap(course => 
                    course.upcomingDeadlines.map(deadline => (
                      <React.Fragment key={deadline.id}>
                        <ListItem>
                          <ListItemIcon>
                            <ScheduleIcon sx={{ color: '#f59e0b' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
                                  {deadline.title}
                                </Typography>
                                <Chip
                                  label={deadline.type}
                                  size="small"
                                  sx={{
                                    backgroundColor: getAssignmentTypeColor(deadline.type),
                                    color: 'white',
                                    fontWeight: 500,
                                  }}
                                />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                                  Course: {deadline.courseTitle}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#f59e0b', fontWeight: 500 }}>
                                  Due: {new Date(deadline.dueDate).toLocaleDateString()}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))
                  )}
                  {selectedChildData.enrolledCourses.every(course => course.upcomingDeadlines.length === 0) && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      No upcoming deadlines for {selectedChildData.firstName}.
                    </Alert>
                  )}
                </List>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default ChildrenProgress;