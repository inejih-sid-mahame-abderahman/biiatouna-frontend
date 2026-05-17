import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import { Input } from '@components/ui/Input'
import { Button } from '@components/ui/Button'
import { Search, MapPin, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react'

export function TrackingPage() {
  const [searchId, setSearchId] = useState('')

  // Mock data
  const mockReports = [
    {
      id: 'BR-001',
      title: 'تلوث في نهر السنغال',
      status: 'processing',
      date: '2024-01-15',
      severity: 'high',
    },
    {
      id: 'BR-002',
      title: 'نفايات صناعية في نواذيبو',
      status: 'resolved',
      date: '2024-01-10',
      severity: 'critical',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            تتبع بلاغك
          </h1>
          <p className="text-gray-600 mt-2">
            أدخل رقم البلاغ لمتابعة حالة المشكلة البيئية التي أبلغت عنها
          </p>
        </div>

        {/* Search Section */}
        <Card className="p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="أدخل رقم البلاغ (مثال: BR-001)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
            <Button>
              <Search className="w-4 h-4 ml-2" />
              بحث
            </Button>
          </div>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">آخر البلاغات</h2>
          {mockReports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{report.title}</CardTitle>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      report.status === 'resolved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {report.status === 'resolved' ? 'تم الحل' : 'قيد المعالجة'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{report.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">موريتانيا</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.severity === 'critical' && (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm ${
                        report.severity === 'critical'
                          ? 'text-red-600 font-semibold'
                          : 'text-gray-600'
                      }`}
                    >
                      {report.severity === 'critical' ? 'حرج' : 'عالي'}
                    </span>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-xs text-gray-600">تم الإبلاغ</p>
                    </div>
                    <div className="flex-1 h-0.5 bg-green-500 mx-2" />
                    <div className="text-center">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-xs text-gray-600">قيد التحليل</p>
                    </div>
                    <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="w-4 h-4 text-gray-500" />
                      </div>
                      <p className="text-xs text-gray-600">تم الحل</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  )
}