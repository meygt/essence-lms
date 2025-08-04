import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Search,
  Download,
  EmojiEvents,
  School,
  CalendarToday,
  Verified,
  Person
} from '@mui/icons-material';
// import { useUser } from '../../hooks/useUser';
// import { useTheme } from '../../hooks/useTheme';

interface Certificate {
  id: string;
  studentName: string;
  courseName: string;
  courseCode: string;
  completionDate: string;
  issueDate: string;
  grade: string;
  instructor: string;
  certificateType: 'COMPLETION' | 'ACHIEVEMENT' | 'PARTICIPATION';
  status: 'ISSUED' | 'PENDING' | 'REVOKED';
  downloadUrl?: string;
}

interface Child {
  id: string;
  name: string;
  grade: string;
  avatar?: string;
}

const ParentCertificates: React.FC = () => {
  // const { user } = useUser();
  // const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedChild, setSelectedChild] = useState('all');

  // TODO: Replace with actual API calls to fetch children and certificates
  // const response = await fetch('/api/parent/children');
  // const childrenData = await response.json();
  // const certResponse = await fetch('/api/parent/certificates');
  // const certificatesData = await certResponse.json();
  
  // Temporary empty arrays until backend is ready
  const children: Child[] = [];
  const certificates: Certificate[] = [];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All Types' || cert.certificateType === selectedType;
    const matchesChild = selectedChild === 'all' || cert.studentName === children.find(c => c.id === selectedChild)?.name;
    return matchesSearch && matchesType && matchesChild;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'COMPLETION': return 'success';
      case 'ACHIEVEMENT': return 'warning';
      case 'PARTICIPATION': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ISSUED': return 'success';
      case 'PENDING': return 'warning';
      case 'REVOKED': return 'error';
      default: return 'default';
    }
  };

  const handleDownload = (certificate: Certificate) => {
    // In a real app, this would download the certificate
    console.log('Downloading certificate:', certificate.id);
  };

  const getCertificatesByChild = () => {
    const grouped = children.reduce((acc, child) => {
      acc[child.name] = certificates.filter(cert => cert.studentName === child.name);
      return acc;
    }, {} as Record<string, Certificate[]>);
    return grouped;
  };

  const certificatesByChild = getCertificatesByChild();

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmojiEvents color="primary" />
          Children's Certificates
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and download your children's earned certificates
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search certificates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 300 }}
        />
        
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Child</InputLabel>
          <Select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            label="Child"
          >
            <MenuItem value="all">All Children</MenuItem>
            {children.map((child) => (
              <MenuItem key={child.id} value={child.id}>
                {child.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {['All Types', 'COMPLETION', 'ACHIEVEMENT', 'PARTICIPATION'].map((type) => (
            <Chip
              key={type}
              label={type === 'All Types' ? type : type.charAt(0) + type.slice(1).toLowerCase()}
              onClick={() => setSelectedType(type)}
              color={selectedType === type ? 'primary' : 'default'}
              variant={selectedType === type ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {certificates.filter(c => c.status === 'ISSUED').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Issued Certificates
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">
                {certificates.filter(c => c.status === 'PENDING').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Certificates
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">
                {children.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Children
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main">
                {certificates.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Certificates
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Children Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {children.map((child) => {
          const childCerts = certificatesByChild[child.name] || [];
          const issuedCerts = childCerts.filter(c => c.status === 'ISSUED').length;
          const pendingCerts = childCerts.filter(c => c.status === 'PENDING').length;
          
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={child.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{child.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {child.grade}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Issued:</Typography>
                    <Chip label={issuedCerts} color="success" size="small" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Pending:</Typography>
                    <Chip label={pendingCerts} color="warning" size="small" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Total:</Typography>
                    <Chip label={childCerts.length} color="primary" size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Certificates Grid */}
      <Grid container spacing={3}>
        {filteredCertificates.map((certificate) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={certificate.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                    <School />
                  </Avatar>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      label={certificate.certificateType.charAt(0) + certificate.certificateType.slice(1).toLowerCase()}
                      color={getTypeColor(certificate.certificateType) as 'success' | 'warning' | 'info' | 'default'}
                      size="small"
                    />
                    <Chip
                      label={certificate.status.charAt(0) + certificate.status.slice(1).toLowerCase()}
                      color={getStatusColor(certificate.status) as 'success' | 'warning' | 'error' | 'default'}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom>
                  {certificate.courseName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {certificate.courseCode}
                </Typography>
                <Typography variant="body2" color="primary" gutterBottom>
                  Student: {certificate.studentName}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Completed: {new Date(certificate.completionDate).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Verified sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Grade: {certificate.grade}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Instructor: {certificate.instructor}
                </Typography>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Download />}
                  onClick={() => handleDownload(certificate)}
                  disabled={certificate.status !== 'ISSUED'}
                >
                  {certificate.status === 'ISSUED' ? 'Download Certificate' : 'Certificate Pending'}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredCertificates.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <EmojiEvents sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No certificates found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm || selectedType !== 'All Types' || selectedChild !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Your children haven\'t earned any certificates yet'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ParentCertificates;