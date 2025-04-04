import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Filter, 
  Search, 
  ChevronDown, 
  Upload, 
  ExternalLink,
  FileUp
} from 'lucide-react';
import Button from './Button';
import Layout from './Layout';

const StudentAssignments = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Sample assignments data
  const assignments = [
    {
      id: 1,
      title: 'Python Basics Assignment',
      course: { code: 'CS101', name: 'Introduction to Computer Science' },
      description: 'Implement basic Python functions for string manipulation and data structures.',
      dueDate: '2023-09-28',
      submissionDate: null,
      status: 'in-progress',
      type: 'individual',
      points: 100,
      earnedPoints: null,
      attachments: [
        { id: 1, name: 'Assignment_Details.pdf', type: 'pdf', size: '420 KB' }
      ]
    },
    {
      id: 2,
      title: 'Integration Techniques Problem Set',
      course: { code: 'MATH201', name: 'Calculus II' },
      description: 'Solve the given integration problems using techniques covered in class.',
      dueDate: '2023-09-30',
      submissionDate: null,
      status: 'not-started',
      type: 'individual',
      points: 50,
      earnedPoints: null,
      attachments: [
        { id: 1, name: 'Integration_Problems.pdf', type: 'pdf', size: '320 KB' },
        { id: 2, name: 'Formula_Sheet.pdf', type: 'pdf', size: '150 KB' }
      ]
    },
    {
      id: 3,
      title: 'Lab Report: Projectile Motion',
      course: { code: 'PHYS105', name: 'Physics for Engineers' },
      description: 'Document the results of the projectile motion lab experiment.',
      dueDate: '2023-10-05',
      submissionDate: null,
      status: 'not-started',
      type: 'group',
      points: 100,
      earnedPoints: null,
      attachments: [
        { id: 1, name: 'Lab_Report_Template.docx', type: 'docx', size: '280 KB' },
        { id: 2, name: 'Data_Analysis_Guidelines.pdf', type: 'pdf', size: '210 KB' }
      ]
    },
    {
      id: 4,
      title: 'Technical Report Draft',
      course: { code: 'ENG110', name: 'Technical Communication' },
      description: 'Prepare a draft of your technical report following the provided guidelines.',
      dueDate: '2023-09-26',
      submissionDate: '2023-09-25',
      status: 'submitted',
      type: 'individual',
      points: 50,
      earnedPoints: 45,
      attachments: [
        { id: 1, name: 'Technical_Report_Guidelines.pdf', type: 'pdf', size: '380 KB' }
      ]
    },
    {
      id: 5,
      title: 'Database Schema Design',
      course: { code: 'CS305', name: 'Database Systems' },
      description: 'Design a database schema for the given case study.',
      dueDate: '2023-10-10',
      submissionDate: null,
      status: 'not-started',
      type: 'individual',
      points: 100,
      earnedPoints: null,
      attachments: [
        { id: 1, name: 'Case_Study.pdf', type: 'pdf', size: '420 KB' },
        { id: 2, name: 'Schema_Design_Requirements.pdf', type: 'pdf', size: '180 KB' }
      ]
    },
    {
      id: 6,
      title: 'Resume and Cover Letter Assignment',
      course: { code: 'ENG110', name: 'Technical Communication' },
      description: 'Prepare a professional resume and cover letter for a job application.',
      dueDate: '2023-09-15',
      submissionDate: '2023-09-14',
      status: 'graded',
      type: 'individual',
      points: 50,
      earnedPoints: 48,
      feedback: 'Excellent job! Your resume is well-structured and your cover letter addresses the key requirements effectively.',
      attachments: [
        { id: 1, name: 'Resume_Guidelines.pdf', type: 'pdf', size: '250 KB' },
        { id: 2, name: 'Cover_Letter_Template.docx', type: 'docx', size: '180 KB' }
      ]
    }
  ];

  // Filter and sort assignments
  const getFilteredAssignments = () => {
    let filtered = [...assignments];
    
    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(assignment => assignment.status === filter);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        assignment => 
          assignment.title.toLowerCase().includes(query) || 
          assignment.course.code.toLowerCase().includes(query) ||
          assignment.course.name.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'course':
          return a.course.code.localeCompare(b.course.code);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    return filtered;
  };
  
  const filteredAssignments = getFilteredAssignments();
  
  // Helper functions
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const getStatusInfo = (status, dueDate) => {
    const daysRemaining = getDaysRemaining(dueDate);
    
    switch (status) {
      case 'not-started':
        return {
          icon: <Clock className="h-4 w-4" />,
          color: daysRemaining < 3 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700',
          label: daysRemaining < 3 ? 'Due Soon' : 'Not Started'
        };
      case 'in-progress':
        return {
          icon: <Clock className="h-4 w-4" />,
          color: daysRemaining < 3 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700',
          label: daysRemaining < 3 ? 'Due Soon' : 'In Progress'
        };
      case 'submitted':
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: 'bg-green-100 text-green-700',
          label: 'Submitted'
        };
      case 'graded':
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: 'bg-green-100 text-green-700',
          label: 'Graded'
        };
      case 'late':
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          color: 'bg-red-100 text-red-700',
          label: 'Late'
        };
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          color: 'bg-slate-100 text-slate-700',
          label: 'Unknown'
        };
    }
  };
  
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'docx':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'xlsx':
        return <FileText className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };

  // Calculate overall progress
  const completedAssignments = assignments.filter(a => ['submitted', 'graded'].includes(a.status)).length;
  const totalAssignments = assignments.length;
  const progressPercentage = Math.round((completedAssignments / totalAssignments) * 100);

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">Assignments</h1>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex items-center flex-1">
              <Search className="absolute left-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search assignments..."
                className="pl-9 pr-4 py-2 w-full rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                  <ChevronDown className="h-3 w-3" />
                </Button>
                
                {showFilterMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-slate-200">
                    <button
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${filter === 'all' ? 'bg-blue-50 text-blue-600' : ''}`}
                      onClick={() => { setFilter('all'); setShowFilterMenu(false); }}
                    >
                      All Assignments
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${filter === 'not-started' ? 'bg-blue-50 text-blue-600' : ''}`}
                      onClick={() => { setFilter('not-started'); setShowFilterMenu(false); }}
                    >
                      Not Started
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${filter === 'in-progress' ? 'bg-blue-50 text-blue-600' : ''}`}
                      onClick={() => { setFilter('in-progress'); setShowFilterMenu(false); }}
                    >
                      In Progress
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${filter === 'submitted' ? 'bg-blue-50 text-blue-600' : ''}`}
                      onClick={() => { setFilter('submitted'); setShowFilterMenu(false); }}
                    >
                      Submitted
                    </button>
                    <button
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${filter === 'graded' ? 'bg-blue-50 text-blue-600' : ''}`}
                      onClick={() => { setFilter('graded'); setShowFilterMenu(false); }}
                    >
                      Graded
                    </button>
                  </div>
                )}
              </div>
              
              <select
                className="px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="dueDate">Sort by Due Date</option>
                <option value="course">Sort by Course</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-3">
            <CardHeader className="p-6 pb-2">
              <CardTitle>
                {filter === 'all' ? 'All Assignments' : 
                 filter === 'not-started' ? 'Not Started Assignments' :
                 filter === 'in-progress' ? 'In Progress Assignments' :
                 filter === 'submitted' ? 'Submitted Assignments' :
                 filter === 'graded' ? 'Graded Assignments' : 'Assignments'}
              </CardTitle>
              <CardDescription>
                {filteredAssignments.length} {filteredAssignments.length === 1 ? 'assignment' : 'assignments'} found
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {filteredAssignments.length > 0 ? (
                <div className="space-y-4">
                  {filteredAssignments.map((assignment) => {
                    const statusInfo = getStatusInfo(assignment.status, assignment.dueDate);
                    const daysRemaining = getDaysRemaining(assignment.dueDate);
                    
                    return (
                      <div 
                        key={assignment.id} 
                        className="border rounded-lg overflow-hidden transition-all hover:shadow-md"
                      >
                        <div className="p-4 bg-white">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-base">{assignment.title}</h3>
                              <p className="text-sm text-slate-500">
                                {assignment.course.code}: {assignment.course.name}
                              </p>
                            </div>
                            <div>
                              <span 
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                              >
                                {statusInfo.icon}
                                <span className="ml-1">{statusInfo.label}</span>
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-slate-600 mb-3">{assignment.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-slate-400 mr-1" />
                              <span>Due: {formatDate(assignment.dueDate)}</span>
                              {daysRemaining > 0 && assignment.status !== 'submitted' && assignment.status !== 'graded' && (
                                <span className="ml-1 text-xs text-slate-500">
                                  ({daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left)
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-slate-400 mr-1" />
                              <span>{assignment.type === 'individual' ? 'Individual' : 'Group'}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <span className="font-medium">
                                {assignment.earnedPoints !== null 
                                  ? `${assignment.earnedPoints}/${assignment.points} points` 
                                  : `${assignment.points} points total`}
                              </span>
                            </div>
                          </div>
                          
                          {assignment.feedback && (
                            <div className="mt-3 p-3 bg-green-50 text-green-800 rounded-md text-sm">
                              <p className="font-medium mb-1">Feedback:</p>
                              <p>{assignment.feedback}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-slate-50 px-4 py-3 flex flex-wrap justify-between items-center">
                          <div className="flex items-center flex-wrap gap-2">
                            {assignment.attachments.map((file) => (
                              <div key={file.id} className="flex items-center bg-white px-2 py-1 rounded border text-xs">
                                {getFileIcon(file.type)}
                                <span className="ml-1">{file.name}</span>
                                <span className="ml-1 text-slate-400">({file.size})</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-2 mt-2 sm:mt-0">
                            {['not-started', 'in-progress'].includes(assignment.status) && (
                              <Button size="sm" className="flex items-center gap-1">
                                <Upload className="h-4 w-4" />
                                Submit
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <ExternalLink className="h-4 w-4" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-slate-300 mb-2" />
                  <h3 className="text-xl font-medium text-slate-600 mb-1">No assignments found</h3>
                  <p className="text-slate-500">
                    {searchQuery
                      ? "Try adjusting your search or filters"
                      : "You don't have any assignments in this category"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-center mb-2">
                  <p className="text-3xl font-bold">{progressPercentage}%</p>
                  <p className="text-sm text-slate-500">Completed</p>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{completedAssignments} completed</span>
                  <span>{totalAssignments - completedAssignments} remaining</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {assignments
                    .filter(a => !['submitted', 'graded'].includes(a.status))
                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                    .slice(0, 3)
                    .map(assignment => {
                      const daysRemaining = getDaysRemaining(assignment.dueDate);
                      return (
                        <div key={assignment.id} className="p-3 bg-slate-50 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{assignment.title}</p>
                              <p className="text-xs text-slate-500">{assignment.course.code}</p>
                            </div>
                            <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              daysRemaining < 3 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {daysRemaining <= 0 
                                ? 'Today' 
                                : daysRemaining === 1 
                                  ? 'Tomorrow' 
                                  : `${daysRemaining} days`}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  
                  {assignments.filter(a => !['submitted', 'graded'].includes(a.status)).length === 0 && (
                    <p className="text-center text-slate-500 text-sm py-3">
                      No upcoming deadlines
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Recent Grades</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {assignments
                    .filter(a => a.status === 'graded')
                    .slice(0, 3)
                    .map(assignment => (
                      <div key={assignment.id} className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{assignment.title}</p>
                            <p className="text-xs text-slate-500">{assignment.course.code}</p>
                          </div>
                          <div className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                            {assignment.earnedPoints}/{assignment.points}
                          </div>
                        </div>
                      </div>
                    ))}
                  
                  {assignments.filter(a => a.status === 'graded').length === 0 && (
                    <p className="text-center text-slate-500 text-sm py-3">
                      No grades yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <Button className="w-full flex items-center justify-center gap-2">
                  <FileUp className="h-4 w-4" />
                  Upload New Submission
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentAssignments;
