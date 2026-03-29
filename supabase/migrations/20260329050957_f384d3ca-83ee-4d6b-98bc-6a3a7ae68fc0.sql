CREATE TABLE public.catalogue_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.catalogue_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read catalogue categories" ON public.catalogue_categories FOR SELECT TO public USING (true);
CREATE POLICY "Admins can manage catalogue categories" ON public.catalogue_categories FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

INSERT INTO public.catalogue_categories (name, sort_order) VALUES
  ('Living Room', 1), ('Bedroom', 2), ('Office', 3), ('Kitchen', 4);