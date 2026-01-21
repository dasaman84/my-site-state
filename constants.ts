
import { Product, SiteConfig } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  heroTitle: "Revolutionize Your Workflow",
  heroSubtitle: "The most advanced platform for modern creators and visionary teams.",
  heroImageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070",
  brandName: "Lumina",
  sections: [
    {
      id: 'sec_1',
      title: "Our Mission",
      content: "We believe that technology should empower creativity, not hinder it. Our team works tirelessly to bridge the gap between complex engineering and intuitive design.",
      type: 'image-right',
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 'sec_2',
      title: "Why Choose Us?",
      content: "With over a decade of experience in the industry, we provide unmatched reliability and performance. Our solutions are used by thousands of global brands.",
      type: 'image-left',
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000"
    }
  ]
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: "Standard Pack",
    price: 49,
    description: "Perfect for individuals and small teams starting their journey.",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1999"
  },
  {
    id: '2',
    name: "Professional Series",
    price: 99,
    description: "Advanced features for professionals seeking high-performance results.",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=2070"
  }
];
