import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '@components/layout/AdminSidebar'
import { AdminTopbar } from '@components/layout/AdminTopbar'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminTopbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'mr-72' : 'mr-0'}`}
        >
          <div className="p-6">
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  )
}