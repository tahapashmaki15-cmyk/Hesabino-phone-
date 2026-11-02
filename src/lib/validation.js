// Lightweight validators for the auth forms. Values are normalized to Latin
// digits before checking, so Persian/Arabic digits typed by users still pass.

const toLatinDigits = (value) =>
  String(value).replace(/[۰-۹٠-٩]/g, (char) => {
    const code = char.charCodeAt(0)
    const digit = code >= 0x06f0 && code <= 0x06f9 ? code - 0x06f0 : code - 0x0660
    return String(digit)
  })

export const normalizeDigits = (value = '') => toLatinDigits(value)

const compact = (value = '') => normalizeDigits(value).replace(/[\s()-]/g, '')

export const isValidEmail = (value = '') =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())

export const isValidMobile = (value = '') => /^09\d{9}$/.test(compact(value))

export const isEmailOrMobile = (value = '') =>
  isValidEmail(value) || isValidMobile(value)

export const isValidPassword = (value = '') => value.length >= 8

export const messages = {
  required: 'این فیلد را تکمیل کنید.',
  identifier: 'ایمیل یا شماره موبایل معتبر وارد کنید.',
  mobile: 'شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد.',
  email: 'ایمیل واردشده معتبر نیست.',
  password: 'رمز عبور باید حداقل ۸ کاراکتر باشد.',
  confirm: 'تکرار رمز عبور با رمز عبور یکسان نیست.',
  terms: 'برای ساخت حساب باید قوانین و شرایط استفاده را بپذیرید.',
}
