import React, { useState, useCallback } from 'react';
import { Upload, X, Loader2, CheckCircle, ImageIcon, Trash2, ZapIcon } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';
import { compressImage, blobToFile } from '../../../utils/imageCompressor';

/**
 * FoodImageUploader
 * Compresses the image client-side, then uploads to Supabase Storage.
 * Returns the public URL on success.
 */
export const FoodImageUploader = ({ currentImage, onImageSaved, mealLabel }) => {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);
  const [status, setStatus] = useState('idle'); // idle | compressing | uploading | done | error
  const [stats, setStats] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const processFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file.');
      return;
    }
    setErrorMsg('');
    setStatus('compressing');

    try {
      // 1. Compress client-side
      const compressed = await compressImage(file, {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.75,
      });

      setPreview(compressed.dataUrl);
      setStats({
        original: compressed.originalSizeKB,
        compressed: compressed.sizeKB,
        saved: Math.round(((compressed.originalSizeKB - compressed.sizeKB) / compressed.originalSizeKB) * 100),
        dims: `${compressed.width}×${compressed.height}px`,
      });

      // 2. Upload to Supabase Storage
      setStatus('uploading');
      const fileName = `food-images/${Date.now()}_${mealLabel?.replace(/\s+/g, '-') || 'meal'}.jpg`;
      const compressedFile = blobToFile(compressed.blob, fileName);

      const { data, error } = await supabase.storage
        .from('mess-images')
        .upload(fileName, compressedFile, { upsert: true, contentType: 'image/jpeg' });

      if (error) {
        // Fallback: use data URL if Supabase storage not configured
        console.warn('Supabase storage upload failed, using local preview:', error.message);
        setStatus('done');
        onImageSaved(compressed.dataUrl);
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from('mess-images').getPublicUrl(fileName);
      setStatus('done');
      onImageSaved(urlData.publicUrl || compressed.dataUrl);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  }, [mealLabel, onImageSaved]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setStats(null);
    setStatus('idle');
    onImageSaved(null);
  };

  return (
    <div className="space-y-2">
      {/* Preview */}
      {preview ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
          <img
            src={preview}
            alt={mealLabel}
            className="w-full h-36 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-rose-600 text-white rounded-full hover:bg-rose-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          {status === 'done' && stats && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-2 py-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ZapIcon className="w-2.5 h-2.5 text-amber-400" />
                Saved {stats.saved}% · {stats.compressed}KB
              </span>
              <span>{stats.dims}</span>
            </div>
          )}
        </div>
      ) : (
        /* Drop Zone */
        <label
          className={`flex flex-col items-center justify-center h-36 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            dragOver
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/40 hover:border-indigo-400'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          {status === 'compressing' || status === 'uploading' ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {status === 'compressing' ? 'Compressing...' : 'Uploading...'}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
              <ImageIcon className="w-7 h-7" />
              <span className="text-xs font-medium">Drop image or click to upload</span>
              <span className="text-[10px] text-slate-400">Auto-compressed · max 800px · JPEG 75%</span>
            </div>
          )}
        </label>
      )}

      {errorMsg && (
        <p className="text-[11px] text-rose-500 font-medium">{errorMsg}</p>
      )}
    </div>
  );
};
