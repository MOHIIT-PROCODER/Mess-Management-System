-- seed.sql
-- Seed initial hostel data, trophies, and sample menu items

INSERT INTO public.hostels (id, name, code, capacity, mess_capacity, description)
VALUES 
    ('a1b2c3d4-0000-0000-0000-000000000007', 'BH-7 (Boys Hostel 7)', 'BH-7', 550, 220, 'Boys residential hall 7 with modern dining mess facilities.'),
    ('a1b2c3d4-0000-0000-0000-000000000001', 'Aryabhata Boys Hostel', 'ABH-1', 450, 180, 'Primary male undergraduate residential hall with state-of-the-art mess facilities.'),
    ('a1b2c3d4-0000-0000-0000-000000000002', 'Gargi Girls Hostel', 'GGH-1', 400, 160, 'Girls residential block with attached dining hall.'),
    ('a1b2c3d4-0000-0000-0000-000000000003', 'Tagore International Hostel', 'TIH-1', 250, 100, 'Postgraduate and international student housing block.')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.trophies (id, title, description, badge_icon, required_streak, points)
VALUES
    ('t1000000-0000-0000-0000-000000000001', 'Meal Starter', 'Attended 30 meals in the month (25% progress).', '🥉', 30, 100),
    ('t1000000-0000-0000-0000-000000000002', 'Meal Pro', 'Attended 60 meals in the month (50% progress).', '🥈', 60, 250),
    ('t1000000-0000-0000-0000-000000000003', 'Meal Master', 'Attended 90 meals in the month (75% progress).', '🥇', 90, 400),
    ('t1000000-0000-0000-0000-000000000004', 'Mess Legend', 'Attended 120+ meals in the month (100% progress).', '👑', 120, 600)
ON CONFLICT DO NOTHING;

-- Sample Food Menu for Aryabhata Hostel (Monday = Day 1)
INSERT INTO public.food_menus (hostel_id, day_of_week, meal, items, calories, dietary_tags, start_time, end_time)
VALUES
    ('a1b2c3d4-0000-0000-0000-000000000001', 1, 'breakfast', '["Aloo Paratha", "Curd", "Butter", "Pickle", "Tea/Coffee", "Fresh Fruit"]'::jsonb, 550, ARRAY['veg', 'popular'], '07:30', '09:30'),
    ('a1b2c3d4-0000-0000-0000-000000000001', 1, 'lunch', '["Jeera Rice", "Dal Tadka", "Paneer Butter Masala", "Roti", "Salad", "Gulab Jamun"]'::jsonb, 850, ARRAY['veg', 'high-protein'], '12:00', '14:30'),
    ('a1b2c3d4-0000-0000-0000-000000000001', 1, 'snacks', '["Samosa", "Mint Chutney", "Masala Tea"]'::jsonb, 300, ARRAY['veg'], '17:00', '18:15'),
    ('a1b2c3d4-0000-0000-0000-000000000001', 1, 'dinner', '["Butter Naan", "Chicken Curry / Kadhai Paneer", "Veg Pulao", "Kheer"]'::jsonb, 780, ARRAY['non-veg', 'veg'], '19:30', '21:45')
ON CONFLICT DO NOTHING;
