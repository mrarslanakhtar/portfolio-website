// The section's editorial index at poster scale — outlined, near-invisible,
// clipped by the section. Purely decorative; the eyebrow carries the number.
export default function GhostIndex({ n }: { n: string }) {
  return (
    <span aria-hidden="true" className="ghost-index">
      {n}
    </span>
  )
}
