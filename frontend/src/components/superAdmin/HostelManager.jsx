import React, { useState } from 'react';
import { Building, Plus, Users } from 'lucide-react';
import { hostelService } from '../../services/hostelService';

export const HostelManager = () => {
  const [hostels, setHostels] = useState([
    { id: '7', name: 'BH-7 (Boys Hostel 7)', code: 'BH-7', capacity: 550, mess_capacity: 220 },
    { id: '1', name: 'Aryabhata Boys Hostel', code: 'ABH-1', capacity: 450, mess_capacity: 180 },
    { id: '2', name: 'Gargi Girls Hostel', code: 'GGH-1', capacity: 400, mess_capacity: 160 },
    { id: '3', name: 'Tagore International Hostel', code: 'TIH-1', capacity: 250, mess_capacity: 100 }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Building className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Campus Hostel Blocks</span>
        </h2>
        <button className="gradient-btn px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Hostel</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hostels.map((h) => (
          <div key={h.id} className="p-5 rounded-2xl glass-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-base">{h.name}</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                {h.code}
              </span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 font-medium">
              <p>Total Capacity: <span className="text-slate-900 dark:text-white font-bold">{h.capacity} Students</span></p>
              <p>Dining Seating: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{h.mess_capacity} Seats</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

