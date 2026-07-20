const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mrarslanakhtar/' },
  { label: 'HackerOne', href: 'https://hackerone.com/mrarslanakhtar?type=user' },
  { label: 'Bugcrowd', href: 'https://bugcrowd.com/h/mrarslanakhtar' },
  { label: 'Medium', href: 'https://medium.com/@mrarslanakhtar' },
]

export default function FooterSection() {
  return (
    <footer className="bg-graphite-deep border-t border-[var(--hairline)]">
      <div className="shell py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_auto] gap-8 md:gap-10 items-start">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2 font-sans text-[15px] font-semibold text-cream">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden="true" />
              Muhammad Arslan Akhtar
            </div>
            <p className="mt-2 font-mono text-[12px] text-stone-muted tracking-wide">
              Offensive security research · SSO / IAM · Broken access control
            </p>
            <a href="mailto:mrarslan5156@gmail.com" className="mt-3 inline-block font-mono text-[13px] text-cream/80 hover:text-cyan transition-colors">
              mrarslan5156@gmail.com
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] tracking-[0.08em] text-stone-muted hover:text-cyan transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Status + back to top */}
          <div className="flex flex-col md:items-end gap-4">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-brass">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden="true" />
              Open to advisory engagements
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-mono text-[11px] tracking-[0.1em] uppercase text-stone-muted hover:text-cream transition-colors"
            >
              Back to top ↑
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--hairline)] font-mono text-[11px] tracking-wide text-stone-muted/70">
          © {new Date().getFullYear()} Muhammad Arslan Akhtar. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
