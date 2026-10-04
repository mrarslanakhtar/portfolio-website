import { useEffect, useState } from 'react'
import { scrollToTop } from '@/lib/scroll'

const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mrarslanakhtar/' },
  { label: 'HackerOne', href: 'https://hackerone.com/mrarslanakhtar?type=user' },
  { label: 'Bugcrowd', href: 'https://bugcrowd.com/h/mrarslanakhtar' },
  { label: 'Medium', href: 'https://medium.com/@mrarslanakhtar' },
]

// Live local time in Islamabad (PKT, UTC+5) — a quiet signal that there is a
// person on the other end of the contact button.
function useIslamabadTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Karachi',
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

export default function FooterSection() {
  const time = useIslamabadTime()

  return (
    <footer className="relative bg-graphite-deep overflow-hidden">
      <div className="rule-break" aria-hidden="true" />

      {/* Ghost wordmark — the page's closing gesture. */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-6 left-0 right-0 whitespace-nowrap font-display font-medium text-cream/[0.035] leading-none text-center"
        style={{ fontSize: 'clamp(4.5rem, 12vw, 11rem)', letterSpacing: '0.02em' }}
      >
        ARSLAN AKHTAR
      </div>

      <div className="shell py-12 relative">
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
            <a href="mailto:mrarslan5156@gmail.com" className="link-underline mt-2 font-mono text-[13px] !text-cream/80 hover:!text-cyan">
              mrarslan5156@gmail.com
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="me noopener noreferrer"
                className="link-underline font-mono text-[12px] tracking-[0.08em] !text-stone-muted hover:!text-cyan !min-h-[44px]"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Status + local time + back to top */}
          <div className="flex flex-col md:items-end gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-brass">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden="true" />
              Open to advisory engagements
            </span>
            {time && (
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-stone-muted">
                Islamabad · {time} GMT+5
              </span>
            )}
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 min-h-[44px] -my-2 font-mono text-[11px] tracking-[0.1em] uppercase text-stone-muted hover:text-cream transition-colors"
            >
              Back to top{' '}
              <span aria-hidden="true" className="inline-block transition-transform motion-safe:group-hover:-translate-y-0.5">
                ↑
              </span>
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--hairline)] font-mono text-[11px] tracking-wide text-[var(--ink-faint)]">
          © {new Date().getFullYear()} Muhammad Arslan Akhtar. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
