import axios from 'axios';
import { supabase } from '../lib/supabaseClient';

const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';

const DEFAULT_COMPLIMENTS = [
  {
    id: 'kudos-1',
    title: 'Outstanding Paneer Butter Masala & Fluffy Rotis',
    category: 'master_chef',
    category_label: 'Master Chef Flavor',
    impressed_with: 'Head Chef Ramesh & Curries Team',
    badge: 'Master Chef Kudos 👨‍🍳',
    description: 'The Paneer Butter Masala served today had phenomenal restaurant-grade rich gravy and authentic aromatic spices. Rotis were served piping hot straight from the tandoor!',
    student_name: 'Aarav Patel',
    roll_number: '21CS089',
    room_number: '204-A',
    hostel_name: 'BH-7 (Boys Hostel 7)',
    likes_count: 34,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    admin_response: 'Delighted to hear! Head Chef Ramesh and the entire BH-7 culinary staff send their heartfelt thanks!'
  },
  {
    id: 'kudos-2',
    title: 'Super Crispy Masala Dosa & Fresh Coconut Chutney',
    category: 'signature_dish',
    category_label: 'Signature Dish',
    impressed_with: 'South Indian Breakfast Station',
    badge: '5-Star Flavor ⭐',
    description: 'The morning dosas had the ideal golden crunch! Sambhar had authentic drumstick flavor and the fresh coconut chutney was refilled without any delay.',
    student_name: 'Priya Sharma',
    roll_number: '21EC042',
    room_number: '112-B',
    hostel_name: 'Gargi Girls Hostel',
    likes_count: 28,
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    admin_response: 'Thank you Priya! Our morning tawa specialists take huge pride in hot, crispy dosas.'
  },
  {
    id: 'kudos-3',
    title: 'Cardamom Infused Hot Masala Chai & Crunchy Samosas',
    category: 'fresh_hot',
    category_label: 'Hot & Fresh Serving',
    impressed_with: 'Evening Snack Chefs',
    badge: 'Warm Comfort ☕',
    description: 'The 5:00 PM tea was steaming hot, perfectly brewed with fresh ginger and cardamom. Samosa filling was delicious and crust was non-greasy.',
    student_name: 'Aditya Sen',
    roll_number: '23CS012',
    room_number: '104-B',
    hostel_name: 'BH-7 (Boys Hostel 7)',
    likes_count: 21,
    created_at: new Date(Date.now() - 3600000 * 14).toISOString(),
    admin_response: 'Glad you enjoyed the tea break Aditya! The evening beverage crew is thrilled.'
  },
  {
    id: 'kudos-4',
    title: 'Extremely Courteous Serving & Clean Dining Tables',
    category: 'courteous_staff',
    category_label: 'Staff Courtesy',
    impressed_with: 'Dining Hall Service Crew',
    badge: 'Wonderful Hospitality 💖',
    description: 'The mess helpers at Counter #3 were polite, smiling, and served generous portions of fresh salad with quick refills. Cleanliness has noticeably improved!',
    student_name: 'Sneha Iyer',
    roll_number: '21BT031',
    room_number: '402-A',
    hostel_name: 'Gargi Girls Hostel',
    likes_count: 19,
    created_at: new Date(Date.now() - 3600000 * 22).toISOString(),
    admin_response: 'Thank you Sneha! We hold regular hospitality briefings with our floor stewards.'
  }
];

const getStoredCompliments = () => {
  try {
    const saved = localStorage.getItem('iterp_all_compliments');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Filter out legacy negative complaints if any were cached
        const clean = parsed.filter(item => item.category !== 'amenities' && item.category !== 'infrastructure');
        if (clean.length > 0) return clean;
      }
    }
  } catch (e) {
    console.warn('Compliment storage read error:', e);
  }
  return DEFAULT_COMPLIMENTS;
};

const saveCompliments = (list) => {
  try {
    localStorage.setItem('iterp_all_compliments', JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('iterp_compliment_updated', { detail: list }));
    window.dispatchEvent(new CustomEvent('iterp_complaint_updated', { detail: list }));
  } catch (e) {
    console.warn('Compliment storage save error:', e);
  }
};

export const complaintService = {
  createComplaint: async (data) => {
    return complaintService.createCompliment(data);
  },

  createCompliment: async (complimentData) => {
    const newCompliment = {
      id: `kudos-${Date.now()}`,
      title: complimentData.title || 'Appreciation for Kitchen & Cooks',
      category: complimentData.category || 'master_chef',
      category_label: complimentData.category_label || 'Master Chef Flavor',
      impressed_with: complimentData.impressed_with || 'Cooks & Kitchen Team',
      badge: complimentData.badge || 'Master Chef Kudos 👨‍🍳',
      description: complimentData.description || '',
      student_name: complimentData.student_name || 'Aarav Patel',
      roll_number: complimentData.roll_number || '21CS089',
      room_number: complimentData.room_number || '204-A',
      hostel_name: complimentData.hostel_name || 'BH-7 (Boys Hostel 7)',
      likes_count: 1,
      created_at: new Date().toISOString(),
      admin_response: null
    };

    const current = getStoredCompliments();
    const updated = [newCompliment, ...current.filter(c => c.id !== newCompliment.id)];
    saveCompliments(updated);

    try {
      const res = await axios.post(`${API_URL}/complaints`, complimentData);
      if (res.data?.data) {
        const serverCreated = res.data.data;
        const merged = [serverCreated, ...current.filter(c => c.id !== serverCreated.id && c.id !== newCompliment.id)];
        saveCompliments(merged);
        return { success: true, data: serverCreated };
      }
    } catch (err) {
      console.warn('Backend compliment sync fallback:', err.message);
    }

    return { success: true, data: newCompliment };
  },

  getComplaints: async (hostelId) => {
    return complaintService.getCompliments(hostelId);
  },

  getCompliments: async (hostelId) => {
    const local = getStoredCompliments();
    try {
      const res = await axios.get(`${API_URL}/complaints`, { params: { hostel_id: hostelId } });
      if (res.data && res.data.data && Array.isArray(res.data.data)) {
        const serverList = res.data.data.filter(item => item.category !== 'amenities' && item.category !== 'infrastructure');
        // Merge server list with any fresh local items
        const idMap = new Map();
        [...local, ...serverList].forEach(item => {
          if (!idMap.has(item.id)) idMap.set(item.id, item);
        });
        const combined = Array.from(idMap.values());
        saveCompliments(combined);
        return combined;
      }
    } catch {
      // Offline fallback
    }
    return local;
  },

  likeCompliment: (id) => {
    const list = getStoredCompliments().map((c) => {
      if (c.id === id) {
        return { ...c, likes_count: (c.likes_count || 0) + 1 };
      }
      return c;
    });
    saveCompliments(list);
    return list;
  },

  updateStatus: async (id, status, adminResponse) => {
    const list = getStoredCompliments().map((c) => {
      if (c.id === id) {
        return {
          ...c,
          status: status || 'acknowledged',
          admin_response: adminResponse !== undefined ? adminResponse : c.admin_response
        };
      }
      return c;
    });

    saveCompliments(list);

    try {
      await axios.patch(`${API_URL}/complaints/${id}/status`, { status, admin_response: adminResponse });
    } catch (err) {
      console.warn('Backend compliment status update note:', err.message);
    }

    return { success: true };
  }
};

export const complimentService = complaintService;
