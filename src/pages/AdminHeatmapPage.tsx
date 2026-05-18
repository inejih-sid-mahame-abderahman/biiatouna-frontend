import { useEffect, useState } from 'react'
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

export default function AdminHeatmapPage() {
  const [data, setData] = useState<AdminDashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    void fetchAdminDashboard()
      .then(setData)
      .catch((loadError) => setError(getErrorMessage(loadError, 'تعذر تحميل بيانات المناطق.')))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">المناطق الساخنة</h1>
        <p className="text-gray-600 mt-1">ترتيب المناطق الأكثر ورودًا في البلاغات حتى مع غياب الإحداثيات الجغرافية</p>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        {loading ? (
          <div className="text-center text-gray-600 py-10">جارٍ تحميل المناطق...</div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
        ) : data?.top_locations.length ? (
          <div className="grid gap-4">
            {data.top_locations.map((location, index) => (
              <div key={location.location_name} className="rounded-2xl border border-gray-100 p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">منطقة ساخنة #{index + 1}</p>
                    <h2 className="text-xl font-bold text-gray-900">{location.location_name}</h2>
                  </div>
                  <div className="rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-700">
                    {location.total} بلاغ
                  </div>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"
                    style={{ width: `${Math.max(18, (location.total / data.top_locations[0].total) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">لا توجد مناطق متاحة بعد.</div>
        )}
      </div>
    </div>
  )
}
