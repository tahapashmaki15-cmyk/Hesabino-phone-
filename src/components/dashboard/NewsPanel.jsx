import { ArrowLeft, Newspaper } from 'lucide-react'
import Panel from './Panel.jsx'

const items = [
  { tag: 'نرخ‌نامه', tone: 'bg-brand/15 text-brand', title: 'بروزرسانی نرخ‌نامه خدمات کافی‌نت', time: '۲ ساعت پیش' },
  { tag: 'سامانه', tone: 'bg-sky-400/10 text-sky-300', title: 'ثبت اطلاعات صنفی در سامانه جدید', time: 'دیروز' },
  { tag: 'مالی', tone: 'bg-white/10 text-white/80', title: 'راهنمای تنظیم اظهارنامه مالیاتی', time: '۳ روز پیش' },
]

export default function NewsPanel({ className = '' }) {
  return (
    <Panel
      title="اخبار و سامانه‌ها"
      icon={Newspaper}
      accent="bg-white/[0.07] text-white/80"
      className={className}
      action={<ArrowLeft className="size-3.5 text-muted" />}
    >
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.title} className="group cursor-pointer">
            <div className="flex items-center gap-2">
              <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${item.tone}`}>{item.tag}</span>
              <span className="text-[9px] text-muted/70">{item.time}</span>
            </div>
            <p className="mt-1 text-[11px] leading-5 text-white/85 transition-colors group-hover:text-brand-2">
              {item.title}
            </p>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
