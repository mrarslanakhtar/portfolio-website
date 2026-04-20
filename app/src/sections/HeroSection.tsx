import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import CountUp from 'react-countup'
import { LayoutGroup, motion } from 'framer-motion'
import ScrambleHeadline from '@/components/ScrambleHeadline'
import SafeImage from '@/components/SafeImage'
import Reticle from '@/components/Reticle'

function ThreatMapBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const nodes = Array.from({ length: Math.min(120, Math.floor(window.innerWidth / 10)) }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.8 + 0.4,
      o: Math.random() * 0.35 + 0.08,
    }))

    const maxD = 170

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(0,0,0,0)'

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        if (!prefersReducedMotion) {
          a.x += a.vx
          a.y += a.vy
          if (a.x < 0 || a.x > canvas.width) a.vx *= -1
          if (a.y < 0 || a.y > canvas.height) a.vy *= -1
        }

        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${a.o})`
        ctx.fill()

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < maxD) {
            const alpha = 0.12 * (1 - d / maxD)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      if (!prefersReducedMotion) requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-70" />
}

type Metric = {
  label: string
  value: number
  suffix?: string
  note: string
}

function MetricCard({ metric, active }: { metric: Metric; active: boolean }) {
  return (
    <motion.div
      layout
      className="glass-card group rounded-2xl p-6"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <div className="section-label mb-3">{metric.label}</div>
      <div className="font-mono font-bold text-cyan" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)' }}>
        <CountUp
          start={0}
          end={active ? metric.value : 0}
          duration={1.2}
          separator=","
          preserveValue={true}
        />
        {metric.suffix ? <span>{metric.suffix}</span> : null}
      </div>
      <p className="mt-3 text-[12px] leading-relaxed text-stone-muted">{metric.note}</p>
    </motion.div>
  )
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const [showIndicator, setShowIndicator] = useState(true)
  const [metricsActive, setMetricsActive] = useState(false)

  const metrics = useMemo<Metric[]>(
    () => [
      { label: 'HACKERONE EARNINGS', value: 42775, suffix: '', note: 'Lifetime bounty earnings — verified dataset.', },
      { label: 'GLOBAL RANK', value: 1, suffix: '%', note: 'Top 1% on HackerOne (global).', },
      { label: 'IMPACT SCORE', value: 99, suffix: 'TH %', note: '99th percentile impact performance.', },
      { label: 'ORGANIZATIONS ENGAGED', value: 500, suffix: '+', note: 'Live production environments across enterprise programs.', },
    ],
    []
  )

  useEffect(() => {
    const onScroll = () => setShowIndicator(window.scrollY <= 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.set('.hero-fade', { opacity: 0, y: 14 })
    gsap.set('.hero-frame', { opacity: 0, scale: 0.985 })

    const tl = gsap.timeline({ delay: 0.15 })
    tl.to('.hero-fade', { opacity: 1, y: 0, duration: prefersReducedMotion ? 0.2 : 0.65, stagger: 0.08, ease: 'power3.out' })
      .to('.hero-frame', { opacity: 1, scale: 1, duration: prefersReducedMotion ? 0.2 : 0.8, ease: 'power3.out' }, 0.25)
      .add(() => setMetricsActive(true), 0.45)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] overflow-hidden bg-navy-deep" id="hero">
      <div className="absolute inset-0 z-[0]">
        <ThreatMapBackground />
      </div>
      <div className="absolute inset-0 decorative-grid pointer-events-none z-[1]" />
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{ boxShadow: 'inset 0 0 220px rgba(5, 6, 11, 0.85)' }} />

      <div className="relative z-[3] w-full mx-auto px-6 md:px-12 lg:px-20 xl:px-32 pt-28 md:pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[44%_56%] gap-10 lg:gap-14 items-center">
          {/* Left: Metrics + headline */}
          <div>
            <div className="hero-fade">
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-cyan">
                Elite Offensive Security Researcher • Top 1% HackerOne
              </div>
            </div>

            <div className="hero-fade mt-4">
              <ScrambleHeadline
                text="ELITE OFFENSIVE SECURITY RESEARCHER"
                className="display-heading text-shadow-hero"
              />
            </div>

            <div className="hero-fade mt-6">
              <p className="body-text">
                Offensive intelligence for identity and access control. High-signal reporting for executive action. Precision research across real production SSO trust chains.
              </p>
            </div>

            <div className="hero-fade mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="btn-filled">
                BUG BOUNTY DATA
              </a>
              <a href="#contact" className="btn-outlined">
                CONTACT
              </a>
            </div>

            <div className="mt-10">
              <LayoutGroup id="hero-metrics">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {metrics.map((m) => (
                    <MetricCard key={m.label} metric={m} active={metricsActive} />
                  ))}
                </div>
              </LayoutGroup>
            </div>
          </div>

          {/* Right: Portrait in threat-map frame */}
          <div className="hero-frame">
            <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
              {/* Frame UI chrome */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-x-0 top-0 h-12 border-b border-white/10 bg-white/2" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[rgba(255,80,80,0.7)]" />
                  <span className="w-2 h-2 rounded-full bg-[rgba(255,205,80,0.6)]" />
                  <span className="w-2 h-2 rounded-full bg-[rgba(120,255,150,0.55)]" />
                </div>
                <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.12em] uppercase text-cream/60">
                  THREAT MAP / PORTRAIT
                </div>
                <div className="absolute inset-0">
                  <div className="absolute -inset-24 opacity-[0.18] bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.25),transparent_55%)]" />
                </div>
                {/* Corner brackets */}
                <div className="absolute left-4 top-16 w-6 h-6 border-l border-t border-cyan/60" />
                <div className="absolute right-4 top-16 w-6 h-6 border-r border-t border-cyan/60" />
                <div className="absolute left-4 bottom-4 w-6 h-6 border-l border-b border-cyan/60" />
                <div className="absolute right-4 bottom-4 w-6 h-6 border-r border-b border-cyan/60" />
              </div>

              <div className="pt-16 pb-10 flex justify-center">
                <div className="relative">
                  <Reticle className="p-4 rounded-xl">
                    <div className="relative rounded-lg overflow-hidden w-full max-w-[280px]">
                      <SafeImage
                        src="/images/hero-photo.jpg"
                        alt="Muhammad Arslan Akhtar — OSCP portrait"
                        className="w-full aspect-[4/5] object-cover object-top"
                        loading="eager"
                        fallbackText="MA"
                      />
                      {/* Scanline overlay */}
                      <div className="absolute inset-0 scanline-overlay pointer-events-none z-10" />
                      {/* Cyan glow vignette */}
                      <div className="absolute inset-0 pointer-events-none z-[11]" style={{ boxShadow: 'inset 0 0 80px rgba(0, 229, 255, 0.12)' }} />
                    </div>
                  </Reticle>
                  <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 120px rgba(5, 6, 11, 0.55)' }} />
                </div>
              </div>

              {/* Threat-map HUD footer */}
              <div className="grid grid-cols-2 gap-4 px-5 py-4 border-t border-white/10 bg-white/2">
                <div>
                  <div className="section-label">FOCUS</div>
                  <div className="font-mono text-xs text-cream/85 mt-1">SSO / IAM / BROKEN ACCESS CONTROL</div>
                </div>
                <div className="text-right">
                  <div className="section-label">SIGNAL</div>
                  <div className="font-mono text-xs text-cyan mt-1">TOP 1% • $42,775</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-3 transition-opacity duration-500 hidden md:flex ${
          showIndicator ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="relative w-px h-10 bg-white/20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan animate-scroll-dot" />
        </div>
        <span className="section-label">SCROLL</span>
      </div>
    </section>
  )
}
