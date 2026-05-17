import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@components/ui/Card'
import { Button } from '@components/ui/Button'
import { CheckCircle } from 'lucide-react'

export function SuccessPage() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <Card className="text-center">
          <CardContent className="pt-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">تم الإرسال بنجاح!</h1>
            <p className="text-gray-600 mb-6">
              شكراً لك على إبلاغك. سيتم مراجعة البلاغ والتواصل معك قريباً
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              العودة للرئيسية
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}