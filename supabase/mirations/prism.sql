/*
  # Create reviews table for spa website

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `city` (text, optional)
      - `service` (text, optional)
      - `review` (text, required, max 2000 chars)
      - `rating` (integer, 1-5)
      - `avatar_url` (text, optional)
      - `published` (boolean, default false)
      - `deleted` (boolean, default false)
      - `created_at` (timestamptz)
      - `published_at` (timestamptz, optional)
      - `moderated_by` (text, optional)

  2. Security
    - Enable RLS on `reviews` table
    - Add policies for public read (published only) and admin access
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  city text,
  service text,
  review text NOT NULL CHECK (char_length(review) <= 2000 AND char_length(review) >= 20),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  avatar_url text,
  published boolean DEFAULT false,
  deleted boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  published_at timestamptz,
  moderated_by text
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy for public to read published reviews only
CREATE POLICY "Public can read published reviews"
  ON reviews
  FOR SELECT
  TO anon, authenticated
  USING (published = true AND deleted = false);

-- Policy for service role (admin) to manage all reviews
CREATE POLICY "Service role can manage all reviews"
  ON reviews
  FOR ALL
  TO service_role
  USING (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS reviews_published_idx ON reviews (published, published_at DESC) WHERE deleted = false;
CREATE INDEX IF NOT EXISTS reviews_email_idx ON reviews (email, created_at DESC);