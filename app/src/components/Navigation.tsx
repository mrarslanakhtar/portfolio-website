import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { getLenis, scrollToHash } from '@/lib/scroll'
import { EASE } from '@/lib/motion'

const navLinks = [
  { label: 'Proof', href: '#proof' },
  { label: 'Work', href: '#work' },
  { label: 'Advisory', href: '#advisory' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

const CV_HREF = '/cv/Arslan_CV_2026.pdf'

const menuVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease: EASE, staggerChildren: 0.05, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: EASE } },
}
const menuItemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

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

  // Scrollspy: mark the section currently occupying the upper viewport as
  // active. The hero is observed too so scrolling back to the top clears
  // the highlight instead of leaving the last section stuck active.
  useEffect(() => {
    const ids = ['hero', ...navLinks.map((l) => l.href.slice(1))]
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

  // Mobile menu: lock page scroll, trap focus (toggle included), close on
  // Escape, return focus on close.
  useEffect(() => {
    if (!menuOpen) return
    const menu = menuRef.current
    if (!menu) return
    const toggle = toggleRef.current

    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'

    const focusables: HTMLElement[] = [
      ...(toggle ? [toggle] : []),
      ...Array.from(menu.querySelectorAll<HTMLElement>('a[href], button')),
    ]
    focusables[1]?.focus()

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
      document.body.style.overflow = ''
      lenis?.start()
      toggle?.focus()
    }
  }, [menuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    // Restart Lenis *before* scrolling. Lenis.start() calls reset(), which
    // kills any in-flight animation — if the menu-close effect cleanup ran
    // it a few ms after scrollTo, the jump would be cancelled (verified in
    // lenis 1.3). Started here, the cleanup's start() is a no-op.
    getLenis()?.start()
    document.body.style.overflow = ''
    setMenuOpen(false)
    scrollToHash(href)
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
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative inline-flex items-center min-h-[32px] font-sans text-[15px] tracking-tight transition-colors ${
                    isActive ? 'text-cream' : 'text-stone-muted hover:text-cream'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-1 left-0 h-px bg-cyan transition-all duration-300 ${
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
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            ref={menuRef}
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-40 bg-graphite-deep/[0.97] backdrop-blur-xl overflow-y-auto lg:hidden"
            style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
          >
            <nav
              aria-label="Mobile"
              className="min-h-full flex flex-col items-center justify-center py-24 gap-[clamp(0.75rem,2.5vh,1.25rem)]"
            >
              {navLinks.map((link, i) => (
                <m.a
                  key={link.href}
                  variants={menuItemVariants}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group inline-flex items-baseline gap-3 font-display text-[clamp(1.75rem,7vw,2.5rem)] text-cream hover:text-cyan transition-colors"
                >
                  <span aria-hidden="true" className="font-mono text-[13px] tracking-widest text-brass">
                    0{i + 1}
                  </span>
                  {link.label}
                </m.a>
              ))}
              <m.a
                variants={menuItemVariants}
                href={CV_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary mt-4"
              >
                Download CV
              </m.a>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
