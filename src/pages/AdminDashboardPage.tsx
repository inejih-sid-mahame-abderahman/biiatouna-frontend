import { useEffect, useState } from 'react'
import { BarChart, Bar, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AxiosError } from 'axios'

import { fetchAdminDashboard, type AdminDashboardResponse } from '@/lib/api'

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

const chartColors = ['#10b981', '#14b8a6', '#f59e0b', '#3b82f6', '#ef4444']

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    void fetchAdminDashboard()
      .then(setData)
      .catch((loadError) => setError(getErrorMessage(loadError, 'تعذر تحميل لوحة الإدارة.')))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="rounded-3xl bg-white p-8 text-center text-gray-600">جارٍ تحميل المؤشرات...</div>
  }

  if (error || !data) {
    return <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error || 'لا توجد بيانات.'}</div>
  }

  const { summary, recent_reports: recentReports, top_locations: topLocations, reports_by_type: reportsByType } = data

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم الرئيسية</h1>
        <p className="text-gray-600 mt-1">مراقبة مباشرة للبلاغات والمستخدمين والتحليلات الواردة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <p className="text-sm text-white/80">إجمالي البلاغات</p>
          <p className="mt-3 text-4xl font-bold">{summary.total_reports}</p>
        </div>
        <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-amber-600 p-6 text-white">
          <p className="text-sm text-white/80">حالات حرجة</p>
          <p className="mt-3 text-4xl font-bold">{summary.critical_reports}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">إجمالي المستخدمين</p>
          <p className="mt-3 text-4xl font-bold text-gray-900">{summary.total_users}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">النقاط الممنوحة</p>
          <p className="mt-3 text-4xl font-bold text-gray-900">{summary.total_points_awarded}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">أنواع التلوث</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={reportsByType} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>
                  {reportsByType.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">أكثر المناطق بلاغًا</h2>
          <div className="space-y-3">
            {topLocations.length ? (
              topLocations.map((location, index) => (
                <div key={location.location_name} className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                  <div>
                    <p className="font-semibold text-gray-900">{location.location_name}</p>
                    <p className="text-sm text-gray-500">الترتيب {index + 1}</p>
                  </div>
                  <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                    {location.total} بلاغ
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-gray-50 p-6 text-center text-gray-500">لا توجد مواقع مرسلة بعد.</div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-gray-900">البلاغات اليومية</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.reports_by_day}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-gray-900">أحدث البلاغات</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-right text-sm font-semibold text-gray-600">الرقم</th>
                <th className="p-4 text-right text-sm font-semibold text-gray-600">المستخدم</th>
                <th className="p-4 text-right text-sm font-semibold text-gray-600">الموقع</th>
                <th className="p-4 text-right text-sm font-semibold text-gray-600">النوع</th>
                <th className="p-4 text-right text-sm font-semibold text-gray-600">الخطورة</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id} className="border-t border-gray-100">
                  <td className="p-4 text-sm text-gray-800">#{report.id}</td>
                  <td className="p-4 text-sm text-gray-800">{report.reporter_name || report.reporter_email || 'غير محدد'}</td>
                  <td className="p-4 text-sm text-gray-800">{report.location_name || 'غير محدد'}</td>
                  <td className="p-4 text-sm text-gray-800">{report.type}</td>
                  <td className="p-4 text-sm">
                    <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700">{report.severity}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
