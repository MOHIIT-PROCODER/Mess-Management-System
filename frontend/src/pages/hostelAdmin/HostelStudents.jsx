import React, { useState } from 'react';
import { Users, Search, Filter, ShieldCheck, Mail, Phone, Building, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const HostelStudents = () => {
  const { user } = useAuth();
  const hostelName = user?.hostel_name || 'BH-7 (Boys Hostel 7)';

  const [search, setSearch] = useState('');
  const [filterBlock, setFilterBlock] = useState('ALL');

  const residents = [
    { id: '1', name: 'Aarav Patel', roll: '21CS089', room: '204-A', block: 'Block A', phone: '+91 98765 43210', email: 'aarav.21cs@iter.ac.in', messStatus: 'Active', streak: 18 },
    { id: '2', name: 'Rohan Gupta', roll: '21CS112', room: '205-B', block: 'Block A', phone: '+91 98765 43211', email: 'rohan.21cs@iter.ac.in', messStatus: 'Active', streak: 24 },
    { id: '3', name: 'Siddharth Roy', roll: '22IT045', room: '302-A', block: 'Block B', phone: '+91 98765 43212', email: 'siddharth.22it@iter.ac.in', messStatus: 'Active', streak: 12 },
    { id: '4', name: 'Kunal Sen', roll: '22EC033', room: '108-C', block: 'Block A', phone: '+91 98765 43213', email: 'kunal.22ec@iter.ac.in', messStatus: 'On Rebate (Leave)', streak: 0 },
    { id: '5', name: 'Aditya Mishra', roll: '23CS201', room: '401-B', block: 'Block B', phone: '+91 98765 43214', email: 'aditya.23cs@iter.ac.in', messStatus: 'Active', streak: 31 },
    { id: '6', name: 'Vikram Singh', roll: '21ME019', room: '310-A', block: 'Block B', phone: '+91 98765 43215', email: 'vikram.21me@iter.ac.in', messStatus: 'Active', streak: 9 },
  ];

  const filtered = residents.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.roll.toLowerCase().includes(search.toLowerCase()) ||
      r.room.toLowerCase().includes(search.toLowerCase());
    const matchBlock = filterBlock === 'ALL' || r.block === filterBlock;
    return matchSearch && matchBlock;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-500" />
            <span>{hostelName} Residents Directory</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Registered students residing in {hostelName} and subscribed to the {hostelName} Mess.
          </p>
        </div>

        <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 self-start sm:self-auto">
          Total Residents: {residents.length}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, roll no, room no..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {['ALL', 'Block A', 'Block B'].map((b) => (
            <button
              key={b}
              onClick={() => setFilterBlock(b)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                filterBlock === b
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Residents Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Room & Block</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Mess Status</th>
                <th className="py-3 px-4">Attendance Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{r.name}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-600 dark:text-slate-300">{r.roll}</td>
                  <td className="py-3.5 px-4 font-semibold text-indigo-600 dark:text-indigo-400">{r.room} ({r.block})</td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 space-y-0.5">
                    <div>{r.email}</div>
                    <div className="font-mono text-[10px]">{r.phone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        r.messStatus === 'Active'
                          ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      {r.messStatus === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {r.messStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-amber-500">
                    🔥 {r.streak} Days
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default HostelStudents;
