import { useRef, useState, type ReactNode } from 'react'
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Max tilt in degrees. */
  max?: number
}

// Subtle 3D tilt that follows the pointer, springing flat on leave. Fine
// pointers with motion allowed only; otherwise a plain wrapper.
export default function TiltCard({ children, className, max = 4 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [canHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  const inert = reduced || !canHover

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 180, damping: 22, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 180, damping: 22, mass: 0.6 })
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const rotateY = useTransform(sx, [0, 1], [-max, max])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (inert || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={inert ? undefined : { rotateX, rotateY, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </m.div>
  )
}
