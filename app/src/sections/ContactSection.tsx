import { m, type Variants } from 'framer-motion'
import ScrollRevealText from '@/components/ScrollRevealText'
import SectionHeader from '@/components/SectionHeader'
import MagneticButton from '@/components/MagneticButton'
import GhostIndex from '@/components/GhostIndex'
import { EASE } from '@/lib/motion'

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

const colVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export default function ContactSection() {
  return (
    <section id="contact" className="section section-seam section-ghost bg-graphite-deep">
      <GhostIndex n="08" />
      <div className="shell relative">
        <SectionHeader
          index="08"
          label="Contact"
          title="Worried about an SSO or access-control gap? Let's look at it."
        />

        {/* The closing gesture: the address itself, at display scale. */}
        <ScrollRevealText mode="line" className="mt-12">
          <a href={MAILTO} className="contact-giant inline-block">
            {EMAIL}
          </a>
        </ScrollRevealText>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-20 items-start">
          {/* Invitation */}
          <div>
            <ScrollRevealText mode="line" className="lede max-w-[36rem]">
              Available for advisory engagements, identity and access-control assessments, and executive briefings.
              The best first message is a specific one: the system, the boundary you're unsure about, and what it
              protects.
            </ScrollRevealText>
            <div className="mt-9">
              <MagneticButton href={MAILTO} className="btn-primary">Start an advisory conversation</MagneticButton>
            </div>
          </div>

          {/* Details — resolves alongside the header instead of popping in. */}
          <m.div
            variants={colVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <m.div variants={rowVariants} className="data-label text-cream/70 mb-2">Direct</m.div>
            {directLines.map((c) => (
              <m.a
                key={c.label}
                variants={rowVariants}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'me noopener noreferrer' : undefined}
                className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 py-4 border-t border-[var(--hairline)]"
              >
                <span className="data-label">{c.label}</span>
                <span className="font-mono text-[14px] text-cream/85 group-hover:text-cyan break-all sm:break-normal sm:text-right transition-[color,transform] motion-safe:group-hover:-translate-x-0.5">
                  {c.value}
                </span>
              </m.a>
            ))}
            <m.div variants={rowVariants} className="border-t border-[var(--hairline)]" />

            <m.div variants={rowVariants} className="data-label text-cream/70 mt-10 mb-2">Verify the record</m.div>
            <m.div variants={rowVariants} className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {platforms.map((p) => (
                <a key={p.label} href={p.href} target="_blank" rel="me noopener noreferrer" className="link-underline font-mono text-[13px] tracking-wide">
                  {p.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
