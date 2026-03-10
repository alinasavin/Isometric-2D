
export type ContentType = 'text' | 'image' | 'video';

export interface ContentBlock {
  type: ContentType;
  value: string; // URL for image/video, or text content
  caption?: string;
  poster?: string; // For video poster
}

export interface RagStatus {
  red: string;   // Critical / Danger info
  amber: string; // Warning / Caution info
  green: string; // Good / Optimal info
}

export interface HotspotData {
  id: string;
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
  title: string;
  shortDescription: string;
  columnLeft: ContentBlock;
  columnRight: ContentBlock;
  ragStatus: RagStatus; // New field for RAG info
}

export interface MapState {
  scale: number;
  translation: { x: number; y: number };
}

export interface Dimensions {
  width: number;
  height: number;
}
