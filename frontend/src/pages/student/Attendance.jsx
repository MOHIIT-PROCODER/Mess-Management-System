import React, { useState } from 'react';
import { DynamicBarcodePass } from '../../components/common/DynamicBarcodePass';
import { UniversalScanner } from '../../components/common/UniversalScanner';
import { AttendanceSuccess } from '../../components/student/attendance/AttendanceSuccess';
import { AttendanceHistory } from '../../components/student/attendance/AttendanceHistory';
import { useAuth } from '../../hooks/useAuth';
import { QrCode, Camera, ShieldCheck, Barcode } from 'lucide-react';

export const Attendance = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pass'); // 'pass' | 'scanner'
  const [scannedResult, setScannedResult] = useState(null);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Barcode className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Digital Mess ID & Attendance Station</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
            Auto-refreshing 30-second security barcode & QR pass for dining hall check-in
          </p>
        </div>

        {/* Tab Switcher: 30s Pass vs Scanner */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-xs font-bold shrink-0">
          <button
            onClick={() => { setActiveTab('pass'); setScannedResult(null); }}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'pass'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>My 30s Pass</span>
          </button>
          <button
            onClick={() => { setActiveTab('scanner'); setScannedResult(null); }}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'scanner'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Scan Counter</span>
          </button>
        </div>
      </div>

      {scannedResult ? (
        <div className="space-y-4">
          <AttendanceSuccess data={scannedResult} />
          <div className="text-center">
            <button
              onClick={() => setScannedResult(null)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              ← Back to Attendance Pass
            </button>
          </div>
        </div>
      ) : activeTab === 'pass' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <DynamicBarcodePass
            role="student"
            userName={user?.full_name || 'Aarav Patel'}
            userCode={user?.roll_number || '21CS089'}
            hostelName={user?.hostel_name || 'BH-7 (Boys Hostel 7)'}
            roomNumber={user?.room_number || '204-A'}
          />
          <AttendanceHistory />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <UniversalScanner
            role="student"
            title="Scan Mess Counter Station"
            subtitle="Point your camera at the Counter QR display to check in"
            onScanSuccess={(res) => setScannedResult(res)}
          />
          <AttendanceHistory />
        </div>
      )}
    </div>
  );
};


