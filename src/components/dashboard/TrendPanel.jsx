import { TrendingUp } from 'lucide-react'
import Panel from './Panel.jsx'

export default function TrendPanel({ className = '' }) {
  return (
    <Panel
      title="روند درآمد هفته"
      icon={TrendingUp}
      accent="bg-white/[0.07] text-white/80"
      className={className}
      action={<span className="text-[10px] text-muted">۷ روز گذشته</span>}
    >
      <div className="flex items-end justify-between">
        <p className="numeral text-[20px] font-extrabold leading-none text-white">
          ۱۲٬۴۶۰٬۰۰۰
          <span className="ms-1 text-[10px] font-medium text-muted">تومان</span>
        </p>
        <span className="numeral rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
          +۱۸٪
        </span>
      </div>

      <div className="relative mt-3 h-[86px] w-full">
        <svg viewBox="0 0 260 90" preserveAspectRatio="none" className="size-full" aria-hidden="true">
          <defs>
            <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF8A24" stopOpacity="0.36" />
              <stop offset="100%" stopColor="#FF8A24" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="trend-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFB067" />
              <stop offset="100%" stopColor="#FF8A24" />
            </linearGradient>
          </defs>
          <path
            d="M0 70 L36 56 L72 62 L108 38 L144 46 L180 22 L216 30 L260 10 L260 90 L0 90 Z"
            fill="url(#trend-fill)"
          />
          <path
            d="M0 70 L36 56 L72 62 L108 38 L144 46 L180 22 L216 30 L260 10"
            fill="none"
            stroke="url(#trend-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute end-[6%] top-[-2px] size-2 rounded-full bg-brand ring-4 ring-brand/20" />
      </div>
    </Panel>
  )
}
