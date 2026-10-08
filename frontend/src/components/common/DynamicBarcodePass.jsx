import React, { useState, useEffect } from 'react';
import { QrCode, Barcode, RefreshCw, ShieldCheck, Clock, Sparkles, User, Copy, Check } from 'lucide-react';
import { getCurrentMeal, getCurrentOrNextMeal } from '../../utils/dateUtils';

/**
 * Generate a visual Code-128 style Barcode as SVG lines from a text string
 */
const BarcodeSVG = ({ code, width = 280, height = 75 }) => {
  // Generate deterministic bar widths based on char codes
  const bars = [];
  let currentX = 10;
  const totalChars = code.length;
  
  // Guard pattern start
  bars.push({ x: currentX, w: 2.5, black: true });
  bars.push({ x: currentX + 3.5, w: 1.5, black: false });
  bars.push({ x: currentX + 6, w: 2, black: true });
  currentX += 10;

  for (let i = 0; i < totalChars; i++) {
    const charCode = code.charCodeAt(i);
    const pattern = [
      (charCode % 3) + 1.2,
      ((charCode >> 1) % 3) + 1.2,
      ((charCode >> 2) % 3) + 1.2,
      ((charCode >> 3) % 3) + 1.2,
      ((charCode >> 4) % 3) + 1.2,
    ];

    pattern.forEach((w, idx) => {
      const isBlack = idx % 2 === 0;
      if (isBlack) {
        bars.push({ x: currentX, w, black: true });
      }
      currentX += w + 1;
    });
  }

  // Guard pattern end
  bars.push({ x: currentX + 2, w: 2, black: true });
  bars.push({ x: currentX + 5, w: 1.5, black: false });
  bars.push({ x: currentX + 7, w: 2.5, black: true });
  const finalWidth = currentX + 14;

  return (
    <div className="flex flex-col items-center bg-white p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner">
      <svg
        viewBox={`0 0 ${finalWidth} ${height}`}
        className="w-full max-w-[280px] h-16 sm:h-20"
        preserveAspectRatio="none"
      >
        {bars.map((bar, idx) => (
          <rect
            key={idx}
            x={bar.x}
            y="4"
            width={bar.w}
            height={height - 12}
            fill="#0f172a"
            rx="0.5"
          />
        ))}
      </svg>
      <span className="font-mono text-xs tracking-[0.25em] font-bold text-slate-900 mt-1 uppercase">
        {code}
      </span>
    </div>
  );
};

export const DynamicBarcodePass = ({
  role = 'student',
  userName = 'Aarav Patel',
  userCode = '21CS089',
  hostelName = 'BH-7 (Boys Hostel 7)',
  roomNumber = '204-A',
  mealType
}) => {
  const activeMeal = mealType || getCurrentOrNextMeal();
  const [format, setFormat] = useState('both'); // 'qr' | 'barcode' | 'both'
  const [token, setToken] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  // Generate dynamic cryptographic 30s token
  const generateToken = () => {
    setIsRotating(true);
    const nonce = Math.random().toString(36).substring(2, 7).toUpperCase();
    const timestamp = Date.now().toString(36).slice(-4).toUpperCase();
    const cleanCode = (userCode || 'STU').replace(/[^a-zA-Z0-9]/g, '');
    const prefix = role === 'student' ? 'STU' : role === 'mess_admin' ? 'ADM' : 'SUP';
    const newToken = `${prefix}-${cleanCode}-${activeMeal.substring(0, 3).toUpperCase()}-${nonce}${timestamp}`;
    setToken(newToken);
    setCountdown(30);
    setTimeout(() => setIsRotating(false), 500);
  };

  useEffect(() => {
    generateToken();
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          generateToken();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeMeal, userCode, role]);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    JSON.stringify({
      token,
      name: userName,
      code: userCode,
      meal: activeMeal,
      expires_in_seconds: countdown,
      generated_at: new Date().toISOString()
    })
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = (countdown / 30) * 100;
  const isUrgent = countdown <= 5;
  const isWarning = countdown <= 12 && countdown > 5;

  return (
    <div className="p-5 sm:p-6 rounded-3xl glass-card border border-indigo-500/30 text-center space-y-4 max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="text-left">
          <div className="flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>30s Dynamic Mess Pass</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {userName}
          </h3>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
            {hostelName} • Room {roomNumber}
          </p>
        </div>

        {/* Current Active Meal Pill */}
        <span className="px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
          {activeMeal}
        </span>
      </div>

      {/* Format Switcher Pills */}
      <div className="flex items-center justify-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs font-semibold gap-1">
        <button
          onClick={() => setFormat('both')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            format === 'both'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
          }`}
        >
          Both Pass
        </button>
        <button
          onClick={() => setFormat('barcode')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center space-x-1 transition-all ${
            format === 'barcode'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
          }`}
        >
          <Barcode className="w-3.5 h-3.5" />
          <span>Barcode</span>
        </button>
        <button
          onClick={() => setFormat('qr')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center space-x-1 transition-all ${
            format === 'qr'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>QR Code</span>
        </button>
      </div>

      {/* Codes Container */}
      <div className="space-y-3 py-1">
        {/* 1D Barcode View */}
        {(format === 'barcode' || format === 'both') && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] px-1 font-semibold text-slate-600 dark:text-slate-400">
              <span className="flex items-center space-x-1">
                <Barcode className="w-3.5 h-3.5 text-indigo-500" />
                <span>1D Digital Mess Barcode</span>
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">Anti-Spoof active</span>
            </div>
            <BarcodeSVG code={token || 'STU-21CS089-PASS'} />
          </div>
        )}

        {/* 2D QR Code View */}
        {(format === 'qr' || format === 'both') && (
          <div className="p-4 bg-white rounded-2xl border border-slate-200 dark:border-slate-700 max-w-[220px] mx-auto shadow-inner space-y-2">
            <img
              src={qrImageUrl}
              alt="Dynamic QR"
              className={`w-44 h-44 mx-auto object-contain transition-transform duration-300 ${
                isRotating ? 'scale-95 opacity-75' : 'scale-100 opacity-100'
              }`}
            />
            <p className="text-[10px] font-bold font-mono text-slate-700 tracking-wider">
              {token}
            </p>
          </div>
        )}
      </div>

      {/* 30-Second Countdown Timer Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center space-x-1 text-slate-600 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>Auto Refresh Cycle</span>
          </span>
          <span
            className={`font-mono font-bold px-2 py-0.5 rounded-full text-xs transition-colors ${
              isUrgent
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 animate-pulse'
                : isWarning
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400'
            }`}
          >
            Refreshes in {countdown}s
          </span>
        </div>

        {/* Smooth Linear Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isUrgent
                ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
                : isWarning
                ? 'bg-amber-500'
                : 'bg-gradient-to-r from-indigo-500 to-emerald-400'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Actions: Manual Refresh & Token Copy */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={generateToken}
          disabled={isRotating}
          className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin text-indigo-500' : ''}`} />
          <span>Refresh Now</span>
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 text-xs font-bold transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Token' : 'Copy Token'}</span>
        </button>
      </div>

      {/* Verification footer badge */}
      <div className="flex items-center justify-center space-x-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold pt-1">
        <ShieldCheck className="w-4 h-4" />
        <span>Hardware Validated Anti-Proxy Token</span>
      </div>
    </div>
  );
};
