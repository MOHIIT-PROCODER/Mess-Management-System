import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';

const DEFAULT_FEEDBACK_DATA = [
  {
    id: 'fb-bh7-1',
    student_name: 'Aditya Sen',
    roll_number: '23CS012',
    room_number: '104-B',
    hostel_name: 'BH-7 (Boys Hostel 7)',
    meal: 'lunch',
    food_item: 'Paneer Butter Masala & Garlic Naan',
    rating: 5,
    comment: 'BH-7 mess hall serving top quality food! Clean dining tables, quick service and delicious aroma.',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    sentiment: 'positive',
    helpful_count: 14,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    admin_reply: 'Thank you Aditya! BH-7 management strives to maintain high dining standards.'
  },
  {
    id: 'fb-bh7-2',
    student_name: 'Tanmay Joshi',
    roll_number: '23EC077',
    room_number: '208-A',
    hostel_name: 'BH-7 (Boys Hostel 7)',
    meal: 'breakfast',
    food_item: 'Upma & Sambhar',
    rating: 2,
    comment: 'Upma was too dry today and coconut chutney was running short at the counter around 9:00 AM.',
    image_url: null,
    sentiment: 'negative',
    helpful_count: 8,
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    admin_reply: 'Noted Tanmay. Extra chutney batches will be stocked throughout the breakfast hour.'
  },
  {
    id: 'fb-bh1-1',
    student_name: 'Rahul Verma',
    roll_number: '22CS019',
    room_number: '110-A',
    hostel_name: 'BH-1 (Boys Hostel 1)',
    meal: 'dinner',
    food_item: 'Dal Makhani & Butter Roti',
    rating: 5,
    comment: 'The Dal Makhani at BH-1 was super creamy and hot rotis made dinner wholesome.',
    image_url: null,
    sentiment: 'positive',
    helpful_count: 9,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    admin_reply: 'Thank you Rahul! Chef Mukesh appreciates your feedback.'
  },
  {
    id: 'fb-bh1-2',
    student_name: 'Amitabh Das',
    roll_number: '22EE045',
    room_number: '302-B',
    hostel_name: 'BH-1 (Boys Hostel 1)',
    meal: 'lunch',
    food_item: 'Rajma Chawal',
    rating: 3,
    comment: 'Rajma gravy was a bit watery today. Please make it thicker.',
    image_url: null,
    sentiment: 'negative',
    helpful_count: 5,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    admin_reply: 'Will ensure standard consistency for gravy.'
  },
  {
    id: 'fb-bh2-1',
    student_name: 'Subham Panda',
    roll_number: '21ME088',
    room_number: '204-C',
    hostel_name: 'BH-2 (Boys Hostel 2)',
    meal: 'breakfast',
    food_item: 'Aloo Paratha with Curd',
    rating: 5,
    comment: 'Crispy parathas and thick curd. Best breakfast combination in BH-2!',
    image_url: null,
    sentiment: 'positive',
    helpful_count: 11,
    created_at: new Date(Date.now() - 3600000 * 14).toISOString(),
    admin_reply: null
  },
  {
    id: 'fb-bh3-1',
    student_name: 'Kunal Nayak',
    roll_number: '23IT041',
    room_number: '105-A',
    hostel_name: 'BH-3 (Boys Hostel 3)',
    meal: 'snacks',
    food_item: 'Samosa & Ginger Tea',
    rating: 4,
    comment: 'Hot samosas with sweet chutney were great after evening classes.',
    image_url: null,
    sentiment: 'positive',
    helpful_count: 7,
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    admin_reply: null
  },
  {
    id: 'fb-bh4-1',
    student_name: 'Deepak Rout',
    roll_number: '21CV012',
    room_number: '401-B',
    hostel_name: 'BH-4 (Boys Hostel 4)',
    meal: 'lunch',
    food_item: 'Mixed Veg Curry',
    rating: 2,
    comment: 'Veg curry had excess oil today in BH-4 mess. Please reduce oil.',
    image_url: null,
    sentiment: 'negative',
    helpful_count: 12,
    created_at: new Date(Date.now() - 3600000 * 20).toISOString(),
    admin_reply: 'Kitchen manager alerted to cut back on cooking oil.'
  },
  {
    id: 'fb-bh5-1',
    student_name: 'Manish Tripathy',
    roll_number: '22EE099',
    room_number: '315-A',
    hostel_name: 'BH-5 (Boys Hostel 5)',
    meal: 'dinner',
    food_item: 'Paneer Do Pyaza & Jeera Rice',
    rating: 5,
    comment: 'Exceptional flavor in the paneer curry. Loved the dessert too.',
    image_url: null,
    sentiment: 'positive',
    helpful_count: 15,
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    admin_reply: 'Glad you loved it Manish!'
  },
  {
    id: 'fb-bh6-1',
    student_name: 'Sourav Mishra',
    roll_number: '23CS105',
    room_number: '211-B',
    hostel_name: 'BH-6 (Boys Hostel 6)',
    meal: 'breakfast',
    food_item: 'Idli Sambar',
    rating: 4,
    comment: 'Soft idlis and aromatic sambar in BH-6 dining hall.',
    image_url: null,
    sentiment: 'positive',
    helpful_count: 6,
    created_at: new Date(Date.now() - 3600000 * 22).toISOString(),
    admin_reply: null
  },
  {
    id: 'fb-gh1-1',
    student_name: 'Priya Sharma',
    roll_number: '21EC042',
    room_number: '112-B',
    hostel_name: 'GH-1 (Girls Hostel 1)',
    meal: 'breakfast',
    food_item: 'Poha & Jalebi',
    rating: 5,
    comment: 'Poha was perfectly seasoned with lemon and peanuts. Jalebis were crunchy and warm.',
    image_url: null,
    sentiment: 'positive',
    helpful_count: 13,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    admin_reply: 'Thank you Priya! GH-1 kitchen staff strives for perfection.'
  },
  {
    id: 'fb-gh1-2',
    student_name: 'Ananya Mohanty',
    roll_number: '22CS088',
    room_number: '219-A',
    hostel_name: 'GH-1 (Girls Hostel 1)',
    meal: 'lunch',
    food_item: 'Kadhi Pakoda & Rice',
    rating: 3,
    comment: 'Kadhi was slightly too sour today. Pakodas were good.',
    image_url: null,
    sentiment: 'negative',
    helpful_count: 4,
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
    admin_reply: 'We will calibrate the curd fermentation time for Kadhi.'
  },
  {
    id: 'fb-gh2-1',
    student_name: 'Sneha Iyer',
    roll_number: '21BT031',
    room_number: '402-A',
    hostel_name: 'GH-2 (Girls Hostel 2)',
    meal: 'dinner',
    food_item: 'Shahi Paneer & Kulcha',
    rating: 5,
    comment: 'Festive dinner spread was top notch! Gulab Jamuns were fresh.',
    image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    sentiment: 'positive',
    helpful_count: 16,
    created_at: new Date(Date.now() - 3600000 * 10).toISOString(),
    admin_reply: 'Glad you enjoyed the special meal!'
  },
  {
    id: 'fb-gh3-1',
    student_name: 'Ritika Pradhan',
    roll_number: '23EC019',
    room_number: '304-B',
    hostel_name: 'GH-3 (Girls Hostel 3)',
    meal: 'lunch',
    food_item: 'Chole Bhature',
    rating: 5,
    comment: 'Bhature were fluffy and not greasy at all. Chole tasted authentic!',
    image_url: null,
    sentiment: 'positive',
    helpful_count: 10,
    created_at: new Date(Date.now() - 3600000 * 16).toISOString(),
    admin_reply: 'Thank you Ritika!'
  },
  {
    id: 'fb-gh3-2',
    student_name: 'Swati Das',
    roll_number: '22CS144',
    room_number: '108-A',
    hostel_name: 'GH-3 (Girls Hostel 3)',
    meal: 'snacks',
    food_item: 'Veg Cutlet',
    rating: 2,
    comment: 'Cutlets were cold by the time we arrived at 5:30 PM. Please maintain hot cases.',
    image_url: null,
    sentiment: 'negative',
    helpful_count: 9,
    created_at: new Date(Date.now() - 3600000 * 30).toISOString(),
    admin_reply: 'Heating warmers will be kept on until 6:00 PM.'
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
