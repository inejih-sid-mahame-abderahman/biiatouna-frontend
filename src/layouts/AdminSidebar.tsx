import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Brain,
  MapPin,
  BarChart3,
  Users,
  LogOut,
  Leaf,
} from 'lucide-react'
import { cn } from '@lib/utils'

interface AdminSidebarProps {
  isOpen: boolean
}

const navItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
  { path: '/admin/reports', icon: FileText, label: 'البلاغات' },
  { path: '/admin/analytics', icon: Brain, label: 'تحليلات AI' },
  { path: '/admin/heatmap', icon: MapPin, label: 'الخريطة الحرارية' },
  { path: '/admin/users', icon: Users, label: 'المستخدمين' },
]

export function AdminSidebar({ isOpen }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        'fixed right-0 top-0 h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white transition-all duration-300 z-40',
        isOpen ? 'w-72' : 'w-0 overflow-hidden'
      )}
    >
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg">بيئتنا</div>
            <div className="text-primary-400 text-xs">لوحة الإدارة</div>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 w-full">
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  )
}