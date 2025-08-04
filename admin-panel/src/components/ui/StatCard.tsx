import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactElement;
  color: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  change,
  changeType = 'increase',
  onClick,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        minHeight: { xs: 120, sm: 140 },
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          backgroundColor: onClick ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        },
        background: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
        border: '1px solid #64748b',
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 1.5, sm: 2 } }}>
          <Avatar
            sx={{
              bgcolor: color,
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              boxShadow: `0 4px 14px ${color}40`,
            }}
          >
            <Box sx={{ fontSize: { xs: 24, sm: 28 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {icon}
            </Box>
          </Avatar>
          {change && (
            <Chip
              icon={
                changeType === 'increase' ? (
                  <TrendingUpIcon sx={{ fontSize: 16 }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 16 }} />
                )
              }
              label={change}
              size="small"
              sx={{
                bgcolor: changeType === 'increase' ? '#dcfce7' : '#fee2e2',
                color: changeType === 'increase' ? '#166534' : '#dc2626',
                fontWeight: 600,
                '& .MuiChip-icon': {
                  color: changeType === 'increase' ? '#166534' : '#dc2626',
                },
              }}
            />
          )}
        </Box>
        
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 700,
            color: '#ffffff',
            mb: { xs: 0.5, sm: 1 },
            fontSize: { xs: '1.5rem', sm: '2rem' },
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>
        
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#cbd5e1',
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;