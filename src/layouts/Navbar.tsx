import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Leaf, Bell, User, LogIn } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@components/ui/Button'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'إرسال بلاغ', path: '/report' },
    { name: 'تتبع البلاغات', path: '/tracking' },
    { name: 'التوعية', path: '/awareness' },
  ]

  return (
    <nav className="glass-effect fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Leaf className="w-8 h-8 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
            <div className="text-right">
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                بيئتنا
              </span>
              <p className="text-xs text-gray-500 hidden sm:block">معًا من أجل موريتانيا أنظف</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/login')}>
              <User className="w-5 h-5 ml-2" />
              دخول
            </Button>
            <Button className="bg-primary-600 hover:bg-primary-700">
              <LogIn className="w-4 h-4 ml-2" />
              تسجيل
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full justify-center">
                  <User className="w-4 h-4 ml-2" />
                  دخول
                </Button>
                <Button className="w-full justify-center bg-primary-600 hover:bg-primary-700">
                  <LogIn className="w-4 h-4 ml-2" />
                  تسجيل
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}