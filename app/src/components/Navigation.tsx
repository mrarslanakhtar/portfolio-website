import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { label: 'Proof', href: '#proof' },
  { label: 'Advisory', href: '#advisory' },
  { label: 'Work', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

const CV_HREF = '/cv/Arslan_CV_2026.pdf'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy: mark the section currently occupying the upper viewport as active.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Mobile menu: trap focus while open, close on Escape, return focus on close.
  useEffect(() => {
    if (!menuOpen) return
    const menu = menuRef.current
    if (!menu) return
    const toggle = toggleRef.current

    const focusables = Array.from(menu.querySelectorAll<HTMLElement>('a[href], button'))
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
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-graphite/85 backdrop-blur-md border-b border-[var(--hairline)]' : 'bg-transparent'
        }`}
      >
        <nav className="shell-wide flex items-center justify-between h-16" aria-label="Primary">
          {/* Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group inline-flex items-baseline gap-2 font-sans text-[15px] font-semibold tracking-tight text-cream"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brass transition-colors group-hover:bg-cyan" />
            M. Arslan Akhtar
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative font-sans text-[14px] tracking-tight transition-colors ${
                    isActive ? 'text-cream' : 'text-stone-muted hover:text-cream'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-cyan transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </a>
              )
            })}
            <a href={CV_HREF} target="_blank" rel="noopener noreferrer" className="btn-secondary !min-h-0 !py-2 !text-[13px]">
              CV
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            className="lg:hidden inline-flex flex-col items-center justify-center gap-[5px] w-11 h-11 rounded-md border border-[var(--hairline)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Toggle menu</span>
            <span className={`block w-5 h-px bg-cream transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-cream transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-cream transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        ref={menuRef}
        inert={!menuOpen}
        className={`fixed inset-0 z-40 bg-graphite-deep/97 backdrop-blur-xl flex flex-col items-center justify-center gap-6 transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="font-display text-2xl text-cream hover:text-cyan transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a href={CV_HREF} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-4">
          Download CV
        </a>
      </div>
    </>
  )
}
