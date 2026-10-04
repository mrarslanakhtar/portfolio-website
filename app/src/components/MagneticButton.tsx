import { useRef, useState, type ReactNode } from 'react'
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

type MagneticButtonProps = {
  children: ReactNode
  href: string
  className?: string
  strength?: number
  target?: string
  rel?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

// A primary-CTA anchor that subtly follows the cursor within its bounds and
// springs back on leave; the label drifts at a fraction of the button's
// travel for a parallax depth cue. Disabled entirely under reduced-motion
// (and inert on touch, where there is no mousemove) — the button behaves as
// a normal link.
export default function MagneticButton({
  children,
  href,
  className,
  strength = 0.3,
  target,
  rel,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()
  // Touch browsers synthesize mousemove on tap, which would shove the button
  // under the finger — the effect is for fine pointers only.
  const [canHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  const inert = reduced || !canHover

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const labelX = useTransform(springX, (v) => v * 0.45)
  const labelY = useTransform(springY, (v) => v * 0.45)

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (inert || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={inert ? undefined : { x: springX, y: springY }}
      whileHover={inert ? undefined : { scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <m.span className="inline-flex items-center gap-2" style={inert ? undefined : { x: labelX, y: labelY }}>
        {children}
      </m.span>
    </m.a>
  )
}
