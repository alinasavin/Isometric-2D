import React, { useState } from 'react';
import MapContainer from '../components/InteractiveMap/MapContainer';
import Modal from '../components/Shared/Modal';
import ContentRenderer from '../components/Shared/ContentRenderer';
import RagStatusPanel from '../components/Shared/RagStatusPanel';
import Brilliance from '../components/Shared/Brilliance';
import { IconMaximize, IconMinimize } from '../components/Shared/Icons';
import { HotspotData } from '../types/MapTypes';
import { mapData } from '../data/mapData';

// High-quality steam train on tracks image (16:9)
const BACKGROUND_IMAGE = "https://images.wallpaperscraft.com/image/single/train_railway_forest_169685_1600x900.jpg";

const HomePage: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotData | null>(null);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const handleHotspotClick = (hotspot: HotspotData) => {
    setSelectedHotspot(hotspot);
    setExpandedSection(null); // Reset expansion on new open
  };

  const closeModal = () => {
    setSelectedHotspot(null);
    setExpandedSection(null);
  };

  return (
    <div className="w-screen h-screen bg-background overflow-hidden relative">
      
      {/* Brilliance Overlay - Left Side */}
      <Brilliance steps={10} />

      <MapContainer 
        imageUrl={BACKGROUND_IMAGE} 
        hotspots={mapData} 
        onHotspotClick={handleHotspotClick}
        fillSpace={true}
      />

      <Modal 
        isOpen={!!selectedHotspot} 
        onClose={closeModal} 
        title={selectedHotspot?.title || ''}
      >
        {selectedHotspot && (
          <div className="h-full flex flex-col lg:flex-row min-h-[500px] overflow-hidden">
            
            {/* Expandable Column 1: RAG Status */}
            <ExpandableSection 
              index={0} 
              expandedIndex={expandedSection} 
              onToggle={setExpandedSection}
              className="lg:mr-4 mb-4 lg:mb-0"
            >
              <div className="h-full overflow-y-auto custom-scrollbar p-1">
                 <RagStatusPanel status={selectedHotspot.ragStatus} />
              </div>
            </ExpandableSection>

            {/* Expandable Column 2: Content Left */}
            <ExpandableSection 
              index={1} 
              expandedIndex={expandedSection} 
              onToggle={setExpandedSection}
              className="bg-surface/30 border border-secondary/10 lg:mx-2 mb-4 lg:mb-0"
            >
               <div className="h-full p-4 overflow-y-auto custom-scrollbar">
                  <ContentRenderer block={selectedHotspot.columnLeft} />
               </div>
            </ExpandableSection>

            {/* Expandable Column 3: Content Right */}
            <ExpandableSection 
              index={2} 
              expandedIndex={expandedSection} 
              onToggle={setExpandedSection}
              className="bg-surface/30 border border-secondary/10 lg:ml-4"
            >
               <div className="h-full p-4 overflow-y-auto custom-scrollbar">
                  <ContentRenderer block={selectedHotspot.columnRight} />
               </div>
            </ExpandableSection>

          </div>
        )}
      </Modal>
    </div>
  );
};

// Sub-component for expandable logic
interface ExpandableSectionProps {
  index: number;
  expandedIndex: number | null;
  onToggle: (index: number | null) => void;
  children: React.ReactNode;
  className?: string;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ 
  index, 
  expandedIndex, 
  onToggle, 
  children, 
  className = '' 
}) => {
  const isExpanded = expandedIndex === index;
  const isHidden = expandedIndex !== null && !isExpanded;

  // Determine flex and sizing classes
  let layoutClasses = "";
  
  if (expandedIndex === null) {
    // Default state: all equal
    layoutClasses = "flex-1 opacity-100";
  } else if (isExpanded) {
    // Expanded state: standard 'over the top' feel via flex domination
    layoutClasses = "flex-[100] opacity-100 m-0 z-10"; 
  } else {
    // Collapsed state: shrink to zero
    layoutClasses = "flex-[0] w-0 h-0 p-0 m-0 border-0 opacity-0 overflow-hidden pointer-events-none";
  }

  // NOTE: We strip the 'className' margin/padding if hidden to avoid layout gaps
  const appliedClassName = isHidden ? '' : className;

  return (
    <div 
      className={`
        relative rounded-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${layoutClasses}
        ${appliedClassName}
      `}
    >
      {/* Expand/Collapse Toggle Button */}
      {!isHidden && (
        <button
          onClick={() => onToggle(isExpanded ? null : index)}
          className="absolute top-2 right-2 z-20 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-secondary hover:text-white transition-all border border-white/10 shadow-lg group"
          aria-label={isExpanded ? "Minimize section" : "Maximize section"}
        >
          {isExpanded ? (
            <IconMinimize className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <IconMaximize className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
        </button>
      )}

      {/* Content Wrapper */}
      <div className={`h-full w-full transition-opacity duration-300 ${isHidden ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
};

export default HomePage;