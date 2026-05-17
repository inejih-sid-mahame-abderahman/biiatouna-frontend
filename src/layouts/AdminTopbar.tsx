import { Menu, Bell, User, Search } from 'lucide-react'
import { Button } from '@components/ui/Button'

interface AdminTopbarProps {
  onMenuClick: () => void
}

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 pr-72">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="بحث..."
              className="pr-10 pl-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">أحمد محمد</p>
              <p className="text-xs text-gray-500">مدير النظام</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}