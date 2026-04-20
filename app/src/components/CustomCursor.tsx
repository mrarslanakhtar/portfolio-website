import { useCustomCursor } from '@/hooks/useCustomCursor'

export default function CustomCursor() {
  const cursorRef = useCustomCursor()

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
    >
      <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
        {/* Low-opacity ring */}
        <div
          className="cursor-ring w-9 h-9 rounded-full border border-cyan/35 bg-cyan/5 backdrop-blur-sm"
          style={{ transition: 'width 0.25s ease, height 0.25s ease, opacity 0.25s ease, transform 0.25s ease' }}
        />
        {/* Cyan dot */}
        <div
          className="cursor-dot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan"
          style={{ boxShadow: '0 0 18px rgba(0, 212, 255, 0.55)' }}
        />
      </div>

      <style>{`
        .cursor-hover {
          opacity: 1 !important;
        }
        .cursor-hover .cursor-ring {
          width: 56px !important;
          height: 56px !important;
          opacity: 0.9 !important;
          transform: scale(1.02) !important;
        }
        .cursor-click {
          transform: scale(0.95) !important;
        }
      `}</style>
    </div>
  )
}
