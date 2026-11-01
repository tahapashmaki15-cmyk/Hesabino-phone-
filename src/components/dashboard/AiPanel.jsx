import { ArrowLeft, Sparkles } from 'lucide-react'
import Panel from './Panel.jsx'

export default function AiPanel({ className = '' }) {
  return (
    <Panel
      title="دستیار هوش مصنوعی"
      icon={Sparkles}
      accent="bg-brand/15 text-brand"
      className={className}
      action={
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-medium text-emerald-300">
          <span className="size-1.5 animate-pulse-soft rounded-full bg-emerald-400" />
          آنلاین
        </span>
      }
    >
      <div className="space-y-2">
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-te-md bg-white/[0.07] px-3 py-2 text-[11px] leading-5 text-white/85">
            گزارش مالی این ماه را خلاصه کن
          </p>
        </div>

        <div className="flex items-start gap-2">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-deep text-[#1b1206]">
            <Sparkles className="size-3" />
          </span>
          <div className="max-w-[88%] rounded-2xl rounded-ts-md border border-brand/20 bg-brand/[0.07] px-3 py-2">
            <p className="text-[11px] leading-5 text-white/90">
              گزارش آماده شد: درآمد ۳۸٬۲۰۰٬۰۰۰ تومان و رشد ۱۲٪ نسبت به ماه قبل. نمودار هزینه‌ها را هم اضافه کردم.
            </p>
            <div className="mt-2 flex gap-1.5">
              <span className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[9px] text-white/70">نمودار</span>
              <span className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[9px] text-white/70">خروجی اکسل</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-navy/60 px-2.5 py-1.5">
        <Sparkles className="size-3.5 text-muted/70" />
        <span className="flex-1 text-[10px] text-muted/70">سوال خود را بپرسید…</span>
        <span className="grid size-6 place-items-center rounded-lg bg-brand text-[#1b1206]">
          <ArrowLeft className="size-3" />
        </span>
      </div>
    </Panel>
  )
}
