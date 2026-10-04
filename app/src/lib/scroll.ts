import type Lenis from 'lenis'
import { prefersReducedMotion } from './motion'

// The Lenis instance lives in App's effect; registering it here lets anchor
// navigation ride the same easing instead of the browser's native curve.
let lenis: Lenis | null = null

export function registerLenis(instance: Lenis | null) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

/**
 * In-page navigation with the house easing and real a11y semantics:
 * scrolls via Lenis when active (native otherwise), updates the URL hash,
 * and moves focus to the target so keyboard/screen-reader reading order
 * follows the jump.
 */
export function scrollToHash(href: string) {
  const id = href.replace(/^#/, '')
  const el = document.getElementById(id)
  if (!el) return

  // Sections render in under content-visibility as the scroll passes them,
  // which can shift the target; snap to the true position on arrival.
  const correct = () => {
    const drift = Math.abs(el.getBoundingClientRect().top - 72)
    if (drift <= 4) return
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    if (lenis) lenis.scrollTo(top, { immediate: true, force: true })
    else window.scrollTo({ top })
  }

  const reduced = prefersReducedMotion()
  if (lenis && !reduced) {
    // force: true — the mobile menu stops Lenis while open, and a stopped
    // Lenis silently ignores scrollTo; menu taps must still navigate.
    // No manual offset: Lenis honors html's scroll-padding-top.
    lenis.scrollTo(el, { force: true, onComplete: correct })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
    window.setTimeout(correct, reduced ? 50 : 700)
  }

  // replaceState, not pushState: one-page site, so Back should leave the
  // page rather than unwind a stack of hash jumps.
  history.replaceState(null, '', href)

  // Make the jump real for assistive tech without re-scrolling.
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

export function scrollToTop() {
  const reduced = prefersReducedMotion()
  if (lenis && !reduced) lenis.scrollTo(0, { force: true })
  else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  history.replaceState(null, '', window.location.pathname)
}
