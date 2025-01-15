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
      detectSessionInUrl: true,
    },
    global: {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    },
    db: {
      schema: 'public'
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
);

// Add error handling wrapper
export const fetchFromSupabase = async <T>(
  operation: () => Promise<{ data: T | null; error: any }>
) => {
  try {
    const { data, error } = await operation();
    if (error) {
      console.error('Supabase operation error:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Supabase fetch error:', error);
    throw error;
  }
};