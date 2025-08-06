import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Guest {
  id: string
  surname: string
  first_name: string
  patronymic: string | null
  phone_number: string
  confirmed: boolean
  created_at: string
}