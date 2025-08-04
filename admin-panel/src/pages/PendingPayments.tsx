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
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Payment as PaymentIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckIcon,
  AccessTime as ClockIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface PendingPayment {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseName: string;
  amount: number;
  dueDate: string;
  daysPending: number;
  priority: 'high' | 'medium' | 'low';
  paymentMethod: string;
  lastReminder: string;
  avatar?: string;
}

const PendingPayments: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPayment, setSelectedPayment] = useState<PendingPayment | null>(null);
  const [showError, setShowError] = useState(false);
  const [processDialog, setProcessDialog] = useState(false);
  const [reminderDialog, setReminderDialog] = useState(false);

  const pendingStats = {
    totalPending: 23,
    totalAmount: 12450,
    overdue: 8,
    thisWeek: 15,
    avgDaysPending: 12,
  };

  const pendingPayments: PendingPayment[] = [
    {
      id: 'PP001',
      studentName: 'Ahmad Hassan',
      studentEmail: 'ahmad@example.com',
      studentPhone: '+1 (555) 123-4567',
      courseName: 'Qur\'an Recitation & Tajweed',
      amount: 299,
      dueDate: '2024-01-10',
      daysPending: 18,
      priority: 'high',
      paymentMethod: 'Credit Card',
      lastReminder: '2024-01-12',
    },
    {
      id: 'PP002',
      studentName: 'Fatima Ali',
      studentEmail: 'fatima@example.com',
      studentPhone: '+1 (555) 234-5678',
      courseName: 'Arabic Language Fundamentals',
      amount: 399,
      dueDate: '2024-01-15',
      daysPending: 8,
      priority: 'medium',
      paymentMethod: 'Bank Transfer',
      lastReminder: '2024-01-14',
    },
    {
      id: 'PP003',
      studentName: 'Omar Abdullah',
      studentEmail: 'omar@example.com',
      studentPhone: '+1 (555) 345-6789',
      courseName: 'Islamic History & Civilization',
      amount: 249,
      dueDate: '2024-01-20',
      daysPending: 3,
      priority: 'low',
      paymentMethod: 'PayPal',
      lastReminder: 'Never',
    },
    {
      id: 'PP004',
      studentName: 'Aisha Rahman',
      studentEmail: 'aisha@example.com',
      studentPhone: '+1 (555) 456-7890',
      courseName: 'Hadith Studies',
      amount: 349,
      dueDate: '2024-01-08',
      daysPending: 20,
      priority: 'high',
      paymentMethod: 'Credit Card',
      lastReminder: '2024-01-10',
    },
    {
      id: 'PP005',
      studentName: 'Yusuf Ibrahim',
      studentEmail: 'yusuf@example.com',
      studentPhone: '+1 (555) 567-8901',
      courseName: 'Fiqh & Islamic Jurisprudence',
      amount: 429,
      dueDate: '2024-01-18',
      daysPending: 5,
      priority: 'medium',
      paymentMethod: 'Bank Transfer',
      lastReminder: '2024-01-16',
    },
  ];

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, payment: PendingPayment) => {
    setAnchorEl(event.currentTarget);
    setSelectedPayment(payment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPayment(null);
  };

  const handleAction = (action: string) => {
    handleMenuClose();
    if (action === 'process') {
      setProcessDialog(true);
    } else if (action === 'reminder') {
      setReminderDialog(true);
    } else {
      setShowError(true);
    }
  };

  const handleProcessPayment = () => {
    setProcessDialog(false);
    setShowError(true);
  };

  const handleSendReminder = () => {
    setReminderDialog(false);
    setShowError(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <WarningIcon />;
      case 'medium': return <ClockIcon />;
      case 'low': return <CheckIcon />;
      default: return <ClockIcon />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
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
            Pending Payments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track outstanding payment obligations
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<EmailIcon />}
            onClick={() => setShowError(true)}
          >
            Send Reminders
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

      {/* Pending Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {pendingStats.totalPending}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Pending
                  </Typography>
                </Box>
                <ScheduleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  Total Amount
                </Typography>
                <PaymentIcon color="primary" />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {formatCurrency(pendingStats.totalAmount)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Outstanding balance
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  Overdue
                </Typography>
                <WarningIcon sx={{ color: '#dc2626' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#dc2626' }}>
                {pendingStats.overdue}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Require immediate attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Average Days
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {pendingStats.avgDaysPending}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Days pending payment
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pending Payments Table */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Pending Payment Details
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
                <TableCell>Student</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Days Pending</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Last Reminder</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingPayments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {payment.studentName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {payment.studentEmail}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {payment.courseName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {payment.paymentMethod}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#f59e0b' }}>
                      {formatCurrency(payment.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: isOverdue(payment.dueDate) ? '#dc2626' : 'text.primary',
                        fontWeight: isOverdue(payment.dueDate) ? 'bold' : 'normal'
                      }}
                    >
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </Typography>
                    {isOverdue(payment.dueDate) && (
                      <Chip label="Overdue" size="small" color="error" sx={{ mt: 0.5 }} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {payment.daysPending} days
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getPriorityIcon(payment.priority)}
                      label={payment.priority}
                      size="small"
                      color={getPriorityColor(payment.priority) as 'success' | 'warning' | 'error' | 'default'}
                      variant="outlined"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {payment.lastReminder === 'Never' ? (
                        <Chip label="Never" size="small" color="warning" />
                      ) : (
                        new Date(payment.lastReminder).toLocaleDateString()
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, payment)}
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
        <MenuItem onClick={() => handleAction('process')}>
          <PaymentIcon sx={{ mr: 1 }} />
          Process Payment
        </MenuItem>
        <MenuItem onClick={() => handleAction('reminder')}>
          <EmailIcon sx={{ mr: 1 }} />
          Send Reminder
        </MenuItem>
        <MenuItem onClick={() => handleAction('contact')}>
          <PhoneIcon sx={{ mr: 1 }} />
          Contact Student
        </MenuItem>
      </Menu>

      {/* Process Payment Dialog */}
      <Dialog open={processDialog} onClose={() => setProcessDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Process Payment</DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Processing payment for <strong>{selectedPayment.studentName}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Course: {selectedPayment.courseName}<br />
                Amount: {formatCurrency(selectedPayment.amount)}
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  defaultValue="manual"
                  label="Payment Method"
                >
                  <MenuItem value="manual">Manual Entry</MenuItem>
                  <MenuItem value="card">Credit Card</MenuItem>
                  <MenuItem value="bank">Bank Transfer</MenuItem>
                  <MenuItem value="cash">Cash</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Transaction Reference"
                placeholder="Enter transaction ID or reference"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                placeholder="Additional notes about this payment..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProcessDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleProcessPayment}>
            Process Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Send Reminder Dialog */}
      <Dialog open={reminderDialog} onClose={() => setReminderDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Payment Reminder</DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Send reminder to <strong>{selectedPayment.studentName}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Email: {selectedPayment.studentEmail}<br />
                Amount Due: {formatCurrency(selectedPayment.amount)}
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Reminder Type</InputLabel>
                <Select
                  defaultValue="friendly"
                  label="Reminder Type"
                >
                  <MenuItem value="friendly">Friendly Reminder</MenuItem>
                  <MenuItem value="urgent">Urgent Notice</MenuItem>
                  <MenuItem value="final">Final Notice</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Custom Message"
                multiline
                rows={4}
                placeholder="Add a personal message to the reminder..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReminderDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSendReminder}>
            Send Reminder
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PendingPayments;