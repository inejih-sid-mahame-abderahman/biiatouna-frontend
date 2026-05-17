import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'

export function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">تحليلات الذكاء الاصطناعي</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>تحليل التلوث</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">مخطط التحليلات - قيد التطوير</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>توصيات الذكاء الاصطناعي</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold">توصية #{i}</p>
                <p className="text-sm text-gray-600">محتوى التوصية - قيد التطوير</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}