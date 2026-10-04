import { useRef, useState } from 'react'
import { m, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'
import SafeImage from '@/components/SafeImage'
import MagneticButton from '@/components/MagneticButton'
import HeroNetwork from '@/components/HeroNetwork'
import Ticker from '@/components/Ticker'
import { EASE } from '@/lib/motion'
import { scrollToHash } from '@/lib/scroll'

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
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

// A poster: the statement owns the viewport, the portrait bleeds in from the
// right in monochrome and dissolves into the graphite, and the practice
// vocabulary runs as a ticker along the bottom edge.
export default function HeroSection({ booting = false }: { booting?: boolean }) {
  // Computed once at mount: the ambient canvas runs only on desktop with
  // motion allowed — on phones it would sit behind stacked text and burn
  // battery for faint noise.
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
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -28])

  const jump = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToHash(href)
  }

  return (
    <section id="hero" ref={sectionRef} className="relative overflow-hidden min-h-[100svh] flex flex-col">
      {/* Ambient network — behind everything, calmed over the type. */}
      {enableNetwork && (
        <div
          className="absolute inset-y-0 inset-x-0 max-w-[1760px] mx-auto z-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_62%_42%,black_20%,transparent_72%)]"
          aria-hidden="true"
        >
          <HeroNetwork />
        </div>
      )}

      {/* Portrait — full-bleed on the right at lg+, monochrome, dissolving
          into the graphite on its left and bottom edges. */}
      <m.div
        className="absolute inset-y-0 right-0 z-0 hidden lg:block w-[46%] pointer-events-none"
        style={reduced ? undefined : { y: portraitY }}
        initial={{ opacity: 0 }}
        animate={booting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        aria-hidden="true"
      >
        <div className="h-full w-full [mask-image:linear-gradient(90deg,transparent_0%,black_42%,black_100%),linear-gradient(180deg,transparent_0%,black_22%,black_62%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]">
          <SafeImage
            src="/images/office.jpg"
            avifSrc="/images/office.avif"
            webpSrc="/images/office.webp"
            width={840}
            height={1120}
            alt=""
            className="h-full w-full object-cover object-[65%_18%] grayscale contrast-[1.05] opacity-80"
            loading="eager"
            fetchPriority="high"
            fallbackText=""
          />
        </div>
      </m.div>

      <div className="shell-wide relative z-10 flex-1 flex flex-col justify-center pt-28 pb-10 md:pt-28 lg:pb-12">
        <m.div
          variants={container}
          initial="hidden"
          animate={booting ? 'hidden' : 'show'}
          style={reduced ? undefined : { y: textY }}
          className="lg:max-w-[78%]"
        >
          <m.div variants={item} className="eyebrow mb-8">
            <span className="eyebrow-index">MA</span>
            <span className="h-px w-8 bg-[var(--hairline-strong)]" aria-hidden="true" />
            Muhammad Arslan Akhtar
            <span className="hidden sm:inline text-stone-muted/70">· SSO & IAM security researcher</span>
          </m.div>

          <m.h1 variants={item} className="display-title">
            <span className="sr-only">Muhammad Arslan Akhtar — SSO &amp; IAM security researcher. </span>
            I find where
            <br />
            identity trust
            <br />
            chains <span className="italic text-brass">break</span>.
          </m.h1>
        </m.div>

        {/* Mobile portrait — stacked, with a bottom dissolve. */}
        <m.div
          className="lg:hidden mt-10 -mx-6 md:-mx-10 [mask-image:linear-gradient(180deg,black_55%,transparent_100%)]"
          initial={{ opacity: 0 }}
          animate={booting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        >
          <SafeImage
            src="/images/office.jpg"
            avifSrc="/images/office.avif"
            webpSrc="/images/office.webp"
            width={840}
            height={1120}
            alt="Muhammad Arslan Akhtar at his desk reviewing a security dashboard"
            className="w-full aspect-[4/5] max-h-[62vh] object-cover object-[65%_15%] grayscale opacity-85"
            loading="eager"
            fallbackText="MA"
          />
        </m.div>

        <m.div
          variants={container}
          initial="hidden"
          animate={booting ? 'hidden' : 'show'}
          className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,34rem)_1fr] gap-10 lg:gap-16 items-end"
        >
          <div>
            <m.p variants={item} className="lede">
              Offensive security research in <span className="text-cream">SSO, IAM, and broken access control</span> —
              a manual methodology, tuned to authentication logic that automated scanners read straight past.
              I don't just report findings; I write the advisory a CISO can act on in one sitting.
            </m.p>

            <m.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href="#contact" className="btn-primary" onClick={jump('#contact')}>
                Request an advisory
              </MagneticButton>
              <a href="#proof" className="btn-secondary" onClick={jump('#proof')}>
                See the evidence
              </a>
            </m.div>
          </div>

          {/* Proof signals */}
          <m.dl
            variants={item}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 lg:max-w-[30rem] lg:justify-self-end border-t border-[var(--hairline)] pt-6"
          >
            {proofSignals.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="data-value block text-2xl md:text-[1.9rem] font-medium leading-none">{s.value}</span>
                  <span aria-hidden="true" className="data-label block mt-2 leading-snug normal-case tracking-[0.08em]">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </m.dl>
        </m.div>
      </div>

      <div className="relative z-10">
        <Ticker />
      </div>
    </section>
  )
}
