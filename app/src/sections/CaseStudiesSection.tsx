import { useRef, type CSSProperties, type ReactNode } from 'react'
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import ScrollRevealText from '@/components/ScrollRevealText'
import SectionHeader from '@/components/SectionHeader'
import GhostIndex from '@/components/GhostIndex'
import TiltCard from '@/components/TiltCard'

// One card of the sticky stack: pinned below the header with a per-card
// offset so each successive card slides over the last, while the covered
// cards recede (scale + dim) in proportion to the stack's scroll progress.
function StackCard({
  index,
  total,
  progress,
  children,
}: {
  index: number
  total: number
  progress: MotionValue<number>
  children: ReactNode
}) {
  const reduced = useReducedMotion()
  const start = index / total
  const scale = useTransform(progress, [start, 1], [1, 1 - 0.06 * (total - 1 - index)])
  const opacity = useTransform(progress, [start, 1], [1, 1 - 0.35 * (total - 1 - index)])
  return (
    <div className="stack-card" style={{ '--stack-offset': `${index * 28}px` } as CSSProperties}>
      <m.div style={reduced ? undefined : { scale, opacity, transformOrigin: 'center top' }}>
        {children}
      </m.div>
    </div>
  )
}

type CaseStudy = {
  program: string
  vulnClass: string
  severity: 'Critical' | 'High'
  boundary: string
  approach: string
  impact: string
}

const featured: CaseStudy[] = [
  {
    program: 'Hootsuite',
    vulnClass: 'SSO authentication bypass',
    severity: 'Critical',
    boundary: 'The trust handshake between the identity provider and the application session.',
    approach: 'Read the SSO flow by hand and found a state the app treated as authenticated without a valid assertion.',
    impact: 'Account takeover was reachable by abusing the trust chain — no credentials required.',
  },
  {
    program: 'Adobe',
    vulnClass: 'Broken access control (IDOR)',
    severity: 'Critical',
    boundary: 'The tenant isolation boundary meant to keep one customer’s objects out of another’s reach.',
    approach: 'Enumerated object references against the authorization model instead of the UI’s happy path.',
    impact: 'Cross-tenant data was exposable — a confidentiality failure across customer boundaries.',
  },
  {
    program: 'Wrike',
    vulnClass: 'Authorization bypass',
    severity: 'High',
    boundary: 'The permission check standing between a member and a restricted workspace.',
    approach: 'Modeled the authorization logic to locate a path that skipped the server-side check.',
    impact: 'Sensitive workspace contents were disclosable to an under-privileged account.',
  },
]

const further = [
  { program: 'Instacart', vulnClass: 'Privilege escalation', severity: 'Critical' as const },
  { program: 'Fiverr', vulnClass: 'Session / OAuth misconfiguration', severity: 'High' as const },
  { program: 'Zillow', vulnClass: 'Account-recovery logic flaw', severity: 'High' as const },
]

// Severity gets its own vocabulary, distinct from the cyan link color:
// Critical is a filled cyan chip, High a brass outline.
function SeverityTag({ severity }: { severity: 'Critical' | 'High' }) {
  const critical = severity === 'Critical'
  return (
    <span
      className={`inline-flex items-center font-mono text-[12px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-sm border ${
        critical ? 'bg-cyan/10 text-cyan border-cyan/40' : 'text-brass border-brass/40'
      }`}
    >
      {severity}
    </span>
  )
}

export default function CaseStudiesSection() {
  const stackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start 96px', 'end end'] })

  return (
    <section id="work" className="section section-seam section-ghost bg-graphite-deep">
      <GhostIndex n="02" />
      <div className="shell relative">
        <SectionHeader
          index="02"
          label="Case studies"
          title="What the findings looked like to the business."
          lede="A selection of bug-bounty disclosures, framed the way a decision-maker reads them: which boundary was crossed, how it was found, and what it put at risk."
        />

        <div ref={stackRef} className="mt-14 space-y-6">
          {featured.map((c, i) => (
            <StackCard key={c.program} index={i} total={featured.length} progress={scrollYProgress}>
            <ScrollRevealText mode="line">
              <TiltCard>
              <article className="card card-lift p-7 lg:p-9">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 pb-6 border-b border-[var(--hairline)]">
                  <span aria-hidden="true" className="font-display text-brass text-[2rem] md:text-[2.6rem] leading-none">
                    0{i + 1}
                  </span>
                  <h3 className="section-title">{c.program}</h3>
                  <span className="data-label text-cream/70">{c.vulnClass}</span>
                  <span className="ml-auto"><SeverityTag severity={c.severity} /></span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 pt-6">
                  <div>
                    <div className="data-label text-brass/90 mb-2">Trust boundary</div>
                    <p className="body-sm">{c.boundary}</p>
                  </div>
                  <div>
                    <div className="data-label text-brass/90 mb-2">Approach</div>
                    <p className="body-sm">{c.approach}</p>
                  </div>
                  <div>
                    <div className="data-label text-brass/90 mb-2">Business impact</div>
                    <p className="body-sm">{c.impact}</p>
                  </div>
                </div>
              </article>
              </TiltCard>
            </ScrollRevealText>
            </StackCard>
          ))}
        </div>

        {/* Further disclosures */}
        <div className="mt-12">
          <div className="data-label text-cream/70 mb-2">Further disclosures</div>
          {further.map((f, i) => (
            <ScrollRevealText key={f.program} mode="line" delay={i * 0.06}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 py-4 border-t border-[var(--hairline)]">
                <span className="font-display text-xl text-cream min-w-[8rem]">{f.program}</span>
                <span className="data-label text-cream/70">{f.vulnClass}</span>
                <span className="ml-auto"><SeverityTag severity={f.severity} /></span>
              </div>
            </ScrollRevealText>
          ))}
          <div className="rule-break" aria-hidden="true" />
          <p className="mt-6 body-sm">
            All findings above were responsibly disclosed through each program’s bug-bounty process.
          </p>
        </div>
      </div>
    </section>
  )
}
