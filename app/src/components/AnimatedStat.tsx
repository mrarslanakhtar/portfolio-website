import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/motion'

interface AnimatedStatProps {
  end: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

// Counts up once when scrolled into view, on the framer-motion animate() core
// already in the bundle. Under reduced-motion the final value renders directly.
export default function AnimatedStat({ end, suffix = '', prefix = '', label, duration = 1.2 }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15, margin: '0px 0px -50px 0px' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, end, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduced, end, duration])

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div
        className="font-display font-medium text-cream leading-none"
        style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}
      >
        {/* The accessible value is always the real figure; the ticking
            number is presentation only. */}
        <span className="sr-only">{prefix}{end}{suffix}</span>
        <span aria-hidden="true">
          {prefix}
          {reduced ? end : value}
          {suffix}
        </span>
      </div>
      <div className="data-label mt-2">{label}</div>
    </div>
  )
}
