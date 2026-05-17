import { Card, CardContent } from '@components/ui/Card'
import { Leaf, Droplets, Wind } from 'lucide-react'

const tips = [
  { icon: Leaf, title: 'ازرع شجرة', description: 'ساهم في زيادة المساحات الخضراء' },
  { icon: Droplets, title: 'وفر المياه', description: 'لا تسرف في استهلاك الماء' },
  { icon: Wind, title: 'نظافة الهواء', description: 'تجنب حرق النفايات' },
]

export function AwarenessSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">نصائح بيئية</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <tip.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}