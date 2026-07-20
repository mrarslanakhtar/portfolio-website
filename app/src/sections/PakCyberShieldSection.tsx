import ScrollRevealText from '@/components/ScrollRevealText'

export default function PakCyberShieldSection() {
  return (
    <section id="pakcybershield" className="relative py-[120px] bg-navy-deep">
      <div aria-hidden="true" className="absolute inset-0 decorative-grid-faint pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <ScrollRevealText mode="line" className="section-label mb-4">
              PLATFORM
            </ScrollRevealText>
            <ScrollRevealText mode="chars" as="h2" className="section-heading mb-6">
              PAKCYBERSHIELD
            </ScrollRevealText>
            <ScrollRevealText
              mode="words"
              className="body-text max-w-[560px]"
              delay={0.15}
            >
              PakCyberShield is a Bug Bounty-as-a-Service initiative powered by ZenGuard’s adversarial reasoning and detection patterns—built
              to connect vetted local security researchers with organizations across South Asia.
            </ScrollRevealText>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#zenguard" className="btn-outlined">
                ZENGUARD MODULE
              </a>
              <a href="#contact" className="btn-filled">
                PARTNER INQUIRY
              </a>
            </div>
          </div>

          <div className="glass-card rounded-3xl">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cyan">Operational Focus</div>
            <ul className="mt-6 space-y-3">
              {[
                'Researcher vetting + program integrity',
                'High-signal vulnerability triage and reporting',
                'Identity-centric attack surface modeling',
                'Repeatable detection pattern transfer',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[13px] leading-relaxed text-stone-muted">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan/80 flex-shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
    </section>
  )
}

