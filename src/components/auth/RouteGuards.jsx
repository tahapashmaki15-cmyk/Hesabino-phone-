import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

// Shown while the session is being restored from storage: keeps the dashboard
// (and the login form) from flashing before we know who the visitor is.
export function AuthBootScreen() {
  return (
    <div dir="rtl" className="grid min-h-screen place-items-center bg-navy px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <img
          src="/netyar-mark.png"
          alt=""
          className="size-14 rounded-2xl object-cover ring-1 ring-white/10"
        />
        <span className="size-6 animate-spin rounded-full border-2 border-white/15 border-t-brand" />
        <p className="text-[12px] text-muted">در حال بررسی نشست…</p>
      </div>
    </div>
  )
}

export function ProtectedRoute() {
  const { session, initializing } = useAuth()
  const location = useLocation()

  if (initializing) return <AuthBootScreen />
  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
  }
  return <Outlet />
}

// Signed-in users never see the auth screens again.
export function PublicOnlyRoute() {
  const { session, initializing } = useAuth()

  if (initializing) return <AuthBootScreen />
  if (session) return <Navigate to="/dashboard" replace />
  return <Outlet />
}
