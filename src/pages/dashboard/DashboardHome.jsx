import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  Newspaper,
  RotateCcw,
  Settings,
  ShieldAlert,
  Sparkles,
  Store,
  Tags,
  Wallet,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { roleLabels } from '../../lib/roles.js'
import CreateCafeCard from './CreateCafeCard.jsx'
import { DashboardSkeleton } from './DashboardSkeleton.jsx'

const quickLinks = [
  { to: '/dashboard/news', label: 'اخبار و اطلاعیه‌ها', icon: Newspaper },
  { to: '/dashboard/accounting', label: 'حسابداری', icon: Wallet },
  { to: '/dashboard/pricing', label: 'تعرفه و قیمت‌ها', icon: Tags },
  { to: '/dashboard/ai-assistant', label: 'دستیار هوشمند', icon: Sparkles },
  { to: '/dashboard/settings', label: 'تنظیمات حساب', icon: Settings },
]

const formatDate = (value) => {
  if (!value) return '—'
  try {
    return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium' }).format(new Date(value))
  } catch {
    return '—'
  }
}

export default function DashboardHome() {
  const {
    user,
    profile,
    activeCafe,
    activeRole,
    memberships,
    workspaceLoading,
    workspaceError,
    refreshWorkspace,
  } = useAuth()

  if (workspaceLoading && !profile && memberships.length === 0) {
    return <DashboardSkeleton />
  }

  if (workspaceError) {
    return (
      <div className="rounded-2xl border border-rose-400/25 bg-rose-400/[0.07] p-6">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-rose-300" />
          <div>
            <p className="text-[13px] font-semibold text-white">اطلاعات حساب دریافت نشد</p>
            <p className="mt-1.5 text-[12px] leading-6 text-rose-200/90">{workspaceError}</p>
            <button
              type="button"
              onClick={refreshWorkspace}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-2 text-[12px] text-white transition-colors hover:bg-white/[0.09]"
            >
              <RotateCcw className="size-3.5" />
              تلاش دوباره
            </button>
          </div>
        </div>
      </div>
    )
  }

  const firstName = (profile?.full_name || user?.email || '').split(' ')[0]

  if (!activeCafe) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-xl font-extrabold text-white sm:text-2xl">
            {firstName ? `${firstName} عزیز، خوش آمدید` : 'خوش آمدید'}
          </h1>
          <p className="mt-2 text-[13px] leading-7 text-muted">
            برای شروع کار با نت‌یار، فضای اطلاعاتی کافی‌نت خود را بسازید.
          </p>
        </header>
        <CreateCafeCard />
      </div>
    )
  }

  const cards = [
    {
      label: 'کافی‌نت فعال',
      value: activeCafe.name,
      hint: activeCafe.city || 'شهر ثبت نشده',
      icon: Store,
    },
    {
      label: 'نقش شما',
      value: roleLabels[activeRole] ?? 'عضو',
      hint: `در ${memberships.length} کافی‌نت عضو هستید`,
      icon: ShieldAlert,
    },
    {
      label: 'تاریخ عضویت',
      value: formatDate(memberships[0]?.created_at),
      hint: profile?.phone ?? user?.email ?? '',
      icon: CalendarDays,
    },
  ]

  return (
    <div className="space-y-6">
      <header className="glass-soft rounded-3xl p-6 sm:p-7">
        <p className="text-[11px] text-muted">داشبورد نت‌یار</p>
        <h1 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
          {firstName ? `${firstName} عزیز، خوش آمدید` : 'خوش آمدید'}
        </h1>
        <p className="mt-2 text-[13px] leading-7 text-muted">
          همه ابزارهای <span className="font-semibold text-white">{activeCafe.name}</span> از همین‌جا در
          دسترس شماست.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-white/[0.07] bg-navy-2 p-5">
            <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-brand">
              <card.icon className="size-4" />
            </span>
            <p className="mt-4 text-[11px] text-muted">{card.label}</p>
            <p className="mt-1.5 truncate text-[15px] font-bold text-white">{card.value}</p>
            <p className="mt-1 truncate text-[11px] text-muted/80">{card.hint}</p>
          </article>
        ))}
      </div>

      <section className="rounded-2xl border border-white/[0.07] bg-navy-2 p-5">
        <h2 className="text-[13px] font-semibold text-white">دسترسی سریع</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-center justify-between gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-3 text-[12px] text-muted transition-colors hover:border-brand/30 hover:bg-brand/[0.06] hover:text-white"
            >
              <span className="flex items-center gap-2">
                <item.icon className="size-4 text-brand" />
                {item.label}
              </span>
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
