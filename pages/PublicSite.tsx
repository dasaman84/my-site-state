
import React from 'react';
import { SiteConfig, Product, ContentSection } from '../types';
import { ShoppingCart, ChevronRight, CheckCircle2 } from 'lucide-react';

interface PublicSiteProps {
  config: SiteConfig;
  products: Product[];
}

const SectionRenderer: React.FC<{ section: ContentSection }> = ({ section }) => {
  const isImageLeft = section.type === 'image-left';
  const isImageRight = section.type === 'image-right';
  const hasImage = (isImageLeft || isImageRight) && section.imageUrl;

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 border-b border-gray-50 last:border-0">
      <div className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 ${isImageLeft ? '' : 'md:flex-row-reverse'}`}>
        <div className={`flex-1 ${!hasImage ? 'text-center max-w-3xl mx-auto' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{section.title}</h2>
          <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
            {section.content}
          </p>
        </div>
        {hasImage && (
          <div className="flex-1 w-full">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={section.imageUrl} alt={section.title} className="w-full h-[400px] object-cover" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const PublicSite: React.FC<PublicSiteProps> = ({ config, products }) => {
  return (
    <div className="bg-white">
      <nav className="border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-40">
        <div className="text-2xl font-bold text-blue-600 tracking-tight">{config.brandName}</div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="#sections" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#products" className="hover:text-blue-600 transition-colors">Pricing</a>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md flex items-center gap-2">
          Get Started
        </button>
      </nav>

      <section id="home" className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={config.heroImageUrl} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
        </div>
        <div className="relative z-10 px-6 md:px-12 lg:px-24 w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">{config.heroTitle}</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">{config.heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
              Start Free Trial <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      <div id="sections">
        {config.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </div>

      <section id="products" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto bg-slate-50 rounded-t-[3rem]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Plans & Pricing</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Flexible options for teams of all sizes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="h-48 overflow-hidden relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-md">
                  ${product.price}/mo
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{product.name}</h3>
                <p className="text-gray-500 mb-6">{product.description}</p>
                <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors">Select Plan</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold text-white tracking-tight">{config.brandName}</div>
          <p className="text-sm">© 2024 {config.brandName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicSite;
