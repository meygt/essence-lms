import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import { useTheme as useCustomTheme } from '../../hooks/useTheme';
import {
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as AttendanceIcon,
  Payment as PaymentIcon,
  Assessment as ReportsIcon,
  EmojiEvents as CertificatesIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  Class as ClassIcon,
  ChevronLeft as ChevronLeftIcon,
  Analytics as AnalyticsIcon,
  School as CourseManagementIcon,
  SupervisorAccount as UserManagementIcon,
  AdminPanelSettings as SystemAdminIcon,
  ShoppingCart as CourseEnrollmentIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { canAccessRoute } from '../../config/routes';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'temporary';
}

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 72;

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, variant = 'permanent' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [collapsed, setCollapsed] = React.useState(false);
  
  // On mobile, always use temporary drawer
  const drawerVariant = isMobile ? 'temporary' : variant;
  const drawerOpen = isMobile ? open : (variant === 'temporary' ? open : !collapsed);
  const drawerWidth = collapsed && !isMobile ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  const allMenuItems: MenuItem[] = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    { text: 'User Management', icon: <UserManagementIcon />, path: '/user-management' },
    { text: 'User Directory', icon: <UserManagementIcon />, path: '/user-directory' },
    { text: 'Course Management', icon: <CourseManagementIcon />, path: '/course-management' },
    { text: 'Course Catalog', icon: <CourseManagementIcon />, path: '/course-catalog' },
    { text: 'My Courses', icon: <ClassIcon />, path: '/my-courses' },
    { text: 'Course Enrollment', icon: <CourseEnrollmentIcon />, path: '/course-enrollment' },
    { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
    { text: 'Attendance', icon: <AttendanceIcon />, path: '/attendance' },
    { text: 'Financial Management', icon: <PaymentIcon />, path: '/finance' },
    { text: 'My Payments', icon: <PaymentIcon />, path: '/my-payments' },
    { text: 'Children\'s Progress', icon: <ReportsIcon />, path: '/children-progress' },
    { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
    { text: 'Certificates', icon: <CertificatesIcon />, path: '/certificates' },
    { text: 'Messages', icon: <MessageIcon />, path: '/messages' },
    { text: 'System Settings', icon: <SystemAdminIcon />, path: '/system-settings' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  // Filter menu items based on user role and permissions
  const menuItems = allMenuItems.filter(item => 
    user && canAccessRoute(item.path, user.role, user.permissions || [])
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return '#ef4444';
      case 'TEACHER': return '#16a34a';
      case 'STUDENT': return '#0ea5e9';
      case 'PARENT': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const handleToggleCollapse = () => {
    if (!isMobile) {
      setCollapsed(!collapsed);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <Drawer
      variant={drawerVariant}
      open={drawerOpen}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          color: isDarkMode ? 'white' : '#1e293b',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          border: 'none',
          boxShadow: '4px 0 8px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      {/* Header with Logo and Collapse Button */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: collapsed ? 'center' : 'space-between',
        minHeight: 64
      }}>
        {!collapsed && (
          <Box sx={{ textAlign: 'left', flex: 1 }}>
            <Typography variant="h6" component="div" sx={{ 
              fontWeight: 'bold', 
              color: '#d4af37',
              fontSize: '1.1rem',
              lineHeight: 1.2
            }}>
              Essence Academy
            </Typography>
            <Typography variant="caption" sx={{ 
              color: isDarkMode ? '#94a3b8' : '#64748b',
              fontSize: '0.75rem'
            }}>
              Learning Management System
            </Typography>
          </Box>
        )}
        {!isMobile && (
          <IconButton
            onClick={handleToggleCollapse}
            sx={{
              color: isDarkMode ? '#94a3b8' : '#64748b',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                color: '#d4af37'
              },
              transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>
      
      {/* User Profile Section */}
      {user && (
        <Box sx={{ 
          p: 2, 
          textAlign: 'center',
          display: 'flex',
          flexDirection: collapsed ? 'column' : 'column',
          alignItems: 'center',
          gap: collapsed ? 0 : 1
        }}>
          <Avatar 
            sx={{ 
              width: collapsed ? 40 : 48, 
              height: collapsed ? 40 : 48, 
              mx: 'auto', 
              mb: collapsed ? 0 : 1,
              bgcolor: getRoleColor(user.role),
              transition: 'all 0.3s ease'
            }}
          >
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </Avatar>
          {!collapsed && (
            <>
              <Typography variant="body2" sx={{ 
                color: isDarkMode ? 'white' : '#1e293b', 
                fontWeight: 'medium',
                fontSize: '0.875rem',
                textAlign: 'center',
                lineHeight: 1.2
              }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Chip 
                label={user.role}
                size="small"
                sx={{ 
                  bgcolor: getRoleColor(user.role),
                  color: 'white',
                  fontSize: '0.7rem',
                  height: 20
                }}
              />
            </>
          )}
        </Box>
      )}
      
      <Divider sx={{ borderColor: isDarkMode ? '#334155' : '#e2e8f0', mx: collapsed ? 1 : 0 }} />
      
      <List sx={{ px: 1, py: 0 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  backgroundColor: isActive ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.25)' : isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                  },
                  borderRadius: 2,
                  minHeight: 48,
                  px: collapsed ? 1.5 : 2,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  transition: 'all 0.2s ease',
                  border: isActive ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid transparent',
                }}
                title={collapsed ? item.text : undefined}
              >
                <ListItemIcon 
                  sx={{ 
                    color: isActive ? '#d4af37' : isDarkMode ? '#94a3b8' : '#64748b',
                    minWidth: collapsed ? 'auto' : 40,
                    mr: collapsed ? 0 : 1.5,
                    justifyContent: 'center',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText 
                    primary={item.text} 
                    sx={{ 
                      '& .MuiListItemText-primary': {
                        color: isActive ? (isDarkMode ? '#ffffff' : '#1e293b') : isDarkMode ? '#cbd5e1' : '#64748b',
                        fontWeight: isActive ? 600 : 400,
                        fontSize: '0.875rem',
                        transition: 'color 0.2s ease'
                      }
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;