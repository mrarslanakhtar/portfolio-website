import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollRevealText from '@/components/ScrollRevealText'
import SafeImage from '@/components/SafeImage'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    num: '01',
    title: 'Adversarial Reasoning',
    desc: 'Simulates attacker cognition to identify SSO trust chain exploitability in real-time',
  },
  {
    num: '02',
    title: 'Trust-Chain Analysis',
    desc: 'Models federation boundaries and identity pivots across complex enterprise SSO topologies',
  },
  {
    num: '03',
    title: 'Executive Reporting',
    desc: 'Generates audit-ready, boardroom-legible reports in minutes',
  },
  {
    num: '04',
    title: 'Detection Pattern Transfer',
    desc: 'Encodes Broken Access Control patterns into repeatable detection logic beyond static signatures',
  },
]

export default function ZenGuardSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const featuresEl = featuresRef.current
    const image = imageRef.current
    if (!featuresEl || !image) return

    // Feature items stagger
    const featureItems = featuresEl.querySelectorAll('.feature-item')
    gsap.set(featureItems, { opacity: 0, x: -15 })
    ScrollTrigger.create({
      trigger: featuresEl,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(featureItems, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power3.out',
        })
      },
    })

    // Image entrance
    gsap.set(image, { opacity: 0, scale: 0.97 })
    ScrollTrigger.create({
      trigger: image,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(image, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 })
      },
    })

    // Parallax background
    const bg = bgRef.current
    if (bg) {
      gsap.set(bg, { yPercent: -8 })
      gsap.to(bg, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === featuresEl || st.trigger === image) st.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-[120px] bg-navy-deep overflow-hidden"
      id="zenguard"
    >
      {/* Parallax banner background (polygon knight + brand banner layer) */}
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(5,6,11,0.65), rgba(5,6,11,0.92)), url('/images/polygon-knight-banner.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "url('/images/zenguard-brand-banner.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Decorative grid */}
      <div aria-hidden="true" className="absolute inset-0 decorative-grid pointer-events-none z-[1]" />

      <div className="relative w-full mx-auto px-6 md:px-12 lg:px-20 xl:px-32 z-[2]">
        {/* Section label */}
        <ScrollRevealText mode="line" className="section-label mb-4">
          PRODUCT
        </ScrollRevealText>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12">
          {/* Left - Product info */}
          <div>
            {/* ZenGuard Logo */}
            <ScrollRevealText mode="line" className="mb-5" delay={0.1}>
              <SafeImage
                src="/images/zenguard-logo.png"
                alt="ZenGuard Logo"
                className="w-16 md:w-20 h-auto animate-pulse-glow"
                loading="lazy"
                fallbackText="ZG"
              />
            </ScrollRevealText>

            {/* Heading */}
            <ScrollRevealText mode="chars" as="h2" className="section-heading mb-3">
              ZENGUARD
            </ScrollRevealText>

            {/* Subheading */}
            <ScrollRevealText mode="line" className="font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-cyan mb-6" delay={0.15}>
              AI-Powered SSO Misconfiguration Detection Engine
            </ScrollRevealText>

            {/* Description */}
            <ScrollRevealText mode="words" className="body-text mb-8" delay={0.2}>
              ZenGuard is a proprietary adversarial reasoning engine trained on 500+ real-world Zendesk vulnerability records and 40+ detection rule patterns accumulated over six years of active research. Unlike conventional tools that check boxes against static signatures, ZenGuard simulates the cognitive process of an elite attacker — analyzing complex trust relationships and configuration logic in real-time.
            </ScrollRevealText>

            {/* Feature List */}
            <div ref={featuresRef} className="space-y-5 mb-8">
              {features.map((f) => (
                <div
                  key={f.num}
                  className="feature-item border-l border-[rgba(0,212,255,0.15)] pl-4 hover:border-[rgba(0,212,255,0.4)] transition-colors duration-300 opacity-0"
                >
                  <span className="font-mono text-[11px] font-bold text-cyan tracking-[0.05em]">{f.num}</span>
                  <h3 className="font-mono text-sm font-semibold text-cream mt-1">{f.title}</h3>
                  <p className="text-[13px] text-stone-muted leading-relaxed mt-1">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <ScrollRevealText mode="line" delay={0.5}>
              <a
                href="https://www.linkedin.com/company/zenguard-identity/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outlined border-cyan text-cyan hover:bg-cyan hover:text-navy-deep"
              >
                VISIT ZENGUARD →
              </a>
            </ScrollRevealText>

            {/* PakCyberShield Integrated Section */}
            <ScrollRevealText mode="line" className="mt-10" delay={0.6}>
              <div className="glass-card rounded-3xl p-6">
                <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cyan mb-3">Platform • PakCyberShield</div>
                <div className="font-mono text-base font-semibold uppercase tracking-[-0.01em] text-cream/90 mb-3">
                  Bug Bounty-as-a-Service for South Asia
                </div>
                <p className="text-[13px] text-stone-muted leading-relaxed mb-5">
                  PakCyberShield is powered by ZenGuard's adversarial reasoning and detection patterns — built to connect vetted local security researchers with organizations across Pakistan, India, Bangladesh, and Sri Lanka.
                </p>
                <ul className="space-y-2">
                  {[
                    'Researcher vetting + program integrity',
                    'High-signal vulnerability triage and reporting',
                    'Identity-centric attack surface modeling',
                    'Repeatable detection pattern transfer',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[13px] leading-relaxed text-stone-muted">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan/80 flex-shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollRevealText>
          </div>

          {/* Right - Product Image */}
          <div ref={imageRef} className="flex items-center justify-center opacity-0">
            <div className="relative w-full">
              <div className="glass-card rounded-3xl p-8 md:p-10 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -inset-24 opacity-[0.30] bg-[radial-gradient(circle_at_30%_25%,rgba(0,212,255,0.25),transparent_55%)]" />
                  <div aria-hidden="true" className="absolute inset-0 decorative-grid-faint opacity-60" />
                </div>

                <div className="relative">
                  <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream/65">
                    Adversarial Reasoning Core
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <SafeImage
                      src="/images/zenguard-logo.png"
                      alt="ZenGuard Shield"
                      className="w-14 h-14 animate-pulse-glow"
                      loading="lazy"
                      fallbackText="ZG"
                    />
                    <div>
                      <h3 className="font-mono text-lg font-semibold uppercase tracking-[-0.01em] text-cream/90">
                        Shield + Fingerprint Identity
                      </h3>
                      <div className="mt-1 font-mono text-[12px] text-cyan/90">
                        Cognitive attacker simulation • SSO trust-chain exploitability
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {[
                      { k: 'MODE', v: 'OFFENSIVE' },
                      { k: 'DOMAIN', v: 'IAM / SSO' },
                      { k: 'DATASET', v: '500+' },
                      { k: 'RULES', v: '40+' },
                    ].map((x) => (
                      <div key={x.k} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
                        <div className="section-label">{x.k}</div>
                        <div className="mt-2 font-mono text-sm text-cream/85">{x.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(0,212,255,0.06)]" />
    </section>
  )
}
