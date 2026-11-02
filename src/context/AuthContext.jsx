import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { loadWorkspace } from '../lib/cafes.js'
import { dataErrorMessage } from '../lib/dataErrors.js'
import { supabase } from '../lib/supabase.js'

const AuthContext = createContext(null)

// Owns the Supabase session and the signed-in user's workspace (profile +
// cafe memberships). Guards wait for `initializing` so the dashboard never
// flashes for an anonymous visitor.
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [initializing, setInitializing] = useState(true)
  const [profile, setProfile] = useState(null)
  const [memberships, setMemberships] = useState([])
  const [workspaceLoading, setWorkspaceLoading] = useState(false)
  const [workspaceError, setWorkspaceError] = useState('')

  useEffect(() => {
    if (!supabase) {
      setInitializing(false)
      return undefined
    }

    let active = true

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return
        setSession(data.session ?? null)
        setInitializing(false)
      })
      .catch(() => {
        if (!active) return
        setSession(null)
        setInitializing(false)
      })

    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession ?? null)
      if (event === 'SIGNED_OUT' || !nextSession) {
        setProfile(null)
        setMemberships([])
        setWorkspaceError('')
      }
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const userId = session?.user?.id ?? null

  const refreshWorkspace = useCallback(async () => {
    if (!userId || !supabase) {
      setProfile(null)
      setMemberships([])
      return
    }

    setWorkspaceLoading(true)
    setWorkspaceError('')
    try {
      const data = await loadWorkspace(userId)
      setProfile(data.profile)
      setMemberships(data.memberships)
    } catch (error) {
      setWorkspaceError(dataErrorMessage(error))
    } finally {
      setWorkspaceLoading(false)
    }
  }, [userId])

  useEffect(() => {
    refreshWorkspace()
  }, [refreshWorkspace])

  const signOut = useCallback(async () => {
    if (!supabase) return null
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setProfile(null)
      setMemberships([])
    }
    return error ?? null
  }, [])

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      initializing,
      isConfigured: Boolean(supabase),
      profile,
      memberships,
      activeCafe: memberships[0]?.cafe ?? null,
      activeRole: memberships[0]?.role ?? null,
      workspaceLoading,
      workspaceError,
      refreshWorkspace,
      signOut,
    }),
    [session, initializing, profile, memberships, workspaceLoading, workspaceError, refreshWorkspace, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
