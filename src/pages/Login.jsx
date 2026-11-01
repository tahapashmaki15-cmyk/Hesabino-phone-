import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, AtSign, Lock } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import { Checkbox, Field, FormNotice, PasswordField } from '../components/auth/FormField.jsx'
import { isEmailOrMobile, messages } from '../lib/validation.js'

export default function Login() {
  const [form, setForm] = useState({ identifier: '', password: '', remember: false })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (key) => (event) => {
    const { type, checked, value } = event.target
    setForm((current) => ({ ...current, [key]: type === 'checkbox' ? checked : value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const next = {}

    if (!form.identifier.trim()) next.identifier = messages.required
    else if (!isEmailOrMobile(form.identifier)) next.identifier = messages.identifier

    if (!form.password) next.password = messages.required

    setErrors(next)
    setSubmitted(Object.keys(next).length === 0)
  }

  return (
    <AuthLayout
      title="ورود به حساب"
      subtitle="با ایمیل یا شماره موبایل خود وارد پنل نت‌یار شوید."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Field
          label="ایمیل یا شماره موبایل"
          name="identifier"
          value={form.identifier}
          onChange={update('identifier')}
          error={errors.identifier}
          placeholder="you@example.com یا 09123456789"
          icon={AtSign}
          ltr
          inputMode="email"
          autoComplete="username"
        />

        <PasswordField
          label="رمز عبور"
          name="password"
          value={form.password}
          onChange={update('password')}
          error={errors.password}
          placeholder="رمز عبور خود را وارد کنید"
          icon={Lock}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between gap-3 pt-1">
          <Checkbox id="remember" checked={form.remember} onChange={update('remember')}>
            مرا به خاطر بسپار
          </Checkbox>
          <Link
            to="/forgot-password"
            className="shrink-0 text-[12px] font-medium text-brand transition-colors hover:text-brand-2"
          >
            فراموشی رمز عبور؟
          </Link>
        </div>

        {submitted && (
          <FormNotice tone="success">
            اطلاعات معتبر است. اتصال به سامانه ورود در مرحله بعدی پروژه فعال می‌شود.
          </FormNotice>
        )}

        <button
          type="submit"
          className="btn-brand group mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300"
        >
          ورود به حساب
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
        </button>
      </form>

      <p className="mt-6 text-center text-[12px] text-muted">
        حساب کاربری ندارید؟{' '}
        <Link to="/register" className="font-semibold text-brand transition-colors hover:text-brand-2">
          ثبت‌نام رایگان
        </Link>
      </p>
    </AuthLayout>
  )
}
