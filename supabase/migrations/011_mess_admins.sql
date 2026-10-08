-- 011_mess_admins.sql
-- Table mapping mess admins to assigned hostels

CREATE TABLE IF NOT EXISTS public.mess_admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    hostel_id UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(admin_id, hostel_id)
);

ALTER TABLE public.mess_admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Mess admin mapping viewable by authenticated users" ON public.mess_admins FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Super admin can manage mess admin mapping" ON public.mess_admins FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin')
);
