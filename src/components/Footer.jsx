import { Instagram, Mail, Send, ShieldCheck } from 'lucide-react'

const columns = [
  {
    title: 'محصول',
    links: [
      { label: 'امکانات', href: '#features' },
      { label: 'تعرفه‌ها', href: '#pricing' },
      { label: 'نمای محصول', href: '#showcase' },
      { label: 'سوالات متداول', href: '#faq' },
    ],
  },
  {
    title: 'نت‌یار',
    links: [
      { label: 'درباره ما', href: '#about' },
      { label: 'راهنمای شروع', href: '#how' },
      { label: 'وبلاگ', href: '#about' },
      { label: 'تماس با ما', href: '#footer-contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-navy-2/40">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#home" className="inline-block" aria-label="NETYAR — نت‌یار">
              <img
                src="/netyar-logo.png"
                alt="NETYAR — نت‌یار"
                className="h-auto w-56 rounded-2xl ring-1 ring-white/[0.07]"
              />
            </a>
            <p className="mt-5 max-w-xs text-[13px] leading-7 text-muted">
              نت‌یار، دستیار هوشمند کافی‌نت‌داران؛ حسابداری، اخبار و سامانه‌ها، نرخ‌نامه و هوش مصنوعی در یک
              پنل حرفه‌ای و فارسی.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: Instagram, label: 'اینستاگرام' },
                { icon: Send, label: 'تلگرام' },
                { icon: Mail, label: 'ایمیل' },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  aria-label={item.label}
                  className="grid size-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-muted transition-colors hover:border-brand/30 hover:text-brand"
                >
                  <item.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[13px] font-bold text-white">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-muted transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div id="footer-contact">
            <h3 className="text-[13px] font-bold text-white">ارتباط با ما</h3>
            <ul className="mt-4 space-y-3 text-[13px] text-muted">
              <li>
                <a href="mailto:info@netyar.ir" className="transition-colors hover:text-white" dir="ltr">
                  info@netyar.ir
                </a>
              </li>
              <li>پشتیبانی فارسی، همه روزه</li>
              <li className="flex items-center gap-1.5 text-[12px] text-muted/80">
                <ShieldCheck className="size-3.5 text-brand" />
                پاسخ‌گویی در کمتر از ۲۴ ساعت
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-6 text-[12px] text-muted/70 sm:flex-row">
          <p>© ۱۴۰۵ NETYAR — تمامی حقوق محفوظ است.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-white">
              قوانین و مقررات
            </a>
            <a href="#" className="transition-colors hover:text-white">
              حریم خصوصی
            </a>
            <a href="/app/" className="transition-colors hover:text-white">
              نسخه آزمایشی دفتر حساب
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
