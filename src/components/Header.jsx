
import React, { useState } from 'react';
import { Bell, Search, Settings, ChevronDown, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-slate-200 bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gradient">IntelliCampus</h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative hidden sm:flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 h-10 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>

        <button className="relative p-2 rounded-full hover:bg-slate-100 transition">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="p-2 rounded-full hover:bg-slate-100 transition">
          <Settings className="h-5 w-5 text-slate-600" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 p-1 rounded-md hover:bg-slate-100 transition focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
              {user?.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.role}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-medium bg-white p-1 border border-slate-200 animate-fade-in z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <button
                className="flex w-full items-center px-3 py-2 text-sm hover:bg-slate-50 rounded-md mt-1"
                onClick={() => {
                  setShowDropdown(false);
                  // Handle profile navigation
                }}
              >
                <User className="h-4 w-4 mr-2 text-slate-500" />
                My Profile
              </button>
              <button
                className="flex w-full items-center px-3 py-2 text-sm hover:bg-slate-50 rounded-md text-red-500"
                onClick={() => {
                  setShowDropdown(false);
                  logout();
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
