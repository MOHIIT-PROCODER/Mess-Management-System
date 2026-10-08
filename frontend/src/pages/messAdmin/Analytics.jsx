import React from 'react';
import { AttendanceChart } from '../../components/student/analytics/AttendanceChart';
import { MealStatistics } from '../../components/student/analytics/MealStatistics';

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Mess Operations Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AttendanceChart />
        <MealStatistics />
      </div>
    </div>
  );
};

