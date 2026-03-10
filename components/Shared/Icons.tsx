
import React from 'react';
import { X, Play, Maximize, Minimize, Plus, Minus, Info } from 'lucide-react';

export const IconClose: React.FC<{ className?: string }> = ({ className }) => <X className={className} />;
export const IconPlay: React.FC<{ className?: string }> = ({ className }) => <Play className={className} />;
export const IconMaximize: React.FC<{ className?: string }> = ({ className }) => <Maximize className={className} />;
export const IconMinimize: React.FC<{ className?: string }> = ({ className }) => <Minimize className={className} />;
export const IconPlus: React.FC<{ className?: string }> = ({ className }) => <Plus className={className} />;
export const IconMinus: React.FC<{ className?: string }> = ({ className }) => <Minus className={className} />;
export const IconInfo: React.FC<{ className?: string }> = ({ className }) => <Info className={className} />;
