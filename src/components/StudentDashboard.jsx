import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import ProfileCard from './ProfileCard';
import { BookOpen, FileText, Calendar, Clock, Bell, TrendingUp, Award, ChevronRight } from 'lucide-react';
import Button from './Button';
import Layout from './Layout';

const StudentDashboard = () => {
  const { user } = useAuth();

  // Demo stats for student dashboard
  const stats = [
    { label: 'Enrolled Courses', value: '5', icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
    { label: 'Assignments Due', value: '3', icon: FileText, color: 'bg-red-50 text-red-600' },
    { label: 'Upcoming Tests', value: '2', icon: Calendar, color: 'bg-purple-50 text-purple-600' },
    { label: 'Attendance', value: '92%', icon: Clock, color: 'bg-green-50 text-green-600' },
  ];
  
  // Demo enrolled courses
  const courses = [
    { code: 'CS101', name: 'Introduction to Computer Science', instructor: 'Dr. Sarah Mitchell', progress: 72, grade: 'A-' },
    { code: 'MATH201', name: 'Calculus II', instructor: 'Prof. Robert Chen', progress: 65, grade: 'B+' },
    { code: 'PHYS105', name: 'Physics for Engineers', instructor: 'Dr. James Wilson', progress: 48, grade: 'B' },
    { code: 'ENG110', name: 'Technical Communication', instructor: 'Prof. Emily Carter', progress: 90, grade: 'A' },
  ];
  
  // Demo upcoming assignments
  const assignments = [
    { title: 'Database Project Proposal', course: 'CS305', deadline: 'Today, 11:59 PM', status: 'urgent' },
    { title: 'Physics Lab Report', course: 'PHYS105', deadline: 'Tomorrow, 5:00 PM', status: 'pending' },
    { title: 'Engineering Ethics Essay', course: 'ENG110', deadline: 'Sep 30', status: 'pending' },
  ];
  
  // Demo schedule
  const schedule = [
    { title: 'CS101 Lecture', time: '9:00 AM - 10:30 AM', location: 'Hall B12', day: 'Today' },
    { title: 'MATH201', time: '11:00 AM - 12:30 PM', location: 'Hall A7', day: 'Today' },
    { title: 'CS305 Lab', time: '2:00 PM - 4:00 PM', location: 'Lab 204', day: 'Today' },
    { title: 'PHYS105', time: '10:00 AM - 11:30 AM', location: 'Hall C3', day: 'Tomorrow' },
  ];
  
  // Demo notifications
  const notifications = [
    { message: 'CS101 class cancelled tomorrow', time: '2 hours ago' },
    { message: 'New assignment posted in MATH201', time: '4 hours ago' },
    { message: 'Grades posted for PHYS105 midterm', time: '1 day ago' },
  ];

  const content = (
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
            <CardHeader className="p-6 pb-2 flex justify-between items-center">
              <div>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Fall Semester 2023</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4 transition-all hover:shadow-soft">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{course.code}: {course.name}</h4>
                        <p className="text-sm text-slate-500">{course.instructor}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          course.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                          course.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                          course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {course.grade}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="rounded-full h-2 bg-blue-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-slate-500">{course.progress}% completed</p>
                      <button className="text-blue-500 hover:text-blue-700 text-sm">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-6 pb-2">
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <div key={index} className="flex items-start p-3 bg-slate-50 rounded-lg">
                    <div className="mr-3 text-center min-w-16">
                      <p className="text-xs text-slate-500">{item.day}</p>
                      <p className="text-sm font-semibold text-slate-800">{item.time.split(' - ')[0]}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">Full Schedule</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <ProfileCard user={user} />
          
          <Card>
            <CardHeader className="p-6 pb-2">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-slate-500" />
                Upcoming Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {assignments.map((assignment, index) => (
                  <div key={index} className="flex items-start p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{assignment.title}</p>
                      <p className="text-xs text-slate-500">{assignment.course} • {assignment.deadline}</p>
                    </div>
                    <div>
                      <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        assignment.status === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {assignment.status === 'urgent' ? 'Urgent' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">All Assignments</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-6 pb-2">
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-slate-500" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-start p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                    </div>
                    <button className="text-blue-500 hover:text-blue-700">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">View All</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return <Layout>{content}</Layout>;
};

export default StudentDashboard;
