import { CustomButton } from './Shared';

export interface ContentItem {
  title: string;
  description: { html: string } | null;
  image?: string;
  externalLink: CustomButton;
  videoUrl?: string;
}

export interface Hotspot {
  id: number;
  x: number;
  y: number;
  title: string;
  subtitle: string;

  content: {
    image: string;
    title: string;
    subtitle: string;
    description: { html: string } | null;
    videoUrl?: string;
  };
  caseStudies: ContentItem[];
  articles: ContentItem[];
}
