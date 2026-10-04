import { useRef, useState } from 'react'
import { m, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'
import SafeImage from '@/components/SafeImage'
import MagneticButton from '@/components/MagneticButton'
import HeroNetwork from '@/components/HeroNetwork'
import { EASE } from '@/lib/motion'
import { scrollToHash } from '@/lib/scroll'

// The canvas accent is ~1KB gzip since the three.js removal — importing it
// statically beats a separate request plus a Suspense pop-in.

const proofSignals = [
  { value: 'Top 1%', label: 'HackerOne · 99th-percentile impact' },
  { value: '500+', label: 'Live Zendesk SSO deployments' },
  { value: '91.3%', label: 'Bugcrowd submission accuracy' },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export default function HeroSection({ booting = false }: { booting?: boolean }) {
  // Computed once at mount: the ambient canvas runs only where it decorates
  // the two-column composition — desktop, with motion allowed. On phones it
  // would sit behind the stacked text and burn battery for faint noise.
  const [enableNetwork] = useState(
    () =>
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      window.matchMedia('(min-width: 1024px)').matches,
  )
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Opposing micro-parallax as the hero scrolls away — depth without drama.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 44])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -22])

  return (
    <section id="hero" ref={sectionRef} className="relative overflow-hidden">
      {/* Network accent — behind content, decorative, graceful when absent.
          Masked back over the type column so the headline stays calm. */}
      {enableNetwork && (
        <div
          className="absolute inset-y-0 inset-x-0 max-w-[1760px] mx-auto z-0 pointer-events-none [mask-image:linear-gradient(90deg,rgba(0,0,0,0.35),rgba(0,0,0,0.75)_45%,black_70%)]"
          aria-hidden="true"
        >
          <HeroNetwork />
        </div>
      )}

      <div className="shell-wide relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Left — statement. The stagger holds until the preloader hands off,
              so the entrance is actually seen on first visit. */}
          <m.div
            variants={container}
            initial="hidden"
            animate={booting ? 'hidden' : 'show'}
            style={reduced ? undefined : { y: textY }}
          >
            <m.div variants={item} className="eyebrow mb-7">
              <span className="eyebrow-index">MA</span>
              <span className="h-px w-8 bg-[var(--hairline-strong)]" aria-hidden="true" />
              Muhammad Arslan Akhtar
            </m.div>

            <m.h1 variants={item} className="display-title">
              <span className="sr-only">Muhammad Arslan Akhtar — SSO &amp; IAM security researcher. </span>
              I find where identity<br className="hidden sm:block" /> trust chains{' '}
              <span className="italic text-brass">break</span>.
            </m.h1>

            <m.p variants={item} className="lede mt-7 max-w-[36rem]">
              Offensive security research in <span className="text-cream">SSO, IAM, and broken access control</span> —
              a manual methodology, tuned to authentication logic that automated scanners read straight past.
            </m.p>

            <m.p variants={item} className="body-text mt-4 max-w-[36rem]">
              I don't just report findings. I write the advisory a CISO can act on in one sitting: what an attacker
              can actually reach, what it puts at risk, and the order to fix it.
            </m.p>

            <m.div variants={item} className="mt-9 flex flex-wrap gap-3">
              <MagneticButton
                href="#contact"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHash('#contact')
                }}
              >
                Request an advisory
              </MagneticButton>
              <a
                href="#proof"
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHash('#proof')
                }}
              >
                See the evidence
              </a>
            </m.div>

            {/* Proof signals */}
            <m.dl variants={item} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 max-w-[34rem] border-t border-[var(--hairline)] pt-7">
              {proofSignals.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="data-value block text-2xl md:text-[1.7rem] font-medium leading-none">{s.value}</span>
                    <span aria-hidden="true" className="data-label block mt-2 leading-snug">{s.label}</span>
                  </dd>
                </div>
              ))}
            </m.dl>
          </m.div>

          {/* Right — portrait. Parallax rides an outer layer so it can't
              fight the entrance animation's y. */}
          <m.div className="relative" style={reduced ? undefined : { y: portraitY }}>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={booting ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            >
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
                fetchPriority="high"
                fallbackText="MA"
              />
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
            <span aria-hidden="true" className="absolute -top-2 -left-2 h-8 w-8 border-t border-l border-brass/60 rounded-tl-xl" />
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
