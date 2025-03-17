
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import { GraduationCap } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Add a smooth fade-in animation to the entire page
    document.body.classList.add('animate-fade-in');
    return () => {
      document.body.classList.remove('animate-fade-in');
    };
  }, []);

  // Redirect to the appropriate dashboard if already authenticated
  if (isAuthenticated) {
    switch(user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'faculty':
        return <Navigate to="/faculty/dashboard" replace />;
      case 'student':
        return <Navigate to="/student/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 flex flex-col">
      <div className="absolute inset-0 z-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <header className="relative z-10 py-6 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <GraduationCap className="h-8 w-8 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-gradient">IntelliCampus</h1>
        </div>
        <div className="space-x-2">
          <a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Help</a>
          <span className="text-slate-300">|</span>
          <a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">About</a>
        </div>
      </header>
      
      <main className="flex-1 relative z-10 flex flex-col md:flex-row items-center justify-center px-6 py-12">
        <div className="w-full max-w-md md:w-1/2 md:pr-12 mb-12 md:mb-0 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-4xl font-bold mb-4">AI-Powered Campus <br />Management System</h2>
          <p className="text-lg text-slate-600 mb-6">
            Streamline your university experience with our intelligent campus management platform. Designed for students, faculty, and administrators.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-soft border border-slate-200/60">
              <h3 className="font-semibold mb-2 text-blue-700">Smart Scheduling</h3>
              <p className="text-sm text-slate-600">AI-optimized class scheduling and resource allocation</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-soft border border-slate-200/60">
              <h3 className="font-semibold mb-2 text-blue-700">Personalized Learning</h3>
              <p className="text-sm text-slate-600">Adaptive content delivery based on student performance</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-soft border border-slate-200/60">
              <h3 className="font-semibold mb-2 text-blue-700">Analytics Dashboard</h3>
              <p className="text-sm text-slate-600">Real-time insights into academic performance</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-soft border border-slate-200/60">
              <h3 className="font-semibold mb-2 text-blue-700">Integrated Services</h3>
              <p className="text-sm text-slate-600">Seamless connection between all campus systems</p>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-md md:w-1/2 animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <LoginForm />
        </div>
      </main>
      
      <footer className="relative z-10 py-6 text-center text-sm text-slate-500">
        <p>© 2023 IntelliCampus. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
