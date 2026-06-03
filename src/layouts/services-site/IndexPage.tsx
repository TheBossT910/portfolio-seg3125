import React from 'react';

const Navbar = () => (
  <nav className="bg-[#001d3d] px-6 md:px-10 py-4 flex justify-between items-center w-full shadow-lg z-50 border-b-2 border-[#ffd60a] sticky top-0">
    <div className="text-[#ffd60a] font-extrabold text-2xl tracking-wider uppercase flex items-center gap-2">
      <span>Vroom</span><span className="text-white font-light">Vehicles</span>
    </div>
    <div className="hidden md:flex gap-8 text-white font-medium">
      <a href="/" className="text-[#ffd60a] hover:text-[#ffc300] transition-colors border-b-2 border-[#ffd60a] pb-1">Home</a>
      <a href="/promotions" className="hover:text-[#ffc300] transition-colors pb-1">Promotions</a>
      <a href="/cart" className="hover:text-[#ffc300] transition-colors pb-1">Cart</a>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-[#000814] text-white p-10 md:p-12 mt-auto border-t-4 border-[#003566]">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <h3 className="text-[#ffd60a] font-bold text-xl mb-4 uppercase tracking-wider">Vroom Vehicles</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          Premium sports car rental service. Whether you're cruising the city for the weekend or setting lap times on the track, we have your perfect ride.
        </p>
        <div className="text-sm text-gray-300 space-y-1">
          <p>📍 800 King Edward Ave, Ottawa, ON</p>
          <p>📞 1-800-555-VROOM</p>
          <p>✉️ contact@vroomvehicles.ca</p>
        </div>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4 text-lg">Project Details</h4>
        <p className="text-sm text-gray-400 mb-1">SEG 3125: Analysis and Design of UIs</p>
        <p className="text-sm text-gray-400 mb-1">Professor: Caroline Barrière</p>
        <div className="mt-4 inline-block bg-[#001d3d] border border-[#ffd60a] px-4 py-2 rounded-lg">
          <p className="text-[#ffd60a] font-bold">Designed by Taha Rashid</p>
        </div>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
        <ul className="text-sm text-gray-400 space-y-2">
          <li><a href="#" className="hover:text-[#ffc300] transition-colors">Weekend Deals (Oscar's Pick)</a></li>
          <li><a href="#" className="hover:text-[#ffc300] transition-colors">Track Inventory (Carlos' Pick)</a></li>
          <li><a href="#" className="hover:text-[#ffc300] transition-colors">Racing & City Policies</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

const IndexPage = () => {
  const inventoryCards = [
    { id: 1, img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=600&q=80', alt: 'Porsche 911 GT3', name: 'Porsche 911 GT3', duration: 'Weekend Rate (3 Days)', price: '$850 total', badge: 'Track Ready' },
    { id: 2, img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=80', alt: 'Audi RS3', name: 'Audi RS3 Sedan', duration: 'Daily Rate', price: '$150 / day', badge: 'City Cruiser' },
    { id: 3, img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80', alt: 'Corvette C8', name: 'Chevrolet Corvette C8', duration: 'Weekly Rate (7 Days)', price: '$1,200 total', badge: 'Hot Deal' },
  ];

  return (
    <div className="font-sans bg-[#f4f4f5] text-[#000814] min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section: Autotrader style search designed for both Oscar (prices) and Carlos (inventory) */}
      <section 
        className="relative h-[550px] bg-cover bg-center flex flex-col justify-center px-6 md:px-10"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549399542-7e3f8b79c340?auto=format&fit=crop&w=1920&q=80")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#000814]/90 z-0"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="text-center mb-8">
            <span className="bg-[#ffd60a] text-[#000814] font-bold px-4 py-1 rounded-full text-sm tracking-wide uppercase mb-4 inline-block shadow-lg">Weekend Promotions Active</span>
            <h1 className="text-white text-4xl md:text-6xl font-light drop-shadow-lg">
              Find your <span className="text-[#ffd60a] font-bold underline decoration-4 underline-offset-8">perfect</span> ride
            </h1>
          </div>
          
          {/* Central Autotrader-style Search Bar */}
          <div className="bg-white p-4 md:p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center w-full shadow-2xl border-4 border-[#ffd60a]">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-[#003566] uppercase tracking-wider mb-1 px-2">Make & Model</label>
              <input 
                type="text" 
                placeholder="e.g. Porsche 911 GT3, Audi RS3..." 
                className="w-full bg-[#f4f4f5] border border-gray-300 rounded-xl text-[#000814] px-4 py-3 outline-none focus:ring-2 focus:ring-[#003566]" 
              />
            </div>
            <div className="w-full md:w-48">
              <label className="block text-xs font-bold text-[#003566] uppercase tracking-wider mb-1 px-2">Duration</label>
              <select className="w-full bg-[#f4f4f5] border border-gray-300 rounded-xl text-[#000814] px-4 py-3 outline-none focus:ring-2 focus:ring-[#003566] cursor-pointer">
                <option>Daily</option>
                <option>Weekend (3 Days)</option>
                <option>Weekly (7 Days)</option>
              </select>
            </div>
            <div className="w-full md:w-auto mt-auto">
              <button className="w-full md:w-auto bg-[#001d3d] hover:bg-[#003566] text-white font-bold rounded-xl px-8 py-3 shadow-md transition-colors h-[50px]">
                Search Fleet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory Cards Section (Oscar's requirement: scroll down, see imgs w/ prices and durations) */}
      <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-[#001d3d] mb-8 text-center">Featured Vehicles & Deals</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {inventoryCards.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl border border-gray-200 hover:-translate-y-2 transition-transform group cursor-pointer">
              <div className="w-full h-56 overflow-hidden relative">
                <img 
                  src={car.img} 
                  alt={car.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-4 right-4 bg-[#ffd60a] text-[#000814] text-xs px-3 py-1.5 rounded-full font-bold shadow-md">
                  {car.badge}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-[#001d3d] mb-1">{car.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{car.duration}</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-2xl font-extrabold text-[#000814]">{car.price}</span>
                  <button className="text-[#003566] font-bold hover:text-[#ffc300] transition-colors">View Details →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndexPage;