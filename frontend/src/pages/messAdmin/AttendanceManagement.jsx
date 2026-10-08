import React, { useState } from 'react';
import { TodayAttendance } from '../../components/messAdmin/dashboard/TodayAttendance';
import { DynamicBarcodePass } from '../../components/common/DynamicBarcodePass';
import { UniversalScanner } from '../../components/common/UniversalScanner';
import { QrCode, Camera, Barcode, Monitor, Users } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AttendanceManagement = () => {
  const { user } = useAuth();
  const [stationMode, setStationMode] = useState('station_qr'); // 'station_qr' | 'scanner'

  return (
    <div className="space-y-6">
      {/* Top Bar with Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Monitor className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Mess Counter Station & Scanner Desk</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            30-second rotating anti-proxy counter display pass and high-speed student barcode scanner
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold shrink-0">
          <button
            onClick={() => setStationMode('station_qr')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all ${
              stationMode === 'station_qr'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>30s Counter Display</span>
          </button>
          <button
            onClick={() => setStationMode('scanner')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all ${
              stationMode === 'scanner'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Staff Scanner</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {stationMode === 'station_qr' ? (
          <DynamicBarcodePass
            role="mess_admin"
            userName={user?.full_name || 'Chief Warden'}
            userCode="COUNTER-01"
            hostelName={user?.hostel_name || 'Aryabhata Boys Hostel'}
            roomNumber="Dining Hall #1"
          />
        ) : (
          <UniversalScanner
            role="mess_admin"
            title="Mess Staff Counter Scanner"
            subtitle="Scan student 30s barcodes or type roll numbers for fast check-in"
          />
        )}
        <TodayAttendance />
      </div>
    </div>
  );
};

export const FeedbackManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Student Meal Ratings & Sentiment Analytics</h2>
      <div className="p-6 rounded-2xl glass-card text-xs text-slate-600 dark:text-slate-300 font-medium">
        Review student dish ratings, comments, and sentiment distribution charts.
      </div>
    </div>
  );
};

