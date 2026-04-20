import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollRevealText from '@/components/ScrollRevealText'

gsap.registerPlugin(ScrollTrigger)

const contactMethods = [
  {
    label: 'EMAIL',
    value: 'mrarslan5156@gmail.com',
    href: 'mailto:mrarslan5156@gmail.com',
  },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/mrarslanakhtar',
    href: 'https://www.linkedin.com/in/mrarslanakhtar/',
  },
  {
    label: 'PHONE',
    value: '+92 302 6082376',
    href: 'tel:+923026082376',
  },
]

const platformLinks = [
  { label: 'HackerOne', href: 'https://hackerone.com/' },
  { label: 'BugCrowd', href: 'https://bugcrowd.com/' },
  { label: 'Medium', href: 'https://medium.com/' },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const divider = dividerRef.current
    const contacts = contactRef.current
    if (!divider || !contacts) return

    // Divider width animation
    gsap.set(divider, { width: 0 })
    ScrollTrigger.create({
      trigger: divider,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(divider, { width: 120, duration: 0.6, ease: 'power3.out' })
      },
    })

    // Contact methods stagger
    const methods = contacts.querySelectorAll('.contact-method')
    gsap.set(methods, { opacity: 0, y: 10 })
    ScrollTrigger.create({
      trigger: contacts,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(methods, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power3.out',
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === divider || st.trigger === contacts) st.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-[120px] pb-20 bg-navy-deep"
      id="contact"
    >
      {/* Background gradient from ZenGuard section */}
      <div className="absolute top-0 left-0 right-0 h-[200px] -translate-y-full" style={{ background: 'linear-gradient(to top, #02040a, #0a1628)' }} />

      <div className="relative max-w-[800px] mx-auto px-6 md:px-12 text-center">
        {/* Section label */}
        <ScrollRevealText mode="line" className="section-label mb-4">
          GET IN TOUCH
        </ScrollRevealText>

        {/* Heading */}
        <ScrollRevealText mode="chars" as="h2" className="section-heading max-w-[600px] mx-auto mb-6">
          LET'S BUILD SOMETHING SECURE
        </ScrollRevealText>

        {/* Subtitle */}
        <ScrollRevealText mode="words" className="body-text max-w-[480px] mx-auto mb-12" delay={0.2}>
          Available for advisory engagements, security assessments, and strategic consulting with C-suite leadership.
        </ScrollRevealText>

        {/* Contact Info Block */}
        <div ref={contactRef} className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-12">
          {contactMethods.map((method) => (
            <a
              key={method.label}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-method group text-center opacity-0"
            >
              <span className="block w-1 h-1 rounded-full bg-cyan mx-auto mb-3" />
              <span className="block section-label mb-1">{method.label}</span>
              <span className="font-mono text-sm font-medium text-cream group-hover:text-cyan transition-colors duration-300 relative">
                {method.value}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-12">
          <div ref={dividerRef} className="h-px bg-[rgba(0,212,255,0.15)]" />
        </div>

        {/* Professional Links */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-12">
          {platformLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="animated-underline font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone-muted hover:text-cyan transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <ScrollRevealText mode="line" delay={0.3}>
          <a
            href="mailto:mrarslan5156@gmail.com"
            className="btn-filled text-[13px] px-9 py-3.5 hover:bg-cyan-bright hover:-translate-y-0.5 hover:shadow-btn-hover transition-all duration-300"
          >
            SEND AN EMAIL
          </a>
        </ScrollRevealText>
      </div>
    </section>
  )
}
