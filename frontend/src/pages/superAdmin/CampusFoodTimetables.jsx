import React, { useState } from 'react';
import { Calendar, Building, Utensils, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { WeeklyMenu } from '../../components/messAdmin/menu/WeeklyMenu';

const HOSTELS = [
  { id: 'a1b2c3d4-0000-0000-0000-000000000007', name: 'BH-7 (Boys Hostel 7)', caterer: 'Annapurna Hospitality' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000001', name: 'Aryabhata Boys Hostel (BH-1)', caterer: 'Shree Krishna Caterers' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000002', name: 'Varahamihira Boys Hostel (BH-2)', caterer: 'Balaji Food Services' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000003', name: 'Charaka Boys Hostel (BH-3)', caterer: 'Gourmet Campus Foods' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000004', name: 'Sushruta Boys Hostel (BH-4)', caterer: 'Saffron Dining Group' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000005', name: 'Bhaskara Boys Hostel (BH-5)', caterer: 'Heritage Mess Services' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000006', name: 'Brahmagupta Boys Hostel (BH-6)', caterer: 'Om Caterers' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000008', name: 'Gargi Girls Hostel (GH-1)', caterer: 'Green Leaf Hospitality' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000009', name: 'Maitreyi Girls Hostel (GH-2)', caterer: 'Royal Feast Mess' },
  { id: 'a1b2c3d4-0000-0000-0000-000000000010', name: 'Kalpana Chawla Girls Hostel (GH-3)', caterer: 'Premier Dining Corp' },
];

export const CampusFoodTimetables = () => {
  const [selectedHostel, setSelectedHostel] = useState(HOSTELS[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-500" />
            <span>Campus Food Timetables & 7-Day Menus</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Super Admins can audit and inspect the weekly cook plan and nutrition for each hostel's separate mess.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Chief Warden Audit Mode</span>
          </span>
        </div>
      </div>

      {/* Hostel Switcher Pills */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Building className="w-4 h-4 text-indigo-500" />
          <span>Select Hostel Mess to Audit:</span>
        </label>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {HOSTELS.map((h) => {
            const isSelected = selectedHostel.id === h.id;
            return (
              <button
                key={h.id}
                onClick={() => setSelectedHostel(h)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                }`}
              >
                {h.name}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>Active Mess: <strong className="text-slate-900 dark:text-white">{selectedHostel.name}</strong></span>
          <span>Assigned Caterer: <strong className="text-indigo-600 dark:text-indigo-400">{selectedHostel.caterer}</strong></span>
        </div>
      </div>

      {/* 7-Day Menu for the Selected Hostel */}
      <div className="space-y-3">
        <WeeklyMenu />
      </div>
    </div>
  );
};
export default CampusFoodTimetables;
