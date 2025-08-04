// Route configuration with role-based access control
export interface RouteConfig {
  path: string;
  allowedRoles?: string[];
  requiredPermissions?: string[];
  component: string;
}

// Define which roles can access which routes
export const ROUTE_PERMISSIONS: Record<string, RouteConfig> = {
  // Dashboard - accessible to all authenticated users
  '/': {
    path: '/',
    allowedRoles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
    component: 'Dashboard'
  },
  '/dashboard': {
    path: '/dashboard',
    allowedRoles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
    component: 'Dashboard'
  },

  // Analytics - Admin and Teachers only
  '/analytics': {
    path: '/analytics',
    allowedRoles: ['ADMIN', 'TEACHER'],
    requiredPermissions: ['view_analytics'],
    component: 'Analytics'
  },

  // Course Management - Admin and Teachers only
  '/course-management': {
    path: '/course-management',
    allowedRoles: ['ADMIN', 'TEACHER'],
    requiredPermissions: ['manage_courses'],
    component: 'CourseManagement'
  },

  // Course Catalog - Students can browse available courses
  '/course-catalog': {
    path: '/course-catalog',
    allowedRoles: ['STUDENT', 'PARENT'],
    requiredPermissions: ['view_available_courses'],
    component: 'CourseCatalog'
  },

  // User Management - Admin only (separated view and manage)
  '/user-management': {
    path: '/user-management',
    allowedRoles: ['ADMIN'],
    requiredPermissions: ['view_all_users'],
    component: 'UserManagement'
  },

  // User Directory - Read-only user list for teachers
  '/user-directory': {
    path: '/user-directory',
    allowedRoles: ['TEACHER'],
    requiredPermissions: ['view_users'],
    component: 'UserDirectory'
  },

  // System Settings - Admin only
  '/system-settings': {
    path: '/system-settings',
    allowedRoles: ['ADMIN'],
    requiredPermissions: ['manage_system'],
    component: 'SystemAdmin'
  },

  // Course Content - Teachers and Students
  '/courses/:courseId/content': {
    path: '/courses/:courseId/content',
    allowedRoles: ['ADMIN', 'TEACHER', 'STUDENT'],
    component: 'CourseContent'
  },

  // My Courses - Teachers and Students
  '/my-courses': {
    path: '/my-courses',
    allowedRoles: ['TEACHER', 'STUDENT'],
    requiredPermissions: ['view_own_courses'],
    component: 'MyCourses'
  },

  // Calendar - All roles
  '/calendar': {
    path: '/calendar',
    allowedRoles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
    component: 'Calendar'
  },

  // Attendance - Admin, Teachers, and Parents
  '/attendance': {
    path: '/attendance',
    allowedRoles: ['ADMIN', 'TEACHER', 'PARENT'],
    requiredPermissions: ['view_attendance'],
    component: 'Attendance'
  },

  // Finance Routes - Admin only
  '/finance': {
    path: '/finance',
    allowedRoles: ['ADMIN'],
    requiredPermissions: ['view_financial_data'],
    component: 'Finance'
  },

  // My Payments - Parents can view their own payments
  '/my-payments': {
    path: '/my-payments',
    allowedRoles: ['PARENT', 'STUDENT'],
    requiredPermissions: ['view_own_payments'],
    component: 'MyPayments'
  },
  '/total-revenue': {
    path: '/total-revenue',
    allowedRoles: ['ADMIN'],
    requiredPermissions: ['view_financial_data'],
    component: 'TotalRevenue'
  },
  '/monthly-revenue': {
    path: '/monthly-revenue',
    allowedRoles: ['ADMIN'],
    requiredPermissions: ['view_financial_data'],
    component: 'MonthlyRevenue'
  },
  '/pending-payments': {
    path: '/pending-payments',
    allowedRoles: ['ADMIN'],
    requiredPermissions: ['view_payments'],
    component: 'PendingPayments'
  },
  '/failed-transactions': {
    path: '/failed-transactions',
    allowedRoles: ['ADMIN'],
    requiredPermissions: ['view_financial_data'],
    component: 'FailedTransactions'
  },

  // Reports - Admin and Teachers
  '/reports': {
    path: '/reports',
    allowedRoles: ['ADMIN', 'TEACHER'],
    requiredPermissions: ['view_reports'],
    component: 'Reports'
  },

  // Certificates - All roles
  '/certificates': {
    path: '/certificates',
    allowedRoles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
    component: 'Certificates'
  },

  // Messages - All roles
  '/messages': {
    path: '/messages',
    allowedRoles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
    component: 'Messages'
  },

  // Settings - All roles (personal settings)
  '/settings': {
    path: '/settings',
    allowedRoles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
    component: 'Settings'
  },

  // Course Enrollment - Students, Parents, and Admin
  '/course-enrollment': {
    path: '/course-enrollment',
    allowedRoles: ['ADMIN', 'STUDENT', 'PARENT'],
    requiredPermissions: ['enroll_courses', 'manage_enrollments'],
    component: 'CourseEnrollment'
  },

  // Children's Progress - Parents can view their children's progress
  '/children-progress': {
    path: '/children-progress',
    allowedRoles: ['PARENT'],
    requiredPermissions: ['view_children_progress'],
    component: 'ChildrenProgress'
  }
};

// Helper function to check if user can access a route
export const canAccessRoute = (path: string, userRole: string, userPermissions: string[] = []): boolean => {
  const routeConfig = ROUTE_PERMISSIONS[path];
  
  if (!routeConfig) {
    // If route is not configured, deny access by default
    return false;
  }

  // Check role access
  const hasAllowedRole = !routeConfig.allowedRoles || routeConfig.allowedRoles.includes(userRole);
  
  // Check permission access
  const hasRequiredPermissions = !routeConfig.requiredPermissions || 
    routeConfig.requiredPermissions.every(permission => userPermissions.includes(permission));

  return hasAllowedRole && hasRequiredPermissions;
};

// Get accessible routes for a user role
export const getAccessibleRoutes = (userRole: string, userPermissions: string[] = []): string[] => {
  return Object.keys(ROUTE_PERMISSIONS).filter(path => 
    canAccessRoute(path, userRole, userPermissions)
  );
};