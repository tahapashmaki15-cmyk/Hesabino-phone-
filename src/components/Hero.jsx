import { Link } from 'react-router-dom'
import { ArrowLeft, Check, PlayCircle, Sparkles } from 'lucide-react'
import DashboardPreview from './dashboard/DashboardPreview.jsx'

const highlights = ['رابط کاربری کاملاً فارسی', 'بدون نیاز به نصب', 'روی موبایل و دسکتاپ']

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
      {/* Backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-70" />
        <div className="absolute -top-56 right-[-12%] size-[620px] rounded-full bg-[radial-gradient(circle,rgba(255,138,36,0.22),transparent_65%)] blur-3xl" />
        <div className="absolute -top-24 left-[-16%] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(56,97,180,0.28),transparent_65%)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur">
            <Sparkles className="size-3.5 text-brand" />
            دستیار هوشمند کافی‌نت‌داران
          </span>

          <h1
            className="animate-rise mt-7 text-[2rem] font-extrabold leading-[1.35] text-white sm:text-[2.75rem] lg:text-[3.65rem] lg:leading-[1.24]"
            style={{ animationDelay: '60ms' }}
          >
            تمام ابزارهای کافی‌نت،
            <br className="hidden sm:block" />{' '}
            <span className="text-gradient">در یک پنل هوشمند</span>
          </h1>

          <p
            className="animate-rise mt-6 max-w-2xl text-sm leading-8 text-muted sm:text-base sm:leading-9"
            style={{ animationDelay: '120ms' }}
          >
            با نت‌یار، حسابداری، اخبار و سامانه‌های کاربردی، نرخ‌نامه خدمات و هوش مصنوعی را در یک محیط
            حرفه‌ای مدیریت کنید.
          </p>

          <div
            className="animate-rise mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: '180ms' }}
          >
            <Link
              to="/register"
              className="btn-brand group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-300 sm:w-auto"
            >
              شروع رایگان
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
            <a
              href="#features"
              className="glass group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] sm:w-auto"
            >
              <PlayCircle className="size-4 text-brand transition-transform duration-300 group-hover:scale-110" />
              آشنایی با امکانات
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted/90">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-3.5 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-rise mx-auto mt-16 max-w-6xl lg:mt-20" style={{ animationDelay: '240ms' }}>
          <DashboardPreview />
        </div>
      </div>
    </section>
  )
}
