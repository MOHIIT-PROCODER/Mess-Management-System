import { useState } from 'react';
import axios from 'axios';

export const useCloudinary = () => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const upload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post('/api/upload/image', formData);
      const url = res.data.data.url;
      setImageUrl(url);
      setUploading(false);
      return url;
    } catch (err) {
      const fallback = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
      setImageUrl(fallback);
      setUploading(false);
      return fallback;
    }
  };

  return { upload, uploading, imageUrl };
};
