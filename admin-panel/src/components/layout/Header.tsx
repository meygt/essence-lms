import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Info,
  Warning,
  CheckCircle,
  Error,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useTheme as useCustomTheme } from '../../hooks/useTheme';

interface HeaderProps {
  onMenuClick?: () => void;
}

// Sample notifications data
const sampleNotifications = [
  {
    id: 1,
    title: 'New Course Assignment',
    message: 'You have been assigned to teach Advanced Mathematics',
    type: 'info' as const,
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight at 2 AM',
    type: 'warning' as const,
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    title: 'Payment Received',
    message: 'Student John Doe has completed payment for Course #123',
    type: 'success' as const,
    time: '3 hours ago',
    read: true,
  },
  {
    id: 4,
    title: 'Failed Login Attempt',
    message: 'Multiple failed login attempts detected from IP 192.168.1.100',
    type: 'error' as const,
    time: '5 hours ago',
    read: true,
  },
];

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = React.useState(sampleNotifications);
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    handleClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info color="info" />;
      case 'warning': return <Warning color="warning" />;
      case 'success': return <CheckCircle color="success" />;
      case 'error': return <Error color="error" />;
      default: return <Info color="info" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return '#ef4444';
      case 'TEACHER': return '#16a34a';
      case 'STUDENT': return '#0ea5e9';
      case 'PARENT': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        backgroundColor: '#0f172a',
        borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 2, sm: 3 } }}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ 
              mr: 2,
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            color: '#FFFFFF',
            fontSize: { xs: '1rem', sm: '1.25rem' },
            fontWeight: 600
          }}
        >
          {user?.role === 'ADMIN' ? 'Admin Dashboard' : 
           user?.role === 'TEACHER' ? 'Teacher Dashboard' :
           user?.role === 'STUDENT' ? 'Student Dashboard' :
           user?.role === 'PARENT' ? 'Parent Dashboard' : 'Dashboard'}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          {/* Theme Toggle Button */}
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            sx={{
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {isDarkMode ? <LightMode sx={{ fontSize: { xs: 20, sm: 24 } }} /> : <DarkMode sx={{ fontSize: { xs: 20, sm: 24 } }} />}
          </IconButton>
          
          <IconButton 
            color="inherit"
            onClick={handleNotificationClick}
            sx={{
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </Badge>
          </IconButton>
          
          <IconButton
            size={isMobile ? 'medium' : 'large'}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <Avatar sx={{ 
              width: { xs: 28, sm: 32 }, 
              height: { xs: 28, sm: 32 }, 
              bgcolor: getRoleColor(user?.role || ''),
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}>
              {user?.firstName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
          </IconButton>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <AccountCircle sx={{ mr: 1 }} />
              <Box>
                <Typography variant="body2">{user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.email}</Typography>
                <Typography variant="caption" color="text.secondary">{user?.role}</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleSettingsClick}>
              <SettingsIcon sx={{ mr: 1 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
          
          {/* Notifications Popover */}
          <Popover
            open={Boolean(notificationAnchorEl)}
            anchorEl={notificationAnchorEl}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                width: 350,
                maxHeight: 400,
                mt: 1,
              }
            }}
          >
            <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="h6">Notifications</Typography>
              {unreadCount > 0 && (
                <Chip 
                  label={`${unreadCount} unread`} 
                  size="small" 
                  color="error" 
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
            <List sx={{ p: 0, maxHeight: 300, overflow: 'auto' }}>
              {notifications.length === 0 ? (
                <ListItem>
                  <ListItemText 
                    primary="No notifications" 
                    secondary="You're all caught up!"
                  />
                </ListItem>
              ) : (
                notifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem
                      component="button"
                      onClick={() => markNotificationAsRead(notification.id)}
                      sx={{
                        backgroundColor: notification.read ? 'transparent' : 'rgba(25, 118, 210, 0.04)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                        border: 'none',
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {getNotificationIcon(notification.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography 
                              variant="subtitle2" 
                              sx={{ 
                                fontWeight: notification.read ? 400 : 600,
                                flex: 1
                              }}
                            >
                              {notification.title}
                            </Typography>
                            {!notification.read && (
                              <Box 
                                sx={{ 
                                  width: 8, 
                                  height: 8, 
                                  borderRadius: '50%', 
                                  backgroundColor: 'error.main' 
                                }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {notification.message}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {notification.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < notifications.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              )}
            </List>
          </Popover>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;