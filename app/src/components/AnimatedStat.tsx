import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'

interface AnimatedStatProps {
  end: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

export default function AnimatedStat({ end, suffix = '', prefix = '', label, duration = 1.2 }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="font-display font-medium text-cream" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
        {inView ? (
          <CountUp
            end={end}
            duration={duration}
            prefix={prefix}
            suffix={suffix}
            useEasing={true}
            easingFn={(t: number, b: number, c: number, d: number) => {
              const td = t / d
              return c * (1 - Math.pow(1 - td, 3)) + b
            }}
          />
        ) : (
          <span>{prefix}0{suffix}</span>
        )}
      </div>
      <div className="data-label mt-2">{label}</div>
    </div>
  )
}
