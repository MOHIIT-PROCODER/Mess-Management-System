-- 002_hostels.sql
CREATE TABLE IF NOT EXISTS public.hostels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    code TEXT UNIQUE NOT NULL,
    capacity INT NOT NULL DEFAULT 500,
    mess_capacity INT NOT NULL DEFAULT 200,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles 
ADD CONSTRAINT fk_profiles_hostel 
FOREIGN KEY (hostel_id) REFERENCES public.hostels(id) ON DELETE SET NULL;

ALTER TABLE public.hostels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Hostels viewable by authenticated users" ON public.hostels FOR SELECT USING (auth.role() = 'authenticated');
