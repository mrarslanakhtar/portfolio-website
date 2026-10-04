import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#@%&'

type DecryptTextProps = {
  text: string
  /** Start the resolve (false holds the scrambled state). */
  play?: boolean
  /** Total resolve time in ms. */
  duration?: number
  delay?: number
  className?: string
}

// Text resolves out of cipher noise, left to right — the "decrypting
// headline" moment. The real string is always in the accessibility tree;
// the animated glyphs are presentation only. Reduced-motion renders the
// final text immediately.
export default function DecryptText({ text, play = true, duration = 1100, delay = 0, className }: DecryptTextProps) {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState('')
  const raf = useRef(0)

  useEffect(() => {
    // Nothing to animate: the render below derives the static cases.
    if (reduced || !play) return
    let start = 0
    const total = text.length
    const tick = (now: number) => {
      if (!start) start = now
      const t = Math.max(0, (now - start - delay) / duration)
      const resolved = Math.floor(Math.min(1, t) * total)
      let out = ''
      for (let i = 0; i < total; i++) {
        const ch = text[i]
        if (i < resolved || ch === ' ') out += ch
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      setShown(out)
      if (t < 1) raf.current = requestAnimationFrame(tick)
      else setShown(text)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [text, play, duration, delay, reduced])

  const display = reduced ? text : play ? shown : ''

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display || ' '}</span>
    </span>
  )
}
