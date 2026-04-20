import { useMemo, useState } from 'react'

type SafeImageProps = {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  fallbackText?: string
}

function initialsFrom(alt: string) {
  const parts = alt
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
  const a = parts[0]?.[0] ?? 'X'
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? 'X'
  return `${a}${b}`.toUpperCase()
}

export default function SafeImage({ src, alt, className, loading, fallbackText }: SafeImageProps) {
  const [failed, setFailed] = useState(false)
  const initials = useMemo(() => fallbackText ?? initialsFrom(alt), [alt, fallbackText])

  if (failed) {
    return (
      <div
        className={[
          'flex items-center justify-center select-none',
          'bg-[#0D1117]/90 border border-white/10 backdrop-blur-xl',
          'text-cyan font-mono font-semibold tracking-[0.18em]',
          className ?? '',
        ].join(' ')}
        aria-label={alt}
        role="img"
      >
        {initials}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover object-center ${className || ''}`.trim()}
      loading={loading}
      onError={() => setFailed(true)}
    />
  )
}

