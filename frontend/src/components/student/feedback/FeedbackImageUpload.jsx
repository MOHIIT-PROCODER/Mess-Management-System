import React, { useState } from 'react';
import { UploadCloud, Image, Check } from 'lucide-react';
import { useCloudinary } from '../../../hooks/useCloudinary';

export const FeedbackImageUpload = ({ onImageUploaded }) => {
  const { upload, uploading } = useCloudinary();
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await upload(file);
      setUploadedUrl(url);
      if (onImageUploaded) onImageUploaded(url);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Meal Photo Attachment (Optional)</label>
      <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500/50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50 dark:bg-slate-900/50 transition-colors">
        {uploading ? (
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold animate-pulse">Uploading Image to Cloudinary...</p>
        ) : uploadedUrl ? (
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <Check className="w-4 h-4" />
            <span>Image Attached Successfully</span>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-1 text-slate-600 dark:text-slate-400">
            <UploadCloud className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-medium">Click or drag image file here</span>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
      </label>
    </div>
  );
};
