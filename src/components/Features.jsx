import { ArrowUpLeft, Bot, ExternalLink, MapPin, Newspaper, Sparkles, Wallet } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

function NewsVisual() {
  const links = [
    { label: 'سامانه ثبت اطلاعات صنفی', hint: 'سامانه' },
    { label: 'نرخ‌نامه جدید خدمات کشوری', hint: 'خبر' },
    { label: 'راهنمای مالیات کسب‌وکارها', hint: 'راهنما' },
  ]

  return (
    <div className="space-y-2">
      {links.map((link) => (
        <div
          key={link.label}
          className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 transition-colors hover:border-brand/25 hover:bg-brand/[0.05]"
        >
          <div className="flex items-center gap-2.5">
            <span className="rounded-md bg-brand/12 px-1.5 py-0.5 text-[9px] font-semibold text-brand">
              {link.hint}
            </span>
            <span className="text-[11px] text-white/80">{link.label}</span>
          </div>
          <ExternalLink className="size-3 text-muted/60" />
        </div>
      ))}
    </div>
  )
}

function AccountingVisual() {
  const bars = [46, 68, 38, 84, 58, 92]
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] text-muted">درآمد ماه</p>
          <p className="numeral mt-0.5 text-base font-extrabold text-white">
            ۳۸٬۲۰۰٬۰۰۰
            <span className="ms-1 text-[9px] font-normal text-muted">تومان</span>
          </p>
        </div>
        <span className="numeral flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
          <ArrowUpLeft className="size-2.5" />
          ۱۲٪
        </span>
      </div>
      <div className="mt-3 flex h-14 items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-[3px] ${
              i === bars.length - 1
                ? 'bg-gradient-to-t from-brand/50 to-brand'
                : 'bg-gradient-to-t from-white/10 to-white/25'
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}

function PriceVisual() {
  const rows = [
    { name: 'ساعت بازی', price: '۴۵٬۰۰۰' },
    { name: 'ساعت کاری', price: '۳۵٬۰۰۰' },
  ]
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-1.5">
        {['تهران', 'مشهد', 'اصفهان'].map((city, i) => (
          <span
            key={city}
            className={`rounded-lg px-2.5 py-1 text-[10px] font-medium ${
              i === 0 ? 'bg-white/[0.09] text-white' : 'text-muted/70'
            }`}
          >
            {city}
          </span>
        ))}
      </div>
      <div className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.06] bg-white/[0.02] px-3">
        {rows.map((row) => (
          <div key={row.name} className="flex items-center justify-between py-2.5">
            <span className="text-[11px] text-white/80">{row.name}</span>
            <span className="numeral text-[11px] font-bold text-white/90">
              {row.price}
              <span className="ms-0.5 text-[8px] font-normal text-muted">تومان</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AiVisual() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-end">
        <span className="rounded-xl rounded-te-md bg-white/[0.07] px-3 py-2 text-[10px] text-white/80">
          برای کافی‌نتم یک متن تبلیغاتی بنویس
        </span>
      </div>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-deep text-[#1b1206]">
          <Sparkles className="size-3" />
        </span>
        <div className="space-y-1.5 rounded-xl rounded-ts-md border border-brand/20 bg-brand/[0.06] px-3 py-2">
          <div className="h-1.5 w-40 rounded-full bg-white/20" />
          <div className="h-1.5 w-32 rounded-full bg-white/12" />
          <div className="h-1.5 w-24 rounded-full bg-white/[0.08]" />
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    icon: Newspaper,
    title: 'اخبار و سامانه‌های کاربردی',
    description: 'دسترسی سریع به اخبار مهم و لینک سامانه‌های مورد نیاز کافی‌نت‌داران.',
    visual: NewsVisual,
  },
  {
    icon: Wallet,
    title: 'حسابداری هوشمند',
    description: 'مدیریت درآمد، هزینه و گزارش‌های مالی کافی‌نت در یک محیط یکپارچه.',
    visual: AccountingVisual,
  },
  {
    icon: MapPin,
    title: 'نرخ‌نامه شهری',
    description: 'مشاهده و مدیریت نرخ خدمات کافی‌نت بر اساس شهر و نوع خدمات.',
    visual: PriceVisual,
  },
  {
    icon: Bot,
    title: 'دستیار هوش مصنوعی',
    description: 'دستیار هوشمند برای پاسخ به سوالات، تولید متن و کمک به امور روزمره کافی‌نت.',
    visual: AiVisual,
  },
]

export default function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="right"
            eyebrow="امکانات اصلی"
            title="چهار ابزار کلیدی، در یک تجربه یکدست"
            description="هر بخش از نت‌یار برای یک نیاز واقعی کافی‌نت ساخته شده است؛ از ثبت درآمد روزانه تا پاسخ سریع دستیار هوشمند."
          />
          <a
            href="#showcase"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-2"
          >
            مشاهده تصاویر محصول
            <ArrowUpLeft className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" />
          </a>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="group relative overflow-hidden rounded-4xl border border-white/[0.07] bg-gradient-to-br from-white/[0.05] to-white/[0.015] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-panel sm:p-7"
            >
              <div className="pointer-events-none absolute -left-16 -top-16 size-44 rounded-full bg-brand/[0.07] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-brand/20 to-brand/[0.03] text-brand transition-transform duration-300 group-hover:scale-105">
                  <feature.icon className="size-[22px]" />
                </span>
                <span className="numeral text-[11px] font-semibold tracking-widest text-white/20">
                  ۰{index + 1}
                </span>
              </div>

              <h3 className="relative mt-5 text-lg font-bold text-white sm:text-xl">{feature.title}</h3>
              <p className="relative mt-2.5 max-w-md text-[13px] leading-7 text-muted sm:text-sm">
                {feature.description}
              </p>

              <div className="relative mt-6 rounded-2xl border border-white/[0.06] bg-navy/50 p-3">
                <feature.visual />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
