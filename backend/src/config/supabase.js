// backend/src/config/supabase.js
const { createClient } = require('@supabase/supabase-js');
const env = require('./env');

if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
  console.warn('⚠️ Supabase credentials missing in env. API will fall back to mock data mode if needed.');
}

const supabaseAdmin = createClient(
  env.supabaseUrl || '',
  env.supabaseServiceRoleKey || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

module.exports = supabaseAdmin;
