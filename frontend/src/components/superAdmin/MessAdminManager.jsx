import React from 'react';
import { UserCheck, Shield } from 'lucide-react';

export const MessAdminManager = () => {
  const admins = [
    { id: '1', name: 'Rajesh Kumar', email: 'rajesh.mess@campus.edu', hostel: 'Aryabhata Boys Hostel' },
    { id: '2', name: 'Sunita Sharma', email: 'sunita.mess@campus.edu', hostel: 'Gargi Girls Hostel' },
    { id: '3', name: 'Alok Verma', email: 'alok.bh7@campus.edu', hostel: 'BH-7 (Boys Hostel 7)' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center space-x-2">
        <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <span>Assigned Mess Managers</span>
      </h3>

      <div className="space-y-2 text-xs">
        {admins.map((a) => (
          <div key={a.id} className="p-4 rounded-xl glass-card flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{a.name}</p>
              <p className="text-slate-600 dark:text-slate-400 font-medium">{a.email}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 font-bold">
              {a.hostel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

