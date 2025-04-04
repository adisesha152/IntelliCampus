import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import { 
  User, 
  Shield, 
  Bell, 
  Moon, 
  Globe, 
  ToggleLeft, 
  ToggleRight, 
  ChevronRight, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  Save,
  Camera,
  LogOut,
  Trash2,
  AlertCircle
} from 'lucide-react';
import Button from './Button';
import Layout from './Layout';
import { useAuth } from '../context/AuthContext';

const StudentSettings = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Form states
  const [profile, setProfile] = useState({
    firstName: user?.name?.split(' ')[0] || 'John',
    lastName: user?.name?.split(' ')[1] || 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1999-05-15',
    address: '123 University Ave, College Town, CA 94321',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 987-6543',
    bio: 'Computer Science student with interests in AI and web development.'
  });
  
  const [preferences, setPreferences] = useState({
    darkMode: false,
    emailNotifications: true,
    smsNotifications: false,
    language: 'English',
    timezone: 'America/Los_Angeles',
    calendar: {
      showWeekends: true,
      defaultView: 'week',
      reminders: true
    },
    accessibility: {
      highContrast: false,
      largeText: false,
      screenReader: false
    }
  });
  
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    lastPasswordChange: '2023-08-15',
    loginHistory: [
      { id: 1, device: 'MacBook Pro', location: 'College Town, CA', ip: '192.168.1.1', date: '2023-10-23T15:30:00' },
      { id: 2, device: 'iPhone 13', location: 'College Town, CA', ip: '192.168.1.2', date: '2023-10-22T20:45:00' },
      { id: 3, device: 'Chrome on Windows', location: 'San Francisco, CA', ip: '203.0.113.1', date: '2023-10-20T10:15:00' }
    ]
  });
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle preferences changes
  const handlePreferenceToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  // Handle nested preferences changes
  const handleNestedPreferenceToggle = (category, key) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }));
  };
  
  // Handle security form changes
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle password form submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Password change validation and API call would go here
    alert('Password changed successfully!');
    setSecurity(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      lastPasswordChange: new Date().toISOString().split('T')[0]
    }));
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-4xl font-bold mb-2">
                      {profile.firstName[0]}{profile.lastName[0]}
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-slate-500 text-sm">Click to upload a new photo</p>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleProfileChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleProfileChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={profile.dateOfBirth}
                        onChange={handleProfileChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Student ID</label>
                      <input
                        type="text"
                        value={user?.studentId || 'S2023001'}
                        disabled
                        className="w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleProfileChange}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact</label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={profile.emergencyContact}
                        onChange={handleProfileChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Phone</label>
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={profile.emergencyPhone}
                        onChange={handleProfileChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleProfileChange}
                      rows="3"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="flex items-center gap-1">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Academic Information</CardTitle>
                <CardDescription>
                  Your current academic status and details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-500">Program</span>
                    <span>Bachelor of Science in Computer Science</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-500">Major</span>
                    <span>Computer Science</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-500">Minor</span>
                    <span>Mathematics</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-500">Academic Year</span>
                    <span>Junior (3rd Year)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-500">Advisor</span>
                    <span>Dr. Sarah Mitchell</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-500">Expected Graduation</span>
                    <span>May 2025</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-sm font-medium text-slate-500">Credits Completed</span>
                    <span>76 / 120</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm font-medium text-slate-500">Cumulative GPA</span>
                    <span className="font-medium text-green-600">3.7 / 4.0</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md flex items-start">
                  <div className="p-1 rounded-full bg-blue-100 mr-2 mt-0.5">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Academic information is managed by the registrar's office.</p>
                    <p>If you need to update any academic details, please contact the registrar.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'preferences':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>General Preferences</CardTitle>
                <CardDescription>
                  Customize your experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-slate-500">Switch to dark theme</p>
                    </div>
                    <button 
                      className="text-blue-600"
                      onClick={() => handlePreferenceToggle('darkMode')}
                    >
                      {preferences.darkMode ? 
                        <ToggleRight className="h-6 w-6" /> : 
                        <ToggleLeft className="h-6 w-6" />
                      }
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-slate-500">Receive email updates</p>
                    </div>
                    <button 
                      className="text-blue-600"
                      onClick={() => handlePreferenceToggle('emailNotifications')}
                    >
                      {preferences.emailNotifications ? 
                        <ToggleRight className="h-6 w-6" /> : 
                        <ToggleLeft className="h-6 w-6" />
                      }
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-slate-500">Receive text message alerts</p>
                    </div>
                    <button 
                      className="text-blue-600"
                      onClick={() => handlePreferenceToggle('smsNotifications')}
                    >
                      {preferences.smsNotifications ? 
                        <ToggleRight className="h-6 w-6" /> : 
                        <ToggleLeft className="h-6 w-6" />
                      }
                    </button>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
                        <select 
                          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={preferences.language}
                          onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                          <option value="Chinese">Chinese</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                        <select 
                          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={preferences.timezone}
                          onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                        >
                          <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                          <option value="America/Denver">Mountain Time (US & Canada)</option>
                          <option value="America/Chicago">Central Time (US & Canada)</option>
                          <option value="America/New_York">Eastern Time (US & Canada)</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Calendar Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Weekends</p>
                      <p className="text-sm text-slate-500">Display weekends in calendar view</p>
                    </div>
                    <button 
                      className="text-blue-600"
                      onClick={() => handleNestedPreferenceToggle('calendar', 'showWeekends')}
                    >
                      {preferences.calendar.showWeekends ? 
                        <ToggleRight className="h-6 w-6" /> : 
                        <ToggleLeft className="h-6 w-6" />
                      }
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Event Reminders</p>
                      <p className="text-sm text-slate-500">Receive notifications for upcoming events</p>
                    </div>
                    <button 
                      className="text-blue-600"
                      onClick={() => handleNestedPreferenceToggle('calendar', 'reminders')}
                    >
                      {preferences.calendar.reminders ? 
                        <ToggleRight className="h-6 w-6" /> : 
                        <ToggleLeft className="h-6 w-6" />
                      }
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Default Calendar View</label>
                    <select 
                      className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={preferences.calendar.defaultView}
                      onChange={(e) => setPreferences(prev => ({ 
                        ...prev, 
                        calendar: { ...prev.calendar, defaultView: e.target.value } 
                      }))}
                    >
                      <option value="day">Day</option>
                      <option value="week">Week</option>
                      <option value="month">Month</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">High Contrast</p>
                      <p className="text-sm text-slate-500">Increase contrast for better visibility</p>
                    </div>
                    <button 
                      className="text-blue-600"
                      onClick={() => handleNestedPreferenceToggle('accessibility', 'highContrast')}
                    >
                      {preferences.accessibility.highContrast ? 
                        <ToggleRight className="h-6 w-6" /> : 
                        <ToggleLeft className="h-6 w-6" />
                      }
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Large Text</p>
                      <p className="text-sm text-slate-500">Increase font size throughout the application</p>
                    </div>
                    <button 
                      className="text-blue-600"
                      onClick={() => handleNestedPreferenceToggle('accessibility', 'largeText')}
                    >
                      {preferences.accessibility.largeText ? 
                        <ToggleRight className="h-6 w-6" /> : 
                        <ToggleLeft className="h-6 w-6" />
                      }
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Screen Reader Support</p>
                      <p className="text-sm text-slate-500">Optimize for screen readers</p>
                    </div>
                    <button 
                      className="text-blue-600"
                      onClick={() => handleNestedPreferenceToggle('accessibility', 'screenReader')}
                    >
                      {preferences.accessibility.screenReader ? 
                        <ToggleRight className="h-6 w-6" /> : 
                        <ToggleLeft className="h-6 w-6" />
                      }
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={security.currentPassword}
                        onChange={handleSecurityChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={security.newPassword}
                        onChange={handleSecurityChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Password must be at least 8 characters with a mix of letters, numbers, and symbols.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={security.confirmPassword}
                        onChange={handleSecurityChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-slate-500">
                      Last changed: {security.lastPasswordChange}
                    </span>
                    <Button type="submit" className="flex items-center gap-1">
                      <Lock className="h-4 w-4" />
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-slate-500">Secure your account with 2FA</p>
                  </div>
                  <button 
                    className="text-blue-600"
                    onClick={() => setSecurity(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))}
                  >
                    {security.twoFactorEnabled ? 
                      <ToggleRight className="h-6 w-6" /> : 
                      <ToggleLeft className="h-6 w-6" />
                    }
                  </button>
                </div>
                
                {security.twoFactorEnabled ? (
                  <div className="bg-green-50 p-3 rounded-md text-sm text-green-800">
                    <p className="font-medium">Two-factor authentication is enabled.</p>
                    <p>Your account is protected with an additional layer of security.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-amber-50 p-3 rounded-md text-sm text-amber-800">
                      <p className="font-medium">Two-factor authentication is not enabled.</p>
                      <p>Protect your account by enabling 2FA.</p>
                    </div>
                    
                    <Button variant="outline" className="flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      Setup Two-Factor Authentication
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Login History</CardTitle>
                <CardDescription>
                  Recent account activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {security.loginHistory.map(login => (
                    <div key={login.id} className="p-3 bg-slate-50 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{login.device}</p>
                          <p className="text-sm text-slate-500">{login.location} • {login.ip}</p>
                        </div>
                        <span className="text-sm text-slate-500">{formatDate(login.date)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'account':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your account details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-md">
                      <p className="text-sm text-slate-500">Email</p>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{user?.email || 'john.doe@example.com'}</p>
                        <Button variant="ghost" size="sm" className="text-blue-600 text-sm">Change</Button>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded-md">
                      <p className="text-sm text-slate-500">Student ID</p>
                      <p className="font-medium">{user?.studentId || 'S2023001'}</p>
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded-md">
                      <p className="text-sm text-slate-500">Account Type</p>
                      <p className="font-medium">Student</p>
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded-md">
                      <p className="text-sm text-slate-500">Joined Date</p>
                      <p className="font-medium">August 15, 2022</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Linked Accounts</CardTitle>
                <CardDescription>
                  Connect your account to other services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div className="flex items-center">
                      <div className="p-2 bg-[#4285F4] text-white rounded-full mr-3">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Google</p>
                        <p className="text-xs text-slate-500">Connect your Google account</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div className="flex items-center">
                      <div className="p-2 bg-[#24292F] text-white rounded-full mr-3">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17 1.7 18 2 18 2c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.8 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">GitHub</p>
                        <p className="text-xs text-slate-500">Connect your GitHub account</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                    <div className="flex items-center">
                      <div className="p-2 bg-[#1DA1F2] text-white rounded-full mr-3">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Twitter</p>
                        <p className="text-xs text-slate-500">Connect your Twitter account</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Export Data</CardTitle>
                <CardDescription>
                  Export your personal data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-slate-500">
                    You can export your data anytime. The export will include your profile information, 
                    academic records, and other personal data.
                  </p>
                  <Button variant="outline">Request Data Export</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-red-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>
                  Actions that can't be undone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between md:items-center p-3 bg-red-50 rounded-md">
                    <div className="mb-3 md:mb-0">
                      <p className="font-medium text-red-700">Log out of all sessions</p>
                      <p className="text-sm text-red-600">
                        This will log you out from all devices except this one.
                      </p>
                    </div>
                    <Button variant="outline" className="text-red-600 border-red-200">
                      Log out all sessions
                    </Button>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between md:items-center p-3 bg-red-50 rounded-md">
                    <div className="mb-3 md:mb-0">
                      <p className="font-medium text-red-700">Deactivate account</p>
                      <p className="text-sm text-red-600">
                        Your account will be temporarily disabled.
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="text-red-600 border-red-200"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      Deactivate Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold mb-3">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </div>
                  <p className="font-medium">{profile.firstName} {profile.lastName}</p>
                  <p className="text-sm text-slate-500">{user?.studentId || 'S2023001'}</p>
                </div>
                
                <nav className="space-y-1">
                  <button 
                    className={`w-full flex items-center justify-between p-3 rounded-md text-left ${
                      activeSection === 'profile' 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                    onClick={() => setActiveSection('profile')}
                  >
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      <span>Profile</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  
                  <button 
                    className={`w-full flex items-center justify-between p-3 rounded-md text-left ${
                      activeSection === 'preferences' 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                    onClick={() => setActiveSection('preferences')}
                  >
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      <span>Preferences</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  
                  <button 
                    className={`w-full flex items-center justify-between p-3 rounded-md text-left ${
                      activeSection === 'security' 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                    onClick={() => setActiveSection('security')}
                  >
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 mr-2" />
                      <span>Security</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  
                  <button 
                    className={`w-full flex items-center justify-between p-3 rounded-md text-left ${
                      activeSection === 'account' 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                    onClick={() => setActiveSection('account')}
                  >
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      <span>Account</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
                
                <div className="pt-6 mt-6 border-t border-slate-200">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 text-red-600"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            {renderSectionContent()}
          </div>
        </div>
        
        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowDeleteModal(false)}></div>
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg z-10 p-6">
              <div className="flex justify-center mb-5">
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <AlertCircle className="h-6 w-6" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-center mb-2">Deactivate Account</h2>
              <p className="text-center text-slate-600 mb-6">
                Are you sure you want to deactivate your account? All of your data will be temporarily inaccessible and your account will be disabled.
              </p>
              <div className="space-y-3">
                <Button 
                  variant="destructive" 
                  className="w-full"
                >
                  Yes, Deactivate My Account
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentSettings;
