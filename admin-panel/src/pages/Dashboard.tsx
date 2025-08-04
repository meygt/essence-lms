import React from 'react';
import { useUser } from '../hooks/useUser';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import TeacherDashboard from '../components/dashboard/TeacherDashboard';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import ParentDashboard from '../components/dashboard/ParentDashboard';

const Dashboard: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  // Render role-specific dashboard
  switch (user.role) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'TEACHER':
      return <TeacherDashboard />;
    case 'STUDENT':
      return <StudentDashboard />;
    case 'PARENT':
      return <ParentDashboard />;
    default:
      return <AdminDashboard />;
  }
};

export default Dashboard;