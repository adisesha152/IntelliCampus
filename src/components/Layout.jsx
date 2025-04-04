import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { 
  Bell, 
  Settings, 
  ChevronDown, 
  LogOut, 
  User, 
  Search, 
  UserPlus, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  Users 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Button from './Button';

const Layout = ({ children }) => {
  const { user, logout, setUserRole } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  // Role-specific notification examples
  const notificationsByRole = {
    student: [
      { id: 1, message: 'New assignment posted in MATH201', time: '4 hours ago' },
      { id: 2, message: 'CS101 class cancelled tomorrow', time: '2 hours ago' },
      { id: 3, message: 'Grades posted for PHYS105 midterm', time: '1 day ago' },
    ],
    faculty: [
      { id: 1, message: 'New student enrolled in CS101', time: '2 hours ago' },
      { id: 2, message: 'Grade submission deadline extended', time: '5 hours ago' },
      { id: 3, message: 'Faculty meeting rescheduled to Friday', time: '1 day ago' },
    ],
    admin: [
      { id: 1, message: 'New faculty onboarding request', time: '1 hour ago' },
      { id: 2, message: 'System maintenance scheduled', time: '3 hours ago' },
      { id: 3, message: 'Quarterly budget report ready for review', time: '1 day ago' },
    ]
  };

  // Get notifications based on user role
  const notifications = notificationsByRole[user?.role || 'student'];

  const handleLogout = () => {
    // Close the menu first
    setUserMenuOpen(false);
    
    // Call the logout function from context
    logout();
    
    // Navigate to login page
    navigate('/');
  };

  const handleRoleChange = (role) => {
    setRoleMenuOpen(false);
    setUserRole(role);
    
    // Navigate to the appropriate dashboard based on role
    if (role === 'student') {
      navigate('/student/dashboard');
    } else if (role === 'faculty') {
      navigate('/faculty/dashboard');
    } else if (role === 'admin') {
      navigate('/admin/dashboard');
    }
  };

  // Get the right path prefix based on user role
  const getPathPrefix = () => {
    switch(user?.role) {
      case 'admin': return '/admin';
      case 'faculty': return '/faculty';
      default: return '/student';
    }
  };

  // Get role-specific action buttons for the top bar
  const getRoleActions = () => {
    switch(user?.role) {
      case 'admin':
        return (
          <>
            <Button variant="outline" size="sm" className="mr-2">
              <Users className="h-4 w-4 mr-1" />
              Manage Users
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              System Settings
            </Button>
          </>
        );
      case 'faculty':
        return (
          <>
            <Button variant="outline" size="sm" className="mr-2">
              <Calendar className="h-4 w-4 mr-1" />
              Academic Calendar
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              Course Materials
            </Button>
          </>
        );
      default: // student
        return (
          <>
            <Button variant="outline" size="sm" className="mr-2">
              <FileText className="h-4 w-4 mr-1" />
              Assignments
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-1" />
              Schedule
            </Button>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm">
          {/* Search bar with role-specific placeholder */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-md px-3 py-1.5 w-72">
            <Search className="h-4 w-4 text-slate-500 mr-2" />
            <input 
              type="text" 
              placeholder={`Search ${user?.role === 'admin' ? 'users, courses...' : 
                             user?.role === 'faculty' ? 'students, courses...' : 
                             'courses, assignments...'}` }
              className="bg-transparent border-none focus:outline-none text-sm w-full"
            />
          </div>
          
          {/* Role-specific action buttons for medium+ screens */}
          <div className="hidden md:flex items-center space-x-2">
            {getRoleActions()}
          </div>
          
          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Role Selector (for demo purposes) */}
            <div className="relative">
              <button 
                className="p-2 rounded-full hover:bg-slate-100 relative flex items-center text-xs font-medium"
                onClick={() => {
                  setRoleMenuOpen(!roleMenuOpen);
                  if (userMenuOpen) setUserMenuOpen(false);
                  if (notificationsOpen) setNotificationsOpen(false);
                }}
              >
                <span className="mr-1 capitalize">{user?.role || 'Role'}</span>
                <ChevronDown className="h-3 w-3 text-slate-500" />
              </button>
              
              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-20 border border-slate-200">
                  <button 
                    onClick={() => handleRoleChange('student')}
                    className={`w-full text-left flex items-center px-4 py-2 text-sm hover:bg-slate-50 ${user?.role === 'student' ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    <User className="h-4 w-4 mr-2 text-blue-500" />
                    Student
                  </button>
                  <button 
                    onClick={() => handleRoleChange('faculty')}
                    className={`w-full text-left flex items-center px-4 py-2 text-sm hover:bg-slate-50 ${user?.role === 'faculty' ? 'bg-green-50 text-green-600' : ''}`}
                  >
                    <UserPlus className="h-4 w-4 mr-2 text-green-500" />
                    Faculty
                  </button>
                  <button 
                    onClick={() => handleRoleChange('admin')}
                    className={`w-full text-left flex items-center px-4 py-2 text-sm hover:bg-slate-50 ${user?.role === 'admin' ? 'bg-purple-50 text-purple-600' : ''}`}
                  >
                    <ShieldCheck className="h-4 w-4 mr-2 text-purple-500" />
                    Admin
                  </button>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-2 rounded-full hover:bg-slate-100 relative"
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  if (userMenuOpen) setUserMenuOpen(false);
                }}
              >
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications?.length || 0}
                </span>
              </button>
              
              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20 border border-slate-200">
                  <div className="px-4 py-2 border-b border-slate-200">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications?.length > 0 ? (
                      notifications.map(notification => (
                        <div key={notification.id} className="px-4 py-3 hover:bg-slate-50 border-b border-slate-100">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-center text-slate-500">
                        <p className="text-sm">No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-200">
                    <Link to={`${getPathPrefix()}/notifications`} className="text-blue-600 text-xs font-medium">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Settings */}
            <Link to={`${getPathPrefix()}/settings`} className="p-2 rounded-full hover:bg-slate-100">
              <Settings className="h-5 w-5 text-slate-600" />
            </Link>
            
            {/* User Menu */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  if (notificationsOpen) setNotificationsOpen(false);
                  if (roleMenuOpen) setRoleMenuOpen(false);
                }}
              >
                <div className={`h-8 w-8 rounded-full ${
                  user?.role === 'admin' ? 'bg-purple-500' :
                  user?.role === 'faculty' ? 'bg-green-500' : 'bg-blue-500'
                } flex items-center justify-center text-white font-medium`}>
                  {user?.name ? user.name.charAt(0) : 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.name || 'User'}</p>
                  <p className="text-xs text-slate-500 capitalize">{user?.role || 'Student'}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
              
              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-slate-200">
                  <Link 
                    to={`${getPathPrefix()}/profile`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-slate-50"
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </Link>
                  <Link 
                    to={`${getPathPrefix()}/settings`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-slate-50"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      
      {/* Overlay for mobile when dropdown is open */}
      {(userMenuOpen || notificationsOpen || roleMenuOpen) && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-20 z-10"
          onClick={() => {
            setUserMenuOpen(false);
            setNotificationsOpen(false);
            setRoleMenuOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Layout;