import { m } from 'framer-motion'
import ScrollRevealText from '@/components/ScrollRevealText'
import { EASE } from '@/lib/motion'

type SectionHeaderProps = {
  index: string
  label: string
  title: string
  lede?: string
  align?: 'left' | 'center'
  id?: string
}

// Consistent editorial section head: a brass index + quiet eyebrow whose
// hairline draws itself in, a serif title revealed word by word, and an
// optional lede.
export default function SectionHeader({ index, label, title, lede, align = 'left', id }: SectionHeaderProps) {
  const center = align === 'center'
  return (
    <div className={center ? 'text-center max-w-[720px] mx-auto' : 'max-w-[760px]'}>
      <ScrollRevealText mode="line" className="mb-5">
        <span className={`eyebrow ${center ? 'justify-center' : ''}`}>
          <span className="eyebrow-index">{index}</span>
          <m.span
            className="h-px w-8 bg-[var(--hairline-strong)] origin-left"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          />
          {label}
        </span>
      </ScrollRevealText>
      <ScrollRevealText mode="words" as="h2" className="section-title" delay={0.05}>
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
