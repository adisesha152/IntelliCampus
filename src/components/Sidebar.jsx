
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  BookOpen, 
  FileText, 
  BarChart, 
  Settings, 
  Award, 
  Clock, 
  Mail, 
  CreditCard, 
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '@/lib/utils';

const adminMenuItems = [
  { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'User Management', path: '/admin/users' },
  { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
  { icon: Calendar, label: 'Schedule', path: '/admin/schedule' },
  { icon: BarChart, label: 'Reports', path: '/admin/reports' },
  { icon: GraduationCap, label: 'Faculty', path: '/admin/faculty' },
  { icon: CreditCard, label: 'Finance', path: '/admin/finance' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' }
];

const facultyMenuItems = [
  { icon: Home, label: 'Dashboard', path: '/faculty/dashboard' },
  { icon: Users, label: 'Students', path: '/faculty/students' },
  { icon: BookOpen, label: 'Courses', path: '/faculty/courses' },
  { icon: FileText, label: 'Assessments', path: '/faculty/assessments' },
  { icon: Calendar, label: 'Schedule', path: '/faculty/schedule' },
  { icon: Mail, label: 'Messages', path: '/faculty/messages' },
  { icon: Settings, label: 'Settings', path: '/faculty/settings' }
];

const studentMenuItems = [
  { icon: Home, label: 'Dashboard', path: '/student/dashboard' },
  { icon: BookOpen, label: 'Courses', path: '/student/courses' },
  { icon: Calendar, label: 'Schedule', path: '/student/schedule' },
  { icon: FileText, label: 'Assignments', path: '/student/assignments' },
  { icon: Award, label: 'Grades', path: '/student/grades' },
  { icon: CreditCard, label: 'Fees', path: '/student/fees' },
  { icon: Mail, label: 'Messages', path: '/student/messages' },
  { icon: Settings, label: 'Settings', path: '/student/settings' }
];

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  // Determine menu items based on user role
  let menuItems = [];
  switch(user?.role) {
    case 'admin':
      menuItems = adminMenuItems;
      break;
    case 'faculty':
      menuItems = facultyMenuItems;
      break;
    case 'student':
      menuItems = studentMenuItems;
      break;
    default:
      menuItems = [];
  }

  return (
    <div 
      className={cn(
        "h-screen flex flex-col bg-white border-r border-slate-200 transition-all duration-300 shadow-sm",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
        {!collapsed && (
          <h1 className="text-xl font-semibold text-gradient">IntelliCampus</h1>
        )}
        {collapsed && (
          <div className="mx-auto">
            <GraduationCap className="h-7 w-7 text-blue-500" />
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-slate-100 text-slate-500"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.path 
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn("h-5 w-5", 
                location.pathname === item.path 
                  ? "text-blue-600"
                  : "text-slate-500"
              )} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-200">
        <div className={cn(
          "flex items-center space-x-3",
          collapsed && "justify-center"
        )}>
          <HelpCircle className="h-5 w-5 text-slate-500" />
          {!collapsed && <span className="text-sm font-medium text-slate-700">Help & Support</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
