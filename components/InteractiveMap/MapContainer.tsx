
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { HotspotData, MapState } from '../../types/MapTypes';
import HotspotMarker from './HotspotMarker';

interface Props {
  imageUrl: string;
  hotspots: HotspotData[];
  onHotspotClick: (data: HotspotData) => void;
  fillSpace?: boolean; // New prop: true = cover (no black bars), false = contain (show whole image)
}

// Absolute max scale (e.g. 3x original resolution)
const ABSOLUTE_MAX_SCALE = 3;
const SCROLL_SENSITIVITY = 0.001;

// Pure helper function to calculate clamped translation based on dimensions
const calculateClampedTranslation = (
  x: number,
  y: number,
  scale: number,
  imgW: number,
  imgH: number,
  contW: number,
  contH: number
) => {
    const scaledWidth = imgW * scale;
    const scaledHeight = imgH * scale;

    let targetX = x;
    let targetY = y;

    // Horizontal Clamping / Centering
    if (scaledWidth <= contW) {
        // Image fits horizontally, lock to center
        targetX = (contW - scaledWidth) / 2;
    } else {
        // Image larger than viewport, clamp to edges
        // minX is negative (panned far left), maxX is 0 (aligned left)
        const minX = contW - scaledWidth;
        const maxX = 0;
        targetX = Math.min(Math.max(x, minX), maxX);
    }

    // Vertical Clamping / Centering
    if (scaledHeight <= contH) {
        // Image fits vertically, lock to center
        targetY = (contH - scaledHeight) / 2;
    } else {
        const minY = contH - scaledHeight;
        const maxY = 0;
        targetY = Math.min(Math.max(y, minY), maxY);
    }

    return { x: targetX, y: targetY };
};

const MapContainer: React.FC<Props> = ({ imageUrl, hotspots, onHotspotClick, fillSpace = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // Wraps image + hotspots
  
  const [state, setState] = useState<MapState>({
    scale: 1,
    translation: { x: 0, y: 0 }
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [minScale, setMinScale] = useState(0.1); 

  // Helper to determine min scale based on fillSpace preference
  const calculateMinScale = useCallback((imgW: number, imgH: number, contW: number, contH: number) => {
      const scaleX = contW / imgW;
      const scaleY = contH / imgH;
      // If fillSpace is true, we take the larger scale to ensure coverage (crop excess).
      // If fillSpace is false, we take the smaller scale to ensure containment (show all).
      return fillSpace ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);
  }, [fillSpace]);

  // Handle Resize: Recalculate dimensions, minScale, and clamp current state
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      setContainerDimensions({ width, height });

      if (imageDimensions.width > 0 && imageDimensions.height > 0) {
           const newMin = calculateMinScale(imageDimensions.width, imageDimensions.height, width, height);
           
           setMinScale(newMin);

           // Adjust current state to fit new boundaries
           setState(prev => {
             // Ensure we don't zoom out further than the new minimum
             const nextScale = Math.max(prev.scale, newMin);

             const clamped = calculateClampedTranslation(
               prev.translation.x,
               prev.translation.y,
               nextScale,
               imageDimensions.width,
               imageDimensions.height,
               width,
               height
             );

             return {
               scale: nextScale,
               translation: clamped
             };
           });
      }
    };
    
    window.addEventListener('resize', handleResize);
    // Initial call to set up if image is already loaded (though onLoad handles main init)
    if (imageDimensions.width > 0) handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [imageDimensions, calculateMinScale]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setImageDimensions({ width: naturalWidth, height: naturalHeight });
    
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        
        const calculatedMinScale = calculateMinScale(naturalWidth, naturalHeight, rect.width, rect.height);
        setMinScale(calculatedMinScale);
        
        // Initial Center
        const scaledW = naturalWidth * calculatedMinScale;
        const scaledH = naturalHeight * calculatedMinScale;
        const tx = (rect.width - scaledW) / 2;
        const ty = (rect.height - scaledH) / 2;

        setState({
            scale: calculatedMinScale,
            translation: { x: tx, y: ty }
        });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate zoom delta
    const zoomDelta = -e.deltaY * SCROLL_SENSITIVITY;
    
    // We want to allow zooming in significantly, so ensure max scale is at least somewhat larger than minScale
    const effectiveMaxScale = Math.max(ABSOLUTE_MAX_SCALE, minScale * 3);

    let newScale = state.scale * (1 + zoomDelta);
    
    // Clamp scale between dynamic minScale and effectiveMaxScale
    newScale = Math.min(Math.max(newScale, minScale), effectiveMaxScale);
    
    if (newScale === state.scale) return;

    // Zoom towards pointer logic
    const relativeX = (mouseX - state.translation.x) / state.scale;
    const relativeY = (mouseY - state.translation.y) / state.scale;
    
    const newTx = mouseX - (relativeX * newScale);
    const newTy = mouseY - (relativeY * newScale);
    
    const clamped = calculateClampedTranslation(
        newTx, 
        newTy, 
        newScale, 
        imageDimensions.width, 
        imageDimensions.height, 
        containerDimensions.width, 
        containerDimensions.height
    );

    setState({
      scale: newScale,
      translation: clamped
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - lastMousePosition.x;
    const dy = e.clientY - lastMousePosition.y;

    const newTx = state.translation.x + dx;
    const newTy = state.translation.y + dy;

    const clamped = calculateClampedTranslation(
        newTx, 
        newTy, 
        state.scale, 
        imageDimensions.width, 
        imageDimensions.height, 
        containerDimensions.width, 
        containerDimensions.height
    );

    setState(prev => ({
      ...prev,
      translation: clamped
    }));

    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-brand-black cursor-grab active:cursor-grabbing select-none"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Transformed Content */}
      <div 
        ref={contentRef}
        style={{
          transform: `translate(${state.translation.x}px, ${state.translation.y}px) scale(${state.scale})`,
          transformOrigin: '0 0',
          width: imageDimensions.width || '100%',
          height: imageDimensions.height || '100%',
          willChange: 'transform',
        }}
        className="relative transition-transform duration-75 ease-out"
      >
        <img 
          src={imageUrl} 
          alt="Map Background" 
          className="w-full h-full object-cover pointer-events-none select-none"
          draggable={false}
          onLoad={handleImageLoad}
        />
        
        {/* Render Hotspots */}
        {imageDimensions.width > 0 && hotspots.map(hp => (
            <HotspotMarker 
                key={hp.id} 
                hotspot={hp} 
                scale={state.scale}
                onClick={onHotspotClick}
            />
        ))}
      </div>
    </div>
  );
};

export default MapContainer;
