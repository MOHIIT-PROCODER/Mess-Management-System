import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';

const DEFAULT_FEEDBACK_DATA = [
  {
    id: 'fb-1',
    student_name: 'Aarav Patel',
    roll_number: '21CS089',
    room_number: '204-A',
    hostel_name: 'Aryabhata Boys Hostel',
    meal: 'lunch',
    food_item: 'Paneer Butter Masala & Dal Tadka',
    rating: 5,
    comment: 'The Paneer Butter Masala was extremely rich, delicious, and had great aroma. Rotis were served hot and fresh!',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    sentiment: 'positive',
    helpful_count: 14,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    admin_reply: 'Thank you Aarav! The kitchen team is pleased to hear your kind words.'
  },
  {
    id: 'fb-2',
    student_name: 'Priya Sharma',
    roll_number: '21EC042',
    room_number: '112-B',
    hostel_name: 'Gargi Girls Hostel',
    meal: 'breakfast',
    food_item: 'Aloo Paratha & Fresh Curd',
    rating: 5,
    comment: 'Best breakfast this week! Parathas were properly stuffed with potato masala and curd was fresh.',
    image_url: null,
    sentiment: 'positive',
    helpful_count: 9,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    admin_reply: null
  },
  {
    id: 'fb-3',
    student_name: 'Rohan Gupta',
    roll_number: '22ME015',
    room_number: '305-C',
    hostel_name: 'Aryabhata Boys Hostel',
    meal: 'snacks',
    food_item: 'Masala Tea & Samosa',
    rating: 2,
    comment: 'The evening tea was barely lukewarm and samosa crust was too soggy today. Please ensure hot snacks at 5:15 PM.',
    image_url: null,
    sentiment: 'negative',
    helpful_count: 18,
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    admin_reply: 'Issue noted Rohan. We have instructed the tea dispensing team to maintain proper urn temperature.'
  },
  {
    id: 'fb-4',
    student_name: 'Sneha Iyer',
    roll_number: '21BT031',
    room_number: '402-A',
    hostel_name: 'Gargi Girls Hostel',
    meal: 'dinner',
    food_item: 'Butter Naan & Dal Makhani',
    rating: 4,
    comment: 'Great dinner spread overall. Dal Makhani was slow cooked nicely. Gulab Jamun dessert was sweet.',
    image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    sentiment: 'positive',
    helpful_count: 6,
    created_at: new Date(Date.now() - 3600000 * 26).toISOString(),
    admin_reply: null
  },
  {
    id: 'fb-5',
    student_name: 'Vikram Rathore',
    roll_number: '20EE104',
    room_number: '108-A',
    hostel_name: 'Ramanujan Hall of Residence',
    meal: 'lunch',
    food_item: 'Jeera Rice & Mixed Veg Curry',
    rating: 1,
    comment: 'Salt was excessively high in the vegetable curry, making it very hard to eat. Had to skip lunch.',
    image_url: null,
    sentiment: 'negative',
    helpful_count: 22,
    created_at: new Date(Date.now() - 3600000 * 32).toISOString(),
    admin_reply: 'We sincerely apologize Vikram. Chef has adjusted the seasoning measurements across all batch cauldrons.'
  },
  {
    id: 'fb-6',
    student_name: 'Ananya Das',
    roll_number: '22CS119',
    room_number: '215-B',
    hostel_name: 'Sarojini Naidu Girls Hostel',
    meal: 'breakfast',
    food_item: 'Idli & Sambar',
    rating: 4,
    comment: 'Idlis were super soft and coconut chutney was freshly prepared. Very satisfying start to the day.',
    image_url: null,
    sentiment: 'positive',
    helpful_count: 11,
    created_at: new Date(Date.now() - 3600000 * 40).toISOString(),
    admin_reply: null
  },
  {
    id: 'fb-7',
    student_name: 'Kavita Singh',
    roll_number: '21CE058',
    room_number: '310-A',
    hostel_name: 'Aryabhata Boys Hostel',
    meal: 'dinner',
    food_item: 'Vegetable Pulao & Raita',
    rating: 3,
    comment: 'Pulao rice was a bit undercooked in the center. Raita and salad were good however.',
    image_url: null,
    sentiment: 'negative',
    helpful_count: 7,
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    admin_reply: 'Thank you Kavita. Steaming time for rice has been extended.'
  },
  {
    id: 'fb-8',
    student_name: 'Devraj Mukherjee',
    roll_number: '20CS004',
    room_number: '501-C',
    hostel_name: 'Aryabhata Boys Hostel',
    meal: 'lunch',
    food_item: 'Gulab Jamun & Paneer Masala',
    rating: 5,
    comment: 'The festive lunch was extraordinary! Hats off to the kitchen staff for managing such a large crowd smoothly.',
    image_url: null,
    sentiment: 'positive',
    helpful_count: 15,
    created_at: new Date(Date.now() - 3600000 * 60).toISOString(),
    admin_reply: 'Glad you enjoyed the special meal Devraj!'
  },
  {
    id: 'fb-9',
    student_name: 'Aditya Sen',
    roll_number: '23CS012',
    room_number: '104-B',
    hostel_name: 'BH-7 (Boys Hostel 7)',
    meal: 'lunch',
    food_item: 'Paneer Butter Masala & Garlic Naan',
    rating: 5,
    comment: 'BH-7 mess hall serving top quality food! Clean dining tables, quick service and delicious food.',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    sentiment: 'positive',
    helpful_count: 12,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    admin_reply: 'Thank you Aditya! BH-7 management strives to maintain high dining standards.'
  },
  {
    id: 'fb-10',
    student_name: 'Tanmay Joshi',
    roll_number: '23EC077',
    room_number: '208-A',
    hostel_name: 'BH-7 (Boys Hostel 7)',
    meal: 'breakfast',
    food_item: 'Upma & Sambhar',
    rating: 2,
    comment: 'Upma was too dry today and chutney was running short at the counter around 9:00 AM.',
    image_url: null,
    sentiment: 'negative',
    helpful_count: 8,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    admin_reply: 'Noted Tanmay. Extra chutney batches will be stocked throughout the breakfast hour.'
  }
];

const getStoredFeedback = () => {
  try {
    const saved = localStorage.getItem('iterp_all_feedback');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('LocalStorage feedback read error:', e);
  }
  return DEFAULT_FEEDBACK_DATA;
};

const matchesHostel = (itemHostel, filterHostel) => {
  if (!filterHostel || filterHostel === 'all') return true;
  const iH = (itemHostel || '').toLowerCase().replace(/\s+/g, '');
  const fH = (filterHostel || '').toLowerCase().replace(/\s+/g, '');
  return iH.includes(fH) || fH.includes(iH);
};

const saveFeedbackList = (list) => {
  try {
    localStorage.setItem('iterp_all_feedback', JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('iterp_feedback_updated', { detail: list }));
    window.dispatchEvent(new StorageEvent('storage', { key: 'iterp_all_feedback', newValue: JSON.stringify(list) }));
  } catch (e) {
    console.warn('LocalStorage feedback save error:', e);
  }
};

export const feedbackService = {
  getAllFeedback: async (filters = {}) => {
    let list = getStoredFeedback();

    try {
      const res = await axios.get(`${API_URL}/feedback`, { params: filters });
      if (res.data && res.data.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        // Merge backend list with local store
        const idMap = new Map();
        [...list, ...res.data.data].forEach((item) => {
          if (!idMap.has(item.id)) idMap.set(item.id, item);
        });
        list = Array.from(idMap.values());
        saveFeedbackList(list);
      }
    } catch {
      // Backend fallback to stored list
    }

    if (filters.hostel_name && filters.hostel_name !== 'all') {
      list = list.filter((item) => matchesHostel(item.hostel_name, filters.hostel_name));
    }
    if (filters.meal && filters.meal !== 'all') {
      list = list.filter((item) => (item.meal || '').toLowerCase() === filters.meal.toLowerCase());
    }
    if (filters.sentiment && filters.sentiment !== 'all') {
      list = list.filter((item) => item.sentiment === filters.sentiment);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (item) =>
          item.student_name?.toLowerCase().includes(q) ||
          item.roll_number?.toLowerCase().includes(q) ||
          item.comment?.toLowerCase().includes(q) ||
          item.food_item?.toLowerCase().includes(q)
      );
    }

    return list;
  },

  getFeedbackSummary: async (hostelName = 'all') => {
    let list = getStoredFeedback();
    if (hostelName && hostelName !== 'all') {
      list = list.filter((item) => matchesHostel(item.hostel_name, hostelName));
    }

    const positiveCount = list.filter((item) => item.rating >= 4).length;
    const negativeCount = list.filter((item) => item.rating <= 3).length;
    const totalReviews = list.length || 1;
    const avgRating = (list.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1);

    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    list.forEach((item) => {
      const r = Math.round(item.rating);
      if (dist[r] !== undefined) dist[r]++;
    });

    return {
      average_rating: Number(avgRating),
      total_reviews: totalReviews,
      positive_count: positiveCount,
      negative_count: negativeCount,
      positive_percentage: Math.round((positiveCount / totalReviews) * 100),
      negative_percentage: Math.round((negativeCount / totalReviews) * 100),
      ratings_distribution: dist,
      recent_feedback: list,
    };
  },

  submitFeedback: async (feedbackData) => {
    const rating = Number(feedbackData.rating) || 5;
    const sentiment = rating >= 4 ? 'positive' : 'negative';

    const newFeedback = {
      id: `fb-${Date.now()}`,
      student_name: feedbackData.student_name || 'Aarav Patel',
      roll_number: feedbackData.roll_number || '21CS089',
      room_number: feedbackData.room_number || '204-A',
      hostel_name: feedbackData.hostel_name || 'BH-7 (Boys Hostel 7)',
      meal: feedbackData.meal || 'lunch',
      food_item: feedbackData.food_item || 'Daily Mess Meal',
      rating,
      comment: feedbackData.comment || '',
      image_url: feedbackData.image_url || null,
      sentiment,
      helpful_count: 0,
      created_at: new Date().toISOString(),
      admin_reply: null,
    };

    const currentList = getStoredFeedback();
    const updatedList = [newFeedback, ...currentList.filter(f => f.id !== newFeedback.id)];
    saveFeedbackList(updatedList);

    try {
      const res = await axios.post(`${API_URL}/feedback`, {
        ...feedbackData,
        sentiment,
      });
      if (res.data?.data) {
        const serverItem = res.data.data;
        const merged = [serverItem, ...currentList.filter(f => f.id !== serverItem.id && f.id !== newFeedback.id)];
        saveFeedbackList(merged);
        return { success: true, data: serverItem };
      }
    } catch (err) {
      console.warn('Backend feedback submit fallback:', err.message);
    }

    return { success: true, data: newFeedback };
  },

  addAdminReply: async (feedbackId, replyText) => {
    const list = getStoredFeedback().map((item) => {
      if (item.id === feedbackId) {
        return { ...item, admin_reply: replyText };
      }
      return item;
    });
    saveFeedbackList(list);

    try {
      await axios.post(`${API_URL}/feedback/${feedbackId}/reply`, { reply: replyText });
    } catch (err) {
      console.warn('Backend feedback reply notice:', err.message);
    }

    return { success: true };
  },

  toggleHelpful: async (feedbackId) => {
    const list = getStoredFeedback().map((item) => {
      if (item.id === feedbackId) {
        return { ...item, helpful_count: (item.helpful_count || 0) + 1 };
      }
      return item;
    });
    saveFeedbackList(list);
    return { success: true };
  },
};
