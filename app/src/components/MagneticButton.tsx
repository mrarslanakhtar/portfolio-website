import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

type MagneticButtonProps = {
  children: ReactNode
  href: string
  className?: string
  strength?: number
  target?: string
  rel?: string
}

// A primary-CTA anchor that subtly follows the cursor within its bounds and
// springs back on leave. Disabled entirely under reduced-motion (and inert on
// touch, where there is no mousemove) — the button behaves as a normal link.
export default function MagneticButton({
  children,
  href,
  className,
  strength = 0.3,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={reduced ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.a>
  )
}
