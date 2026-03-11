export interface HotspotContent {
  type: 'title' | 'subtitle' | 'alert' | 'section' | 'image' | 'video';
  value: string;
  level?: 'red' | 'amber' | 'green';
  message?: string;
  content?: string;
  url?: string;
}

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  label: string;
  content: HotspotContent[];
}

export interface MapData {
  hotspots: Hotspot[];
}
