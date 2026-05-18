import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'

import { fetchAdminUsers, type AdminUserResponse } from '@/lib/api'

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
  return new Intl.DateTimeFormat('ar-MR', { dateStyle: 'medium' }).format(new Date(value))
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    void fetchAdminUsers()
      .then(setUsers)
      .catch((loadError) => setError(getErrorMessage(loadError, 'تعذر تحميل المستخدمين.')))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>
        <p className="text-gray-600 mt-1">عرض المستخدمين مع إجمالي بلاغاتهم ونقاطهم</p>
      </div>

      <div className="rounded-3xl bg-white shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-600">جارٍ تحميل المستخدمين...</div>
        ) : error ? (
          <div className="p-6 text-red-700 bg-red-50">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-right text-sm font-semibold text-gray-600">الاسم</th>
                  <th className="p-4 text-right text-sm font-semibold text-gray-600">البريد</th>
                  <th className="p-4 text-right text-sm font-semibold text-gray-600">الهاتف</th>
                  <th className="p-4 text-right text-sm font-semibold text-gray-600">البلاغات</th>
                  <th className="p-4 text-right text-sm font-semibold text-gray-600">النقاط</th>
                  <th className="p-4 text-right text-sm font-semibold text-gray-600">الدور</th>
                  <th className="p-4 text-right text-sm font-semibold text-gray-600">تاريخ الانضمام</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-100">
                    <td className="p-4 text-sm font-semibold text-gray-800">{user.name}</td>
                    <td className="p-4 text-sm text-gray-800">{user.email}</td>
                    <td className="p-4 text-sm text-gray-800">{user.phone_number || 'غير متوفر'}</td>
                    <td className="p-4 text-sm text-gray-800">{user.total_reports}</td>
                    <td className="p-4 text-sm text-gray-800">{user.points}</td>
                    <td className="p-4 text-sm text-gray-800">{user.is_staff ? 'مشرف' : 'مستخدم'}</td>
                    <td className="p-4 text-sm text-gray-800">{formatDate(user.joined_at)}</td>
                  </tr>
                ))}
                {!users.length && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">لا يوجد مستخدمون.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
