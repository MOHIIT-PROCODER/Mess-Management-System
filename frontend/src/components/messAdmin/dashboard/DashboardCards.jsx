import React from 'react';
import { Users, QrCode, Star, Heart } from 'lucide-react';

export const DashboardCards = ({ analytics }) => {
  const cards = [
    { title: 'Total Registered Students', value: analytics?.totalStudents || 450, icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { title: "Today's Meal Turnout", value: analytics?.todayTurnout || 398, icon: QrCode, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { title: 'Average Mess Rating', value: `${analytics?.avgRating || 4.3} / 5`, icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { title: 'Chef Compliments & Praises', value: analytics?.activeComplaintsCount || 4, icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="p-5 rounded-2xl glass-card flex items-center justify-between border border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">{card.title}</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{card.value}</p>
            </div>
            <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
