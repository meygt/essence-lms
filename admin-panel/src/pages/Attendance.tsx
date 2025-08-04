import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Download as DownloadIcon,
  CheckCircle as PresentIcon,
  Cancel as AbsentIcon,
  Schedule as LateIcon,
  Edit as EditIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import { useUser } from '../hooks/useUser';

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  status: 'Present' | 'Absent' | 'Late';
  checkInTime?: string;
  avatar?: string;
}

interface AttendanceRecord {
  date: string;
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  percentage: number;
}

const Attendance: React.FC = () => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [tabValue, setTabValue] = useState(0);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showError, setShowError] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Empty initial data - would be populated from API
  const students: Student[] = [];
  const attendanceHistory: AttendanceRecord[] = [];
  const courses = ['All Courses'];

  // Role-based access control
  if (!user || (user.role !== 'ADMIN' && user.role !== 'TEACHER')) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <BlockIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Access Restricted
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You don't have permission to access attendance management.
        </Typography>
      </Box>
    );
  }

  const filteredStudents = selectedCourse === 'All Courses' 
    ? students 
    : students.filter(student => student.course === selectedCourse);

  const todayStats = {
    total: filteredStudents.length,
    present: filteredStudents.filter(s => s.status === 'Present').length,
    absent: filteredStudents.filter(s => s.status === 'Absent').length,
    late: filteredStudents.filter(s => s.status === 'Late').length,
  };

  const attendancePercentage = todayStats.total > 0 
    ? Math.round(((todayStats.present + todayStats.late) / todayStats.total) * 100)
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'success';
      case 'Absent': return 'error';
      case 'Late': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <PresentIcon />;
      case 'Absent': return <AbsentIcon />;
      case 'Late': return <LateIcon />;
      default: return <PersonIcon />;
    }
  };

  const handleEditAttendance = (student: Student) => {
    setSelectedStudent(student);
    setEditDialog(true);
  };

  const handleSaveAttendance = () => {
    setEditDialog(false);
    setShowError(true);
  };

  const handleExport = () => {
    setShowError(true);
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
          Attendance Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                color="primary"
              />
            }
            label="Auto Refresh"
          />
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExport}>
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6">Today's Attendance</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{attendancePercentage}%</Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="success.main">Present</Typography>
                  <Typography variant="h3" color="success.main" sx={{ fontWeight: 'bold' }}>{todayStats.present}</Typography>
                </Box>
                <PresentIcon sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="error.main">Absent</Typography>
                  <Typography variant="h3" color="error.main" sx={{ fontWeight: 'bold' }}>{todayStats.absent}</Typography>
                </Box>
                <AbsentIcon sx={{ fontSize: 40, color: 'error.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="warning.main">Late</Typography>
                  <Typography variant="h3" color="warning.main" sx={{ fontWeight: 'bold' }}>{todayStats.late}</Typography>
                </Box>
                <LateIcon sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                value={selectedCourse}
                label="Course"
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map((course) => (
                  <MenuItem key={course} value={course}>{course}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredStudents.length} students for {selectedCourse}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Today's Attendance" />
          <Tab label="Attendance History" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Check-in Time</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <PersonIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="h6" color="text.secondary">
                        No Students Found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        No students are enrolled or attendance data is available for the selected date and course.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 32, height: 32 }}>
                            {student.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{student.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {student.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>
                        <Chip
                          label={student.status}
                          color={getStatusColor(student.status) as 'success' | 'error' | 'warning' | 'default'}
                          icon={getStatusIcon(student.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{student.checkInTime || '-'}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEditAttendance(student)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {tabValue === 1 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Total Students</TableCell>
                  <TableCell>Present</TableCell>
                  <TableCell>Absent</TableCell>
                  <TableCell>Late</TableCell>
                  <TableCell>Attendance %</TableCell>
                  <TableCell>Trend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <CalendarIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="h6" color="text.secondary">
                        No Attendance History
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        No historical attendance data is available yet.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  attendanceHistory.map((record, index) => (
                    <TableRow key={record.date} hover>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>{record.totalStudents}</TableCell>
                      <TableCell>
                        <Chip label={record.present} color="success" size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip label={record.absent} color="error" size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip label={record.late} color="warning" size="small" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {record.percentage}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={record.percentage}
                            sx={{ width: 60, height: 6, borderRadius: 3 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        {index < attendanceHistory.length - 1 && (
                          record.percentage > attendanceHistory[index + 1].percentage ? (
                            <TrendingUpIcon color="success" />
                          ) : (
                            <TrendingDownIcon color="error" />
                          )
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Edit Attendance Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Attendance</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedStudent.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedStudent.email}
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select defaultValue={selectedStudent.status} label="Status">
                  <MenuItem value="Present">Present</MenuItem>
                  <MenuItem value="Absent">Absent</MenuItem>
                  <MenuItem value="Late">Late</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Check-in Time"
                type="time"
                defaultValue={selectedStudent.checkInTime}
                sx={{ mt: 2 }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveAttendance}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Attendance;