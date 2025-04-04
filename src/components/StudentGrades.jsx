import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import { 
  Award, 
  BookOpen, 
  BarChart, 
  Calendar, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Filter,
  Download,
  ExternalLink,
  ArrowUpDown,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import Button from './Button';
import Layout from './Layout';

const StudentGrades = () => {
  const [activeSemester, setActiveSemester] = useState('Fall 2023');
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [showGradeDetails, setShowGradeDetails] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showInternalMarks, setShowInternalMarks] = useState(false);
  const [useGpaScale, setUseGpaScale] = useState('4'); // '4' for 4.0 scale, '10' for 10.0 scale
  
  // Sample grade data
  const semesters = [
    'Fall 2023',
    'Spring 2023',
    'Fall 2022'
  ];
  
  const courses = {
    'Fall 2023': [
      {
        id: 1,
        code: 'CS101',
        name: 'Introduction to Computer Science',
        credits: 3,
        currentGrade: 'A-',
        gradePoints: 3.7,
        instructor: 'Dr. Sarah Mitchell',
        components: [
          { name: 'Assignments', weight: 30, score: 92 },
          { name: 'Midterm Exam', weight: 30, score: 88 },
          { name: 'Final Exam', weight: 40, score: 0, status: 'pending' },
        ],
        assessments: [
          { id: 1, name: 'Assignment 1', type: 'assignment', score: 95, total: 100, weight: 10, date: '2023-09-10' },
          { id: 2, name: 'Assignment 2', type: 'assignment', score: 88, total: 100, weight: 10, date: '2023-09-25' },
          { id: 3, name: 'Assignment 3', type: 'assignment', score: 92, total: 100, weight: 10, date: '2023-10-05' },
          { id: 4, name: 'Midterm Exam', type: 'exam', score: 88, total: 100, weight: 30, date: '2023-10-15' },
          { id: 5, name: 'Final Exam', type: 'exam', score: null, total: 100, weight: 40, date: '2023-12-10', status: 'pending' },
        ]
      },
      {
        id: 2,
        code: 'MATH201',
        name: 'Calculus II',
        credits: 4,
        currentGrade: 'B+',
        gradePoints: 3.3,
        instructor: 'Prof. Robert Chen',
        components: [
          { name: 'Quizzes', weight: 20, score: 84 },
          { name: 'Assignments', weight: 20, score: 90 },
          { name: 'Midterm Exam', weight: 25, score: 82 },
          { name: 'Final Exam', weight: 35, score: 0, status: 'pending' },
        ],
        assessments: [
          { id: 1, name: 'Quiz 1', type: 'quiz', score: 80, total: 100, weight: 5, date: '2023-09-08' },
          { id: 2, name: 'Quiz 2', type: 'quiz', score: 85, total: 100, weight: 5, date: '2023-09-22' },
          { id: 3, name: 'Quiz 3', type: 'quiz', score: 88, total: 100, weight: 5, date: '2023-10-06' },
          { id: 4, name: 'Quiz 4', type: 'quiz', score: 83, total: 100, weight: 5, date: '2023-10-20' },
          { id: 5, name: 'Homework 1', type: 'assignment', score: 92, total: 100, weight: 5, date: '2023-09-15' },
          { id: 6, name: 'Homework 2', type: 'assignment', score: 88, total: 100, weight: 5, date: '2023-09-29' },
          { id: 7, name: 'Homework 3', type: 'assignment', score: 90, total: 100, weight: 5, date: '2023-10-13' },
          { id: 8, name: 'Homework 4', type: 'assignment', score: 91, total: 100, weight: 5, date: '2023-10-27' },
          { id: 9, name: 'Midterm Exam', type: 'exam', score: 82, total: 100, weight: 25, date: '2023-10-18' },
          { id: 10, name: 'Final Exam', type: 'exam', score: null, total: 100, weight: 35, date: '2023-12-08', status: 'pending' },
        ]
      },
      {
        id: 3,
        code: 'PHYS105',
        name: 'Physics for Engineers',
        credits: 4,
        currentGrade: 'B',
        gradePoints: 3.0,
        instructor: 'Dr. James Wilson',
        components: [
          { name: 'Labs', weight: 25, score: 85 },
          { name: 'Homework', weight: 15, score: 78 },
          { name: 'Midterm Exam', weight: 30, score: 81 },
          { name: 'Final Exam', weight: 30, score: 0, status: 'pending' },
        ],
        assessments: [
          { id: 1, name: 'Lab 1', type: 'lab', score: 88, total: 100, weight: 6.25, date: '2023-09-12' },
          { id: 2, name: 'Lab 2', type: 'lab', score: 85, total: 100, weight: 6.25, date: '2023-09-26' },
          { id: 3, name: 'Lab 3', type: 'lab', score: 82, total: 100, weight: 6.25, date: '2023-10-10' },
          { id: 4, name: 'Lab 4', type: 'lab', score: 86, total: 100, weight: 6.25, date: '2023-10-24' },
          { id: 5, name: 'Homework 1', type: 'assignment', score: 75, total: 100, weight: 5, date: '2023-09-15' },
          { id: 6, name: 'Homework 2', type: 'assignment', score: 80, total: 100, weight: 5, date: '2023-10-01' },
          { id: 7, name: 'Homework 3', type: 'assignment', score: 79, total: 100, weight: 5, date: '2023-10-15' },
          { id: 8, name: 'Midterm Exam', type: 'exam', score: 81, total: 100, weight: 30, date: '2023-10-19' },
          { id: 9, name: 'Final Exam', type: 'exam', score: null, total: 100, weight: 30, date: '2023-12-12', status: 'pending' },
        ]
      },
      {
        id: 4,
        code: 'ENG110',
        name: 'Technical Communication',
        credits: 3,
        currentGrade: 'A',
        gradePoints: 4.0,
        instructor: 'Prof. Emily Carter',
        components: [
          { name: 'Assignments', weight: 40, score: 95 },
          { name: 'Presentations', weight: 20, score: 92 },
          { name: 'Project', weight: 40, score: 94 },
        ],
        assessments: [
          { id: 1, name: 'Assignment 1: Resume', type: 'assignment', score: 95, total: 100, weight: 10, date: '2023-09-12' },
          { id: 2, name: 'Assignment 2: Cover Letter', type: 'assignment', score: 93, total: 100, weight: 10, date: '2023-09-26' },
          { id: 3, name: 'Assignment 3: Technical Report', type: 'assignment', score: 94, total: 100, weight: 10, date: '2023-10-10' },
          { id: 4, name: 'Assignment 4: User Manual', type: 'assignment', score: 98, total: 100, weight: 10, date: '2023-10-24' },
          { id: 5, name: 'Presentation 1', type: 'presentation', score: 92, total: 100, weight: 10, date: '2023-10-05' },
          { id: 6, name: 'Presentation 2', type: 'presentation', score: 92, total: 100, weight: 10, date: '2023-11-02' },
          { id: 7, name: 'Final Project', type: 'project', score: 94, total: 100, weight: 40, date: '2023-11-28' },
        ]
      },
      {
        id: 5,
        code: 'CS305',
        name: 'Database Systems',
        credits: 3,
        currentGrade: 'B+',
        gradePoints: 3.3,
        instructor: 'Dr. Michael Lee',
        components: [
          { name: 'Assignments', weight: 30, score: 88 },
          { name: 'Project', weight: 30, score: 90 },
          { name: 'Midterm Exam', weight: 20, score: 83 },
          { name: 'Final Exam', weight: 20, score: 0, status: 'pending' },
        ],
        assessments: [
          { id: 1, name: 'Assignment 1: SQL Basics', type: 'assignment', score: 90, total: 100, weight: 10, date: '2023-09-14' },
          { id: 2, name: 'Assignment 2: Normalization', type: 'assignment', score: 86, total: 100, weight: 10, date: '2023-09-28' },
          { id: 3, name: 'Assignment 3: Queries', type: 'assignment', score: 88, total: 100, weight: 10, date: '2023-10-12' },
          { id: 4, name: 'Database Project', type: 'project', score: 90, total: 100, weight: 30, date: '2023-11-16' },
          { id: 5, name: 'Midterm Exam', type: 'exam', score: 83, total: 100, weight: 20, date: '2023-10-20' },
          { id: 6, name: 'Final Exam', type: 'exam', score: null, total: 100, weight: 20, date: '2023-12-14', status: 'pending' },
        ]
      }
    ],
    'Spring 2023': [
      {
        id: 6,
        code: 'CS102',
        name: 'Object-Oriented Programming',
        credits: 3,
        currentGrade: 'A',
        gradePoints: 4.0,
        instructor: 'Dr. Mark Thompson',
        components: [
          { name: 'Assignments', weight: 40, score: 94 },
          { name: 'Midterm Exam', weight: 25, score: 92 },
          { name: 'Final Exam', weight: 35, score: 95 },
        ]
      },
      {
        id: 7,
        code: 'MATH202',
        name: 'Calculus III',
        credits: 4,
        currentGrade: 'A-',
        gradePoints: 3.7,
        instructor: 'Dr. Lisa Wang',
        components: [
          { name: 'Assignments', weight: 30, score: 88 },
          { name: 'Midterm Exam', weight: 30, score: 90 },
          { name: 'Final Exam', weight: 40, score: 92 },
        ]
      },
      // More Spring 2023 courses if needed
    ],
    'Fall 2022': [
      {
        id: 8,
        code: 'CS100',
        name: 'Computer Literacy',
        credits: 2,
        currentGrade: 'A',
        gradePoints: 4.0,
        instructor: 'Prof. David Miller',
        components: [
          { name: 'Assignments', weight: 60, score: 95 },
          { name: 'Final Exam', weight: 40, score: 93 },
        ]
      },
      {
        id: 9,
        code: 'MATH101',
        name: 'Calculus I',
        credits: 4,
        currentGrade: 'B+',
        gradePoints: 3.3,
        instructor: 'Dr. Elizabeth Cohen',
        components: [
          { name: 'Assignments', weight: 30, score: 85 },
          { name: 'Midterm Exam', weight: 30, score: 86 },
          { name: 'Final Exam', weight: 40, score: 88 },
        ]
      },
      // More Fall 2022 courses if needed
    ]
  };
  
  // Helper function to toggle course expansion
  const toggleCourseExpansion = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };
  
  // Calculate semester GPA - Modified to support both scales
  const calculateSemesterGPA = (semesterCourses, scale = '4') => {
    if (!semesterCourses || semesterCourses.length === 0) return 0;
    
    const totalCredits = semesterCourses.reduce((sum, course) => sum + course.credits, 0);
    const totalGradePoints = semesterCourses.reduce((sum, course) => {
      // Use appropriate grade points based on scale
      let points = course.gradePoints;
      if (scale === '10') {
        // Convert 4.0 scale to 10.0 scale (multiply by 10/4 = 2.5)
        points = points * 2.5;
      }
      return sum + (points * course.credits);
    }, 0);
    
    return (totalGradePoints / totalCredits).toFixed(2);
  };
  
  // Calculate overall grade based on components
  const calculateOverallGrade = (components) => {
    const completedWeight = components.reduce((sum, component) => {
      return component.status !== 'pending' ? sum + component.weight : sum;
    }, 0);
    
    if (completedWeight === 0) return 0;
    
    const weightedScore = components.reduce((sum, component) => {
      return component.status !== 'pending' ? sum + (component.score * component.weight / 100) : sum;
    }, 0);
    
    const scaledScore = (weightedScore / completedWeight) * 100;
    return Math.round(scaledScore);
  };
  
  // Helper for grade color
  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    if (grade.startsWith('D')) return 'text-orange-600';
    if (grade.startsWith('F')) return 'text-red-600';
    return 'text-slate-600';
  };

  // Helper for score color
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };
  
  // Helper for assessment type icon
  const getAssessmentTypeIcon = (type) => {
    switch (type) {
      case 'quiz':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'exam':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'assignment':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'project':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'lab':
        return <FileText className="h-4 w-4 text-yellow-500" />;
      case 'presentation':
        return <FileText className="h-4 w-4 text-cyan-500" />;
      default:
        return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };
  
  // Helper to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Convert GPA from 4.0 scale to 10.0 scale
  const convertGpaTo10Scale = (gpaOn4Scale) => {
    return (parseFloat(gpaOn4Scale) * 2.5).toFixed(2);
  };

  // Get current semester courses
  const currentSemesterCourses = courses[activeSemester] || [];
  const currentSemesterGPA = calculateSemesterGPA(currentSemesterCourses, useGpaScale);
  
  // Generate grade distribution data
  const gradeDistribution = {
    'A': currentSemesterCourses.filter(c => c.currentGrade.startsWith('A')).length,
    'B': currentSemesterCourses.filter(c => c.currentGrade.startsWith('B')).length,
    'C': currentSemesterCourses.filter(c => c.currentGrade.startsWith('C')).length,
    'D': currentSemesterCourses.filter(c => c.currentGrade.startsWith('D')).length,
    'F': currentSemesterCourses.filter(c => c.currentGrade.startsWith('F')).length,
  };
  
  // Calculate overall GPA across all semesters - Modified to support both scales
  const calculateOverallGPA = (scale = '4') => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    Object.values(courses).forEach(semesterCourses => {
      semesterCourses.forEach(course => {
        totalCredits += course.credits;
        
        // Use appropriate grade points based on scale
        let points = course.gradePoints;
        if (scale === '10') {
          // Convert 4.0 scale to 10.0 scale
          points = points * 2.5;
        }
        
        totalGradePoints += (points * course.credits);
      });
    });
    
    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
  };
  
  const cumulativeGPA = calculateOverallGPA(useGpaScale);

  // Determine GPA trend
  const getGPATrend = () => {
    if (semesters.length < 2) return null;
    
    const currentGPA = parseFloat(calculateSemesterGPA(courses[semesters[0]] || []));
    const previousGPA = parseFloat(calculateSemesterGPA(courses[semesters[1]] || []));
    
    if (currentGPA > previousGPA) {
      return { icon: <TrendingUp className="h-4 w-4 text-green-500" />, text: 'Improving', color: 'text-green-600' };
    } else if (currentGPA < previousGPA) {
      return { icon: <TrendingDown className="h-4 w-4 text-red-500" />, text: 'Declining', color: 'text-red-600' };
    } else {
      return { icon: <ArrowUpDown className="h-4 w-4 text-blue-500" />, text: 'Stable', color: 'text-blue-600' };
    }
  };
  
  const gpaTrend = getGPATrend();

  // Get max GPA value based on scale
  const getMaxGpaValue = () => useGpaScale === '4' ? 4.0 : 10.0;
  
  // Get GPA scale label
  const getGpaScaleLabel = () => useGpaScale === '4' ? '4.0' : '10.0';
  
  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">Academic Performance</h1>
          
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowGradeDetails(!showGradeDetails)}
                className="flex items-center gap-1"
              >
                {showGradeDetails ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                {showGradeDetails ? 'Hide Details' : 'Show Details'}
              </Button>
            </div>
            
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowInternalMarks(!showInternalMarks)}
                className="flex items-center gap-1"
              >
                {showInternalMarks ? 'Hide Internal Marks' : 'Show Internal Marks'}
              </Button>
            </div>
            
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setUseGpaScale(useGpaScale === '4' ? '10' : '4')}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                {`GPA on ${getGpaScaleLabel()} Scale`}
              </Button>
            </div>
            
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center gap-1"
              >
                <Filter className="h-4 w-4 mr-1" />
                {activeSemester}
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
              
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-slate-200">
                  {semesters.map(semester => (
                    <button
                      key={semester}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${
                        activeSemester === semester ? 'bg-blue-50 text-blue-600' : ''
                      }`}
                      onClick={() => {
                        setActiveSemester(semester);
                        setShowFilterMenu(false);
                      }}
                    >
                      {semester}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4 mr-1" />
              Export Transcript
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="mb-2">
                    <Award className="h-12 w-12 text-amber-500 mb-2 mx-auto" />
                    <h2 className="text-3xl font-bold">{currentSemesterGPA}</h2>
                    <p className="text-slate-500 text-sm">{activeSemester} GPA (on {getGpaScaleLabel()} scale)</p>
                  </div>
                  
                  {gpaTrend && (
                    <div className={`flex items-center mt-1 ${gpaTrend.color}`}>
                      {gpaTrend.icon}
                      <span className="text-xs ml-1">{gpaTrend.text}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="md:col-span-1">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="mb-2">
                    <Award className="h-12 w-12 text-blue-500 mb-2 mx-auto" />
                    <h2 className="text-3xl font-bold">{cumulativeGPA}</h2>
                    <p className="text-slate-500 text-sm">Cumulative GPA (on {getGpaScaleLabel()} scale)</p>
                  </div>
                  
                  <div className="text-xs text-slate-500 mt-1">
                    All semesters combined
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-1">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-center">Grade Distribution</h3>
                  <div className="space-y-2">
                    {Object.entries(gradeDistribution).map(([grade, count]) => (
                      <div key={grade} className="flex items-center">
                        <div className={`w-8 text-center font-medium ${
                          grade === 'A' ? 'text-green-600' :
                          grade === 'B' ? 'text-blue-600' :
                          grade === 'C' ? 'text-yellow-600' :
                          grade === 'D' ? 'text-orange-600' :
                          'text-red-600'
                        }`}>
                          {grade}
                        </div>
                        <div className="flex-1 mx-2">
                          <div className="bg-slate-200 h-4 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${
                              grade === 'A' ? 'bg-green-500' :
                              grade === 'B' ? 'bg-blue-500' :
                              grade === 'C' ? 'bg-yellow-500' :
                              grade === 'D' ? 'bg-orange-500' :
                              'bg-red-500'
                            }`} style={{ width: `${count / currentSemesterCourses.length * 100}%` }}></div>
                          </div>
                        </div>
                        <div className="w-6 text-center text-sm">{count}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Course List */}
            <Card>
              <CardHeader className="p-6 pb-2">
                <CardTitle>Course Grades</CardTitle>
                <CardDescription>
                  {activeSemester} • {currentSemesterCourses.length} Courses • {
                    currentSemesterCourses.reduce((sum, course) => sum + course.credits, 0)
                  } Credits
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {currentSemesterCourses.map(course => (
                    <div key={course.id} className="border rounded-lg overflow-hidden">
                      <div 
                        className="p-4 bg-white cursor-pointer hover:bg-slate-50 transition-colors"
                        onClick={() => toggleCourseExpansion(course.id)}
                      >
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                              <BookOpen className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">{course.code}: {course.name}</h3>
                              <p className="text-sm text-slate-500">{course.instructor} • {course.credits} credits</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <p className="text-xs text-slate-500">Current Grade</p>
                              <p className={`font-semibold ${getGradeColor(course.currentGrade)}`}>{course.currentGrade}</p>
                              {useGpaScale === '10' && (
                                <p className="text-xs text-slate-500">{(course.gradePoints * 2.5).toFixed(1)} / 10</p>
                              )}
                            </div>
                            
                            <div className="text-center">
                              <p className="text-xs text-slate-500">Overall</p>
                              <p className={`font-semibold ${getScoreColor(calculateOverallGrade(course.components))}`}>
                                {calculateOverallGrade(course.components)}%
                              </p>
                            </div>
                            
                            <div>
                              {expandedCourse === course.id ? 
                                <ChevronUp className="h-5 w-5 text-slate-400" /> : 
                                <ChevronDown className="h-5 w-5 text-slate-400" />
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {expandedCourse === course.id && (
                        <div className="bg-slate-50 p-4 border-t border-slate-200">
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Grade Breakdown</h4>
                            <div className="space-y-2">
                              {course.components.map((component, index) => (
                                <div key={index} className="bg-white p-3 rounded-md border border-slate-200">
                                  <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center">
                                      <span className="font-medium text-sm">{component.name}</span>
                                      <span className="text-xs text-slate-500 ml-2">{component.weight}% of total</span>
                                    </div>
                                    <div>
                                      {component.status === 'pending' ? (
                                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">Pending</span>
                                      ) : (
                                        <span className={`font-medium ${getScoreColor(component.score)}`}>{component.score}%</span>
                                      )}
                                    </div>
                                  </div>
                                  {component.status !== 'pending' && (
                                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                      <div 
                                        className={`h-full rounded-full ${
                                          component.score >= 90 ? 'bg-green-500' :
                                          component.score >= 80 ? 'bg-blue-500' :
                                          component.score >= 70 ? 'bg-yellow-500' :
                                          component.score >= 60 ? 'bg-orange-500' :
                                          'bg-red-500'
                                        }`}
                                        style={{ width: `${component.score}%` }}
                                      ></div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Internal Marks Section - NEW */}
                          {showInternalMarks && (
                            <div className="mb-4 p-4 border border-slate-200 rounded-lg bg-white">
                              <h4 className="font-medium mb-3">Internal Marks</h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="bg-slate-50 p-3 rounded-md">
                                  <p className="text-xs text-slate-500">Internal Assessment 1</p>
                                  <p className="font-medium">18/20</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-md">
                                  <p className="text-xs text-slate-500">Internal Assessment 2</p>
                                  <p className="font-medium">17/20</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-md">
                                  <p className="text-xs text-slate-500">Class Participation</p>
                                  <p className="font-medium">9/10</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-md">
                                  <p className="text-xs text-slate-500">Assignment Score</p>
                                  <p className="font-medium">18/20</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-md">
                                  <p className="text-xs text-slate-500">Attendance</p>
                                  <p className="font-medium">9/10</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-md">
                                  <p className="text-xs text-slate-500">Total Internal</p>
                                  <p className="font-medium text-blue-600">71/80</p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {showGradeDetails && (
                            <div>
                              <h4 className="font-medium mb-2">Detailed Assessments</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                  <thead>
                                    <tr className="bg-slate-100">
                                      <th className="text-left p-2 border border-slate-200">Assessment</th>
                                      <th className="text-left p-2 border border-slate-200">Type</th>
                                      <th className="text-center p-2 border border-slate-200">Date</th>
                                      <th className="text-center p-2 border border-slate-200">Weight</th>
                                      <th className="text-center p-2 border border-slate-200">Score</th>
                                      <th className="text-center p-2 border border-slate-200">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {course.assessments.map(assessment => (
                                      <tr key={assessment.id} className="bg-white hover:bg-slate-50">
                                        <td className="p-2 border border-slate-200">{assessment.name}</td>
                                        <td className="p-2 border border-slate-200">
                                          <div className="flex items-center">
                                            {getAssessmentTypeIcon(assessment.type)}
                                            <span className="ml-1 capitalize">{assessment.type}</span>
                                          </div>
                                        </td>
                                        <td className="p-2 border border-slate-200 text-center">{formatDate(assessment.date)}</td>
                                        <td className="p-2 border border-slate-200 text-center">{assessment.weight}%</td>
                                        <td className="p-2 border border-slate-200 text-center">
                                          {assessment.score !== null ? (
                                            <span className={getScoreColor(assessment.score)}>
                                              {assessment.score}/{assessment.total}
                                            </span>
                                          ) : (
                                            <span className="text-slate-400">-</span>
                                          )}
                                        </td>
                                        <td className="p-2 border border-slate-200 text-center">
                                          {assessment.status === 'pending' ? (
                                            <span className="inline-flex items-center text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                                              <Clock className="h-3 w-3 mr-1" />
                                              Pending
                                            </span>
                                          ) : assessment.score !== null ? (
                                            <span className="inline-flex items-center text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                              <CheckCircle className="h-3 w-3 mr-1" />
                                              Graded
                                            </span>
                                          ) : (
                                            <span className="inline-flex items-center text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                                              <AlertCircle className="h-3 w-3 mr-1" />
                                              Missing
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <ExternalLink className="h-4 w-4" />
                              View Course Details
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center">
                  <BarChart className="h-5 w-5 text-slate-500 mr-2" />
                  GPA Trend (on {getGpaScaleLabel()} scale)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {semesters.map(semester => {
                    const semesterGPA = calculateSemesterGPA(courses[semester] || [], useGpaScale);
                    const maxGPA = getMaxGpaValue();
                    
                    return (
                      <div key={semester} className="flex items-center">
                        <div className="w-24 text-sm">{semester}</div>
                        <div className="flex-1 mx-2">
                          <div className="bg-slate-200 h-4 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" 
                              style={{ width: `${(parseFloat(semesterGPA) / maxGPA) * 100}%` }}>
                            </div>
                          </div>
                        </div>
                        <div className="w-12 text-right font-medium">{semesterGPA}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">GPA Scales</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between bg-blue-50 p-2 rounded-md">
                    <span className="font-medium">Current Scale:</span>
                    <span className="font-bold">{getGpaScaleLabel()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GPA on 4.0 scale:</span>
                    <span className="font-medium">{useGpaScale === '4' ? currentSemesterGPA : (parseFloat(currentSemesterGPA) / 2.5).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GPA on 10.0 scale:</span>
                    <span className="font-medium">{useGpaScale === '10' ? currentSemesterGPA : convertGpaTo10Scale(currentSemesterGPA)}</span>
                  </div>
                  
                  <div className="mt-2 text-xs text-slate-500">
                    <p>• 4.0 scale is the standard US scale</p>
                    <p>• 10.0 scale is commonly used internationally</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => setUseGpaScale(useGpaScale === '4' ? '10' : '4')}
                  >
                    Switch to {useGpaScale === '4' ? '10.0' : '4.0'} Scale
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Credit Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-slate-50 rounded-md">
                    <span className="text-sm">Current Semester</span>
                    <span className="font-medium">{
                      currentSemesterCourses.reduce((sum, course) => sum + course.credits, 0)
                    } Credits</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-slate-50 rounded-md">
                    <span className="text-sm">Total Completed</span>
                    <span className="font-medium">{
                      Object.values(courses).flat().reduce((sum, course) => sum + course.credits, 0)
                    } Credits</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-slate-50 rounded-md">
                    <span className="text-sm">Graduation Requirement</span>
                    <span className="font-medium">120 Credits</span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Progress toward degree</span>
                      <span>{Math.round(Object.values(courses).flat().reduce((sum, course) => sum + course.credits, 0) / 120 * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-green-500 h-full rounded-full"
                        style={{ width: `${Object.values(courses).flat().reduce((sum, course) => sum + course.credits, 0) / 120 * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Grade Scale</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-600 font-medium">A</span>
                    <span>93-100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600 font-medium">A-</span>
                    <span>90-92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600 font-medium">B+</span>
                    <span>87-89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600 font-medium">B</span>
                    <span>83-86%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600 font-medium">B-</span>
                    <span>80-82%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-600 font-medium">C+</span>
                    <span>77-79%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-600 font-medium">C</span>
                    <span>73-76%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-600 font-medium">C-</span>
                    <span>70-72%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-600 font-medium">D+</span>
                    <span>67-69%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-600 font-medium">D</span>
                    <span>63-66%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-600 font-medium">D-</span>
                    <span>60-62%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600 font-medium">F</span>
                    <span>&lt;60%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col gap-2">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Report Card
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Degree Audit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentGrades;
