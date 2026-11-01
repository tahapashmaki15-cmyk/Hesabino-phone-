export default function Logo({ className = '', href = '#home' }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="relative grid size-11 place-items-center rounded-2xl bg-navy-2 ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-0.5">
        <span className="absolute inset-0 rounded-2xl bg-brand/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
        <svg viewBox="0 0 64 64" className="relative size-6" aria-hidden="true">
          <defs>
            <linearGradient id="netyar-mark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFC48A" />
              <stop offset="100%" stopColor="#FF8A24" />
            </linearGradient>
          </defs>
          <path
            d="M14 48V16l36 32V16"
            fill="none"
            stroke="url(#netyar-mark)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col items-start leading-none">
        <span className="brand-type text-[15px] text-white">NETYAR</span>
        <span className="mt-1.5 text-[11px] font-medium tracking-wide text-muted">نت‌یار</span>
      </span>
    </a>
  )
}
