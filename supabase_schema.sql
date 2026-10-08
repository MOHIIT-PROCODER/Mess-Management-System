-- MessSphere Supabase Database Schema
-- Run in Supabase SQL Editor: https://jkddzxarpduevbhcmcdl.supabase.co

-- 1. Students Table
CREATE TABLE IF NOT EXISTS public.students (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL UNIQUE,
  full_name     TEXT NOT NULL,
  roll_number   TEXT NOT NULL UNIQUE,
  room_number   TEXT,
  phone         TEXT,
  hostel_name   TEXT NOT NULL,
  hostel_id     TEXT,
  role          TEXT NOT NULL DEFAULT 'student',
  is_active     BOOLEAN DEFAULT TRUE,
  meal_plan     TEXT DEFAULT 'all',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
CREATE POLICY "Students can view own profile"
  ON public.students FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Students can update own profile"
  ON public.students FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Students can insert own profile"
  ON public.students FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Service role has full access"
  ON public.students FOR ALL USING (auth.role() = 'service_role');

-- 4. Auto-update trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Attendance Table
CREATE TABLE IF NOT EXISTS public.attendance (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  meal_type     TEXT NOT NULL CHECK (meal_type IN ('breakfast','lunch','dinner')),
  date          DATE NOT NULL DEFAULT CURRENT_DATE,
  present       BOOLEAN DEFAULT TRUE,
  scan_time     TIMESTAMPTZ DEFAULT NOW(),
  hostel_id     TEXT,
  scanned_by    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, meal_type, date)
);
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view own attendance"
  ON public.attendance FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Service role has full attendance access"
  ON public.attendance FOR ALL USING (auth.role() = 'service_role');

-- 6. Feedback Table
CREATE TABLE IF NOT EXISTS public.feedback (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID REFERENCES public.students(id) ON DELETE SET NULL,
  student_name  TEXT,
  roll_number   TEXT,
  hostel_name   TEXT,
  meal_type     TEXT,
  date          DATE DEFAULT CURRENT_DATE,
  rating        INTEGER CHECK (rating BETWEEN 1 AND 5),
  category      TEXT,
  message       TEXT,
  is_anonymous  BOOLEAN DEFAULT FALSE,
  status        TEXT DEFAULT 'pending',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can insert feedback"
  ON public.feedback FOR INSERT WITH CHECK (student_id = auth.uid() OR is_anonymous = TRUE);
CREATE POLICY "Students can view own feedback"
  ON public.feedback FOR SELECT USING (student_id = auth.uid() OR is_anonymous = TRUE);
CREATE POLICY "Service role has full feedback access"
  ON public.feedback FOR ALL USING (auth.role() = 'service_role');

-- 7. Complaints Table
CREATE TABLE IF NOT EXISTS public.complaints (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID REFERENCES public.students(id) ON DELETE SET NULL,
  student_name  TEXT,
  roll_number   TEXT,
  hostel_name   TEXT,
  category      TEXT NOT NULL,
  subject       TEXT NOT NULL,
  description   TEXT NOT NULL,
  priority      TEXT DEFAULT 'medium',
  status        TEXT DEFAULT 'open',
  response      TEXT,
  responded_by  TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can insert complaints"
  ON public.complaints FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "Students can view own complaints"
  ON public.complaints FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Service role has full complaints access"
  ON public.complaints FOR ALL USING (auth.role() = 'service_role');
