// Persian copy for the Supabase auth errors the forms can realistically hit.
const translations = {
  'Invalid login credentials': 'ایمیل یا رمز عبور درست نیست.',
  'Email not confirmed': 'ایمیل شما هنوز تأیید نشده است؛ لینک تأیید را در صندوق ایمیل خود باز کنید.',
  'User already registered': 'این ایمیل قبلاً ثبت‌نام کرده است. از صفحه ورود استفاده کنید.',
  'Email rate limit exceeded': 'تعداد درخواست‌ها زیاد بوده است؛ چند دقیقه بعد دوباره تلاش کنید.',
  'Password should be at least 6 characters': 'رمز عبور باید حداقل ۶ کاراکتر باشد.',
  'Signups not allowed for this instance': 'ثبت‌نام در این پروژه غیرفعال است.',
  'Unable to validate email address: invalid format': 'ایمیل واردشده معتبر نیست.',
}

export function authErrorMessage(error) {
  if (!error) return ''
  return translations[error.message] ?? 'خطایی رخ داد؛ لطفاً دوباره تلاش کنید.'
}
