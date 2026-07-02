import React, { useState } from 'react';
import { useCart, CartProvider } from './StoreContext';

const Navbar = () => {
  const { cartCount, isLoaded } = useCart() || { cartCount: 0, isLoaded: true };
  
  // interactive Vehicle State
  const [vehicle, setVehicle] = useState("Select Vehicle");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // temporary state for the dropdown form
  const [tempYear, setTempYear] = useState("Year");
  const [tempMake, setTempMake] = useState("Make");
  const [tempModel, setTempModel] = useState("Model");

  // data
  const years = Array.from({ length: 30 }, (_, i) => 2024 - i);
  const makes = ["Acura", "Audi", "BMW", "Chevrolet", "Ford", "Honda", "Jeep", "Lexus", "Nissan", "Subaru", "Toyota", "Volkswagen"];

  const handleSaveVehicle = () => {
    if (tempYear !== "Year" && tempMake !== "Make" && tempModel !== "Model") {
      setVehicle(`${tempYear} ${tempMake} ${tempModel}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-[#1A1A1A] text-white sticky top-0 z-50 shadow-xl border-b border-[#C0392B]">
      
      {/* top utility bar (vehicle selector) */}
      <div className="bg-black px-4 md:px-8 py-2 text-xs flex justify-between items-center font-['Inter'] text-gray-400 relative">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="text-[#E67E22]">⚙️</span>
          <span className={`font-bold text-white border-b border-dashed pb-[1px] ${vehicle !== 'Select Vehicle' ? 'border-[#27AE60] text-[#27AE60]' : 'border-gray-500'}`}>
            {vehicle}
          </span>
          <span className={`transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}>▼</span>
        </div>
        <div className="hidden sm:block">Free Shipping on Orders Over $75</div>

        {/* dropdown menu modal */}
        {isMenuOpen && (
          <div className="absolute top-full left-4 md:left-8 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-[100] text-[#1A1A1A] p-5 cursor-default animate-fade-in">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
              <h3 className="font-bold text-lg font-['Barlow_Condensed'] uppercase tracking-wide">Set Your Vehicle</h3>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-black font-bold text-lg">✕</button>
            </div>
            
            <div className="flex flex-col gap-3">
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#C0392B] outline-none font-bold text-sm"
                value={tempYear} onChange={e => { setTempYear(e.target.value); setTempMake("Make"); setTempModel("Model"); }}
              >
                <option>Year</option>
                {years.map(y => <option key={y}>{y}</option>)}
              </select>
              
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#C0392B] outline-none font-bold text-sm disabled:opacity-50 disabled:bg-gray-100"
                value={tempMake} onChange={e => { setTempMake(e.target.value); setTempModel("Model"); }}
                disabled={tempYear === "Year"}
              >
                <option>Make</option>
                {makes.map(m => <option key={m}>{m}</option>)}
              </select>
              
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#C0392B] outline-none font-bold text-sm disabled:opacity-50 disabled:bg-gray-100"
                value={tempModel} onChange={e => setTempModel(e.target.value)}
                disabled={tempMake === "Make"}
              >
                <option>Model</option>
                {tempMake === "Honda" && <><option>Civic</option><option>Accord</option><option>CR-V</option></>}
                {tempMake === "Ford" && <><option>F-150</option><option>Mustang</option><option>Explorer</option></>}
                {tempMake === "Toyota" && <><option>Camry</option><option>Tacoma</option><option>Corolla</option></>}
                {tempMake !== "Make" && tempMake !== "Honda" && tempMake !== "Ford" && tempMake !== "Toyota" && <option>Standard Trim</option>}
              </select>

              <button 
                onClick={handleSaveVehicle}
                disabled={tempYear === "Year" || tempMake === "Make" || tempModel === "Model"}
                className="w-full mt-2 py-3 bg-[#C0392B] hover:bg-[#922B21] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold rounded uppercase transition-colors text-sm tracking-wide shadow-sm"
              >
                Save Vehicle
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        <a href="/case-studies/ecommerce-site" className="text-2xl md:text-3xl font-['Barlow_Condensed'] font-bold uppercase tracking-wider flex items-center gap-2">
          GearHead <span className="text-[#C0392B]">Supply Co.</span>
        </a>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 font-['Inter'] text-sm font-bold uppercase tracking-wide">
            <a href="/case-studies/ecommerce-site/shop" className="hover:text-[#C0392B] transition-colors">Shop Parts</a>
            <a href="/case-studies/ecommerce-site/shop?deals=true" className="hover:text-[#C0392B] transition-colors">Deals</a>
          </div>
          <a href="/case-studies/ecommerce-site/checkout" className="relative p-2 text-white hover:text-[#C0392B] transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            {isLoaded && cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#C0392B] text-white text-[11px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1A1A1A] animate-pulse">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#1A1A1A] text-gray-300 py-12 mt-auto font-['Inter'] border-t-4 border-[#C0392B]">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <p className="text-2xl font-['Barlow_Condensed'] font-bold text-white uppercase tracking-wider mb-2">GearHead <span className="text-[#C0392B]">Supply Co.</span></p>
        <p className="text-sm text-gray-400">Everything your car needs. Nothing it doesn't. Precision parts for DIY mechanics and professionals alike.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Services</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="/case-studies/ecommerce-site/shop" className="hover:text-white transition-colors">Shop All Parts</a></li>
          <li><a href="/case-studies/ecommerce-site/checkout" className="hover:text-white transition-colors">Secure Checkout</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Support</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="/case-studies/ecommerce-site/survey" className="text-[#E67E22] font-bold hover:text-white transition-colors flex items-center gap-2"><span>📝</span> Share Feedback</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Returns & Fitment FAQ</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

export const StoreLayout = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>
    <style dangerouslySetInnerHTML={{__html: `
      @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
    `}} />
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] font-['Inter'] text-[#1A1A1A]">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  </CartProvider>
);