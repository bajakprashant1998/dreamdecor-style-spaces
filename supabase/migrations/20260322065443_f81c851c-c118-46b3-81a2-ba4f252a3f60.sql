
-- The leads INSERT policy is intentionally public (contact form).
-- Add rate limiting note but policy is correct by design.
-- No changes needed - the WITH CHECK (true) on leads INSERT is expected for public contact forms.

-- Add a comment to document the intentional public access
COMMENT ON POLICY "Anyone can submit leads" ON public.leads IS 'Intentionally public - allows anonymous lead form submissions from website visitors';
