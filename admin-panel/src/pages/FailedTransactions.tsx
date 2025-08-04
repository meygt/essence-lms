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
  Avatar,
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
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Refresh as RetryIcon,
  Error as ErrorIcon,
  CreditCard as CardIcon,
  AccountBalance as BankIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Warning as WarningIcon,
  Block as BlockIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface FailedTransaction {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseName: string;
  amount: number;
  failureDate: string;
  failureReason: string;
  errorCode: string;
  paymentMethod: string;
  retryAttempts: number;
  lastRetry: string;
  status: 'failed' | 'retry_pending' | 'abandoned';
  avatar?: string;
}

const FailedTransactions: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<FailedTransaction | null>(null);
  const [showError, setShowError] = useState(false);
  const [retryDialog, setRetryDialog] = useState(false);
  const [contactDialog, setContactDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const failedStats = {
    totalFailed: 15,
    totalAmount: 4275,
    thisWeek: 6,
    retryPending: 8,
    abandoned: 3,
    successRate: 87.5,
  };

  const failedTransactions: FailedTransaction[] = [
    {
      id: 'FT001',
      studentName: 'Sarah Johnson',
      studentEmail: 'sarah@example.com',
      studentPhone: '+1 (555) 123-4567',
      courseName: 'Qur\'an Recitation & Tajweed',
      amount: 299,
      failureDate: '2024-01-15',
      failureReason: 'Insufficient funds',
      errorCode: 'CARD_DECLINED',
      paymentMethod: 'Credit Card',
      retryAttempts: 2,
      lastRetry: '2024-01-16',
      status: 'retry_pending',
    },
    {
      id: 'FT002',
      studentName: 'Michael Chen',
      studentEmail: 'michael@example.com',
      studentPhone: '+1 (555) 234-5678',
      courseName: 'Arabic Language Fundamentals',
      amount: 399,
      failureDate: '2024-01-14',
      failureReason: 'Expired card',
      errorCode: 'CARD_EXPIRED',
      paymentMethod: 'Credit Card',
      retryAttempts: 1,
      lastRetry: '2024-01-15',
      status: 'failed',
    },
    {
      id: 'FT003',
      studentName: 'Emma Wilson',
      studentEmail: 'emma@example.com',
      studentPhone: '+1 (555) 345-6789',
      courseName: 'Islamic History & Civilization',
      amount: 249,
      failureDate: '2024-01-12',
      failureReason: 'Bank connection timeout',
      errorCode: 'NETWORK_ERROR',
      paymentMethod: 'Bank Transfer',
      retryAttempts: 3,
      lastRetry: '2024-01-14',
      status: 'abandoned',
    },
    {
      id: 'FT004',
      studentName: 'David Rodriguez',
      studentEmail: 'david@example.com',
      studentPhone: '+1 (555) 456-7890',
      courseName: 'Hadith Studies',
      amount: 349,
      failureDate: '2024-01-13',
      failureReason: 'Invalid CVV',
      errorCode: 'SECURITY_ERROR',
      paymentMethod: 'Credit Card',
      retryAttempts: 0,
      lastRetry: 'Never',
      status: 'failed',
    },
    {
      id: 'FT005',
      studentName: 'Lisa Thompson',
      studentEmail: 'lisa@example.com',
      studentPhone: '+1 (555) 567-8901',
      courseName: 'Fiqh & Islamic Jurisprudence',
      amount: 429,
      failureDate: '2024-01-16',
      failureReason: 'Account blocked',
      errorCode: 'ACCOUNT_BLOCKED',
      paymentMethod: 'Bank Transfer',
      retryAttempts: 1,
      lastRetry: '2024-01-17',
      status: 'retry_pending',
    },
  ];

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, transaction: FailedTransaction) => {
    setAnchorEl(event.currentTarget);
    setSelectedTransaction(transaction);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTransaction(null);
  };

  const handleAction = (action: string) => {
    handleMenuClose();
    if (action === 'retry') {
      setRetryDialog(true);
    } else if (action === 'contact') {
      setContactDialog(true);
    } else {
      setShowError(true);
    }
  };

  const handleRetryPayment = () => {
    setRetryDialog(false);
    setShowError(true);
  };

  const handleContactStudent = () => {
    setContactDialog(false);
    setShowError(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'failed': return 'error';
      case 'retry_pending': return 'warning';
      case 'abandoned': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'failed': return <ErrorIcon />;
      case 'retry_pending': return <ScheduleIcon />;
      case 'abandoned': return <BlockIcon />;
      default: return <ErrorIcon />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    return method.includes('Card') ? <CardIcon /> : <BankIcon />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getFilteredTransactions = () => {
    switch (tabValue) {
      case 1: return failedTransactions.filter(t => t.status === 'failed');
      case 2: return failedTransactions.filter(t => t.status === 'retry_pending');
      case 3: return failedTransactions.filter(t => t.status === 'abandoned');
      default: return failedTransactions;
    }
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
            Failed Transactions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and resolve payment failures
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RetryIcon />}
            onClick={() => setShowError(true)}
          >
            Retry All
          </Button>
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
      </Box>

      {/* Failed Transaction Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {failedStats.totalFailed}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Failed
                  </Typography>
                </Box>
                <ErrorIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  Lost Revenue
                </Typography>
                <WarningIcon sx={{ color: '#f59e0b' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#dc2626' }}>
                {formatCurrency(failedStats.totalAmount)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Potential revenue loss
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  Retry Pending
                </Typography>
                <ScheduleIcon sx={{ color: '#f59e0b' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#f59e0b' }}>
                {failedStats.retryPending}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Awaiting retry attempts
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Success Rate
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#059669' }}>
                {failedStats.successRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overall payment success
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Failed Transactions Table */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Transaction Details
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ViewIcon />}
            onClick={() => setShowError(true)}
          >
            View Analytics
          </Button>
        </Box>

        {/* Filter Tabs */}
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label={`All (${failedTransactions.length})`} />
          <Tab label={`Failed (${failedTransactions.filter(t => t.status === 'failed').length})`} />
          <Tab label={`Retry Pending (${failedTransactions.filter(t => t.status === 'retry_pending').length})`} />
          <Tab label={`Abandoned (${failedTransactions.filter(t => t.status === 'abandoned').length})`} />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Failure Date</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Retry Attempts</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getFilteredTransactions().map((transaction) => (
                <TableRow key={transaction.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {transaction.studentName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {transaction.studentEmail}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {transaction.courseName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      {getPaymentMethodIcon(transaction.paymentMethod)}
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                        {transaction.paymentMethod}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#dc2626' }}>
                      {formatCurrency(transaction.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(transaction.failureDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(transaction.failureDate).toLocaleTimeString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {transaction.failureReason}
                    </Typography>
                    <Chip 
                      label={transaction.errorCode} 
                      size="small" 
                      variant="outlined" 
                      sx={{ mt: 0.5, fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(transaction.status)}
                      label={transaction.status.replace('_', ' ')}
                      size="small"
                      color={getStatusColor(transaction.status) as 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default'}
                      variant="outlined"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {transaction.retryAttempts}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {transaction.lastRetry === 'Never' ? 'Never retried' : `Last: ${new Date(transaction.lastRetry).toLocaleDateString()}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, transaction)}
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
        <MenuItem onClick={() => handleAction('view')}>
          <ViewIcon sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => handleAction('retry')}>
          <RetryIcon sx={{ mr: 1 }} />
          Retry Payment
        </MenuItem>
        <MenuItem onClick={() => handleAction('contact')}>
          <EmailIcon sx={{ mr: 1 }} />
          Contact Student
        </MenuItem>
        <MenuItem onClick={() => handleAction('refund')}>
          <WarningIcon sx={{ mr: 1 }} />
          Process Refund
        </MenuItem>
      </Menu>

      {/* Retry Payment Dialog */}
      <Dialog open={retryDialog} onClose={() => setRetryDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Retry Payment</DialogTitle>
        <DialogContent>
          {selectedTransaction && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Retry payment for <strong>{selectedTransaction.studentName}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Course: {selectedTransaction.courseName}<br />
                Amount: {formatCurrency(selectedTransaction.amount)}<br />
                Previous Error: {selectedTransaction.failureReason}
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Retry Method</InputLabel>
                <Select
                  defaultValue="auto"
                  label="Retry Method"
                >
                  <MenuItem value="auto">Automatic Retry</MenuItem>
                  <MenuItem value="manual">Manual Processing</MenuItem>
                  <MenuItem value="alternative">Alternative Payment Method</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                placeholder="Add notes about this retry attempt..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRetryDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleRetryPayment}>
            Retry Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Contact Student Dialog */}
      <Dialog open={contactDialog} onClose={() => setContactDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Contact Student</DialogTitle>
        <DialogContent>
          {selectedTransaction && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Contact <strong>{selectedTransaction.studentName}</strong> about failed payment
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Email: {selectedTransaction.studentEmail}<br />
                Phone: {selectedTransaction.studentPhone}<br />
                Failed Amount: {formatCurrency(selectedTransaction.amount)}
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Contact Method</InputLabel>
                <Select
                  defaultValue="email"
                  label="Contact Method"
                >
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="phone">Phone Call</MenuItem>
                  <MenuItem value="sms">SMS</MenuItem>
                  <MenuItem value="all">All Methods</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                placeholder="Compose your message to the student..."
                defaultValue={`Hi ${selectedTransaction.studentName}, we noticed an issue with your recent payment for ${selectedTransaction.courseName}. Please contact us to resolve this matter.`}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContactDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleContactStudent}>
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FailedTransactions;