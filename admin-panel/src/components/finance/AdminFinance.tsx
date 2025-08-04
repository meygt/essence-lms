import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
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
  Alert,
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as MoneyIcon,
  Receipt as ReceiptIcon,
  CreditCard as CardIcon,
  AccountBalance as BankIcon,
  MoreVert as MoreIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { usePaymentStatistics, usePayments } from '../../hooks/usePayments';

interface Payment {
  id: string;
  studentName?: string;
  courseName?: string;
  amount: number;
  status: string;
  createdAt: string;
  paymentMethod?: string;
}

const AdminFinance: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [processPaymentDialog, setProcessPaymentDialog] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const { data: paymentStats } = usePaymentStatistics();
  const { data: payments } = usePayments({ page: 0, size: 10 });

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const financialStats = [
    {
      title: 'Total Revenue',
      value: `$${paymentStats?.totalRevenue || 0}`,
      change: '+0%',
      trend: 'up',
      icon: <MoneyIcon />,
      color: '#16a34a',
      route: '/total-revenue',
    },
    {
      title: 'Monthly Revenue',
      value: '$0',
      change: '+0%',
      trend: 'up',
      icon: <TrendingUpIcon />,
      color: '#0ea5e9',
      route: '/monthly-revenue',
    },
    {
      title: 'Pending Payments',
      value: '$0',
      change: '0%',
      trend: 'down',
      icon: <ReceiptIcon />,
      color: '#f59e0b',
      route: '/pending-payments',
    },
    {
      title: 'Failed Transactions',
      value: '$0',
      change: '0%',
      trend: 'down',
      icon: <CardIcon />,
      color: '#dc2626',
      route: '/failed-transactions',
    },
  ];

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Credit Card': return <CardIcon />;
      case 'Bank Transfer': return <BankIcon />;
      case 'PayPal': return <MoneyIcon />;
      default: return <MoneyIcon />;
    }
  };

  const getStatusChipColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const handleProcessPayment = () => {
    setShowError(true);
    setProcessPaymentDialog(false);
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
          Financial Management - Admin
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<PaymentIcon />}
            onClick={() => setProcessPaymentDialog(true)}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
            }}
          >
            Process Payment
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
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
      </Box>

      {/* Financial Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {financialStats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  transform: 'translate(30px, -30px)',
                },
              }}
              onClick={() => navigate(stat.route)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    mr: 2,
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {stat.title}
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                {stat.value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {stat.trend === 'up' ? (
                  <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 16, mr: 0.5 }} />
                )}
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {stat.change}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Transactions */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Recent Transactions
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No transactions found. All payment data will appear here once students start making payments.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                payments?.map((payment: Payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.studentName || 'N/A'}</TableCell>
                    <TableCell>{payment.courseName || 'N/A'}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>
                      <Chip
                        label={payment.status}
                        color={getStatusChipColor(payment.status) as 'success' | 'warning' | 'error' | 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {getPaymentMethodIcon(payment.paymentMethod || 'Credit Card')}
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {payment.paymentMethod || 'Credit Card'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={handleMenuClick}>
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Process Payment Dialog */}
      <Dialog open={processPaymentDialog} onClose={() => setProcessPaymentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Process Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Select Student</InputLabel>
              <Select label="Select Student">
                <MenuItem value="">No students available</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Select Course</InputLabel>
              <Select label="Select Course">
                <MenuItem value="">No courses available</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              }}
            />
            <Alert severity="info">
              No students or courses available yet. Add students and courses to process payments.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProcessPaymentDialog(false)}>Cancel</Button>
          <Button onClick={handleProcessPayment} variant="contained">
            Process Payment
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ViewIcon sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <DownloadIcon sx={{ mr: 1 }} />
          Download Receipt
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminFinance;