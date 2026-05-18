import { useLocation, useNavigate } from 'react-router-dom'

interface SuccessReportState {
  id?: number
  locationName?: string
  createdAt?: string
}

function formatDate(value?: string) {
  if (!value) return 'غير متوفر'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('ar-MR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export default function SuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const report = ((location.state as { report?: SuccessReportState } | null)?.report) || null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex flex-col" dir="rtl">
      <div className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-sm">🌿</span>
          </div>
          <h1 className="font-bold text-lg text-gray-800">بيئتنا</h1>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-10 max-w-2xl">
        <div className="bg-white rounded-3xl shadow-sm p-8 text-center">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
            <div className="absolute inset-0 rounded-full bg-green-50 border-4 border-green-200" />
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">تم إرسال البلاغ بنجاح</h1>
          <p className="text-gray-500 leading-8">
            تم استلام البلاغ وإرساله إلى الإدارة لمراجعته. ستجد البلاغ ضمن لوحة المستخدم الخاصة بك، وتمت إضافة 10 نقاط إلى رصيدك.
          </p>

          {report && (
            <div className="mt-6 rounded-2xl bg-gray-50 p-5 text-right">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-400">رقم البلاغ</p>
                  <p className="font-semibold text-gray-800">#{report.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">التاريخ</p>
                  <p className="font-semibold text-gray-800">{formatDate(report.createdAt)}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-400">المكان</p>
                  <p className="font-semibold text-gray-800">{report.locationName || 'غير محدد'}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-l from-green-500 to-teal-500 text-white px-5 py-3.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
            >
              الذهاب إلى لوحة المستخدم
            </button>
            <button
              onClick={() => navigate('/report')}
              className="bg-white border border-gray-200 text-gray-700 px-5 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition"
            >
              إرسال بلاغ آخر
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
