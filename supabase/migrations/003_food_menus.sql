-- 003_food_menus.sql
CREATE TYPE meal_type AS ENUM ('breakfast', 'lunch', 'snacks', 'dinner');

CREATE TABLE IF NOT EXISTS public.food_menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hostel_id UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
    day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    meal meal_type NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    calories INT DEFAULT 0,
    dietary_tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    image_url TEXT,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_special BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(hostel_id, day_of_week, meal)
);

ALTER TABLE public.food_menus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Food menus viewable by authenticated users" ON public.food_menus FOR SELECT USING (auth.role() = 'authenticated');
