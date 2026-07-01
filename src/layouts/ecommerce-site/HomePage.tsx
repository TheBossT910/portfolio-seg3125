// HomePage.tsx
import React from 'react';
import { StoreLayout } from './StoreLayout';
import { productsData, useCart } from './StoreContext';

export const HomePage = () => {
  // Safe extraction for the client
  const cartContext = useCart() || { addToCart: () => {} };
  const { addToCart } = cartContext;
  
  const deals = productsData.filter(p => p.originalPrice);

  return (
    <StoreLayout>
      {/* Search By Vehicle Bar */}
      <div className="bg-[#C0392B] py-3 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 justify-center">
          <span className="text-white font-bold uppercase tracking-wider text-sm md:text-base whitespace-nowrap">Add Your Vehicle:</span>
          <div className="flex w-full md:w-auto gap-2 flex-wrap sm:flex-nowrap">
            <select className="px-3 py-2 rounded text-sm font-bold text-gray-700 outline-none flex-1">
              <option>Year</option><option>2024</option><option>2023</option><option>2022</option>
            </select>
            <select className="px-3 py-2 rounded text-sm font-bold text-gray-700 outline-none flex-1">
              <option>Make</option><option>Honda</option><option>Toyota</option><option>Ford</option>
            </select>
            <select className="px-3 py-2 rounded text-sm font-bold text-gray-700 outline-none flex-1">
              <option>Model</option>
            </select>
            <button className="px-6 py-2 bg-[#1A1A1A] hover:bg-black text-white font-bold rounded uppercase tracking-wide transition-colors">Find Parts</button>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative min-h-[55vh] flex items-center justify-start bg-gray-900 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80)'}}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        <div className="relative z-10 text-left text-white px-8 md:px-16 w-full max-w-7xl mx-auto">
          <span className="inline-block bg-[#C0392B] text-white px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4">Summer Service Sale</span>
          <h1 className="text-5xl md:text-6xl font-['Barlow_Condensed'] font-extrabold uppercase tracking-tight mb-4 max-w-xl leading-tight">
            Up to 35% Off <br/> Performance Brakes
          </h1>
          <p className="font-['Inter'] text-lg text-gray-300 mb-8 max-w-lg">
            Complete brake kits, pads, and rotors. Free next-day delivery to your home or local shop on orders over $75.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/case-studies/ecommerce-site/shop" className="px-8 py-3 bg-[#C0392B] hover:bg-[#922B21] text-white font-bold rounded uppercase tracking-wide transition-colors text-center shadow-lg">Shop The Sale</a>
          </div>
        </div>
      </div>
      
      {/* Quick Categories Matrix */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-['Barlow_Condensed'] font-bold uppercase mb-6 border-b-2 border-[#1A1A1A] pb-2 text-[#1A1A1A]">Shop By System</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            {name: 'Brakes & Rotors', icon: '🛑'}, {name: 'Oil & Fluids', icon: '🛢️'}, 
            {name: 'Suspension', icon: '🚙'}, {name: 'Batteries', icon: '⚡'},
            {name: 'Wipers & Wash', icon: '🌧️'}, {name: 'Tools & Garage', icon: '🔧'}
          ].map((cat) => (
            <a key={cat.name} href={`/case-studies/ecommerce-site/shop`} className="bg-white p-4 rounded shadow-sm hover:shadow-md border border-gray-200 text-center group cursor-pointer transition-all">
              <div className="w-14 h-14 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#C0392B] transition-colors border border-gray-100">
                <span className="text-2xl">{cat.icon}</span>
              </div>
              <h3 className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wide">{cat.name}</h3>
            </a>
          ))}
        </div>
      </div>

      {/* Recommended Hot Deals */}
      <div className="bg-[#F8F9FA] py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-6 border-b border-gray-300 pb-2">
            <h2 className="text-2xl font-['Barlow_Condensed'] font-bold uppercase text-[#C0392B]">🔥 Weekly Flyers & Deals</h2>
            <a href="/case-studies/ecommerce-site/shop" className="text-sm font-bold text-gray-600 hover:text-black uppercase">View All Deals →</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.slice(0,3).map(product => (
              <div key={product.id} className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden flex flex-col group">
                <div className="h-48 relative bg-white p-4">
                  <div className="absolute top-2 left-2 bg-[#C0392B] text-white text-[11px] font-bold px-2 py-1 rounded z-10 uppercase shadow">Sale</div>
                  <img src={product.image} alt={product.name} className="object-cover h-full w-full rounded group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5 flex flex-col flex-grow border-t border-gray-100 bg-gray-50">
                  <h3 className="text-base font-['Inter'] font-bold leading-tight mb-2 text-[#1A1A1A]">{product.name}</h3>
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-400 line-through block">${product.originalPrice}</span>
                      <span className="text-xl font-['JetBrains_Mono'] font-extrabold text-[#C0392B]">${product.price}</span>
                    </div>
                    <button onClick={() => addToCart(product)} className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#C0392B] text-white text-sm font-bold rounded transition-colors uppercase">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Trusted Brands Marquee (Visual bulk) */}
      <div className="bg-white py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted OEM & Aftermarket Brands</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
            {['Mobil 1', 'Brembo', 'Bosch', 'K&N', 'Optima', 'Michelin'].map(brand => (
              <span key={brand} className="text-2xl font-['Barlow_Condensed'] font-bold text-gray-800">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};