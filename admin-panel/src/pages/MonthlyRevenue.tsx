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
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  LinearProgress,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  CalendarToday as CalendarIcon,
  BarChart as ChartIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface MonthlyData {
  month: string;
  year: number;
  revenue: number;
  transactions: number;
  growth: number;
  courseRevenue: number;
  donationRevenue: number;
  subscriptionRevenue: number;
}

const MonthlyRevenue: React.FC = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showError, setShowError] = useState(false);

  const currentMonthStats = {
    revenue: 45680,
    transactions: 234,
    growth: 17.4,
    avgTransactionValue: 195,
    courseRevenue: 32450,
    donationRevenue: 8230,
    subscriptionRevenue: 5000,
  };

  const monthlyData: MonthlyData[] = [
    {
      month: 'January',
      year: 2024,
      revenue: 45680,
      transactions: 234,
      growth: 17.4,
      courseRevenue: 32450,
      donationRevenue: 8230,
      subscriptionRevenue: 5000,
    },
    {
      month: 'December',
      year: 2023,
      revenue: 38920,
      transactions: 198,
      growth: -5.2,
      courseRevenue: 28100,
      donationRevenue: 7320,
      subscriptionRevenue: 3500,
    },
    {
      month: 'November',
      year: 2023,
      revenue: 41050,
      transactions: 215,
      growth: 12.8,
      courseRevenue: 29800,
      donationRevenue: 6750,
      subscriptionRevenue: 4500,
    },
    {
      month: 'October',
      year: 2023,
      revenue: 36400,
      transactions: 189,
      growth: 8.3,
      courseRevenue: 25200,
      donationRevenue: 6800,
      subscriptionRevenue: 4400,
    },
    {
      month: 'September',
      year: 2023,
      revenue: 33600,
      transactions: 172,
      growth: -2.1,
      courseRevenue: 23100,
      donationRevenue: 6200,
      subscriptionRevenue: 4300,
    },
  ];

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    setSelectedMonth(event.target.value);
  };

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? '#22c55e' : '#dc2626';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />;
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
            Monthly Revenue
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Month-by-month revenue analysis and trends
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              label="Year"
              onChange={handleYearChange}
            >
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={selectedMonth}
              label="Month"
              onChange={handleMonthChange}
            >
              <MenuItem value="January">January</MenuItem>
              <MenuItem value="February">February</MenuItem>
              <MenuItem value="March">March</MenuItem>
              <MenuItem value="April">April</MenuItem>
              <MenuItem value="May">May</MenuItem>
              <MenuItem value="June">June</MenuItem>
              <MenuItem value="July">July</MenuItem>
              <MenuItem value="August">August</MenuItem>
              <MenuItem value="September">September</MenuItem>
              <MenuItem value="October">October</MenuItem>
              <MenuItem value="November">November</MenuItem>
              <MenuItem value="December">December</MenuItem>
            </Select>
          </FormControl>
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
            Export
          </Button>
        </Box>
      </Box>

      {/* Current Month Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {formatCurrency(currentMonthStats.revenue)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {selectedMonth} Revenue
                  </Typography>
                </Box>
                <MoneyIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  Transactions
                </Typography>
                <ChartIcon color="primary" />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {currentMonthStats.transactions}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg: {formatCurrency(currentMonthStats.avgTransactionValue)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  Growth Rate
                </Typography>
                {getGrowthIcon(currentMonthStats.growth)}
              </Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 1,
                  color: getGrowthColor(currentMonthStats.growth)
                }}
              >
                {currentMonthStats.growth > 0 ? '+' : ''}{currentMonthStats.growth}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                vs. previous month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Revenue Breakdown
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Courses</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {formatCurrency(currentMonthStats.courseRevenue)}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(currentMonthStats.courseRevenue / currentMonthStats.revenue) * 100}
                  sx={{ height: 6, borderRadius: 3, mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Donations</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {formatCurrency(currentMonthStats.donationRevenue)}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(currentMonthStats.donationRevenue / currentMonthStats.revenue) * 100}
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    '& .MuiLinearProgress-bar': { backgroundColor: '#d4af37' }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Comparison Table */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Monthly Comparison
          </Typography>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>Total Revenue</TableCell>
                <TableCell>Transactions</TableCell>
                <TableCell>Course Revenue</TableCell>
                <TableCell>Donations</TableCell>
                <TableCell>Subscriptions</TableCell>
                <TableCell>Growth</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monthlyData.map((data, index) => (
                <TableRow key={`${data.month}-${data.year}`} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {data.month} {data.year}
                      </Typography>
                      {index === 0 && (
                        <Chip label="Current" size="small" color="primary" sx={{ mt: 0.5 }} />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#22c55e' }}>
                      {formatCurrency(data.revenue)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {data.transactions}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatCurrency(data.courseRevenue)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatCurrency(data.donationRevenue)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatCurrency(data.subscriptionRevenue)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getGrowthIcon(data.growth)}
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          ml: 1,
                          color: getGrowthColor(data.growth),
                          fontWeight: 'bold'
                        }}
                      >
                        {data.growth > 0 ? '+' : ''}{data.growth}%
                      </Typography>
                    </Box>
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
          <DownloadIcon sx={{ mr: 1 }} />
          Export Data
        </MenuItem>
        <MenuItem onClick={handleAction}>
          <ChartIcon sx={{ mr: 1 }} />
          View Chart
        </MenuItem>
        <MenuItem onClick={handleAction}>
          <CalendarIcon sx={{ mr: 1 }} />
          Compare Periods
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MonthlyRevenue;