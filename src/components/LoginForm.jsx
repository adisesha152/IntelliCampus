
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import { LogIn } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LoginForm = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
    role: 'student' // Default role
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!userCredentials.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userCredentials.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!userCredentials.password) {
      newErrors.password = 'Password is required';
    } else if (userCredentials.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Demo credentials for different roles
      const demoUsers = {
        student: {
          id: 'S12345',
          name: 'Alex Johnson',
          email: 'student@example.com',
          role: 'student',
          department: 'Computer Science',
          avatar: null
        },
        faculty: {
          id: 'F54321',
          name: 'Dr. Sarah Mitchell',
          email: 'faculty@example.com',
          role: 'faculty',
          department: 'Computer Science',
          avatar: null
        },
        admin: {
          id: 'A98765',
          name: 'Michael Thompson',
          email: 'admin@example.com',
          role: 'admin',
          department: 'Administration',
          avatar: null
        }
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Check credentials (in a real app, this would be an API call)
      if (
        (userCredentials.role === 'student' && userCredentials.email === 'student@example.com' && userCredentials.password === '1234') ||
        (userCredentials.role === 'faculty' && userCredentials.email === 'faculty@example.com' && userCredentials.password === 'password') ||
        (userCredentials.role === 'admin' && userCredentials.email === 'admin@example.com' && userCredentials.password === 'password')
      ) {
        const user = demoUsers[userCredentials.role];
        await login(user);
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        
        // Redirect based on role
        switch (userCredentials.role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'faculty':
            navigate('/faculty/dashboard');
            break;
          case 'student':
            navigate('/student/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setErrors({
          ...errors,
          form: 'Invalid credentials. Please try again.'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        ...errors,
        form: 'An error occurred while logging in. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 rounded-xl w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-slate-500">Log in to continue to IntelliCampus</p>
      </div>
      
      {errors.form && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="role">
            Login as
          </label>
          <select
            id="role"
            name="role"
            value={userCredentials.role}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={userCredentials.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className={`flex h-10 w-full rounded-md border ${
              errors.email ? 'border-red-500' : 'border-input'
            } bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
          <p className="text-xs text-slate-500 mt-1">
            Demo: {userCredentials.role === 'student' ? 'student' : userCredentials.role === 'faculty' ? 'faculty' : 'admin'}@example.com
          </p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <a href="#" className="text-xs text-blue-600 hover:text-blue-800">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={userCredentials.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={`flex h-10 w-full rounded-md border ${
              errors.password ? 'border-red-500' : 'border-input'
            } bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
          <p className="text-xs text-slate-500 mt-1">
            Demo: password
          </p>
        </div>
        
        <Button
          type="submit"
          className="w-full h-11 mt-6 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Log in
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
