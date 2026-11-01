import { Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'

export default function FinalCta() {
  return (
    <section id="cta" className="relative scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <div className="edge-glow relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-navy-3 via-navy-2 to-navy px-6 py-14 text-center shadow-panel sm:px-12 sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 dot-grid opacity-[0.12]" />
            <div className="absolute -top-24 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,138,36,0.32),transparent_62%)] blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-[1.65rem] font-extrabold leading-[1.4] text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.35]">
              کافی‌نت خودت رو <span className="text-gradient">هوشمندتر</span> مدیریت کن
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-muted sm:text-base">
              همین امروز به جمع کاربران نت‌یار بپیوند.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="btn-brand group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-300 sm:w-auto"
              >
                شروع رایگان
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </Link>
              <span className="flex items-center gap-2 text-[12px] text-muted/80">
                <Check className="size-3.5 text-brand" />
                بدون نیاز به کارت بانکی برای شروع
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
