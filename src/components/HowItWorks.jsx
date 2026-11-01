import { CreditCard, Sparkles, UserPlus, Store } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const steps = [
  {
    title: 'ثبت‌نام در نت‌یار',
    description: 'در کمتر از یک دقیقه حساب کاربری خود را بسازید.',
    icon: UserPlus,
  },
  {
    title: 'ایجاد حساب کافی‌نت',
    description: 'اطلاعات کافی‌نت و نرخ خدمات را وارد کنید.',
    icon: Store,
  },
  {
    title: 'انتخاب اشتراک',
    description: 'پلنی را انتخاب کنید که با اندازه کسب‌وکار شما هم‌خوانی دارد.',
    icon: CreditCard,
  },
  {
    title: 'استفاده از امکانات',
    description: 'حسابداری، اخبار، نرخ‌نامه و دستیار هوشمند در دسترس شماست.',
    icon: Sparkles,
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-24 overflow-hidden border-y border-white/[0.06] bg-navy-2/30 py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,138,36,0.08),transparent_65%)] blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="مسیر شروع"
          title="شروع کار با نت‌یار فقط چند قدم فاصله دارد"
          description="بدون نصب، بدون تنظیمات پیچیده؛ از ثبت‌نام تا اولین گزارش مالی، مسیر کوتاه است."
        />

        <div className="relative mt-16">
          {/* Connector line */}
          <div
            aria-hidden="true"
            className="absolute inset-x-[12%] top-7 hidden h-px bg-gradient-to-l from-transparent via-white/15 to-transparent lg:block"
          />

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {steps.map((step, index) => (
              <li key={step.title} className="relative flex flex-col items-center text-center">
                <div className="relative mb-6 grid size-14 place-items-center rounded-2xl border border-white/10 bg-navy shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)]">
                  <step.icon className="size-[22px] text-brand" />
                  <span className="numeral absolute -top-2 -end-2 grid size-6 place-items-center rounded-full bg-brand text-[10px] font-bold text-[#1b1206]">
                    {['۱', '۲', '۳', '۴'][index]}
                  </span>
                </div>
                <h3 className="text-[15px] font-bold text-white">{step.title}</h3>
                <p className="mt-2 max-w-[15rem] text-[13px] leading-7 text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
