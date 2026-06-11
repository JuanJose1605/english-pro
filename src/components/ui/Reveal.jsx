import { motion } from 'framer-motion'

/**
 * Scroll-reveal wrapper. Fades + rises into view once.
 * Respects prefers-reduced-motion automatically (Framer Motion + global CSS).
 */
export default function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
