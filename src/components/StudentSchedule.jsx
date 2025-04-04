import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import { Calendar, Clock, MapPin, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';
import Layout from './Layout';

const StudentSchedule = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  
  const [currentWeek, setCurrentWeek] = useState(0); // 0 = current week, 1 = next week, -1 = last week
  const [activeDay, setActiveDay] = useState('Monday');
  const [view, setView] = useState('week'); // 'week' or 'list'

  // Sample schedule data
  const schedule = [
    {
      id: 1,
      courseCode: 'CS101',
      courseName: 'Introduction to Computer Science',
      type: 'Lecture',
      day: 'Monday',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      location: 'Hall B12',
      instructor: 'Dr. Sarah Mitchell',
    },
    {
      id: 2,
      courseCode: 'MATH201',
      courseName: 'Calculus II',
      type: 'Lecture',
      day: 'Monday',
      startTime: '1:00 PM',
      endTime: '2:30 PM',
      location: 'Hall A7',
      instructor: 'Prof. Robert Chen',
    },
    {
      id: 3,
      courseCode: 'PHYS105',
      courseName: 'Physics for Engineers',
      type: 'Lecture',
      day: 'Tuesday',
      startTime: '9:00 AM',
      endTime: '10:30 AM',
      location: 'Hall C3',
      instructor: 'Dr. James Wilson',
    },
    {
      id: 4,
      courseCode: 'ENG110',
      courseName: 'Technical Communication',
      type: 'Lecture',
      day: 'Tuesday',
      startTime: '2:00 PM',
      endTime: '3:30 PM',
      location: 'Building F, Room 105',
      instructor: 'Prof. Emily Carter',
    },
    {
      id: 5,
      courseCode: 'CS101',
      courseName: 'Introduction to Computer Science',
      type: 'Lecture',
      day: 'Wednesday',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      location: 'Hall B12',
      instructor: 'Dr. Sarah Mitchell',
    },
    {
      id: 6,
      courseCode: 'CS305',
      courseName: 'Database Systems',
      type: 'Lecture',
      day: 'Wednesday',
      startTime: '3:00 PM',
      endTime: '4:30 PM',
      location: 'Tech Building, Room 302',
      instructor: 'Dr. Michael Lee',
    },
    {
      id: 7,
      courseCode: 'PHYS105',
      courseName: 'Physics for Engineers',
      type: 'Lab',
      day: 'Thursday',
      startTime: '1:00 PM',
      endTime: '3:00 PM',
      location: 'Lab 204',
      instructor: 'Dr. James Wilson',
    },
    {
      id: 8,
      courseCode: 'CS305',
      courseName: 'Database Systems',
      type: 'Lab',
      day: 'Friday',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      location: 'Computer Lab 3',
      instructor: 'Dr. Michael Lee',
    },
    {
      id: 9,
      courseCode: 'MATH201',
      courseName: 'Calculus II',
      type: 'Lecture',
      day: 'Friday',
      startTime: '1:00 PM',
      endTime: '2:30 PM',
      location: 'Hall A7',
      instructor: 'Prof. Robert Chen',
    },
  ];

  // Helper functions for time conversion and schedule display
  const parseTime = (timeString) => {
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours + minutes / 60;
  };

  const getTimeSlotPosition = (timeString) => {
    const time = parseTime(timeString);
    const startOfDay = parseTime('8:00 AM');
    return ((time - startOfDay) * 60) + 'px'; // 60px per hour
  };

  const getDuration = (startTime, endTime) => {
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    return ((end - start) * 60) + 'px'; // 60px per hour
  };

  const getCourseColor = (courseCode) => {
    const colors = {
      'CS101': 'bg-blue-100 border-blue-300 text-blue-800',
      'MATH201': 'bg-green-100 border-green-300 text-green-800',
      'PHYS105': 'bg-purple-100 border-purple-300 text-purple-800',
      'ENG110': 'bg-yellow-100 border-yellow-300 text-yellow-800',
      'CS305': 'bg-red-100 border-red-300 text-red-800',
    };
    
    return colors[courseCode] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  // Get week range display
  const getWeekRange = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay() || 7; // Convert Sunday (0) to 7
    startOfWeek.setDate(today.getDate() - dayOfWeek + 1 + (currentWeek * 7)); // Monday of the current week
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4); // Friday of the current week
    
    const options = { month: 'short', day: 'numeric' };
    return `${startOfWeek.toLocaleDateString(undefined, options)} - ${endOfWeek.toLocaleDateString(undefined, options)}`;
  };

  const weekSchedule = (
    <div className="overflow-x-auto">
      <div className="min-w-[900px]">
        <div className="grid grid-cols-6 gap-2">
          <div className="sticky left-0 bg-white z-10"></div>
          {days.map(day => (
            <div key={day} className="text-center">
              <button 
                onClick={() => setActiveDay(day)}
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeDay === day 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                {day}
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-4 relative">
          <div className="grid grid-cols-6 gap-2">
            {/* Time column */}
            <div className="sticky left-0 bg-white z-10">
              {timeSlots.map((time, index) => (
                <div key={index} className="h-16 text-xs text-slate-500 flex items-start pr-3 justify-end">
                  {time}
                </div>
              ))}
            </div>
            
            {/* Days columns */}
            {days.map(day => (
              <div key={day} className="col-span-1 relative min-h-[640px] border-l border-slate-200">
                {/* Class blocks */}
                {schedule
                  .filter(item => item.day === day)
                  .map(item => (
                    <div
                      key={item.id}
                      className={`absolute left-1 right-1 p-2 rounded-md border text-xs ${getCourseColor(item.courseCode)}`}
                      style={{
                        top: getTimeSlotPosition(item.startTime),
                        height: getDuration(item.startTime, item.endTime),
                        overflow: 'hidden'
                      }}
                    >
                      <div className="font-semibold truncate">{item.courseCode}</div>
                      <div className="truncate">{item.type}</div>
                      <div className="truncate text-xxs">{item.location}</div>
                    </div>
                  ))
                }
                
                {/* Hour lines */}
                {timeSlots.map((_, index) => (
                  <div 
                    key={index} 
                    className="absolute left-0 right-0 h-px bg-slate-100" 
                    style={{ top: `${index * 64}px` }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const listSchedule = (
    <div className="space-y-6">
      {days.map(day => (
        <Card key={day}>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-slate-500" />
              {day}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {schedule.filter(item => item.day === day).length > 0 ? (
                schedule
                  .filter(item => item.day === day)
                  .sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime))
                  .map(item => (
                    <div 
                      key={item.id} 
                      className={`p-3 rounded-md border ${getCourseColor(item.courseCode)}`}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{item.courseCode}: {item.courseName}</span>
                        <span className="text-sm">{item.type}</span>
                      </div>
                      <div className="flex items-center text-sm space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-slate-500" />
                          <span>{item.startTime} - {item.endTime}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-slate-500" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-center text-slate-500 py-3">No classes scheduled for {day}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Class Schedule</h1>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentWeek(currentWeek - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium px-2">{getWeekRange()}</div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentWeek(currentWeek + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex rounded-md overflow-hidden">
              <Button 
                variant={view === 'week' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setView('week')}
                className="rounded-r-none"
              >
                Week View
              </Button>
              <Button 
                variant={view === 'list' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setView('list')}
                className="rounded-l-none"
              >
                List View
              </Button>
            </div>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            {view === 'week' ? weekSchedule : listSchedule}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg">Upcoming Classes</CardTitle>
              <CardDescription>Your next scheduled classes</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {schedule
                  .slice(0, 3)
                  .map(item => (
                    <div 
                      key={item.id} 
                      className="flex items-start p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="mr-3 text-center min-w-16">
                        <p className="text-xs text-slate-500">{item.day}</p>
                        <p className="text-sm font-semibold text-slate-800">{item.startTime}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.courseCode}: {item.courseName}</p>
                        <p className="text-sm text-slate-500">
                          {item.type} • {item.location}
                        </p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-slate-500" />
                Course Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {Array.from(new Set(schedule.map(item => item.courseCode))).map(courseCode => {
                  const course = schedule.find(item => item.courseCode === courseCode);
                  return (
                    <div 
                      key={courseCode} 
                      className={`px-3 py-2 rounded-md ${getCourseColor(courseCode)}`}
                    >
                      <p className="font-medium">{courseCode}: {course.courseName}</p>
                      <p className="text-xs">{course.instructor}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StudentSchedule;
