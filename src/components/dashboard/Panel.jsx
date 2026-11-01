export default function Panel({ title, icon: Icon, action, accent, className = '', children }) {
  return (
    <div className={`glass-soft rounded-2xl p-3.5 ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {Icon && (
            <span
              className={`grid size-6 place-items-center rounded-lg ${
                accent ?? 'bg-white/[0.07] text-muted'
              }`}
            >
              <Icon className="size-3.5" />
            </span>
          )}
          <span className="text-[11px] font-semibold text-white/85">{title}</span>
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}
