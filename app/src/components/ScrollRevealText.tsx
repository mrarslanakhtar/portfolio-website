import { m, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE } from '@/lib/motion'

interface ScrollRevealTextProps {
  children: ReactNode
  /**
   * 'line' (default): a single restrained fade/rise for any content.
   * 'words': plain-string children split into words that rise out of a
   * masked line with a small stagger — reserved for display titles.
   * 'chars' is accepted for source compatibility and treated as 'words'.
   */
  mode?: 'chars' | 'words' | 'line'
  delay?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

const wordParent: Variants = {
  hidden: {},
  // delay arrives via `custom` — a sibling `transition` prop would be
  // overridden by the variant's own transition and silently ignored.
  show: (delay: number) => ({ transition: { staggerChildren: 0.035, delayChildren: delay } }),
}
const wordChild: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.55, ease: EASE } },
}

export default function ScrollRevealText({
  children,
  mode = 'line',
  delay = 0,
  className = '',
  as = 'div',
}: ScrollRevealTextProps) {
  // All allowed tags share the same motion prop shape; cast to one concrete
  // motion component so the dynamic tag keeps full framer-motion prop typing.
  const MotionTag = m[as] as typeof m.div

  // Word-level reveal only works on plain strings; anything else falls back
  // to the line reveal.
  if ((mode === 'words' || mode === 'chars') && typeof children === 'string') {
    const words = children.split(' ')
    return (
      <MotionTag
        className={className}
        variants={wordParent}
        custom={delay}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4, margin: '0px 0px -8% 0px' }}
        aria-label={children}
      >
        {words.map((word, i) => (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <m.span variants={wordChild} className="inline-block">
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </m.span>
          </span>
        ))}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      variants={lineVariants}
      initial="hidden"
      whileInView="show"
      // amount 0.1 so tall blocks (full cards) can't strand keyboard focus
      // inside a still-hidden element.
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}
