import React, { useState } from 'react';
import { useCart, CartProvider } from './StoreContext';

const Navbar = () => {
  const { cartCount, isLoaded } = useCart();
  const [vehicle, setVehicle] = useState("Select Vehicle");

  return (
    <nav className="bg-[#1A1A1A] text-white sticky top-0 z-50 shadow-xl border-b border-[#C0392B]">
      {/* Top utility bar - The Vehicle Selector */}
      <div className="bg-black px-4 md:px-8 py-2 text-xs flex justify-between items-center font-['Inter'] text-gray-400">
        <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
          <span className="text-[#E67E22]">⚙️</span>
          <span className="font-bold text-white border-b border-dashed border-gray-500 pb-[1px]">{vehicle}</span>
          <span>▼</span>
        </div>
        <div className="hidden sm:block">Free Shipping on Orders Over $75</div>
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