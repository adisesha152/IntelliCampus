import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Users, BookOpen, School, CreditCard, BarChart } from 'lucide-react';
import Layout from './Layout';

const AdminDashboard = () => {
  // Sample stats for admin dashboard
  const stats = [
    { label: 'Total Students', value: '1,248', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Courses', value: '72', icon: BookOpen, color: 'bg-purple-50 text-purple-600' },
    { label: 'Faculty Members', value: '48', icon: School, color: 'bg-green-50 text-green-600' },
    { label: 'Revenue', value: '$328,500', icon: CreditCard, color: 'bg-amber-50 text-amber-600' },
  ];

  const content = (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* <h1 className="text-2xl font-bold">Admin Dashboard</h1> */}
      
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Recent administrative activities will be displayed here.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-slate-500" />
              Analytics Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Key metrics and analytics will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return <Layout>{content}</Layout>;
};

export default AdminDashboard;
