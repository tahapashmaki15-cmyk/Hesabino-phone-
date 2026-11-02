import {
  BarChart3,
  Bot,
  CircleDollarSign,
  LayoutDashboard,
  MapPin,
  Receipt,
  Search,
  Settings,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

function Frame({ title, children, className = '' }) {
  return (
    <figure
      className={`group overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.015] transition-all duration-300 hover:border-white/[0.14] ${className}`}
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <span className="text-[11px] font-semibold text-white/80">{title}</span>
        <span className="flex gap-1.5">
          <span className="size-1.5 rounded-full bg-white/15" />
          <span className="size-1.5 rounded-full bg-white/15" />
          <span className="size-1.5 rounded-full bg-white/15" />
        </span>
      </figcaption>
      <div className="p-3.5 sm:p-4">{children}</div>
    </figure>
  )
}

function DashboardShot() {
  return (
    <div className="flex gap-3">
      <aside className="hidden w-10 shrink-0 flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-navy/70 py-3 sm:flex">
        {[LayoutDashboard, Receipt, Wallet, Bot, Settings].map((Icon, i) => (
          <span
            key={i}
            className={`grid size-7 place-items-center rounded-lg ${
              i === 0 ? 'bg-brand/15 text-brand' : 'text-muted/50'
            }`}
          >
            <Icon className="size-3.5" />
          </span>
        ))}
      </aside>

      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-white">خوش آمدید، مدیر</p>
            <p className="mt-0.5 text-[9px] text-muted">خلاصه وضعیت کافی‌نت شما</p>
          </div>
          <span className="numeral rounded-lg border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[9px] text-muted">
            آبان ۱۴۰۵
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'درآمد ماه', value: '۳۸٬۲۰۰٬۰۰۰', tone: 'text-brand' },
            { label: 'هزینه ماه', value: '۹٬۴۵۰٬۰۰۰', tone: 'text-white/85' },
            { label: 'سود خالص', value: '۲۸٬۷۵۰٬۰۰۰', tone: 'text-emerald-300' },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5">
              <p className="text-[9px] text-muted">{kpi.label}</p>
              <p className={`numeral mt-1 text-[11px] font-bold ${kpi.tone}`}>{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-medium text-white/75">
              <BarChart3 className="size-3 text-brand" />
              درآمد و هزینه
            </span>
            <span className="text-[9px] text-muted">۶ ماه گذشته</span>
          </div>
          <div className="mt-3 flex h-24 items-end gap-2">
            {[52, 70, 44, 84, 62, 96].map((h, i) => (
              <div key={i} className="flex flex-1 items-end gap-1">
                <div
                  className="flex-1 rounded-t-[3px] bg-gradient-to-t from-brand/35 to-brand"
                  style={{ height: `${h}%` }}
                />
                <div
                  className="flex-1 rounded-t-[3px] bg-white/10"
                  style={{ height: `${h * 0.42}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AccountingShot() {
  const rows = [
    { name: 'ساعت بازی', amount: '+ ۴۵۰٬۰۰۰', type: 'درآمد' },
    { name: 'خرید نوشیدنی', amount: '− ۱۲۰٬۰۰۰', type: 'هزینه' },
    { name: 'پرینت و اسکن', amount: '+ ۸۵٬۰۰۰', type: 'درآمد' },
    { name: 'شارژ اینترنت', amount: '− ۲۴۰٬۰۰۰', type: 'هزینه' },
  ]

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-white/80">
          <CircleDollarSign className="size-3.5 text-brand" />
          تراکنش‌های امروز
        </span>
        <span className="rounded-md bg-brand/12 px-1.5 py-0.5 text-[9px] text-brand">+ ثبت جدید</span>
      </div>
      <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.06] bg-white/[0.02] px-2.5">
        {rows.map((row) => (
          <li key={row.name} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <span
                className={`size-1.5 rounded-full ${
                  row.type === 'درآمد' ? 'bg-emerald-400' : 'bg-brand'
                }`}
              />
              <span className="text-[10px] text-white/80">{row.name}</span>
            </div>
            <span
              className={`numeral text-[10px] font-bold ${
                row.type === 'درآمد' ? 'text-emerald-300' : 'text-white/70'
              }`}
            >
              {row.amount}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-1.5">
        <span className="text-[9px] text-muted">مانده امروز</span>
        <span className="numeral text-[10px] font-bold text-brand-2">۱۷۵٬۰۰۰ تومان</span>
      </div>
    </div>
  )
}

function AiShot() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-white/80">
          <Sparkles className="size-3.5 text-brand" />
          گفت‌وگو با دستیار
        </span>
        <span className="flex items-center gap-1 text-[9px] text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-400" /> فعال
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-end">
          <span className="rounded-xl rounded-te-md bg-white/[0.07] px-2.5 py-1.5 text-[10px] text-white/80">
            بهترین ساعت کاری کافی‌نت من کیه؟
          </span>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-gradient-to-br from-brand to-brand-deep text-[#1b1206]">
            <Sparkles className="size-2.5" />
          </span>
          <span className="rounded-xl rounded-ts-md border border-brand/20 bg-brand/[0.06] px-2.5 py-1.5 text-[10px] leading-5 text-white/85">
            بر اساس داده‌های شما، بیشترین درآمد در بازه ۱۸ تا ۲۲ ثبت شده است.
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {['گزارش ماهانه', 'متن تبلیغاتی', 'تحلیل هزینه'].map((chip) => (
          <span
            key={chip}
            className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[9px] text-muted"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

function PriceShot() {
  const rows = [
    { name: 'ساعت بازی', price: '۴۵٬۰۰۰' },
    { name: 'ساعت کاری', price: '۳۵٬۰۰۰' },
    { name: 'پرینت سیاه‌وسفید', price: '۳٬۰۰۰' },
  ]

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-white/80">
          <MapPin className="size-3.5 text-brand" />
          نرخ‌نامه تهران
        </span>
        <span className="flex items-center gap-1 rounded-lg border border-white/[0.07] bg-white/[0.03] px-1.5 py-0.5 text-[9px] text-muted/70">
          <Search className="size-2.5" />
          جست‌وجو
        </span>
      </div>

      <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.06] bg-white/[0.02] px-2.5">
        {rows.map((row) => (
          <li key={row.name} className="flex items-center justify-between py-2">
            <span className="text-[10px] text-white/80">{row.name}</span>
            <span className="numeral text-[10px] font-bold text-white/90">
              {row.price}
              <span className="ms-0.5 text-[8px] font-normal text-muted">تومان</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-1.5">
        {['تهران', 'کرج', 'شیراز'].map((city, i) => (
          <span
            key={city}
            className={`rounded-lg px-2 py-1 text-[9px] ${
              i === 0 ? 'bg-white/[0.09] text-white' : 'text-muted/60'
            }`}
          >
            {city}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Showcase() {
  return (
    <section id="showcase" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="نگاهی به محصول"
          title="پنلی که هر روز با آن کار می‌کنید"
          description="تصاویر زیر بخش‌های اصلی نت‌یار را نشان می‌دهند: از داشبورد کلی تا حسابداری، دستیار هوشمند و نرخ‌نامه شهری."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          <Frame title="داشبورد کاربر" className="lg:col-span-6">
            <DashboardShot />
          </Frame>
          <Frame title="رابط حسابداری" className="lg:col-span-2">
            <AccountingShot />
          </Frame>
          <Frame title="دستیار هوش مصنوعی" className="lg:col-span-2">
            <AiShot />
          </Frame>
          <Frame title="نرخ‌نامه شهری" className="lg:col-span-2">
            <PriceShot />
          </Frame>
        </div>
      </div>
    </section>
  )
}
