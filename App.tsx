
import React, { useState, useEffect } from 'react';
import { Product, SiteConfig, AppView } from './types';
import { INITIAL_CONFIG, INITIAL_PRODUCTS } from './constants';
import PublicSite from './pages/PublicSite';
import AdminPanel from './pages/AdminPanel';
import { LayoutPanelLeft, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('public');
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('site_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('site_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('site_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('site_products', JSON.stringify(products));
  }, [products]);

  return (
    <div className="min-h-screen">
      {/* View Switcher Overlay (Sticky for easy navigation during development) */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => setView('public')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all ${
            view === 'public' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Globe size={18} />
          <span className="font-medium">Live Site</span>
        </button>
        <button
          onClick={() => setView('admin')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all ${
            view === 'admin' 
              ? 'bg-slate-800 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <LayoutPanelLeft size={18} />
          <span className="font-medium">Admin Panel</span>
        </button>
      </div>

      {view === 'public' ? (
        <PublicSite config={config} products={products} />
      ) : (
        <AdminPanel 
          config={config} 
          setConfig={setConfig} 
          products={products} 
          setProducts={setProducts} 
        />
      )}
    </div>
  );
};

export default App;
