import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Utensils, Bell, LogOut, Sun, Moon, Menu, X,
  LayoutDashboard, QrCode, MessageSquare, Heart, Trophy,
  BarChart3, User, Calendar, FileText, Building, ChefHat, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const role = user?.role || 'student';

  // Automatically close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
    { to: '/hostel-admin', label: 'Hostel Dashboard', icon: LayoutDashboard },
    { to: '/hostel-admin/attendance', label: 'Live QR & Attendance', icon: QrCode },
    { to: '/hostel-admin/timetable', label: 'Live & Weekly Timetable', icon: Calendar },
    { to: '/hostel-admin/feedback', label: 'Student Feedback', icon: MessageSquare },
    { to: '/hostel-admin/compliments', label: 'Chef Compliments', icon: Heart },
    { to: '/hostel-admin/students', label: 'Hostel Residents', icon: User },
    { to: '/hostel-admin/profile', label: 'Hostel Profile', icon: Building }
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
    { to: '/superadmin/attendance', label: 'Campus Attendance Graphs', icon: BarChart3 },
    { to: '/superadmin/menus', label: '7-Day Food Menus', icon: Calendar },
    { to: '/superadmin/hostels', label: 'Hostels & Admin Accounts', icon: Building },
    { to: '/superadmin/feedback', label: 'Student Feedback', icon: MessageSquare },
    { to: '/superadmin/profile', label: 'Admin Profile', icon: User }
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
    <>
      <nav
        className="sticky top-0 z-40 border-b px-3 sm:px-6 py-2.5 transition-colors duration-300"
        style={{
          backgroundColor: isDark ? 'rgba(15,23,41,0.92)' : 'rgba(255,255,255,0.92)',
          borderColor: 'var(--border)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Mobile Hamburger Button & Brand Logo */}
          <div className="flex items-center space-x-2">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl md:hidden text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-rose-500" />
              ) : (
                <Menu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              )}
            </button>

            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-2.5 shrink-0 group">
              <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <span className="font-bold text-base sm:text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  Mess<span className="text-indigo-500">Sphere</span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>
                  Campus Dining System
                </span>
              </div>
            </Link>
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Bell Notification */}
            <button
              className="p-1.5 sm:p-2 rounded-xl transition-colors relative hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full" />
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 group"
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-amber-400 transition-colors rotate-0 group-hover:rotate-12 duration-300" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-indigo-600 transition-colors group-hover:-rotate-12 duration-300" />
              )}
            </button>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-3 border-l border-slate-200 dark:border-slate-800 transition-colors">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs sm:text-sm">
                {user?.full_name?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold leading-tight text-slate-900 dark:text-white">
                  {user?.full_name || 'Guest User'}
                </p>
                <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold capitalize">
                  {user?.role?.replace('_', ' ') || 'Student'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                title="Sign Out"
                className="p-1.5 rounded-lg transition-colors text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Navigation Slide-Over Drawer ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-72 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl p-4 flex flex-col justify-between min-h-screen border-r border-slate-200 dark:border-slate-800 z-10 animate-fade-in overflow-y-auto">
            <div className="space-y-4">
              {/* Drawer Header with Close Button */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                      Mess<span className="text-indigo-500">Sphere</span>
                    </span>
                    <p className="text-[9px] uppercase font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                      {role.replace('_', ' ')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {role.replace('_', ' ')} Navigation
                </div>
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      end={link.to === '/student' || link.to === '/admin' || link.to === '/superadmin'}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-150 ${
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
            </div>

            {/* Drawer Footer */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-6">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                <p className="font-bold text-slate-900 dark:text-slate-100 text-[11px]">Active Mess Location</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs mt-0.5">
                  {user?.hostel_name || 'BH-7 (Boys Hostel 7)'}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 text-xs font-bold flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;


