import type { ReactNode } from 'react'
import { motion } from 'motion/react'

// Shared easing curve for every entrance animation on the site.
export const EASE = [0.22, 1, 0.36, 1] as const

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  // Use "li" when the element sits directly inside a <ol> or <ul>.
  as?: 'div' | 'li'
}

// Fades and rises an element into view once. Stagger siblings by passing increasing `delay`.
// MotionConfig(reducedMotion="user") in App turns off the movement for users who prefer reduced motion.
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const Tag = as === 'li' ? motion.li : motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}
