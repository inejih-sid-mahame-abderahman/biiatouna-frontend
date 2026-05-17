import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'

export function AdminHeatmapPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">الخريطة الحرارية</h1>
      <Card>
        <CardHeader>
          <CardTitle>توزيع التلوث</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">خريطة تفاعلية - قيد التطوير</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}