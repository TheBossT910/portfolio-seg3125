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

// SVG Icons for Policies
const Icons = {
  Track: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18M3 15h18l-2-4 2-4H3" /></svg>,
  City: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v2H9V7zm0 4h1v2H9v-2zm0 4h1v2H9v-2zm4-8h1v2h-1V7zm0 4h1v2h-1v-2zm0 4h1v2h-1v-2z" /></svg>,
  Pros: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M19 3v4M5 11h14M9 11v4a3 3 0 006 0v-4M7 21h10M12 15v6" /></svg>,
  Age: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
};

const ContentPage = () => {
  const [activeTag, setActiveTag] = useState('All');
  const [filters, setFilters] = useState({ track: false, city: false, pros: false });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFilter = (type: 'track' | 'city' | 'pros') => {
    setFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // Fleet Database with queryable metadata
  const fleet = [
    { id: 1, name: 'Porsche 911 GT3', desc: 'Naturally aspirated flat-six. Built for the track.', price: '$400', img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=800&q=80', tags: ['Track Ready', 'Luxury Exotics'], policyKeys: ['track', 'pros'], policies: [{ icon: Icons.Track, label: 'Track Approved' }, { icon: Icons.Pros, label: 'Pros Only' }] },
    { id: 2, name: 'Audi RS3 Sedan', desc: 'Quattro AWD system with a turbocharged 5-cylinder engine.', price: '$150', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80', tags: ['Active Promotions', 'City Cruisers'], policyKeys: ['city'], policies: [{ icon: Icons.City, label: 'City Allowed' }, { icon: Icons.Age, label: '21+ Required' }] },
    { id: 3, name: 'Lotus Emira', desc: 'Lightweight sports car with hydraulic steering.', price: '$250', img: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=800&q=80', tags: ['Track Ready'], policyKeys: ['track', 'city'], policies: [{ icon: Icons.Track, label: 'Track Approved' }, { icon: Icons.City, label: 'City Allowed' }] },
  ];

  // Active Filtering Logic
  const filteredResults = fleet.filter(car => {
    // 1. Text Search Filter
    if (searchQuery && !car.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    // 2. Tag Filter
    if (activeTag !== 'All' && !car.tags.includes(activeTag)) return false;
    // 3. Checkbox Filters (Must match all selected policies)
    if (filters.track && !car.policyKeys.includes('track')) return false;
    if (filters.city && !car.policyKeys.includes('city')) return false;
    if (filters.pros && !car.policyKeys.includes('pros')) return false;
    return true;
  });

  return (
    <div className="font-sans bg-[#f4f4f5] text-[#000814] min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 py-6">
        {/* Precise Top Search Panel */}
        <div className="bg-[#001d3d] p-5 rounded-xl shadow-md border-t-4 border-[#ffc300] flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3">
            <input 
              type="text" 
              placeholder="Search vehicles (e.g., Porsche)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-white border border-[#003566] text-[#000814] rounded-lg px-4 py-2 outline-none focus:border-[#ffc300] text-sm"
            />
            <button className="bg-[#ffc300] hover:bg-[#ffd60a] text-[#000814] font-bold text-sm px-8 py-2 rounded-lg shadow transition-colors">
              Search
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Active Promotions', 'Track Ready', 'City Cruisers', 'Luxury Exotics'].map(tag => (
              <button 
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors border ${activeTag === tag ? 'bg-[#ffc300] text-[#000814] border-[#ffc300]' : 'bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row px-6 md:px-10 gap-6 max-w-7xl w-full mx-auto flex-1 mb-10">
        
        {/* Left Sidebar Filters */}
        <aside className="bg-[#000814] w-full lg:w-64 p-5 rounded-xl flex flex-col gap-5 shadow-lg h-fit sticky top-20 border border-[#001d3d]">
          <h3 className="font-bold text-white text-sm border-b border-gray-700 pb-2">Filter Fleet</h3>
          
          {/* Functional Checkboxes */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Driving Policies</label>
            <label className="flex items-center gap-3 cursor-pointer p-1.5 rounded hover:bg-[#001d3d] transition-colors" onClick={() => toggleFilter('track')}>
              <input type="checkbox" readOnly checked={filters.track} className="w-3.5 h-3.5 accent-[#ffc300]" /> 
              <span className="text-sm text-gray-200 flex items-center gap-2">{Icons.Track} Track Approved</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-1.5 rounded hover:bg-[#001d3d] transition-colors" onClick={() => toggleFilter('city')}>
              <input type="checkbox" readOnly checked={filters.city} className="w-3.5 h-3.5 accent-[#ffc300]" /> 
              <span className="text-sm text-gray-200 flex items-center gap-2">{Icons.City} City Allowed</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-1.5 rounded hover:bg-[#001d3d] transition-colors" onClick={() => toggleFilter('pros')}>
              <input type="checkbox" readOnly checked={filters.pros} className="w-3.5 h-3.5 accent-[#ffc300]" /> 
              <span className="text-sm text-gray-200 flex items-center gap-2">{Icons.Pros} Pros Only</span>
            </label>
          </div>

          {/* Functional-looking Date Picker Input */}
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Availability Dates</label>
            <input type="date" className="w-full bg-[#001d3d] border border-gray-600 text-white text-sm rounded-md p-2 outline-none focus:border-[#ffc300]" />
            <input type="date" className="w-full bg-[#001d3d] border border-gray-600 text-white text-sm rounded-md p-2 outline-none focus:border-[#ffc300]" />
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-center bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <span className="text-sm font-bold text-[#001d3d]">Showing {filteredResults.length} Results</span>
            <select className="text-sm border-none bg-transparent font-medium text-gray-600 outline-none cursor-pointer">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="flex flex-col gap-4">
            {filteredResults.length === 0 ? (
              <div className="bg-white p-8 rounded-xl text-center border border-gray-200">
                <p className="text-gray-500 font-medium">No vehicles match your strict filters. Try removing some restrictions.</p>
              </div>
            ) : (
              filteredResults.map((car) => (
                <div key={car.id} className="bg-white rounded-xl flex flex-col sm:flex-row p-3 gap-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="relative w-full sm:w-56 h-40 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    <img src={car.img} alt={car.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1 pr-2">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-bold text-[#001d3d]">{car.name}</h3>
                        <p className="text-lg font-extrabold text-[#000814]">{car.price}<span className="text-xs font-normal text-gray-500">/day</span></p>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{car.desc}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {car.policies.map((policy, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 bg-[#f4f4f5] border border-gray-200 px-2 py-1 rounded-md" title={policy.label}>
                            <span className="text-gray-600">{policy.icon}</span>
                            <span className="text-[10px] font-bold text-[#003566] uppercase">{policy.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <a href="/case-studies/services-site/details" className="bg-[#001d3d] hover:bg-[#003566] text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors text-center w-full sm:w-auto">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ContentPage;