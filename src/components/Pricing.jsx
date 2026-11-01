import { ArrowLeft, Check, Sparkles } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const plans = [
  {
    name: 'پایه',
    tagline: 'برای شروع و کافی‌نت‌های کوچک',
    features: ['مدیریت یک کافی‌نت', 'حسابداری پایه و گزارش ماهانه', 'دسترسی به نرخ‌نامه شهری', 'پشتیبانی ایمیلی'],
    cta: 'شروع با پلن پایه',
  },
  {
    name: 'حرفه‌ای',
    tagline: 'انتخاب اکثر کافی‌نت‌داران',
    features: [
      'همه امکانات پلن پایه',
      'دستیار هوش مصنوعی',
      'اخبار و سامانه‌های کاربردی',
      'گزارش‌های پیشرفته و نمودارها',
      'پشتیبانی اولویت‌دار',
    ],
    cta: 'شروع رایگان',
    highlighted: true,
    badge: 'پیشنهاد نت‌یار',
  },
  {
    name: 'تجاری',
    tagline: 'برای مجموعه‌های چندشعبه‌ای',
    features: [
      'همه امکانات پلن حرفه‌ای',
      'مدیریت چند کافی‌نت و چند کاربر',
      'نقش‌ها و سطوح دسترسی سفارشی',
      'خروجی اکسل و گزارش اختصاصی',
      'پشتیبانی اختصاصی',
    ],
    cta: 'درخواست مشاوره',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 overflow-hidden border-y border-white/[0.06] bg-navy-2/30 py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 size-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,138,36,0.12),transparent_65%)] blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="تعرفه‌ها"
          title="اشتراکی متناسب با کسب‌وکار شما"
          description="هر پلن امکانات پایه را در اختیار شما می‌گذارد و با رشد کافی‌نت، می‌توانید به پلن بالاتر ارتقا دهید."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-4xl p-6 transition-all duration-300 sm:p-7 ${
                plan.highlighted
                  ? 'edge-glow bg-gradient-to-b from-brand/[0.13] to-navy-2/60 shadow-glow lg:-translate-y-2'
                  : 'border border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14]'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 start-6 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[10px] font-bold text-[#1b1206] shadow-lg">
                  <Sparkles className="size-3" />
                  {plan.badge}
                </span>
              )}

              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <p className="mt-1.5 text-[12px] text-muted">{plan.tagline}</p>

              {/* Editable price placeholder — no real pricing is defined yet. */}
              <div className="mt-6 flex items-end gap-2">
                <span className="rounded-xl border border-dashed border-white/20 px-3 py-1.5 text-sm font-semibold text-white/70">
                  مبلغ پلن
                </span>
                <span className="pb-1 text-[11px] leading-4 text-muted">
                  تومان
                  <br />
                  ماهانه
                </span>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-6 text-muted">
                    <span
                      className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${
                        plan.highlighted ? 'bg-brand/20 text-brand' : 'bg-white/[0.08] text-white/70'
                      }`}
                    >
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 ${
                  plan.highlighted
                    ? 'btn-brand'
                    : 'border border-white/12 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.08]'
                }`}
              >
                {plan.cta}
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-[12px] text-muted/70">
          مبالغ و جزئیات پلن‌ها در این نسخه نمونه هستند و پس از نهایی‌شدن تعرفه‌ها به‌روزرسانی می‌شوند.
        </p>
      </div>
    </section>
  )
}
