import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const AttendanceAnalytics = () => {
  const [nfcStatus, setNfcStatus] = useState('waiting');
  const [attendance, setAttendance] = useState({
    subjects: [
      { name: 'Mathematics', present: 32, total: 40, required: 75 },
      { name: 'Physics', present: 28, total: 35, required: 75 },
      { name: 'Computer Science', present: 25, total: 38, required: 75 },
    ]
  });

  const calculateAttendance = (present, total) => {
    return ((present / total) * 100).toFixed(1);
  };

  const isLowAttendance = (present, total, required) => {
    return (present / total) * 100 < required;
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">NFC Attendance</h2>
        <div className="flex items-center space-x-4 mb-4">
          <div className={`h-4 w-4 rounded-full ${
            nfcStatus === 'waiting' ? 'bg-yellow-400' :
            nfcStatus === 'success' ? 'bg-green-400' : 'bg-gray-400'
          }`} />
          <span className="capitalize">{nfcStatus}</span>
        </div>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => setNfcStatus('scanning')}
        >
          Scan NFC
        </button>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Attendance Analytics</h2>
        {attendance.subjects.map((subject) => (
          <Card key={subject.name} className="p-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">{subject.name}</h3>
              <span className="text-sm">
                {subject.present}/{subject.total} classes
              </span>
            </div>
            <Progress 
              value={calculateAttendance(subject.present, subject.total)} 
              className="h-2"
            />
            {isLowAttendance(subject.present, subject.total, subject.required) && (
              <Alert variant="destructive" className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Low Attendance Warning</AlertTitle>
                <AlertDescription>
                  Your attendance is below {subject.required}%. Required classes to attend: {
                    Math.ceil((subject.required/100 * subject.total) - subject.present)
                  }
                </AlertDescription>
              </Alert>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AttendanceAnalytics;
