import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  Payment as PaymentIcon,
  CreditCard as CardIcon,
  AccountBalance as BankIcon,
  AttachMoney as MoneyIcon,
  Receipt as ReceiptIcon,
  History as HistoryIcon,
  Schedule as ScheduleIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { usePaymentStatistics, usePayments } from '../../hooks/usePayments';

interface Payment {
  id: string;
  description?: string;
  courseName?: string;
  amount: number;
  status: string;
  createdAt: string;
  paymentMethod?: string;
}

const ParentPayments: React.FC = () => {
  const [makePaymentDialog, setMakePaymentDialog] = useState(false);
  const [showError, setShowError] = useState(false);
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);
  
  const { data: paymentStats } = usePaymentStatistics();
  const { data: payments } = usePayments({ page: 0, size: 10 });

  const paymentSummary = [
    {
      title: 'Total Paid',
      value: `$${paymentStats?.totalRevenue || 0}`,
      icon: <MoneyIcon />,
      color: '#16a34a',
    },
    {
      title: 'Pending Payments',
      value: '$0',
      icon: <ScheduleIcon />,
      color: '#f59e0b',
    },
    {
      title: 'This Month',
      value: '$0',
      icon: <ReceiptIcon />,
      color: '#0ea5e9',
    },
    {
      title: 'Payment History',
      value: payments?.length || 0,
      icon: <HistoryIcon />,
      color: '#8b5cf6',
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

  const handleMakePayment = () => {
    setShowError(true);
    setMakePaymentDialog(false);
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
          Payments & Transactions
        </Typography>
        <Button
          variant="contained"
          startIcon={<PaymentIcon />}
          onClick={() => setMakePaymentDialog(true)}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            },
          }}
        >
          Make Payment
        </Button>
      </Box>

      {/* Payment Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {paymentSummary.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
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
                  {item.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {item.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Upcoming Payments */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Upcoming Payments
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              No upcoming payments scheduled. All payments are up to date.
            </Typography>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => setMakePaymentDialog(true)}
            >
              Schedule Payment
            </Button>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Auto-Pay Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Enable automatic payments for convenience.
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={autoPayEnabled}
                  onChange={(e) => setAutoPayEnabled(e.target.checked)}
                />
              }
              label="Enable Auto-Pay"
            />
            {autoPayEnabled && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Auto-pay will be processed on the 1st of each month.
              </Alert>
            )}
          </Card>
        </Grid>
      </Grid>

      {/* Payment History */}
      <Card>
        <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Payment History
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Receipt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No payment history available. Your payment transactions will appear here.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                payments?.map((payment: Payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{payment.description || `Course Payment - ${payment.courseName || 'N/A'}`}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>
                      <Chip
                        label={payment.status}
                        color={getStatusChipColor(payment.status) as 'success' | 'warning' | 'error' | 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {getPaymentMethodIcon(payment.paymentMethod || 'Credit Card')}
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {payment.paymentMethod || 'Credit Card'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Make Payment Dialog */}
      <Dialog open={makePaymentDialog} onClose={() => setMakePaymentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PaymentIcon sx={{ mr: 1, color: '#667eea' }} />
            Make Payment
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Payment Type</InputLabel>
              <Select label="Payment Type">
                <MenuItem value="tuition">Tuition Fee</MenuItem>
                <MenuItem value="course">Course Fee</MenuItem>
                <MenuItem value="donation">Donation</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Select Child</InputLabel>
              <Select label="Select Child">
                <MenuItem value="">No children enrolled</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Payment Amount"
              type="number"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
              }}
            />
            
            <FormControl fullWidth>
              <InputLabel>Payment Method</InputLabel>
              <Select label="Payment Method">
                <MenuItem value="credit-card">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardIcon sx={{ mr: 1 }} />
                    Credit Card
                  </Box>
                </MenuItem>
                <MenuItem value="bank-transfer">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BankIcon sx={{ mr: 1 }} />
                    Bank Transfer
                  </Box>
                </MenuItem>
                <MenuItem value="paypal">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MoneyIcon sx={{ mr: 1 }} />
                    PayPal
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Notes (Optional)"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              placeholder="Add any notes about this payment..."
            />
            
            <Alert severity="info">
              All payments are processed securely. You will receive a confirmation email after successful payment.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMakePaymentDialog(false)} startIcon={<CloseIcon />}>
            Cancel
          </Button>
          <Button
            onClick={handleMakePayment}
            variant="contained"
            startIcon={<PaymentIcon />}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
            }}
          >
            Process Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ParentPayments;