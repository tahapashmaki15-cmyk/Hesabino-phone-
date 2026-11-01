import { Clock, Layers, RefreshCw, Zap } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const benefits = [
  {
    title: 'صرفه‌جویی در زمان',
    description: 'کارهای تکراری حسابداری و گزارش‌گیری به‌صورت خودکار انجام می‌شود.',
    icon: Clock,
  },
  {
    title: 'مدیریت یکپارچه',
    description: 'همه ابزارهای کافی‌نت، بدون جابه‌جایی بین سامانه‌های مختلف.',
    icon: Layers,
  },
  {
    title: 'دسترسی سریع',
    description: 'اخبار، سامانه‌ها و نرخ‌نامه در چند کلیک و بدون جست‌وجوی اضافه.',
    icon: Zap,
  },
  {
    title: 'همیشه به‌روز',
    description: 'اطلاعات و نرخ‌نامه‌ها به‌صورت مستمر بروزرسانی می‌شوند.',
    icon: RefreshCw,
  },
]

export default function ValueProps() {
  return (
    <section id="about" className="relative scroll-mt-24 border-y border-white/[0.06] bg-navy-2/40 py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="چرا نت‌یار"
          title="مدیریت ساده‌تر، خدمات حرفه‌ای‌تر"
          description="نت‌یار تجربه روزمره مدیریت کافی‌نت را از چند ابزار پراکنده، به یک جریان کاری منظم و حرفه‌ای تبدیل می‌کند."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="absolute -right-10 -top-10 size-24 rounded-full bg-brand/[0.09] blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative grid size-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-transparent text-brand">
                <benefit.icon className="size-5" />
              </span>
              <h3 className="relative mt-5 text-[15px] font-bold text-white">{benefit.title}</h3>
              <p className="relative mt-2.5 text-[13px] leading-7 text-muted">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
