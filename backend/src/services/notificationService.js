// backend/src/services/notificationService.js
const supabaseAdmin = require('../config/supabase');

const sendUserNotification = async (userId, title, message, link = '') => {
  try {
    await supabaseAdmin.from('notifications').insert({
      user_id: userId,
      title,
      message,
      link
    });
    return true;
  } catch (err) {
    console.error('Failed to insert notification:', err);
    return false;
  }
};

module.exports = {
  sendUserNotification
};
