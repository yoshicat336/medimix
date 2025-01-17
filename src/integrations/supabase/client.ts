import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://lmjtidswqrpnhqbhzqlr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtanRpZHN3cXJwbmhxYmh6cWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1MTY5ODAsImV4cCI6MjAyMTA5Mjk4MH0.0e0I2ZBGb06QYBGZxkKAoTkpEEg5UT0c4sXx2pVTkXg';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});