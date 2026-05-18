import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

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

export default function AdminStatisticsPage() {
  const [data, setData] = useState<AdminDashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    void fetchAdminDashboard()
      .then(setData)
      .catch((loadError) => setError(getErrorMessage(loadError, 'تعذر تحميل الإحصائيات.')))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="rounded-3xl bg-white p-8 text-center text-gray-600">جارٍ تحميل الإحصائيات...</div>
  }

  if (error || !data) {
    return <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error || 'لا توجد بيانات.'}</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">الإحصائيات والتقارير</h1>
        <p className="text-gray-600 mt-1">تحليل شامل لحركة البلاغات وأنواع التلوث ودرجات الخطورة</p>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">البلاغات اليومية</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.reports_by_day}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="عدد البلاغات" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">حالة الخطورة</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.reports_by_severity} dataKey="value" nameKey="name" fill="#f59e0b" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">أنواع التلوث</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.reports_by_type} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="value" name="عدد البلاغات" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
