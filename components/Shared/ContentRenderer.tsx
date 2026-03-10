
import React, { useRef, useState } from 'react';
import { ContentBlock } from '../../types/MapTypes';
import { IconPlay } from './Icons';

interface Props {
  block: ContentBlock;
}

const ContentRenderer: React.FC<Props> = ({ block }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  switch (block.type) {
    case 'text':
      return (
        <div className="h-full flex flex-col justify-center">
          <div className="prose prose-invert prose-lg max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
            <p className="text-secondary leading-relaxed text-lg">{block.value}</p>
            <p className="text-secondary/70 leading-relaxed text-lg mt-4">
               {/* Adding dummy text to demonstrate scrolling if needed */}
               Additional details regarding this section have been classified. 
               However, general inquiries suggest that the phenomena observed here follow standard mechanical principles.
               Operators are advised to maintain a safe distance and update their logs regularly.
            </p>
          </div>
        </div>
      );
    case 'image':
      return (
        <div className="h-full flex flex-col gap-2">
          <div className="relative w-full h-64 md:h-80 lg:h-full bg-surface rounded-lg overflow-hidden border border-secondary/10 shadow-lg">
            <img 
              src={block.value} 
              alt={block.caption || 'Image'} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          {block.caption && <p className="text-sm text-secondary/60 italic text-center">{block.caption}</p>}
        </div>
      );
    case 'video':
      return (
        <div className="h-full flex flex-col gap-2">
          <div 
            className="relative w-full h-64 md:h-80 lg:h-full bg-black rounded-lg overflow-hidden border border-secondary/10 group cursor-pointer shadow-lg"
            onClick={toggleVideo}
          >
            <video 
              ref={videoRef}
              src={block.value}
              poster={block.poster}
              className="w-full h-full object-cover"
              onEnded={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                 <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                    <IconPlay className="w-8 h-8 text-white ml-1" />
                 </div>
              </div>
            )}
          </div>
          {block.caption && <p className="text-sm text-secondary/60 italic text-center">{block.caption}</p>}
        </div>
      );
    default:
      return null;
  }
};

export default ContentRenderer;
