import { Outlet } from 'react-router-dom'
import { Navbar } from '@components/layout/Navbar'
import { Footer } from '@components/layout/Footer'
import { motion } from 'framer-motion'

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50/20 via-white to-secondary-50/20">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}