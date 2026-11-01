import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper, Sparkles, Wallet } from 'lucide-react'

const highlights = [
  { icon: Wallet, title: 'حسابداری یکپارچه', text: 'درآمد، هزینه و گزارش‌های مالی بدون فایل‌های پراکنده.' },
  { icon: Newspaper, title: 'اخبار و سامانه‌ها', text: 'همه لینک‌ها و اطلاعیه‌های مهم کافی‌نت، در یک‌جا.' },
  { icon: Sparkles, title: 'دستیار هوشمند', text: 'پاسخ سریع سوالات و تولید متن با هوش مصنوعی.' },
]

export default function AuthLayout({ title, subtitle, children }) {
  useEffect(() => {
    document.title = `${title} | نت‌یار`
  }, [title])

  return (
    <div dir="rtl" className="relative min-h-screen overflow-hidden bg-navy">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-lines opacity-60" />
        <div className="absolute -top-40 right-[-10%] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,138,36,0.20),transparent_65%)] blur-3xl" />
        <div className="absolute left-[-14%] top-1/3 size-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,97,180,0.24),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8">
        <header className="flex items-center justify-between gap-4">
          <Link to="/" aria-label="NETYAR — نت‌یار" className="group inline-flex items-center gap-3">
            <img
              src="/netyar-mark.png"
              alt=""
              className="size-11 rounded-2xl object-cover ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            <span className="hidden flex-col items-start leading-none sm:flex">
              <span className="brand-type text-[14px] text-white">NETYAR</span>
              <span className="mt-1.5 text-[11px] text-muted">نت‌یار</span>
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12px] text-muted transition-colors hover:border-white/20 hover:text-white"
          >
            <ArrowRight className="size-3.5" />
            بازگشت به سایت
          </Link>
        </header>

        <main className="my-auto grid w-full items-center gap-12 py-10 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
          <section className="mx-auto w-full max-w-md lg:mx-0">
            <div className="edge-glow animate-rise rounded-4xl border border-white/10 bg-white/[0.035] p-6 shadow-panel backdrop-blur-xl sm:p-8">
              <h1 className="text-xl font-extrabold leading-8 text-white sm:text-2xl">{title}</h1>
              <p className="mt-2.5 text-[13px] leading-7 text-muted">{subtitle}</p>
              <div className="mt-7">{children}</div>
            </div>

            <p className="mt-5 text-center text-[11px] leading-6 text-muted/60 lg:text-right">
              این صفحه در مرحله طراحی رابط کاربری است؛ اتصال به سامانه احراز هویت در مرحله بعد فعال می‌شود.
            </p>
          </section>

          <aside className="hidden lg:block">
            <div className="relative rounded-4xl border border-white/[0.07] bg-gradient-to-br from-white/[0.06] to-transparent p-8">
              <img src="/netyar-logo.png" alt="NETYAR — نت‌یار" className="w-52 rounded-xl" />

              <h2 className="mt-7 text-lg font-bold leading-8 text-white">
                همه ابزارهای کافی‌نت، در یک پنل هوشمند
              </h2>

              <ul className="mt-6 space-y-5">
                {highlights.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-brand/20 to-brand/[0.03] text-brand">
                      <item.icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-[12px] leading-6 text-muted">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-navy/50 px-4 py-3">
                <span className="size-1.5 animate-pulse-soft rounded-full bg-emerald-400" />
                <p className="text-[11px] text-muted">دسترسی از موبایل و دسکتاپ، بدون نیاز به نصب</p>
              </div>
            </div>
          </aside>
        </main>

        <footer className="text-center text-[11px] text-muted/50">
          © ۱۴۰۵ NETYAR — تمامی حقوق محفوظ است.
        </footer>
      </div>
    </div>
  )
}
