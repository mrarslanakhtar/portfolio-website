import ScrollRevealText from '@/components/ScrollRevealText'
import SectionHeader from '@/components/SectionHeader'

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

function SeverityTag({ severity }: { severity: 'Critical' | 'High' }) {
  const critical = severity === 'Critical'
  return (
    <span
      className={`inline-flex items-center font-mono text-[11px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-sm border ${
        critical ? 'text-cyan border-cyan/35' : 'text-stone-muted border-[var(--hairline-strong)]'
      }`}
    >
      {severity}
    </span>
  )
}

export default function CaseStudiesSection() {
  return (
    <section id="work" className="section bg-graphite">
      <div className="shell">
        <SectionHeader
          index="03"
          label="Case studies"
          title="What the findings looked like to the business."
          lede="A selection of bug-bounty disclosures, framed the way a decision-maker reads them: which boundary was crossed, how it was found, and what it put at risk. Reward figures are omitted; severity is shown as a band."
        />

        <div className="mt-14 space-y-6">
          {featured.map((c, i) => (
            <ScrollRevealText key={c.program} mode="line" delay={i * 0.05}>
              <article className="card card-lift p-7 lg:p-9">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-6 border-b border-[var(--hairline)]">
                  <h3 className="section-title-sm">{c.program}</h3>
                  <span className="data-label text-cream/70">{c.vulnClass}</span>
                  <span className="ml-auto"><SeverityTag severity={c.severity} /></span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 pt-6">
                  <div>
                    <div className="data-label text-brass/90 mb-2">Trust boundary</div>
                    <p className="body-text !text-[0.95rem]">{c.boundary}</p>
                  </div>
                  <div>
                    <div className="data-label text-brass/90 mb-2">Approach</div>
                    <p className="body-text !text-[0.95rem]">{c.approach}</p>
                  </div>
                  <div>
                    <div className="data-label text-brass/90 mb-2">Business impact</div>
                    <p className="body-text !text-[0.95rem]">{c.impact}</p>
                  </div>
                </div>
                <p className="mt-6 pt-5 border-t border-[var(--hairline)] font-mono text-[12px] tracking-wide text-stone-muted">
                  Outcome — responsibly disclosed through the program’s bug-bounty process.
                </p>
              </article>
            </ScrollRevealText>
          ))}
        </div>

        {/* Further disclosures */}
        <div className="mt-12">
          <div className="data-label text-cream/70 mb-2">Further disclosures</div>
          {further.map((f) => (
            <div
              key={f.program}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 py-4 border-t border-[var(--hairline)]"
            >
              <span className="font-display text-lg text-cream min-w-[8rem]">{f.program}</span>
              <span className="data-label text-cream/70">{f.vulnClass}</span>
              <span className="ml-auto"><SeverityTag severity={f.severity} /></span>
            </div>
          ))}
          <div className="border-t border-[var(--hairline)]" />
        </div>
      </div>
    </section>
  )
}
