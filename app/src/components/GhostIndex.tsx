import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'

// The section's editorial index at poster scale — outlined, near-invisible,
// clipped by the section, drifting slower than the page for depth. Purely
// decorative; the eyebrow carries the number.
export default function GhostIndex({ n }: { n: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [90, -90])

  return (
    <m.span ref={ref} aria-hidden="true" className="ghost-index" style={reduced ? undefined : { y }}>
      {n}
    </m.span>
  )
}
