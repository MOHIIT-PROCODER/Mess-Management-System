import React, { useState, useEffect } from 'react';
import { QrCode, RefreshCw, ShieldCheck, Monitor, Sparkles } from 'lucide-react';
import { getCurrentOrNextMeal } from '../../../utils/dateUtils';
import { attendanceService } from '../../../services/attendanceService';

export const MessCounterQR = () => {
  const currentMeal = getCurrentOrNextMeal();
  const [meal, setMeal] = useState(currentMeal);
  const [qrData, setQrData] = useState(null);
  const [countdown, setCountdown] = useState(30);

  const refreshCounterQR = async () => {
    const result = await attendanceService.generateQRToken('a1b2c3d4-0000-0000-0000-000000000001', meal);
    setQrData(result);
    setCountdown(30);
  };

  useEffect(() => {
    refreshCounterQR();
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          refreshCounterQR();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [meal]);

  return (
    <div className="p-6 rounded-3xl glass-card border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 text-center space-y-6 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="text-left space-y-0.5">
          <div className="flex items-center space-x-1.5 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Monitor className="w-4 h-4" />
            <span>Mess Counter Display QR</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">Student Meal Check-In Station</h3>
        </div>

        {/* Meal Selector */}
        <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-700/80 text-xs">
          {['breakfast', 'lunch', 'snacks', 'dinner'].map((m) => (
            <button
              key={m}
              onClick={() => setMeal(m)}
              className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-all ${
                meal === m
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Big Counter Display QR Code */}
      <div className="p-6 rounded-2xl bg-white/95 max-w-xs mx-auto shadow-2xl space-y-3 relative group">
        {qrData?.qrCodeUrl ? (
          <img
            src={qrData.qrCodeUrl}
            alt="Mess Counter QR"
            className="w-56 h-56 mx-auto object-contain transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-56 h-56 flex items-center justify-center text-slate-500 text-xs font-semibold">
            Generating Counter Token...
          </div>
        )}
        <div className="text-[11px] font-bold text-slate-800 tracking-wide uppercase pt-1 border-t border-slate-200 flex items-center justify-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Official {meal} Counter Pass</span>
        </div>
      </div>

      {/* Auto-Refresh Counter Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 max-w-sm mx-auto text-xs text-slate-400 pt-1">
        <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Encrypted Anti-Duplicate Token</span>
        </span>
        <span className="flex items-center space-x-1 font-mono text-indigo-300">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>Refreshing in {countdown}s</span>
        </span>
      </div>
    </div>
  );
};
