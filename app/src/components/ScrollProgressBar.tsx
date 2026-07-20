import { useEffect, useRef } from 'react'

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const update = () => {
      const doc = document.documentElement
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight)
      const p = Math.min(1, Math.max(0, window.scrollY / max))
      bar.style.transform = `scaleX(${p})`
      if (!prefersReducedMotion) raf = requestAnimationFrame(update)
    }

    let raf = requestAnimationFrame(update)
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-px bg-transparent" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-cyan/70"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

