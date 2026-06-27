import React from 'react';
import { StoreLayout } from './StoreLayout';
import { productsData } from './StoreContext';

export const HomePage = () => {
  const deals = productsData.filter(p => p.originalPrice);

  return (
    <StoreLayout>
      {/* Rest of your HomePage code remains identical... */}
      <div className="relative min-h-[60vh] flex items-center justify-center bg-gray-900 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80)'}}>
        <div className="absolute inset-0 bg-[#1A1A1A] bg-opacity-80"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <span className="inline-block bg-[#C0392B] text-white px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-6">Limited Time</span>
          <h1 className="text-5xl md:text-6xl font-['Barlow_Condensed'] font-extrabold uppercase tracking-tight mb-6 leading-tight">Up to 35% Off Brake Systems This Week Only!</h1>
          <p className="font-['Inter'] text-lg md:text-xl text-gray-300 mb-8">Free shipping on orders over $75. Stock up now.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/case-studies/ecommerce-site/shop" className="px-8 py-3 bg-[#C0392B] hover:bg-[#922B21] text-white font-bold rounded uppercase tracking-wide transition-colors">Shop All Parts</a>
            <a href="/case-studies/ecommerce-site/shop?deals=true" className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-[#1A1A1A] text-white font-bold rounded uppercase tracking-wide transition-colors">View Deals</a>
          </div>
        </div>
      </div>
      
      {/* ... keep the rest of your HomePage JSX here, just updating hrefs to /case-studies/ecommerce-site/... */}
    </StoreLayout>
  );
};