import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import { 
  Mail, 
  Send, 
  Plus, 
  Search, 
  User, 
  UserPlus, 
  MoreVertical, 
  ChevronLeft, 
  Paperclip, 
  Inbox, 
  Star, 
  Archive, 
  Trash2, 
  Clock, 
  CheckCheck,
  Settings,
  AtSign,
  Filter
} from 'lucide-react';
import Button from './Button';
import Layout from './Layout';

const StudentMessages = () => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    message: ''
  });

  // Sample data
  const folders = [
    { id: 'inbox', name: 'Inbox', icon: Inbox, count: 5 },
    { id: 'starred', name: 'Starred', icon: Star, count: 2 },
    { id: 'sent', name: 'Sent', icon: Send, count: 0 },
    { id: 'archive', name: 'Archive', icon: Archive, count: 0 },
    { id: 'trash', name: 'Trash', icon: Trash2, count: 0 },
  ];

  // Sample conversations
  const conversations = [
    {
      id: 1,
      with: {
        name: 'Dr. Sarah Mitchell',
        role: 'Professor - CS101',
        avatar: null,
      },
      subject: 'Regarding your project submission',
      messages: [
        {
          id: 1,
          sender: 'Dr. Sarah Mitchell',
          content: 'Hello John, I wanted to discuss your recent project submission. There are a few aspects that you could improve before the final deadline.',
          timestamp: '2023-10-20T14:30:00',
          isRead: true,
        },
        {
          id: 2,
          sender: 'John Doe',
          content: 'Thank you for the feedback, Dr. Mitchell. I would appreciate specific guidance on which areas need improvement.',
          timestamp: '2023-10-20T14:45:00',
          isRead: true,
        },
        {
          id: 3,
          sender: 'Dr. Sarah Mitchell',
          content: 'Certainly. The main areas for improvement are:\n\n1. The database schema could be normalized further\n2. Add more comments to explain the complex parts of your code\n3. Include a proper README file with installation and usage instructions\n\nLet me know if you have questions about any of these points.',
          timestamp: '2023-10-20T15:10:00',
          isRead: true,
        }
      ],
      unreadCount: 0,
      isStarred: true,
      lastActivity: '2023-10-20T15:10:00',
      folder: 'inbox',
    },
    {
      id: 2,
      with: {
        name: 'Prof. Robert Chen',
        role: 'Professor - MATH201',
        avatar: null,
      },
      subject: 'Office hours appointment',
      messages: [
        {
          id: 1,
          sender: 'John Doe',
          content: 'Hello Professor Chen, I would like to schedule an appointment during your office hours to discuss some questions I have about the upcoming calculus exam.',
          timestamp: '2023-10-19T09:15:00',
          isRead: true,
        },
        {
          id: 2,
          sender: 'Prof. Robert Chen',
          content: 'Hi John, I would be happy to meet with you. My office hours are on Tuesdays and Thursdays from 2-4 PM. Would either of those times work for you this week?',
          timestamp: '2023-10-19T09:45:00',
          isRead: true,
        },
        {
          id: 3,
          sender: 'John Doe',
          content: 'Thursday at 3 PM would work perfectly for me. Thank you!',
          timestamp: '2023-10-19T10:00:00',
          isRead: true,
        },
        {
          id: 4,
          sender: 'Prof. Robert Chen',
          content: 'Great, I\'ll see you on Thursday at 3 PM in my office (Room A270). Please bring your specific questions so we can make the most of our time.',
          timestamp: '2023-10-19T10:15:00',
          isRead: false,
        }
      ],
      unreadCount: 1,
      isStarred: false,
      lastActivity: '2023-10-19T10:15:00',
      folder: 'inbox',
    },
    {
      id: 3,
      with: {
        name: 'Dr. James Wilson',
        role: 'Professor - PHYS105',
        avatar: null,
      },
      subject: 'Lab report feedback',
      messages: [
        {
          id: 1,
          sender: 'Dr. James Wilson',
          content: 'John, I\'ve reviewed your lab report on the projectile motion experiment. Your calculations and analysis were excellent, but your conclusions need to be more thorough. Please revise the conclusion section before the final submission deadline.',
          timestamp: '2023-10-18T13:30:00',
          isRead: false,
        }
      ],
      unreadCount: 1,
      isStarred: false,
      lastActivity: '2023-10-18T13:30:00',
      folder: 'inbox',
    },
    {
      id: 4,
      with: {
        name: 'Prof. Emily Carter',
        role: 'Professor - ENG110',
        avatar: null,
      },
      subject: 'Resume draft review',
      messages: [
        {
          id: 1,
          sender: 'John Doe',
          content: 'Dear Professor Carter, I have attached my draft resume for your review as part of our Technical Communication course assignment. I would greatly appreciate your feedback.',
          timestamp: '2023-10-17T15:00:00',
          isRead: true,
          attachments: [
            { name: 'Resume_Draft_JohnDoe.pdf', size: '420 KB' }
          ]
        },
        {
          id: 2,
          sender: 'Prof. Emily Carter',
          content: 'John, I\'ve reviewed your resume draft and I\'m impressed with your organization and clarity. I\'ve made some suggestions using track changes and added comments where I think you can enhance the impact of your experience descriptions. Overall, this is a strong start!',
          timestamp: '2023-10-18T09:30:00',
          isRead: false,
          attachments: [
            { name: 'Resume_Draft_JohnDoe_Feedback.pdf', size: '450 KB' }
          ]
        }
      ],
      unreadCount: 1,
      isStarred: true,
      lastActivity: '2023-10-18T09:30:00',
      folder: 'inbox',
    },
    {
      id: 5,
      with: {
        name: 'Academic Advisor',
        role: 'Student Services',
        avatar: null,
      },
      subject: 'Course registration for next semester',
      messages: [
        {
          id: 1,
          sender: 'John Doe',
          content: 'Hello, I would like to schedule an advising appointment to discuss my course options for the upcoming semester. I\'m particularly interested in exploring electives that would complement my major.',
          timestamp: '2023-10-16T11:00:00',
          isRead: true,
        },
        {
          id: 2,
          sender: 'Academic Advisor',
          content: 'Hi John, I\'d be happy to meet with you. You can book an appointment through our online scheduling system at [scheduler.university.edu](http://scheduler.university.edu). I have availability next week on Monday and Wednesday afternoons. Please come prepared with questions and your degree audit.',
          timestamp: '2023-10-16T13:25:00',
          isRead: false,
        }
      ],
      unreadCount: 1,
      isStarred: false,
      lastActivity: '2023-10-16T13:25:00',
      folder: 'inbox',
    },
    {
      id: 6,
      with: {
        name: 'IT Support',
        role: 'Technical Services',
        avatar: null,
      },
      subject: 'Password reset confirmation',
      messages: [
        {
          id: 1,
          sender: 'IT Support',
          content: 'This is an automated message to confirm that your password has been successfully reset. If you did not request this change, please contact IT Support immediately at helpdesk@university.edu or call (555) 123-4567.',
          timestamp: '2023-10-15T10:15:00',
          isRead: true,
        }
      ],
      unreadCount: 0,
      isStarred: false,
      lastActivity: '2023-10-15T10:15:00',
      folder: 'inbox',
    }
  ];

  // Filter conversations based on selected folder and search query
  const filteredConversations = conversations
    .filter(conv => conv.folder === selectedFolder)
    .filter(conv => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        conv.with.name.toLowerCase().includes(query) ||
        conv.subject.toLowerCase().includes(query) ||
        conv.messages.some(msg => msg.content.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));

  // Find the currently selected conversation
  const activeConversation = conversations.find(conv => conv.id === selectedConversation);

  // Format timestamp
  const formatTimestamp = (timestamp, short = false) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (short) {
      if (diffInDays === 0) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (diffInDays < 7) {
        return date.toLocaleDateString([], { weekday: 'short' });
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    } else {
      if (diffInDays === 0) {
        return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      } else if (diffInDays === 1) {
        return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      } else {
        return date.toLocaleString([], { 
          weekday: 'short',
          month: 'short', 
          day: 'numeric',
          hour: '2-digit', 
          minute: '2-digit'
        });
      }
    }
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    // In a real app, this would send the message to the backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  // Handle composing a new message
  const handleComposeSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the new message to the backend
    console.log('New message:', composeData);
    setShowComposeModal(false);
    setComposeData({ to: '', subject: '', message: '' });
  };

  // Back to conversation list on mobile
  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  // Mark a conversation as read
  const markAsRead = (conversationId) => {
    // In a real app, this would update the backend
    console.log('Mark as read:', conversationId);
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="bg-white rounded-lg shadow overflow-hidden h-[calc(100vh-65px)] flex flex-col">
          {/* Header with search and actions */}
          <div className="border-b p-4 flex justify-between items-center flex-shrink-0">
            <h1 className="text-xl font-bold">Messages</h1>
            <div className="flex space-x-2">
              <div className="relative max-w-md w-80 hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="pl-9 pr-4 py-2 w-full rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => setShowComposeModal(true)}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                <span>New Message</span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            {/* Folders and conversation list - hidden on mobile when conversation is selected */}
            <div className={`flex border-r ${selectedConversation ? 'hidden md:flex' : 'flex'}`} style={{ width: '360px' }}>
              {/* Folders */}
              <div className="w-48 pt-4 border-r bg-slate-50 overflow-y-auto">
                <ul className="space-y-1 px-2">
                  {folders.map(folder => (
                    <li key={folder.id}>
                      <button
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm ${
                          selectedFolder === folder.id 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                        onClick={() => setSelectedFolder(folder.id)}
                      >
                        <div className="flex items-center">
                          <folder.icon className="h-4 w-4 mr-2" />
                          <span>{folder.name}</span>
                        </div>
                        {folder.count > 0 && (
                          <div className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {folder.count}
                          </div>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="px-2 pt-4 pb-2 border-t mt-4">
                  <h3 className="px-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Labels</h3>
                  <ul className="mt-2 space-y-1">
                    <li>
                      <button className="w-full flex items-center px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100">
                        <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                        <span>Important</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100">
                        <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                        <span>Personal</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        <span>Courses</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100">
                        <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                        <span>Administration</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Conversation list */}
              <div className="flex-1 overflow-y-auto border-r">
                <div className="md:hidden p-3 border-b">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      className="pl-9 pr-4 py-2 w-full rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="divide-y">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map(conversation => (
                      <button
                        key={conversation.id}
                        className={`w-full text-left p-3 hover:bg-slate-50 transition-colors ${
                          conversation.id === selectedConversation ? 'bg-blue-50' : ''
                        } ${conversation.unreadCount > 0 ? 'font-medium' : ''}`}
                        onClick={() => {
                          setSelectedConversation(conversation.id);
                          if (conversation.unreadCount > 0) {
                            markAsRead(conversation.id);
                          }
                        }}
                      >
                        <div className="flex justify-between mb-1">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                              {conversation.with.name.charAt(0)}
                            </div>
                            <span className={conversation.unreadCount > 0 ? 'font-medium' : ''}>
                              {conversation.with.name}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">
                            {formatTimestamp(conversation.lastActivity, true)}
                          </span>
                        </div>
                        <p className="text-sm font-medium truncate">{conversation.subject}</p>
                        <p className="text-xs text-slate-500 truncate">
                          {conversation.messages[conversation.messages.length - 1].content}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-slate-400">
                            {conversation.with.role}
                          </span>
                          {conversation.unreadCount > 0 && (
                            <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="py-8 text-center">
                      <Mail className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                      <p className="text-slate-500">No messages found</p>
                      <p className="text-sm text-slate-400">
                        {searchQuery ? 'Try adjusting your search' : ''}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Conversation detail */}
            <div className={`flex-1 flex flex-col ${selectedConversation ? 'flex' : 'hidden md:flex'}`}>
              {selectedConversation && activeConversation ? (
                <>
                  {/* Conversation header */}
                  <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
                    <div className="flex items-center">
                      <button 
                        className="md:hidden p-1 mr-2 rounded-full hover:bg-slate-100"
                        onClick={handleBackToList}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                          {activeConversation.with.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{activeConversation.with.name}</div>
                          <div className="text-xs text-slate-500">{activeConversation.with.role}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100">
                        <Star className="h-5 w-5" fill={activeConversation.isStarred ? "currentColor" : "none"} />
                      </button>
                      <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100">
                        <Archive className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100">
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Message thread */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div className="border-b pb-2">
                      <h2 className="text-xl font-medium">{activeConversation.subject}</h2>
                    </div>
                    
                    {activeConversation.messages.map(message => (
                      <div key={message.id} className="flex">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 flex items-center justify-center mr-3 mt-2">
                          {message.sender.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{message.sender}</span>
                            <span className="text-xs text-slate-500">{formatTimestamp(message.timestamp)}</span>
                          </div>
                          <div className="text-slate-700 whitespace-pre-line">{message.content}</div>
                          
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {message.attachments.map((attachment, idx) => (
                                <div key={idx} className="flex items-center bg-slate-50 rounded-md p-2 border">
                                  <FileText className="h-4 w-4 text-blue-500 mr-2" />
                                  <span className="text-sm">{attachment.name}</span>
                                  <span className="text-xs text-slate-500 ml-2">({attachment.size})</span>
                                  <button className="ml-auto text-blue-600 text-sm">Download</button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message input */}
                  <div className="border-t p-4 flex-shrink-0">
                    <div className="bg-slate-50 rounded-lg p-3 border">
                      <textarea
                        className="w-full bg-transparent resize-none border-0 focus:outline-none focus:ring-0 placeholder-slate-400 text-slate-700"
                        placeholder="Type your message..."
                        rows="3"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      ></textarea>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex space-x-2">
                          <button className="p-1 rounded-full text-slate-500 hover:bg-slate-200">
                            <Paperclip className="h-5 w-5" />
                          </button>
                        </div>
                        <Button 
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="flex items-center gap-1"
                        >
                          <Send className="h-4 w-4" />
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                  <Mail className="h-16 w-16 text-slate-300 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-700 mb-2">Your Messages</h2>
                  <p className="text-slate-500 mb-4 max-w-md">
                    Select a conversation to view messages or start a new conversation.
                  </p>
                  <Button 
                    onClick={() => setShowComposeModal(true)}
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    New Message
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Compose Modal */}
        {showComposeModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowComposeModal(false)}></div>
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg z-10 overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-medium">New Message</h2>
                <button 
                  className="p-1 rounded-full hover:bg-slate-100"
                  onClick={() => setShowComposeModal(false)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleComposeSubmit}>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="flex items-center border-b pb-2">
                      <span className="w-20 text-sm text-slate-500">To:</span>
                      <input
                        type="text"
                        className="flex-1 border-0 focus:outline-none focus:ring-0"
                        placeholder="Enter recipient name or email"
                        value={composeData.to}
                        onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                        required
                      />
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center border-b pb-2">
                      <span className="w-20 text-sm text-slate-500">Subject:</span>
                      <input
                        type="text"
                        className="flex-1 border-0 focus:outline-none focus:ring-0"
                        placeholder="Enter message subject"
                        value={composeData.subject}
                        onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                        required
                      />
                    </label>
                  </div>
                  
                  <div>
                    <textarea
                      className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px]"
                      placeholder="Type your message..."
                      value={composeData.message}
                      onChange={(e) => setComposeData({...composeData, message: e.target.value})}
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="p-4 border-t flex justify-between">
                  <div className="flex space-x-2">
                    <button type="button" className="p-2 rounded-full text-slate-500 hover:bg-slate-100">
                      <Paperclip className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" type="button" onClick={() => setShowComposeModal(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="flex items-center gap-1">
                      <Send className="h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentMessages;
