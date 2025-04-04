import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';
import Layout from './Layout';

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

  const content = (
    <div className="p-6 space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="p-6 pb-2">
          <CardTitle>NFC Attendance</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`h-4 w-4 rounded-full ${
              nfcStatus === 'waiting' ? 'bg-yellow-400' :
              nfcStatus === 'success' ? 'bg-green-400' : 'bg-gray-400'
            }`} />
            <span className="capitalize">{nfcStatus}</span>
          </div>
          <Button 
            variant="primary"
            onClick={() => setNfcStatus('scanning')}
          >
            Scan NFC
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Attendance Analytics</h2>
        {attendance.subjects.map((subject) => (
          <Card key={subject.name}>
            <CardContent className="p-6">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">{subject.name}</h3>
                <span className="text-sm">
                  {subject.present}/{subject.total} classes
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="rounded-full h-2 bg-blue-500"
                  style={{ width: `${calculateAttendance(subject.present, subject.total)}%` }}
                ></div>
              </div>
              {isLowAttendance(subject.present, subject.total, subject.required) && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800">Low Attendance Warning</p>
                    <p className="text-sm text-red-700">
                      Your attendance is below {subject.required}%. Required classes to attend: {
                        Math.ceil((subject.required/100 * subject.total) - subject.present)
                      }
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return <Layout>{content}</Layout>;
};

export default AttendanceAnalytics;
