import ScrollRevealText from '@/components/ScrollRevealText'

type SectionHeaderProps = {
  index: string
  label: string
  title: string
  lede?: string
  align?: 'left' | 'center'
  id?: string
}

// Consistent editorial section head: a brass index + quiet eyebrow, a serif
// title, and an optional lede. Reveal is a single subtle fade (mode="line").
export default function SectionHeader({ index, label, title, lede, align = 'left', id }: SectionHeaderProps) {
  const center = align === 'center'
  return (
    <div className={center ? 'text-center max-w-[720px] mx-auto' : 'max-w-[760px]'}>
      <ScrollRevealText mode="line" className="mb-5">
        <span className={`eyebrow ${center ? 'justify-center' : ''}`}>
          <span className="eyebrow-index">{index}</span>
          <span className="h-px w-8 bg-[var(--hairline-strong)]" aria-hidden="true" />
          {label}
        </span>
      </ScrollRevealText>
      <ScrollRevealText mode="line" as="h2" className="section-title" delay={0.05}>
        {title}
      </ScrollRevealText>
      {lede && (
        <ScrollRevealText mode="line" className="lede mt-6" delay={0.1}>
          {lede}
        </ScrollRevealText>
      )}
      {id && <span id={id} className="sr-only" />}
    </div>
  )
}
