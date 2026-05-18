import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const stats = [
  { value: 1234, label: 'بلاغ تم استقبالها', icon: '📋', suffix: '+' },
  { value: 892, label: 'مشكلة تم حلها', icon: '✅', suffix: '' },
  { value: 18, label: 'منطقة مغطاة', icon: '📍', suffix: '' },
]

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}

function StatCard({ value, label, icon, suffix }: typeof stats[0]) {
  const count = useCountUp(value)
  return (
    <div className="text-center group">
      <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">{icon}</div>
      <div className="text-5xl font-bold mb-2 tabular-nums">
        {count.toLocaleString('ar')}{suffix}
      </div>
      <p className="text-green-100 text-lg">{label}</p>
    </div>
  )
}

const features = [
  {
    icon: '📸',
    title: 'رفع الصور',
    desc: 'أرفق صورًا للمشكلة لتسهيل التحقق والمعالجة السريعة',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
  },
  {
    icon: '📍',
    title: 'تحديد الموقع',
    desc: 'حدد موقع المشكلة بدقة باستخدام الخريطة التفاعلية',
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
  },
  {
    icon: '🔔',
    title: 'متابعة البلاغ',
    desc: 'تابع حالة بلاغك وتلقَّ إشعارات فورية عند كل تحديث',
    color: 'bg-teal-50 border-teal-200',
    iconBg: 'bg-teal-100',
  },
  {
    icon: '🤝',
    title: 'تعاون مجتمعي',
    desc: 'انضم إلى آلاف المواطنين الذين يعملون معًا لحماية البيئة',
    color: 'bg-emerald-50 border-emerald-200',
    iconBg: 'bg-emerald-100',
  },
]

const steps = [
  { num: '١', title: 'لاحظ المشكلة', desc: 'انتبه لأي مشكلة بيئية في محيطك', color: 'bg-green-500' },
  { num: '٢', title: 'أرسل البلاغ', desc: 'صف المشكلة وأرفق صورة وحدد موقعها', color: 'bg-teal-500' },
  { num: '٣', title: 'انتظر المعالجة', desc: 'تتولى الجهات المختصة دراسة بلاغك', color: 'bg-blue-500' },
  { num: '٤', title: 'تتبع الحل', desc: 'تلقَّ إشعارات عند حل المشكلة', color: 'bg-emerald-500' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" dir="rtl">

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">🌿</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-800 leading-tight">بيئتنا</h1>
              <p className="text-xs text-green-600 leading-tight">معًا من أجل موريتانيا أنظف</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-gray-700 px-5 py-2.5 rounded-xl font-semibold border border-gray-200 hover:border-green-400 hover:text-green-600 transition-all duration-200 text-sm"
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => navigate('/report')}
              className="bg-gradient-to-l from-green-500 to-teal-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm"
            >
              🚨 أبلغ الآن
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50" />
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #86efac 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #5eead4 0%, transparent 50%),
              radial-gradient(circle at 60% 80%, #93c5fd 0%, transparent 50%)`
          }}
        />
        {/* Floating shapes */}
        <div className="absolute top-32 right-10 w-20 h-20 bg-green-200/50 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-32 left-10 w-12 h-12 bg-teal-300/50 rounded-full animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-blue-200/50 rounded-full animate-bounce" style={{ animationDuration: '2.5s' }} />

        <div className="relative container mx-auto px-4 text-center py-32">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            منصة الإبلاغ البيئي الرسمية في موريتانيا
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            ساهم في حماية
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-500 to-teal-500"> بيئتنا</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            أبلغ عن المشاكل البيئية بسهولة وتابع حلها. معًا نبني موريتانيا أكثر نظافةً وجمالًا.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/report')}
              className="bg-gradient-to-l from-green-500 to-teal-500 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              🚨 أرسل بلاغًا الآن
            </button>
            <a
              href="#how-it-works"
              className="bg-white text-gray-700 px-10 py-4 rounded-2xl text-lg font-semibold border-2 border-gray-200 hover:border-green-400 hover:text-green-600 transition-all duration-300"
            >
              كيف يعمل؟ ←
            </a>
          </div>

          <div className="mt-16 flex justify-center">
            <div className="animate-bounce text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 bg-gradient-to-l from-green-600 via-teal-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        <div className="relative container mx-auto px-4">
          <h2 className="text-center text-white text-3xl font-bold mb-14 opacity-90">أرقام تتحدث عن نفسها</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
            {stats.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">لماذا بيئتنا؟</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">منصة متكاملة تجعل الإبلاغ عن المشاكل البيئية سهلًا وفعّالًا</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className={`${f.color} border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default`}
              >
                <div className={`${f.iconBg} w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">كيف يعمل؟</h2>
            <p className="text-gray-500 text-lg">أربع خطوات بسيطة للإبلاغ عن مشكلة بيئية</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 right-16 left-16 h-0.5 bg-gradient-to-l from-green-300 to-teal-300 z-0" />
            {steps.map((s, i) => (
              <div key={i} className="relative z-10 text-center group">
                <div className={`${s.color} w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {s.num}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <button
              onClick={() => navigate('/report')}
              className="bg-gradient-to-l from-green-500 to-teal-500 text-white px-12 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              ابدأ الآن — أرسل بلاغك الأول
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #4ade80, transparent 50%), radial-gradient(circle at 70% 50%, #2dd4bf, transparent 50%)' }}
        />
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="text-5xl mb-4">🌍</div>
          <h2 className="text-4xl font-bold mb-4">موريتانيا تستحق بيئة نظيفة</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">انضم إلى آلاف المواطنين الذين يعملون يوميًا لجعل بلدنا أجمل</p>
          <button
            onClick={() => navigate('/report')}
            className="bg-gradient-to-l from-green-400 to-teal-400 text-gray-900 px-10 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            🚨 أبلغ عن مشكلة الآن
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white">🌿</span>
              </div>
              <div>
                <p className="font-bold text-lg">بيئتنا</p>
                <p className="text-gray-400 text-xs">معًا من أجل موريتانيا أنظف</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">© 2024 بيئتنا — جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
