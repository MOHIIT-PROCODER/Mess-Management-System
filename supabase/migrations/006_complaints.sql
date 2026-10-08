-- 006_complaints.sql
-- Create Complaints table

CREATE TYPE complaint_category AS ENUM ('food_quality', 'hygiene', 'staff_behavior', 'amenities', 'other');
CREATE TYPE complaint_status AS ENUM ('pending', 'in_progress', 'resolved', 'rejected');

CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    hostel_id UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
    category complaint_category NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    status complaint_status NOT NULL DEFAULT 'pending',
    admin_response TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own complaints" 
ON public.complaints FOR SELECT USING (
    student_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.role IN ('mess_admin', 'super_admin')
    )
);

CREATE POLICY "Students can insert complaints" 
ON public.complaints FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Mess Admins & Super Admins can update complaints" 
ON public.complaints FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.role IN ('mess_admin', 'super_admin')
    )
);
