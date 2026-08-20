-- SQL Script to enable public contact form submission in Supabase (https://oqgqltnqjinytcerdpwx.supabase.co)
-- Run this script in your Supabase SQL Editor: Dashboard -> SQL Editor -> New Query -> Run

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  reason TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 1. Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. Grant insert permissions to public/anon users
GRANT INSERT ON public.contact_messages TO anon, authenticated, public;

-- 3. Create RLS Policy allowing anyone to submit contact messages
DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contact_messages;
CREATE POLICY "Anyone can submit a contact message"
ON public.contact_messages
FOR INSERT
TO public
WITH CHECK (true);
