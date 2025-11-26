-- Create table for storing activity images
CREATE TABLE public.activity_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activity TEXT,
  url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.activity_images ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public) to read images so the site can display them
CREATE POLICY "Anyone can read images"
ON public.activity_images
FOR SELECT
USING (true);

-- Allow authenticated users to insert/update/delete images (admin UI)
CREATE POLICY "Authenticated can manage images"
ON public.activity_images
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
