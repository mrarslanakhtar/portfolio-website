import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealMode = 'chars' | 'words' | 'line'

export function useScrollReveal(mode: RevealMode = 'words', delay: number = 0) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (mode === 'line') {
      gsap.set(el, { opacity: 0, y: 10 })
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: prefersReducedMotion ? 0.2 : 0.4,
            delay,
            ease: 'power3.out',
          })
        },
      })
      return
    }

    // Split text into chars or words
    const text = el.textContent || ''
    el.innerHTML = ''

    const tokens = mode === 'chars' ? text.split('') : text.split(' ')
    const wrappers: HTMLSpanElement[] = []

    tokens.forEach((token, i) => {
      const outer = document.createElement('span')
      outer.style.display = 'inline-block'
      outer.style.overflow = 'hidden'
      outer.style.verticalAlign = 'top'

      const inner = document.createElement('span')
      inner.style.display = 'inline-block'
      inner.textContent = token
      inner.style.willChange = 'transform'

      outer.appendChild(inner)
      el.appendChild(outer)
      wrappers.push(inner)

      if (mode === 'words' && i < tokens.length - 1) {
        const space = document.createElement('span')
        space.innerHTML = '&nbsp;'
        space.style.display = 'inline-block'
        el.appendChild(space)
      }
    })

    gsap.set(wrappers, { y: '105%', opacity: 0 })

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(wrappers, {
          y: '0%',
          opacity: 1,
          duration: prefersReducedMotion ? 0.2 : mode === 'chars' ? 0.6 : 0.5,
          stagger: prefersReducedMotion ? 0 : mode === 'chars' ? 0.025 : 0.015,
          delay: delay + 0.1,
          ease: 'power3.out',
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [mode, delay])

  return ref
}
