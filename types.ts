
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'image-left' | 'image-right';
  imageUrl?: string;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  brandName: string;
  sections: ContentSection[];
}

export type AppView = 'public' | 'admin';
