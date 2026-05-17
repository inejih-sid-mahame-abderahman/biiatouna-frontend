import { motion } from 'framer-motion'
import { HeroSection } from '@features/landing/HeroSection'
import { HowItWorks } from '@features/landing/HowItWorks'
import { Statistics } from '@features/landing/Statistics'
import { AwarenessSection } from '@features/landing/AwarenessSection'

export function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <HowItWorks />
      <Statistics />
      <AwarenessSection />
    </motion.div>
  )
}