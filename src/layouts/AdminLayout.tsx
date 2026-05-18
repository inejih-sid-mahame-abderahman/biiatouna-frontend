import { useEffect, useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Brain,
  MapPin,
  BarChart3,
  Users,
  LogOut,
  Menu,
  X,
  Leaf,
} from 'lucide-react'

import { fetchMe, getAuthToken, getStoredUser, logoutUser, type User } from '@/lib/api'

const navItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
  { path: '/admin/reports', icon: FileText, label: 'البلاغات' },
  { path: '/admin/analysis', icon: Brain, label: 'التحليلات' },
  { path: '/admin/heatmap', icon: MapPin, label: 'المناطق الساخنة' },
  { path: '/admin/statistics', icon: BarChart3, label: 'الإحصائيات' },
  { path: '/admin/users', icon: Users, label: 'المستخدمون' },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState<User | null>(getStoredUser())
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login', { replace: true })
      return
    }

    void fetchMe()
      .then((nextUser) => {
        if (!nextUser.is_staff) {
          navigate('/dashboard', { replace: true })
          return
        }
        setUser(nextUser)
      })
      .catch(() => {
        navigate('/login', { replace: true })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-green-100 border-t-green-500" />
          <p className="text-gray-600">جارٍ تحميل لوحة الإدارة...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <aside
        className={`fixed right-0 top-0 h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white transition-all duration-300 z-50 overflow-y-auto ${
          sidebarOpen ? 'w-72' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg">بيئتنا</div>
              <div className="text-green-400 text-xs">لوحة الإدارة</div>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive ? 'bg-green-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 space-y-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 w-full"
          >
            <Users className="w-5 h-5" />
            <span>لوحة المستخدم</span>
          </button>
          <button
            onClick={() => {
              void logoutUser().finally(() => navigate('/login'))
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      <div className={`transition-all duration-300 ${sidebarOpen ? 'pr-72' : 'pr-0'}`}>
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 transition-all duration-300" style={{ right: sidebarOpen ? '18rem' : '0' }}>
          <div className="flex items-center justify-between h-full px-6">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user?.name || 'المشرف'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'لوحة الإدارة'}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{(user?.name || 'م').slice(0, 1)}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="pt-20 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
