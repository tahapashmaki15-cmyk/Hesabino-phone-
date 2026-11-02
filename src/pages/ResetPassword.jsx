import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, KeyRound, ShieldAlert } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import { FormNotice, PasswordField } from '../components/auth/FormField.jsx'
import { isValidPassword, messages } from '../lib/validation.js'
import { authErrorMessage } from '../lib/authErrors.js'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/supabase.js'

// Landing page for the Supabase recovery link. Supabase puts the user in a
// short-lived session, so this route is intentionally outside the guests-only
// guard: it must work for signed-in users too.
export default function ResetPassword() {
  const { session, initializing } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState(null)
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState(false)

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setNotice(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const next = {}
    if (!form.password) next.password = messages.required
    else if (!isValidPassword(form.password)) next.password = messages.password
    if (!form.confirmPassword) next.confirmPassword = messages.required
    else if (form.confirmPassword !== form.password) next.confirmPassword = messages.confirm

    setErrors(next)
    setNotice(null)
    if (Object.keys(next).length) return

    if (!supabase) {
      setNotice({ tone: 'error', text: 'اتصال به سرویس احراز هویت کامل نشده است.' })
      return
    }

    setPending(true)
    const { error } = await supabase.auth.updateUser({ password: form.password })
    setPending(false)

    if (error) {
      setNotice({ tone: 'error', text: authErrorMessage(error) })
      return
    }

    setDone(true)
    setForm({ password: '', confirmPassword: '' })
  }

  if (initializing) {
    return (
      <AuthLayout title="بازنشانی رمز عبور" subtitle="در حال بررسی لینک بازیابی…">
        <div className="flex flex-col items-center gap-3 py-6">
          <span className="size-6 animate-spin rounded-full border-2 border-white/15 border-t-brand" />
          <p className="text-[12px] text-muted">لطفاً چند لحظه صبر کنید…</p>
        </div>
      </AuthLayout>
    )
  }

  if (!session) {
    return (
      <AuthLayout
        title="لینک بازیابی نامعتبر است"
        subtitle="لینک بازیابی رمز عبور منقضی شده یا قبلاً استفاده شده است."
      >
        <div className="flex flex-col items-center rounded-2xl border border-rose-400/25 bg-rose-400/[0.07] px-5 py-7 text-center">
          <span className="grid size-12 place-items-center rounded-2xl bg-rose-400/12 text-rose-300">
            <ShieldAlert className="size-6" />
          </span>
          <p className="mt-4 text-[13px] font-semibold text-white">دسترسی به این لینک ممکن نیست</p>
          <p className="mt-2 text-[12px] leading-6 text-muted">
            درخواست جدید بازیابی رمز عبور بدهید تا لینک تازه‌ای برای شما ارسال شود.
          </p>
        </div>

        <Link
          to="/forgot-password"
          className="btn-brand mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold"
        >
          دریافت لینک جدید
          <ArrowLeft className="size-4" />
        </Link>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="تعیین رمز عبور جدید"
      subtitle="رمز عبور تازه‌ای برای حساب نت‌یار خود انتخاب کنید."
    >
      {done ? (
        <div className="space-y-5">
          <FormNotice tone="success">رمز عبور شما با موفقیت تغییر کرد.</FormNotice>
          <button
            type="button"
            onClick={() => navigate('/dashboard', { replace: true })}
            className="btn-brand group flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300"
          >
            رفتن به داشبورد
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <PasswordField
            label="رمز عبور جدید"
            name="password"
            value={form.password}
            onChange={update('password')}
            error={errors.password}
            placeholder="حداقل ۸ کاراکتر"
            icon={KeyRound}
            autoComplete="new-password"
          />

          <PasswordField
            label="تکرار رمز عبور جدید"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={update('confirmPassword')}
            error={errors.confirmPassword}
            placeholder="رمز عبور را دوباره وارد کنید"
            icon={KeyRound}
            autoComplete="new-password"
          />

          {notice && <FormNotice tone={notice.tone}>{notice.text}</FormNotice>}

          <button
            type="submit"
            disabled={pending}
            className="btn-brand group mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? 'در حال ذخیره…' : 'ذخیره رمز عبور جدید'}
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
        </form>
      )}
    </AuthLayout>
  )
}
