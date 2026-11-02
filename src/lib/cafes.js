import { supabase } from './supabase.js'

// Everything the signed-in shell needs, read through RLS: the user's profile
// and their cafe memberships (with the cafe row each one points at).
export async function loadWorkspace(userId) {
  const [profileResult, membershipResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, full_name, phone, created_at')
      .eq('id', userId)
      .maybeSingle(),
    supabase
      .from('cafe_members')
      .select('role, created_at, cafe:cafes (id, name, city, owner_id, created_at)')
      .eq('user_id', userId)
      .order('created_at', { ascending: true }),
  ])

  if (profileResult.error) throw profileResult.error
  if (membershipResult.error) throw membershipResult.error

  return {
    profile: profileResult.data ?? null,
    memberships: (membershipResult.data ?? []).filter((row) => row.cafe),
  }
}

// Cafe + owner membership are created atomically in the database.
export async function createCafe({ name, city }) {
  const { data, error } = await supabase.rpc('create_cafe', {
    p_name: name,
    p_city: city || null,
  })
  if (error) throw error
  return data
}

// Server-side duplicate check for the mobile number before signUp.
export async function isPhoneRegistered(phone) {
  if (!supabase || !phone) return false
  const { data, error } = await supabase.rpc('is_phone_registered', { p_phone: phone })
  if (error) return false // the unique constraint still blocks duplicates on insert
  return Boolean(data)
}
