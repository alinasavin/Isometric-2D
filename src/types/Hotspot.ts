export interface CustomButton {
  title: string;
  url: string; // logic must handle http:// (new tab), mailto: (email client), tel: (phone prompt)
  icon?: string; // Iconify text string
}

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
