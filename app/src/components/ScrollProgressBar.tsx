import { m, useScroll, useSpring, useReducedMotion } from 'framer-motion'

// Reading-progress hairline. useScroll is event-driven (no rAF polling), and
// position is state rather than motion — under reduced-motion the bar still
// tracks, just without the spring smoothing.
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const reduced = useReducedMotion()
  const smoothed = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-px bg-transparent" aria-hidden="true">
      <m.div
        className="h-full w-full origin-left bg-cyan/70"
        style={{ scaleX: reduced ? scrollYProgress : smoothed }}
      />
    </div>
  )
}
