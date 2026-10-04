import { useRef } from 'react'
import { m, useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion'
import { getLenis } from '@/lib/scroll'

const ITEMS = [
  'SSO',
  'IAM',
  'Broken access control',
  'OAuth · SAML · JWT',
  '500+ live Zendesk deployments',
  'Top 1% HackerOne',
  '99th-percentile impact',
  'Six years deep',
  'Advisory $15k – $25k',
  'Islamabad · Remote',
]

// Marquee of the practice vocabulary. Driven per-frame rather than by a CSS
// keyframe so it reacts to scrolling: wheel velocity from Lenis speeds it up
// (and reverses it on the way back up). Rendered twice for a seamless loop;
// the second copy is hidden from assistive tech. Static under reduced-motion.
export default function Ticker() {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const offset = useRef(0)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    const track = trackRef.current
    if (!track) return
    const half = track.scrollWidth / 2
    if (!half) return
    const velocity = getLenis()?.velocity ?? 0
    // Base drift plus a scroll-coupled term, clamped so a flick can't blur it.
    const speed = 40 + Math.max(-240, Math.min(240, velocity * 6))
    offset.current = (offset.current - (speed * delta) / 1000) % half
    if (offset.current > 0) offset.current -= half
    x.set(offset.current)
  })

  const row = (hidden: boolean) => (
    <span className="inline-flex items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="inline-flex items-center gap-6 pr-6 font-mono text-[13px] md:text-[14px] tracking-[0.18em] uppercase text-cream/75">
          {item}
          <span className="h-1 w-1 rounded-full bg-cyan" aria-hidden="true" />
        </span>
      ))}
    </span>
  )

  return (
    <div className="ticker border-y border-[var(--hairline)] py-4">
      <m.div ref={trackRef} className="ticker-track" style={reduced ? undefined : { x }}>
        {row(false)}
        {row(true)}
      </m.div>
    </div>
  )
}
