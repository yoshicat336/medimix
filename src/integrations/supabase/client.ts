import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lmjtidswqrpnhqbhzqlr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtanRpZHN3cXJwbmhxYmh6cWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NDMyMzUsImV4cCI6MjA1MjAxOTIzNX0.t127kimIYQGgTMxPc60rVzwXr-zAbyDWocESjp7rHBI";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  }
);