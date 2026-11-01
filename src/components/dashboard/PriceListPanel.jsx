import { MapPin } from 'lucide-react'
import Panel from './Panel.jsx'

const rows = [
  { name: 'ساعت بازی', price: '۴۵٬۰۰۰' },
  { name: 'ساعت کاری', price: '۳۵٬۰۰۰' },
  { name: 'پرینت رنگی', price: '۸٬۰۰۰' },
  { name: 'اسکن برگه', price: '۵٬۰۰۰' },
]

export default function PriceListPanel({ className = '' }) {
  return (
    <Panel
      title="نرخ‌نامه شهری"
      icon={MapPin}
      accent="bg-emerald-400/10 text-emerald-300"
      className={className}
      action={<span className="text-[10px] text-muted">تهران</span>}
    >
      <ul className="divide-y divide-white/[0.06]">
        {rows.map((row) => (
          <li key={row.name} className="flex items-center justify-between py-[7px]">
            <span className="text-[11px] text-white/75">{row.name}</span>
            <span className="numeral text-[11px] font-bold text-white/90">
              {row.price}
              <span className="ms-0.5 text-[8px] font-normal text-muted">تومان</span>
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
