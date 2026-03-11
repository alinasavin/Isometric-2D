import React from 'react';
import { Icon } from '@iconify/react';
import { CustomButton } from '../../types/Shared';

interface Props {
  button: CustomButton;
  className?: string;
}

const Button: React.FC<Props> = ({ button, className = "" }) => {
  const isExternal = !button.url.startsWith('mailto:') && !button.url.startsWith('tel:');

  const commonClasses = \`inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-green hover:bg-brand-green/90 text-brand-dark-grey font-bold rounded-sm transition-all \${className}\`;

  if (isExternal) {
    return (
      <a
        href={button.url}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
      >
        <span>{button.title}</span>
        {button.icon && <Icon icon={button.icon} className="w-5 h-5" />}
      </a>
    );
  }

  return (
    <a href={button.url} className={commonClasses}>
      <span>{button.title}</span>
      {button.icon && <Icon icon={button.icon} className="w-5 h-5" />}
    </a>
  );
};

export default Button;
