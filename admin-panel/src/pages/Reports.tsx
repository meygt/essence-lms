import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  IconButton,
  Menu,
  Divider,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  BarChart as ChartIcon,
  Timeline as TimelineIcon,
  MoreVert as MoreVertIcon,
  Visibility as ViewIcon,
  Share as ShareIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import { useUser } from '../hooks/useUser';

interface ReportData {
  id: number;
  title: string;
  type: string;
  period: string;
  status: 'Generated' | 'Processing' | 'Failed';
  createdDate: string;
  size: string;
}

interface PerformanceData {
  course: string;
  students: number;
  avgScore: number;
  completion: number;
  trend: 'up' | 'down' | 'stable';
}

const Reports: React.FC = () => {
  const { user } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [selectedReportType, setSelectedReportType] = useState('All Reports');
  const [tabValue, setTabValue] = useState(0);
  const [showError, setShowError] = useState(false);
  const [generateDialog, setGenerateDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Role-based access control
  if (!user || (user.role !== 'ADMIN' && user.role !== 'TEACHER')) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <BlockIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Access Restricted
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You don't have permission to access reports and analytics.
        </Typography>
      </Box>
    );
  }

  const reportTypes = ['All Reports', 'Academic Performance', 'Attendance', 'Financial', 'Student Progress', 'Course Analytics'];
  const periods = ['This Week', 'This Month', 'This Quarter', 'This Year', 'Custom Range'];

  // Empty initial data - would be populated from API
  const recentReports: ReportData[] = [];
  const performanceData: PerformanceData[] = [];

  const analyticsData = {
    totalStudents: 0,
    activeStudents: 0,
    completedCourses: 0,
    avgPerformance: 0,
    enrollmentGrowth: 0,
    revenue: 0,
    attendanceRate: 0,
    satisfactionScore: 0,
  };

  const filteredReports = selectedReportType === 'All Reports' 
    ? recentReports 
    : recentReports.filter(report => report.type === selectedReportType);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated': return 'success';
      case 'Processing': return 'warning';
      case 'Failed': return 'error';
      default: return 'default';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon color="success" />;
      case 'down': return <TrendingUpIcon color="error" sx={{ transform: 'rotate(180deg)' }} />;
      default: return <TrendingUpIcon color="disabled" sx={{ transform: 'rotate(90deg)' }} />;
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // setSelectedReport(null);
  };

  const handleAction = () => {
    handleMenuClose();
    setShowError(true);
  };

  const handleGenerateReport = () => {
    setGenerateDialog(false);
    setShowError(true);
  };

  const handleExportAll = () => {
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
          Reports & Analytics
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<ChartIcon />} onClick={() => setGenerateDialog(true)}>
            Generate Report
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportAll}>
            Export All Reports
          </Button>
        </Box>
      </Box>

      {/* Analytics Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6">Academic Performance</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{analyticsData.avgPerformance}%</Typography>
                </Box>
                <AssessmentIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="success.main">Enrollment Growth</Typography>
                  <Typography variant="h3" color="success.main" sx={{ fontWeight: 'bold' }}>+{analyticsData.enrollmentGrowth}%</Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="info.main">Active Students</Typography>
                  <Typography variant="h3" color="info.main" sx={{ fontWeight: 'bold' }}>{analyticsData.activeStudents}</Typography>
                </Box>
                <PeopleIcon sx={{ fontSize: 40, color: 'info.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="warning.main">Revenue</Typography>
                  <Typography variant="h3" color="warning.main" sx={{ fontWeight: 'bold' }}>${analyticsData.revenue.toLocaleString()}</Typography>
                </Box>
                <MoneyIcon sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={selectedReportType}
                label="Report Type"
                onChange={(e) => setSelectedReportType(e.target.value)}
              >
                {reportTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Period</InputLabel>
              <Select
                value={selectedPeriod}
                label="Period"
                onChange={(e) => setSelectedPeriod(e.target.value)}
                startAdornment={<CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              >
                {periods.map((period) => (
                  <MenuItem key={period} value={period}>{period}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredReports.length} reports for {selectedPeriod}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Recent Reports" icon={<AssessmentIcon />} />
          <Tab label="Performance Analytics" icon={<ChartIcon />} />
          <Tab label="Trends & Insights" icon={<TimelineIcon />} />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Report Title</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Period</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <AssessmentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="h6" color="text.secondary">
                        No Reports Available
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        No reports have been generated yet. Click "Generate Report" to create your first report.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReports.map((report) => (
                    <TableRow key={report.id} hover>
                      <TableCell>
                        <Typography variant="subtitle2">{report.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={report.type} variant="outlined" size="small" />
                      </TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>
                        <Chip
                          label={report.status}
                          color={getStatusColor(report.status) as 'success' | 'warning' | 'error' | 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{new Date(report.createdDate).toLocaleDateString()}</TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuClick(e)}
                        >
                          <MoreVertIcon />
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
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Course Performance Analytics
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course</TableCell>
                  <TableCell>Students</TableCell>
                  <TableCell>Avg Score</TableCell>
                  <TableCell>Completion Rate</TableCell>
                  <TableCell>Trend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {performanceData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <ChartIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="h6" color="text.secondary">
                        No Performance Data
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        No course performance data is available yet. Data will appear here once courses are active.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  performanceData.map((course) => (
                    <TableRow key={course.course} hover>
                      <TableCell>
                        <Typography variant="subtitle2">{course.course}</Typography>
                      </TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {course.avgScore}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={course.avgScore}
                            sx={{ width: 60, height: 6, borderRadius: 3 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {course.completion}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={course.completion}
                            color="secondary"
                            sx={{ width: 60, height: 6, borderRadius: 3 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>{getTrendIcon(course.trend)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3, height: 300 }}>
              <Typography variant="h6" gutterBottom>
                Enrollment Trends
              </Typography>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
                <Typography color="text.secondary">Enrollment Chart Placeholder</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3, height: 300 }}>
              <Typography variant="h6" gutterBottom>
                Revenue Analytics
              </Typography>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
                <Typography color="text.secondary">Revenue Chart Placeholder</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3, height: 300 }}>
              <Typography variant="h6" gutterBottom>
                Student Performance Over Time
              </Typography>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
                <Typography color="text.secondary">Performance Timeline Chart Placeholder</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleAction}>
          <ViewIcon sx={{ mr: 1 }} />
          View Report
        </MenuItem>
        <MenuItem onClick={handleAction}>
          <DownloadIcon sx={{ mr: 1 }} />
          Download
        </MenuItem>
        <MenuItem onClick={handleAction}>
          <ShareIcon sx={{ mr: 1 }} />
          Share
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleAction}>
          <PrintIcon sx={{ mr: 1 }} />
          Print
        </MenuItem>
        <MenuItem onClick={handleAction}>
          <EmailIcon sx={{ mr: 1 }} />
          Email
        </MenuItem>
      </Menu>

      {/* Generate Report Dialog */}
      <Dialog open={generateDialog} onClose={() => setGenerateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate New Report</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Report Title"
                placeholder="Enter report title"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select label="Report Type">
                  <MenuItem value="academic">Academic Performance</MenuItem>
                  <MenuItem value="attendance">Attendance</MenuItem>
                  <MenuItem value="financial">Financial</MenuItem>
                  <MenuItem value="progress">Student Progress</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Period</InputLabel>
                <Select label="Period">
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="quarter">This Quarter</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGenerateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleGenerateReport}>Generate Report</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reports;