-- =====================================================
-- Migration 012: Add Hostel Admin (Warden) Role
-- =====================================================

-- 1. Ensure user_role enum supports hostel_admin if enum is used
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'hostel_admin';
  END IF;
END $$;

-- 2. Add comments explaining the 4-tier hierarchy
COMMENT ON COLUMN profiles.role IS 'User role: student, hostel_admin (Hostel Warden), mess_admin (Mess Caterer/Counter In-charge), super_admin (Campus Director)';

-- 3. Sample Warden Profile insertion
INSERT INTO profiles (id, email, full_name, role, hostel_name, hostel_id)
VALUES 
  ('00000000-0000-0000-0000-000000000007', 'warden.bh7@campus.edu', 'Dr. S. K. Mahapatra (BH-7 Warden)', 'hostel_admin', 'BH-7 (Boys Hostel 7)', 'a1b2c3d4-0000-0000-0000-000000000007'),
  ('00000000-0000-0000-0000-000000000001', 'warden.bh1@campus.edu', 'Prof. R. C. Mohanty (BH-1 Warden)', 'hostel_admin', 'Aryabhata Boys Hostel (BH-1)', 'a1b2c3d4-0000-0000-0000-000000000001')
ON CONFLICT (id) DO UPDATE 
SET role = EXCLUDED.role, hostel_name = EXCLUDED.hostel_name, hostel_id = EXCLUDED.hostel_id;
