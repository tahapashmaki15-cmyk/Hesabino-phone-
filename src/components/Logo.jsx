export default function Logo({ className = '', href = '#home' }) {
  return (
    <a
      href={href}
      aria-label="NETYAR — نت‌یار"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <img
        src="/netyar-mark.png"
        alt=""
        className="size-11 shrink-0 rounded-2xl object-cover ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      <span className="flex flex-col items-start leading-none">
        <span className="brand-type text-[15px] text-white">NETYAR</span>
        <span className="mt-1.5 text-[11px] font-medium tracking-wide text-muted">نت‌یار</span>
      </span>
    </a>
  )
}
