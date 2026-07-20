export default function FooterSection() {
  return (
    <footer className="relative bg-navy-deep">
      <div className="w-full mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-10">
        <div className="h-px bg-white/5 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-2">
            <div className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-cream/70">
              Contact
            </div>
            <a
              className="font-mono text-[13px] tracking-[0.10em] text-cream/75 hover:text-cyan transition-colors"
              href="mailto:mrarslan5156@gmail.com"
            >
              mrarslan5156@gmail.com
            </a>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-cream/55">
              © {new Date().getFullYear()} Muhammad Arslan Akhtar
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-start md:justify-center gap-3">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-[#0D1117]/80 backdrop-blur-xl px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan">
              Open to Remote Opportunities
            </span>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/in/mrarslanakhtar/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-cream/70 hover:text-cyan transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://hackerone.com/mrarslanakhtar?type=user"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-cream/70 hover:text-cyan transition-colors"
              >
                HackerOne
              </a>
              <a
                href="https://bugcrowd.com/h/mrarslanakhtar"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-cream/70 hover:text-cyan transition-colors"
              >
                Bugcrowd
              </a>
              <a
                href="https://medium.com/@mrarslanakhtar"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-cream/70 hover:text-cyan transition-colors"
              >
                Medium
              </a>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/55 hover:text-cyan transition-colors"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
