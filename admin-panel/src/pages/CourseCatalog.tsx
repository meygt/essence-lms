import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  // Grid,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  School as SchoolIcon,
  AccessTime as TimeIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../hooks/useTheme';
import { useUser } from '../hooks/useUser';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolledStudents: number;
  price: number;
  category: string;
  thumbnail?: string;
}

const CourseCatalog: React.FC = () => {
  const { isDarkMode } = useCustomTheme();
  const { user } = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call when backend is ready
        // const response = await api.get('/courses');
        // setCourses(response.data);
        
        // For now, return empty array until backend is implemented
        setCourses([]);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const categories = ['all', ...Array.from(new Set(courses.map(course => course.category)))];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  const handleEnroll = (courseId: string) => {
    // Handle enrollment logic
    console.log(`Enrolling in course: ${courseId}`);
    // This would typically make an API call to enroll the user
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        color: isDarkMode ? '#ffffff' : '#1e293b',
        fontWeight: 'bold',
        mb: 3
      }}>
        Course Catalog
      </Typography>

      <Typography variant="body1" sx={{ 
        color: isDarkMode ? '#cbd5e1' : '#64748b',
        mb: 4
      }}>
        {user?.role === 'STUDENT' 
          ? 'Discover and enroll in courses to enhance your Islamic knowledge.'
          : 'Browse available courses for your children.'}
      </Typography>

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
          <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '200px' } }}>
            <TextField
              fullWidth
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isDarkMode ? '#334155' : '#ffffff',
                  '& fieldset': {
                    borderColor: isDarkMode ? '#475569' : '#e2e8f0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#d4af37',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#d4af37',
                  },
                },
                '& .MuiInputBase-input': {
                  color: isDarkMode ? '#ffffff' : '#1e293b',
                },
              }}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '200px' } }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category"
                sx={{
                  backgroundColor: isDarkMode ? '#334155' : '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#475569' : '#e2e8f0',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d4af37',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d4af37',
                  },
                  '& .MuiSelect-select': {
                    color: isDarkMode ? '#ffffff' : '#1e293b',
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '200px' } }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>Level</InputLabel>
              <Select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                label="Level"
                sx={{
                  backgroundColor: isDarkMode ? '#334155' : '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#475569' : '#e2e8f0',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d4af37',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d4af37',
                  },
                  '& .MuiSelect-select': {
                    color: isDarkMode ? '#ffffff' : '#1e293b',
                  },
                }}
              >
                {levels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No courses found matching your criteria.
        </Alert>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {filteredCourses.map((course) => (
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: isDarkMode ? '#334155' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`,
                '&:hover': {
                  boxShadow: isDarkMode 
                    ? '0 8px 25px rgba(0, 0, 0, 0.3)' 
                    : '0 8px 25px rgba(0, 0, 0, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{
                      color: isDarkMode ? '#ffffff' : '#1e293b',
                      fontWeight: 'bold',
                      lineHeight: 1.3
                    }}>
                      {course.title}
                    </Typography>
                    <Chip 
                      label={course.level} 
                      size="small" 
                      color={getLevelColor(course.level) as 'success' | 'warning' | 'error' | 'default'}
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  
                  <Typography variant="body2" sx={{
                    color: isDarkMode ? '#cbd5e1' : '#64748b',
                    mb: 2,
                    lineHeight: 1.5
                  }}>
                    {course.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SchoolIcon sx={{ fontSize: 16, color: '#d4af37', mr: 1 }} />
                    <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                      {course.instructor}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TimeIcon sx={{ fontSize: 16, color: '#d4af37', mr: 1 }} />
                    <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                      {course.duration}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StarIcon sx={{ fontSize: 16, color: '#fbbf24', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                        {course.rating} ({course.enrolledStudents} students)
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{
                      color: '#d4af37',
                      fontWeight: 'bold'
                    }}>
                      ${course.price}
                    </Typography>
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleEnroll(course.id)}
                    sx={{
                      backgroundColor: '#d4af37',
                      color: '#1e293b',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#b8941f',
                      },
                    }}
                  >
                    {user?.role === 'STUDENT' ? 'Enroll Now' : 'Enroll Child'}
                  </Button>
                </CardActions>
              </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CourseCatalog;