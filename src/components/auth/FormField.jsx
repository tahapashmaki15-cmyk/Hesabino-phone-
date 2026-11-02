import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const controlBase =
  'w-full rounded-xl border bg-white/[0.04] py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-muted/45 focus:bg-white/[0.07]'

const controlTone = (error) =>
  error
    ? 'border-rose-400/50 focus:border-rose-400/70 focus:ring-2 focus:ring-rose-400/15'
    : 'border-white/10 hover:border-white/20 focus:border-brand/50 focus:ring-2 focus:ring-brand/15'

export function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  icon: Icon,
  type = 'text',
  ltr = false,
  autoComplete,
  inputMode,
  className = '',
}) {
  const errorId = `${name}-error`

  return (
    <div className={className}>
      <label htmlFor={name} className="mb-2 block text-[12px] text-muted">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted/55">
            <Icon className="size-4" />
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          dir={ltr ? 'ltr' : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${controlBase} ${controlTone(error)} ${Icon ? 'pr-11 pl-4' : 'px-4'} ${
            ltr ? 'text-left' : ''
          }`}
        />
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-[11px] text-rose-300">
          {error}
        </p>
      )}
    </div>
  )
}

export function PasswordField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  icon: Icon,
  autoComplete,
  className = '',
}) {
  const [visible, setVisible] = useState(false)
  const errorId = `${name}-error`

  return (
    <div className={className}>
      <label htmlFor={name} className="mb-2 block text-[12px] text-muted">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted/55">
            <Icon className="size-4" />
          </span>
        )}
        <input
          id={name}
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          dir="ltr"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${controlBase} ${controlTone(error)} pl-11 pr-11 text-left`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'مخفی کردن رمز عبور' : 'نمایش رمز عبور'}
          aria-pressed={visible}
          className="absolute left-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-lg text-muted/70 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-[11px] text-rose-300">
          {error}
        </p>
      )}
    </div>
  )
}

export function Checkbox({ id, checked, onChange, error, children }) {
  return (
    <div>
      <div className="flex items-start gap-2.5">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-white/20 bg-white/[0.06] accent-brand"
        />
        <label htmlFor={id} className="cursor-pointer text-[12px] leading-6 text-muted">
          {children}
        </label>
      </div>
      {error && (
        <p role="alert" className="mt-1.5 ps-6.5 text-[11px] text-rose-300">
          {error}
        </p>
      )}
    </div>
  )
}

export function FormNotice({ tone = 'info', children }) {
  const tones = {
    info: 'border-white/10 bg-white/[0.04] text-muted',
    success: 'border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-200',
    error: 'border-rose-400/25 bg-rose-400/[0.08] text-rose-200',
  }

  return (
    <div role="status" className={`rounded-xl border px-3.5 py-3 text-[12px] leading-6 ${tones[tone]}`}>
      {children}
    </div>
  )
}
