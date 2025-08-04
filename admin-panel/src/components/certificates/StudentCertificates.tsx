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
  Divider
} from '@mui/material';
import {
  Search,
  Download,
  EmojiEvents,
  School,
  CalendarToday,
  Verified
} from '@mui/icons-material';
// import { useUser } from '../../hooks/useUser';
// import { useTheme } from '../../hooks/useTheme';

interface Certificate {
  id: string;
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

const StudentCertificates: React.FC = () => {
  // const { user } = useUser();
  // const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');

  // TODO: Replace with actual API call to fetch student certificates
  // const response = await fetch('/api/student/certificates');
  // const certificatesData = await response.json();
  
  // Temporary empty array until backend is ready
  const certificates: Certificate[] = [];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All Types' || cert.certificateType === selectedType;
    return matchesSearch && matchesType;
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

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmojiEvents color="primary" />
          My Certificates
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and download your earned certificates
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
                {certificates.filter(c => c.certificateType === 'ACHIEVEMENT').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Achievement Awards
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
            {searchTerm || selectedType !== 'All Types'
              ? 'Try adjusting your search or filter criteria'
              : 'Complete courses to earn certificates'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default StudentCertificates;