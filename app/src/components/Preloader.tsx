import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINES = ['Establishing secure session', 'Verifying identity', 'Access granted']
const LINE_INTERVAL = 420 // ms between lines revealing
const TOTAL = 1700 // ms before handing off to the hero (ceiling is 2200)
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

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
    <motion.div
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
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className={`flex items-center gap-2.5 ${isLast ? 'text-cyan' : 'text-cream/70'}`}
              >
                <span className={isLast ? 'text-cyan' : 'text-brass/70'}>{isLast ? '✓' : '›'}</span>
                <span>{line}</span>
                {isActive && !isLast && (
                  <motion.span
                    className="text-cyan"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    _
                  </motion.span>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Thin cyan progress bar */}
        <div className="mt-6 h-0.5 w-full bg-[var(--hairline)] overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-cyan origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: (TOTAL / 1000) * 0.92, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
