import React, { useState } from 'react';

const Navbar = () => (
  <nav className="bg-[#001d3d] px-6 md:px-10 py-4 flex justify-between items-center w-full shadow-lg z-50 border-b-2 border-[#ffd60a] sticky top-0">
    <div className="text-[#ffd60a] font-extrabold text-2xl tracking-wider uppercase flex items-center gap-2">
      <span>Vroom</span><span className="text-white font-light">Vehicles</span>
    </div>
    <div className="hidden md:flex gap-8 text-white font-medium">
      <a href="/" className="hover:text-[#ffc300] transition-colors pb-1">Home</a>
      <a href="/promotions" className="text-[#ffd60a] hover:text-[#ffc300] transition-colors border-b-2 border-[#ffd60a] pb-1">Promotions</a>
      <a href="/cart" className="hover:text-[#ffc300] transition-colors pb-1">Cart</a>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-[#000814] text-white p-10 md:p-12 mt-auto border-t-4 border-[#003566]">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <h3 className="text-[#ffd60a] font-bold text-xl mb-2 uppercase tracking-wider">Vroom Vehicles</h3>
        <p className="text-[#ffd60a] font-medium text-sm mb-4">Premium Sports Car Rental Service</p>
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
          <p className="text-[#ffd60a] font-bold tracking-wide">Designed by Taha Rashid</p>
        </div>
      </div>
    </div>
  </footer>
);

const ContentPage = () => {
  const [filters, setFilters] = useState({ track: false, city: false, pros: false });

  const toggleFilter = (type: 'track' | 'city' | 'pros') => {
    setFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const results = [
    { id: 1, name: 'Porsche 911 GT3', desc: 'Naturally aspirated flat-six. Built for the track, legal for the street.', price: '$400/day', duration: 'Minimum 1 Day', img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=800&q=80', policies: [{ icon: '🏁', label: 'Track Approved' }, { icon: '🏆', label: 'Pros Only' }, { icon: '21+', label: 'Age Req' }] },
    { id: 2, name: 'Audi RS3 Sedan', desc: 'Quattro AWD system with a turbocharged 5-cylinder engine. Perfect weekend city cruiser.', price: '$150/day', duration: 'Weekend Promos Available', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80', policies: [{ icon: '🏙️', label: 'City Allowed' }, { icon: '🛣️', label: 'Highway' }, { icon: '21+', label: 'Age Req' }] },
    { id: 3, name: 'Lotus Emira', desc: 'Lightweight sports car with hydraulic steering for pure driver engagement.', price: '$250/day', duration: 'Minimum 2 Days', img: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=800&q=80', policies: [{ icon: '🏁', label: 'Track Approved' }, { icon: '🛣️', label: 'Highway' }, { icon: '21+', label: 'Age Req' }] },
  ];

  return (
    <div className="font-sans bg-[#f4f4f5] text-[#000814] min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-white border-b border-gray-200 py-6 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto w-full flex justify-between items-center">
          <h1 className="text-3xl font-light text-[#001d3d]">Active <span className="font-bold text-[#003566]">Promotions</span></h1>
          <div className="flex items-center gap-4 text-sm font-bold text-[#001d3d] bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
            <span className="text-gray-500 font-medium">Sort By:</span>
            <select className="bg-transparent outline-none cursor-pointer">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Duration: Shortest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row px-6 md:px-10 gap-8 max-w-[1600px] w-full mx-auto flex-1 my-10">
        
        {/* Interactive Left Sidebar */}
        <aside className="bg-white border border-gray-200 w-full lg:w-72 p-6 rounded-2xl flex flex-col gap-6 shadow-lg h-fit sticky top-24">
          <h3 className="font-bold text-[#001d3d] text-lg border-b border-gray-200 pb-2">Filter Fleet</h3>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Make & Model</label>
            <select className="bg-gray-50 border border-gray-300 rounded-lg text-[#000814] p-3 text-sm outline-none focus:border-[#003566]">
              <option>All Models</option>
              <option>Porsche</option>
              <option>Audi</option>
              <option>Lotus</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <label className="text-xs font-bold text-gray-500 uppercase">Driving Policies</label>
            <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50" onClick={() => toggleFilter('track')}>
              <input type="checkbox" readOnly checked={filters.track} className="w-4 h-4 accent-[#003566]" /> <span>🏁 Track Approved</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50" onClick={() => toggleFilter('city')}>
              <input type="checkbox" readOnly checked={filters.city} className="w-4 h-4 accent-[#003566]" /> <span>🏙️ City Allowed</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50" onClick={() => toggleFilter('pros')}>
              <input type="checkbox" readOnly checked={filters.pros} className="w-4 h-4 accent-[#003566]" /> <span>🏆 Pros Only</span>
            </label>
          </div>
        </aside>

        {/* Main Content List */}
        <main className="flex-1 flex flex-col gap-6">
          {results.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl flex flex-col md:flex-row p-5 gap-6 shadow-md border border-gray-200 hover:shadow-xl hover:border-[#ffd60a] transition-all group">
              <div className="relative w-full md:w-[35%] h-60 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-[#001d3d]">{car.name}</h3>
                    <div className="text-right">
                      <p className="text-xl font-extrabold text-[#000814]">{car.price}</p>
                      <p className="text-xs text-gray-500 font-medium">{car.duration}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{car.desc}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {car.policies.map((policy, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-[#f4f4f5] border border-gray-200 px-3 py-1.5 rounded-lg" title={policy.label}>
                        <span className="text-lg">{policy.icon}</span>
                        <span className="text-xs font-bold text-[#003566]">{policy.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <a href="/details" className="bg-[#001d3d] hover:bg-[#003566] text-white px-8 py-3 rounded-xl text-sm font-bold shadow-md transition-colors w-full md:w-auto text-center block">
                    View Options & Book
                  </a>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ContentPage;