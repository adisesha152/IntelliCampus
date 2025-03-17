
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';
import FacultyDashboard from '../components/FacultyDashboard';
import StudentDashboard from '../components/StudentDashboard';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  
  // Show loading spinner while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  let DashboardComponent;
  
  // Determine which dashboard to render based on user role
  switch(user.role) {
    case 'admin':
      DashboardComponent = AdminDashboard;
      break;
    case 'faculty':
      DashboardComponent = FacultyDashboard;
      break;
    case 'student':
      DashboardComponent = StudentDashboard;
      break;
    default:
      return <Navigate to="/" replace />;
  }
  
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <DashboardComponent />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
