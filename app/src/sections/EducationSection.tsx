import ScrollRevealText from '@/components/ScrollRevealText'

const education = [
  {
    degree: 'MBA (Distinction)',
    field: 'Business Administration',
    notes: ['Boardroom-ready security advisory communication', 'Risk governance and executive reporting'],
  },
  {
    degree: 'BS',
    field: 'Applied Mathematics',
    notes: ['Cryptography, computation, probability foundations', 'Analytical rigor for adversarial reasoning'],
  },
]

export default function EducationSection() {
  return (
    <section id="education" className="relative py-[120px] bg-navy-deep">
      <div aria-hidden="true" className="absolute inset-0 decorative-grid-faint pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-14">
          <ScrollRevealText mode="line" className="section-label mb-4">
            EDUCATION
          </ScrollRevealText>
          <ScrollRevealText mode="chars" as="h2" className="section-heading max-w-[760px] mx-auto mb-6">
            MATHEMATICS + BOARDROOM LANGUAGE
          </ScrollRevealText>
          <ScrollRevealText mode="words" className="body-text max-w-[680px] mx-auto" delay={0.15}>
            The combination is deliberate: technical rigor for exploit reasoning, and executive clarity for decisions that ship.
          </ScrollRevealText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((e) => (
            <div key={e.degree} className="glass-card rounded-3xl">
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cyan">Credential</div>
              <h3 className="mt-2 font-mono text-xl font-semibold uppercase tracking-[-0.01em] text-cream/90">
                {e.degree}
              </h3>
              <div className="mt-2 font-mono text-sm text-cream/70">{e.field}</div>
              <ul className="mt-6 space-y-2">
                {e.notes.map((n) => (
                  <li key={n} className="flex items-start gap-3 text-[13px] leading-relaxed text-stone-muted">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan/80 flex-shrink-0" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
    </section>
  )
}

