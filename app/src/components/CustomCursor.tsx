import { useEffect, useRef, useState } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'

// A cyan dot that tracks the pointer exactly, and a hairline ring that
// follows on a spring. Over interactive elements the ring swells; over text
// inputs it collapses. Fine pointers with motion allowed only — on touch and
// under reduced-motion nothing mounts and the native cursor stays.
export default function CustomCursor() {
  const [active] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [visible, setVisible] = useState(false)
  const visibleRef = useRef(false)
  const [mode, setMode] = useState<'default' | 'link' | 'text'>('default')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.5 })

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
      else if (target.closest('p, h1, h2, h3, li, dd, blockquote')) setMode('text')
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

  const ringSize = mode === 'link' ? 56 : mode === 'text' ? 12 : 36

  return (
    <>
      <m.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] h-2 w-2 rounded-full bg-cyan mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
      />
      <m.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] rounded-full border border-cream/70 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
        animate={{ width: ringSize, height: ringSize, borderColor: mode === 'link' ? 'rgba(0,229,255,0.9)' : 'rgba(240,240,230,0.7)' }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      />
    </>
  )
}
