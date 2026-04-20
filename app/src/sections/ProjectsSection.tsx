import { useEffect, useRef } from 'react'
import { LayoutGroup, motion, type Variants } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollRevealText from '@/components/ScrollRevealText'

gsap.registerPlugin(ScrollTrigger)

type BugBountyRow = {
  program: string
  vulnerability: string
  impact: string
  cvss: number
  rewardUsd: number
  year: number
}

const bugBountyRows: BugBountyRow[] = [
  { program: 'Hootsuite', vulnerability: 'SSO Authentication Bypass', impact: 'Account takeover via trust-chain abuse', cvss: 10.0, rewardUsd: 12500, year: 2024 },
  { program: 'Adobe', vulnerability: 'Broken Access Control (IDOR)', impact: 'Cross-tenant data exposure', cvss: 10.0, rewardUsd: 9800, year: 2023 },
  { program: 'Instacart', vulnerability: 'Privilege Escalation', impact: 'Admin action execution', cvss: 9.1, rewardUsd: 7500, year: 2023 },
  { program: 'Wrike', vulnerability: 'Authorization Bypass', impact: 'Sensitive workspace disclosure', cvss: 8.8, rewardUsd: 6200, year: 2022 },
  { program: 'Fiverr', vulnerability: 'Session / OAuth Misconfiguration', impact: 'Identity pivot across apps', cvss: 8.2, rewardUsd: 4100, year: 2022 },
  { program: 'Zillow', vulnerability: 'Account Recovery Logic Flaw', impact: 'Credential reset takeover vector', cvss: 7.8, rewardUsd: 2675, year: 2021 },
]

type ProjectCard = {
  title: string
  tag: string
  desc: string
  highlights: string[]
  featured?: boolean
}

const projectCards: ProjectCard[] = [
  {
    title: 'ZenGuard Identity',
    tag: 'FLAGSHIP • AI ENGINE',
    desc: 'Proprietary adversarial reasoning engine trained on 500+ real-world vulnerability records and 40+ detection rule patterns for SSO misconfiguration detection.',
    highlights: ['Trust-chain analysis', 'Executive reporting', 'Detection pattern transfer'],
    featured: true,
  },
  {
    title: 'Enterprise SaaS Security Framework',
    tag: 'HOOTSUITE • IDENTITY',
    desc: 'Developed for Hootsuite, focusing on identity trust-chain research and automated SSO vulnerability mapping across production enterprise deployments.',
    highlights: ['Automated SSO mapping', 'Identity trust-chain research', 'Production-grade testing'],
  },
  {
    title: 'AIOps & Cloud Security Residency',
    tag: 'CLOUD • GRC',
    desc: 'Comprehensive implementation of automated vulnerability triage and GRC framework alignment for cloud-native environments with AI-powered prioritization.',
    highlights: ['Automated vulnerability triage', 'GRC framework alignment', 'Cloud-native architecture'],
  },
]

type TimelineItem = {
  org: string
  role: string
  start: string
  location: string
  highlights: string[]
}

const experienceItems: TimelineItem[] = [
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

function money(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

// Staggered reveal variants for framer-motion
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 22 },
  },
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const isTouch = !window.matchMedia('(hover: hover)').matches
    if (isTouch) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.01, 1.01, 1.01)`
    }

    const handleLeave = () => {
      el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)'
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    el.style.transition = 'transform 0.15s ease-out'

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return <div ref={ref} className={className}>{children}</div>
}

export default function ProjectsSection() {
  const tbodyVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.08 },
    },
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  }

  const totalEarnings = bugBountyRows.reduce((s, r) => s + r.rewardUsd, 0)

  return (
    <section id="projects" className="relative py-[120px] bg-navy-deep">
      <div className="absolute inset-0 decorative-grid-faint pointer-events-none" />

      <div className="relative w-full mx-auto px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="text-center mb-16">
          <ScrollRevealText mode="line" className="section-label mb-4">
            PROJECTS & INTELLIGENCE
          </ScrollRevealText>
          <ScrollRevealText mode="chars" as="h2" className="section-heading mx-auto mb-6">
            DATA STREAM & BUG BOUNTY RECORD
          </ScrollRevealText>
          <ScrollRevealText mode="words" className="body-text mx-auto" delay={0.15}>
            Operational timeline, project showcase, and curated high-signal production findings with severity context.
          </ScrollRevealText>
        </div>

        <div className="space-y-20">
          {/* Project Cards with Staggered Reveal + Tilt */}
          <div>
            <div className="mb-8 font-mono text-[14px] text-cyan uppercase tracking-widest border-b border-white/10 pb-2">
              Project Showcase
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {projectCards.map((p) => (
                <motion.div key={p.title} variants={cardVariants}>
                  <TiltCard
                    className={`glass-card rounded-3xl p-8 h-full ${p.featured ? 'lg:col-span-1 border-cyan/30 shadow-[0_0_30px_rgba(0,242,254,0.12)]' : ''}`}
                  >
                    <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cyan mb-3">{p.tag}</div>
                    <div className="font-heading text-xl font-bold uppercase tracking-[-0.01em] text-cream/95 mb-4">
                      {p.title}
                    </div>
                    <p className="text-[14px] text-stone-muted leading-relaxed mb-6">{p.desc}</p>
                    <ul className="space-y-2">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-[13px] leading-relaxed text-stone-muted">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan/80 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    {p.featured && (
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <a href="#zenguard" className="animated-underline font-mono text-[12px] font-medium uppercase tracking-[0.08em]">
                          View Details →
                        </a>
                      </div>
                    )}
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Experience Timeline with Staggered Reveal */}
          <div>
            <div className="mb-8 font-mono text-[14px] text-cyan uppercase tracking-widest border-b border-white/10 pb-2">
              Operational Timeline
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {experienceItems.map((it) => (
                <motion.div key={it.org} variants={cardVariants}>
                  <TiltCard className="glass-card rounded-3xl p-8 group h-full">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-cyan">{it.org}</div>
                        <div className="mt-2 font-heading text-lg font-bold text-cream/90 uppercase tracking-[-0.01em]">
                          {it.role}
                        </div>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-cream/55">Start</div>
                        <div className="mt-1 font-mono text-sm text-cream/80">{it.start}</div>
                        <div className="mt-1 font-mono text-[13px] text-stone-muted">{it.location}</div>
                      </div>
                    </div>
                    <ul className="mt-6 space-y-2">
                      {it.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-[14px] leading-relaxed text-stone-muted">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan/80 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bug Bounty Table */}
          <div>
            <div className="mb-8 font-mono text-[14px] text-cyan uppercase tracking-widest border-b border-white/10 pb-2 flex justify-between">
              <span>Bug Bounty Findings</span>
              <span className="text-cream/70">Total: <span className="text-cyan">{money(totalEarnings)}</span></span>
            </div>
            
            <LayoutGroup id="bugbounty-table">
              <div className="glass-card rounded-3xl p-0 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 bg-white/2 flex items-center justify-between">
                  <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-cream/55">
                    Curated high-severity reports
                  </div>
                  <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-cream/55">
                    CVSS 10.0 triggers red alert pulse
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-[880px] w-full">
                    <thead>
                      <tr className="text-left">
                        {['Program', 'Vulnerability', 'Impact', 'CVSS', 'Reward', 'Year'].map((h) => (
                          <th key={h} className="px-6 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-cream/60 border-b border-white/10">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <motion.tbody
                      variants={tbodyVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      {bugBountyRows.map((r) => {
                        const isTen = r.cvss >= 10
                        return (
                          <motion.tr
                            layout
                            key={`${r.program}-${r.vulnerability}`}
                            variants={rowVariants}
                            className="group border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                          >
                            <td className="px-6 py-5 font-mono text-[14px] text-cream/85">{r.program}</td>
                            <td className="px-6 py-5 text-[14px] text-cream/80">{r.vulnerability}</td>
                            <td className="px-6 py-5 text-[14px] text-stone-muted">{r.impact}</td>
                            <td className="px-6 py-5">
                              <div
                                className={[
                                  'inline-flex items-center justify-center px-3 py-1 rounded-full font-mono text-[13px] border',
                                  isTen ? 'text-red-300 border-red-400/40 bg-red-500/10' : 'text-cyan border-cyan/25 bg-cyan/5',
                                  isTen ? 'animate-pulse' : '',
                                ].join(' ')}
                                aria-label={isTen ? 'Critical severity (CVSS 10.0)' : 'Severity score'}
                              >
                                {r.cvss.toFixed(1)}
                              </div>
                            </td>
                            <td className="px-6 py-5 font-mono text-[14px] text-cream/85">{money(r.rewardUsd)}</td>
                            <td className="px-6 py-5 font-mono text-[14px] text-cream/70">{r.year}</td>
                          </motion.tr>
                        )
                      })}
                    </motion.tbody>
                  </table>
                </div>
              </div>
            </LayoutGroup>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
    </section>
  )
}
