import { Card, CardContent } from '@components/ui/Card'
import { Input } from '@components/ui/Input'
import { Button } from '@components/ui/Button'
import { Search, UserPlus } from 'lucide-react'

export function AdminUsersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h1>
          <p className="text-gray-600 mt-1">عرض وإدارة جميع المستخدمين</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 ml-2" />
          مستخدم جديد
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right p-4">الاسم</th>
                <th className="text-right p-4">البريد الإلكتروني</th>
                <th className="text-right p-4">البلاغات</th>
                <th className="text-right p-4">تاريخ التسجيل</th>
                <th className="text-right p-4">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="p-4">مستخدم {i}</td>
                  <td className="p-4 text-gray-600">user{i}@example.com</td>
                  <td className="p-4">{Math.floor(Math.random() * 50)}</td>
                  <td className="p-4 text-gray-600">2024-01-{i}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      نشط
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}