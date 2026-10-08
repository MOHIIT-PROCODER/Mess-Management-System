-- 007_trophies.sql & 008_student_trophies.sql & 009_notifications.sql & 010_bug_reports.sql & 011_mess_admins.sql

-- 007_trophies.sql
CREATE TABLE IF NOT EXISTS public.trophies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    badge_icon TEXT NOT NULL,
    required_streak INT DEFAULT 7,
    points INT DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.trophies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Trophies are viewable by all" ON public.trophies FOR SELECT USING (true);
