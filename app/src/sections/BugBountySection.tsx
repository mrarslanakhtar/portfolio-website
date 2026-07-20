import { LayoutGroup, motion } from 'framer-motion'
import ScrollRevealText from '@/components/ScrollRevealText'

type BugBountyRow = {
  program: string
  vulnerability: string
  impact: string
  cvss: number
  rewardUsd: number
  year: number
}

const rows: BugBountyRow[] = [
  {
    program: 'Hootsuite',
    vulnerability: 'SSO Authentication Bypass',
    impact: 'Account takeover via trust-chain abuse',
    cvss: 10.0,
    rewardUsd: 12500,
    year: 2024,
  },
  {
    program: 'Adobe',
    vulnerability: 'Broken Access Control (IDOR)',
    impact: 'Cross-tenant data exposure',
    cvss: 10.0,
    rewardUsd: 9800,
    year: 2023,
  },
  {
    program: 'Instacart',
    vulnerability: 'Privilege Escalation',
    impact: 'Admin action execution',
    cvss: 9.1,
    rewardUsd: 7500,
    year: 2023,
  },
  {
    program: 'Wrike',
    vulnerability: 'Authorization Bypass',
    impact: 'Sensitive workspace disclosure',
    cvss: 8.8,
    rewardUsd: 6200,
    year: 2022,
  },
  {
    program: 'Fiverr',
    vulnerability: 'Session / OAuth Misconfiguration',
    impact: 'Identity pivot across apps',
    cvss: 8.2,
    rewardUsd: 4100,
    year: 2022,
  },
  {
    program: 'Zillow',
    vulnerability: 'Account Recovery Logic Flaw',
    impact: 'Credential reset takeover vector',
    cvss: 7.8,
    rewardUsd: 2675,
    year: 2021,
  },
]

const totalEarnings = rows.reduce((s, r) => s + r.rewardUsd, 0)

function money(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export default function BugBountySection() {
  const tbodyVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.08,
      },
    },
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  }

  return (
    <section id="bugbounty" className="relative py-[120px] bg-navy-deep">
      <div aria-hidden="true" className="absolute inset-0 decorative-grid-faint pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center">
          <ScrollRevealText mode="line" className="section-label mb-4">
            BUG BOUNTY INTELLIGENCE
          </ScrollRevealText>
          <ScrollRevealText mode="chars" as="h2" className="section-heading max-w-[760px] mx-auto mb-6">
            HIGH-ACCURACY SUBMISSION RECORD
          </ScrollRevealText>
          <ScrollRevealText mode="words" className="body-text max-w-[680px] mx-auto mb-10" delay={0.15}>
            This table reflects a curated, high-signal slice of production-grade findings with severity context and reward accuracy.
            Total HackerOne earnings: {money(totalEarnings)}.
          </ScrollRevealText>
        </div>

        <LayoutGroup id="bugbounty-table">
          <div className="glass-card rounded-3xl p-0 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 bg-white/2 flex items-center justify-between">
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream/70">
                Total: <span className="text-cyan">{money(totalEarnings)}</span>
              </div>
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream/55">
                CVSS 10.0 triggers red alert pulse
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[880px] w-full">
                <thead>
                  <tr className="text-left">
                    {['Program', 'Vulnerability', 'Impact', 'CVSS', 'Reward', 'Year'].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cream/60 border-b border-white/10"
                      >
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
                  {rows.map((r) => {
                    const isTen = r.cvss >= 10
                    return (
                      <motion.tr
                        layout
                        key={`${r.program}-${r.vulnerability}`}
                        variants={rowVariants}
                        className="group border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                      >
                        <td className="px-6 py-5 font-mono text-sm text-cream/85">{r.program}</td>
                        <td className="px-6 py-5 text-[13px] text-cream/80">{r.vulnerability}</td>
                        <td className="px-6 py-5 text-[13px] text-stone-muted">{r.impact}</td>
                        <td className="px-6 py-5">
                          <div
                            className={[
                              'inline-flex items-center justify-center px-3 py-1 rounded-full font-mono text-[12px] border',
                              isTen ? 'text-red-300 border-red-400/40 bg-red-500/10' : 'text-cyan border-cyan/25 bg-cyan/5',
                              isTen ? 'animate-pulse' : '',
                            ].join(' ')}
                            aria-label={isTen ? 'Critical severity (CVSS 10.0)' : 'Severity score'}
                          >
                            {r.cvss.toFixed(1)}
                          </div>
                        </td>
                        <td className="px-6 py-5 font-mono text-sm text-cream/85">{money(r.rewardUsd)}</td>
                        <td className="px-6 py-5 font-mono text-sm text-cream/70">{r.year}</td>
                      </motion.tr>
                    )
                  })}
                </motion.tbody>
              </table>
            </div>
          </div>
        </LayoutGroup>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
    </section>
  )
}

