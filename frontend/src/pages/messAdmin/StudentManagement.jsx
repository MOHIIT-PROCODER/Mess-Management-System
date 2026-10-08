import React from 'react';

export const StudentManagement = () => {
  const students = [
    { id: '1', name: 'Aarav Patel', roll: '21CS089', room: '204-A', streak: '14 Days' },
    { id: '2', name: 'Rahul Sharma', roll: '21CS045', room: '302-B', streak: '9 Days' },
    { id: '3', name: 'Ananya Verma', roll: '21EC012', room: '108-A', streak: '21 Days' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Registered Student Roster</h2>
      <div className="p-6 rounded-2xl glass-card space-y-3">
        {students.map((s) => (
          <div key={s.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs border border-slate-200 dark:border-slate-700/50">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{s.name} <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">({s.roll})</span></p>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Room {s.room}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold">
              Streak: {s.streak}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
