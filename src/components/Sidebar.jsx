import React, { useState, useEffect } from 'react';
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
  GraduationCap,
  Clipboard,
  Database,
  Server,
  Building,
  Briefcase,
  PieChart,
  Book,
  ShieldCheck // Add ShieldCheck to the import list
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '@/lib/utils';

// Define menu items by role
const adminMenuItems = [
  { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'User Management', path: '/admin/users' },
  { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
  { icon: Calendar, label: 'Schedule', path: '/admin/schedule' },
  { icon: BarChart, label: 'Reports', path: '/admin/reports' },
  { icon: GraduationCap, label: 'Faculty', path: '/admin/faculty' },
  { icon: CreditCard, label: 'Finance', path: '/admin/finance' },
  { icon: Database, label: 'Academic Data', path: '/admin/academic-data' },
  { icon: Server, label: 'System', path: '/admin/system' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' }
];

const facultyMenuItems = [
  { icon: Home, label: 'Dashboard', path: '/faculty/dashboard' },
  { icon: Users, label: 'Students', path: '/faculty/students' },
  { icon: BookOpen, label: 'Courses', path: '/faculty/courses' },
  { icon: FileText, label: 'Assessments', path: '/faculty/assessments' },
  { icon: Calendar, label: 'Schedule', path: '/faculty/schedule' },
  { icon: PieChart, label: 'Grades', path: '/faculty/grades' },
  { icon: Book, label: 'Resources', path: '/faculty/resources' },
  { icon: Mail, label: 'Messages', path: '/faculty/messages' },
  { icon: Settings, label: 'Settings', path: '/faculty/settings' }
];

const studentMenuItems = [
  { icon: Home, label: 'Dashboard', path: '/student/dashboard' },
  { icon: Clipboard, label: 'Attendance', path: '/student/attendance' },
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
      menuItems = studentMenuItems; // Default to student
  }

  // Get role specific sidebar title and icon
  const getRoleBranding = () => {
    switch(user?.role) {
      case 'admin':
        return { title: 'Admin Portal', icon: <ShieldCheck className="h-7 w-7 text-purple-500" /> };
      case 'faculty':
        return { title: 'Faculty Portal', icon: <GraduationCap className="h-7 w-7 text-green-500" /> };
      default:
        return { title: 'IntelliCampus', icon: <GraduationCap className="h-7 w-7 text-blue-500" /> };
    }
  };

  const branding = getRoleBranding();

  return (
    <div 
      className={cn(
        "h-screen flex flex-col bg-white border-r border-slate-200 transition-all duration-300 shadow-sm",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
        {!collapsed && (
          <h1 className={cn(
            "text-xl font-semibold",
            user?.role === 'admin' ? 'text-purple-600' :
            user?.role === 'faculty' ? 'text-green-600' : 'text-blue-600'
          )}>
            {branding.title}
          </h1>
        )}
        {collapsed && (
          <div className="mx-auto">
            {branding.icon}
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
                  ? user?.role === 'admin' ? "bg-purple-50 text-purple-700" :
                    user?.role === 'faculty' ? "bg-green-50 text-green-700" :
                    "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn("h-5 w-5", 
                location.pathname === item.path 
                  ? user?.role === 'admin' ? "text-purple-600" :
                    user?.role === 'faculty' ? "text-green-600" :
                    "text-blue-600"
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
