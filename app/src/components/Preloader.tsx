import { useEffect, useState } from "react";

const LINES = [
  "[ BOOT ] initializing secure channel...",
  "[  OK  ] mounting /dev/soc-core",
  "[  OK  ] loading kernel module: zenguard.ko",
  "[  OK  ] verifying TLS 1.3 handshake",
  "[  OK  ] adversarial reasoning engine: ONLINE",
  "[  OK  ] identity trust-chain: VERIFIED",
  "[  OK  ] threat intel feed: SYNCED",
  "[ READY ] operator clearance granted",
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct] = useState(0);
  const [shown, setShown] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [typewriterLine, setTypewriterLine] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("soc_booted")) {
      setSkipped(true);
      onComplete();
      return;
    }

    document.body.style.overflow = 'hidden';
    let p = 0;
    let currentLineIdx = 0;
    let charIdx = 0;

    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 6 + 2);
      setPct(Math.floor(p));
      
      const targetIdx = Math.min(LINES.length, Math.floor((p / 100) * LINES.length));
      
      if (currentLineIdx < targetIdx && currentLineIdx < LINES.length) {
        const lineToType = LINES[currentLineIdx];
        charIdx += Math.floor(Math.random() * 5) + 3; // type chunk of characters
        
        if (charIdx >= lineToType.length) {
          setShown(prev => prev.includes(lineToType) ? prev : [...prev, lineToType]);
          setTypewriterLine("");
          currentLineIdx++;
          charIdx = 0;
        } else {
          setTypewriterLine(lineToType.substring(0, charIdx));
        }
      }

      if (p >= 100) {
        clearInterval(id);
        setShown([...LINES]);
        setTypewriterLine("");
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem("soc_booted", "true");
          setTimeout(() => {
            document.body.style.overflow = '';
            onComplete();
          }, 400); // Wait for glitch-out animation to finish
        }, 350);
      }
    }, 50); // Faster tick for smooth typing

    return () => {
      clearInterval(id);
      document.body.style.overflow = '';
    }
  }, [onComplete]);

  if (skipped) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-navy-deep grid-bg ${
        done ? "animate-glitch-out" : "opacity-100"
      }`}
    >
      <div className="w-[min(92vw,640px)] glass rounded-md p-6 font-mono text-sm relative z-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <span className="text-[var(--cyan)] text-glow-cyan tracking-wide">
            [ SOC // SECURE BOOT ]
          </span>
          <span className="text-stone-muted">v2.6.1</span>
        </div>
        <div className="space-y-1 min-h-[180px] opacity-75">
          {shown.map((l, i) => (
            <div
              key={i}
              className="text-cream/85"
              style={{ animation: "fade-in .25s ease-out" }}
            >
              {l}
            </div>
          ))}
          {typewriterLine && (
            <div className="text-cream/85">
              {typewriterLine}<span className="caret bg-white inline-block w-2 h-4 ml-1 translate-y-1" />
            </div>
          )}
          {!typewriterLine && shown.length < LINES.length && (
            <div className="text-[var(--cyan)]">
              $ <span className="caret bg-[var(--cyan)] inline-block w-2 h-4 ml-1 translate-y-1" />
            </div>
          )}
        </div>
        <div className="mt-5">
          <div className="flex justify-between text-xs text-stone-muted mb-2">
            <span>LOADING SECURE PERIMETER</span>
            <span className="text-[var(--cyan)] text-glow-cyan">{pct}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--cobalt)] to-[var(--cyan)] transition-all duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
