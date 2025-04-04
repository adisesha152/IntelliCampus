import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import { BookOpen, FileText, Video, Users, Calendar, ChevronDown, ChevronUp, ExternalLink, Download, Check, Clock } from 'lucide-react';
import Button from './Button';
import Layout from './Layout';

const StudentCourses = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedCourse, setExpandedCourse] = useState(null);
  
  // Sample courses data
  const courses = [
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Computer Science',
      instructor: 'Dr. Sarah Mitchell',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      progress: 72,
      grade: 'A-',
      credits: 3,
      semester: 'Fall 2023',
      schedule: 'Mon, Wed, Fri 10:00 AM - 11:30 AM',
      location: 'Hall B12',
      description: 'This course provides a broad introduction to computer science and programming. Topics include algorithm design, programming languages, and basic data structures.',
      materials: [
        { id: 1, type: 'document', title: 'Course Syllabus', date: '2023-09-01' },
        { id: 2, type: 'document', title: 'Introduction to Algorithms', date: '2023-09-05' },
        { id: 3, type: 'video', title: 'Programming Basics - Lecture 1', duration: '45 min', date: '2023-09-05' },
        { id: 4, type: 'document', title: 'Programming in Python', date: '2023-09-08' },
        { id: 5, type: 'video', title: 'Data Types and Variables - Lecture 2', duration: '50 min', date: '2023-09-12' },
      ],
      assignments: [
        { id: 1, title: 'Python Basics Assignment', deadline: '2023-09-15', status: 'completed', score: '92/100' },
        { id: 2, title: 'Algorithm Design Project', deadline: '2023-09-30', status: 'in-progress' },
        { id: 3, title: 'Data Structures Quiz', deadline: '2023-10-05', status: 'upcoming' },
      ]
    },
    {
      id: 2,
      code: 'MATH201',
      name: 'Calculus II',
      instructor: 'Prof. Robert Chen',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
      progress: 65,
      grade: 'B+',
      credits: 4,
      semester: 'Fall 2023',
      schedule: 'Tue, Thu 1:00 PM - 2:30 PM',
      location: 'Hall A7',
      description: 'A continuation of Calculus I, covering integration techniques, applications of integration, differential equations, and infinite sequences and series.',
      materials: [
        { id: 1, type: 'document', title: 'Course Syllabus', date: '2023-09-01' },
        { id: 2, type: 'document', title: 'Integration Techniques', date: '2023-09-06' },
        { id: 3, type: 'video', title: 'Applications of Integration - Lecture 1', duration: '55 min', date: '2023-09-08' },
      ],
      assignments: [
        { id: 1, title: 'Integration Homework 1', deadline: '2023-09-14', status: 'completed', score: '85/100' },
        { id: 2, title: 'Integration Homework 2', deadline: '2023-09-21', status: 'completed', score: '90/100' },
        { id: 3, title: 'Differential Equations Quiz', deadline: '2023-09-28', status: 'in-progress' },
      ]
    },
    {
      id: 3,
      code: 'PHYS105',
      name: 'Physics for Engineers',
      instructor: 'Dr. James Wilson',
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa',
      progress: 48,
      grade: 'B',
      credits: 4,
      semester: 'Fall 2023',
      schedule: 'Mon, Wed 2:00 PM - 3:30 PM, Fri 3:00 PM - 5:00 PM (Lab)',
      location: 'Hall C3, Lab 204 (Fridays)',
      description: 'This course covers mechanics, thermodynamics, and electromagnetism with applications relevant to engineering.',
      materials: [
        { id: 1, type: 'document', title: 'Course Syllabus', date: '2023-09-01' },
        { id: 2, type: 'document', title: 'Mechanics Fundamentals', date: '2023-09-04' },
        { id: 3, type: 'video', title: 'Newton\'s Laws - Lecture 1', duration: '48 min', date: '2023-09-06' },
      ],
      assignments: [
        { id: 1, title: 'Mechanics Problem Set', deadline: '2023-09-15', status: 'completed', score: '78/100' },
        { id: 2, title: 'Lab Report: Projectile Motion', deadline: '2023-09-22', status: 'in-progress' },
        { id: 3, title: 'Midterm Exam', deadline: '2023-10-10', status: 'upcoming' },
      ]
    },
    {
      id: 4,
      code: 'ENG110',
      name: 'Technical Communication',
      instructor: 'Prof. Emily Carter',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8',
      progress: 90,
      grade: 'A',
      credits: 3,
      semester: 'Fall 2023',
      schedule: 'Tue, Thu 10:00 AM - 11:30 AM',
      location: 'Building F, Room 105',
      description: 'This course focuses on developing effective written and oral communication skills for technical and professional contexts.',
      materials: [
        { id: 1, type: 'document', title: 'Course Syllabus', date: '2023-09-01' },
        { id: 2, type: 'document', title: 'Technical Writing Principles', date: '2023-09-05' },
        { id: 3, type: 'video', title: 'Professional Communication - Lecture 1', duration: '42 min', date: '2023-09-07' },
      ],
      assignments: [
        { id: 1, title: 'Resume and Cover Letter', deadline: '2023-09-12', status: 'completed', score: '95/100' },
        { id: 2, title: 'Technical Report Draft', deadline: '2023-09-26', status: 'completed', score: '92/100' },
        { id: 3, title: 'Final Technical Report', deadline: '2023-10-17', status: 'upcoming' },
      ]
    },
    {
      id: 5,
      code: 'CS305',
      name: 'Database Systems',
      instructor: 'Dr. Michael Lee',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d',
      progress: 55,
      grade: 'B+',
      credits: 3,
      semester: 'Fall 2023',
      schedule: 'Wed, Fri 1:00 PM - 2:30 PM',
      location: 'Tech Building, Room 302',
      description: 'Introduction to database design, implementation, and management. Topics include data modeling, relational databases, SQL, and transaction management.',
      materials: [
        { id: 1, type: 'document', title: 'Course Syllabus', date: '2023-09-01' },
        { id: 2, type: 'document', title: 'Introduction to Databases', date: '2023-09-06' },
        { id: 3, type: 'video', title: 'ER Diagrams - Lecture 1', duration: '47 min', date: '2023-09-08' },
      ],
      assignments: [
        { id: 1, title: 'SQL Basics Assignment', deadline: '2023-09-15', status: 'completed', score: '88/100' },
        { id: 2, title: 'Database Project Proposal', deadline: '2023-09-29', status: 'upcoming' },
        { id: 3, title: 'Midterm Exam', deadline: '2023-10-13', status: 'upcoming' },
      ]
    }
  ];

  const filteredCourses = activeTab === 'all' 
    ? courses 
    : courses.filter(course => course.semester === activeTab);

  const toggleCourseExpansion = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'upcoming': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <Check className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'upcoming': return <Calendar className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Courses</h1>
          <div className="flex space-x-2">
            <Button 
              variant={activeTab === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveTab('all')}
              size="sm"
            >
              All Courses
            </Button>
            <Button 
              variant={activeTab === 'Fall 2023' ? 'default' : 'outline'}
              onClick={() => setActiveTab('Fall 2023')}
              size="sm"
            >
              Fall 2023
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="cursor-pointer" onClick={() => toggleCourseExpansion(course.id)}>
                <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{course.code}: {course.name}</h3>
                      <p className="text-sm text-slate-500">{course.instructor} • {course.credits} credits</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex items-center">
                    <div className="mr-4">
                      <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        course.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                        course.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                        course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {course.grade}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 bg-slate-200 rounded-full h-2 mr-2">
                        <div 
                          className="rounded-full h-2 bg-blue-500"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500">{course.progress}%</span>
                    </div>
                    <div className="ml-4">
                      {expandedCourse === course.id ? 
                        <ChevronUp className="h-5 w-5 text-slate-400" /> :
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      }
                    </div>
                  </div>
                </div>
              </div>
              
              {expandedCourse === course.id && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-200">
                  <div className="mb-4">
                    <p className="text-slate-600">{course.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 text-slate-500 mr-2" />
                        <h4 className="font-medium">Schedule</h4>
                      </div>
                      <p className="text-sm text-slate-600">{course.schedule}</p>
                      <p className="text-sm text-slate-600">Location: {course.location}</p>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Users className="h-5 w-5 text-slate-500 mr-2" />
                        <h4 className="font-medium">Class Details</h4>
                      </div>
                      <p className="text-sm text-slate-600">Semester: {course.semester}</p>
                      <p className="text-sm text-slate-600">Credits: {course.credits}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 flex items-center">
                        <FileText className="h-5 w-5 text-slate-500 mr-2" />
                        Course Materials
                      </h4>
                      <div className="space-y-2">
                        {course.materials.map((material) => (
                          <div 
                            key={material.id} 
                            className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <div className="flex items-center">
                              {material.type === 'video' ? 
                                <Video className="h-5 w-5 text-red-500 mr-3" /> :
                                <FileText className="h-5 w-5 text-blue-500 mr-3" />
                              }
                              <div>
                                <p className="font-medium text-sm">{material.title}</p>
                                <p className="text-xs text-slate-500">
                                  {formatDate(material.date)}
                                  {material.duration && ` • ${material.duration}`}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                              {material.type === 'video' ? 
                                <ExternalLink className="h-4 w-4" /> :
                                <Download className="h-4 w-4" />
                              }
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-3 flex items-center">
                        <FileText className="h-5 w-5 text-slate-500 mr-2" />
                        Assignments
                      </h4>
                      <div className="space-y-2">
                        {course.assignments.map((assignment) => (
                          <div 
                            key={assignment.id} 
                            className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <div className="flex items-center">
                              <div className={`p-1.5 rounded-full mr-3 ${getStatusColor(assignment.status)}`}>
                                {getStatusIcon(assignment.status)}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{assignment.title}</p>
                                <p className="text-xs text-slate-500">
                                  Due: {formatDate(assignment.deadline)}
                                  {assignment.score && ` • Score: ${assignment.score}`}
                                </p>
                              </div>
                            </div>
                            <div>
                              <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(assignment.status)}`}>
                                {assignment.status === 'completed' ? 'Completed' : 
                                 assignment.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2">Email Instructor</Button>
                    <Button>Go to Course</Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default StudentCourses;
