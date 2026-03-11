import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Hotspot } from '../../types/Hotspot';
import HotspotMarker from './HotspotMarker';

interface Props {
  imageUrl: string;
  hotspots: Hotspot[];
  onHotspotClick: (data: Hotspot) => void;
  fillSpace?: boolean;
}

const ABSOLUTE_MAX_SCALE = 3;
const SCROLL_SENSITIVITY = 0.001;

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

    if (scaledWidth <= contW) {
        targetX = (contW - scaledWidth) / 2;
    } else {
        const minX = contW - scaledWidth;
        const maxX = 0;
        targetX = Math.min(Math.max(x, minX), maxX);
    }

    if (scaledHeight <= contH) {
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
  const [state, setState] = useState({ scale: 1, translation: { x: 0, y: 0 } });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [minScale, setMinScale] = useState(0.1); 

  const calculateMinScale = useCallback((imgW: number, imgH: number, contW: number, contH: number) => {
      const scaleX = contW / imgW;
      const scaleY = contH / imgH;
      return fillSpace ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);
  }, [fillSpace]);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerDimensions({ width, height });
      if (imageDimensions.width > 0) {
           const newMin = calculateMinScale(imageDimensions.width, imageDimensions.height, width, height);
           setMinScale(newMin);
           setState(prev => {
             const nextScale = Math.max(prev.scale, newMin);
             const clamped = calculateClampedTranslation(prev.translation.x, prev.translation.y, nextScale, imageDimensions.width, imageDimensions.height, width, height);
             return { scale: nextScale, translation: clamped };
           });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [imageDimensions, calculateMinScale]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setImageDimensions({ width: naturalWidth, height: naturalHeight });
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const calculatedMinScale = calculateMinScale(naturalWidth, naturalHeight, rect.width, rect.height);
        setMinScale(calculatedMinScale);
        setState({ scale: calculatedMinScale, translation: { x: (rect.width - naturalWidth * calculatedMinScale) / 2, y: (rect.height - naturalHeight * calculatedMinScale) / 2 } });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const zoomDelta = -e.deltaY * SCROLL_SENSITIVITY;
    let newScale = state.scale * (1 + zoomDelta);
    newScale = Math.min(Math.max(newScale, minScale), ABSOLUTE_MAX_SCALE);
    const relativeX = (mouseX - state.translation.x) / state.scale;
    const relativeY = (mouseY - state.translation.y) / state.scale;
    const clamped = calculateClampedTranslation(mouseX - (relativeX * newScale), mouseY - (relativeY * newScale), newScale, imageDimensions.width, imageDimensions.height, containerDimensions.width, containerDimensions.height);
    setState({ scale: newScale, translation: clamped });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePosition.x;
    const dy = e.clientY - lastMousePosition.y;
    const clamped = calculateClampedTranslation(state.translation.x + dx, state.translation.y + dy, state.scale, imageDimensions.width, imageDimensions.height, containerDimensions.width, containerDimensions.height);
    setState(prev => ({ ...prev, translation: clamped }));
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-brand-black cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div 
        style={{
          transform: \`translate(\${state.translation.x}px, \${state.translation.y}px) scale(\${state.scale})\`,
          transformOrigin: '0 0',
          width: imageDimensions.width || '100%',
          height: imageDimensions.height || '100%',
        }}
        className="relative"
      >
        <img 
          src={imageUrl} 
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
          onLoad={handleImageLoad}
        />
        {imageDimensions.width > 0 && hotspots.map(hp => (
            <HotspotMarker key={hp.id} hotspot={hp} scale={state.scale} onClick={onHotspotClick} />
        ))}
      </div>
    </div>
  );
};

export default MapContainer;
