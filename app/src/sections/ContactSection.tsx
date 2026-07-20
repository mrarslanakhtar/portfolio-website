import SectionHeader from '@/components/SectionHeader'

const EMAIL = 'mrarslan5156@gmail.com'
const MAILTO = `mailto:${EMAIL}?subject=Advisory%20enquiry`

const directLines = [
  { label: 'Email', value: EMAIL, href: MAILTO },
  { label: 'LinkedIn', value: 'linkedin.com/in/mrarslanakhtar', href: 'https://www.linkedin.com/in/mrarslanakhtar/' },
  { label: 'Phone', value: '+92 302 6082376', href: 'tel:+923026082376' },
]

const platforms = [
  { label: 'HackerOne', href: 'https://hackerone.com/mrarslanakhtar?type=user' },
  { label: 'Bugcrowd', href: 'https://bugcrowd.com/h/mrarslanakhtar' },
  { label: 'Medium', href: 'https://medium.com/@mrarslanakhtar' },
]

export default function ContactSection() {
  return (
    <section id="contact" className="section bg-graphite-deep">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-20 items-start">
          {/* Invitation */}
          <div>
            <SectionHeader
              index="08"
              label="Contact"
              title="Worried about an SSO or access-control gap? Let's look at it."
              lede="Available for advisory engagements, identity and access-control assessments, and executive briefings. The best first message is a specific one — the system, the boundary, what's keeping you up."
            />
            <div className="mt-9">
              <a href={MAILTO} className="btn-primary">Start an advisory conversation</a>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="data-label text-cream/70 mb-2">Direct</div>
            {directLines.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-baseline justify-between gap-4 py-4 border-t border-[var(--hairline)]"
              >
                <span className="data-label">{c.label}</span>
                <span className="font-mono text-[13px] text-cream/85 group-hover:text-cyan transition-colors text-right">
                  {c.value}
                </span>
              </a>
            ))}
            <div className="border-t border-[var(--hairline)]" />

            <div className="data-label text-cream/70 mt-10 mb-2">Verify the record</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {platforms.map((p) => (
                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" className="link-underline font-mono text-[12px] tracking-wide">
                  {p.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
