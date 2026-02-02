-- Migration: Add seen and seen_at columns to business_leads and intern_applications tables
-- Run this migration in your Supabase SQL editor

-- Add columns to business_leads table
ALTER TABLE public.business_leads
ADD COLUMN IF NOT EXISTS seen boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS seen_at timestamptz NULL;

-- Add columns to intern_applications table
ALTER TABLE public.intern_applications
ADD COLUMN IF NOT EXISTS seen boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS seen_at timestamptz NULL;

-- Ensure RLS policies still allow anon INSERT
-- (These should already exist, but verify they allow INSERT)
-- Example RLS policies (adjust as needed for your setup):
-- 
-- For business_leads:
-- CREATE POLICY "Allow anon insert" ON public.business_leads
--   FOR INSERT TO anon
--   WITH CHECK (true);
--
-- For intern_applications:
-- CREATE POLICY "Allow anon insert" ON public.intern_applications
--   FOR INSERT TO anon
--   WITH CHECK (true);

-- Note: Admin reading should be done via service role key (SUPABASE_SERVICE_ROLE_KEY)
-- which bypasses RLS. Do NOT create SELECT policies for anon users.
