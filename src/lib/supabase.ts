import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Lead {
  id?: string;
  full_name: string;
  email: string;
  phone_number: string;
  agency_name: string;
  years_experience: string;
  specializations?: string;
  consent_given: boolean;
  source?: string;
  created_at?: string;
  synced_to_crm?: boolean;
  crm_sync_at?: string | null;
}
