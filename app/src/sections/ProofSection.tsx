import ScrollRevealText from '@/components/ScrollRevealText'
import AnimatedStat from '@/components/AnimatedStat'
import SectionHeader from '@/components/SectionHeader'

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
    platform: 'Writing',
    claim: 'Ongoing SSO / IAM research essays',
    detail: 'Published breakdowns of authentication and trust-chain failure modes.',
    href: 'https://medium.com/@mrarslanakhtar',
    verify: 'Read on Medium',
  },
]

export default function ProofSection() {
  return (
    <section id="proof" className="section bg-graphite">
      <div className="shell">
        <SectionHeader
          index="01"
          label="Proof & recognition"
          title="Evidence you can check yourself."
          lede="The figures below come from public platform records. Everything here is verifiable at the source — no self-reported dashboards."
        />

        {/* Stat band */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 border-y border-[var(--hairline)] py-10">
          <div className="text-center sm:text-left">
            <div className="font-display font-medium text-cream leading-none" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)' }}>
              Top&nbsp;1%
            </div>
            <div className="data-label mt-2">HackerOne, global rank</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-display font-medium text-cream leading-none" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontVariantNumeric: 'tabular-nums' }}>
              91.3%
            </div>
            <div className="data-label mt-2">Bugcrowd accuracy</div>
          </div>
          <AnimatedStat end={500} suffix="+" label="Production environments engaged" />
        </div>

        {/* Verifiable ledger */}
        <div className="mt-14">
          {records.map((r, i) => (
            <ScrollRevealText key={r.platform} mode="line" delay={i * 0.05}>
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-3 md:gap-8 items-baseline py-6 border-t border-[var(--hairline)]">
                <div className="data-label text-cream/80">{r.platform}</div>
                <div>
                  <p className="text-cream text-[1.05rem]">{r.claim}</p>
                  <p className="body-text mt-1 !text-[0.95rem]">{r.detail}</p>
                </div>
                {r.href && (
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="link-underline font-mono text-[12px] tracking-wide whitespace-nowrap">
                    {r.verify} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </ScrollRevealText>
          ))}
          <div className="border-t border-[var(--hairline)]" />
        </div>

        <p className="mt-8 body-text !text-[0.9rem] max-w-prose text-stone-muted/80">
          Program names elsewhere on this page refer to bug-bounty findings and disclosures — not commercial endorsements or ongoing client relationships.
        </p>
      </div>
    </section>
  )
}
