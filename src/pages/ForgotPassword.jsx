import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, AtSign, CheckCircle2, RotateCcw } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import { Field } from '../components/auth/FormField.jsx'
import { isEmailOrMobile, messages } from '../lib/validation.js'

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!identifier.trim()) {
      setError(messages.required)
      return
    }
    if (!isEmailOrMobile(identifier)) {
      setError(messages.identifier)
      return
    }

    setError('')
    setSent(true)
  }

  return (
    <AuthLayout
      title="بازیابی رمز عبور"
      subtitle="ایمیل یا شماره موبایل حساب خود را وارد کنید تا راهنمای بازیابی برای شما ارسال شود."
    >
      {sent ? (
        <div className="space-y-5">
          <div className="flex flex-col items-center rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] px-5 py-7 text-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-emerald-400/12 text-emerald-300">
              <CheckCircle2 className="size-6" />
            </span>
            <p className="mt-4 text-[13px] font-semibold text-white">درخواست بازیابی ثبت شد</p>
            <p className="mt-2 text-[12px] leading-6 text-muted">
              اگر این ایمیل یا شماره موبایل در نت‌یار ثبت شده باشد، لینک بازیابی رمز عبور برای شما ارسال
              می‌شود. این لینک تا چند دقیقه آینده معتبر است.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSent(false)
              setIdentifier('')
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] py-3 text-[13px] font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.08]"
          >
            <RotateCcw className="size-4 text-brand" />
            ارسال درخواست برای شناسه دیگر
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Field
            label="ایمیل یا شماره موبایل"
            name="identifier"
            value={identifier}
            onChange={(event) => {
              setIdentifier(event.target.value)
              setError('')
            }}
            error={error}
            placeholder="you@example.com یا 09123456789"
            icon={AtSign}
            ltr
            inputMode="email"
            autoComplete="username"
          />

          <button
            type="submit"
            className="btn-brand group mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300"
          >
            ارسال درخواست بازیابی
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-[12px] text-muted">
        به صفحه ورود برگردید؟{' '}
        <Link to="/login" className="font-semibold text-brand transition-colors hover:text-brand-2">
          ورود به حساب
        </Link>
      </p>
    </AuthLayout>
  )
}
