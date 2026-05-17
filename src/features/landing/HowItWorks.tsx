import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import { Upload, Brain, Send } from 'lucide-react'

const steps = [
  { icon: Upload, title: 'أرسل البلاغ', description: 'أرسل وصفًا للمشكلة البيئية مع صورة' },
  { icon: Brain, title: 'تحليل ذكي', description: 'الذكاء الاصطناعي يحلل و يصنف البلاغ' },
  { icon: Send, title: 'إرسال للجهات', description: 'يتم إرسال البلاغ للجهات المختصة' },
]

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">كيف تعمل المنصة؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-8 h-8 text-primary-600" />
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}