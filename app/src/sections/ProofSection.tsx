import ScrollRevealText from '@/components/ScrollRevealText'
import AnimatedStat from '@/components/AnimatedStat'
import SectionHeader from '@/components/SectionHeader'
import GhostIndex from '@/components/GhostIndex'

type ProofRecord = {
  platform: string
  claim: string
  detail: string
  href?: string
  verify?: string
}

const records: ProofRecord[] = [
  {
    platform: 'HackerOne',
    claim: 'Top 1% globally · 99th-percentile impact',
    detail: 'Sustained record of valid, high-severity identity and access-control submissions.',
    href: 'https://hackerone.com/mrarslanakhtar?type=user',
    verify: 'View HackerOne profile',
  },
  {
    platform: 'Bugcrowd',
    claim: '91.3% submission accuracy · P1 at the 90th percentile',
    detail: 'High-signal reporting — most submissions accepted, weighted toward critical findings.',
    href: 'https://bugcrowd.com/h/mrarslanakhtar',
    verify: 'View Bugcrowd profile',
  },
  {
    platform: 'Recognition',
    claim: 'Recruited directly by Hootsuite’s VP of IT & Security',
    detail: 'Brought in for identity and SSO trust-chain research on the strength of prior advisory reporting.',
    href: 'https://www.linkedin.com/in/mrarslanakhtar/',
    verify: 'View LinkedIn profile',
  },
]

// The hero already shows Top 1% / 500+ Zendesk deployments / 91.3% — this
// band carries the figures not yet seen.
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center sm:text-left">
      <div className="stat-giant">{value}</div>
      <div className="data-label mt-3">{label}</div>
    </div>
  )
}

export default function ProofSection() {
  return (
    <section id="proof" className="section section-seam section-ghost bg-graphite">
      <GhostIndex n="01" />
      <div className="shell relative">
        <SectionHeader
          index="01"
          label="Proof & recognition"
          title="Evidence you can check yourself."
          lede="The figures below come from public platform records. Everything here is verifiable at the source — no self-reported dashboards."
        />

        {/* Stat band — poster scale, ruled between on desktop. */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 border-y border-[var(--hairline)] sm:divide-x sm:divide-[var(--hairline)]">
          <div className="py-10 sm:pr-8">
            <Stat value="6+" label="Years in identity & access" />
          </div>
          <div className="py-10 border-t sm:border-t-0 border-[var(--hairline)] sm:px-8">
            <AnimatedStat giant end={99} suffix="th" label="Percentile for impact, HackerOne" />
          </div>
          <div className="py-10 border-t sm:border-t-0 border-[var(--hairline)] sm:pl-8">
            <Stat value="90th" label="P1 severity percentile, Bugcrowd" />
          </div>
        </div>

        {/* Verifiable ledger */}
        <div className="mt-14">
          {records.map((r, i) => (
            <ScrollRevealText key={r.platform} mode="line" delay={i * 0.05}>
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-3 md:gap-8 items-baseline py-6 border-t border-[var(--hairline)]">
                <div className="data-label text-cream/80">{r.platform}</div>
                <div>
                  <p className="text-cream text-[1.25rem]">{r.claim}</p>
                  <p className="body-sm mt-1">{r.detail}</p>
                </div>
                {r.href && (
                  <a href={r.href} target="_blank" rel="me noopener noreferrer" className="link-underline font-mono text-[13px] tracking-wide whitespace-nowrap">
                    {r.verify} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </ScrollRevealText>
          ))}
          <div className="rule-break" aria-hidden="true" />
        </div>

        <p className="mt-8 body-sm max-w-prose">
          Program names elsewhere on this page refer to bug-bounty findings and disclosures — not commercial endorsements or ongoing client relationships.
        </p>
      </div>
    </section>
  )
}
