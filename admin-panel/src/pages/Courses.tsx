import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  students: number;
  status: string;
  duration: string;
}
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,

} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  PlayArrow as EnterIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  PersonAdd as AssignIcon,
} from '@mui/icons-material';

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [viewDialog, setViewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [assignDialog, setAssignDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showError, setShowError] = useState(false);

  const courses = [
    {
      id: 1,
      title: 'Qur\'an Recitation & Tajweed',
      description: 'Master the art of beautiful Qur\'an recitation with proper Tajweed rules',
      instructor: 'Sheikh Ahmad Al-Qari',
      students: 156,
      status: 'Active',
      duration: '12 weeks',
    },
    {
      id: 2,
      title: 'Arabic Language Fundamentals',
      description: 'Learn classical Arabic grammar, vocabulary, and comprehension',
      instructor: 'Ustadha Fatima Hassan',
      students: 89,
      status: 'Active',
      duration: '16 weeks',
    },
    {
      id: 3,
      title: 'Islamic Studies & Fiqh',
      description: 'Comprehensive study of Islamic jurisprudence and religious practices',
      instructor: 'Dr. Omar Abdullah',
      students: 67,
      status: 'Active',
      duration: '20 weeks',
    },
    {
      id: 4,
      title: 'Hadith Sciences',
      description: 'Study of Prophetic traditions and their authentication methods',
      instructor: 'Sheikh Muhammad Ali',
      students: 45,
      status: 'Draft',
      duration: '14 weeks',
    },
    {
      id: 5,
      title: 'Islamic Finance & Economics',
      description: 'Understanding Sharia-compliant financial principles and practices',
      instructor: 'Dr. Aisha Rahman',
      students: 34,
      status: 'Active',
      duration: '10 weeks',
    },
    {
      id: 6,
      title: 'Qur\'an Memorization (Hifz)',
      description: 'Structured program for memorizing the Holy Qur\'an',
      instructor: 'Hafiz Yusuf Ibrahim',
      students: 23,
      status: 'Draft',
      duration: '24 months',
    },
  ];

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setViewDialog(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setEditDialog(true);
    // Show error for demo
    setTimeout(() => {
      setShowError(true);
      setEditDialog(false);
    }, 1000);
  };

  const handleEnterCourse = (course: Course) => {
    // Navigate to course content page
    navigate(`/courses/${course.id}/content`);
  };

  const handleCreateCourse = () => {
    setCreateDialog(true);
    // Show error for demo
    setTimeout(() => {
      setShowError(true);
      setCreateDialog(false);
    }, 1000);
  };

  const handleAssignStudent = (course: Course) => {
    setSelectedCourse(course);
    setAssignDialog(true);
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
          Course Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateCourse}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            },
          }}
        >
          Create New Course
        </Button>
      </Box>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={course.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease-in-out',
              }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PersonIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Instructor:</strong> {course.instructor}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SchoolIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Students:</strong> {course.students}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ScheduleIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Duration:</strong> {course.duration}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={course.status}
                  color={course.status === 'Active' ? 'success' : 'default'}
                  size="small"
                />
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Box>
                  <Button 
                    size="small" 
                    startIcon={<ViewIcon />}
                    onClick={() => handleViewCourse(course)}
                  >
                    View
                  </Button>
                  <Button 
                    size="small" 
                    startIcon={<EditIcon />}
                    onClick={() => handleEditCourse(course)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="small" 
                    startIcon={<AssignIcon />}
                    onClick={() => handleAssignStudent(course)}
                    sx={{
                      color: '#2196F3',
                      '&:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      },
                    }}
                  >
                    Assign
                  </Button>
                </Box>
                <Button 
                  size="small" 
                  variant="contained"
                  startIcon={<EnterIcon />}
                  onClick={() => handleEnterCourse(course)}
                  sx={{
                    background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #45a049 0%, #3d8b40 100%)',
                    },
                  }}
                >
                  Enter
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View Course Dialog */}
      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Course Details</DialogTitle>
        <DialogContent>
          {selectedCourse && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h5" gutterBottom>{selectedCourse.title}</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {selectedCourse.description}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Instructor</Typography>
                <Typography variant="body1">{selectedCourse.instructor}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                 <Typography variant="subtitle2" color="text.secondary">Duration</Typography>
                 <Typography variant="body1">{selectedCourse.duration}</Typography>
               </Grid>
               <Grid size={{ xs: 12, sm: 6 }}>
                 <Typography variant="subtitle2" color="text.secondary">Students Enrolled</Typography>
                 <Typography variant="body1">{selectedCourse.students}</Typography>
               </Grid>
               <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                <Chip 
                  label={selectedCourse.status} 
                  color={selectedCourse.status === 'Active' ? 'success' : 'default'} 
                  size="small" 
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          {selectedCourse && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Course Title"
                  defaultValue={selectedCourse.title}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  defaultValue={selectedCourse.description}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Instructor"
                  defaultValue={selectedCourse.instructor}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Duration"
                  defaultValue={selectedCourse.duration}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select defaultValue={selectedCourse.status} label="Status">
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Archived">Archived</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Create Course Dialog */}
      <Dialog open={createDialog} onClose={() => setCreateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Course</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Course Title"
                variant="outlined"
                placeholder="Enter course title"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                variant="outlined"
                placeholder="Enter course description"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Instructor"
                variant="outlined"
                placeholder="Enter instructor name"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Duration"
                variant="outlined"
                placeholder="e.g., 12 weeks"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select defaultValue="Draft" label="Status">
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialog(false)}>Cancel</Button>
          <Button variant="contained">Create Course</Button>
        </DialogActions>
      </Dialog>

      {/* Assign Student Dialog */}
      <Dialog open={assignDialog} onClose={() => setAssignDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Assign Student to Course</DialogTitle>
        <DialogContent>
          {selectedCourse && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  {selectedCourse.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Instructor: {selectedCourse.instructor}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel>Select Student</InputLabel>
                  <Select label="Select Student">
                    <MenuItem value="ahmad">Ahmad Hassan</MenuItem>
                    <MenuItem value="aisha">Aisha Abdullah</MenuItem>
                    <MenuItem value="maryam">Maryam Ali</MenuItem>
                    <MenuItem value="khadija">Khadija Mahmoud</MenuItem>
                    <MenuItem value="omar">Omar Al-Rashid</MenuItem>
                    <MenuItem value="fatima">Fatima Rahman</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Alert severity="info" sx={{ mt: 2 }}>
                  After assignment, the student will receive a payment request. Once payment is completed, the course will appear in their "My Courses" section.
                </Alert>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setShowError(true);
              setAssignDialog(false);
            }}
            sx={{
              background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)',
              },
            }}
          >
            Assign Student
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default Courses;