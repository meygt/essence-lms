import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
  Alert,
  Divider,
  Badge,
  Tooltip,

} from '@mui/material';
import {
  Download as DownloadIcon,
  School as SchoolIcon,
  EmojiEvents as EmojiEventsIcon,
  Verified as VerifiedIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Email as EmailIcon,
  CloudDownload as CloudDownloadIcon,
  Assignment as CertificateIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import { useUser } from '../hooks/useUser';
import StudentCertificates from '../components/certificates/StudentCertificates';
import ParentCertificates from '../components/certificates/ParentCertificates';

interface Certificate {
  id: number;
  studentName: string;
  studentAvatar: string;
  courseName: string;
  certificateType: 'Completion' | 'Achievement' | 'Excellence' | 'Participation';
  issueDate: string;
  status: 'Issued' | 'Pending' | 'Revoked';
  grade?: string;
  verificationCode: string;
  downloadCount: number;
}

interface CertificateTemplate {
  id: number;
  name: string;
  type: string;
  description: string;
  isActive: boolean;
  usageCount: number;
}

const Certificates: React.FC = () => {
  const { user } = useUser();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [generateDialog, setGenerateDialog] = useState(false);
  const [templateDialog, setTemplateDialog] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  // Role-based access control - now allows all authenticated users
  if (!user) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <BlockIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Access Restricted
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please log in to view certificates.
        </Typography>
      </Box>
    );
  }

  // Render role-specific certificate views
  if (user.role === 'STUDENT') {
    return <StudentCertificates />;
  }
  
  if (user.role === 'PARENT') {
    return <ParentCertificates />;
  }

  // Empty initial data - would be populated from API
  const certificates: Certificate[] = [];
  const templates: CertificateTemplate[] = [];

  const certificateTypes = ['All Types', 'Completion', 'Achievement', 'Excellence', 'Participation'];
  const statusOptions = ['All Status', 'Issued', 'Pending', 'Revoked'];

  const filteredCertificates = certificates.filter(cert => {
    const typeMatch = selectedType === 'All Types' || cert.certificateType === selectedType;
    const statusMatch = selectedStatus === 'All Status' || cert.status === selectedStatus;
    return typeMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Issued': return 'success';
      case 'Pending': return 'warning';
      case 'Revoked': return 'error';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Completion': return <SchoolIcon />;
      case 'Excellence': return <StarIcon />;
      case 'Achievement': return <EmojiEventsIcon />;
      case 'Participation': return <PersonIcon />;
      default: return <CertificateIcon />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Completion': return 'primary';
      case 'Excellence': return 'warning';
      case 'Achievement': return 'success';
      case 'Participation': return 'info';
      default: return 'default';
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // setSelectedCertificate(certificate);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // setSelectedCertificate(null);
  };

  const handleAction = () => {
    handleMenuClose();
    setShowError(true);
  };

  const handleGenerateCertificate = () => {
    setGenerateDialog(false);
    setShowError(true);
  };

  const handleCreateTemplate = () => {
    setTemplateDialog(false);
    setShowError(true);
  };

  const stats = {
    totalCertificates: certificates.length,
    issuedCertificates: certificates.filter(c => c.status === 'Issued').length,
    pendingCertificates: certificates.filter(c => c.status === 'Pending').length,
    totalDownloads: certificates.reduce((sum, cert) => sum + cert.downloadCount, 0),
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
          Certificate Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setTemplateDialog(true)}>
            Create Template
          </Button>
          <Button variant="contained" startIcon={<CertificateIcon />} onClick={() => setGenerateDialog(true)}>
            Generate Certificate
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
                  <Typography variant="h6">Total Certificates</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{stats.totalCertificates}</Typography>
                </Box>
                <CertificateIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="success.main">Issued</Typography>
                  <Typography variant="h3" color="success.main" sx={{ fontWeight: 'bold' }}>{stats.issuedCertificates}</Typography>
                </Box>
                <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="warning.main">Pending</Typography>
                  <Typography variant="h3" color="warning.main" sx={{ fontWeight: 'bold' }}>{stats.pendingCertificates}</Typography>
                </Box>
                <ScheduleIcon sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="info.main">Downloads</Typography>
                  <Typography variant="h3" color="info.main" sx={{ fontWeight: 'bold' }}>{stats.totalDownloads}</Typography>
                </Box>
                <CloudDownloadIcon sx={{ fontSize: 40, color: 'info.main' }} />
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
              <InputLabel>Certificate Type</InputLabel>
              <Select
                value={selectedType}
                label="Certificate Type"
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {certificateTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Status"
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredCertificates.length} certificates
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Issued Certificates" icon={<CertificateIcon />} />
          <Tab label="Certificate Templates" icon={<SchoolIcon />} />
          <Tab label="Verification" icon={<VerifiedIcon />} />
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
                  <TableCell>Type</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Issue Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Downloads</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCertificates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <CertificateIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="h6" color="text.secondary">
                        No Certificates Found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        No certificates have been issued yet. Generate your first certificate to get started.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCertificates.map((certificate) => (
                    <TableRow key={certificate.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar src={certificate.studentAvatar} sx={{ width: 32, height: 32 }}>
                            {certificate.studentName.charAt(0)}
                          </Avatar>
                          <Typography variant="subtitle2">{certificate.studentName}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{certificate.courseName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getTypeIcon(certificate.certificateType)}
                          label={certificate.certificateType}
                          color={getTypeColor(certificate.certificateType) as 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default'}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {certificate.grade || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>{new Date(certificate.issueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip
                          label={certificate.status}
                          color={getStatusColor(certificate.status) as 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge badgeContent={certificate.downloadCount} color="primary">
                          <CloudDownloadIcon color="action" />
                        </Badge>
                      </TableCell>
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
            Certificate Templates
          </Typography>
          <Grid container spacing={3}>
            {templates.length === 0 ? (
              <Grid size={{ xs: 12 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8, textAlign: 'center' }}>
                  <SchoolIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Certificate Templates
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    No certificate templates have been created yet. Create your first template to get started.
                  </Typography>
                  <Button variant="contained" startIcon={<AddIcon />} onClick={() => setTemplateDialog(true)}>
                    Create First Template
                  </Button>
                </Box>
              </Grid>
            ) : (
              templates.map((template) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={template.id}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" component="div">
                          {template.name}
                        </Typography>
                        <Chip
                          label={template.isActive ? 'Active' : 'Inactive'}
                          color={template.isActive ? 'success' : 'default'}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {template.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">
                          Used: {template.usageCount} times
                        </Typography>
                        <Box>
                          <Tooltip title="Edit Template">
                            <IconButton size="small" onClick={handleAction}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Preview">
                            <IconButton size="small" onClick={handleAction}>
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Paper>
      )}

      {tabValue === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Certificate Verification
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Verification Code"
                placeholder="Enter verification code (e.g., QRC-2024-001)"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Button fullWidth variant="contained" size="large" onClick={handleAction}>
                Verify Certificate
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Button fullWidth variant="outlined" size="large" onClick={handleAction}>
                Bulk Verify
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Recent Verifications
            </Typography>
            <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography color="text.secondary">Verification History Placeholder</Typography>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleAction}>
          <ViewIcon sx={{ mr: 1 }} />
          View Certificate
        </MenuItem>
        <MenuItem onClick={handleAction}>
          <DownloadIcon sx={{ mr: 1 }} />
          Download PDF
        </MenuItem>
        <MenuItem onClick={handleAction}>
          <PrintIcon sx={{ mr: 1 }} />
          Print
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleAction}>
          <ShareIcon sx={{ mr: 1 }} />
          Share
        </MenuItem>
        <MenuItem onClick={handleAction}>
          <EmailIcon sx={{ mr: 1 }} />
          Email to Student
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleAction}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleAction} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Revoke
        </MenuItem>
      </Menu>

      {/* Generate Certificate Dialog */}
      <Dialog open={generateDialog} onClose={() => setGenerateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate New Certificate</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Student</InputLabel>
                <Select label="Student">
                  <MenuItem value="ahmed">Ahmed Hassan</MenuItem>
                  <MenuItem value="fatima">Fatima Al-Zahra</MenuItem>
                  <MenuItem value="omar">Omar Abdullah</MenuItem>
                  <MenuItem value="aisha">Aisha Mohammed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Course</InputLabel>
                <Select label="Course">
                  <MenuItem value="quran">Qur'an Recitation</MenuItem>
                  <MenuItem value="arabic">Arabic Grammar</MenuItem>
                  <MenuItem value="islamic">Islamic Studies</MenuItem>
                  <MenuItem value="tajweed">Tajweed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Certificate Type</InputLabel>
                <Select label="Certificate Type">
                  <MenuItem value="completion">Completion</MenuItem>
                  <MenuItem value="excellence">Excellence</MenuItem>
                  <MenuItem value="achievement">Achievement</MenuItem>
                  <MenuItem value="participation">Participation</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Grade"
                placeholder="e.g., A+, B+, etc."
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Issue Date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Template</InputLabel>
                <Select label="Template">
                  {templates.filter(t => t.isActive).map((template) => (
                    <MenuItem key={template.id} value={template.id}>{template.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGenerateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleGenerateCertificate}>Generate Certificate</Button>
        </DialogActions>
      </Dialog>

      {/* Create Template Dialog */}
      <Dialog open={templateDialog} onClose={() => setTemplateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Certificate Template</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Template Name"
                placeholder="Enter template name"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Template Type</InputLabel>
                <Select label="Template Type">
                  <MenuItem value="completion">Completion</MenuItem>
                  <MenuItem value="excellence">Excellence</MenuItem>
                  <MenuItem value="achievement">Achievement</MenuItem>
                  <MenuItem value="participation">Participation</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                placeholder="Enter template description"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle2" gutterBottom>
                Template Design
              </Typography>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', borderRadius: 1, border: '2px dashed #ccc' }}>
                <Typography color="text.secondary">Template Design Area</Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTemplateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateTemplate}>Create Template</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Certificates;