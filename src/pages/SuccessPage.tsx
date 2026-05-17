import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function generateTrackingId() {
  const now = new Date()
  const yy = now.getFullYear().toString().slice(2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `BIA-${yy}${mm}${dd}-${rand}`
}

const TIMELINE = [
  { icon: '📥', label: 'تم استقبال البلاغ', done: true, color: 'bg-green-500' },
  { icon: '🔍', label: 'جارٍ المراجعة والتحقق', done: false, color: 'bg-yellow-400', active: true },
  { icon: '🛠️', label: 'تحويل إلى الجهة المختصة', done: false, color: 'bg-gray-300' },
  { icon: '✅', label: 'تم حل المشكلة', done: false, color: 'bg-gray-300' },
]

const TIPS = [
  { icon: '📸', text: 'يمكنك إرسال صور إضافية لاحقًا لتعزيز بلاغك' },
  { icon: '🔔', text: 'فعّل الإشعارات لمتابعة تقدم بلاغك لحظةً بلحظة' },
  { icon: '🤝', text: 'شارك البلاغ مع جيرانك لزيادة الوعي المجتمعي' },
]

export default function SuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const report = (location.state as any)?.report
  const [trackingId] = useState(generateTrackingId)
  const [copied, setCopied] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [checkmark, setCheckmark] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setCheckmark(true), 300)
    const t2 = setTimeout(() => setShowContent(true), 800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const copyId = () => {
    navigator.clipboard.writeText(trackingId).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex flex-col" dir="rtl">

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-sm">🌿</span>
          </div>
          <h1 className="font-bold text-lg text-gray-800">بيئتنا</h1>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-10 max-w-lg">

        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className={`relative w-28 h-28 mx-auto mb-6 transition-all duration-700 ${checkmark ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
            <div className="absolute inset-0 rounded-full bg-green-50 border-4 border-green-200" />
            {/* Checkmark circle */}
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center shadow-xl">
              <svg
                className={`w-10 h-10 text-white transition-all duration-500 delay-300 ${checkmark ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className={`transition-all duration-500 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">تم إرسال بلاغك! 🎉</h1>
            <p className="text-gray-500 text-base leading-relaxed">
              شكرًا على مساهمتك في حماية البيئة. سيتم مراجعة بلاغك من قبل الجهات المختصة في أقرب وقت.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className={`space-y-4 transition-all duration-500 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

          {/* Tracking ID */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="text-sm text-gray-500 mb-2 font-medium">رقم متابعة بلاغك</p>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <span className="flex-1 font-mono text-lg font-bold text-gray-800 tracking-wider">{trackingId}</span>
              <button
                onClick={copyId}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  copied
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {copied ? '✅ تم النسخ' : '📋 نسخ'}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">احتفظ بهذا الرقم لمتابعة حالة بلاغك</p>
          </div>

          {/* Report summary */}
          {report && (
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span>📋</span> ملخص البلاغ
              </h3>
              <div className="space-y-2.5">
                {[
                  { label: 'نوع المشكلة', value: report.type },
                  { label: 'العنوان', value: report.title },
                  { label: 'المدينة', value: report.city },
                  { label: 'درجة الخطورة', value: report.severity },
                ].filter(r => r.value).map((r, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{r.label}</span>
                    <span className="font-medium text-gray-700">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span>⏱️</span> مراحل المعالجة
            </h3>
            <div className="space-y-3">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                    item.done ? 'bg-green-100' : (item as any).active ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      item.done ? 'text-green-700' : (item as any).active ? 'text-yellow-700' : 'text-gray-400'
                    }`}>
                      {item.label}
                    </p>
                  </div>
                  {item.done && <span className="text-green-500 text-sm">✓</span>}
                  {(item as any).active && (
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-yellow-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-l from-green-500 to-teal-500 rounded-2xl p-5 text-white">
            <h3 className="font-semibold mb-3 text-base">💡 نصائح مفيدة</h3>
            <div className="space-y-2.5">
              {TIPS.map((t, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">{t.icon}</span>
                  <p className="text-sm text-green-50 leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/report')}
              className="bg-white border-2 border-green-300 text-green-700 px-5 py-3.5 rounded-xl font-semibold text-sm hover:bg-green-50 transition flex items-center justify-center gap-2"
            >
              <span>➕</span> إرسال بلاغ آخر
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-l from-green-500 to-teal-500 text-white px-5 py-3.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>🏠</span> الصفحة الرئيسية
            </button>
          </div>

          {/* Share */}
          <div className="text-center pt-2 pb-6">
            <p className="text-sm text-gray-400 mb-3">شارك وساعد في نشر الوعي البيئي</p>
            <div className="flex justify-center gap-3">
              {[
                { icon: '💬', label: 'واتساب', color: 'bg-green-500' },
                { icon: '📱', label: 'تيليغرام', color: 'bg-blue-500' },
                { icon: '🐦', label: 'تويتر', color: 'bg-sky-500' },
              ].map(s => (
                <button
                  key={s.label}
                  className={`${s.color} text-white px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 hover:opacity-90 hover:scale-105 transition-all`}
                >
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}