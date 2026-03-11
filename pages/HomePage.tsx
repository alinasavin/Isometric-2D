import React, { useState } from 'react';
import MapContainer from '../components/InteractiveMap/MapContainer';
import HotspotModal from '../components/InteractiveMap/HotspotModal';
import Button from '../components/Shared/Button';
import Footer from '../components/Shared/Footer';
import { HomeContent, FooterContent } from '../types/Home';
import { Hotspot } from '../types/Hotspot';

import homeData from '../data/home.json';
import footerData from '../data/footer.json';
import hotspotsData from '../data/hotspots.json';

const BACKGROUND_IMAGE = "https://images.wallpaperscraft.com/image/single/train_railway_forest_169685_1600x900.jpg";

const HomePage: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const home = homeData as HomeContent;
  const footer = footerData as FooterContent;
  const hotspots = hotspotsData as Hotspot[];

  return (
    <div className="flex flex-col h-screen w-screen bg-brand-dark-grey overflow-hidden font-sans text-brand-dark-grey">
      
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Home Content (1/3) */}
        <div className="w-1/3 bg-white p-12 flex flex-col justify-center relative z-20 shadow-2xl">
          <h1 className="text-6xl font-black mb-8 leading-tight tracking-tighter uppercase">{home.title}</h1>
          <div className="text-lg text-gray-600 mb-10 leading-relaxed" dangerouslySetInnerHTML={{ __html: home.description }} />
          <Button button={home.button} className="w-fit px-10" />
        </div>

        {/* Right Side: Map Container (2/3) */}
        <div className="w-2/3 relative">
          <MapContainer
            imageUrl={BACKGROUND_IMAGE}
            hotspots={hotspots}
            onHotspotClick={setSelectedHotspot}
          />
        </div>
      </main>

      <Footer content={footer} />

      {selectedHotspot && (
        <HotspotModal
          isOpen={!!selectedHotspot}
          onClose={() => setSelectedHotspot(null)}
          hotspot={selectedHotspot}
        />
      )}
    </div>
  );
};

export default HomePage;
