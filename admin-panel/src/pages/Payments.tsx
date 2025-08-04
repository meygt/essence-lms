import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  Alert,
  Avatar,
  Tooltip,
  Grid
} from '@mui/material';
import {
  Payment as PaymentIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  TrendingUp,
  AttachMoney,
  CreditCard,
  AccountBalance,
  Receipt,
  Refresh
} from '@mui/icons-material';
import SquarePayment from '../components/payments/SquarePayment';

// Import types from SquarePayment component
interface PaymentResult {
  token: string;
  details: {
    cardholderName: string;
    email: string;
    amount: number;
    description: string;
  };
  amount: number;
  currency: string;
  timestamp: string;
}

interface SquareError {
  message: string;
  type: string;
}

interface Payment {
  id: string;
  studentName: string;
  course: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  method: 'card' | 'bank' | 'cash';
  transactionId: string;
  email: string;
}

interface PaymentStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalTransactions: number;
  successRate: number;
}

// TODO: Replace with actual API calls to fetch payments and statistics
// const response = await fetch('/api/payments');
// const paymentsData = await response.json();
// const statsResponse = await fetch('/api/payments/statistics');
// const statsData = await statsResponse.json();

// Temporary empty data until backend is ready
const emptyPayments: Payment[] = [];
const emptyStats: PaymentStats = {
  totalRevenue: 0,
  monthlyRevenue: 0,
  totalTransactions: 0,
  successRate: 0
};

export default function Payments() {
  const [payments] = useState<Payment[]>(emptyPayments);
  const [stats] = useState<PaymentStats>(emptyStats);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [newPayment, setNewPayment] = useState({
    studentName: '',
    course: '',
    amount: 0,
    email: ''
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount / 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      case 'refunded': return 'info';
      default: return 'default';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <CreditCard />;
      case 'bank': return <AccountBalance />;
      case 'cash': return <AttachMoney />;
      default: return <PaymentIcon />;
    }
  };

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setOpenViewDialog(true);
  };

  const handlePaymentSuccess = (result: PaymentResult) => {
    console.log('Payment successful:', result);
    setOpenPaymentDialog(false);
    setNewPayment({ studentName: '', course: '', amount: 0, email: '' });
    // In a real app, you would refresh the payments list here
  };

  const handlePaymentError = (error: SquareError[] | Error) => {
    console.error('Payment failed:', error);
  };

  interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
  }

  const StatCard = ({ title, value, icon, color }: StatCardProps) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Payment Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenPaymentDialog(true)}
        >
          Process Payment
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
         <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={<TrendingUp />}
            color="success"
          />
        </Grid>
         <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(stats.monthlyRevenue)}
            icon={<AttachMoney />}
            color="primary"
          />
        </Grid>
         <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Transactions"
            value={stats.totalTransactions}
            icon={<Receipt />}
            color="info"
          />
        </Grid>
         <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Success Rate"
            value={`${stats.successRate}%`}
            icon={<CreditCard />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
            <Tab label="All Payments" />
            <Tab label="Completed" />
            <Tab label="Pending" />
            <Tab label="Failed" />
          </Tabs>
        </Box>

        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Payment History
            </Typography>
            <Box>
              <Tooltip title="Refresh">
                <IconButton>
                  <Refresh />
                </IconButton>
              </Tooltip>
              <Tooltip title="Export">
                <IconButton>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments
                  .filter(payment => {
                    if (selectedTab === 0) return true;
                    if (selectedTab === 1) return payment.status === 'completed';
                    if (selectedTab === 2) return payment.status === 'pending';
                    if (selectedTab === 3) return payment.status === 'failed';
                    return true;
                  })
                  .map((payment) => (
                    <TableRow key={payment.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {payment.studentName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {payment.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{payment.course}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {formatCurrency(payment.amount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={payment.status.toUpperCase()}
                          color={getStatusColor(payment.status) as 'success' | 'warning' | 'error' | 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getMethodIcon(payment.method)}
                          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                            {payment.method}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {new Date(payment.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewPayment(payment)}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Process Payment Dialog */}
      <Dialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Process New Payment</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            This is a sandbox environment for testing payments. Use test card: 4111 1111 1111 1111
          </Alert>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Student Name"
                value={newPayment.studentName}
                onChange={(e) => setNewPayment(prev => ({ ...prev, studentName: e.target.value }))}
              />
            </Grid>
             <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newPayment.email}
                onChange={(e) => setNewPayment(prev => ({ ...prev, email: e.target.value }))}
              />
            </Grid>
             <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                label="Course"
                value={newPayment.course}
                onChange={(e) => setNewPayment(prev => ({ ...prev, course: e.target.value }))}
              >
                <MenuItem value="Quran Memorization">Quran Memorization - $299</MenuItem>
                <MenuItem value="Tajweed Mastery">Tajweed Mastery - $149</MenuItem>
                <MenuItem value="Arabic Language">Arabic Language - $199</MenuItem>
                <MenuItem value="Islamic Studies">Islamic Studies - $249</MenuItem>
              </TextField>
            </Grid>
             <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Amount (in cents)"
                type="number"
                value={newPayment.amount}
                onChange={(e) => setNewPayment(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                helperText="Enter amount in cents (e.g., 29900 for $299.00)"
              />
            </Grid>
          </Grid>

          {newPayment.amount > 0 && (
            <SquarePayment
              amount={newPayment.amount}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* View Payment Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Payment Details</DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <Grid container spacing={2}>
               <Grid size={{ xs: 12 }}>
                <Typography variant="h6" gutterBottom>
                  Transaction Information
                </Typography>
              </Grid>
               <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="textSecondary">Student:</Typography>
                <Typography variant="body1">{selectedPayment.studentName}</Typography>
              </Grid>
               <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="textSecondary">Email:</Typography>
                <Typography variant="body1">{selectedPayment.email}</Typography>
              </Grid>
               <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="textSecondary">Course:</Typography>
                <Typography variant="body1">{selectedPayment.course}</Typography>
              </Grid>
               <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="textSecondary">Amount:</Typography>
                <Typography variant="body1">{formatCurrency(selectedPayment.amount)}</Typography>
              </Grid>
               <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="textSecondary">Status:</Typography>
                <Chip
                  label={selectedPayment.status.toUpperCase()}
                  color={getStatusColor(selectedPayment.status) as 'success' | 'warning' | 'error' | 'default'}
                  size="small"
                />
              </Grid>
               <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="textSecondary">Method:</Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                  {selectedPayment.method}
                </Typography>
              </Grid>
               <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="textSecondary">Date:</Typography>
                <Typography variant="body1">
                  {new Date(selectedPayment.date).toLocaleDateString()}
                </Typography>
              </Grid>
               <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="textSecondary">Transaction ID:</Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {selectedPayment.transactionId}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Download Receipt
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}