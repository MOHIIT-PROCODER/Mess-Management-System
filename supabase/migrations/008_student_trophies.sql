-- 008_student_trophies.sql
CREATE TABLE IF NOT EXISTS public.student_trophies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    trophy_id UUID NOT NULL REFERENCES public.trophies(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(student_id, trophy_id)
);

ALTER TABLE public.student_trophies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Student trophies viewable by authenticated users" ON public.student_trophies FOR SELECT USING (auth.role() = 'authenticated');
