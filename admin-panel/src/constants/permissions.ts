// Role-based permissions
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  ADMIN: [
    'manage_users',
    'view_all_users',
    'manage_courses',
    'view_all_courses',
    'view_analytics',
    'manage_system',
    'view_financial_data',
    'manage_payments',
    'view_reports',
    'view_attendance',
    'manage_certificates',
    'view_payments',
    'manage_enrollments',
    'enroll_courses'
  ],
  TEACHER: [
    'view_own_courses',
    'manage_own_courses',
    'view_analytics',
    'view_attendance',
    'manage_certificates',
    'view_reports',
    'view_users'
  ],
  STUDENT: [
    'view_own_courses',
    'view_own_progress',
    'view_own_certificates',
    'view_available_courses',
    'enroll_courses',
    'view_own_payments'
  ],
  PARENT: [
    'view_children_attendance',
    'view_children_progress',
    'view_children_courses',
    'view_available_courses',
    'enroll_courses',
    'view_own_payments'
  ]
};