import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ScrollRevealTextProps {
  children: ReactNode
  // `mode` is kept for source compatibility with existing call sites; all
  // reveals now use a single restrained fade/rise (framer-motion whileInView).
  mode?: 'chars' | 'words' | 'line'
  delay?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function ScrollRevealText({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: ScrollRevealTextProps) {
  // All allowed tags share the same motion prop shape; cast to one concrete
  // motion component so the dynamic tag keeps full framer-motion prop typing.
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}
