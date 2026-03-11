import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Hotspot, ContentItem } from '../../types/Hotspot';
import Button from '../Shared/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  hotspot: Hotspot;
}

const HotspotModal: React.FC<Props> = ({ isOpen, onClose, hotspot }) => {
  const [activeTab, setActiveTab] = useState<'caseStudies' | 'articles'>('caseStudies');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark-grey/80 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-sm overflow-hidden flex flex-col shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 hover:bg-black/5 rounded-full transition-colors">
          <Icon icon="mdi:close" className="w-6 h-6 text-brand-dark-grey" />
        </button>

        <div className="w-full h-64 overflow-hidden">
          <img src={hotspot.content.image} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/3 p-8 border-r border-gray-100 overflow-y-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{hotspot.content.subtitle}</span>
            <h2 className="text-3xl font-bold text-brand-dark-grey mb-6">{hotspot.content.title}</h2>
            <div className="text-gray-600 leading-relaxed mb-8 text-sm" dangerouslySetInnerHTML={{ __html: hotspot.content.description?.html || '' }} />
            {hotspot.content.videoUrl && (
              <button className="flex items-center gap-2 text-brand-blue font-bold hover:underline">
                <Icon icon="mdi:play-circle" className="w-8 h-8" />
                <span>Watch video</span>
              </button>
            )}
          </div>

          <div className="w-2/3 flex flex-col bg-gray-50/50">
            <div className="flex border-b border-gray-100 px-8">
              <button
                onClick={() => setActiveTab('caseStudies')}
                className={\`py-4 px-6 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors \${activeTab === 'caseStudies' ? 'border-brand-green text-brand-dark-grey' : 'border-transparent text-gray-400'}\`}
              >
                Case Studies
              </button>
              <button
                onClick={() => setActiveTab('articles')}
                className={\`py-4 px-6 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors \${activeTab === 'articles' ? 'border-brand-green text-brand-dark-grey' : 'border-transparent text-gray-400'}\`}
              >
                Articles
              </button>
            </div>

            <div className="flex-1 p-8 overflow-y-auto">
              {(activeTab === 'caseStudies' ? hotspot.caseStudies : hotspot.articles).map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-sm shadow-sm flex gap-6 border border-gray-100 mb-6 last:mb-0">
                  <div className="w-1/2">
                    <h3 className="text-xl font-bold text-brand-dark-grey mb-3">{item.title}</h3>
                    <div className="text-gray-500 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description?.html || '' }} />
                  </div>
                  <div className="w-1/2 flex flex-col gap-4">
                    {item.image && <img src={item.image} className="w-full aspect-video object-cover rounded-sm" />}
                    <div className="flex items-center justify-between mt-auto">
                      <Button button={item.externalLink} className="py-2 px-4 text-[10px]" />
                      {item.videoUrl && <Icon icon="mdi:play-circle" className="w-10 h-10 text-brand-blue cursor-pointer" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotspotModal;
