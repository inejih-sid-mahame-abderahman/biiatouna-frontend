import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import { Input } from '@components/ui/Input'
import { Button } from '@components/ui/Button'
import { Search, Eye, CheckCircle, XCircle } from 'lucide-react'

const mockReports = [
  { id: 1, title: 'تلوث في نهر السنغال', type: 'مياه', location: 'نواكشوط', status: 'pending', date: '2024-01-15' },
  { id: 2, title: 'نفايات صناعية', type: 'نفايات', location: 'نواذيبو', status: 'processing', date: '2024-01-14' },
  { id: 3, title: 'انبعاثات دخان', type: 'هواء', location: 'كيفة', status: 'resolved', date: '2024-01-13' },
]

export function AdminReportsPage() {
  const [search, setSearch] = useState('')

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة البلاغات</h1>
          <p className="text-gray-600 mt-1">عرض وإدارة جميع البلاغات البيئية</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="بحث..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10 w-64"
            />
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right p-4 font-semibold text-gray-600">#</th>
                <th className="text-right p-4 font-semibold text-gray-600">العنوان</th>
                <th className="text-right p-4 font-semibold text-gray-600">النوع</th>
                <th className="text-right p-4 font-semibold text-gray-600">الموقع</th>
                <th className="text-right p-4 font-semibold text-gray-600">الحالة</th>
                <th className="text-right p-4 font-semibold text-gray-600">التاريخ</th>
                <th className="text-right p-4 font-semibold text-gray-600">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {mockReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-gray-900">{report.id}</td>
                  <td className="p-4 text-gray-900">{report.title}</td>
                  <td className="p-4 text-gray-600">{report.type}</td>
                  <td className="p-4 text-gray-600">{report.location}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      report.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {report.status === 'pending' ? 'قيد الانتظار' :
                       report.status === 'processing' ? 'قيد المعالجة' : 'تم الحل'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{report.date}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-600">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
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