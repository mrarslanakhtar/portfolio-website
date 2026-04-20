import { useEffect } from 'react'

export default function MouseParallax() {
  useEffect(() => {
    const isTouch = !window.matchMedia('(hover: hover)').matches
    if (isTouch) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let raf = 0
    let tx = 0
    let ty = 0
    let px = 0
    let py = 0

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      tx = nx
      ty = ny
    }

    const tick = () => {
      px += (tx - px) * 0.08
      py += (ty - py) * 0.08
      const x = Math.round(px * 18)
      const y = Math.round(py * 18)
      document.documentElement.style.setProperty('--px', `${x}px`)
      document.documentElement.style.setProperty('--py', `${y}px`)
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove as any)
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}

