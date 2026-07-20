import ScrollRevealText from '@/components/ScrollRevealText'
import SectionHeader from '@/components/SectionHeader'

type Role = { org: string; role: string; period: string; location: string; highlights: string[] }

const experience: Role[] = [
  {
    org: 'Hootsuite',
    role: 'Offensive Security Researcher · Bug Bounty / Identity',
    period: 'Since May 2024',
    location: 'Remote',
    highlights: [
      'Identity and SSO trust-chain research across production deployments',
      'Broken-access-control patterns mapped for executive response',
    ],
  },
  {
    org: 'Premium Houseware',
    role: 'Security Advisor · Identity / Risk',
    period: 'Since 2023',
    location: 'Advisory',
    highlights: [
      'Boardroom-legible advisory reports for security-posture decisions',
      'Risk-to-exploitability translation for IAM and access-control programs',
    ],
  },
]

type Degree = { degree: string; field: string; notes: string[] }

const education: Degree[] = [
  {
    degree: 'MBA, Distinction',
    field: 'Business Administration',
    notes: ['Boardroom-ready advisory communication', 'Risk governance and executive reporting'],
  },
  {
    degree: 'BS',
    field: 'Applied Mathematics',
    notes: ['Cryptography, computation, probability foundations', 'Analytical rigor for adversarial reasoning'],
  },
]

export default function BackgroundSection() {
  return (
    <section id="background" className="section bg-graphite">
      <div className="shell">
        <SectionHeader index="07" label="Background" title="Experience & education." />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Experience */}
          <div>
            <div className="data-label text-cream/70 mb-2">Experience</div>
            {experience.map((r, i) => (
              <ScrollRevealText key={r.org} mode="line" delay={i * 0.05}>
                <div className="py-6 border-t border-[var(--hairline)]">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-xl text-cream">{r.org}</h3>
                    <span className="font-mono text-[12px] text-stone-muted">{r.period} · {r.location}</span>
                  </div>
                  <p className="mt-1 font-sans text-cream/80 text-[0.95rem]">{r.role}</p>
                  <ul className="mt-4 space-y-2">
                    {r.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-stone-muted text-[0.92rem] leading-relaxed">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-cyan/60 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealText>
            ))}
            <div className="border-t border-[var(--hairline)]" />
          </div>

          {/* Education */}
          <div>
            <div className="data-label text-cream/70 mb-2">Education</div>
            {education.map((e, i) => (
              <ScrollRevealText key={e.degree + e.field} mode="line" delay={i * 0.05}>
                <div className="py-6 border-t border-[var(--hairline)]">
                  <h3 className="font-display text-xl text-cream">{e.degree}</h3>
                  <p className="mt-1 font-sans text-cream/80 text-[0.95rem]">{e.field}</p>
                  <ul className="mt-4 space-y-2">
                    {e.notes.map((n) => (
                      <li key={n} className="flex items-start gap-2.5 text-stone-muted text-[0.92rem] leading-relaxed">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-cyan/60 flex-shrink-0" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealText>
            ))}
            <div className="border-t border-[var(--hairline)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
