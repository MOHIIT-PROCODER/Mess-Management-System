// backend/src/controllers/complaintController.js
const supabaseAdmin = require('../config/supabase');
const { successResponse, errorResponse } = require('../utils/response');

// In-memory persistent compliment store for instant fallback & demo live syncing
let persistentCompliments = [
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
  }
];

const createComplaint = async (req, res) => {
  try {
    const {
      hostel_id,
      hostel_name,
      student_name,
      roll_number,
      room_number,
      category,
      category_label,
      badge,
      impressed_with,
      title,
      description
    } = req.body;

    const newCompliment = {
      id: `kudos-${Date.now()}`,
      title: title || 'Appreciation for Kitchen & Cooks',
      category: category || 'master_chef',
      category_label: category_label || 'Master Chef Flavor',
      impressed_with: impressed_with || 'Cooks & Kitchen Team',
      badge: badge || 'Master Chef Kudos 👨‍🍳',
      description: description || '',
      student_name: student_name || 'Resident Student',
      roll_number: roll_number || '21CS089',
      room_number: room_number || '204-A',
      hostel_name: hostel_name || 'BH-7 (Boys Hostel 7)',
      likes_count: 1,
      created_at: new Date().toISOString(),
      admin_response: null
    };

    persistentCompliments.unshift(newCompliment);

    try {
      if (supabaseAdmin) {
        await supabaseAdmin.from('complaints').insert({
          hostel_id,
          category,
          title,
          description,
          status: 'acknowledged'
        });
      }
    } catch (supaErr) {
      console.warn('Supabase log notice:', supaErr.message);
    }

    return successResponse(res, 'Compliment logged successfully', newCompliment, 201);
  } catch (err) {
    return errorResponse(res, 'Failed to log compliment: ' + err.message, 500);
  }
};

const getComplaints = async (req, res) => {
  try {
    return successResponse(res, 'Compliments list retrieved', persistentCompliments);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch compliments: ' + err.message, 500);
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_response } = req.body;

    persistentCompliments = persistentCompliments.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          status: status || 'acknowledged',
          admin_response: admin_response !== undefined ? admin_response : c.admin_response
        };
      }
      return c;
    });

    return successResponse(res, 'Compliment updated', { id, status, admin_response });
  } catch (err) {
    return errorResponse(res, 'Failed to update compliment: ' + err.message, 500);
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  updateComplaintStatus
};
