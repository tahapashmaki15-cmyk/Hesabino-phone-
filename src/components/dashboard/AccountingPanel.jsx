import { ArrowDownLeft, ArrowUpLeft, Wallet } from 'lucide-react'
import Panel from './Panel.jsx'

const bars = [
  { h: 34, day: 'ش' },
  { h: 52, day: 'ی' },
  { h: 28, day: 'د' },
  { h: 66, day: 'س' },
  { h: 45, day: 'چ' },
  { h: 92, day: 'پ', active: true },
  { h: 58, day: 'ج' },
]

export default function AccountingPanel({ className = '' }) {
  return (
    <Panel
      title="حسابداری"
      icon={Wallet}
      accent="bg-brand/15 text-brand"
      className={className}
      action={
        <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] text-muted">امروز</span>
      }
    >
      <p className="text-[10px] text-muted">درآمد امروز</p>
      <div className="mt-1 flex items-end justify-between gap-2">
        <div className="numeral text-[26px] font-extrabold leading-none text-white">
          ۱٬۲۴۰٬۰۰۰
          <span className="ms-1 text-[11px] font-medium text-muted">تومان</span>
        </div>
        <span className="numeral flex items-center gap-1 rounded-full bg-brand/12 px-2 py-0.5 text-[10px] font-bold text-brand">
          <ArrowUpLeft className="size-3" />
          ۱۲٪
        </span>
      </div>

      <div className="mt-4 flex h-[74px] items-end gap-1.5">
        {bars.map((bar) => (
          <div key={bar.day} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex h-[58px] w-full items-end">
              <div
                className={`w-full rounded-t-[4px] transition-all duration-500 ${
                  bar.active
                    ? 'bg-gradient-to-t from-brand/40 via-brand/80 to-brand-2 shadow-[0_0_18px_-2px_rgba(255,138,36,0.65)]'
                    : 'bg-gradient-to-t from-white/[0.06] to-white/20'
                }`}
                style={{ height: `${bar.h}%` }}
              />
            </div>
            <span className={`text-[9px] ${bar.active ? 'text-brand' : 'text-muted/60'}`}>{bar.day}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/[0.07] pt-3">
        <div>
          <p className="text-[9px] text-muted">هزینه امروز</p>
          <p className="numeral mt-1 flex items-center gap-1 text-[13px] font-bold text-white/90">
            ۳۲۰٬۰۰۰
            <ArrowDownLeft className="size-3 text-muted" />
          </p>
        </div>
        <div>
          <p className="text-[9px] text-muted">سود خالص</p>
          <p className="numeral mt-1 text-[13px] font-bold text-brand-2">۹۲۰٬۰۰۰</p>
        </div>
      </div>
    </Panel>
  )
}
