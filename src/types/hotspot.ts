import { CustomButton } from './button';

export interface ContentItem { // Used for both Case Studies and Articles
  title: string;
  description: string; // Rich text / HTML
  image?: string; // Needed for the modal layout
  externalLink: CustomButton;
  videoUrl?: string; // Renders a play button that opens a Video Modal
}

export interface Hotspot {
  id: number;
  x: number; // Positioning
  y: number; // Positioning
  title: string;
  subtitle: string; // Used for the label tooltip on hover

  // Inside the Modal:
  content: {
    image: string;
    title: string;
    subtitle: string;
    description: string; // Rich text / HTML
    videoUrl?: string; // Renders a play button that opens a Video Modal
  };
  caseStudies: ContentItem[];
  articles: ContentItem[];
}
