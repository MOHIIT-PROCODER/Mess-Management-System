import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useRealtime = (table, onInsert) => {
  useEffect(() => {
    const channel = supabase
      .channel(`realtime_${table}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table }, payload => {
        if (onInsert) onInsert(payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, onInsert]);
};
