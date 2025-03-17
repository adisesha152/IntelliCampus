
import React from 'react';
import { Card, CardContent, CardHeader } from './Card';
import { cn } from '@/lib/utils';

const ProfileCard = ({ user, className }) => {
  // Generate initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-0">
        <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-400"></div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center -mt-12 mb-4">
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-soft"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-white bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold shadow-soft">
                {getInitials(user.name)}
              </div>
            )}
            <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
              user.isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`}></span>
          </div>
          <div className="ml-4 mt-12">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-slate-500">{user.role}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-slate-500">Department</p>
            <p className="font-medium">{user.department}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-slate-500">ID</p>
            <p className="font-medium">{user.id}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-md col-span-2">
            <p className="text-slate-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
