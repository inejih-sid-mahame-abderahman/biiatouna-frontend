import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const POLLUTION_TYPES = [
  { value: 'مياه', label: 'تلوث مياه', icon: '💧', color: 'border-blue-400 bg-blue-50 text-blue-700' },
  { value: 'هواء', label: 'تلوث هواء', icon: '💨', color: 'border-sky-400 bg-sky-50 text-sky-700' },
  { value: 'نفايات', label: 'نفايات صلبة', icon: '🗑️', color: 'border-orange-400 bg-orange-50 text-orange-700' },
  { value: 'صناعي', label: 'تلوث صناعي', icon: '🏭', color: 'border-gray-400 bg-gray-50 text-gray-700' },
  { value: 'حرائق', label: 'حرائق غير قانونية', icon: '🔥', color: 'border-red-400 bg-red-50 text-red-700' },
  { value: 'أخرى', label: 'مشكلة أخرى', icon: '⚠️', color: 'border-yellow-400 bg-yellow-50 text-yellow-700' },
]

const SEVERITIES = [
  { value: 'منخفض', label: 'منخفض', desc: 'لا يشكّل خطرًا فوريًا', color: 'border-green-400 bg-green-50 text-green-700', dot: 'bg-green-400' },
  { value: 'متوسط', label: 'متوسط', desc: 'يحتاج معالجة قريبة', color: 'border-yellow-400 bg-yellow-50 text-yellow-700', dot: 'bg-yellow-400' },
  { value: 'مرتفع', label: 'مرتفع', desc: 'خطر مباشر على الصحة', color: 'border-red-400 bg-red-50 text-red-700', dot: 'bg-red-400' },
]

const MAURITANIAN_CITIES = [
  'نواكشوط', 'نواذيبو', 'كيفه', 'روصو', 'زويرات', 'تيجيكجه', 'سيلبابي',
  'عيون العتروس', 'أطار', 'أكجوجت', 'نما', 'بوكه', 'لعيون',
]

interface FormData {
  title: string
  description: string
  type: string
  city: string
  address: string
  severity: string
  contactName: string
  contactPhone: string
  photos: File[]
}

const STEPS = ['نوع المشكلة', 'التفاصيل', 'الموقع', 'الصور', 'مراجعة وإرسال']

export default function ReportPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const [form, setForm] = useState<FormData>({
    title: '', description: '', type: '', city: '',
    address: '', severity: '', contactName: '', contactPhone: '', photos: [],
  })

  const update = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 3)
    setForm(prev => ({ ...prev, photos: files }))
    setPreviewUrls(files.map(f => URL.createObjectURL(f)))
  }

  const removePhoto = (idx: number) => {
    setPreviewUrls(p => p.filter((_, i) => i !== idx))
    setForm(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== idx) }))
  }

  const canProceed = () => {
    if (step === 0) return !!form.type
    if (step === 1) return form.title.length >= 5 && form.description.length >= 10 && !!form.severity
    if (step === 2) return !!form.city
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    navigate('/success', { state: { report: form } })
  }

  const stepIcon = ['🏷️', '📝', '📍', '📸', '✅']

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50" dir="rtl">

      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            الرئيسية
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🌿</span>
            </div>
            <h1 className="text-lg font-bold text-gray-800">إرسال بلاغ جديد</h1>
          </div>
          <div className="text-sm text-gray-400 font-medium">
            {step + 1} / {STEPS.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-l from-green-500 to-teal-500 transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-1 overflow-x-auto">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  i === step ? 'bg-green-100 text-green-700 border border-green-300' :
                  i < step ? 'bg-teal-50 text-teal-600' : 'text-gray-400'
                }`}>
                  <span>{stepIcon[i]}</span>
                  <span className="hidden sm:inline">{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-4 h-0.5 ${i < step ? 'bg-teal-400' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">

        {/* STEP 0 — نوع المشكلة */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">ما نوع المشكلة البيئية؟</h2>
              <p className="text-gray-500">اختر الفئة الأنسب لوصف المشكلة التي لاحظتها</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {POLLUTION_TYPES.map(t => (
                <button
                  key={t.value}
                  onClick={() => update('type', t.value)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all duration-200 hover:scale-105 ${
                    form.type === t.value ? t.color + ' border-2 shadow-md scale-105' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{t.icon}</div>
                  <div className={`text-sm font-semibold ${form.type === t.value ? '' : 'text-gray-700'}`}>{t.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1 — التفاصيل */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">تفاصيل المشكلة</h2>
              <p className="text-gray-500">كلما كان وصفك أدق، كلما كانت المعالجة أسرع</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">عنوان البلاغ *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => update('title', e.target.value)}
                  placeholder="مثال: تلوث مياه شرب في حي الميناء"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">{form.title.length}/100 حرف</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">وصف المشكلة بالتفصيل *</label>
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  placeholder="اشرح المشكلة بالتفصيل: متى لاحظتها؟ ما حجمها؟ هل تؤثر على السكان؟..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">درجة الخطورة *</label>
                <div className="space-y-2">
                  {SEVERITIES.map(s => (
                    <button
                      key={s.value}
                      onClick={() => update('severity', s.value)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-right transition-all ${
                        form.severity === s.value ? s.color + ' shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${s.dot} flex-shrink-0`} />
                      <div>
                        <div className={`font-semibold text-sm ${form.severity === s.value ? '' : 'text-gray-700'}`}>{s.label}</div>
                        <div className={`text-xs ${form.severity === s.value ? 'opacity-80' : 'text-gray-400'}`}>{s.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — الموقع */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">أين تقع المشكلة؟</h2>
              <p className="text-gray-500">تحديد الموقع يساعد الجهات المختصة على الوصول بسرعة</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">المدينة / الولاية *</label>
                <select
                  value={form.city}
                  onChange={e => update('city', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition text-sm appearance-none bg-white"
                >
                  <option value="">اختر المدينة</option>
                  {MAURITANIAN_CITIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان التفصيلي</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={e => update('address', e.target.value)}
                  placeholder="مثال: بالقرب من سوق النعمة، شارع رقم 5..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition text-sm"
                />
              </div>

              {/* Map placeholder */}
              <div className="mt-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">تحديد الموقع على الخريطة (اختياري)</label>
                <div className="w-full h-48 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl border-2 border-dashed border-green-300 flex flex-col items-center justify-center gap-2 text-green-600 cursor-pointer hover:bg-green-50 transition">
                  <span className="text-3xl">🗺️</span>
                  <span className="text-sm font-medium">انقر لتحديد موقعك على الخريطة</span>
                  <span className="text-xs text-green-500">سيتم تفعيل الخريطة التفاعلية قريبًا</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
              <h3 className="font-semibold text-gray-700">معلومات التواصل (اختياري)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">الاسم</label>
                  <input
                    type="text"
                    value={form.contactName}
                    onChange={e => update('contactName', e.target.value)}
                    placeholder="اسمك الكامل"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">رقم الهاتف</label>
                  <input
                    type="tel"
                    value={form.contactPhone}
                    onChange={e => update('contactPhone', e.target.value)}
                    placeholder="2X XX XX XX"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                    dir="ltr"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400">معلوماتك محمية ولن تُشارك مع أطراف خارجية</p>
            </div>
          </div>
        )}

        {/* STEP 3 — الصور */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">أضف صور توثيقية</h2>
              <p className="text-gray-500">الصور تسرّع عملية التحقق والمعالجة (اختياري)</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePhotos}
              />

              {previewUrls.length < 3 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 border-2 border-dashed border-green-300 rounded-2xl flex flex-col items-center justify-center gap-3 text-green-600 hover:bg-green-50 transition cursor-pointer"
                >
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl">📷</div>
                  <div>
                    <p className="font-semibold text-sm">انقر لإضافة صور</p>
                    <p className="text-xs text-green-400">PNG, JPG — حتى 3 صور، 5MB لكل صورة</p>
                  </div>
                </button>
              )}

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {previewUrls.map((url, i) => (
                    <div key={i} className="relative group">
                      <img src={url} alt="" className="w-full h-28 object-cover rounded-xl" />
                      <button
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 left-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2 items-start">
                <span className="text-amber-500 text-lg flex-shrink-0">💡</span>
                <p className="text-xs text-amber-700 leading-relaxed">
                  التقط صورًا واضحة في ضوء النهار وتأكد أن المشكلة ظاهرة بوضوح في الصورة
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 — المراجعة */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">مراجعة البلاغ</h2>
              <p className="text-gray-500">تحقق من المعلومات قبل الإرسال النهائي</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
              {[
                { icon: '🏷️', label: 'نوع المشكلة', value: POLLUTION_TYPES.find(t => t.value === form.type)?.label + ' ' + POLLUTION_TYPES.find(t => t.value === form.type)?.icon },
                { icon: '📋', label: 'عنوان البلاغ', value: form.title },
                { icon: '📄', label: 'الوصف', value: form.description, truncate: true },
                { icon: '⚠️', label: 'درجة الخطورة', value: form.severity },
                { icon: '📍', label: 'المدينة', value: form.city },
                { icon: '🏠', label: 'العنوان التفصيلي', value: form.address || 'لم يُحدد' },
                { icon: '📸', label: 'الصور المرفقة', value: previewUrls.length > 0 ? `${previewUrls.length} صورة` : 'لا يوجد' },
              ].map((row, i) => (
                <div key={i} className="flex gap-3 px-5 py-3 items-start">
                  <span className="text-lg flex-shrink-0 mt-0.5">{row.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5">{row.label}</p>
                    <p className={`text-sm font-medium text-gray-800 ${row.truncate ? 'line-clamp-2' : ''}`}>
                      {row.value || '—'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-2 items-start">
              <span className="text-green-500 text-lg flex-shrink-0">🔒</span>
              <p className="text-xs text-green-700 leading-relaxed">
                بلاغك سيُعالج في أقرب وقت ممكن. ستتلقى إشعارًا عند تغيير الحالة. معلوماتك محمية تمامًا.
              </p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex-1 px-6 py-3.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition text-sm"
            >
              ← السابق
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
              className={`flex-1 px-6 py-3.5 rounded-xl font-bold text-sm transition-all ${
                canProceed()
                  ? 'bg-gradient-to-l from-green-500 to-teal-500 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              التالي →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 bg-gradient-to-l from-green-500 to-teal-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:shadow-lg hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  جارٍ الإرسال...
                </>
              ) : (
                '✅ إرسال البلاغ'
              )}
            </button>
          )}
        </div>

        {step === 0 && (
          <button
            onClick={() => navigate('/')}
            className="w-full text-center text-sm text-gray-400 hover:text-gray-600 mt-4 py-2"
          >
            إلغاء والعودة للرئيسية
          </button>
        )}
      </div>
    </div>
  )
}