// backend/src/controllers/feedbackController.js
const supabaseAdmin = require('../config/supabase');
const { successResponse, errorResponse } = require('../utils/response');

let persistentFeedback = [
  {
    id: 'fb-1',
    student_name: 'Aarav Patel',
    roll_number: '21CS089',
    room_number: '204-A',
    hostel_name: 'BH-7 (Boys Hostel 7)',
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
    hostel_name: 'BH-7 (Boys Hostel 7)',
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
  }
];

const matchesHostel = (itemHostel, filterHostel) => {
  if (!filterHostel || filterHostel === 'all') return true;
  const iH = (itemHostel || '').toLowerCase().replace(/\s+/g, '');
  const fH = (filterHostel || '').toLowerCase().replace(/\s+/g, '');
  return iH.includes(fH) || fH.includes(iH);
};

const submitFeedback = async (req, res) => {
  try {
    const {
      student_name,
      roll_number,
      room_number,
      hostel_name,
      hostel_id,
      meal,
      rating,
      comment,
      food_item,
      image_url
    } = req.body;

    const numRating = Number(rating) || 5;
    const sentiment = numRating >= 4 ? 'positive' : 'negative';

    const newFeedback = {
      id: `fb-${Date.now()}`,
      student_name: student_name || 'Resident Student',
      roll_number: roll_number || '21CS089',
      room_number: room_number || '204-A',
      hostel_name: hostel_name || 'BH-7 (Boys Hostel 7)',
      meal: meal || 'lunch',
      food_item: food_item || 'Daily Mess Meal',
      rating: numRating,
      comment: comment || '',
      image_url: image_url || null,
      sentiment,
      helpful_count: 0,
      created_at: new Date().toISOString(),
      admin_reply: null
    };

    persistentFeedback.unshift(newFeedback);

    try {
      if (supabaseAdmin) {
        await supabaseAdmin.from('feedback').insert({
          hostel_id,
          meal,
          rating: numRating,
          comment: comment || '',
          food_item: food_item || '',
          image_url: image_url || null,
          sentiment
        });
      }
    } catch (supaErr) {
      console.warn('Supabase feedback insert notice:', supaErr.message);
    }

    return successResponse(res, 'Feedback submitted successfully', newFeedback, 201);
  } catch (err) {
    return errorResponse(res, 'Failed to submit feedback: ' + err.message, 500);
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const { hostel_name, meal, sentiment, search } = req.query;
    let list = [...persistentFeedback];

    if (hostel_name && hostel_name !== 'all') {
      list = list.filter((item) => matchesHostel(item.hostel_name, hostel_name));
    }
    if (meal && meal !== 'all') {
      list = list.filter((item) => (item.meal || '').toLowerCase() === meal.toLowerCase());
    }
    if (sentiment && sentiment !== 'all') {
      list = list.filter((item) => item.sentiment === sentiment);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (item) =>
          item.student_name?.toLowerCase().includes(q) ||
          item.roll_number?.toLowerCase().includes(q) ||
          item.comment?.toLowerCase().includes(q) ||
          item.food_item?.toLowerCase().includes(q)
      );
    }

    return successResponse(res, 'Feedback list retrieved', list);
  } catch (err) {
    return errorResponse(res, 'Failed to get feedback list: ' + err.message, 500);
  }
};

const getFeedbackSummary = async (req, res) => {
  try {
    const hostelName = req.query.hostel_name || req.query.hostel_id || 'all';
    let list = [...persistentFeedback];
    if (hostelName && hostelName !== 'all') {
      list = list.filter((item) => matchesHostel(item.hostel_name, hostelName));
    }

    const totalReviews = list.length || 1;
    const positiveCount = list.filter((item) => item.rating >= 4).length;
    const negativeCount = list.filter((item) => item.rating <= 3).length;
    const averageRating = list.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews;

    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    list.forEach((item) => {
      const r = Math.round(item.rating);
      if (dist[r] !== undefined) dist[r]++;
    });

    return successResponse(res, 'Feedback summary retrieved', {
      average_rating: Number(averageRating.toFixed(1)),
      total_reviews: totalReviews,
      positive_count: positiveCount,
      negative_count: negativeCount,
      positive_percentage: Math.round((positiveCount / totalReviews) * 100),
      negative_percentage: Math.round((negativeCount / totalReviews) * 100),
      ratings_distribution: dist,
      recent_feedback: list
    });
  } catch (err) {
    return errorResponse(res, 'Failed to get feedback summary: ' + err.message, 500);
  }
};

const replyFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    persistentFeedback = persistentFeedback.map((f) => {
      if (f.id === id) {
        return { ...f, admin_reply: reply };
      }
      return f;
    });

    return successResponse(res, 'Reply added successfully', { id, reply });
  } catch (err) {
    return errorResponse(res, 'Failed to reply feedback: ' + err.message, 500);
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback,
  getFeedbackSummary,
  replyFeedback
};
