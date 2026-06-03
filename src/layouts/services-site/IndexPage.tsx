import React, { useState } from 'react';

const Navbar = () => (
  <nav className="sticky top-0 z-50 w-full bg-[#001d3d]/95 backdrop-blur-md px-6 md:px-10 py-4 flex justify-between items-center shadow-lg border-b-2 border-[#ffd60a]">
    <div className="text-[#ffd60a] font-extrabold text-2xl tracking-wider uppercase flex items-center gap-2 cursor-pointer">
      <span>Vroom</span><span className="text-white font-light">Vehicles</span>
    </div>
    <div className="hidden md:flex gap-8 text-white font-medium text-sm">
      <a href="/case-studies/services-site/" className="hover:text-[#ffc300] transition-colors pb-1">Home</a>
      <a href="/case-studies/services-site/content" className="hover:text-[#ffc300] transition-colors pb-1">Search Fleet</a>
      <a href="/case-studies/services-site/cart" className="hover:text-[#ffc300] transition-colors pb-1">Cart</a>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-[#000814] text-white p-10 md:p-12 mt-auto border-t-8 border-[#ffc300]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <h3 className="text-[#ffd60a] font-bold text-2xl mb-2 uppercase tracking-wider">Vroom Vehicles</h3>
        <p className="text-[#ffd60a] font-medium text-sm mb-4">Premium Sports Car Rental Service</p>
        <div className="text-sm text-gray-300 space-y-2">
          <p className="flex items-center gap-2"><span className="text-lg">📍</span> 800 King Edward Ave, Ottawa, ON</p>
          <p className="flex items-center gap-2"><span className="text-lg">📞</span> 1-800-555-VROOM</p>
          <p className="flex items-center gap-2"><span className="text-lg">✉️</span> contact@vroomvehicles.ca</p>
        </div>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4 text-xl">Project Details</h4>
        <p className="text-sm text-gray-400 mb-1">SEG 3125: Analysis and Design of UIs</p>
        <p className="text-sm text-gray-400 mb-1">Professor: Caroline Barrière</p>
        <div className="mt-6 inline-block bg-[#001d3d] border-2 border-[#ffd60a] px-6 py-3 rounded-xl shadow-lg shadow-[#ffc300]/20">
          <p className="text-[#ffd60a] font-bold tracking-wide">Designed by Taha Rashid</p>
        </div>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4 text-xl">Service Links</h4>
        <ul className="text-sm text-gray-400 space-y-3">
          <li><a href="#" className="hover:text-[#ffc300] transition-colors flex items-center gap-2"><span>🏷️</span> Weekend Deals (Oscar's Pick)</a></li>
          <li><a href="#" className="hover:text-[#ffc300] transition-colors flex items-center gap-2"><span>🏎️</span> Track Inventory (Carlos' Pick)</a></li>
          <li><a href="#" className="hover:text-[#ffc300] transition-colors flex items-center gap-2"><span>📜</span> Racing & City Policies</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

const IndexPage = () => {
  const [searchMake, setSearchMake] = useState('Make');
  const [searchDuration, setSearchDuration] = useState('Days');

  const inventoryCards = [
    { id: 1, img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=600&q=80', alt: 'Porsche 911 GT3', name: 'Porsche 911 GT3', duration: 'Weekend Rate (3 Days)', price: '$850 total', badge: 'Track Ready' },
    { id: 2, img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=80', alt: 'Audi RS3', name: 'Audi RS3 Sedan', duration: 'Daily Rate', price: '$150 / day', badge: 'City Cruiser' },
    { id: 3, img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80', alt: 'Corvette C8', name: 'Chevrolet Corvette C8', duration: 'Weekly Rate (7 Days)', price: '$1,200 total', badge: 'Hot Deal' },
  ];

  return (
    <div className="font-sans bg-[#f4f4f5] text-[#000814] min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 px-6 md:px-10 min-h-[650px] flex flex-col justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549399542-7e3f8b79c340?auto=format&fit=crop&w=1920&q=80")' }}
      >
        <div className="absolute inset-0 bg-[#001d3d]/70 mix-blend-multiply z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f4f4f5] z-0"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="text-center mb-10">
            <span className="bg-[#ffc300] text-[#000814] font-extrabold px-6 py-2 rounded-full text-sm tracking-widest uppercase mb-6 inline-block shadow-[0_0_15px_rgba(255,195,0,0.5)]">
              Weekend Promotions Active
            </span>
            <h1 className="text-white text-5xl md:text-7xl font-light drop-shadow-2xl">
              Find your <span className="text-[#ffd60a] font-bold underline decoration-8 underline-offset-8">perfect</span> ride
            </h1>
          </div>
          
          {/* Interactive Autotrader-style Search Bar */}
          <div className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-3xl flex flex-col md:flex-row gap-4 items-center w-full shadow-2xl border border-white/20">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-[#ffd60a] uppercase tracking-wider mb-2 px-2">Search Catalog</label>
              <input 
                type="text" 
                placeholder="e.g. Porsche 911 GT3, Audi RS3..." 
                className="w-full bg-white border-2 border-transparent rounded-2xl text-[#000814] px-6 py-4 outline-none focus:border-[#ffc300] shadow-inner text-lg" 
              />
            </div>
            <div className="w-full md:w-56">
              <label className="block text-xs font-bold text-[#ffd60a] uppercase tracking-wider mb-2 px-2">Make</label>
              <select 
                value={searchMake}
                onChange={(e) => setSearchMake(e.target.value)}
                className="w-full bg-white border-2 border-transparent rounded-2xl text-[#000814] px-6 py-4 outline-none focus:border-[#ffc300] cursor-pointer shadow-inner text-lg font-medium"
              >
                <option>Any Make</option>
                <option>Porsche</option>
                <option>Audi</option>
                <option>Lotus</option>
              </select>
            </div>
            <div className="w-full md:w-56">
              <label className="block text-xs font-bold text-[#ffd60a] uppercase tracking-wider mb-2 px-2">Duration</label>
              <select 
                value={searchDuration}
                onChange={(e) => setSearchDuration(e.target.value)}
                className="w-full bg-white border-2 border-transparent rounded-2xl text-[#000814] px-6 py-4 outline-none focus:border-[#ffc300] cursor-pointer shadow-inner text-lg font-medium"
              >
                <option>Daily</option>
                <option>Weekend (3 Days)</option>
                <option>Weekly (7 Days)</option>
              </select>
            </div>
            <div className="w-full md:w-auto mt-auto">
              <a href="/case-studies/services-site/content" className="w-full md:w-auto bg-[#ffc300] hover:bg-[#ffd60a] text-[#000814] text-lg font-extrabold rounded-2xl px-10 py-4 shadow-[0_4px_14px_rgba(255,195,0,0.4)] transition-all h-[60px] flex items-center justify-center hover:-translate-y-1 block">
                Search Fleet
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory Cards Section */}
      <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-[#001d3d]">Featured Vehicles</h2>
            <p className="text-gray-500 font-medium mt-2">Curated selections for the track and the city.</p>
          </div>
          <a href="/case-studies/services-site/content" className="hidden md:block text-[#003566] font-bold hover:text-[#ffc300] border-b-2 border-transparent hover:border-[#ffc300] transition-all pb-1">View Full Fleet →</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {inventoryCards.map((car) => (
            <a href="/case-studies/services-site/details" key={car.id} className="bg-white rounded-3xl overflow-hidden flex flex-col shadow-xl border border-gray-100 hover:shadow-2xl hover:border-[#ffd60a] hover:-translate-y-2 transition-all group cursor-pointer">
              <div className="w-full h-64 overflow-hidden relative">
                <img 
                  src={car.img} 
                  alt={car.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000814]/60 to-transparent"></div>
                <span className="absolute top-4 right-4 bg-[#ffc300] text-[#000814] text-xs px-4 py-2 rounded-full font-extrabold shadow-lg tracking-wider uppercase">
                  {car.badge}
                </span>
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">{car.name}</h3>
              </div>
              <div className="p-6 flex flex-col flex-1 bg-[#001d3d]">
                <p className="text-sm text-[#ffd60a] font-medium mb-4 flex items-center gap-2"><span className="text-lg">⏱️</span> {car.duration}</p>
                <div className="mt-auto pt-4 border-t border-[#003566] flex justify-between items-center">
                  <span className="text-2xl font-extrabold text-white">{car.price}</span>
                  <span className="text-[#ffc300] font-bold group-hover:translate-x-1 transition-transform">Book Now →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndexPage;