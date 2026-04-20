import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollRevealText from '@/components/ScrollRevealText'
import AnimatedStat from '@/components/AnimatedStat'
import SafeImage from '@/components/SafeImage'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    const quote = quoteRef.current
    if (!section || !image || !quote) return

    // Image entrance
    gsap.set(image, { opacity: 0, scale: 0.97 })
    ScrollTrigger.create({
      trigger: image,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(image, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 })
      },
    })

    // Quote entrance
    gsap.set(quote, { opacity: 0, x: -10 })
    ScrollTrigger.create({
      trigger: quote,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(quote, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: 0.4 })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === image || st.trigger === quote) st.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-[120px] bg-navy-deep"
      id="about"
    >
      {/* Faint decorative grid */}
      <div className="absolute inset-0 decorative-grid-faint pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section label */}
        <ScrollRevealText mode="line" className="section-label mb-4">
          THE RESEARCHER
        </ScrollRevealText>

        {/* Heading */}
        <ScrollRevealText mode="chars" as="h2" className="section-heading max-w-[600px] mb-16">
          FROM A RENTED APARTMENT TO C-SUITE CONVERSATIONS
        </ScrollRevealText>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-16">
          {/* Left - Image */}
          <div ref={imageRef} className="relative opacity-0">
            {/* Cyan accent line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-[60%] bg-cyan z-10" />
            <div className="relative overflow-hidden group ml-1">
              <SafeImage
                src="/images/about-photo.jpg"
                alt="Muhammad Arslan Akhtar - Professional Portrait"
                className="w-full aspect-[3/4] object-cover object-top grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-600"
                loading="lazy"
                fallbackText="MA"
              />
              <div className="absolute inset-0 border border-transparent group-hover:border-cyan/30 transition-colors duration-600" />
            </div>
          </div>

          {/* Right - Text */}
          <div className="flex flex-col justify-center">
            <ScrollRevealText mode="words" className="body-text max-w-[520px] mb-6" delay={0.2}>
              Six years ago, in a rented apartment in Islamabad, I watched a friend type quietly on a laptop late into the night. He was earning dollars through bug bounties. My curiosity pulled me in. That same evening, I memorized an SSO authentication bypass proof of concept — a vulnerability that would later define my entire career.
            </ScrollRevealText>

            <ScrollRevealText mode="words" className="body-text max-w-[520px] mb-6" delay={0.3}>
              Today, I hold a Top 1% global ranking on HackerOne with a 99th percentile Impact score. I've engaged 500+ live production deployments, documented 40+ distinct Broken Access Control patterns that no commercial scanner can detect, and commanded advisory fees of up to $25,000 per engagement. My reports have been used as teaching papers at the University of Waterloo.
            </ScrollRevealText>

            <ScrollRevealText mode="words" className="body-text max-w-[520px] mb-8" delay={0.4}>
              My dual foundation — a BS in Applied Mathematics and an MBA with distinction — gives me an unfair advantage. Mathematics gave me cryptography, computation, and probability. The MBA gave me the language of the boardroom. I don't just find vulnerabilities. I write advisories that CEOs and CISOs can act on in fifteen minutes.
            </ScrollRevealText>

            {/* Quote */}
            <div ref={quoteRef} className="border-l-2 border-cyan pl-6 mb-10 opacity-0">
              <p className="font-display italic text-cream text-lg md:text-xl lg:text-2xl leading-relaxed max-w-[480px]">
                "Companies do not pay hackers. They pay advisors."
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
              <AnimatedStat end={500} suffix="+" label="ORGANIZATIONS ENGAGED" />
              <AnimatedStat end={40} suffix="+" label="DETECTION PATTERNS" />
              <AnimatedStat end={1} suffix="%" label="HACKERONE GLOBAL RANK" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
