import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Utensils, Bell, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      className="sticky top-0 z-40 border-b px-3 sm:px-6 py-2.5 transition-colors duration-300"
      style={{
        backgroundColor: isDark ? 'rgba(15,23,41,0.92)' : 'rgba(255,255,255,0.92)',
        borderColor: 'var(--border)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
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

        {/* User Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          


          {/* Bell */}
          <button
            className="p-1.5 sm:p-2 rounded-xl transition-colors relative hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full" />
          </button>

          {/* ── Dark / Light Mode Toggle ── */}
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
  );
};

