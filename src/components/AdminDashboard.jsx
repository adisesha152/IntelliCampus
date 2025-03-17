
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import ProfileCard from './ProfileCard';
import { Users, BookOpen, CreditCard, Briefcase, TrendingUp, AlertCircle, Calendar, ChevronRight } from 'lucide-react';
import Button from './Button';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Demo stats for admin dashboard
  const stats = [
    { label: 'Total Students', value: '2,845', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Courses', value: '142', icon: BookOpen, color: 'bg-green-50 text-green-600' },
    { label: 'Faculty Members', value: '126', icon: Briefcase, color: 'bg-purple-50 text-purple-600' },
    { label: 'Revenue (Monthly)', value: '$152,250', icon: CreditCard, color: 'bg-yellow-50 text-yellow-600' },
  ];
  
  // Demo alerts
  const alerts = [
    { message: 'System maintenance scheduled for this weekend', type: 'info', date: '3h ago' },
    { message: 'New faculty onboarding needs approval', type: 'action', date: '1d ago' },
    { message: 'Student fee collection rate below target', type: 'warning', date: '2d ago' },
  ];
  
  // Demo calendar events
  const events = [
    { title: 'Board Meeting', time: '10:00 AM', date: 'Today' },
    { title: 'Faculty Senate', time: '2:30 PM', date: 'Tomorrow' },
    { title: 'Budget Review', time: '11:00 AM', date: 'Sep 28' },
  ];
  
  // Demo performance metrics
  const performanceMetrics = [
    { label: 'Student Satisfaction', value: '92%', trend: 'up' },
    { label: 'Graduation Rate', value: '88%', trend: 'up' },
    { label: 'Course Completion', value: '94%', trend: 'up' },
    { label: 'Faculty Retention', value: '96%', trend: 'down' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-all hover:shadow-medium">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="p-6 pb-2">
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                      <TrendingUp 
                        className={`h-4 w-4 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
                      />
                    </div>
                    <p className="text-xl font-bold">{metric.value}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                <p className="text-slate-400">Performance Chart Visualization</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-6 pb-2 flex justify-between items-center">
              <CardTitle>Recent Alerts</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start p-3 bg-slate-50 rounded-lg">
                    <div className={`p-2 rounded-full mr-3 ${
                      alert.type === 'info' ? 'bg-blue-100 text-blue-600' :
                      alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{alert.date}</p>
                    </div>
                    <button className="text-blue-500 hover:text-blue-700">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <ProfileCard user={user} />
          
          <Card>
            <CardHeader className="p-6 pb-2">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-slate-500" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="flex items-center p-3 bg-slate-50 rounded-lg">
                    <div className="mr-3 text-center min-w-12">
                      <p className="text-xs text-slate-500">{event.date}</p>
                      <p className="text-sm font-semibold">{event.time}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">View Full Calendar</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
