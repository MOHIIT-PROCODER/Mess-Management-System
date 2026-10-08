import { useState, useEffect, useCallback } from 'react';
import { attendanceService } from '../services/attendanceService';
import { supabase } from '../lib/supabaseClient';

export const useAttendance = (hostelId = 'a1b2c3d4-0000-0000-0000-000000000001') => {
  const [liveData, setLiveData] = useState({
    total_scanned: 142,
    remaining_students: 58,
    recent_scans: []
  });
  const [loading, setLoading] = useState(true);

  const fetchLive = useCallback(async () => {
    try {
      const data = await attendanceService.getLiveAttendance(hostelId);
      if (data) setLiveData(data);
    } catch (err) {
      console.warn('Attendance fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [hostelId]);

  useEffect(() => {
    let isMounted = true;
    fetchLive();

    // 1. Same-window instant scan broadcast
    const handleLocalUpdate = (e) => {
      if (isMounted) {
        if (e.detail) setLiveData(e.detail);
        else fetchLive();
      }
    };
    window.addEventListener('iterp_attendance_updated', handleLocalUpdate);

    // 2. Cross-tab storage synchronization
    const handleStorage = (e) => {
      if (e.key === 'iterp_live_attendance' && isMounted) {
        try {
          if (e.newValue) setLiveData(JSON.parse(e.newValue));
        } catch {
          fetchLive();
        }
      }
    };
    window.addEventListener('storage', handleStorage);

    // 3. Supabase Realtime Channel
    let channel = null;
    try {
      channel = supabase
        .channel('attendance_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'attendance_logs' },
          () => {
            if (isMounted) fetchLive();
          }
        )
        .subscribe();
    } catch (err) {
      console.warn('Supabase attendance realtime subscription error:', err);
    }

    return () => {
      isMounted = false;
      window.removeEventListener('iterp_attendance_updated', handleLocalUpdate);
      window.removeEventListener('storage', handleStorage);
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [fetchLive]);

  return { liveData, loading, refetch: fetchLive };
};
