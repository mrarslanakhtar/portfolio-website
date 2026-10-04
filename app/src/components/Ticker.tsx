const ITEMS = [
  'SSO',
  'IAM',
  'Broken access control',
  'OAuth · SAML · JWT',
  '500+ live Zendesk deployments',
  'Top 1% HackerOne',
  '99th-percentile impact',
  'Six years deep',
  'Advisory $15k – $25k',
  'Islamabad · Remote',
]

// Slow marquee of the practice vocabulary. Rendered twice for a seamless
// loop; the second copy is hidden from assistive tech. Pauses on hover and
// stops entirely under reduced-motion (then it just wraps).
export default function Ticker() {
  const row = (hidden: boolean) => (
    <span className="inline-flex items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="inline-flex items-center gap-6 pr-6 font-mono text-[12px] md:text-[13px] tracking-[0.18em] uppercase text-cream/75">
          {item}
          <span className="h-1 w-1 rounded-full bg-cyan" aria-hidden="true" />
        </span>
      ))}
    </span>
  )
  return (
    <div className="ticker border-y border-[var(--hairline)] py-4">
      <div className="ticker-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
