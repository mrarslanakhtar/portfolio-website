import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SafeImage from '@/components/SafeImage'

const proofSignals = [
  { value: 'Top 1%', label: 'HackerOne, global' },
  { value: '91.3%', label: 'Bugcrowd accuracy' },
  { value: '500+', label: 'Production environments' },
]

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = root.querySelectorAll<HTMLElement>('[data-hero]')

    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 16 })
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.1,
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="hero" className="relative overflow-hidden">
      <div className="shell-wide pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Left — statement */}
          <div>
            <div data-hero className="eyebrow mb-7">
              <span className="eyebrow-index">MA</span>
              <span className="h-px w-8 bg-[var(--hairline-strong)]" aria-hidden="true" />
              Muhammad Arslan Akhtar
            </div>

            <h1 data-hero className="display-title">
              I find where identity<br className="hidden sm:block" /> trust chains{' '}
              <span className="italic text-brass">break</span>.
            </h1>

            <p data-hero className="lede mt-7 max-w-[36rem]">
              Offensive security research in <span className="text-cream">SSO, IAM, and broken access control</span> —
              a manual methodology, tuned to authentication logic that automated scanners read straight past.
            </p>

            <p data-hero className="body-text mt-4 max-w-[36rem]">
              I don't just report findings. I write the advisory a CISO can act on in one sitting: what an attacker
              can actually reach, what it puts at risk, and the order to fix it.
            </p>

            <div data-hero className="mt-9 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary">Request an advisory</a>
              <a href="#proof" className="btn-secondary">See the evidence</a>
            </div>

            {/* Proof signals */}
            <dl data-hero className="mt-12 grid grid-cols-3 gap-6 max-w-[34rem] border-t border-[var(--hairline)] pt-7">
              {proofSignals.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="data-value text-2xl md:text-[1.7rem] font-medium leading-none">{s.value}</dd>
                  <p className="data-label mt-2 leading-snug">{s.label}</p>
                </div>
              ))}
            </dl>
          </div>

          {/* Right — portrait */}
          <div data-hero className="relative">
            <div className="relative rounded-xl overflow-hidden border border-[var(--hairline-strong)] bg-graphite-surface/40">
              <SafeImage
                src="/images/hero-photo.jpg"
                avifSrc="/images/hero-photo.avif"
                webpSrc="/images/hero-photo.webp"
                width={560}
                height={700}
                alt="Muhammad Arslan Akhtar at his desk reviewing a security dashboard"
                className="w-full aspect-[4/5] object-cover object-top"
                loading="eager"
                fallbackText="MA"
              />
              {/* Caption strip */}
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-[var(--hairline)] bg-graphite-deep/70 backdrop-blur-sm">
                <div>
                  <div className="data-label">Focus</div>
                  <div className="mt-1 font-mono text-[12px] text-cream/85">SSO · IAM · Broken Access Control</div>
                </div>
                <div className="text-right">
                  <div className="data-label">Based in</div>
                  <div className="mt-1 font-mono text-[12px] text-cream/85">Islamabad · Remote</div>
                </div>
              </div>
            </div>
            {/* Restrained brass corner accent */}
            <span aria-hidden="true" className="absolute -top-2 -left-2 h-8 w-8 border-t border-l border-brass/60 rounded-tl-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
