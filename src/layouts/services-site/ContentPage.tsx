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
  Track: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18M3 15h18l-2-4 2-4H3" /></svg>,
  City: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v2H9V7zm0 4h1v2H9v-2zm0 4h1v2H9v-2zm4-8h1v2h-1V7zm0 4h1v2h-1v-2zm0 4h1v2h-1v-2z" /></svg>,
  Pros: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M19 3v4M5 11h14M9 11v4a3 3 0 006 0v-4M7 21h10M12 15v6" /></svg>,
  Age: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
};

const ContentPage = () => {
  // Advanced Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Recommended');
  const [promoOnly, setPromoOnly] = useState(false);
  const [make, setMake] = useState('All');
  const [year, setYear] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [policyFilters, setPolicyFilters] = useState({ track: false, city: false, pros: false });

  // Filter Data Lookups
  const bodyTypes = ['Supercar', 'Convertible', 'Super SUV', 'Sports Sedan'];
  const colors = [
    { id: 'black', hex: '#000814' },
    { id: 'white', hex: '#ffffff' },
    { id: 'yellow', hex: '#ffc300' },
    { id: 'blue', hex: '#003566' },
    { id: 'red', hex: '#ef4444' },
    { id: 'green', hex: '#22c55e' },
  ];

  // Fleet Database with expanded queryable metadata
  const fleet = [
    { id: 1, make: 'Porsche', model: '911 GT3', year: 2023, bodyType: 'Supercar', color: 'white', price: 400, isPromo: false, desc: 'Naturally aspirated flat-six. Built for the track.', img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=800&q=80', policyKeys: ['track', 'pros'], policies: [{ icon: Icons.Track, label: 'Track Approved' }, { icon: Icons.Pros, label: 'Pros Only' }] },
    { id: 2, make: 'Audi', model: 'RS3 Sedan', year: 2022, bodyType: 'Sports Sedan', color: 'black', price: 150, isPromo: true, desc: 'Quattro AWD system with a turbocharged 5-cylinder engine.', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80', policyKeys: ['city'], policies: [{ icon: Icons.City, label: 'City Allowed' }, { icon: Icons.Age, label: '21+ Required' }] },
    { id: 3, make: 'Lotus', model: 'Emira', year: 2024, bodyType: 'Supercar', color: 'green', price: 250, isPromo: false, desc: 'Lightweight sports car with hydraulic steering.', img: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=800&q=80', policyKeys: ['track', 'city'], policies: [{ icon: Icons.Track, label: 'Track Approved' }, { icon: Icons.City, label: 'City Allowed' }] },
    { id: 4, make: 'Aston Martin', model: 'DBX707', year: 2024, bodyType: 'Super SUV', color: 'black', price: 500, isPromo: true, desc: 'The ultimate luxury performance SUV. 707 horsepower.', img: 'https://images.unsplash.com/photo-1614377284368-22878411d943?auto=format&fit=crop&w=800&q=80', policyKeys: ['city', 'pros'], policies: [{ icon: Icons.City, label: 'City Allowed' }, { icon: Icons.Pros, label: 'Pros Only' }] },
    { id: 5, make: 'Chevrolet', model: 'Corvette C8', year: 2023, bodyType: 'Convertible', color: 'yellow', price: 200, isPromo: true, desc: 'Mid-engine American V8 power with an open top.', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80', policyKeys: ['track', 'city'], policies: [{ icon: Icons.Track, label: 'Track Approved' }, { icon: Icons.City, label: 'City Allowed' }] },
  ];

  // Handlers
  const togglePolicy = (type: 'track' | 'city' | 'pros') => setPolicyFilters(prev => ({ ...prev, [type]: !prev[type] }));
  const toggleBodyType = (type: string) => setSelectedBodyTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  const toggleColor = (colorId: string) => setSelectedColors(prev => prev.includes(colorId) ? prev.filter(c => c !== colorId) : [...prev, colorId]);

  const resetFilters = () => {
    setPromoOnly(false); setMake('All'); setYear('All'); setMinPrice(''); setMaxPrice('');
    setSelectedBodyTypes([]); setSelectedColors([]); setPolicyFilters({ track: false, city: false, pros: false });
    setSearchQuery('');
  };

  // Active Filtering Logic
  let filteredResults = fleet.filter(car => {
    const fullName = `${car.make} ${car.model}`.toLowerCase();
    if (searchQuery && !fullName.includes(searchQuery.toLowerCase())) return false;
    if (promoOnly && !car.isPromo) return false;
    if (make !== 'All' && car.make !== make) return false;
    if (year !== 'All' && car.year < parseInt(year)) return false;
    if (minPrice && car.price < parseInt(minPrice)) return false;
    if (maxPrice && car.price > parseInt(maxPrice)) return false;
    if (selectedBodyTypes.length > 0 && !selectedBodyTypes.includes(car.bodyType)) return false;
    if (selectedColors.length > 0 && !selectedColors.includes(car.color)) return false;
    if (policyFilters.track && !car.policyKeys.includes('track')) return false;
    if (policyFilters.city && !car.policyKeys.includes('city')) return false;
    if (policyFilters.pros && !car.policyKeys.includes('pros')) return false;
    return true;
  });

  // Active Sorting Logic
  if (sortOption === 'Price: Low to High') filteredResults.sort((a, b) => a.price - b.price);
  if (sortOption === 'Price: High to Low') filteredResults.sort((a, b) => b.price - a.price);
  if (sortOption === 'Year: Newest') filteredResults.sort((a, b) => b.year - a.year);

  return (
    <div className="font-sans bg-[#f4f4f5] text-[#000814] min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 py-6">
        {/* Top Search & Tag Panel */}
        <div className="bg-[#001d3d] p-5 rounded-xl shadow-md border-t-4 border-[#ffc300] flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3">
            <input 
              type="text" 
              placeholder="Search make or model (e.g., Porsche 911)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-white border border-[#003566] text-[#000814] rounded-lg px-4 py-2 outline-none focus:border-[#ffc300] text-sm"
            />
            <button className="bg-[#ffc300] hover:bg-[#ffd60a] text-[#000814] font-bold text-sm px-8 py-2 rounded-lg shadow transition-colors">
              Search
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => { resetFilters(); }}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors border ${!promoOnly && selectedBodyTypes.length === 0 && !policyFilters.track ? 'bg-[#ffc300] text-[#000814] border-[#ffc300]' : 'bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white'}`}
            >
              All Vehicles
            </button>
            <button 
              onClick={() => setPromoOnly(!promoOnly)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors border flex items-center gap-1 ${promoOnly ? 'bg-[#ffc300] text-[#000814] border-[#ffc300]' : 'bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white'}`}
            >
              🔥 Active Promotions
            </button>
            <button 
              onClick={() => togglePolicy('track')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors border flex items-center gap-1 ${policyFilters.track ? 'bg-[#ffc300] text-[#000814] border-[#ffc300]' : 'bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white'}`}
            >
              🏁 Track Ready
            </button>
            <button 
              onClick={() => toggleBodyType('Super SUV')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors border ${selectedBodyTypes.includes('Super SUV') ? 'bg-[#ffc300] text-[#000814] border-[#ffc300]' : 'bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white'}`}
            >
              Super SUVs
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row px-6 md:px-10 gap-6 max-w-7xl w-full mx-auto flex-1 mb-10">
        
        {/* Left Sidebar Advanced Filters */}
        <aside className="bg-[#000814] w-full lg:w-64 p-5 rounded-xl flex flex-col gap-5 shadow-lg h-fit sticky top-20 border border-[#001d3d]">
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wide">Filter Fleet</h3>
            <button onClick={resetFilters} className="text-[#ffc300] text-[10px] font-bold hover:underline">Reset</button>
          </div>

          {/* Make & Model */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Make</label>
            <select value={make} onChange={e => setMake(e.target.value)} className="w-full bg-[#001d3d] border border-gray-700 text-gray-200 text-xs rounded-md p-2 outline-none focus:border-[#ffc300]">
              <option value="All">All Makes</option>
              <option value="Porsche">Porsche</option>
              <option value="Audi">Audi</option>
              <option value="Lotus">Lotus</option>
              <option value="Aston Martin">Aston Martin</option>
              <option value="Chevrolet">Chevrolet</option>
            </select>
          </div>

          {/* Body Type */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Body Type</label>
            <div className="grid grid-cols-2 gap-1.5">
              {bodyTypes.map(type => (
                <button 
                  key={type}
                  onClick={() => toggleBodyType(type)}
                  className={`py-1.5 px-2 rounded text-[10px] font-bold transition-colors border ${selectedBodyTypes.includes(type) ? 'bg-[#ffc300] text-[#000814] border-[#ffc300]' : 'bg-[#001d3d] text-gray-300 border-gray-700 hover:border-[#ffc300]'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price Range (/Day)</label>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="Min $" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full bg-[#001d3d] border border-gray-700 text-gray-200 text-xs rounded-md p-2 outline-none focus:border-[#ffc300]" />
              <span className="text-gray-500">-</span>
              <input type="number" placeholder="Max $" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full bg-[#001d3d] border border-gray-700 text-gray-200 text-xs rounded-md p-2 outline-none focus:border-[#ffc300]" />
            </div>
          </div>

          {/* Year */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Year</label>
            <select value={year} onChange={e => setYear(e.target.value)} className="w-full bg-[#001d3d] border border-gray-700 text-gray-200 text-xs rounded-md p-2 outline-none focus:border-[#ffc300]">
              <option value="All">Any Year</option>
              <option value="2024">2024 or newer</option>
              <option value="2023">2023 or newer</option>
              <option value="2022">2022 or newer</option>
            </select>
          </div>

          {/* Colour Swatches */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Exterior Colour</label>
            <div className="flex flex-wrap gap-2">
              {colors.map(c => (
                <button
                  key={c.id}
                  onClick={() => toggleColor(c.id)}
                  className={`w-6 h-6 rounded-full shadow-inner transition-transform border ${selectedColors.includes(c.id) ? 'border-[#ffc300] scale-110 ring-2 ring-[#ffc300] ring-offset-1 ring-offset-[#000814]' : 'border-gray-500 hover:scale-110'}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.id}
                />
              ))}
            </div>
          </div>

          {/* Driving Policies */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Policies</label>
            <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-[#001d3d] transition-colors" onClick={() => togglePolicy('track')}>
              <input type="checkbox" readOnly checked={policyFilters.track} className="w-3.5 h-3.5 accent-[#ffc300]" /> 
              <span className="text-xs text-gray-200 flex items-center gap-1.5">{Icons.Track} Track Approved</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-[#001d3d] transition-colors" onClick={() => togglePolicy('city')}>
              <input type="checkbox" readOnly checked={policyFilters.city} className="w-3.5 h-3.5 accent-[#ffc300]" /> 
              <span className="text-xs text-gray-200 flex items-center gap-1.5">{Icons.City} City Allowed</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-[#001d3d] transition-colors" onClick={() => togglePolicy('pros')}>
              <input type="checkbox" readOnly checked={policyFilters.pros} className="w-3.5 h-3.5 accent-[#ffc300]" /> 
              <span className="text-xs text-gray-200 flex items-center gap-1.5">{Icons.Pros} Pros Only</span>
            </label>
          </div>

          {/* Dates */}
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Availability Dates</label>
            <input type="date" className="w-full bg-[#001d3d] border border-gray-700 text-gray-200 text-xs rounded-md p-2 outline-none focus:border-[#ffc300]" />
            <input type="date" className="w-full bg-[#001d3d] border border-gray-700 text-gray-200 text-xs rounded-md p-2 outline-none focus:border-[#ffc300]" />
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-center bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <span className="text-sm font-bold text-[#001d3d]">Showing {filteredResults.length} Results</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-bold uppercase">Sort By:</span>
              <select 
                value={sortOption} 
                onChange={e => setSortOption(e.target.value)}
                className="text-sm border-none bg-transparent font-medium text-[#001d3d] outline-none cursor-pointer"
              >
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Year: Newest</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {filteredResults.length === 0 ? (
              <div className="bg-white p-8 rounded-xl text-center border border-gray-200">
                <p className="text-gray-500 font-medium mb-4">No vehicles match your strict filters.</p>
                <button onClick={resetFilters} className="bg-[#ffc300] text-[#000814] font-bold px-6 py-2 rounded-lg hover:bg-[#ffd60a] transition-colors text-sm">
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredResults.map((car) => (
                <div key={car.id} className="bg-white rounded-xl flex flex-col sm:flex-row p-3 gap-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="relative w-full sm:w-64 h-44 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    <img src={car.img} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
                    {car.isPromo && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider shadow-sm">
                        Deal
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1 pr-2">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{car.year} • {car.make}</p>
                          <h3 className="text-xl font-bold text-[#001d3d] leading-tight">{car.model}</h3>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-extrabold text-[#000814]">${car.price}</p>
                          <p className="text-[10px] font-bold text-gray-500 uppercase">/ day</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-xs leading-relaxed mt-2 mb-3 line-clamp-2">{car.desc}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {car.policies.map((policy, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 bg-[#f4f4f5] border border-gray-200 px-2 py-1 rounded-md" title={policy.label}>
                            <span className="text-gray-600">{policy.icon}</span>
                            <span className="text-[10px] font-bold text-[#003566] uppercase">{policy.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full border border-gray-300 shadow-sm" style={{ backgroundColor: colors.find(c => c.id === car.color)?.hex }}></div>
                        <span className="text-[10px] font-bold text-gray-400 capitalize">{car.color}</span>
                        <span className="text-gray-300 mx-1">•</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{car.bodyType}</span>
                      </div>
                      <a href="/case-studies/services-site/details" className="bg-[#001d3d] hover:bg-[#003566] text-[#ffd60a] px-6 py-2 rounded-lg text-sm font-bold transition-colors text-center w-full sm:w-auto">
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