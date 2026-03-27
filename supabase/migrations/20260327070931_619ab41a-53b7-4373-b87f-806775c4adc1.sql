
-- Design Idea Categories
CREATE TABLE public.design_idea_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  seo_content text,
  cover_image text,
  icon text,
  meta_title text,
  meta_description text,
  sort_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Design Ideas
CREATE TABLE public.design_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.design_idea_categories(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  images jsonb DEFAULT '[]'::jsonb,
  layout text,
  room_dimension text,
  style text,
  colours jsonb DEFAULT '[]'::jsonb,
  shutter_finish jsonb DEFAULT '[]'::jsonb,
  countertop_material text,
  backsplash text,
  storage_features text,
  special_features text,
  ideal_for text,
  description text,
  short_description text,
  tags text[] DEFAULT '{}'::text[],
  is_trending boolean DEFAULT false,
  is_published boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  meta_title text,
  meta_description text,
  focus_keyword text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.design_idea_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_ideas ENABLE ROW LEVEL SECURITY;

-- RLS for categories
CREATE POLICY "Public can read published categories" ON public.design_idea_categories
  FOR SELECT TO public USING (is_published = true);

CREATE POLICY "Admins can manage categories" ON public.design_idea_categories
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS for design ideas
CREATE POLICY "Public can read published design ideas" ON public.design_ideas
  FOR SELECT TO public USING (is_published = true);

CREATE POLICY "Admins can manage design ideas" ON public.design_ideas
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Updated_at triggers
CREATE TRIGGER update_design_idea_categories_updated_at
  BEFORE UPDATE ON public.design_idea_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_design_ideas_updated_at
  BEFORE UPDATE ON public.design_ideas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
