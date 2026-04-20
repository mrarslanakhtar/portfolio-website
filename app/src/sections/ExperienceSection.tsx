import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollRevealText from '@/components/ScrollRevealText'

gsap.registerPlugin(ScrollTrigger)

type TimelineItem = {
  org: string
  role: string
  start: string
  location: string
  highlights: string[]
}

const items: TimelineItem[] = [
  {
    org: 'Hootsuite',
    role: 'Offensive Security Researcher (Bug Bounty / Identity)',
    start: 'May 2024',
    location: 'Remote',
    highlights: [
      'Identity and SSO trust-chain research across production deployments',
      'Broken Access Control detection patterns mapped for executive response',
    ],
  },
  {
    org: 'Premium Houseware',
    role: 'Security Advisor (Identity / Risk)',
    start: '2023',
    location: 'Advisory',
    highlights: [
      'Boardroom-legible advisory reports for security posture decisions',
      'Risk-to-exploitability translation for IAM and access control programs',
    ],
  },
]

export default function ExperienceSection() {
  const rootRef = useRef<HTMLElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const fill = fillRef.current
    const line = lineRef.current
    if (!root || !fill || !line) return

    gsap.set(fill, { height: 0 })
    gsap.to(fill, {
      height: () => line.offsetHeight,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top 75%',
        end: 'bottom 70%',
        scrub: true,
        invalidateOnRefresh: true,
      },
    })

    const nodes = root.querySelectorAll<HTMLElement>('[data-node]')
    nodes.forEach((node) => {
      ScrollTrigger.create({
        trigger: node,
        start: 'top 72%',
        once: true,
        onEnter: () => node.classList.add('is-active'),
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section ref={rootRef} id="experience" className="relative py-[120px] bg-navy-deep">
      <div className="absolute inset-0 decorative-grid-faint pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <ScrollRevealText mode="line" className="section-label mb-4">
            EXPERIENCE
          </ScrollRevealText>
          <ScrollRevealText mode="chars" as="h2" className="section-heading max-w-[760px] mx-auto mb-6">
            DATA STREAM TIMELINE
          </ScrollRevealText>
          <ScrollRevealText mode="words" className="body-text max-w-[680px] mx-auto" delay={0.15}>
            A vertical stream that lights up as you scroll—each node represents an operational chapter with executive-impact outcomes.
          </ScrollRevealText>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-8 lg:gap-12">
          {/* Stream line */}
          <div className="relative hidden lg:block">
            <div ref={lineRef} className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-white/10" />
            <div
              ref={fillRef}
              className="absolute left-1/2 top-0 -translate-x-1/2 w-px bg-cyan shadow-[0_0_30px_rgba(0,212,255,0.35)]"
            />
          </div>

          {/* Items */}
          <div className="space-y-8">
            {items.map((it) => (
              <div
                key={it.org}
                data-node
                className="group relative glass-card rounded-3xl p-8 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-[.is-active]:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_20%,rgba(0,212,255,0.20),transparent_55%)]" />
                </div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cyan">{it.org}</div>
                    <div className="mt-2 font-mono text-lg md:text-xl font-semibold text-cream/90 uppercase tracking-[-0.01em]">
                      {it.role}
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream/55">Start</div>
                    <div className="mt-1 font-mono text-sm text-cream/80">{it.start}</div>
                    <div className="mt-1 font-mono text-[12px] text-stone-muted">{it.location}</div>
                  </div>
                </div>

                <ul className="mt-6 space-y-2">
                  {it.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[13px] leading-relaxed text-stone-muted">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan/80 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
    </section>
  )
}

