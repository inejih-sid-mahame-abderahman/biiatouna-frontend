import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🌿</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-800">بيئتنا</h1>
              <p className="text-xs text-green-600">معًا من أجل موريتانيا أنظف</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/report')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            أبلغ الآن
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            ساهم في تنظيف موريتانيا
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            أبلغ عن المشاكل البيئية وسنساعد في حلها
          </p>
          <button 
            onClick={() => navigate('/report')}
            className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
          >
            أرسل بلاغًا جديدًا
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">1,234</div>
              <p>بلاغ تم استقبالها</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">892</div>
              <p>مشكلة تم حلها</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">18</div>
              <p>منطقة مغطاة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 بيئتنا - جميع الحقوق محفوظة</p>
          <p className="text-gray-400 text-sm mt-2">معًا من أجل موريتانيا أنظف</p>
        </div>
      </footer>
    </div>
  )
}