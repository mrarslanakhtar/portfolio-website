import ScrollRevealText from '@/components/ScrollRevealText'
import SafeImage from '@/components/SafeImage'
import SectionHeader from '@/components/SectionHeader'

const zenGuardGoals = [
  { title: 'Trust-chain analysis', desc: 'Model federation boundaries and identity pivots across enterprise SSO topologies.' },
  { title: 'Adversarial reasoning', desc: 'Encode attacker-style hypotheses about authentication logic into repeatable checks.' },
  { title: 'Detection-pattern transfer', desc: 'Turn a single finding into a reusable pattern beyond static signatures.' },
  { title: 'Executive reporting', desc: 'Keep output legible to the people who make the remediation decision.' },
]

const pakFocus = [
  'Researcher vetting & program integrity',
  'High-signal vulnerability triage',
  'Identity-centric attack-surface modeling',
  'Repeatable detection-pattern transfer',
]

function StatusTag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-brass">
      <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden="true" />
      {children}
    </span>
  )
}

export default function InitiativesSection() {
  return (
    <section id="initiatives" className="section bg-graphite">
      <div className="shell">
        <SectionHeader
          index="05"
          label="Initiatives"
          title="Turning the method into something repeatable."
          lede="Two active initiatives — not shipped products. Both take the manual research approach and try to make it reusable for others."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
          {/* ZenGuard */}
          <ScrollRevealText mode="line">
            <article className="card card-lift p-7 lg:p-9 h-full">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <SafeImage
                    src="/images/zenguard-logo.svg"
                    alt="ZenGuard"
                    className="w-11 h-11"
                    loading="lazy"
                    fallbackText="ZG"
                  />
                  <div>
                    <h3 className="section-title-sm">ZenGuard</h3>
                    <p className="data-label mt-1">SSO misconfiguration detection</p>
                  </div>
                </div>
                <StatusTag>In development</StatusTag>
              </div>

              <p className="body-text mt-6">
                An initiative to encode years of manual SSO research into repeatable detection logic — modeling the trust
                relationships a scanner ignores. The aim isn't to replace judgment, but to make the patterns I document
                reusable. It is in active development, not a finished product.
              </p>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 border-t border-[var(--hairline)] pt-7">
                {zenGuardGoals.map((g) => (
                  <div key={g.title}>
                    <h4 className="font-sans text-cream text-[0.98rem] font-medium">{g.title}</h4>
                    <p className="body-text mt-1 !text-[0.9rem]">{g.desc}</p>
                  </div>
                ))}
              </div>

              <a
                href="https://www.linkedin.com/company/zenguard-identity/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-8 font-mono text-[12px] tracking-wide"
              >
                Follow ZenGuard <span aria-hidden="true">↗</span>
              </a>
            </article>
          </ScrollRevealText>

          {/* PakCyberShield */}
          <ScrollRevealText mode="line" delay={0.08}>
            <article className="card card-lift p-7 lg:p-9 h-full flex flex-col">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="section-title-sm">PakCyberShield</h3>
                  <p className="data-label mt-1">Bug-bounty-as-a-service · South Asia</p>
                </div>
                <StatusTag>Early stage</StatusTag>
              </div>

              <p className="body-text mt-6">
                An early-stage initiative to connect vetted local researchers with organizations across South Asia, using
                the same detection-pattern approach — building the vetting and triage side first.
              </p>

              <ul className="mt-6 space-y-3 border-t border-[var(--hairline)] pt-6">
                {pakFocus.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-stone-muted text-[0.95rem] leading-relaxed">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-cyan/60 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </article>
          </ScrollRevealText>
        </div>
      </div>
    </section>
  )
}
