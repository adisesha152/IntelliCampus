import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Sample user data for different roles
const sampleUsers = {
  student: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'student',
    avatar: null,
    studentId: 'S2023001'
  },
  faculty: {
    id: '2',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.mitchell@example.com',
    role: 'faculty',
    avatar: null,
    facultyId: 'F2023001',
    department: 'Computer Science'
  },
  admin: {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: null,
    adminId: 'A2023001'
  }
};

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : sampleUsers.student; // Default to student for demo
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true' || true; // Default to true for demo
  });

  // Update localStorage when auth state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('user');
      localStorage.setItem('isAuthenticated', 'false');
    }
  }, [isAuthenticated, user]);

  // Login function with role-based user selection
  const login = (credentials, role = 'student') => {
    // In a real app, you would validate credentials with an API
    // For now, we'll just set the user based on the role
    const userByRole = sampleUsers[role] || sampleUsers.student;
    setUser(userByRole);
    setIsAuthenticated(true);
    return true;
  };

  // Set user role function for testing different roles
  const setUserRole = (role) => {
    if (sampleUsers[role]) {
      const userByRole = sampleUsers[role];
      setUser(userByRole);
      localStorage.setItem('user', JSON.stringify(userByRole));
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.setItem('isAuthenticated', 'false');
  };

  // Auth context value
  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    setUserRole // Add this function for testing
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
