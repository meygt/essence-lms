import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  TrendingUp as TrendingUpIcon,
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Receipt as ReceiptIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface RevenueData {
  id: string;
  source: string;
  amount: number;
  date: string;
  type: 'course' | 'donation' | 'subscription' | 'other';
  status: 'completed' | 'pending' | 'refunded';
  description: string;
}

const TotalRevenue: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [showError, setShowError] = useState(false);

  const totalRevenueStats = {
    total: 245680,
    thisMonth: 45680,
    lastMonth: 38920,
    growth: 17.4,
    courseRevenue: 189450,
    donationRevenue: 34230,
    subscriptionRevenue: 22000,
  };

  const revenueData: RevenueData[] = [
    {
      id: 'REV001',
      source: 'Qur\'an Recitation Course',
      amount: 299,
      date: '2024-01-15',
      type: 'course',
      status: 'completed',
      description: 'Course enrollment payment'
    },
    {
      id: 'REV002',
      source: 'Monthly Donation',
      amount: 150,
      date: '2024-01-14',
      type: 'donation',
      status: 'completed',
      description: 'General donation'
    },
    {
      id: 'REV003',
      source: 'Premium Subscription',
      amount: 49,
      date: '2024-01-13',
      type: 'subscription',
      status: 'completed',
      description: 'Monthly premium access'
    },
    {
      id: 'REV004',
      source: 'Arabic Language Course',
      amount: 399,
      date: '2024-01-12',
      type: 'course',
      status: 'pending',
      description: 'Course enrollment payment'
    },
    {
      id: 'REV005',
      source: 'Zakat Donation',
      amount: 500,
      date: '2024-01-11',
      type: 'donation',
      status: 'completed',
      description: 'Zakat contribution'
    },
  ];

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = () => {
    handleMenuClose();
    setShowError(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'refunded': return 'error';
      default: return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return '#22c55e';
      case 'donation': return '#d4af37';
      case 'subscription': return '#3b82f6';
      case 'other': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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
          onClick={() => navigate('/finance')}
          sx={{ mr: 2 }}
        >
          <BackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Total Revenue
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive revenue overview and analytics
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={() => setShowError(true)}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            },
          }}
        >
          Export Report
        </Button>
      </Box>

      {/* Revenue Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {formatCurrency(totalRevenueStats.total)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Revenue
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  This Month
                </Typography>
                <CalendarIcon color="primary" />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {formatCurrency(totalRevenueStats.thisMonth)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: '#22c55e', mr: 1, fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#22c55e' }}>
                  +{totalRevenueStats.growth}% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Course Revenue
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {formatCurrency(totalRevenueStats.courseRevenue)}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(totalRevenueStats.courseRevenue / totalRevenueStats.total) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {((totalRevenueStats.courseRevenue / totalRevenueStats.total) * 100).toFixed(1)}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Donations
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {formatCurrency(totalRevenueStats.donationRevenue)}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(totalRevenueStats.donationRevenue / totalRevenueStats.total) * 100}
                sx={{ height: 8, borderRadius: 4, '& .MuiLinearProgress-bar': { backgroundColor: '#d4af37' } }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {((totalRevenueStats.donationRevenue / totalRevenueStats.total) * 100).toFixed(1)}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Revenue Table */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Revenue Transactions
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ViewIcon />}
            onClick={() => setShowError(true)}
          >
            View All
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {revenueData.map((revenue) => (
                <TableRow key={revenue.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {revenue.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {revenue.source}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {revenue.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={revenue.type}
                      size="small"
                      sx={{
                        backgroundColor: getTypeColor(revenue.type),
                        color: 'white',
                        textTransform: 'capitalize'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#22c55e' }}>
                      {formatCurrency(revenue.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(revenue.date).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={revenue.status}
                      size="small"
                      color={getStatusColor(revenue.status) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                        size="small"
                        onClick={handleMenuClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleAction}>
          <ViewIcon sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleAction}>
          <ReceiptIcon sx={{ mr: 1 }} />
          Download Receipt
        </MenuItem>
        <MenuItem onClick={handleAction}>
          <DownloadIcon sx={{ mr: 1 }} />
          Export Data
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TotalRevenue;