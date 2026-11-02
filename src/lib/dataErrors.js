// Readable Persian copy for database/network failures in the dashboard.
export function dataErrorMessage(error) {
  if (!error) return ''

  const code = error.code ?? ''
  const message = String(error.message ?? '')

  if (code === '42P01' || code === 'PGRST205' || /could not find the table|does not exist/i.test(message)) {
    return 'جداول دیتابیس هنوز ساخته نشده‌اند؛ Migration‌های Supabase باید اجرا شوند.'
  }
  if (code === '42501' || /permission denied|row-level security/i.test(message)) {
    return 'دسترسی به این اطلاعات برای حساب شما مجاز نیست.'
  }
  if (code === 'PGRST301' || /JWT expired|invalid claim/i.test(message)) {
    return 'نشست شما منقضی شده است؛ دوباره وارد شوید.'
  }
  if (/fetch|network|failed to load/i.test(message)) {
    return 'ارتباط با سرور برقرار نشد؛ اتصال اینترنت را بررسی کنید.'
  }
  if (code === '23505') {
    return 'این اطلاعات قبلاً ثبت شده است.'
  }

  return 'دریافت اطلاعات با خطا مواجه شد؛ دوباره تلاش کنید.'
}
