// Single source of truth for the house motion voice. The same curve is
// exposed to CSS as --ease-out in theme.css.
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
