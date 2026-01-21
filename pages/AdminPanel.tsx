
import React, { useState } from 'react';
import { SiteConfig, Product, ContentSection } from '../types';
import { 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Layout, 
  Box, 
  Settings,
  X,
  FileText,
  AlignLeft,
  AlignRight,
  Type
} from 'lucide-react';

interface AdminPanelProps {
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ config, setConfig, products, setProducts }) => {
  const [activeTab, setActiveTab] = useState<'appearance' | 'products' | 'sections'>('appearance');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  // Section Handlers
  const saveSection = () => {
    if (!editingSection) return;
    const exists = config.sections.find(s => s.id === editingSection.id);
    const newSections = exists 
      ? config.sections.map(s => s.id === editingSection.id ? editingSection : s)
      : [...config.sections, editingSection];
    
    setConfig({ ...config, sections: newSections });
    setEditingSection(null);
  };

  const deleteSection = (id: string) => {
    if (confirm('Delete this content section?')) {
      setConfig({ ...config, sections: config.sections.filter(s => s.id !== id) });
    }
  };

  // Product Handlers
  const saveProduct = () => {
    if (!editingProduct) return;
    const newProducts = products.find(p => p.id === editingProduct.id)
      ? products.map(p => p.id === editingProduct.id ? editingProduct : p)
      : [...products, editingProduct];
    setProducts(newProducts);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6 md:fixed md:h-screen">
        <div className="text-xl font-bold mb-10 flex items-center gap-2">
          <Settings className="text-blue-400" /> Control Panel
        </div>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab('appearance')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === 'appearance' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Layout size={18} /> Hero & Brand
          </button>
          <button onClick={() => setActiveTab('sections')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === 'sections' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <FileText size={18} /> Content Blocks
          </button>
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === 'products' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Box size={18} /> Products
          </button>
        </nav>
      </aside>

      <main className="flex-1 md:ml-64 p-8 md:p-12 max-w-5xl">
        <header className="mb-10 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h1>
          {activeTab === 'sections' && (
            <button onClick={() => setEditingSection({ id: Date.now().toString(), title: '', content: '', type: 'text' })} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-md">
              <Plus size={18} /> Add Block
            </button>
          )}
          {activeTab === 'products' && (
            <button onClick={() => setEditingProduct({ id: Date.now().toString(), name: '', price: 0, description: '', imageUrl: 'https://picsum.photos/400/300' })} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-md">
              <Plus size={18} /> Add Product
            </button>
          )}
        </header>

        {activeTab === 'appearance' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-sm font-bold text-slate-700">Brand Name</label>
                <input type="text" name="brandName" value={config.brandName} onChange={handleConfigChange} className="w-full px-4 py-3 rounded-xl border border-slate-200" />
              </div>
              <div className="space-y-2"><label className="text-sm font-bold text-slate-700">Hero Title</label>
                <input type="text" name="heroTitle" value={config.heroTitle} onChange={handleConfigChange} className="w-full px-4 py-3 rounded-xl border border-slate-200" />
              </div>
            </div>
            <div className="space-y-2"><label className="text-sm font-bold text-slate-700">Hero Subtitle</label>
              <textarea name="heroSubtitle" value={config.heroSubtitle} onChange={handleConfigChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200" />
            </div>
            <div className="space-y-2"><label className="text-sm font-bold text-slate-700">Hero Image URL</label>
              <input type="text" name="heroImageUrl" value={config.heroImageUrl} onChange={handleConfigChange} className="w-full px-4 py-3 rounded-xl border border-slate-200" />
            </div>
          </div>
        )}

        {activeTab === 'sections' && (
          <div className="space-y-4">
            {config.sections.map(s => (
              <div key={s.id} className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                <div>
                  <h3 className="font-bold text-slate-800">{s.title || "Untitled Block"}</h3>
                  <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1">{s.type}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingSection(s)} className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={18} /></button>
                  <button onClick={() => deleteSection(s.id)} className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-4">
            {products.map(p => (
              <div key={p.id} className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                  <img src={p.imageUrl} className="w-12 h-12 rounded bg-slate-100 object-cover" />
                  <div><h3 className="font-bold text-slate-800">{p.name}</h3><p className="text-sm text-blue-600 font-bold">${p.price}</p></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingProduct(p)} className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={18} /></button>
                  <button onClick={() => setProducts(products.filter(item => item.id !== p.id))} className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Section Editor Modal */}
      {editingSection && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="p-6 bg-slate-50 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Content Block</h2>
              <button onClick={() => setEditingSection(null)} className="p-2 hover:bg-slate-200 rounded-lg"><X size={20} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Block Title</label>
                <input type="text" value={editingSection.title} onChange={e => setEditingSection({...editingSection, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Layout Style</label>
                <div className="flex gap-2">
                  {[
                    {id: 'text', icon: <Type size={16}/>, label: 'Text Only'},
                    {id: 'image-left', icon: <AlignLeft size={16}/>, label: 'Img Left'},
                    {id: 'image-right', icon: <AlignRight size={16}/>, label: 'Img Right'}
                  ].map(opt => (
                    <button key={opt.id} onClick={() => setEditingSection({...editingSection, type: opt.id as any})} className={`flex-1 flex items-center justify-center gap-2 py-3 border rounded-xl font-medium transition-all ${editingSection.type === opt.id ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-600'}`}>
                      {opt.icon} {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Content Body</label>
                <textarea value={editingSection.content} onChange={e => setEditingSection({...editingSection, content: e.target.value})} rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200" />
              </div>
              {editingSection.type !== 'text' && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Section Image URL</label>
                  <input type="text" value={editingSection.imageUrl} onChange={e => setEditingSection({...editingSection, imageUrl: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200" />
                </div>
              )}
            </div>
            <div className="p-6 bg-slate-50 border-t flex justify-end gap-3">
              <button onClick={() => setEditingSection(null)} className="px-6 py-2 rounded-lg font-bold text-slate-600">Cancel</button>
              <button onClick={saveSection} className="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold shadow-lg">Save Block</button>
            </div>
          </div>
        </div>
      )}

      {/* Product Editor Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Product</h2>
              <button onClick={() => setEditingProduct(null)}><X /></button>
            </div>
            <div className="p-8 space-y-4">
              <input type="text" placeholder="Name" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full p-3 border rounded-xl" />
              <input type="number" placeholder="Price" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} className="w-full p-3 border rounded-xl" />
              <textarea placeholder="Description" value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full p-3 border rounded-xl" />
              <input type="text" placeholder="Image URL" value={editingProduct.imageUrl} onChange={e => setEditingProduct({...editingProduct, imageUrl: e.target.value})} className="w-full p-3 border rounded-xl" />
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={saveProduct} className="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
