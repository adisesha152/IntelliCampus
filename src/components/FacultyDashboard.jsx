import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import { 
  Users, 
  BookOpen, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  CheckSquare, 
  Layers, 
  PieChart,
  Video,
  Bell
} from 'lucide-react';
import Button from './Button';
import Layout from './Layout';

const FacultyDashboard = () => {
  // Sample data for faculty dashboard
  const stats = [
    { label: 'Active Courses', value: '4', icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Students', value: '120', icon: Users, color: 'bg-purple-50 text-purple-600' },
    { label: 'Pending Assignments', value: '18', icon: FileText, color: 'bg-red-50 text-red-600' },
    { label: 'Office Hours', value: '8 hrs/week', icon: Clock, color: 'bg-green-50 text-green-600' },
  ];
  
  // Sample courses
  const courses = [
    { code: 'CS101', name: 'Introduction to Computer Science', students: 42, nextClass: 'Tomorrow, 10:00 AM' },
    { code: 'CS205', name: 'Data Structures and Algorithms', students: 38, nextClass: 'Today, 2:00 PM' },
    { code: 'CS310', name: 'Database Systems', students: 25, nextClass: 'Wednesday, 11:00 AM' },
    { code: 'CS450', name: 'Machine Learning', students: 15, nextClass: 'Thursday, 3:30 PM' },
  ];
  
  // Sample schedule
  const schedule = [
    { title: 'CS205 Lecture', time: '2:00 PM - 3:30 PM', location: 'Hall A7', day: 'Today' },
    { title: 'Office Hours', time: '4:00 PM - 6:00 PM', location: 'Office 302', day: 'Today' },
    { title: 'CS101 Lecture', time: '10:00 AM - 11:30 AM', location: 'Hall B12', day: 'Tomorrow' },
    { title: 'Department Meeting', time: '1:00 PM - 2:00 PM', location: 'Conference Room', day: 'Tomorrow' },
  ];

  // Sample tasks data
  const tasks = [
    { 
      id: 1, 
      title: 'Grade CS101 Assignment 3',
      dueDate: '2023-09-28',
      priority: 'high',
      course: 'CS101',
      completed: false
    },
    { 
      id: 2, 
      title: 'Prepare CS205 Midterm Exam',
      dueDate: '2023-10-05',
      priority: 'high',
      course: 'CS205',
      completed: false
    },
    { 
      id: 3, 
      title: 'Update CS310 Course Materials',
      dueDate: '2023-09-30',
      priority: 'medium',
      course: 'CS310',
      completed: false
    },
    { 
      id: 4, 
      title: 'Submit CS101 Course Progress Report',
      dueDate: '2023-09-25',
      priority: 'medium',
      course: 'CS101',
      completed: true
    },
    { 
      id: 5, 
      title: 'Review CS450 Project Proposals',
      dueDate: '2023-10-02',
      priority: 'low',
      course: 'CS450',
      completed: false
    }
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return <AlertCircle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate if a task is overdue
  const isOverdue = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateString);
    return dueDate < today;
  };

  const content = (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
        <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            Academic Calendar
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-1" />
            Course Materials
          </Button>
        </div>
      </div> */}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Courses Card */}
          <Card>
            <CardHeader className="p-6 pb-2 flex flex-col items-center text-center">
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Active courses for current semester</CardDescription>
              <div className="mt-3">
                <Button variant="outline" size="sm">Manage Courses</Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4 transition-all hover:shadow-soft">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{course.code}: {course.name}</h4>
                        <p className="text-sm text-slate-500">{course.students} enrolled students</p>
                      </div>
                      <Button variant="link" size="sm">View Course</Button>
                    </div>
                    <p className="text-xs text-slate-500">Next class: {course.nextClass}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* New Teaching Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="p-6 pb-2">
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5 text-slate-500" />
                  Teaching Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Student Attendance</p>
                      <p className="text-sm font-medium">87%</p>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="rounded-full h-2 bg-blue-500" style={{ width: "87%" }}></div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Course Completion</p>
                      <p className="text-sm font-medium">42%</p>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="rounded-full h-2 bg-green-500" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Student Satisfaction</p>
                      <p className="text-sm font-medium">92%</p>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="rounded-full h-2 bg-purple-500" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-6 pb-2">
                <CardTitle className="flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-slate-500" />
                  Resources Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center bg-slate-50 p-3 rounded-lg">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Course Materials</p>
                      <p className="text-xs text-slate-500">42 files uploaded</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-slate-50 p-3 rounded-lg">
                    <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                      <Video className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Lecture Videos</p>
                      <p className="text-xs text-slate-500">12 videos (18 hours)</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-slate-50 p-3 rounded-lg">
                    <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Assessments</p>
                      <p className="text-xs text-slate-500">24 quizzes, 8 assignments</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tasks Card */}
          <Card>
            <CardHeader className="p-6 pb-2 flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center">
                  <CheckSquare className="mr-2 h-5 w-5 text-slate-500" />
                  Tasks & To-Dos
                </CardTitle>
                <CardDescription>Your pending and upcoming tasks</CardDescription>
              </div>
              <Button variant="outline" size="sm">Add Task</Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {tasks
                  .filter(task => !task.completed)
                  .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                  .slice(0, 5)
                  .map((task) => (
                    <div 
                      key={task.id} 
                      className={`p-3 rounded-lg flex items-start justify-between ${
                        isOverdue(task.dueDate) && !task.completed ? 'bg-red-50' : 'bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`p-1.5 rounded-full mr-3 ${getPriorityColor(task.priority)}`}>
                          {getPriorityIcon(task.priority)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                          <div className="flex flex-wrap items-center mt-1">
                            <span className="text-xs text-slate-500 mr-2">
                              Due: {formatDate(task.dueDate)}
                            </span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 mb-1">
                              {task.course}
                            </span>
                            {isOverdue(task.dueDate) && !task.completed && (
                              <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-700 mb-1">
                                Overdue
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button className="p-1 rounded-full hover:bg-slate-200">
                          <CheckSquare className="h-5 w-5 text-slate-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                
                {tasks.filter(task => !task.completed).length === 0 && (
                  <div className="p-6 text-center text-slate-500">
                    <CheckSquare className="h-12 w-12 mx-auto mb-2 text-slate-300" />
                    <p>No pending tasks</p>
                  </div>
                )}
              </div>
              
              {tasks.filter(task => !task.completed).length > 0 && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-slate-500">
                    {tasks.filter(task => !task.completed).length} pending tasks
                  </span>
                  <Button variant="link" size="sm">View All Tasks</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - 1/3 width on large screens */}
        <div className="space-y-6">
          {/* Faculty Profile Card - NEW */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold mb-3">
                  SM
                </div>
                <h3 className="font-semibold text-lg">Dr. Sarah Mitchell</h3>
                <p className="text-sm text-slate-500 mb-3">Professor, Computer Science</p>
                <div className="flex space-x-1 mb-3">
                  <span className="bg-blue-100 text-blue-700 text-xs rounded-full px-2 py-1">PhD</span>
                  <span className="bg-green-100 text-green-700 text-xs rounded-full px-2 py-1">Full-time</span>
                </div>
                <div className="w-full text-sm text-slate-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Faculty ID:</span>
                    <span className="font-medium">F2023001</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-medium">sarah.mitchell@example.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Office:</span>
                    <span className="font-medium">Room 302, CS Building</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Schedule Card */}
          <Card>
            <CardHeader className="p-6 pb-2">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-slate-500" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {schedule.filter(item => item.day === 'Today').map((item, index) => (
                  <div key={index} className="flex items-start p-3 bg-slate-50 rounded-lg">
                    <div className="mr-3 text-center min-w-16">
                      <p className="text-sm font-semibold text-slate-800">{item.time.split(' - ')[0]}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.location}</p>
                    </div>
                  </div>
                ))}
                
                {schedule.filter(item => item.day === 'Today').length === 0 && (
                  <div className="p-6 text-center text-slate-500">
                    <Calendar className="h-12 w-12 mx-auto mb-2 text-slate-300" />
                    <p>No events scheduled for today</p>
                  </div>
                )}
              </div>
              <Button variant="outline" className="w-full mt-4">View Full Schedule</Button>
            </CardContent>
          </Card>
          
          {/* Completed Tasks Card */}
          <Card>
            <CardHeader className="p-6 pb-2">
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Completed Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {tasks
                  .filter(task => task.completed)
                  .slice(0, 3)
                  .map((task) => (
                    <div key={task.id} className="p-3 bg-slate-50 rounded-lg flex items-center">
                      <div className="p-1 rounded-full mr-3 bg-green-100 text-green-700">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm line-through text-slate-500">{task.title}</p>
                        <span className="text-xs text-slate-400">
                          {task.course} • Completed
                        </span>
                      </div>
                    </div>
                  ))}
                
                {tasks.filter(task => task.completed).length === 0 && (
                  <p className="text-sm text-center text-slate-500 py-3">No completed tasks yet</p>
                )}
              </div>
              {tasks.filter(task => task.completed).length > 0 && (
                <Button variant="link" size="sm" className="w-full mt-2">View All Completed Tasks</Button>
              )}
            </CardContent>
          </Card>
          
          {/* Notifications Card - NEW */}
          <Card>
            <CardHeader className="p-6 pb-2">
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-slate-500" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm">New student added to CS101</p>
                  <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm">Department meeting rescheduled</p>
                  <p className="text-xs text-slate-500 mt-1">Yesterday</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm">Grade submission deadline extended</p>
                  <p className="text-xs text-slate-500 mt-1">2 days ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-2">View All Notifications</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return <Layout>{content}</Layout>;
};

export default FacultyDashboard;
