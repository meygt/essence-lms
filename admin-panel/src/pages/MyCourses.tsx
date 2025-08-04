import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Button, Grid, Card, CardContent, CardActions, 
  Chip, IconButton, Dialog, Alert, LinearProgress,
  Avatar, List, ListItem, ListItemText, ListItemIcon, Tab, Tabs
} from '@mui/material';
import { 
  PlayArrow, Assignment, Quiz, VideoLibrary, Download, 
  Star, BookmarkBorder, Bookmark,
  Close, CheckCircle, Person, AccessTime
} from '@mui/icons-material';

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
  category: string;
  difficulty: string;
  rating: number;
  enrolled: string;
  description: string;
  duration: string;
  isBookmarked: boolean;
}

const MyCourses: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [courseDialog, setCourseDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showError, setShowError] = useState(false);

  // Mock user role - in real app this would come from auth context
  const userRole = 'student'; // Could be 'student', 'parent', 'teacher'

  // Mock courses data
  const myCourses: Course[] = [
    {
      id: 'MATH101',
      title: 'Advanced Mathematics',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextLesson: 'Calculus Integration',
      category: 'Mathematics',
      difficulty: 'Advanced',
      rating: 4.8,
      enrolled: '2024-01-15',
      description: 'Comprehensive course covering advanced mathematical concepts including calculus, algebra, and statistics.',
      duration: '12 weeks',
      isBookmarked: true
    },
    {
      id: 'SCI201',
      title: 'Physics Fundamentals',
      instructor: 'Prof. Michael Chen',
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      nextLesson: 'Newton\'s Laws of Motion',
      category: 'Science',
      difficulty: 'Intermediate',
      rating: 4.6,
      enrolled: '2024-01-20',
      description: 'Introduction to fundamental physics concepts including mechanics, thermodynamics, and electromagnetism.',
      duration: '10 weeks',
      isBookmarked: false
    },
    {
      id: 'ENG301',
      title: 'English Literature',
      instructor: 'Dr. Emily Watson',
      progress: 90,
      totalLessons: 16,
      completedLessons: 14,
      nextLesson: 'Modern Poetry Analysis',
      category: 'Literature',
      difficulty: 'Advanced',
      rating: 4.9,
      enrolled: '2024-01-10',
      description: 'Explore classic and modern literature with focus on critical analysis and writing skills.',
      duration: '8 weeks',
      isBookmarked: true
    },
    {
      id: 'HIST101',
      title: 'World History',
      instructor: 'Prof. David Brown',
      progress: 30,
      totalLessons: 18,
      completedLessons: 5,
      nextLesson: 'Ancient Civilizations',
      category: 'History',
      difficulty: 'Beginner',
      rating: 4.4,
      enrolled: '2024-02-01',
      description: 'Journey through world history from ancient civilizations to modern times.',
      duration: '14 weeks',
      isBookmarked: false
    }
  ];

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setCourseDialog(true);
  };

  const handleContinueLearning = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const toggleBookmark = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'warning';
    return 'error';
  };

  const filteredCourses = () => {
    switch (selectedTab) {
      case 0: return myCourses; // All courses
      case 1: return myCourses.filter(course => course.progress < 100); // In Progress
      case 2: return myCourses.filter(course => course.progress === 100); // Completed (none in mock data)
      case 3: return myCourses.filter(course => course.isBookmarked); // Bookmarked
      default: return myCourses;
    }
  };

  return (
    <Box>
      {/* Error Alert */}
      {showError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          This feature is not implemented yet. This is just a demo interface.
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          My Courses
        </Typography>
        <Chip 
          label={`${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard`}
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>

      {/* Course Tabs */}
      <Paper sx={{ 
        mb: 3, 
        background: 'rgba(255, 255, 255, 0.05)', 
        backdropFilter: 'blur(10px)', 
        border: '1px solid rgba(255, 255, 255, 0.1)' 
      }}>
        <Tabs 
          value={selectedTab} 
          onChange={(_, newValue) => setSelectedTab(newValue)}
          sx={{ px: 2 }}
        >
          <Tab label="All Courses" />
          <Tab label="In Progress" />
          <Tab label="Completed" />
          <Tab label="Bookmarked" />
        </Tabs>
      </Paper>

      {/* Course Statistics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            backdropFilter: 'blur(10px)', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover': { transform: 'translateY(-4px)' },
            transition: 'all 0.3s ease'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                }}>
                  <BookmarkBorder sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Total Courses</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{myCourses.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            backdropFilter: 'blur(10px)', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover': { transform: 'translateY(-4px)' },
            transition: 'all 0.3s ease'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' 
                }}>
                  <PlayArrow sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>In Progress</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                    {myCourses.filter(c => c.progress < 100).length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            backdropFilter: 'blur(10px)', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover': { transform: 'translateY(-4px)' },
            transition: 'all 0.3s ease'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' 
                }}>
                  <CheckCircle sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Completed</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>0</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            backdropFilter: 'blur(10px)', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover': { transform: 'translateY(-4px)' },
            transition: 'all 0.3s ease'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' 
                }}>
                  <Star sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Avg. Rating</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>4.7</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Course Cards */}
      <Grid container spacing={3}>
        {filteredCourses().map((course) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={course.id}>
            <Card sx={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              backdropFilter: 'blur(10px)', 
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '&:hover': { transform: 'translateY(-4px)' },
              transition: 'all 0.3s ease',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                    {course.title}
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => toggleBookmark()}
                    sx={{ color: course.isBookmarked ? 'warning.main' : 'text.secondary' }}
                  >
                    {course.isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                  </IconButton>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <Person />
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    {course.instructor}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip 
                    label={course.category} 
                    size="small" 
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                  />
                  <Chip 
                    label={course.difficulty} 
                    size="small" 
                    color={getDifficultyColor(course.difficulty) as 'success' | 'warning' | 'error' | 'default'}
                    variant="filled"
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Progress: {course.completedLessons}/{course.totalLessons} lessons
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {course.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={course.progress} 
                    color={getProgressColor(course.progress) as 'success' | 'warning' | 'error'}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Next: {course.nextLesson}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                    <Typography variant="body2">{course.rating}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">{course.duration}</Typography>
                  </Box>
                </Box>
              </CardContent>
              
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  startIcon={<PlayArrow />}
                  onClick={() => handleContinueLearning()}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    }
                  }}
                >
                  Continue Learning
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => handleViewCourse(course)}
                  sx={{ ml: 1 }}
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Course Details Dialog */}
      <Dialog open={courseDialog} onClose={() => setCourseDialog(false)} maxWidth="md" fullWidth>
        {selectedCourse && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {selectedCourse.title}
              </Typography>
              <IconButton onClick={() => setCourseDialog(false)}>
                <Close />
              </IconButton>
            </Box>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {selectedCourse.description}
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Course Progress</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2">
                      {selectedCourse.completedLessons} of {selectedCourse.totalLessons} lessons completed
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {selectedCourse.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={selectedCourse.progress} 
                    color={getProgressColor(selectedCourse.progress) as 'success' | 'warning' | 'error'}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Course Content</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><VideoLibrary color="primary" /></ListItemIcon>
                    <ListItemText primary="Video Lectures" secondary="24 high-quality video lessons" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Assignment color="primary" /></ListItemIcon>
                    <ListItemText primary="Assignments" secondary="8 practical assignments" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Quiz color="primary" /></ListItemIcon>
                    <ListItemText primary="Quizzes" secondary="12 knowledge check quizzes" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Download color="primary" /></ListItemIcon>
                    <ListItemText primary="Resources" secondary="Downloadable materials and references" />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 2, background: 'rgba(255, 255, 255, 0.05)' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Course Info</Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Instructor</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{selectedCourse.instructor}</Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Duration</Typography>
                    <Typography variant="body1">{selectedCourse.duration}</Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Difficulty</Typography>
                    <Chip 
                      label={selectedCourse.difficulty} 
                      size="small" 
                      color={getDifficultyColor(selectedCourse.difficulty) as 'success' | 'warning' | 'error' | 'default'}
                      variant="filled"
                    />
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Rating</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Star sx={{ color: 'warning.main' }} />
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{selectedCourse.rating}</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary">Enrolled</Typography>
                    <Typography variant="body1">{new Date(selectedCourse.enrolled).toLocaleDateString()}</Typography>
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    fullWidth
                    startIcon={<PlayArrow />}
                    onClick={() => handleContinueLearning()}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      }
                    }}
                  >
                    Continue Learning
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Dialog>
    </Box>
  );
};

export default MyCourses;