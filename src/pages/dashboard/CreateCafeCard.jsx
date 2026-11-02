import { useState } from 'react'
import { ArrowLeft, MapPin, Store } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { createCafe } from '../../lib/cafes.js'
import { dataErrorMessage } from '../../lib/dataErrors.js'
import { Field, FormNotice } from '../../components/auth/FormField.jsx'

// First-run step for a signed-in user who has no cafe yet. The name they typed
// at signup comes back as the field's initial value.
export default function CreateCafeCard() {
  const { user, refreshWorkspace } = useAuth()
  const [form, setForm] = useState({ name: user?.user_metadata?.cafe_name ?? '', city: '' })
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [pending, setPending] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (form.name.trim().length < 2) {
      setError('نام کافی‌نت باید حداقل ۲ کاراکتر باشد.')
      return
    }

    setError('')
    setNotice('')
    setPending(true)
    try {
      await createCafe({ name: form.name.trim(), city: form.city.trim() })
      await refreshWorkspace()
    } catch (failure) {
      setNotice(dataErrorMessage(failure))
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-xl">
      <div className="glass-soft rounded-3xl p-6 sm:p-8">
        <span className="grid size-12 place-items-center rounded-2xl border border-brand/25 bg-brand/10 text-brand">
          <Store className="size-5" />
        </span>
        <h2 className="mt-5 text-lg font-bold text-white">کافی‌نت خود را بسازید</h2>
        <p className="mt-2 text-[13px] leading-7 text-muted">
          هنوز عضو هیچ کافی‌نتی نیستید. با ساخت کافی‌نت، فضای اطلاعاتی مستقل خود را در نت‌یار تحویل
          می‌گیرید و می‌توانید همکارانتان را به آن اضافه کنید.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <Field
            label="نام کافی‌نت"
            name="cafeName"
            value={form.name}
            onChange={(event) => {
              setForm((current) => ({ ...current, name: event.target.value }))
              setError('')
              setNotice('')
            }}
            error={error}
            placeholder="مثلاً کافی‌نت سپهر"
            icon={Store}
            autoComplete="organization"
          />

          <Field
            label="شهر (اختیاری)"
            name="city"
            value={form.city}
            onChange={(event) => {
              setForm((current) => ({ ...current, city: event.target.value }))
              setNotice('')
            }}
            placeholder="مثلاً تهران"
            icon={MapPin}
          />

          {notice && <FormNotice tone="error">{notice}</FormNotice>}

          <button
            type="submit"
            disabled={pending}
            className="btn-brand group flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? 'در حال ساخت کافی‌نت…' : 'ساخت کافی‌نت'}
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
        </form>
      </div>
    </section>
  )
}
