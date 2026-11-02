import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  LogOut,
  Newspaper,
  Settings,
  Sparkles,
  Tags,
  Wallet,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { roleLabels } from '../../lib/roles.js'

const navItems = [
  { to: '/dashboard', label: 'داشبورد', icon: LayoutDashboard, end: true },
  { to: '/dashboard/news', label: 'اخبار و اطلاعیه‌ها', icon: Newspaper },
  { to: '/dashboard/accounting', label: 'حسابداری', icon: Wallet },
  { to: '/dashboard/pricing', label: 'تعرفه و قیمت‌ها', icon: Tags },
  { to: '/dashboard/ai-assistant', label: 'دستیار هوشمند', icon: Sparkles },
  { to: '/dashboard/settings', label: 'تنظیمات', icon: Settings },
]

export default function DashboardLayout() {
  const { user, profile, activeCafe, activeRole, signOut } = useAuth()
  const navigate = useNavigate()
  const [signingOut, setSigningOut] = useState(false)

  const displayName = profile?.full_name || user?.email || 'کاربر نت‌یار'

  const handleSignOut = async () => {
    setSigningOut(true)
    await signOut()
    navigate('/login', { replace: true })
  }

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-[13px] transition-colors ${
      isActive
        ? 'border-brand/30 bg-brand/10 font-semibold text-brand'
        : 'border-transparent text-muted hover:border-white/10 hover:bg-white/[0.04] hover:text-white'
    }`

  return (
    <div dir="rtl" className="relative min-h-screen bg-navy">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="absolute -top-32 left-1/4 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,138,36,0.14),transparent_65%)] blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-navy/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <NavLink to="/dashboard" className="inline-flex items-center gap-2.5">
            <img src="/netyar-mark.png" alt="" className="size-9 rounded-xl object-cover ring-1 ring-white/10" />
            <span className="flex flex-col leading-none">
              <span className="brand-type text-[13px] text-white">NETYAR</span>
              <span className="mt-1 text-[10px] text-muted">نت‌یار</span>
            </span>
          </NavLink>

          <div className="flex items-center gap-2 sm:gap-3">
            {activeCafe && (
              <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-muted sm:inline-flex">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                {activeCafe.name}
              </span>
            )}

            <div className="text-left">
              <p className="max-w-[160px] truncate text-[12px] font-semibold text-white">{displayName}</p>
              <p className="text-[10px] text-muted">{roleLabels[activeRole] ?? 'بدون کافی‌نت'}</p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[12px] text-muted transition-colors hover:border-rose-400/40 hover:text-rose-200 disabled:opacity-60"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">{signingOut ? 'در حال خروج…' : 'خروج'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <aside className="hidden w-60 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-1.5 rounded-2xl border border-white/[0.07] bg-navy-2/70 p-3">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <nav className="mb-5 flex gap-1.5 overflow-x-auto pb-1 lg:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-[12px] transition-colors ${
                    isActive
                      ? 'border-brand/30 bg-brand/10 font-semibold text-brand'
                      : 'border-white/10 bg-white/[0.03] text-muted'
                  }`
                }
              >
                <item.icon className="size-3.5" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Outlet />
        </main>
      </div>
    </div>
  )
}
