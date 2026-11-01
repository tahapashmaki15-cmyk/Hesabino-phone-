import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Lock, Mail, Smartphone, Store, User } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import { Checkbox, Field, FormNotice, PasswordField } from '../components/auth/FormField.jsx'
import { isValidEmail, isValidMobile, isValidPassword, messages } from '../lib/validation.js'

const emptyForm = {
  fullName: '',
  cafeName: '',
  mobile: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
}

export default function Register() {
  const [form, setForm] = useState(emptyForm)
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

    if (!form.fullName.trim()) next.fullName = messages.required
    if (!form.cafeName.trim()) next.cafeName = messages.required

    if (!form.mobile.trim()) next.mobile = messages.required
    else if (!isValidMobile(form.mobile)) next.mobile = messages.mobile

    if (!form.email.trim()) next.email = messages.required
    else if (!isValidEmail(form.email)) next.email = messages.email

    if (!form.password) next.password = messages.required
    else if (!isValidPassword(form.password)) next.password = messages.password

    if (!form.confirmPassword) next.confirmPassword = messages.required
    else if (form.confirmPassword !== form.password) next.confirmPassword = messages.confirm

    if (!form.terms) next.terms = messages.terms

    setErrors(next)
    setSubmitted(Object.keys(next).length === 0)
  }

  return (
    <AuthLayout
      title="ساخت حساب کاربری"
      subtitle="اطلاعات کافی‌نت خود را وارد کنید و در چند ثانیه حساب نت‌یار خود را بسازید."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="نام و نام خانوادگی"
            name="fullName"
            value={form.fullName}
            onChange={update('fullName')}
            error={errors.fullName}
            placeholder="مثلاً سارا محمدی"
            icon={User}
            autoComplete="name"
          />
          <Field
            label="نام کافی‌نت"
            name="cafeName"
            value={form.cafeName}
            onChange={update('cafeName')}
            error={errors.cafeName}
            placeholder="مثلاً کافی‌نت سپهر"
            icon={Store}
            autoComplete="organization"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="شماره موبایل"
            name="mobile"
            value={form.mobile}
            onChange={update('mobile')}
            error={errors.mobile}
            placeholder="09123456789"
            icon={Smartphone}
            ltr
            inputMode="tel"
            autoComplete="tel"
          />
          <Field
            label="ایمیل"
            name="email"
            value={form.email}
            onChange={update('email')}
            error={errors.email}
            placeholder="you@example.com"
            icon={Mail}
            ltr
            inputMode="email"
            autoComplete="email"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <PasswordField
            label="رمز عبور"
            name="password"
            value={form.password}
            onChange={update('password')}
            error={errors.password}
            placeholder="حداقل ۸ کاراکتر"
            icon={Lock}
            autoComplete="new-password"
          />
          <PasswordField
            label="تکرار رمز عبور"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={update('confirmPassword')}
            error={errors.confirmPassword}
            placeholder="رمز عبور را دوباره وارد کنید"
            icon={Lock}
            autoComplete="new-password"
          />
        </div>

        <Checkbox id="terms" checked={form.terms} onChange={update('terms')} error={errors.terms}>
          <a href="#" className="font-medium text-white/85 underline-offset-4 hover:underline">
            قوانین و شرایط استفاده
          </a>{' '}
          و{' '}
          <a href="#" className="font-medium text-white/85 underline-offset-4 hover:underline">
            سیاست حریم خصوصی
          </a>{' '}
          نت‌یار را می‌پذیرم.
        </Checkbox>

        {submitted && (
          <FormNotice tone="success">
            اطلاعات شما معتبر است. ساخت حساب و اتصال به پایگاه داده در مرحله بعدی پروژه فعال می‌شود.
          </FormNotice>
        )}

        <button
          type="submit"
          className="btn-brand group mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300"
        >
          ایجاد حساب کاربری
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
        </button>
      </form>

      <p className="mt-6 text-center text-[12px] text-muted">
        قبلاً ثبت‌نام کرده‌اید؟{' '}
        <Link to="/login" className="font-semibold text-brand transition-colors hover:text-brand-2">
          ورود به حساب
        </Link>
      </p>
    </AuthLayout>
  )
}
