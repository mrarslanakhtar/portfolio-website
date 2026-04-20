import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'

type ScrambleHeadlineProps = {
  text: string
  className?: string
  wordStagger?: number
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function scrambleTo(target: string, progress: number) {
  const revealed = Math.floor(target.length * progress)
  let out = ''
  for (let i = 0; i < target.length; i++) {
    const ch = target[i]
    if (ch === ' ') {
      out += ' '
      continue
    }
    if (i < revealed) {
      out += ch
      continue
    }
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return out
}

export default function ScrambleHeadline({
  text,
  className,
  wordStagger = 0.12,
}: ScrambleHeadlineProps) {
  const rootRef = useRef<HTMLHeadingElement>(null)
  const words = useMemo(() => text.split(' '), [text])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      root.querySelectorAll('[data-word]').forEach((el) => {
        ;(el as HTMLElement).textContent = (el as HTMLElement).dataset.word || ''
      })
      return
    }

    const wordEls = Array.from(root.querySelectorAll<HTMLElement>('[data-word]'))
    const tl = gsap.timeline({ delay: 0.35 })

    wordEls.forEach((el, idx) => {
      const target = el.dataset.word || ''
      const state = { p: 0 }
      tl.to(
        state,
        {
          p: 1,
          duration: 0.75,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = scrambleTo(target, state.p)
          },
          onComplete: () => {
            el.textContent = target
          },
        },
        idx * wordStagger
      )
    })

    return () => {
      tl.kill()
    }
  }, [text, wordStagger])

  return (
    <h1 ref={rootRef} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block">
          <span data-word={w} className="inline-block will-change-[contents]">
            {w}
          </span>
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </h1>
  )
}

