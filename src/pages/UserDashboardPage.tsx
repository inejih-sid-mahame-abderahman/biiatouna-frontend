import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import {
  fetchMe,
  fetchMyReports,
  getAuthToken,
  getStoredUser,
  logoutUser,
  type ReportResponse,
  type User,
} from '@/lib/api'

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    const detail = error.response?.data?.detail
    if (typeof detail === 'string' && detail.trim()) {
      return detail
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return fallback
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ar-MR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function formatAuthority(authority: string) {
  if (authority === 'بلدية') return 'البلدية'
  if (authority === 'وزارة_بيئة') return 'وزارة البيئة'
  if (authority === 'حماية_مدنية') return 'الحماية المدنية'
  return authority
}

export default function UserDashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(getStoredUser())
  const [reports, setReports] = useState<ReportResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login', { replace: true })
      return
    }

    async function loadDashboard() {
      setLoading(true)
      setError('')

      try {
        const [nextUser, nextReports] = await Promise.all([fetchMe(), fetchMyReports()])
        setUser(nextUser)
        setReports(nextReports)
      } catch (loadError) {
        setError(getErrorMessage(loadError, 'تعذر تحميل لوحة المستخدم.'))
      } finally {
        setLoading(false)
      }
    }

    void loadDashboard()
  }, [navigate])

  const points = user?.points ?? reports.length * 10

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-teal-50" dir="rtl">
      <div className="border-b border-white/60 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm text-green-700">لوحة المستخدم</p>
            <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'المستخدم'}</h1>
          </div>
          <div className="flex gap-3">
            {user?.is_staff && (
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700"
              >
                لوحة الإدارة
              </button>
            )}
            <button
              onClick={() => navigate('/report')}
              className="rounded-xl bg-gradient-to-l from-green-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white"
            >
              إرسال بلاغ جديد
            </button>
            <button
              onClick={() => {
                void logoutUser().finally(() => navigate('/login'))
              }}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-green-100 border-t-green-500" />
            <p className="text-gray-600">جارٍ تحميل بياناتك...</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-lg">
                <p className="text-sm text-white/80">النقاط المكتسبة</p>
                <p className="mt-3 text-4xl font-bold">{points}</p>
                <p className="mt-2 text-sm text-white/80">10 نقاط لكل بلاغ مرسل</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">إجمالي البلاغات</p>
                <p className="mt-3 text-4xl font-bold text-gray-900">{reports.length}</p>
                <p className="mt-2 text-sm text-gray-500">كل البلاغات التي أرسلتها</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                <p className="mt-3 text-lg font-bold text-gray-900 break-all">{user?.email || 'غير متوفر'}</p>
                <p className="mt-2 text-sm text-gray-500">{user?.phone_number || 'بدون رقم هاتف'}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">بلاغاتي</h2>
                  <p className="text-sm text-gray-500">قائمة كل البلاغات التي أرسلتها إلى الإدارة</p>
                </div>
                <button
                  onClick={() => navigate('/report')}
                  className="rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700"
                >
                  بلاغ جديد
                </button>
              </div>

              {!reports.length ? (
                <div className="rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
                  لا توجد بلاغات بعد. ابدأ بإرسال أول بلاغ.
                </div>
              ) : (
                <div className="grid gap-4">
                  {reports.map((report) => (
                    <article key={report.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{report.location_name || 'موقع غير محدد'}</h3>
                          <p className="text-sm text-gray-500">رقم البلاغ #{report.id}</p>
                        </div>
                        <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                          +10 نقاط
                        </div>
                      </div>
                      <div className="grid gap-3 md:grid-cols-4">
                        <div>
                          <p className="text-xs text-gray-400">النوع</p>
                          <p className="font-semibold text-gray-800">{report.type}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">الخطورة</p>
                          <p className="font-semibold text-gray-800">{report.severity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">الجهة المختصة</p>
                          <p className="font-semibold text-gray-800">{formatAuthority(report.authority)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">التاريخ</p>
                          <p className="font-semibold text-gray-800">{formatDate(report.created_at)}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-gray-700">{report.description}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
