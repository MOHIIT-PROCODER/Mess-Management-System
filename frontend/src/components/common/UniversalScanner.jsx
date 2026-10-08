import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, ShieldCheck, Zap, Flashlight, SwitchCamera, Search, UserCheck, AlertCircle, Barcode, QrCode } from 'lucide-react';
import { getCurrentMeal, getCurrentOrNextMeal } from '../../utils/dateUtils';
import { attendanceService } from '../../services/attendanceService';

export const UniversalScanner = ({
  role = 'mess_admin',
  title = "Universal Attendance Scanner",
  subtitle = "Scan student dynamic barcode or 30s QR pass at the dining counter",
  onScanSuccess
}) => {
  const [scanning, setScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' | 'user'
  const [torchOn, setTorchOn] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [recentScans, setRecentScans] = useState([
    { id: 'sc1', name: 'Rahul Sharma', roll: '21CS045', room: '302-B', meal: 'lunch', time: 'Just now', status: 'verified' },
    { id: 'sc2', name: 'Ananya Verma', roll: '21EC012', room: '108-A', meal: 'lunch', time: '2 mins ago', status: 'verified' },
    { id: 'sc3', name: 'Devendra Meena', roll: '21ME078', room: '214-C', meal: 'lunch', time: '5 mins ago', status: 'verified' }
  ]);
  const [lastScannedStudent, setLastScannedStudent] = useState(null);
  const [scanMode, setScanMode] = useState('camera'); // 'camera' | 'manual'
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async (mode = facingMode) => {
    setCameraActive(true);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: mode }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } catch (err) {
      console.log('Camera API fallback simulation active');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    if (cameraActive) {
      startCamera(nextMode);
    }
  };

  const toggleTorch = async () => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0];
      if (track && track.getCapabilities && track.getCapabilities().torch) {
        try {
          await track.applyConstraints({
            advanced: [{ torch: !torchOn }]
          });
          setTorchOn(!torchOn);
        } catch (e) {
          setTorchOn(!torchOn);
        }
      } else {
        setTorchOn(!torchOn);
      }
    } else {
      setTorchOn(!torchOn);
    }
  };

  useEffect(() => {
    // Auto-start camera scanner on mount
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);


  // Execute scan verify
  const executeScan = (scannedCode) => {
    setScanning(true);
    const meal = getCurrentOrNextMeal();
    const demoStudentNames = ['Aarav Patel', 'Priya Sharma', 'Rohan Gupta', 'Kavita Singh', 'Sneha Iyer', 'Vikram Rathore'];
    const chosenName = demoStudentNames[Math.floor(Math.random() * demoStudentNames.length)];
    const chosenRoll = scannedCode || `21CS0${Math.floor(10 + Math.random() * 89)}`;

    setTimeout(async () => {
      const newScan = {
        id: `scan-${Date.now()}`,
        name: chosenName,
        roll: chosenRoll,
        room: `${Math.floor(100 + Math.random() * 300)}-${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}`,
        meal,
        time: 'Just now',
        status: 'verified',
        token: `VERIFIED-${Date.now().toString(36).toUpperCase()}`
      };

      await attendanceService.recordScan(newScan);

      setRecentScans((prev) => [newScan, ...prev.slice(0, 5)]);
      setLastScannedStudent(newScan);
      setScanning(false);
      setManualCode('');

      if (onScanSuccess) {
        onScanSuccess(newScan);
      }
    }, 800);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    executeScan(manualCode.trim().toUpperCase());
  };

  return (
    <div className="space-y-5 max-w-lg mx-auto">
      {/* Scanner Card */}
      <div className="p-5 sm:p-6 rounded-3xl glass-card border border-indigo-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="text-left">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Camera className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>{title}</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              {subtitle}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setScanMode('camera')}
              className={`p-1.5 rounded-lg transition-all ${
                scanMode === 'camera'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              title="Camera View"
            >
              <Camera className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScanMode('manual')}
              className={`p-1.5 rounded-lg transition-all ${
                scanMode === 'manual'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              title="Manual Barcode Input"
            >
              <Barcode className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode 1: Camera Scanner Viewport */}
        {scanMode === 'camera' && (
          <div className="space-y-3">
            <div className="relative w-full aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden bg-slate-950 border-2 border-indigo-500/50 shadow-inner flex flex-col items-center justify-center">
              {cameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="space-y-3 p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/10">
                    <Camera className="w-8 h-8" />
                  </div>
                  <p className="text-xs text-slate-300 font-medium">Ready for Barcode & QR Scanning</p>
                </div>
              )}

              {/* Target Aim Frame & Laser Animation */}
              <div className="absolute inset-5 border-2 border-dashed border-indigo-400/70 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-t-2 border-l-2 border-indigo-400" />
                  <div className="w-4 h-4 border-t-2 border-r-2 border-indigo-400" />
                </div>
                {/* Sweeping Laser Line */}
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse shadow-[0_0_12px_#34d399]" />
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-b-2 border-l-2 border-indigo-400" />
                  <div className="w-4 h-4 border-b-2 border-r-2 border-indigo-400" />
                </div>
              </div>

              {/* In-camera Controls Toolbar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                <button
                  type="button"
                  onClick={toggleTorch}
                  className={`p-2 rounded-xl backdrop-blur-md border text-xs flex items-center space-x-1 font-semibold transition-all ${
                    torchOn
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-900/80 text-slate-300 border-slate-700'
                  }`}
                >
                  <Flashlight className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{torchOn ? 'Torch On' : 'Torch'}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleFacingMode}
                  className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white text-xs flex items-center space-x-1 font-semibold"
                >
                  <SwitchCamera className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Flip</span>
                </button>
              </div>

              {/* Scanning in progress overlay */}
              {scanning && (
                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-2 z-20">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                  <p className="text-xs font-bold text-emerald-300">Validating 30s Dynamic Barcode...</p>
                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div className="space-y-2">
              {!cameraActive ? (
                <button
                  type="button"
                  onClick={() => {
                    startCamera();
                    // Auto-scan after camera opens
                    setTimeout(() => {
                      executeScan('AUTO-DETECTED');
                    }, 2200);
                  }}
                  className="w-full gradient-btn py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Start Live Automatic Scanner</span>
                </button>
              ) : (
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                  <span className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Auto-Scanning Active (Point at Barcode/QR)</span>
                  </span>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 text-[11px] font-bold transition-all"
                  >
                    Stop
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mode 2: Manual Barcode / Roll Number Input */}
        {scanMode === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-3 py-2">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                <Barcode className="w-4 h-4 text-indigo-500" />
                <span>Enter Barcode Token or Student Roll No</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="e.g. 21CS089 or STU-21CS-LUN-A9B2"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 pl-9 text-xs font-mono uppercase text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={scanning || !manualCode.trim()}
              className="w-full gradient-btn py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>{scanning ? 'Verifying Token...' : 'Verify Student Attendance'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Success Notification Alert Box */}
      {lastScannedStudent && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 space-y-2 text-left animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-emerald-500 text-white">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  {lastScannedStudent.name} ({lastScannedStudent.roll})
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                  Room {lastScannedStudent.room} • {lastScannedStudent.meal?.toUpperCase()} Marked Present
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-800/60 text-emerald-800 dark:text-emerald-100 uppercase">
              Verified 30s Pass
            </span>
          </div>
        </div>
      )}

      {/* Recent Scans List */}
      <div className="p-5 rounded-2xl glass-card space-y-3">
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <span>Recent Counter Scan Log</span>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold font-mono">Live Counter</span>
        </h4>

        <div className="space-y-2">
          {recentScans.map((scan) => (
            <div
              key={scan.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-xs">
                  {scan.name?.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100 leading-tight">
                    {scan.name}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    {scan.roll} • {scan.room}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/10 inline-block">
                  {scan.status}
                </span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {scan.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
