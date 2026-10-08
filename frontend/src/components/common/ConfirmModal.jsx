import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-amber-400">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="font-semibold text-lg text-white">{title}</h3>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-slate-300">{message}</p>
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-xl text-sm font-medium bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/20">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
