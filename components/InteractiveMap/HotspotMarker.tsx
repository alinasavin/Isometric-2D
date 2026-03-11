import React, { useMemo } from 'react';
import { Hotspot } from '../../types/Hotspot';

interface Props {
  hotspot: Hotspot;
  scale: number;
  onClick: (hotspot: Hotspot) => void;
}

const HotspotMarker: React.FC<Props> = ({ hotspot, scale, onClick }) => {
  const dynamicScale = useMemo(() => {
    const damping = 0.7; 
    const calculated = 1 / Math.pow(scale, damping);
    return Math.min(Math.max(calculated, 0.3), 2.5);
  }, [scale]);

  return (
    <div
      className="absolute z-10"
      data-testid={\`hotspot-\${hotspot.id}\`}
      style={{
        left: \`\${hotspot.x}%\`,
        top: \`\${hotspot.y}%\`,
        width: 0,
        height: 0,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(hotspot);
      }}
    >
      <div 
        className="relative group cursor-pointer"
        style={{ transform: \`scale(\${dynamicScale})\` }}
      >
        <div className="w-6 h-6 -translate-x-1/2 -translate-y-1/2">
            {/* Core Marker */}
            <div className="absolute inset-0 rounded-full bg-white border-2 border-brand-green shadow-lg transition-colors duration-300 group-hover:bg-brand-green flex items-center justify-center">
                <div className="w-2 h-2 bg-brand-dark-grey rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Tooltip Label */}
            <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-white text-brand-dark-grey text-[10px] px-3 py-1.5 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl border border-gray-100 font-bold uppercase tracking-wider">
                {hotspot.subtitle}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HotspotMarker;
