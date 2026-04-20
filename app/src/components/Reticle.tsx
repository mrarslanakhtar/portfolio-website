import React from 'react';

interface ReticleProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export default function Reticle({ children, className = '', glow = true }: ReticleProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Reticle HUD Container */}
      <div className="absolute -inset-8 pointer-events-none flex items-center justify-center z-[15]">
        {/* Outer Ring - Dashed, clockwise */}
        <div className="absolute inset-0 rounded-full border border-cyan/40 border-dashed opacity-60 reticle" />
        
        {/* Inner Ring - Solid with ticks, counter-clockwise */}
        <div className="absolute inset-3 rounded-full border-[0.5px] border-cyan/20 reticle-reverse overflow-hidden">
          {/* Container to place ticks */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* North/South/East/West main ticks */}
            <div className="absolute top-0 w-[2px] h-3 bg-cyan" style={{ boxShadow: '0 0 8px var(--cyan)' }} />
            <div className="absolute bottom-0 w-[2px] h-3 bg-cyan" style={{ boxShadow: '0 0 8px var(--cyan)' }} />
            <div className="absolute left-0 w-3 h-[2px] bg-cyan" style={{ boxShadow: '0 0 8px var(--cyan)' }} />
            <div className="absolute right-0 w-3 h-[2px] bg-cyan" style={{ boxShadow: '0 0 8px var(--cyan)' }} />
            
            {/* Sub ticks */}
            {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => (
              <div 
                key={deg}
                className="absolute w-full h-full flex items-start justify-center"
                style={{ transform: `rotate(${deg}deg)` }}
              >
                <div className="w-[1px] h-2 bg-cyan/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Wrapped Content */}
      <div className={`relative z-10 corner-brackets ${glow ? 'glow-cyan' : ''}`}>
        {children}
      </div>
    </div>
  );
}
