import { useEffect, useState } from 'react'
import { m } from 'framer-motion'
import { EASE } from '@/lib/motion'

const LINES = ['Establishing secure session', 'Verifying identity', 'Access granted']
const LINE_INTERVAL = 340 // ms between lines revealing
const GRANTED_AT = LINE_INTERVAL * (LINES.length - 1) // bar + final line land together
const HOLD = 320 // stillness after "Access granted" before handing off
const TOTAL = GRANTED_AT + HOLD + 380 // ≈1.38s; the hero stagger overlaps the exit fade

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(1)

  useEffect(() => {
    const timers: number[] = []
    for (let i = 2; i <= LINES.length; i++) {
      timers.push(window.setTimeout(() => setVisibleLines(i), LINE_INTERVAL * (i - 1)))
    }
    timers.push(window.setTimeout(onComplete, TOTAL))
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <m.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-graphite-deep"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -14, transition: { duration: 0.5, ease: EASE } }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="w-[min(90vw,440px)] px-6 font-mono text-[13px] md:text-sm">
        <div className="space-y-2.5">
          {LINES.map((line, i) => {
            if (i >= visibleLines) return null
            const isLast = i === LINES.length - 1
            const isActive = i === visibleLines - 1
            return (
              <m.div
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className={`flex items-center gap-2.5 ${isLast ? 'text-cyan' : 'text-cream/70'}`}
              >
                <m.span
                  className={isLast ? 'text-cyan' : 'text-brass/70'}
                  // The payoff beat: "Access granted" lands with a small pop.
                  initial={isLast ? { scale: 0.6, opacity: 0 } : false}
                  animate={isLast ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {isLast ? '✓' : '›'}
                </m.span>
                <span>{line}</span>
                {isActive && !isLast && (
                  <m.span
                    className="text-cyan"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    _
                  </m.span>
                )}
              </m.div>
            )
          })}
        </div>

        {/* Thin cyan progress bar — fast start, slow landing, finishing as
            "Access granted" appears rather than ticking on past it. */}
        <div className="mt-6 h-0.5 w-full bg-[var(--hairline)] overflow-hidden rounded-full">
          <m.div
            className="h-full bg-cyan origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: GRANTED_AT / 1000, ease: EASE }}
          />
        </div>
      </div>
    </m.div>
  )
}
