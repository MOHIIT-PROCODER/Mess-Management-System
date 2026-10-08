import React from 'react';
import { DashboardCards } from '../../components/messAdmin/dashboard/DashboardCards';
import { TodayAttendance } from '../../components/messAdmin/dashboard/TodayAttendance';
import { RatingOverview } from '../../components/messAdmin/dashboard/RatingOverview';
import { RecentComplaints } from '../../components/messAdmin/dashboard/RecentComplaints';
import { useAttendance } from '../../hooks/useAttendance';

export const MessAdminDashboard = () => {
  const { liveData } = useAttendance('a1b2c3d4-0000-0000-0000-000000000001');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Mess Admin Live Operations Desk</h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Monitoring turnout, live dining counter feed & chef compliments</p>
        </div>
      </div>

      <DashboardCards analytics={liveData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TodayAttendance />
          <RatingOverview />
        </div>
        <div>
          <RecentComplaints />
        </div>
      </div>
    </div>
  );
};
