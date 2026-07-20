import ScrollRevealText from '@/components/ScrollRevealText'
import SectionHeader from '@/components/SectionHeader'

const specialization = [
  'SSO misconfiguration across Zendesk-backed identity bridges',
  'Federation boundaries and identity pivots in enterprise SSO',
  'OAuth, SAML, and JWT trust relationships',
  'Authentication-bypass and authorization-logic flaws',
]

type Module = { title: string; desc: string }

const modules: Module[] = [
  {
    title: 'Executive-grade advisory',
    desc: 'Reports built for CEO/CISO action in a single sitting — exploitability, blast radius, and the order in which to fix.',
  },
  {
    title: 'Identity & access threat modeling',
    desc: 'Adversarial reasoning against SSO trust chains, federation boundaries, and authorization logic — not a checklist scan.',
  },
  {
    title: 'Detection-pattern engineering',
    desc: 'A documented library of broken-access-control patterns, encoded into repeatable detection logic beyond static signatures.',
  },
  {
    title: 'Compliance alignment, when it matters',
    desc: 'Control mapping that supports the decision without burying engineers in paperwork.',
  },
]

export default function AdvisorySection() {
  return (
    <section id="advisory" className="section bg-graphite-deep">
      <div className="shell">
        <SectionHeader
          index="02"
          label="Advisory & specialization"
          title="A specialization most testers never reach."
          lede="Automated tools check boxes against static signatures. The findings that matter live in authentication logic and trust relationships — and those are read by hand."
        />

        {/* Narrative + specialization panel */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16">
          <div>
            <ScrollRevealText mode="line" className="body-text">
              Six years in, the method hasn't changed: read the authentication flow by hand, map every trust boundary an
              identity crosses, and look for the pivot a scanner can't model. That patience is the whole edge — it's where
              SSO bypasses and cross-tenant access-control failures actually hide.
            </ScrollRevealText>
            <ScrollRevealText mode="line" className="body-text mt-5" delay={0.05}>
              A BS in applied mathematics supplies the exploit reasoning — cryptography, computation, probability. An MBA,
              with distinction, supplies the boardroom language. The combination is deliberate: I don't just find the
              vulnerability, I translate it into a decision leadership can make. Advisory engagements run up to $25,000.
            </ScrollRevealText>

            <ScrollRevealText mode="line" className="mt-10" delay={0.1}>
              <blockquote className="border-l-2 border-brass pl-6">
                <p className="font-display italic text-cream text-2xl md:text-[1.9rem] leading-snug">
                  “Companies don't pay hackers. They pay advisors.”
                </p>
              </blockquote>
            </ScrollRevealText>
          </div>

          {/* Specialization panel */}
          <div className="card p-7 lg:p-8 self-start">
            <div className="data-label text-cream/80">Where the work concentrates</div>
            <ul className="mt-6 space-y-4">
              {specialization.map((s) => (
                <li key={s} className="flex items-start gap-3 text-cream/90 text-[0.98rem] leading-relaxed">
                  <span aria-hidden="true" className="mt-2 h-1 w-4 bg-cyan/70 flex-shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Advisory work — editorial numbered list */}
        <div className="mt-16">
          <div className="data-label text-cream/70 mb-2">How the engagement is delivered</div>
          {modules.map((m, i) => (
            <ScrollRevealText key={m.title} mode="line" delay={i * 0.05}>
              <div className="grid grid-cols-1 md:grid-cols-[64px_1fr] gap-3 md:gap-8 items-baseline py-7 border-t border-[var(--hairline)]">
                <div className="font-mono text-brass text-[13px] tracking-widest">0{i + 1}</div>
                <div className="md:grid md:grid-cols-[minmax(0,320px)_1fr] md:gap-10">
                  <h3 className="section-title-sm">{m.title}</h3>
                  <p className="body-text mt-2 md:mt-0">{m.desc}</p>
                </div>
              </div>
            </ScrollRevealText>
          ))}
          <div className="border-t border-[var(--hairline)]" />
        </div>
      </div>
    </section>
  )
}
