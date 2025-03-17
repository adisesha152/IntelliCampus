
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import ProfileCard from './ProfileCard';
import { Users, BookOpen, FileText, Clock, Calendar, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import Button from './Button';

const FacultyDashboard = () => {
  const { user } = useAuth();

  // Demo stats for faculty dashboard
  const stats = [
    { label: 'My Courses', value: '5', icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Students', value: '142', icon: Users, color: 'bg-green-50 text-green-600' },
    { label: 'Office Hours', value: '8h/week', icon: Clock, color: 'bg-purple-50 text-purple-600' },
    { label: 'Pending Grades', value: '26', icon: FileText, color: 'bg-red-50 text-red-600' },
  ];
  
  // Demo courses
  const courses = [
    { code: 'CS101', name: 'Introduction to Computer Science', students: 32, progress: 65 },
    { code: 'CS201', name: 'Data Structures and Algorithms', students: 28, progress: 48 },
    { code: 'CS305', name: 'Database Systems', students: 24, progress: 75 },
    { code: 'CS401', name: 'Artificial Intelligence', students: 18, progress: 30 },
    { code: 'CS450', name: 'Machine Learning', students: 22, progress: 25 },
  ];
  
  // Demo upcoming tasks
  const tasks = [
    { title: 'Grade Midterm Exams', course: 'CS305', deadline: 'Tomorrow, 11:59 PM', status: 'urgent' },
    { title: 'Update Course Materials', course: 'CS101', deadline: 'Sep 30', status: 'pending' },
    { title: 'Submit Research Progress Report', course: 'Research', deadline: 'Oct 5', status: 'pending' },
  ];
  
  // Demo schedule
  const schedule = [
    { title: 'Lecture: CS101', time: '9:00 AM - 10:30 AM', location: 'Hall B12', day: 'Today' },
    { title: 'Office Hours', time: '11:00 AM - 1:00 PM', location: 'Office 305', day: 'Today' },
    { title: 'Department Meeting', time: '3:00 PM - 4:00 PM', location: 'Meeting Room 2', day: 'Today' },
    { title: 'Lecture: CS401', time: '10:00 AM - 11:30 AM', location: 'Hall A5', day: 'Tomorrow' },
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
            <CardHeader className="p-6 pb-2 flex justify-between items-center">
              <div>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Current academic term</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4 transition-all hover:shadow-soft">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-semibold">{course.code}: {course.name}</h4>
                        <p className="text-sm text-slate-500">{course.students} Students</p>
                      </div>
                      <button className="text-blue-500 hover:text-blue-600">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`rounded-full h-2 ${
                          course.progress < 40 ? 'bg-red-500' : 
                          course.progress < 70 ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{course.progress}% completed</p>
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
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div key={index} className="flex items-start p-3 bg-slate-50 rounded-lg">
                    <div className={`p-2 rounded-full mr-3 ${
                      task.status === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {task.status === 'urgent' ? 
                        <AlertTriangle className="h-4 w-4" /> : 
                        <CheckCircle className="h-4 w-4" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-slate-500">{task.course} • {task.deadline}</p>
                    </div>
                    <button className="text-blue-500 hover:text-blue-700">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">View All Tasks</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
