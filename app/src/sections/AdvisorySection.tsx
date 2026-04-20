import ScrollRevealText from '@/components/ScrollRevealText'

const advisory = [
  {
    title: 'Executive-Grade Security Advisory',
    desc: 'Reports designed for CEO/CISO action in fifteen minutes: exploitability, blast radius, and remediation sequencing.',
  },
  {
    title: 'Identity & Access Control Threat Modeling',
    desc: 'Adversarial reasoning against SSO trust chains, federation boundaries, and authorization logic.',
  },
  {
    title: 'Detection Pattern Engineering',
    desc: '40+ Broken Access Control patterns mapped into repeatable detection rules beyond signature-based tooling.',
  },
  {
    title: 'Compliance Alignment (When It Matters)',
    desc: 'Control mapping that supports decision-making without drowning engineers in paperwork.',
  },
]

export default function AdvisorySection() {
  return (
    <section id="advisory" className="relative py-[120px] bg-navy-deep">
      <div className="absolute inset-0 decorative-grid-faint pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-14">
          <ScrollRevealText mode="line" className="section-label mb-4">
            ADVISORY
          </ScrollRevealText>
          <ScrollRevealText mode="chars" as="h2" className="section-heading max-w-[860px] mx-auto mb-6">
            OFFENSIVE INTELLIGENCE → EXECUTIVE DECISIONS
          </ScrollRevealText>
          <ScrollRevealText mode="words" className="body-text max-w-[760px] mx-auto" delay={0.15}>
            This section absorbs the former scope/compliance framing into a single operating model: exploit reasoning, detection design,
            and boardroom-legible reporting.
          </ScrollRevealText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advisory.map((a) => (
            <div key={a.title} className="glass-card rounded-3xl">
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cyan">Module</div>
              <div className="mt-2 font-mono text-lg font-semibold uppercase tracking-[-0.01em] text-cream/90">
                {a.title}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-stone-muted">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
    </section>
  )
}

