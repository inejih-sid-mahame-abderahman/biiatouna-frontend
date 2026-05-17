import { Link } from 'react-router-dom'
import { Leaf, Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold">بيئتنا</span>
            </div>
            <p className="text-gray-400 text-sm">
              منصة بيئية ذكية تهدف إلى تحسين البيئة في موريتانيا من خلال تمكين المواطنين من الإبلاغ عن المشاكل البيئية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-primary-500 transition">الرئيسية</Link></li>
              <li><Link to="/report" className="hover:text-primary-500 transition">إرسال بلاغ</Link></li>
              <li><Link to="/tracking" className="hover:text-primary-500 transition">تتبع البلاغات</Link></li>
              <li><Link to="/awareness" className="hover:text-primary-500 transition">التوعية البيئية</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@biiatouna.mr</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+222 45 25 25 25</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>نواكشوط، موريتانيا</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">النشرة البريدية</h3>
            <p className="text-gray-400 text-sm mb-4">
              اشترك لتصلك آخر المستجدات
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-4 py-2 rounded-r-lg text-gray-900"
              />
              <button className="bg-primary-600 px-4 py-2 rounded-l-lg hover:bg-primary-700 transition">
                اشتراك
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} بيئتنا. جميع الحقوق محفوظة</p>
          <p className="mt-2">معًا من أجل موريتانيا أنظف</p>
        </div>
      </div>
    </footer>
  )
}