import React, { useState } from 'react';
import { MessageSquare, AlertTriangle, CheckCircle2, Clock, ShieldCheck, Filter, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const HostelComplaints = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';

  const [filterStatus, setFilterStatus] = useState('ALL');
  const [complaints, setComplaints] = useState([
    {
      id: 'CMP-701',
      student: 'Siddharth Roy',
      room: '302-A',
      category: 'Food Quality',
      meal: 'Dinner',
      description: 'The rotis served yesterday were burnt and extremely stiff. Need chef to replace the tawa technique.',
      date: 'Oct 7, 2026',
      status: 'Pending Review',
      priority: 'High'
    },
    {
      id: 'CMP-702',
      student: 'Rohan Gupta',
      room: '205-B',
      category: 'Mess Cleanliness',
      meal: 'Lunch',
      description: 'Water dispenser on the second floor of mess dining hall was leaking. Need maintenance team to fix.',
      date: 'Oct 6, 2026',
      status: 'In Progress',
      priority: 'Normal'
    },
    {
      id: 'CMP-703',
      student: 'Aditya Mishra',
      room: '401-B',
      category: 'Service & Staff',
      meal: 'Breakfast',
      description: 'Tea ran out at 8:45 AM before regular cutoff time. Refill was delayed by 25 mins.',
      date: 'Oct 5, 2026',
      status: 'Resolved',
      priority: 'Normal'
    },
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const filtered = complaints.filter(
    (c) => filterStatus === 'ALL' || c.status === filterStatus
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-indigo-500" />
          <span>{hostelName} Grievances & Resolution Desk</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review complaints lodged by {hostelName} resident students and issue disciplinary or catering action orders.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'Pending Review', 'In Progress', 'Resolved'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              filterStatus === s
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filtered.map((c) => (
          <div key={c.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{c.id}</span>
                <span>•</span>
                <span>{c.student} (Room {c.room})</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  c.priority === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {c.priority} Priority
                </span>
              </div>

              <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold self-start sm:self-auto ${
                c.status === 'Resolved'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : c.status === 'In Progress'
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
              }`}>
                {c.status}
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              "{c.description}"
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
              <div>
                Category: <strong>{c.category}</strong> • Meal: <strong>{c.meal}</strong> • Raised: <strong>{c.date}</strong>
              </div>

              <div className="flex items-center gap-2">
                {c.status !== 'Resolved' && (
                  <button
                    onClick={() => handleUpdateStatus(c.id, 'Resolved')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors"
                  >
                    Mark Resolved
                  </button>
                )}
                {c.status === 'Pending Review' && (
                  <button
                    onClick={() => handleUpdateStatus(c.id, 'In Progress')}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-700 transition-colors"
                  >
                    Take Action
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HostelComplaints;
