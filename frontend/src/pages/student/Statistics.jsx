import React from 'react';
import { MonthlyStats } from '../../components/student/analytics/MonthlyStats';
import { AttendanceChart } from '../../components/student/analytics/AttendanceChart';
import { MealStatistics } from '../../components/student/analytics/MealStatistics';

export const Statistics = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Dining Analytics & Stats</h2>
      <MonthlyStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AttendanceChart />
        <MealStatistics />
      </div>
    </div>
  );
};

