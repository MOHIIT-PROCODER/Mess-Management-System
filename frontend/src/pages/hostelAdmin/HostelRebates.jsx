import React, { useState } from 'react';
import { DollarSign, Calendar, CheckCircle2, XCircle, Clock, FileText } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const HostelRebates = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';

  const [rebates, setRebates] = useState([
    {
      id: 'REB-101',
      student: 'Kunal Sen',
      roll: '22EC033',
      room: '108-C',
      reason: 'Attending IEEE Conference in New Delhi',
      dates: 'Oct 10, 2026 - Oct 14, 2026 (5 Days)',
      deduction: '₹ 750 (150/day)',
      status: 'Pending Approval'
    },
    {
      id: 'REB-102',
      student: 'Vikram Singh',
      roll: '21ME019',
      room: '310-A',
      reason: 'Home Leave for Festival / Family function',
      dates: 'Oct 12, 2026 - Oct 16, 2026 (4 Days)',
      deduction: '₹ 600 (150/day)',
      status: 'Pending Approval'
    },
    {
      id: 'REB-098',
      student: 'Aarav Patel',
      roll: '21CS089',
      room: '204-A',
      reason: 'Medical Leave (Medical Certificate Attached)',
      dates: 'Sep 25, 2026 - Sep 29, 2026 (4 Days)',
      deduction: '₹ 600 (150/day)',
      status: 'Approved'
    }
  ]);

  const handleAction = (id, newStatus) => {
    setRebates((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-indigo-500" />
          <span>{hostelName} Mess Rebate & Leave Approvals</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review student official leave applications and approve mess fee deductions for non-consumed meals.
        </p>
      </div>

      <div className="space-y-4">
        {rebates.map((r) => (
          <div key={r.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{r.id}</span>
                <span>•</span>
                <span>{r.student} ({r.roll})</span>
                <span className="text-xs text-slate-400">Room {r.room}</span>
              </div>

              <span
                className={`text-[11px] px-2.5 py-1 rounded-full font-bold self-start sm:self-auto ${
                  r.status === 'Approved'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : r.status === 'Rejected'
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {r.status}
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Reason: <strong>{r.reason}</strong>
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="space-y-0.5 text-slate-500">
                <div>Leave Duration: <strong className="text-slate-900 dark:text-white">{r.dates}</strong></div>
                <div>Eligible Mess Deduction: <strong className="text-emerald-600 dark:text-emerald-400">{r.deduction}</strong></div>
              </div>

              {r.status === 'Pending Approval' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAction(r.id, 'Approved')}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Rebate</span>
                  </button>
                  <button
                    onClick={() => handleAction(r.id, 'Rejected')}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-800 font-bold text-xs hover:bg-rose-100 transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HostelRebates;
