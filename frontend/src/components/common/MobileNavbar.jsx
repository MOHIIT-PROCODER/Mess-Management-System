import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Utensils, QrCode, MessageSquare, Trophy, User } from 'lucide-react';

export const MobileNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-lg px-6 py-2 md:hidden flex justify-between items-center bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {[
        { to: '/student', label: 'Home', icon: LayoutDashboard, end: true },
        { to: '/student/menu', label: 'Menu', icon: Utensils, end: false },
        { to: '/student/attendance', label: 'Scan', icon: QrCode },
        { to: '/student/feedback', label: 'Feedback', icon: MessageSquare },
        { to: '/student/achievements', label: 'Badges', icon: Trophy },
        { to: '/student/profile', label: 'Profile', icon: User },
      ].map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center py-1 font-semibold transition-colors ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{label}</span>
        </NavLink>
      ))}
    </div>
  );
};


