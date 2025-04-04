import React from 'react';
import { useLocation } from 'react-router-dom';
import StudentDashboard from '../components/StudentDashboard';
import AttendanceAnalytics from '../components/AttendanceAnalytics';
import { useAuth } from '../context/AuthContext';

interface DashboardProps {
  content?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ content }) => {
  const location = useLocation();
  const { user } = useAuth();
  const path = location.pathname;

  // First check the content prop
  if (content === 'attendance') {
    return <AttendanceAnalytics />;
  }

  // Otherwise determine content by path
  if (path === '/student/dashboard' || path.startsWith('/student/')) {
    return <StudentDashboard />;
  }
  
  if (path === '/student/attendance') {
    return <AttendanceAnalytics />;
  }
  
  // Default content
  return <StudentDashboard />;
};

export default Dashboard;
