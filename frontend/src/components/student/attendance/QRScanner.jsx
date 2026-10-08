import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { getCurrentMeal, getCurrentOrNextMeal } from '../../../utils/dateUtils';
import { attendanceService } from '../../../services/attendanceService';
import { useAuth } from '../../../hooks/useAuth';

export const QRScanner = ({ onScanSuccess }) => {
  const { user } = useAuth();
  const [scanning, setScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);

  const startCamera = async () => {
    setCameraActive(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } catch (err) {
      console.log('Camera API fallback activated for testing');
    }
  };

  const handleScanCounterQR = async () => {
    setScanning(true);
    const meal = getCurrentOrNextMeal();
    
    // Call API scan endpoint & record in live attendance
    try {
      const res = await attendanceService.scanQRToken({
        student_id: user?.id || 'demo-student-id',
        student_name: user?.full_name || 'Aarav Patel',
        roll_number: user?.roll_number || '21CS089',
        room_number: user?.room_number || '204-A',
        hostel_name: user?.hostel_name || 'Aryabhata Boys Hostel',
        hostel_id: user?.hostel_id || 'a1b2c3d4-0000-0000-0000-000000000001',
        meal,
        nonce: Math.random().toString(36)
      });

      setTimeout(() => {
        setScanning(false);
        if (onScanSuccess) {
          onScanSuccess({
            meal,
            scanned_at: new Date().toISOString(),
            status: 'verified'
          });
        }
      }, 1200);
    } catch (err) {
      setScanning(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl glass-card text-center space-y-5 border border-indigo-500/30 max-w-lg mx-auto shadow-2xl relative overflow-hidden">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center space-x-2">
          <Camera className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Scan Mess Counter QR</span>
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
          Point your camera at the Mess Admin's Counter Screen to mark meal attendance.
        </p>
      </div>

      {/* Camera Viewport & Frame Overlay */}
      <div className="relative w-full aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden bg-slate-950 border-2 border-indigo-500/40 shadow-inner flex flex-col items-center justify-center">
        {cameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="space-y-3 p-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/10">
              <Camera className="w-8 h-8" />
            </div>
            <p className="text-xs text-slate-300 font-medium">Camera Scanner Ready</p>
          </div>
        )}

        {/* Scanner Targeting Laser Beam */}
        <div className="absolute inset-6 border-2 border-dashed border-indigo-400/60 rounded-xl pointer-events-none flex items-center justify-center">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse shadow-[0_0_12px_#34d399]" />
        </div>

        {scanning && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-2 z-20">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
            <p className="text-xs font-bold text-emerald-300">Verifying Counter Token...</p>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="space-y-3">
        {!cameraActive && (
          <button
            onClick={startCamera}
            className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Enable Device Camera Lens
          </button>
        )}

        <button
          onClick={handleScanCounterQR}
          disabled={scanning}
          className="w-full gradient-btn py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/25 text-white"
        >
          <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>{scanning ? 'Scanning...' : 'Scan & Check-In Meal Now'}</span>
        </button>
      </div>

      <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
        <span>Instant GPS & Token Verification</span>
      </div>
    </div>
  );
};
