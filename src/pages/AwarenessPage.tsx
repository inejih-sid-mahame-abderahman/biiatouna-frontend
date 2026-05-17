import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import { Leaf, Droplets, Wind, Trash2, Recycle, Users } from 'lucide-react'

const tips = [
  {
    icon: Leaf,
    title: 'حماية الغطاء النباتي',
    description: 'الحفاظ على الأشجار والنباتات مهم جداً للبيئة. تجنب قطع الأشجار وساهم في زراعة المزيد.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Droplets,
    title: 'ترشيد استهلاك المياه',
    description: 'الماء هو الحياة. حافظ على المياه بتجنب الهدر وإصلاح التسريبات فوراً.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Wind,
    title: 'مكافحة تلوث الهواء',
    description: 'تجنب حرق النفايات. استخدم وسائل النقل الصديقة للبيئة كلما أمكن.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Trash2,
    title: 'التخلص السليم من النفايات',
    description: 'لا ترمِ النفايات في الأماكن غير المخصصة. استخدم الحاويات المخصصة.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: Recycle,
    title: 'إعادة التدوير',
    description: 'قم بتصنيف النفايات وإعادة تدوير المواد القابلة للاستخدام مثل البلاستيك والورق.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Users,
    title: 'المشاركة المجتمعية',
    description: 'شارك في حملات النظافة وانشر الوعي بين أفراد المجتمع.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
]

export function AwarenessPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            التوعية البيئية
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            نصائح ومعلومات للحفاظ على بيئتنا نظيفة وصحية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 ${tip.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <tip.icon className={`w-6 h-6 ${tip.color}`} />
                  </div>
                  <CardTitle className="text-xl">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{tip.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">معًا من أجل موريتانيا أنظف</h2>
          <p className="mb-6 opacity-90">
            شاركنا في الحفاظ على بيئتنا. أبلغ عن أي مشكلة بيئية تراها من خلال منصتنا
          </p>
          <button className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">
            أبلغ الآن
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}