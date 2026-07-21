import { Suspense, lazy, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import SafeImage from '@/components/SafeImage'
import MagneticButton from '@/components/MagneticButton'

// The 3D accent is its own lazy chunk — it never blocks first paint and is
// only fetched when motion is allowed.
const HeroNetwork = lazy(() => import('@/components/HeroNetwork'))

const proofSignals = [
  { value: 'Top 1%', label: 'HackerOne, global' },
  { value: '91.3%', label: 'Bugcrowd accuracy' },
  { value: '500+', label: 'Production environments' },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export default function HeroSection() {
  // Computed once at mount: skip the WebGL chunk entirely under reduced-motion.
  const [enable3D] = useState(
    () => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* 3D network accent — behind content, decorative, graceful when absent */}
      {enable3D && (
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <Suspense fallback={null}>
            <HeroNetwork />
          </Suspense>
        </div>
      )}

      <div className="shell-wide relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Left — statement */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="eyebrow mb-7">
              <span className="eyebrow-index">MA</span>
              <span className="h-px w-8 bg-[var(--hairline-strong)]" aria-hidden="true" />
              Muhammad Arslan Akhtar
            </motion.div>

            <motion.h1 variants={item} className="display-title">
              I find where identity<br className="hidden sm:block" /> trust chains{' '}
              <span className="italic text-brass">break</span>.
            </motion.h1>

            <motion.p variants={item} className="lede mt-7 max-w-[36rem]">
              Offensive security research in <span className="text-cream">SSO, IAM, and broken access control</span> —
              a manual methodology, tuned to authentication logic that automated scanners read straight past.
            </motion.p>

            <motion.p variants={item} className="body-text mt-4 max-w-[36rem]">
              I don't just report findings. I write the advisory a CISO can act on in one sitting: what an attacker
              can actually reach, what it puts at risk, and the order to fix it.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
              <MagneticButton href="#contact" className="btn-primary">Request an advisory</MagneticButton>
              <a href="#proof" className="btn-secondary">See the evidence</a>
            </motion.div>

            {/* Proof signals */}
            <motion.dl variants={item} className="mt-12 grid grid-cols-3 gap-6 max-w-[34rem] border-t border-[var(--hairline)] pt-7">
              {proofSignals.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="data-value text-2xl md:text-[1.7rem] font-medium leading-none">{s.value}</dd>
                  <p className="data-label mt-2 leading-snug">{s.label}</p>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Right — portrait */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
