// Persian copy for the Supabase auth errors the forms can realistically hit.
// Mapped by error code first (stable), then by message (legacy responses).
const byCode = {
  invalid_credentials: 'ایمیل یا رمز عبور درست نیست.',
  email_not_confirmed: 'ایمیل شما هنوز تأیید نشده است؛ لینک تأیید را در صندوق ایمیل خود باز کنید.',
  user_already_exists: 'این ایمیل قبلاً ثبت‌نام کرده است. از صفحه ورود استفاده کنید.',
  email_exists: 'این ایمیل قبلاً ثبت‌نام کرده است. از صفحه ورود استفاده کنید.',
  over_email_send_rate_limit: 'تعداد درخواست‌ها زیاد بوده است؛ چند دقیقه بعد دوباره تلاش کنید.',
  over_request_rate_limit: 'تعداد درخواست‌ها زیاد بوده است؛ چند دقیقه بعد دوباره تلاش کنید.',
  weak_password: 'رمز عبور انتخابی به‌اندازه کافی امن نیست.',
  signup_disabled: 'ثبت‌نام در این پروژه غیرفعال است.',
  validation_failed: 'ایمیل واردشده معتبر نیست.',
}

const byMessageExtra = {
  'Forbidden use of secret API key in browser':
    'کلید Supabase نامعتبر است: باید کلید عمومی (publishable/anon) استفاده شود، نه کلید secret.',
}

const byMessage = {
  'Invalid login credentials': 'ایمیل یا رمز عبور درست نیست.',
  'Email not confirmed': 'ایمیل شما هنوز تأیید نشده است؛ لینک تأیید را در صندوق ایمیل خود باز کنید.',
  'User already registered': 'این ایمیل قبلاً ثبت‌نام کرده است. از صفحه ورود استفاده کنید.',
  'Email rate limit exceeded': 'تعداد درخواست‌ها زیاد بوده است؛ چند دقیقه بعد دوباره تلاش کنید.',
  'Password should be at least 6 characters': 'رمز عبور باید حداقل ۶ کاراکتر باشد.',
  'Unable to validate email address: invalid format': 'ایمیل واردشده معتبر نیست.',
  'Database error saving new user':
    'ثبت اطلاعات حساب ممکن نشد؛ ممکن است شماره موبایل یا ایمیل شما قبلاً ثبت شده باشد.',
}

export function authErrorMessage(error) {
  if (!error) return ''
  return byCode[error.code] ?? byMessage[error.message] ?? 'خطایی رخ داد؛ لطفاً دوباره تلاش کنید.'
}
