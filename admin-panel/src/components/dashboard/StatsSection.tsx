import React from 'react';
import { Grid, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  MenuBook as QuranIcon,
  EmojiEvents as CertificateIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as RevenueIcon,
} from '@mui/icons-material';
import StatCard from '../ui/StatCard';
import { useUserStatistics } from '../../hooks/useUsers';
import { useCourseStatistics } from '../../hooks/useCourses';
import { usePaymentStatistics } from '../../hooks/usePayments';

interface StatsSectionProps {
  className?: string;
}

const StatsSection: React.FC<StatsSectionProps> = () => {
  const navigate = useNavigate();
  
  const { data: userStats, loading: userLoading, error: userError } = useUserStatistics();
  const { data: courseStats, loading: courseLoading, error: courseError } = useCourseStatistics();
  const { data: paymentStats, loading: paymentLoading, error: paymentError } = usePaymentStatistics();

  const isLoading = userLoading || courseLoading || paymentLoading;
  const hasError = userError || courseError || paymentError;

  // Calculate percentage changes (you might want to store previous values in localStorage or get from API)
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      title: 'Total Students',
      value: userStats ? formatNumber(userStats.totalStudents) : '0',
      icon: <PeopleIcon />,
      color: '#16a34a',
      change: userStats?.studentGrowthRate ? `+${userStats.studentGrowthRate}%` : '+0%',
      changeType: 'increase' as const,
      onClick: () => navigate('/users?filter=students'),
    },
    {
      title: 'Active Courses',
      value: courseStats ? formatNumber(courseStats.activeCourses) : '0',
      icon: <SchoolIcon />,
      color: '#d97706',
      change: courseStats?.courseGrowthRate ? `+${courseStats.courseGrowthRate}%` : '+0%',
      changeType: 'increase' as const,
      onClick: () => navigate('/courses'),
    },
    {
      title: 'Monthly Revenue',
      value: paymentStats ? formatCurrency(paymentStats.monthlyRevenue) : '$0',
      icon: <MoneyIcon />,
      color: '#059669',
      change: paymentStats?.monthlyGrowthRate ? `+${paymentStats.monthlyGrowthRate}%` : '+0%',
      changeType: 'increase' as const,
      onClick: () => navigate('/finance'),
    },
    {
      title: 'Total Revenue',
      value: paymentStats ? formatCurrency(paymentStats.totalRevenue) : '$0',
      icon: <RevenueIcon />,
      color: '#dc2626',
      change: paymentStats?.revenueGrowthRate ? `+${paymentStats.revenueGrowthRate}%` : '+0%',
      changeType: 'increase' as const,
      onClick: () => navigate('/finance'),
    },
    {
      title: 'Qur\'an Students',
      value: userStats ? formatNumber(userStats.quranStudents || 0) : '0',
      icon: <QuranIcon />,
      color: '#0ea5e9',
      change: userStats?.quranStudentGrowthRate ? `+${userStats.quranStudentGrowthRate}%` : '+0%',
      changeType: 'increase' as const,
      onClick: () => navigate('/users?filter=quran'),
    },
    {
      title: 'Certificates Issued',
      value: userStats ? formatNumber(userStats.certificatesIssued || 0) : '0',
      icon: <CertificateIcon />,
      color: '#7c3aed',
      change: userStats?.certificateGrowthRate ? `+${userStats.certificateGrowthRate}%` : '+0%',
      changeType: 'increase' as const,
      onClick: () => navigate('/certificates'),
    },
  ];

  if (hasError) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }} key={index}>
            <StatCard
              title="Error loading data"
              value="--"
              icon={<PeopleIcon />}
              color="#dc2626"
              change="Error"
              changeType="decrease"
            />
          </Grid>
        ))}
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }} key={index}>
            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
      </>
    );
  }

  return (
    <>
      {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }} key={index}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              change={stat.change}
              changeType={stat.changeType}
              onClick={stat.onClick}
            />
          </Grid>
        ))}
    </>
  );
};

export default StatsSection;