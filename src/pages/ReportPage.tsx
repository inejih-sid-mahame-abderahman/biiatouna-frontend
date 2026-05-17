import { useState } from 'react'
import { motion } from 'framer-motion'
import { ReportForm } from '@features/reports/ReportForm'
import { ImageUpload } from '@features/reports/ImageUpload'
import { LocationPicker } from '@features/reports/LocationPicker'
import { Card } from '@components/ui/Card'

export function ReportPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            إبلاغ عن مشكلة بيئية
          </h1>
          <p className="text-gray-600 mt-2">
            ساعدنا في الحفاظ على بيئتنا نظيفة من خلال الإبلاغ عن المخالفات البيئية
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="flex justify-center mb-8 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= i
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i}
            </div>
          ))}
        </div>

        <Card className="p-6 md:p-8">
          {step === 1 && <ReportForm onNext={() => setStep(2)} />}
          {step === 2 && <ImageUpload onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <LocationPicker onSubmit={() => console.log('submitted')} onBack={() => setStep(2)} />}
        </Card>
      </motion.div>
    </div>
  )
}