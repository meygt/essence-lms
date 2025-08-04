import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  // Receipt as ReceiptIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { useTheme } from '../hooks/useTheme';
import { useUser } from '../hooks/useUser';

interface Payment {
  id: string;
  courseTitle: string;
  amount: number;
  currency: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'REFUNDED';
  paymentMethod: string;
  transactionId: string;
  paymentDate: string;
  dueDate?: string;
  description?: string;
}

const MyPayments: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { user } = useUser();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call when backend is ready
        // const response = await api.get('/payments');
        // setPayments(response.data);
        
        // For now, return empty array until backend is implemented
        setPayments([]);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user]);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === '' || payment.status === selectedStatus;
    const matchesMethod = selectedMethod === '' || payment.paymentMethod === selectedMethod;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return '#10b981';
      case 'PENDING': return '#f59e0b';
      case 'FAILED': return '#ef4444';
      case 'REFUNDED': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const handleDownloadReceipt = (paymentId: string) => {
    // Mock download functionality
    console.log('Downloading receipt for payment:', paymentId);
    // In a real app, this would trigger a download of the receipt PDF
  };

  const handleViewDetails = (paymentId: string) => {
    // Mock view details functionality
    console.log('Viewing details for payment:', paymentId);
    // In a real app, this would open a detailed view modal
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
        {user?.role === 'PARENT' ? "Children's Payments" : 'My Payments'}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: isDarkMode ? '#94a3b8' : '#64748b' }}>
        {user?.role === 'PARENT' 
          ? 'View payment history for your children\'s course enrollments'
          : 'View your payment history and download receipts'
        }
      </Typography>

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
          <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '300px' } }}>
            <TextField
              fullWidth
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  '& fieldset': {
                    borderColor: isDarkMode ? '#475569' : '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: isDarkMode ? '#64748b' : '#9ca3af',
                  },
                },
                '& .MuiInputBase-input': {
                  color: isDarkMode ? '#f1f5f9' : '#1f2937',
                },
              }}
            />
          </Box>
          <Box sx={{ minWidth: { xs: '100%', md: '200px' } }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Status"
                onChange={(e) => setSelectedStatus(e.target.value)}
                sx={{
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#475569' : '#d1d5db',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#64748b' : '#9ca3af',
                  },
                  '& .MuiSelect-select': {
                    color: isDarkMode ? '#f1f5f9' : '#1f2937',
                  },
                }}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="FAILED">Failed</MenuItem>
                <MenuItem value="REFUNDED">Refunded</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: { xs: '100%', md: '200px' } }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>Payment Method</InputLabel>
              <Select
                value={selectedMethod}
                label="Payment Method"
                onChange={(e) => setSelectedMethod(e.target.value)}
                sx={{
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#475569' : '#d1d5db',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#64748b' : '#9ca3af',
                  },
                  '& .MuiSelect-select': {
                    color: isDarkMode ? '#f1f5f9' : '#1f2937',
                  },
                }}
              >
                <MenuItem value="">All Methods</MenuItem>
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="PayPal">PayPal</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="Stripe">Stripe</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Payments Table */}
      {filteredPayments.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No payments found matching your criteria.
        </Alert>
      ) : (
        <Card sx={{
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        }}>
          <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', fontWeight: 600 }}>
                    Course
                  </TableCell>
                  <TableCell sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', fontWeight: 600 }}>
                    Amount
                  </TableCell>
                  <TableCell sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', fontWeight: 600 }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', fontWeight: 600 }}>
                    Payment Method
                  </TableCell>
                  <TableCell sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', fontWeight: 600 }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', fontWeight: 600 }}>
                    Transaction ID
                  </TableCell>
                  <TableCell sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', fontWeight: 600 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: isDarkMode ? '#334155' : '#f8fafc',
                      },
                    }}
                  >
                    <TableCell sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {payment.courseTitle}
                        </Typography>
                        {payment.description && (
                          <Typography variant="caption" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                            {payment.description}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {payment.currency} {payment.amount.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={payment.status}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(payment.status),
                          color: 'white',
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
                      {payment.paymentMethod}
                    </TableCell>
                    <TableCell sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
                      <Box>
                        <Typography variant="body2">
                          {new Date(payment.paymentDate).toLocaleDateString()}
                        </Typography>
                        {payment.dueDate && payment.status === 'PENDING' && (
                          <Typography variant="caption" sx={{ color: '#f59e0b' }}>
                            Due: {new Date(payment.dueDate).toLocaleDateString()}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {payment.transactionId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(payment.id)}
                            sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {payment.status === 'COMPLETED' && (
                          <Tooltip title="Download Receipt">
                            <IconButton
                              size="small"
                              onClick={() => handleDownloadReceipt(payment.id)}
                              sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
                            >
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Summary Card */}
      <Card sx={{
        mt: 3,
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
      }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
            Payment Summary
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box>
              <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                Total Payments
              </Typography>
              <Typography variant="h6" sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
                {filteredPayments.length}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                Total Amount
              </Typography>
              <Typography variant="h6" sx={{ color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
                USD {filteredPayments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                Completed Payments
              </Typography>
              <Typography variant="h6" sx={{ color: '#10b981' }}>
                {filteredPayments.filter(p => p.status === 'COMPLETED').length}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                Pending Payments
              </Typography>
              <Typography variant="h6" sx={{ color: '#f59e0b' }}>
                {filteredPayments.filter(p => p.status === 'PENDING').length}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyPayments;