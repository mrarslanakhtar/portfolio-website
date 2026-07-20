import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'ADVISORY', href: '#advisory' },
  { label: 'IMPACT', href: '#impact' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'ZENGUARD', href: '#zenguard' },
  { label: 'WRITING', href: '#writing' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: trap focus while open, close on Escape, return focus on close.
  useEffect(() => {
    if (!menuOpen) return
    const menu = menuRef.current
    if (!menu) return
    const toggle = toggleRef.current

    const focusables = Array.from(
      menu.querySelectorAll<HTMLElement>('a[href], button')
    )
    focusables[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (e.key === 'Tab' && focusables.length > 0) {
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      toggle?.focus()
    }
  }, [menuOpen])

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
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8">
          <div className="pointer-events-none mx-auto" style={{ maxWidth: scrolled ? 1100 : 1300 }}>
            <div className="h-px bg-white/10" />
          </div>
          <div
            className={`pointer-events-auto mx-auto flex items-center justify-between gap-6 md:gap-10 rounded-full border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(255,255,255,0.25)] ${
              scrolled
                ? 'bg-white/90 border-white/40 backdrop-blur-2xl shadow-[0_4px_30px_rgba(255,255,255,0.2)]'
                : 'bg-white/70 border-white/20 backdrop-blur-xl'
            } ${scrolled ? 'h-14' : 'h-16'} ${scrolled ? 'px-6 md:px-8' : 'px-6 md:px-10'} `}
            style={{
              maxWidth: scrolled ? 1100 : 1300,
              width: '100%',
            }}
          >
            {/* Links (Desktop) */}
            <div className="hidden lg:flex items-center justify-between flex-1 pr-6 lg:pr-12">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  whileHover={{ 
                    scale: 1.18, 
                    y: -5, 
                    backgroundColor: 'var(--cyan)', 
                    color: 'var(--background)',
                    boxShadow: '0 8px 24px rgba(0, 229, 255, 0.5)'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="relative font-mono text-[15px] font-extrabold uppercase tracking-[0.1em] text-navy-deep px-4 py-2 rounded-full transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <a
                href="/cv/Arslan_CV_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-navy-deep px-6 py-3 rounded-full transition-all duration-300 shadow-glow-border hover:shadow-[0_0_20px_rgba(0,229,255,0.5)]"
                style={{ background: 'linear-gradient(135deg, #00e5ff 0%, #64ffda 100%)', backdropFilter: 'blur(10px)' }}
              >
                My CV
              </a>

              {/* Mobile/Tablet Menu */}
              <button
                ref={toggleRef}
                className="lg:hidden inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-xl w-10 h-10"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
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
        id="mobile-menu"
        ref={menuRef}
        inert={!menuOpen}
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
          href="/cv/Arslan_CV_2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-navy-deep bg-cyan px-8 py-3.5 rounded-full shadow-[0_0_24px_rgba(0,212,255,0.4)] hover:shadow-[0_0_32px_rgba(0,212,255,0.6)] hover:bg-cyan-bright transition-all duration-300"
        >
          My CV
        </a>
      </div>
    </>
  )
}
