import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, ShieldAlert, Store } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { roleLabels } from '../../lib/roles.js'
import { DashboardSkeleton } from './DashboardSkeleton.jsx'

// Shared shell for the dashboard sub-sections. They are real protected routes
// today; their tooling arrives in the next phase.
export default function DashboardSection({ title, description, icon: Icon }) {
  const { activeCafe, activeRole, workspaceLoading, workspaceError, refreshWorkspace } = useAuth()

  if (workspaceLoading) return <DashboardSkeleton cards={2} />

  if (workspaceError) {
    return (
      <div className="rounded-2xl border border-rose-400/25 bg-rose-400/[0.07] p-6">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-rose-300" />
          <div>
            <p className="text-[13px] font-semibold text-white">اطلاعات کافی‌نت دریافت نشد</p>
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

  return (
    <div className="space-y-5">
      <header className="glass-soft rounded-3xl p-6">
        <span className="grid size-11 place-items-center rounded-2xl border border-brand/25 bg-brand/10 text-brand">
          <Icon className="size-5" />
        </span>
        <h1 className="mt-4 text-lg font-extrabold text-white sm:text-xl">{title}</h1>
        <p className="mt-2 text-[13px] leading-7 text-muted">{description}</p>
        {activeCafe && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-muted">
            <Store className="size-3.5 text-brand" />
            {activeCafe.name}
            {activeRole && <span className="text-muted/70">· {roleLabels[activeRole]}</span>}
          </p>
        )}
      </header>

      {activeCafe ? (
        <section className="rounded-2xl border border-white/[0.07] bg-navy-2 p-6">
          <p className="text-[13px] font-semibold text-white">این بخش در مرحله بعدی تکمیل می‌شود</p>
          <p className="mt-2 max-w-xl text-[12px] leading-7 text-muted">
            زیرساخت حساب، کافی‌نت و دسترسی‌ها آماده است؛ ابزارهای همین بخش در فاز بعدی روی همین
            فضای اطلاعاتی ساخته می‌شوند و داده‌های کافی‌نت شما از همین‌جا در دسترس خواهد بود.
          </p>
        </section>
      ) : (
        <section className="rounded-2xl border border-white/[0.07] bg-navy-2 p-6">
          <p className="text-[13px] font-semibold text-white">هنوز عضو هیچ کافی‌نتی نیستید</p>
          <p className="mt-2 text-[12px] leading-7 text-muted">
            برای استفاده از این بخش، ابتدا فضای اطلاعاتی کافی‌نت خود را بسازید.
          </p>
          <Link
            to="/dashboard"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 px-4 py-2 text-[12px] font-semibold text-brand transition-colors hover:bg-brand/15"
          >
            ساخت کافی‌نت
            <ArrowLeft className="size-3.5" />
          </Link>
        </section>
      )}
    </div>
  )
}
