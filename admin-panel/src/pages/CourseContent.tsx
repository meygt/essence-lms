import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,

  IconButton,
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
  ArrowBack as BackIcon,
  Assignment as AssignmentIcon,
  VideoLibrary as VideoIcon,
  Description as DocumentIcon,
  Quiz as QuizIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  Add as AddIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,

  Announcement as AnnouncementIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const CourseContent: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [addContentDialog, setAddContentDialog] = useState(false);
  const [showError, setShowError] = useState(false);

  // Mock course data - in real app this would come from props or API
  const course = {
    id: courseId || '1',
    title: 'Qur\'an Recitation & Tajweed',
    description: 'Master the art of beautiful Qur\'an recitation with proper Tajweed rules',
    instructor: 'Sheikh Ahmad Al-Qari',
    students: 156,
    status: 'Active',
    duration: '12 weeks',
    coverImage: '/api/placeholder/800/300',
  };

  const announcements = [
    {
      id: 1,
      title: 'Welcome to Qur\'an Recitation Course',
      content: 'Assalamu Alaikum students! Welcome to our comprehensive Qur\'an recitation course. Please review the course materials and prepare for our first session.',
      author: 'Sheikh Ahmad Al-Qari',
      date: '2024-01-15',
      time: '10:30 AM',
    },
    {
      id: 2,
      title: 'Assignment 1 Posted',
      content: 'Your first assignment on basic Tajweed rules has been posted. Please complete it by Friday.',
      author: 'Sheikh Ahmad Al-Qari',
      date: '2024-01-14',
      time: '2:15 PM',
    },
  ];

  const materials = [
    {
      id: 1,
      title: 'Introduction to Tajweed Rules',
      type: 'video',
      description: 'Basic overview of Tajweed principles',
      duration: '45 min',
      icon: <VideoIcon />,
      color: '#dc2626',
    },
    {
      id: 2,
      title: 'Makharij al-Huruf (Articulation Points)',
      type: 'document',
      description: 'Detailed guide on letter pronunciation',
      pages: '12 pages',
      icon: <DocumentIcon />,
      color: '#0ea5e9',
    },
    {
      id: 3,
      title: 'Tajweed Rules Quiz',
      type: 'quiz',
      description: 'Test your understanding of basic rules',
      questions: '20 questions',
      icon: <QuizIcon />,
      color: '#7c3aed',
    },
    {
      id: 4,
      title: 'Practice Recitation Assignment',
      type: 'assignment',
      description: 'Record yourself reciting Surah Al-Fatiha',
      dueDate: 'Jan 20, 2024',
      icon: <AssignmentIcon />,
      color: '#059669',
    },
  ];

  const students = [
    { id: 1, name: 'Ahmad Hassan', email: 'ahmad@example.com', progress: 85, lastActive: '2 hours ago' },
    { id: 2, name: 'Fatima Ali', email: 'fatima@example.com', progress: 92, lastActive: '1 day ago' },
    { id: 3, name: 'Omar Abdullah', email: 'omar@example.com', progress: 78, lastActive: '3 hours ago' },
    { id: 4, name: 'Aisha Rahman', email: 'aisha@example.com', progress: 95, lastActive: '30 min ago' },
    { id: 5, name: 'Yusuf Ibrahim', email: 'yusuf@example.com', progress: 67, lastActive: '1 hour ago' },
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddContent = () => {
    setAddContentDialog(false);
    setShowError(true);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return '#059669';
    if (progress >= 70) return '#d97706';
    return '#dc2626';
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

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton 
          onClick={() => navigate('/courses')}
          sx={{ mr: 2 }}
        >
          <BackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
            {course.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {course.description}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddContentDialog(true)}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            },
          }}
        >
          Add Content
        </Button>
      </Box>

      {/* Course Info Card */}
      <Paper sx={{ p: 3, mb: 3, background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: '#667eea', mr: 2, width: 56, height: 56 }}>
                {course.instructor.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <Box>
                <Typography variant="h6">{course.instructor}</Typography>
                <Typography variant="body2" color="text.secondary">Course Instructor</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip icon={<PeopleIcon />} label={`${course.students} Students`} color="primary" />
              <Chip icon={<ScheduleIcon />} label={course.duration} color="secondary" />
              <Chip label={course.status} color={course.status === 'Active' ? 'success' : 'default'} />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Stream" icon={<AnnouncementIcon />} />
          <Tab label="Classwork" icon={<AssignmentIcon />} />
          <Tab label="People" icon={<PeopleIcon />} />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        {/* Stream Tab - Announcements */}
        <Grid container spacing={3}>
          {announcements.map((announcement) => (
            <Grid size={{ xs: 12 }} key={announcement.id}>
              <Card sx={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#667eea', mr: 2 }}>
                      {announcement.author.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {announcement.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {announcement.date} at {announcement.time}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {announcement.title}
                  </Typography>
                  <Typography variant="body1">
                    {announcement.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Classwork Tab - Materials */}
        <Grid container spacing={3}>
          {materials.map((material) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={material.id}>
              <Card sx={{ 
                height: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.3s ease-in-out',
                }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: material.color, mr: 2 }}>
                      {material.icon}
                    </Avatar>
                    <Chip 
                      label={material.type} 
                      size="small" 
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {material.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {material.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {material.duration || material.pages || material.questions || material.dueDate}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<ViewIcon />}>
                    View
                  </Button>
                  <Button size="small" startIcon={<DownloadIcon />}>
                    Download
                  </Button>
                  <Button size="small" startIcon={<EditIcon />}>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* People Tab - Students */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Students ({students.length})
            </Typography>
          </Grid>
          {students.map((student) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={student.id}>
              <Card sx={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#667eea', mr: 2 }}>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {student.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {student.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Progress</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {student.progress}%
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      width: '100%', 
                      height: 8, 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                      borderRadius: 4,
                      overflow: 'hidden'
                    }}>
                      <Box sx={{ 
                        width: `${student.progress}%`, 
                        height: '100%', 
                        backgroundColor: getProgressColor(student.progress),
                        transition: 'width 0.3s ease'
                      }} />
                    </Box>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Last active: {student.lastActive}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Add Content Dialog */}
      <Dialog open={addContentDialog} onClose={() => setAddContentDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Course Content</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Content Title"
                variant="outlined"
                placeholder="Enter content title"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                variant="outlined"
                placeholder="Enter content description"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Content Type</InputLabel>
                <Select defaultValue="video" label="Content Type">
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="document">Document</MenuItem>
                  <MenuItem value="quiz">Quiz</MenuItem>
                  <MenuItem value="assignment">Assignment</MenuItem>
                  <MenuItem value="announcement">Announcement</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddContentDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddContent}>
            Add Content
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseContent;