import React, { useState } from 'react';

const Navbar = () => (
  <div className="fixed top-4 w-full px-4 md:px-10 z-50 pointer-events-none">
    <nav className="pointer-events-auto max-w-7xl mx-auto bg-[#001d3d]/95 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-2xl rounded-2xl border border-[#003566]">
      <div className="text-[#ffd60a] font-extrabold text-2xl tracking-wider uppercase flex items-center gap-2">
        <span>Vroom</span><span className="text-white font-light">Vehicles</span>
      </div>
      <div className="hidden md:flex gap-8 text-white font-medium">
        <a href="/case-studies/services-site/" className="text-[#ffd60a] hover:text-[#ffc300] transition-colors border-b-2 border-[#ffd60a] pb-1">Home</a>
        <a href="/case-studies/services-site/content" className="hover:text-[#ffc300] transition-colors pb-1">Search Fleet</a>
        <a href="/case-studies/services-site/cart" className="hover:text-[#ffc300] transition-colors pb-1">Cart</a>
      </div>
    </nav>
  </div>
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

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      carName: 'Lotus Emira', 
      options: 'Track Pack',
      duration: '3 Days (Oct 10 - Oct 13)', 
      price: 870, 
      img: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?auto=format&fit=crop&w=600&q=80' 
    }
  ]);

  const [addedPackages, setAddedPackages] = useState<number[]>([]);

  const recommendedPackages = [
    { id: 1, name: 'Circuit Insurance', price: 300, desc: 'Zero-deductible track coverage.' },
    { id: 2, name: 'Sim Telemetry Data', price: 90, desc: 'Raw post-drive data export.' },
  ];

  const handleRemoveItem = (id: number) => setCartItems(cartItems.filter(item => item.id !== id));
  
  const handleTogglePackage = (pkgId: number) => {
    setAddedPackages(prev => prev.includes(pkgId) ? prev.filter(id => id !== pkgId) : [...prev, pkgId]);
  };

  const calculateTotal = () => {
    const base = cartItems.reduce((acc, item) => acc + item.price, 0);
    const addons = recommendedPackages.filter(p => addedPackages.includes(p.id)).reduce((acc, p) => acc + p.price, 0);
    const subtotal = base + addons;
    const tax = subtotal * 0.13;
    return { subtotal, addons, tax, total: subtotal + tax };
  };

  const totals = calculateTotal();

  return (
    <div className="font-sans bg-[#f4f4f5] text-[#000814] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-6 max-w-6xl w-full mx-auto flex flex-col gap-6 my-2">
        <h1 className="text-2xl font-bold text-[#001d3d] border-b border-gray-300 pb-3">Review & Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left Column */}
          <div className="flex-[2] flex flex-col gap-6 w-full">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500 mb-4">Your reservation cart is empty.</p>
                <a href="/promotions" className="bg-[#001d3d] text-white px-6 py-2 rounded-lg text-sm font-bold">Browse Fleet</a>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex flex-col sm:flex-row p-4 gap-4">
                  <div className="h-32 sm:w-48 overflow-hidden rounded-lg bg-gray-100 shrink-0">
                    <img src={item.img} alt={item.carName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-bold text-[#001d3d]">{item.carName}</h3>
                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 text-xs font-bold hover:underline">Remove</button>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">Config: <span className="font-bold text-[#000814]">{item.options}</span></p>
                      <p className="text-xs text-gray-500">Dates: {item.duration}</p>
                    </div>
                    <div className="text-right mt-2">
                      <span className="text-xl font-extrabold text-[#001d3d]">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Tight Add-ons Grid */}
            <div className="mt-2">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Recommended Add-ons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedPackages.map((pkg) => {
                  const isAdded = addedPackages.includes(pkg.id);
                  return (
                    <div key={pkg.id} className={`bg-white rounded-lg p-4 border transition-colors flex flex-col justify-between ${isAdded ? 'border-[#003566] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-bold text-[#001d3d]">{pkg.name}</h4>
                          <span className="text-xs font-bold text-[#003566]">${pkg.price}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mb-3">{pkg.desc}</p>
                      </div>
                      <button 
                        onClick={() => handleTogglePackage(pkg.id)}
                        className={`py-1.5 rounded-md text-xs font-bold transition-colors border w-full ${isAdded ? 'bg-[#003566] text-white border-[#003566]' : 'bg-transparent text-[#001d3d] border-gray-300 hover:bg-gray-50'}`}
                      >
                        {isAdded ? 'Remove' : 'Add to Reservation'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (Precise checkout box) */}
          <div className="flex-[1] bg-white rounded-xl p-6 shadow-sm border border-gray-200 w-full lg:sticky lg:top-24">
            <h3 className="text-lg font-bold text-[#001d3d] border-b border-gray-200 pb-3 mb-4">Summary</h3>
            
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Vehicle Subtotal</span> 
                <span className="font-medium text-[#000814]">${(totals.subtotal - totals.addons).toFixed(2)}</span>
              </div>
              {totals.addons > 0 && (
                <div className="flex justify-between text-[#003566]">
                  <span>Add-ons</span> 
                  <span className="font-medium">${totals.addons.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span>Taxes (13%)</span> 
                <span className="font-medium text-[#000814]">${totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-base font-bold text-[#001d3d]">Total</span> 
                <span className="text-xl font-extrabold text-[#001d3d]">${totals.total.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="bg-[#ffc300] hover:bg-[#ffd60a] text-[#000814] rounded-lg py-3 text-sm font-bold transition-colors w-full disabled:opacity-50" disabled={cartItems.length === 0}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;