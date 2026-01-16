// ============================================
// POLYMATH ACADEMY - Supabase Client
// ============================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables (set in .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if configured
export const isSupabaseConfigured = (): boolean => {
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};

// Create client (untyped for simplicity)
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper for server-side with service role
export const createServerClient = (): SupabaseClient | null => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!supabaseUrl || !serviceRoleKey) return null;
  
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

export default supabase;
