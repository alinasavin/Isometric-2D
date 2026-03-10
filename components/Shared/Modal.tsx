
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconClose } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small timeout to allow render before adding opacity class for transition
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return createPortal(
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark-grey/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Content Container */}
      <div 
        className={`
          relative bg-surface border border-secondary/20 w-full max-w-5xl max-h-[90vh] 
          rounded-2xl shadow-2xl overflow-hidden flex flex-col
          transform transition-all duration-300 
          ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-secondary/10 bg-surface z-10">
          <h2 className="text-2xl font-bold text-white tracking-wide">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-secondary/10 rounded-full transition-colors text-secondary hover:text-white"
            aria-label="Close modal"
          >
            <IconClose className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-background">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
