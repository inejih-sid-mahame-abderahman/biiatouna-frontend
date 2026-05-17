import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { label: 'بلاغ تم استقبالها', value: 1234, suffix: '' },
  { label: 'مشكلة تمت معالجتها', value: 892, suffix: '' },
  { label: 'منطقة جغرافية مغطاة', value: 18, suffix: '' },
]

export function Statistics() {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [counters, setCounters] = useState(stats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, index) => {
        let start = 0
        const duration = 2000
        const increment = stat.value / (duration / 16)
        const timer = setInterval(() => {
          start += increment
          if (start >= stat.value) {
            setCounters(prev => {
              const newCounters = [...prev]
              newCounters[index] = stat.value
              return newCounters
            })
            clearInterval(timer)
          } else {
            setCounters(prev => {
              const newCounters = [...prev]
              newCounters[index] = Math.floor(start)
              return newCounters
            })
          }
        }, 16)
        return () => clearInterval(timer)
      })
    }
  }, [isInView])

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {counters[index]}{stat.suffix}
              </div>
              <p className="text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}