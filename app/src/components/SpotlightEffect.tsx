import { useEffect } from 'react'

// One delegated listener feeds every .card its pointer position as CSS
// variables, which the card's ::after turns into a cursor-tracking glow.
export default function SpotlightEffect() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>('.card')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`)
      card.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return null
}
