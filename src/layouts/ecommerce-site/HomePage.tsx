import React from 'react';
import { StoreLayout } from './StoreLayout';

export const HomePage = () => {
  return (
    <StoreLayout>
      {/* Hero Banner */}
      <div className="relative min-h-[70vh] flex items-center justify-center bg-gray-900 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80)'}}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] to-transparent bg-opacity-90"></div>
        <div className="relative z-10 text-left text-white px-8 md:px-16 w-full max-w-7xl mx-auto">
          <span className="inline-block bg-[#C0392B] text-white px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-6 animate-pulse">Weekend Flash Sale</span>
          <h1 className="text-5xl md:text-7xl font-['Barlow_Condensed'] font-extrabold uppercase tracking-tight mb-4 max-w-2xl leading-tight">
            Precision Parts.<br/>Peak Performance.
          </h1>
          <p className="font-['Inter'] text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
            Save up to 35% on high-performance brake systems and synthetic fluids. Gear up your garage today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/case-studies/ecommerce-site/shop" className="px-8 py-3 bg-[#C0392B] hover:bg-[#922B21] text-white font-bold rounded uppercase tracking-wide transition-colors text-center shadow-lg hover:shadow-red-500/50">Shop All Parts</a>
          </div>
        </div>
      </div>
      
      {/* Quick Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-['Barlow_Condensed'] font-bold uppercase mb-8 border-b-2 border-[#1A1A1A] pb-2 inline-block">Shop by System</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Brakes', 'Fluids', 'Suspension', 'Electrical'].map((cat) => (
            <a key={cat} href={`/case-studies/ecommerce-site/shop?category=${cat}`} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md border border-gray-200 text-center group cursor-pointer transition-all">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#C0392B] transition-colors">
                <span className="text-xl font-bold text-gray-400 group-hover:text-white">⚙️</span>
              </div>
              <h3 className="font-bold text-[#1A1A1A] uppercase tracking-wide">{cat}</h3>
            </a>
          ))}
        </div>
      </div>
    </StoreLayout>
  );
};