import React, { useState } from 'react';
import Navbar from '../../components/services-site/Navbar';
import Footer from '../../components/services-site/Footer';

// SVG Icons for Policies (Imported from ContentPage logic)
const Icons = {
  Track: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18M3 15h18l-2-4 2-4H3" /></svg>,
  City: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v2H9V7zm0 4h1v2H9v-2zm0 4h1v2H9v-2zm4-8h1v2h-1V7zm0 4h1v2h-1v-2zm0 4h1v2h-1v-2z" /></svg>,
  Pros: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M19 3v4M5 11h14M9 11v4a3 3 0 006 0v-4M7 21h10M12 15v6" /></svg>,
  Age: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
};

const CartPage = () => {
  // Expanded state to match ContentPage data richness
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      make: 'Honda',
      model: 'NSX',
      year: 2020,
      bodyType: 'Supercar',
      color: 'yellow',
      dailyRate: 250,
      days: 3,
      duration: 'Oct 10 - Oct 13', 
      isPromo: true,
      desc: 'The hybrid supercar that bends physics and delivers pinpoint precision on both the track and the road.',
      img: 'https://www.topgear.com/sites/default/files/cars-car/carousel/2019/09/192853_thermal_orange_nsx_2020.jpg?w=1784&h=1004',
      policies: [{ icon: Icons.Track, label: 'Track Approved' }, { icon: Icons.City, label: 'City Allowed' }]
    }
  ]);

  const [addedPackages, setAddedPackages] = useState<number[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const recommendedPackages = [
    { id: 1, name: 'Circuit Insurance', price: 300, desc: 'Zero-deductible track coverage. Highly recommended for Supercars.' },
    { id: 2, name: 'Sim Telemetry Data', price: 90, desc: 'Raw post-drive data export for lap analysis.' },
  ];

  const getColorHex = (colorName: string) => {
    const colors: Record<string, string> = {
      yellow: '#ffc300', black: '#000814', white: '#ffffff',
      blue: '#003566', red: '#ef4444', green: '#22c55e'
    };
    return colors[colorName.toLowerCase()] || '#cccccc';
  };

  const handleRemoveItem = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const handleTogglePackage = (pkgId: number) => {
    setAddedPackages(prev => prev.includes(pkgId) ? prev.filter(id => id !== pkgId) : [...prev, pkgId]);
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'FAST10') setDiscountApplied(true);
  };

  const calculateTotal = () => {
    const base = cartItems.reduce((acc, item) => acc + (item.dailyRate * item.days), 0);
    const addons = recommendedPackages.filter(p => addedPackages.includes(p.id)).reduce((acc, p) => acc + p.price, 0);
    const discount = discountApplied ? base * 0.10 : 0;
    const subtotal = (base - discount) + addons;
    const tax = subtotal * 0.13;
    return { base, addons, discount, subtotal, tax, total: subtotal + tax };
  };

  const totals = calculateTotal();

  return (
    <div className="font-sans bg-[#f4f4f5] text-[#000814] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto flex flex-col gap-6 my-2">
        
        <div className="flex justify-between items-end border-b border-gray-300 pb-3">
          <div>
            <h1 className="text-2xl font-bold text-[#001d3d]">Review Reservation</h1>
            <p className="text-sm text-gray-500 mt-1">Please review your vehicle details and selected add-ons before checkout.</p>
          </div>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-wide hidden sm:block">Step 1 of 3</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Cart Items & Add-ons */}
          <div className="flex-[2] flex flex-col gap-8 w-full">
            
            {/* Vehicle Fleet Details */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Reserved Vehicles</h3>
              
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-gray-200 flex flex-col items-center">
                  <p className="text-gray-500 mb-6">Your reservation cart is currently empty.</p>
                  <a href="/case-studies/services-site/content" className="bg-[#001d3d] hover:bg-[#003566] transition-colors text-white px-8 py-3 rounded-lg text-sm font-bold">Browse the Fleet</a>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl flex flex-col sm:flex-row p-4 gap-6 shadow-sm border border-gray-200 relative overflow-hidden">
                    
                    {/* Image Container with Promo Badge */}
                    <div className="relative w-full sm:w-64 h-48 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      <img src={item.img} alt={`${item.make} ${item.model}`} className="w-full h-full object-cover" />
                      {item.isPromo && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider shadow-sm">
                          Active Deal
                        </div>
                      )}
                    </div>
                    
                    {/* Detailed Content Wrapper */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{item.year} • {item.make}</p>
                            <h3 className="text-xl font-bold text-[#001d3d] leading-tight">{item.model}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-extrabold text-[#000814]">${item.dailyRate}</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">/ day</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-xs leading-relaxed mt-2 mb-3 line-clamp-2">{item.desc}</p>
                        
                        {/* Policies (Mirrored from ContentPage) */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.policies.map((policy, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 bg-[#f4f4f5] border border-gray-200 px-2 py-1 rounded-md">
                              <span className="text-gray-600">{policy.icon}</span>
                              <span className="text-[10px] font-bold text-[#003566] uppercase">{policy.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-t border-gray-100 pt-4 mt-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Reservation Dates:</p>
                          <p className="text-sm font-bold text-[#001d3d] bg-blue-50 px-3 py-1 rounded-md inline-block border border-blue-100">
                            {item.duration} <span className="text-blue-600 font-normal ml-1">({item.days} Days)</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full border border-gray-300 shadow-sm" style={{ backgroundColor: getColorHex(item.color) }}></div>
                            <span className="text-[10px] font-bold text-gray-400 capitalize">{item.color}</span>
                            <span className="text-gray-300 mx-1">•</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">{item.bodyType}</span>
                          </div>
                          <button onClick={(e) => handleRemoveItem(e, item.id)} className="text-red-500 hover:text-red-700 text-xs font-bold underline transition-colors">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add-ons Grid */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Recommended Add-ons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedPackages.map((pkg) => {
                  const isAdded = addedPackages.includes(pkg.id);
                  return (
                    <div key={pkg.id} className={`bg-white rounded-lg p-5 border transition-all duration-200 flex flex-col justify-between ${isAdded ? 'border-[#003566] bg-blue-50/50 shadow-md transform scale-[1.01]' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-bold text-[#001d3d]">{pkg.name}</h4>
                          <span className="text-sm font-black text-[#003566]">${pkg.price}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4 leading-relaxed">{pkg.desc}</p>
                      </div>
                      <button 
                        onClick={() => handleTogglePackage(pkg.id)}
                        className={`py-2 rounded-md text-xs font-bold transition-colors border w-full ${isAdded ? 'bg-[#003566] text-white border-[#003566]' : 'bg-[#ffc300] hover:bg-[#ffd60a] text-[#001d3d] border-[#ffc300]'}`}
                      >
                        {isAdded ? 'Remove Add-on' : 'Add to Reservation'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="flex-[1] bg-white rounded-xl p-6 shadow-md border border-gray-200 w-full lg:sticky lg:top-24">
            <h3 className="text-lg font-bold text-[#001d3d] border-b border-gray-200 pb-3 mb-4">Booking Summary</h3>
            
            {/* Promo Code Input */}
            <div className="flex gap-2 mb-6">
              <input 
                type="text" 
                placeholder="Promo Code (Try FAST10)" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={discountApplied}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ffc300] disabled:bg-gray-100 disabled:text-gray-400 uppercase"
              />
              <button 
                onClick={handleApplyPromo}
                disabled={discountApplied || !promoCode}
                className="bg-[#001d3d] text-white px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-50 transition-colors"
              >
                Apply
              </button>
            </div>

            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Vehicle Base Rate</span> 
                <span className="font-medium text-[#000814]">${totals.base.toFixed(2)}</span>
              </div>
              
              {discountApplied && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Promo Discount (10%)</span> 
                  <span>-${totals.discount.toFixed(2)}</span>
                </div>
              )}

              {totals.addons > 0 && (
                <div className="flex justify-between text-[#003566]">
                  <span>Selected Add-ons</span> 
                  <span className="font-medium">${totals.addons.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between border-t border-dashed border-gray-300 pt-3">
                <span>Subtotal</span> 
                <span className="font-medium text-[#000814]">${totals.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span>Estimated Taxes (13%)</span> 
                <span className="font-medium text-[#000814]">${totals.tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="text-base font-bold text-[#001d3d] block">Total Due</span>
                  <span className="text-[10px] text-gray-400">Includes all fees & taxes</span>
                </div>
                <span className="text-2xl font-black text-[#001d3d]">${totals.total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              className="bg-[#ffc300] hover:bg-[#ffd60a] text-[#000814] rounded-lg py-3.5 text-sm font-bold transition-all w-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={cartItems.length === 0}
            >
              Secure Checkout
            </button>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <span>SSL Encrypted Payment</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;