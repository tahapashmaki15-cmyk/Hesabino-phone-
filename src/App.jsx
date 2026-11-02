import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Newspaper, Settings, Sparkles, Tags, Wallet } from 'lucide-react'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { ProtectedRoute, PublicOnlyRoute } from './components/auth/RouteGuards.jsx'
import DashboardLayout from './pages/dashboard/DashboardLayout.jsx'
import DashboardHome from './pages/dashboard/DashboardHome.jsx'
import DashboardSection from './pages/dashboard/DashboardSection.jsx'

const sections = [
  {
    path: 'news',
    title: 'اخبار و اطلاعیه‌ها',
    description: 'خبرها و اطلاعیه‌های صنف کافی‌نت، به‌همراه لینک سامانه‌های ضروری، در یک صفحه.',
    icon: Newspaper,
  },
  {
    path: 'accounting',
    title: 'حسابداری',
    description: 'ثبت درآمد و هزینه، گزارش روزانه و صورت‌حساب‌های کافی‌نت شما.',
    icon: Wallet,
  },
  {
    path: 'pricing',
    title: 'تعرفه و قیمت‌ها',
    description: 'نرخ ساعتی، تعرفه‌های ویژه و لیست قیمت خدمات کافی‌نت.',
    icon: Tags,
  },
  {
    path: 'ai-assistant',
    title: 'دستیار هوشمند',
    description: 'پاسخ سریع به پرسش‌های کافی‌نت‌داران و تولید متن‌های آماده با هوش مصنوعی.',
    icon: Sparkles,
  },
  {
    path: 'settings',
    title: 'تنظیمات',
    description: 'اطلاعات حساب، مشخصات کافی‌نت و مدیریت دسترسی اعضا.',
    icon: Settings,
  },
]

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Guests only: a signed-in visitor is sent straight to the dashboard. */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Works for the recovery session Supabase creates, and for signed-in users. */}
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Signed-in only. */}
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          {sections.map((section) => (
            <Route
              key={section.path}
              path={section.path}
              element={
                <DashboardSection
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                />
              }
            />
          ))}
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
