import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'HERO', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'ZENGUARD', href: '#zenguard' },
  { label: 'BUG BOUNTY', href: '#bugbounty' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'ADVISORY', href: '#advisory' },
  { label: 'PAKCYBERSHIELD', href: '#pakcybershield' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 pointer-events-none">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
          <div className="pointer-events-none mx-auto" style={{ maxWidth: scrolled ? 860 : 1040 }}>
            <div className="h-px bg-white/10" />
          </div>
          <div
            className={`pointer-events-auto mx-auto flex items-center justify-between rounded-full border transition-all duration-300 ${
              scrolled
                ? 'bg-white/6 border-white/12 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,212,255,0.10)]'
                : 'bg-white/3 border-white/10 backdrop-blur-xl'
            } ${scrolled ? 'h-12' : 'h-14'} ${scrolled ? 'px-4 md:px-5' : 'px-5 md:px-6'} `}
            style={{
              maxWidth: scrolled ? 860 : 1040,
            }}
          >
            {/* Left: Identity */}
            <button
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-mono text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase text-cream"
            >
              ARSLAN AKHTAR
            </button>

            {/* Center: Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-cream/70 hover:text-cream transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/mrarslanakhtar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B0C10] bg-[#D4AF37] px-4 py-2 rounded-full hover:brightness-110 transition-all duration-300 shadow-[0_0_24px_rgba(212,175,55,0.25)]"
              >
                LINKEDIN
              </a>

              {/* Mobile/Tablet Menu */}
              <button
                className="lg:hidden inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-xl w-10 h-10"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span className="sr-only">Toggle menu</span>
                <span className={`block w-5 h-px bg-cream transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
                <span className={`block w-5 h-px bg-cream transition-transform duration-300 -mt-[6px] ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy-deep/95 backdrop-blur-xl flex flex-col items-center justify-center gap-7 transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="font-mono text-xl md:text-2xl font-semibold uppercase tracking-[0.08em] text-cream/85 hover:text-cyan transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://www.linkedin.com/in/mrarslanakhtar/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 font-mono text-sm font-medium uppercase tracking-[0.1em] text-cyan border border-cyan px-7 py-3 rounded-full hover:bg-cyan hover:text-navy-deep transition-all duration-300"
        >
          LINKEDIN
        </a>
      </div>
    </>
  )
}
