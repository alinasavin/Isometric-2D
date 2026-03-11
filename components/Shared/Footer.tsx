import React from 'react';
import { FooterContent } from '../../types/Home';
import Button from './Button';

interface Props {
  content: FooterContent;
}

const Footer: React.FC<Props> = ({ content }) => {
  return (
    <footer className="h-16 bg-brand-dark-grey/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-8 text-white z-40">
      <p className="text-sm font-medium opacity-80">{content.text}</p>
      <Button button={content.button} className="py-2 px-4 text-xs" />
    </footer>
  );
};

export default Footer;
