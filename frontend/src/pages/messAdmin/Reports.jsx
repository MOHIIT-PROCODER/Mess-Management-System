import React from 'react';
import { ReportGenerator } from '../../components/messAdmin/reports/ReportGenerator';

export const Reports = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Mess Reports & Exports</h2>
      <ReportGenerator />
    </div>
  );
};

