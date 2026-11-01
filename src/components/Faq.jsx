import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const faqs = [
  {
    question: 'نت‌یار چیست؟',
    answer:
      'نت‌یار یک پلتفرم مدیریت کافی‌نت است که حسابداری، اخبار و سامانه‌های کاربردی، نرخ‌نامه خدمات و دستیار هوش مصنوعی را در یک پنل واحد جمع می‌کند.',
  },
  {
    question: 'نت‌یار برای چه کسانی مناسب است؟',
    answer:
      'کافی‌نت‌داران، گیم‌نت‌ها و مجموعه‌های کوچکی که می‌خواهند درآمد و هزینه‌ها را دقیق ثبت کنند و در وقت خود صرفه‌جویی کنند.',
  },
  {
    question: 'چگونه ثبت‌نام کنم؟',
    answer:
      'روی «ثبت‌نام رایگان» بزنید، فرم کوتاه ثبت‌نام را تکمیل کنید و اطلاعات کافی‌نت خود را وارد کنید. در همان روز می‌توانید اولین گزارش را بسازید.',
  },
  {
    question: 'آیا حسابداری داخل نت‌یار است؟',
    answer:
      'بله. ثبت درآمد و هزینه، دسته‌بندی تراکنش‌ها و گزارش‌های مالی ماهانه کامل در نت‌یار انجام می‌شود و نیازی به نرم‌افزار جداگانه ندارید.',
  },
  {
    question: 'اشتراک‌ها چگونه کار می‌کنند؟',
    answer:
      'پس از انتخاب پلن، اشتراک شما فعال می‌شود و در پایان دوره می‌توانید آن را تمدید، ارتقا یا تغییر دهید. جزئیات هر پلن در صفحه تعرفه‌ها آمده است.',
  },
  {
    question: 'آیا از موبایل قابل استفاده است؟',
    answer:
      'بله. رابط نت‌یار کاملاً واکنش‌گراست و روی موبایل، تبلت و دسکتاپ تجربه یکسانی دارد.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              align="right"
              eyebrow="سوالات متداول"
              title="پاسخ سوالات پرتکرار شما"
              description="اگر پاسخ سوال خود را پیدا نکردید، تیم پشتیبانی نت‌یار در کنار شماست."
            />
            <a
              href="#cta"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.08]"
            >
              <MessageCircle className="size-4 text-brand" />
              گفت‌وگو با پشتیبانی
            </a>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const open = openIndex === index
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    open
                      ? 'border-brand/25 bg-brand/[0.05]'
                      : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                  >
                    <span className="flex items-center gap-3 text-[13px] font-semibold text-white sm:text-sm">
                      <HelpCircle className={`size-4 shrink-0 ${open ? 'text-brand' : 'text-muted/60'}`} />
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`size-4 shrink-0 transition-transform duration-300 ${
                        open ? 'rotate-180 text-brand' : 'text-muted/60'
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 ps-12 text-[13px] leading-7 text-muted">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
