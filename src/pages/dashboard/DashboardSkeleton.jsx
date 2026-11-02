// Loading placeholders for the dashboard shell, built from the same navy cards
// as the real content so nothing jumps when the data lands.
export function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-xl bg-white/[0.06] ${className}`} />
}

export function DashboardSkeleton({ cards = 3 }) {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <div className="glass-soft rounded-3xl p-6">
        <SkeletonBlock className="h-4 w-28" />
        <SkeletonBlock className="mt-4 h-7 w-56" />
        <SkeletonBlock className="mt-3 h-3 w-72" />
        <div className="mt-6 flex gap-3">
          <SkeletonBlock className="h-10 w-36" />
          <SkeletonBlock className="h-10 w-28" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: cards }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-white/[0.07] bg-navy-2 p-5">
            <SkeletonBlock className="h-9 w-9 rounded-xl" />
            <SkeletonBlock className="mt-4 h-3.5 w-24" />
            <SkeletonBlock className="mt-3 h-3 w-40" />
            <SkeletonBlock className="mt-2 h-3 w-32" />
          </div>
        ))}
      </div>
      <span className="sr-only">در حال بارگذاری اطلاعات…</span>
    </div>
  )
}
