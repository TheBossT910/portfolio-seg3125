import React, { useState, useEffect } from 'react';
import { StoreLayout } from './StoreLayout';
import { productsData, useCart } from './StoreContext';

const YEARS = Array.from({ length: 30 }, (_, i) => 2024 - i);
const MAKES = ["Acura", "Audi", "BMW", "Chevrolet", "Ford", "Honda", "Jeep", "Lexus", "Nissan", "Subaru", "Toyota", "Volkswagen"];

export const HomePage = () => (
  <StoreLayout>
    <HomePageContent />
  </StoreLayout>
);

const HomePageContent = () => {
  // pull the global context directly
  const { addToCart, setGlobalVehicle, globalVehicle } = useCart() || { 
    addToCart: () => {}, 
    setGlobalVehicle: () => {}, 
    globalVehicle: "Select Vehicle" 
  };
  
  const deals = productsData.filter(p => p.originalPrice);

  const seedFromGlobal = () => {
    if (globalVehicle && globalVehicle !== "Select Vehicle") {
      const parts = globalVehicle.split(" ");
      if (parts.length >= 3) {
        return { year: parts[0], make: parts[1], model: parts.slice(2).join(" ") };
      }
    }
    return { year: "Year", make: "Make", model: "Model" };
  };
  const [{ year, make, model }, setVehicle] = useState(seedFromGlobal);

  useEffect(() => {
    setVehicle(seedFromGlobal());
  }, [globalVehicle]);

  const renderModelOptions = () => {
    if (make === "Honda") return <><option>Civic</option><option>Accord</option><option>CR-V</option></>;
    if (make === "Ford") return <><option>F-150</option><option>Mustang</option><option>Explorer</option></>;
    if (make === "Toyota") return <><option>Camry</option><option>Tacoma</option><option>Corolla</option></>;
    if (make !== "Make") return <option>Standard Trim</option>;
    return null;
  };

  const handleFindParts = () => {
    if (year !== "Year" && make !== "Make" && model !== "Model") {
      setGlobalVehicle(`${year} ${make} ${model}`);
      window.location.href = '/case-studies/ecommerce-site/shop';
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { display: flex; width: 200%; animation: marquee 20s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-bg-zoom { animation: subtle-zoom 20s ease-in-out infinite; }
      `}} />

      {/* hero vehicle selector */}
      <div className="bg-[#C0392B] py-4 px-4 shadow-lg relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 justify-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚗</span>
            <span className="text-white font-bold uppercase tracking-wider text-sm md:text-base whitespace-nowrap drop-shadow-sm">Select Your Vehicle:</span>
          </div>
          <div className="flex w-full md:w-auto gap-2 flex-wrap sm:flex-nowrap shadow-inner bg-black/10 p-2 rounded-lg">
            
            <select 
              className="px-3 py-2.5 rounded text-sm font-bold text-gray-700 outline-none flex-1 hover:ring-2 ring-white/50 cursor-pointer transition-all"
              value={year} 
              onChange={e => setVehicle({ year: e.target.value, make: "Make", model: "Model" })}
            >
              <option value="Year">Year</option>
              {YEARS.map(y => <option key={y} value={y.toString()}>{y}</option>)}
            </select>
            
            <select 
              className="px-3 py-2.5 rounded text-sm font-bold text-gray-700 outline-none flex-1 hover:ring-2 ring-white/50 cursor-pointer transition-all disabled:opacity-50"
              value={make} 
              onChange={e => setVehicle({ year, make: e.target.value, model: "Model" })}
              disabled={year === "Year"}
            >
              <option value="Make">Make</option>
              {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            
            <select 
              className="px-3 py-2.5 rounded text-sm font-bold text-gray-700 outline-none flex-1 hover:ring-2 ring-white/50 cursor-pointer transition-all disabled:opacity-50"
              value={model} 
              onChange={e => setVehicle({ year, make, model: e.target.value })}
              disabled={make === "Make"}
            >
              <option value="Model">Model</option>
              {renderModelOptions()}
            </select>
            
            <button 
              onClick={handleFindParts}
              disabled={year === "Year" || make === "Make" || model === "Model"}
              className="px-8 py-2.5 bg-[#1A1A1A] hover:bg-black disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold rounded uppercase tracking-wide transition-all hover:shadow-lg transform hover:-translate-y-[1px] active:translate-y-0"
            >
              Find Parts
            </button>
          </div>
        </div>
      </div>

      <div className="relative min-h-[55vh] flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center animate-bg-zoom" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80)'}}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent"></div>
        <div className="relative z-10 text-left text-white px-8 md:px-16 w-full max-w-7xl mx-auto">
          <span className="inline-block bg-[#E67E22] text-white px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(230,126,34,0.5)]">🔥 Summer Service Sale</span>
          <h1 className="text-5xl md:text-7xl font-['Barlow_Condensed'] font-extrabold uppercase tracking-tight mb-4 max-w-2xl leading-none drop-shadow-lg">Up to 35% Off <br/> <span className="text-[#C0392B]">Performance Brakes</span></h1>
          <p className="font-['Inter'] text-lg md:text-xl text-gray-300 mb-8 max-w-xl font-medium">Complete brake kits, pads, and rotors. Free next-day delivery to your home or local shop on orders over $75.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/case-studies/ecommerce-site/shop" className="px-8 py-4 bg-[#C0392B] hover:bg-[#922B21] text-white font-bold rounded uppercase tracking-wide transition-all text-center shadow-[0_4px_14px_0_rgba(192,57,43,0.39)] hover:shadow-[0_6px_20px_rgba(192,57,43,0.23)] hover:-translate-y-1">Shop The Sale</a>
            <a href="/case-studies/ecommerce-site/shop?deals=true" className="px-8 py-4 bg-transparent border-2 border-white/50 hover:border-white hover:bg-white hover:text-black text-white font-bold rounded uppercase tracking-wide transition-all text-center backdrop-blur-sm">View Weekly Flyer</a>
          </div>
        </div>
      </div>
      
      {/* categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8 border-b-2 border-gray-200 pb-3">
          <h2 className="text-3xl font-['Barlow_Condensed'] font-extrabold uppercase text-[#1A1A1A] tracking-wide">Shop By Category</h2>
          <a href="/case-studies/ecommerce-site/shop" className="text-sm font-bold text-[#C0392B] hover:text-black uppercase transition-colors hidden sm:block">Explore All Catalog →</a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {name: 'Brakes & Rotors', img: 'https://images.unsplash.com/photo-1600705722908-bab1e6191b41?auto=format&fit=crop&w=300&q=80'}, 
            {name: 'Oil & Fluids', img: 'https://images.unsplash.com/photo-1621252178225-b44c66e74640?auto=format&fit=crop&w=300&q=80'}, 
            {name: 'Suspension', img: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=300&q=80'}, 
            {name: 'Batteries', img: 'https://images.unsplash.com/photo-1616781296068-185d26392095?auto=format&fit=crop&w=300&q=80'},
            {name: 'Lighting', img: 'https://images.unsplash.com/photo-1507742135606-5b430eab6903?auto=format&fit=crop&w=300&q=80'}, 
            {name: 'Tools & Garage', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=300&q=80'}
          ].map((cat) => (
            <a key={cat.name} href={`/case-studies/ecommerce-site/shop`} className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all h-32 md:h-40 flex items-end">
              <div className="absolute inset-0 bg-gray-900">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="relative z-10 p-3 w-full bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="font-bold text-white text-sm md:text-base uppercase tracking-wide group-hover:text-[#E67E22] transition-colors drop-shadow-md">{cat.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* promo banner */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl flex items-center min-h-[300px] group cursor-pointer">
          <div className="absolute inset-0">
             <img src="https://images.unsplash.com/photo-1632823471565-1ec2a8bd66dc?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Mechanic working" />
             <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/90 to-transparent"></div>
          </div>
          <div className="relative z-10 p-8 md:p-12 md:w-2/3">
            <span className="bg-white text-black px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded mb-4 inline-block">Pro Tier</span>
            <h2 className="text-3xl md:text-5xl font-['Barlow_Condensed'] font-extrabold text-white uppercase mb-3 leading-tight">Join Gearhead Rewards</h2>
            <p className="text-gray-300 font-medium mb-6 max-w-md">Earn points on every wrench turn. Sign up today and get <strong>$15 off</strong> your first order of $50 or more.</p>
            <button className="px-6 py-3 bg-[#E67E22] hover:bg-[#D35400] text-white font-bold rounded uppercase tracking-wide transition-all shadow-lg hover:shadow-orange-500/30">Sign Up Free</button>
          </div>
        </div>
      </div>

      {/* recommended deals */}
      <div className="bg-[#F8F9FA] py-16 border-y border-gray-200 shadow-inner relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex justify-between items-end mb-8 border-b border-gray-300 pb-3">
            <h2 className="text-3xl font-['Barlow_Condensed'] font-extrabold uppercase text-[#1A1A1A]">🔥 Top Sellers & Deals</h2>
            <div className="flex gap-2 hidden sm:flex">
              <button className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 hover:border-black hover:text-black transition-colors">←</button>
              <button className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">→</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.slice(0,3).map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-56 relative bg-white p-4 overflow-hidden flex items-center justify-center">
                  <div className="absolute top-3 left-3 bg-[#C0392B] text-white text-[11px] font-bold px-3 py-1.5 rounded z-10 uppercase shadow-md animate-bounce">Save ${(product.originalPrice! - product.price).toFixed(2)}</div>
                  <img src={product.image} alt={product.name} className="object-contain h-full w-full rounded mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow border-t border-gray-100 bg-gradient-to-b from-white to-gray-50">
                  <p className="text-[10px] font-['JetBrains_Mono'] text-gray-400 uppercase tracking-widest mb-1">{product.brand}</p>
                  <h3 className="text-lg font-['Inter'] font-extrabold leading-tight mb-2 text-[#1A1A1A] group-hover:text-[#C0392B] transition-colors">{product.name}</h3>
                  <div className="flex text-[#E67E22] text-xs mb-4">
                    ★★★★★ <span className="text-gray-400 ml-1">({product.reviewCount})</span>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-200/60">
                    <div>
                      <span className="text-sm text-gray-400 line-through block">${product.originalPrice}</span>
                      <span className="text-2xl font-['JetBrains_Mono'] font-black text-[#C0392B]">${product.price}</span>
                    </div>
                    <button onClick={() => addToCart(product)} className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#C0392B] text-white text-sm font-bold rounded shadow-md transition-all active:scale-95 uppercase flex items-center gap-2">
                      <span className="hidden lg:inline">Add to Cart</span>
                      <span className="lg:hidden">+ Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* trusted brands marquee */}
      <div className="bg-white py-12 border-b border-gray-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 text-center mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">In Stock: Premium OEM & Aftermarket Brands</p>
        </div>
        
        {/* infinite scrolling container */}
        <div className="relative w-full overflow-hidden bg-white flex">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="animate-marquee items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex w-1/2 justify-around items-center min-w-max px-10 gap-20">
              {['Mobil 1', 'Brembo', 'Bosch', 'K&N', 'Optima', 'Michelin', 'NGK', 'Castrol'].map(brand => (
                <span key={`set1-${brand}`} className="text-3xl font-['Barlow_Condensed'] font-black text-gray-800 tracking-wider hover:text-[#C0392B] transition-colors cursor-pointer">{brand}</span>
              ))}
            </div>
            <div className="flex w-1/2 justify-around items-center min-w-max px-10 gap-20">
              {['Mobil 1', 'Brembo', 'Bosch', 'K&N', 'Optima', 'Michelin', 'NGK', 'Castrol'].map(brand => (
                <span key={`set2-${brand}`} className="text-3xl font-['Barlow_Condensed'] font-black text-gray-800 tracking-wider hover:text-[#C0392B] transition-colors cursor-pointer">{brand}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};