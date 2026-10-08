-- 005_feedback.sql
-- Create Feedback & Ratings table

CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    hostel_id UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    meal meal_type NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    food_item TEXT,
    image_url TEXT,
    sentiment TEXT DEFAULT 'neutral' CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Feedback viewable by authenticated users" 
ON public.feedback FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Students can insert their feedback" 
ON public.feedback FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_feedback_hostel ON public.feedback(hostel_id);
