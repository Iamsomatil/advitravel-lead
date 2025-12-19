/*
  # Create Leads Table for Advitravels Landing Page

  1. New Tables
    - `leads`
      - `id` (uuid, primary key) - Unique identifier for each lead
      - `full_name` (text) - Full name of the person submitting
      - `email` (text) - Email address for contact
      - `phone_number` (text) - Phone number for contact
      - `travel_destination` (text) - Desired travel destination
      - `travel_date` (text) - Planned travel date
      - `special_requests` (text, nullable) - Additional information or special requests
      - `consent_given` (boolean) - GDPR consent checkbox confirmation
      - `source` (text) - Traffic source (facebook_ads, google_ads, organic, etc.)
      - `created_at` (timestamptz) - Timestamp of submission
      - `synced_to_crm` (boolean) - Flag indicating if synced to external CRM
      - `crm_sync_at` (timestamptz, nullable) - Timestamp of CRM sync
  
  2. Security
    - Enable RLS on `leads` table
    - Add policy for inserting leads (public access for form submissions)
    - Add policy for reading leads (authenticated users only - for admin access)
  
  3. Important Notes
    - This table captures all lead information from the landing page
    - Public insert access is enabled to allow anonymous form submissions
    - Reading leads requires authentication for security
    - The `synced_to_crm` field tracks integration status with external CRM
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  travel_destination text NOT NULL,
  travel_date text NOT NULL,
  special_requests text DEFAULT '',
  consent_given boolean NOT NULL DEFAULT false,
  source text DEFAULT 'organic',
  created_at timestamptz DEFAULT now(),
  synced_to_crm boolean DEFAULT false,
  crm_sync_at timestamptz
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (consent_given = true);

CREATE POLICY "Authenticated users can read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries on email and created_at
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_synced ON leads(synced_to_crm);