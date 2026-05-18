import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import { analyzeImage, createReport, fetchMe, getAuthToken, getStoredUser } from '@/lib/api'

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    const data = error.response?.data
    if (typeof data?.detail === 'string' && data.detail.trim()) {
      return data.detail
    }
    if (typeof data === 'object' && data !== null) {
      const firstValue = Object.values(data)[0]
      if (Array.isArray(firstValue) && typeof firstValue[0] === 'string') {
        return firstValue[0]
      }
      if (typeof firstValue === 'string') {
        return firstValue
      }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return fallback
}

export default function ReportPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [authChecking, setAuthChecking] = useState(true)
  const [userName, setUserName] = useState('')
  const [locationName, setLocationName] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [analysisError, setAnalysisError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  useEffect(() => {
    const token = getAuthToken()
    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    const storedUser = getStoredUser()
    if (storedUser) {
      setUserName(storedUser.name)
      setAuthChecking(false)
      return
    }

    void fetchMe()
      .then((user) => {
        setUserName(user.name)
      })
      .catch(() => {
        navigate('/login', { replace: true })
      })
      .finally(() => {
        setAuthChecking(false)
      })
  }, [navigate])

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextPhoto = event.target.files?.[0] || null

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setPhoto(nextPhoto)
    setPreviewUrl(nextPhoto ? URL.createObjectURL(nextPhoto) : '')
    setAnalysisError('')
    setSubmitError('')
  }

  const handleSubmit = async () => {
    if (!locationName.trim()) {
      setSubmitError('أدخل اسم المكان.')
      return
    }

    if (!description.trim()) {
      setSubmitError('أدخل وصفًا للحالة.')
      return
    }

    if (!photo) {
      setSubmitError('الصورة مطلوبة قبل الإرسال.')
      return
    }

    setSubmitting(true)
    setAnalysisError('')
    setSubmitError('')

    try {
      const analysisResult = await analyzeImage(photo)

      if (!analysisResult.is_valid_report_image) {
        setAnalysisError(analysisResult.message || 'الصورة غير صالحة للبلاغ. التقط صورة أوضح للمشكلة.')
        return
      }

      const savedReport = await createReport({
        locationName: locationName.trim(),
        type: analysisResult.type || 'أخرى',
        severity: analysisResult.severity || 'متوسطة',
        description: description.trim(),
        authority: analysisResult.authority || 'وزارة_بيئة',
        image: photo,
        analysisPayload: analysisResult,
      })

      navigate('/success', {
        state: {
          report: {
            id: savedReport.id,
            locationName: savedReport.location_name,
            createdAt: savedReport.created_at,
          },
        },
      })
    } catch (error) {
      setSubmitError(getErrorMessage(error, 'تعذر إرسال البلاغ إلى الخادم.'))
    } finally {
      setSubmitting(false)
    }
  }

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50" dir="rtl">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-green-200 border-t-green-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">جارٍ التحقق من الحساب...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50" dir="rtl">
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            لوحة المستخدم
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🌿</span>
            </div>
            <h1 className="text-lg font-bold text-gray-800">إرسال بلاغ</h1>
          </div>
          <div className="text-sm text-gray-400 font-medium">{userName || 'مستخدم'}</div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">أدخل مكان الحالة ووصفها ثم أرفق صورة</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            سيتم إرسال البلاغ إلى الإدارة مع التحليل الداخلي من الخلفية. لن يتم عرض تفاصيل التحليل للمستخدم.
          </p>
        </div>

        <div className="grid gap-5">
          <section className="bg-white rounded-3xl shadow-sm p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800">1. معلومات البلاغ</h3>
              <p className="text-sm text-gray-500">اكتب اسم المكان كما يعرفه الناس، ثم صف الحالة بإيجاز واضح.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">اسم المكان</label>
                <input
                  value={locationName}
                  onChange={(event) => setLocationName(event.target.value)}
                  placeholder="مثال: تفرغ زينة، قرب المدرسة الفرنسية"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">وصف الحالة</label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="صف المشكلة كما تراها: نوع الضرر، مدى الانتشار، والخطر الظاهر."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-sm p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800">2. ارفع الصورة</h3>
              <p className="text-sm text-gray-500">ستتم مراجعة الصورة تلقائيًا ثم إرسالها مع البلاغ إلى لوحة الإدارة.</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />

            {!photo ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-56 border-2 border-dashed border-green-300 rounded-3xl flex flex-col items-center justify-center gap-3 text-green-600 hover:bg-green-50 transition"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">📷</div>
                <div>
                  <p className="font-semibold">اختر صورة من الهاتف أو الكاميرا</p>
                  <p className="text-sm text-green-500">لن نعرض نتيجة التحليل للمستخدم، فقط حالة الإرسال</p>
                </div>
              </button>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img src={previewUrl} alt="" className="w-full h-72 object-cover rounded-3xl" />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute top-3 left-3 rounded-xl bg-white/90 px-3 py-2 text-sm font-semibold text-gray-800 shadow"
                  >
                    تغيير الصورة
                  </button>
                </div>

                <div className="rounded-2xl border border-green-100 bg-green-50 p-4 text-sm text-green-700">
                  التحليل يتم تلقائيًا عند إرسال البلاغ.
                </div>
              </div>
            )}

            {analysisError && (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {analysisError}
              </div>
            )}
          </section>

          {submitError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 px-6 py-3.5 border-2 border-gray-200 text-gray-600 rounded-2xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition text-sm"
            >
              العودة إلى اللوحة
            </button>
            <button
              onClick={handleSubmit}
              disabled={!photo || !locationName.trim() || !description.trim() || submitting}
              className="flex-1 bg-gradient-to-l from-green-500 to-teal-500 text-white px-6 py-3.5 rounded-2xl font-bold text-sm hover:shadow-lg hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? 'جارٍ تدقيق البلاغ وإرساله...' : 'إرسال البلاغ الآن'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
