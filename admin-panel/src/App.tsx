import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { UserProvider } from './context/UserContextProvider';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import AuthGuard from './components/auth/AuthGuard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import CourseManagement from './pages/CourseManagement';
import UserManagement from './pages/UserManagement';
import SystemAdmin from './pages/SystemAdmin';
import CourseContent from './pages/CourseContent';
import MyCourses from './pages/MyCourses';
import Calendar from './pages/Calendar';
import Attendance from './pages/Attendance';
import Finance from './pages/Finance';
import TotalRevenue from './pages/TotalRevenue';
import MonthlyRevenue from './pages/MonthlyRevenue';
import PendingPayments from './pages/PendingPayments';
import FailedTransactions from './pages/FailedTransactions';
import Reports from './pages/Reports';
import Certificates from './pages/Certificates';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import CourseEnrollment from './pages/CourseEnrollment';
import CourseCatalog from './pages/CourseCatalog';
import UserDirectory from './pages/UserDirectory';
import MyPayments from './pages/MyPayments';
import ChildrenProgress from './pages/ChildrenProgress';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthCheck from './pages/AuthCheck';

const createAppTheme = (isDarkMode: boolean) => createTheme({
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
    primary: {
      main: '#22c55e', // Islamic Green
      light: '#4ade80',
      dark: '#16a34a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d4af37', // Elegant Gold
      light: '#f59e0b',
      dark: '#b45309',
      contrastText: '#ffffff',
    },
    background: {
      default: isDarkMode ? '#0f172a' : '#f8fafc',
      paper: isDarkMode ? 'rgba(51, 65, 85, 0.95)' : '#ffffff',
    },
    text: {
      primary: isDarkMode ? '#ffffff' : '#1e293b',
      secondary: isDarkMode ? '#94a3b8' : '#64748b',
    },
    success: {
      main: '#16a34a',
      light: '#22c55e',
      dark: '#15803d',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#dc2626',
      light: '#ef4444',
      dark: '#b91c1c',
    },
    info: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0284c7',
    },
  },
  typography: {
    fontFamily: '"Inter", "Plus Jakarta Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiModal: {
      styleOverrides: {
        root: {
          // Prevent scrollbar shift when modal opens
          '&.MuiModal-root': {
            scrollbarGutter: 'stable',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          // Prevent page shift when dialog opens
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
      defaultProps: {
        // Disable scroll lock to prevent scrollbar issues
        disableScrollLock: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          border: '1px solid #f3f4f6',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#1f2937',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          borderBottom: isDarkMode ? '1px solid rgba(51, 65, 85, 0.5)' : '1px solid #e5e7eb',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          borderRight: isDarkMode ? '1px solid #334155' : '1px solid #e5e7eb',
        },
      },
    },
  },
});

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/auth-check';
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { isDarkMode } = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth-check" element={<AuthCheck />} />
      </Routes>
    );
  }

  return (
    <AuthGuard>
      <Box 
        sx={{ 
          display: 'flex',
          minHeight: '100vh',
          background: '#0f172a',
          backgroundAttachment: 'fixed',
          position: 'relative'
        }}
      >
        <Sidebar 
          open={mobileOpen}
          onClose={handleDrawerClose}
          variant="permanent"
        />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            overflow: 'hidden',
            backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc'
          }}
        >
          <Header onMenuClick={handleDrawerToggle} />
          <Box sx={{ 
            p: { xs: 2, sm: 3 },
            flexGrow: 1,
            overflow: 'auto',
            maxWidth: '100%',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <Routes>
              {/* Dashboard - accessible to all authenticated users */}
              <Route path="/" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* Analytics - Admin and Teachers only */}
              <Route path="/analytics" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']} requiredPermissions={['view_analytics']}>
                  <Analytics />
                </ProtectedRoute>
              } />
              
              {/* Course Management - Admin and Teachers only */}
              <Route path="/course-management" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']} requiredPermissions={['manage_courses']}>
                  <CourseManagement />
                </ProtectedRoute>
              } />
              
              {/* User Management - Admin only */}
              <Route path="/user-management" element={
                <ProtectedRoute allowedRoles={['ADMIN']} requiredPermissions={['view_all_users', 'manage_users']}>
                  <UserManagement />
                </ProtectedRoute>
              } />
              
              {/* User Directory - Teachers only (read-only) */}
              <Route path="/user-directory" element={
                <ProtectedRoute allowedRoles={['TEACHER']} requiredPermissions={['view_users']}>
                  <UserDirectory />
                </ProtectedRoute>
              } />
              
              {/* Course Catalog - Students and Parents */}
              <Route path="/course-catalog" element={
                <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']} requiredPermissions={['view_available_courses']}>
                  <CourseCatalog />
                </ProtectedRoute>
              } />
              
              {/* System Settings - Admin only */}
              <Route path="/system-settings" element={
                <ProtectedRoute allowedRoles={['ADMIN']} requiredPermissions={['manage_system']}>
                  <SystemAdmin />
                </ProtectedRoute>
              } />
              
              {/* Course Content - Teachers and Students */}
              <Route path="/courses/:courseId/content" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}>
                  <CourseContent />
                </ProtectedRoute>
              } />
              
              {/* My Courses - Teachers and Students */}
              <Route path="/my-courses" element={
                <ProtectedRoute allowedRoles={['TEACHER', 'STUDENT']} requiredPermissions={['view_own_courses']}>
                  <MyCourses />
                </ProtectedRoute>
              } />
              
              {/* Calendar - All roles */}
              <Route path="/calendar" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
                  <Calendar />
                </ProtectedRoute>
              } />
              
              {/* Attendance - Admin, Teachers, and Parents */}
              <Route path="/attendance" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'PARENT']} requiredPermissions={['view_attendance']}>
                  <Attendance />
                </ProtectedRoute>
              } />
              
              {/* Finance Routes - Admin only */}
              <Route path="/finance" element={
                <ProtectedRoute allowedRoles={['ADMIN']} requiredPermissions={['view_financial_data']}>
                  <Finance />
                </ProtectedRoute>
              } />
              <Route path="/total-revenue" element={
                <ProtectedRoute allowedRoles={['ADMIN']} requiredPermissions={['view_financial_data']}>
                  <TotalRevenue />
                </ProtectedRoute>
              } />
              <Route path="/monthly-revenue" element={
                <ProtectedRoute allowedRoles={['ADMIN']} requiredPermissions={['view_financial_data']}>
                  <MonthlyRevenue />
                </ProtectedRoute>
              } />
              <Route path="/pending-payments" element={
                <ProtectedRoute allowedRoles={['ADMIN']} requiredPermissions={['view_payments']}>
                  <PendingPayments />
                </ProtectedRoute>
              } />
              <Route path="/failed-transactions" element={
                <ProtectedRoute allowedRoles={['ADMIN']} requiredPermissions={['view_financial_data']}>
                  <FailedTransactions />
                </ProtectedRoute>
              } />
              
              {/* My Payments - Students and Parents */}
              <Route path="/my-payments" element={
                <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']} requiredPermissions={['view_own_payments']}>
                  <MyPayments />
                </ProtectedRoute>
              } />
              
              {/* Reports - Admin and Teachers */}
              <Route path="/reports" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']} requiredPermissions={['view_reports']}>
                  <Reports />
                </ProtectedRoute>
              } />
              
              {/* Certificates - All roles */}
              <Route path="/certificates" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
                  <Certificates />
                </ProtectedRoute>
              } />
              
              {/* Messages - All roles */}
              <Route path="/messages" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
                  <Messages />
                </ProtectedRoute>
              } />
              
              {/* Settings - All roles (personal settings) */}
              <Route path="/settings" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']}>
                  <Settings />
                </ProtectedRoute>
              } />
              
              {/* Course Enrollment - Admin, Students and Parents */}
              <Route path="/course-enrollment" element={
                <ProtectedRoute allowedRoles={['ADMIN', 'STUDENT', 'PARENT']} requiredPermissions={['enroll_courses']}>
                  <CourseEnrollment />
                </ProtectedRoute>
              } />
              
              {/* Children's Progress - Parents only */}
              <Route path="/children-progress" element={
                <ProtectedRoute allowedRoles={['PARENT']} requiredPermissions={['view_children_courses']}>
                  <ChildrenProgress />
                </ProtectedRoute>
              } />
            </Routes>
          </Box>
        </Box>
      </Box>
    </AuthGuard>
  );
};

const AppContent: React.FC = () => {
  const { isDarkMode } = useTheme();
  const theme = createAppTheme(isDarkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <AppLayout />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;
