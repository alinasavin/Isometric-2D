
import React, { useMemo } from 'react';
import { HotspotData } from '../../types/MapTypes';

interface Props {
  hotspot: HotspotData;
  scale: number; // Current map scale
  onClick: (hotspot: HotspotData) => void;
}

const HotspotMarker: React.FC<Props> = ({ hotspot, scale, onClick }) => {
  // Calculate dynamic scale to counteract map zoom
  const dynamicScale = useMemo(() => {
    const damping = 0.7; 
    const calculated = 1 / Math.pow(scale, damping);
    const min = 0.3;
    const max = 2.5;
    return Math.min(Math.max(calculated, min), max);
  }, [scale]);

  return (
    <div
      className="absolute z-10"
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        width: 0,
        height: 0,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(hotspot);
      }}
    >
      {/* 
        Scaling Container 
        We apply the scale here. The anchor point is 0,0 (top-left of this div, which matches the parent's x,y).
      */}
      <div 
        className="relative group cursor-pointer"
        style={{ transform: `scale(${dynamicScale})` }}
      >
        {/* 
          Visual Centering Container
          This div has explicit dimensions (w-6 h-6).
          We translate it -50% -50% so its CENTER sits exactly at the 0,0 anchor.
        */}
        <div className="w-6 h-6 -translate-x-1/2 -translate-y-1/2 relative">
            
            {/* Pulse Animation Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none">
                <div className="w-full h-full rounded-full bg-brand-yellow/30 animate-ping-slow origin-center" />
            </div>

            {/* Core Marker */}
            <div className="absolute inset-0 rounded-full bg-surface border-2 border-brand-yellow shadow-[0_0_15px_rgba(185,255,0,0.5)] transition-colors duration-300 group-hover:bg-brand-yellow group-hover:border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-brand-dark-grey rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Tooltip Label */}
            <div 
                className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 pointer-events-none border border-secondary/30 z-20 shadow-xl"
            >
                <span className="font-semibold block text-brand-yellow">{hotspot.title}</span>
                <span className="text-secondary font-light">{hotspot.shortDescription}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HotspotMarker;
