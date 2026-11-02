import { createClient } from '@supabase/supabase-js'

// Project URL and the public (anon) key are read from the environment so the
// same code works for any Supabase project. Both are safe to expose to the
// browser — access control lives in Supabase's Row Level Security policies.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null
