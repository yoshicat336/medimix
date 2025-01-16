import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lmjtidswqrpnhqbhzqlr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtanRpZHN3cXJwbmhxYmh6cWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NDMyMzUsImV4cCI6MjA1MjAxOTIzNX0.t127kimIYQGgTMxPc60rVzwXr-zAbyDWocESjp7rHBI";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }
  }
);

// Add error handling wrapper with better error logging
export const fetchFromSupabase = async <T>(
  operation: () => Promise<{ data: T | null; error: any }>
) => {
  try {
    const { data, error } = await operation();
    if (error) {
      console.error('Supabase operation error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        status: error.status
      });
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Supabase fetch error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      status: error.status
    });
    throw error;
  }
};