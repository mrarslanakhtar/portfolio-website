import { useEffect, useRef, useState, type ReactNode } from 'react'

type LazySectionProps = {
  children: ReactNode
  /** Space reserved before the section mounts, to limit scroll jump. */
  minHeight?: number
  /** How far outside the viewport to start loading. */
  rootMargin?: string
}

/**
 * Defers mounting (and therefore the dynamic import) of its children until the
 * placeholder nears the viewport. Combined with React.lazy children this keeps
 * below-fold section chunks — and heavy deps like three.js — off the critical path.
 */
export default function LazySection({
  children,
  minHeight = 480,
  rootMargin = '600px 0px',
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  // If IntersectionObserver is unavailable, render immediately (no lazy gating).
  const [show, setShow] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (show) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, show])

  return (
    <div ref={ref} style={show ? undefined : { minHeight }}>
      {show ? children : null}
    </div>
  )
}
