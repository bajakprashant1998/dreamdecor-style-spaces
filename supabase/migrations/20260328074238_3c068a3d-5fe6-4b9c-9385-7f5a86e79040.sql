
CREATE TABLE public.catalogues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT 'Living Room',
  description text,
  thumbnail_url text,
  pdf_url text,
  file_size text DEFAULT '100 MB',
  tag text,
  is_published boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  download_count integer DEFAULT 0,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.catalogues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published catalogues"
  ON public.catalogues FOR SELECT TO public
  USING (is_published = true);

CREATE POLICY "Admins can manage catalogues"
  ON public.catalogues FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_catalogues_updated_at
  BEFORE UPDATE ON public.catalogues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
