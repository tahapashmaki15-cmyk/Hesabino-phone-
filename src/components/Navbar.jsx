import { useEffect, useState } from 'react'
import { ArrowLeft, Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'

const links = [
  { href: '#home', label: 'خانه' },
  { href: '#features', label: 'امکانات' },
  { href: '#pricing', label: 'تعرفه‌ها' },
  { href: '#about', label: 'درباره ما' },
  { href: '#faq', label: 'سوالات متداول' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/[0.07] bg-navy/75 backdrop-blur-xl supports-[backdrop-filter]:bg-navy/60'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2.5 md:flex">
            <a
              href="#pricing"
              className="rounded-full px-4 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:text-white"
            >
              ورود
            </a>
            <a
              href="#pricing"
              className="btn-brand group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300"
            >
              ثبت‌نام رایگان
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={open}
            className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08] md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-b border-white/[0.07] bg-navy/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-1 px-5 py-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 border-t border-white/[0.07] px-5 py-4">
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="flex-1 rounded-full border border-white/12 px-4 py-2.5 text-center text-sm font-semibold text-white"
          >
            ورود
          </a>
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="btn-brand flex-1 rounded-full px-4 py-2.5 text-center text-sm font-bold"
          >
            ثبت‌نام رایگان
          </a>
        </div>
      </div>
    </header>
  )
}
