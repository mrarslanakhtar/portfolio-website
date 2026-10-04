import { useEffect, useRef, useState } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'

type Mode = 'default' | 'link' | 'text'

// Cursor as light. A small cyan point tracks the pointer exactly; a large,
// soft glow follows on a spring and lights whatever the pointer passes
// over. Over links the point opens into a translucent disk that sits
// behind the label; over text it narrows into a thin I-beam. Fine pointers
// with motion allowed only — on touch and under reduced-motion nothing
// mounts and the native cursor stays.
export default function CustomCursor() {
  const [active] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [visible, setVisible] = useState(false)
  const visibleRef = useRef(false)
  const [mode, setMode] = useState<Mode>('default')

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const glowX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.9 })
  const glowY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.9 })

  useEffect(() => {
    if (!active) return
    document.documentElement.classList.add('has-cursor')

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }
      const target = e.target as Element | null
      if (!target) return
      if (target.closest('a, button, [role="button"], summary')) setMode('link')
      else if (target.closest('p, h1, h2, h3, h4, li, dd, dt, blockquote, figcaption')) setMode('text')
      else setMode('default')
    }
    const onLeave = () => {
      visibleRef.current = false
      setVisible(false)
    }
    const onEnter = () => {
      visibleRef.current = true
      setVisible(true)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [active, x, y])

  if (!active) return null

  const point =
    mode === 'link'
      ? { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0, 229, 255, 0.16)', borderColor: 'rgba(0, 229, 255, 0.55)' }
      : mode === 'text'
        ? { width: 2, height: 26, borderRadius: 1, backgroundColor: 'rgba(0, 229, 255, 0.95)', borderColor: 'rgba(0, 229, 255, 0)' }
        : { width: 7, height: 7, borderRadius: 4, backgroundColor: 'rgba(0, 229, 255, 1)', borderColor: 'rgba(0, 229, 255, 0)' }

  return (
    <>
      {/* The light: a wide, soft cyan glow lagging the pointer. */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[15] h-[560px] w-[560px] rounded-full mix-blend-screen"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.10) 0%, rgba(0, 229, 255, 0.035) 35%, transparent 65%)',
        }}
      />
      {/* The point. */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] border"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0, mixBlendMode: mode === 'link' ? 'normal' : 'difference' }}
        animate={point}
        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      />
    </>
  )
}
