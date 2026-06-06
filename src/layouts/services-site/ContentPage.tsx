import React, { useState } from 'react';
import Navbar from '../../components/services-site/Navbar';
import Footer from '../../components/services-site/Footer';

// SVG Icons for Policies
const Icons = {
  Track: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18M3 15h18l-2-4 2-4H3" /></svg>,
  City: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v2H9V7zm0 4h1v2H9v-2zm0 4h1v2H9v-2zm4-8h1v2h-1V7zm0 4h1v2h-1v-2zm0 4h1v2h-1v-2z" /></svg>,
  Pros: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M19 3v4M5 11h14M9 11v4a3 3 0 006 0v-4M7 21h10M12 15v6" /></svg>,
  Age: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
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

  // Fleet Database
  const fleet = [
    { id: 1, make: 'Ferrari', model: '812', year: 2021, bodyType: 'Supercar', color: 'yellow', price: 400, isPromo: false, desc: 'If the 812 Competizione is the last Ferrari to have a naturally-aspirated V12, we can’t think of a better way of going out with a bang.', img: 'https://www.topgear.com/sites/default/files/2021/11/_P2A8119_0.jpg?w=1784&h=1004', policyKeys: ['track', 'pros'], policies: [{ icon: Icons.Track, label: 'Track Approved' }, { icon: Icons.Pros, label: 'Pros Only' }] },
    { id: 2, make: 'Toyota', model: 'GR86', year: 2022, bodyType: 'Sports Sedan', color: 'red', price: 150, isPromo: true, desc: 'The sequel to the GT86 has a bigger engine, more power and increased grip, but it’s still a less-is-more hero, and a sports car bargain.', img: 'https://www.topgear.com/sites/default/files/2022/05/2022_GR86_DPL_DYNAMIC_005.jpg?w=1784&h=1004', policyKeys: ['city'], policies: [{ icon: Icons.City, label: 'City Allowed' }, { icon: Icons.Age, label: '21+ Required' }] },
    { id: 3, make: 'Lamborghini', model: 'Huracan', year: 2015, bodyType: 'Supercar', color: 'green', price: 250, isPromo: false, desc: 'The new Huracan returns Lamborghini to the entry-level supercar top table - even if it is a bit play it safe.', img: 'https://www.topgear.com/sites/default/files/cars-car/carousel/2015/02/buyers_guide_-_lamborghini_huracan_2014_-_front_quarter.jpg?w=1784&h=1004', policyKeys: ['track', 'city'], policies: [{ icon: Icons.Track, label: 'Track Approved' }, { icon: Icons.City, label: 'City Allowed' }] },
    { id: 4, make: 'Porsche', model: 'Cayenne Coupe Electric', year: 2026, bodyType: 'Super SUV', color: 'green', price: 500, isPromo: true, desc: 'It will reshape what you think should be possible (and heck, legal) in a big family car.', img: 'https://www.topgear.com/sites/default/files/2026/05/1-Porsche-Cayenne-Coupe-Electric-review-2026.jpg?w=1784&h=1004', policyKeys: ['city', 'pros'], policies: [{ icon: Icons.City, label: 'City Allowed' }, { icon: Icons.Pros, label: 'Pros Only' }] },
    { id: 5, make: 'Lotus', model: 'Exige', year: 2015, bodyType: 'Convertible', color: 'blue', price: 200, isPromo: true, desc: 'The Exige is a rarity, in the fact it’s a car that’s as happy on the track as it is on the road. One of the most focused yet compliant track-minded road cars you can get. Utter witchcraft.', img: 'https://www.topgear.com/sites/default/files/cars-car/carousel/2018/05/exige410sport-4721.jpg?w=1784&h=1004', policyKeys: ['track', 'city'], policies: [{ icon: Icons.Track, label: 'Track Approved' }, { icon: Icons.City, label: 'City Allowed' }] },
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

      {/* Main Container */}
      <div className="max-w-[90rem] mx-auto w-full px-6 md:px-10 py-8 flex flex-col gap-8 flex-1 mb-10">
        
        {/* Top Search Bar & Quick Filters */}
        <div className="bg-[#001d3d] p-6 md:p-8 rounded-2xl shadow-lg border-t-4 border-[#ffc300] flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Search make or model (e.g., Porsche 911)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-white border-2 border-transparent text-[#000814] rounded-xl px-5 py-3 outline-none focus:border-[#ffc300] text-base transition-colors"
            />
            <button className="bg-[#ffc300] hover:bg-[#ffd60a] text-[#000814] font-bold text-base px-10 py-3 rounded-xl shadow transition-colors">
              Search Fleet
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => { resetFilters(); }}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-colors border-2 ${!promoOnly && selectedBodyTypes.length === 0 && !policyFilters.track ? 'bg-[#ffc300] text-[#000814] border-[#ffc300]' : 'bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white'}`}
            >
              All Vehicles
            </button>
            <button 
              onClick={() => setPromoOnly(!promoOnly)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-colors border-2 flex items-center gap-2 ${promoOnly ? 'bg-[#ffc300] text-[#000814] border-[#ffc300]' : 'bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white'}`}
            >
              <span className="text-lg">🔥</span> Active Promotions
            </button>
            <button 
              onClick={() => togglePolicy('track')}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-colors border-2 flex items-center gap-2 ${policyFilters.track ? 'bg-[#ffc300] text-[#000814] border-[#ffc300]' : 'bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white'}`}
            >
              <span className="text-lg">🏁</span> Track Ready
            </button>
            <button 
              onClick={() => toggleBodyType('Super SUV')}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-colors border-2 ${selectedBodyTypes.includes('Super SUV') ? 'bg-[#ffc300] text-[#000814] border-[#ffc300]' : 'bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white'}`}
            >
              Super SUVs
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          
          {/* Left Sidebar Advanced Filters*/}
          <aside className="bg-[#000814] w-full lg:w-72 p-6 rounded-2xl flex flex-col gap-6 shadow-xl h-fit sticky top-24 border border-[#001d3d]">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <h3 className="font-bold text-white text-base uppercase tracking-wide">Filter Fleet</h3>
              <button onClick={resetFilters} className="text-[#ffc300] text-xs font-bold hover:underline">Reset All</button>
            </div>

            {/* Make & Model */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Make</label>
              <select value={make} onChange={e => setMake(e.target.value)} className="w-full bg-[#001d3d] border border-gray-700 text-gray-200 text-sm rounded-lg p-3 outline-none focus:border-[#ffc300] transition-colors">
                <option value="All">All Makes</option>
                <option value="Porsche">Porsche</option>
                <option value="Audi">Audi</option>
                <option value="Lotus">Lotus</option>
                <option value="Aston Martin">Aston Martin</option>
                <option value="Chevrolet">Chevrolet</option>
              </select>
            </div>

            {/* Body Type */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Body Type</label>
              <div className="grid grid-cols-2 gap-2">
                {bodyTypes.map(type => (
                  <button 
                    key={type}
                    onClick={() => toggleBodyType(type)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors border-2 ${selectedBodyTypes.includes(type) ? 'bg-[#ffc300] text-[#000814] border-[#ffc300]' : 'bg-[#001d3d] text-gray-300 border-gray-700 hover:border-[#ffc300]'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price Range (/Day)</label>
              <div className="flex items-center gap-3">
                <input type="number" placeholder="Min $" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full bg-[#001d3d] border border-gray-700 text-gray-200 text-sm rounded-lg p-3 outline-none focus:border-[#ffc300] transition-colors" />
                <span className="text-gray-500 font-bold">-</span>
                <input type="number" placeholder="Max $" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full bg-[#001d3d] border border-gray-700 text-gray-200 text-sm rounded-lg p-3 outline-none focus:border-[#ffc300] transition-colors" />
              </div>
            </div>

            {/* Year */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Year</label>
              <select value={year} onChange={e => setYear(e.target.value)} className="w-full bg-[#001d3d] border border-gray-700 text-gray-200 text-sm rounded-lg p-3 outline-none focus:border-[#ffc300] transition-colors">
                <option value="All">Any Year</option>
                <option value="2024">2024 or newer</option>
                <option value="2023">2023 or newer</option>
                <option value="2022">2022 or newer</option>
              </select>
            </div>

            {/* Colour Swatches */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Exterior Colour</label>
              <div className="flex flex-wrap gap-3">
                {colors.map(c => (
                  <button
                    key={c.id}
                    onClick={() => toggleColor(c.id)}
                    className={`w-8 h-8 rounded-full shadow-inner transition-transform border-2 ${selectedColors.includes(c.id) ? 'border-[#ffc300] scale-110 ring-2 ring-[#ffc300] ring-offset-2 ring-offset-[#000814]' : 'border-gray-500 hover:scale-110'}`}
                    style={{ backgroundColor: c.hex }}
                    title={c.id}
                  />
                ))}
              </div>
            </div>

            {/* Driving Policies */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Policies</label>
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#001d3d] transition-colors" onClick={() => togglePolicy('track')}>
                <input type="checkbox" readOnly checked={policyFilters.track} className="w-4 h-4 accent-[#ffc300]" /> 
                <span className="text-sm text-gray-200 flex items-center gap-2">{Icons.Track} Track Approved</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#001d3d] transition-colors" onClick={() => togglePolicy('city')}>
                <input type="checkbox" readOnly checked={policyFilters.city} className="w-4 h-4 accent-[#ffc300]" /> 
                <span className="text-sm text-gray-200 flex items-center gap-2">{Icons.City} City Allowed</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#001d3d] transition-colors" onClick={() => togglePolicy('pros')}>
                <input type="checkbox" readOnly checked={policyFilters.pros} className="w-4 h-4 accent-[#ffc300]" /> 
                <span className="text-sm text-gray-200 flex items-center gap-2">{Icons.Pros} Pros Only</span>
              </label>
            </div>

            {/* Dates */}
            <div className="flex flex-col gap-2.5 mt-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Availability Dates</label>
              <input type="date" className="w-full bg-[#001d3d] border border-gray-700 text-gray-200 text-sm rounded-lg p-3 outline-none focus:border-[#ffc300] transition-colors" />
              <input type="date" className="w-full bg-[#001d3d] border border-gray-700 text-gray-200 text-sm rounded-lg p-3 outline-none focus:border-[#ffc300] transition-colors" />
            </div>
          </aside>

          {/* Right Content Area */}
          <main className="flex-1 flex flex-col gap-6">
            <div className="flex justify-between items-center bg-white px-6 py-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-base font-bold text-[#001d3d]">Showing {filteredResults.length} Results</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 font-bold uppercase tracking-wide">Sort By:</span>
                <select 
                  value={sortOption} 
                  onChange={e => setSortOption(e.target.value)}
                  className="text-base border-none bg-transparent font-bold text-[#001d3d] outline-none cursor-pointer focus:ring-0"
                >
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Year: Newest</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {filteredResults.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl text-center border border-gray-200 flex flex-col items-center">
                  <span className="text-5xl mb-4">🔍</span>
                  <h3 className="text-xl font-bold text-[#001d3d] mb-2">No vehicles found</h3>
                  <p className="text-gray-500 font-medium mb-6 text-base max-w-md">We couldn't find any vehicles that match your strict filters. Try broadening your search or adjusting the price range.</p>
                  <button onClick={resetFilters} className="bg-[#ffc300] text-[#000814] font-bold px-8 py-3 rounded-xl hover:bg-[#ffd60a] transition-colors text-base shadow-sm">
                    Clear All Filters
                  </button>
                </div>
              ) : (
                filteredResults.map((car) => (
                  <a href="/case-studies/services-site/details" key={car.id} className="block group">
                    <div className="bg-white rounded-2xl flex flex-col md:flex-row p-5 gap-6 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300">
                      
                      <div className="relative w-full md:w-80 h-56 lg:h-64 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        <img src={car.img} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {car.isPromo && (
                          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider shadow-md">
                            Deal
                          </div>
                        )}
                      </div>
                      
                      {/* Card Content */}
                      <div className="flex-1 flex flex-col justify-between py-2 pr-2">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{car.year} • {car.make}</p>
                              <h3 className="text-2xl font-black text-[#001d3d] leading-tight">{car.model}</h3>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-black text-[#000814]">${car.price}</p>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">/ day</p>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-5 line-clamp-2 md:line-clamp-3">{car.desc}</p>
                          
                          <div className="flex flex-wrap gap-3">
                            {car.policies.map((policy, idx) => (
                              <div key={idx} className="flex items-center gap-2 bg-[#f4f4f5] border border-gray-200 px-3 py-1.5 rounded-lg" title={policy.label}>
                                <span className="text-gray-600">{policy.icon}</span>
                                <span className="text-xs font-bold text-[#003566] uppercase tracking-wide">{policy.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-6 gap-4 border-t border-gray-100 pt-5">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full border border-gray-300 shadow-sm" style={{ backgroundColor: colors.find(c => c.id === car.color)?.hex }}></div>
                            <span className="text-xs font-bold text-gray-500 capitalize">{car.color}</span>
                            <span className="text-gray-300 mx-2">•</span>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{car.bodyType}</span>
                          </div>
                          <button className="bg-[#001d3d] group-hover:bg-[#003566] text-[#ffd60a] px-8 py-3 rounded-xl text-sm font-bold transition-colors text-center w-full sm:w-auto shadow-md">
                            View Details
                          </button>
                        </div>
                      </div>

                    </div>
                  </a>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContentPage;