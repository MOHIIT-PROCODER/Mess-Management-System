import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, QrCode, MessageSquare, Heart, Trophy, BarChart3, User, Calendar, Cpu, FileText, Settings, Building, ChefHat } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';

export const Sidebar = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const role = user?.role || 'student';

  const studentLinks = [
    { to: '/student', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/student/menu', label: 'Weekly Menu', icon: Calendar },
    { to: '/student/attendance', label: 'Scan & QR', icon: QrCode },
    { to: '/student/feedback', label: 'Meal Feedback', icon: MessageSquare },
    { to: '/student/complaints', label: 'Compliments', icon: Heart },
    { to: '/student/achievements', label: 'Badges & Streaks', icon: Trophy },
    { to: '/student/statistics', label: 'My Analytics', icon: BarChart3 },
    { to: '/student/profile', label: 'Profile', icon: User }
  ];

  const hostelAdminLinks = [
    { to: '/hostel-admin', label: 'Warden Dashboard', icon: LayoutDashboard },
    { to: '/hostel-admin/attendance', label: 'Live QR & Attendance', icon: QrCode },
    { to: '/hostel-admin/timetable', label: 'Weekly Timetable', icon: Calendar },
    { to: '/hostel-admin/feedback', label: 'Student Feedback', icon: MessageSquare },
    { to: '/hostel-admin/compliments', label: 'Chef Compliments', icon: Heart },
    { to: '/hostel-admin/students', label: 'Hostel Residents', icon: User }
  ];

  const messAdminLinks = [
    { to: '/admin', label: 'Live Dashboard', icon: LayoutDashboard },
    { to: '/admin/menu', label: 'Food Menu Manager', icon: Calendar },
    { to: '/admin/attendance', label: 'Attendance Counter', icon: QrCode },
    { to: '/admin/feedback', label: 'Student Ratings', icon: MessageSquare },
    { to: '/admin/complaints', label: 'Chef Compliments', icon: ChefHat },
    { to: '/admin/reports', label: 'Reports Generator', icon: FileText }
  ];

  const superAdminLinks = [
    { to: '/superadmin', label: 'System Overview', icon: LayoutDashboard },
    { to: '/superadmin/hostels', label: 'Hostel Buildings', icon: Building },
    { to: '/superadmin/admins', label: 'Mess Admins', icon: User },
    { to: '/superadmin/feedback', label: 'Student Feedback', icon: MessageSquare },
    { to: '/superadmin/settings', label: 'System Settings', icon: Settings }
  ];

  const links =
    role === 'super_admin'
      ? superAdminLinks
      : role === 'hostel_admin'
      ? hostelAdminLinks
      : role === 'mess_admin'
      ? messAdminLinks
      : studentLinks;

  return (
    <aside className="w-64 p-4 hidden md:flex flex-col justify-between min-h-[calc(100vh-61px)] bg-white dark:bg-slate-900/90 border-r border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="space-y-1">
        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
          {role.replace('_', ' ')} Navigation
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/student' || link.to === '/admin' || link.to === '/superadmin'}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Hostel info banner */}
      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
        <p className="font-bold text-slate-900 dark:text-slate-100">Active Mess Location</p>
        <p className="text-indigo-600 dark:text-indigo-400 font-mono font-semibold mt-0.5">{user?.hostel_name || 'BH-7 (Boys Hostel 7)'}</p>
      </div>
    </aside>
  );
};


