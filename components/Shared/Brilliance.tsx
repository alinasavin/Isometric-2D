
import React from 'react';

interface Props {
  className?: string;
  steps?: number;
}

const Brilliance: React.FC<Props> = ({ className = '', steps = 10 }) => {
  // Safe clamp for steps based on requirements (min 2, max 10)
  const safeSteps = Math.max(2, Math.min(steps, 10));

  return (
    <div className={`fixed left-0 top-0 bottom-0 w-[15vw] min-w-[120px] pointer-events-none z-30 ${className}`}>
      {/* Container relative to hold absolute children */}
      <div className="relative w-full h-full">
        {Array.from({ length: safeSteps }).map((_, i) => {
          // Stacking Strategy:
          // We stack layers from Largest (Background, low opacity) to Smallest (Foreground, high opacity).
          // All are anchored to the LEFT.
          
          // i = 0: Bottom layer (Widest)
          // i = steps - 1: Top layer (Narrowest)
          
          // Width Calculation:
          // i=0 -> 100% width
          // i=max -> 100/steps %.
          const widthPercent = 100 * ((safeSteps - i) / safeSteps);

          // Opacity Calculation:
          // Top layer (Narrowest, Leftmost) is 100% opacity.
          // Bottom layer (Widest, Rightmost edge) is low opacity.
          const opacity = (i + 1) / safeSteps;

          return (
            <div
              key={i}
              className="absolute left-0 top-0 bottom-0 bg-primary"
              style={{
                width: `${widthPercent}%`,
                opacity: opacity,
                zIndex: i, // Ensure proper stacking order
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Brilliance;
