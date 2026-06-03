import React, { useState } from 'react';

const Navbar = () => (
  <nav className="bg-[#001d3d] px-6 md:px-10 py-4 flex justify-between items-center w-full shadow-lg z-50 border-b-2 border-[#ffd60a] sticky top-0">
    <div className="text-[#ffd60a] font-extrabold text-2xl tracking-wider uppercase flex items-center gap-2">
      <span>Vroom</span><span className="text-white font-light">Vehicles</span>
    </div>
    <div className="hidden md:flex gap-8 text-white font-medium">
      <a href="/" className="hover:text-[#ffc300] transition-colors pb-1">Home</a>
      <a href="/promotions" className="hover:text-[#ffc300] transition-colors pb-1">Promotions</a>
      <a href="/cart" className="text-[#ffd60a] hover:text-[#ffc300] transition-colors border-b-2 border-[#ffd60a] pb-1">Cart</a>
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

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      carName: 'Porsche 911 GT3', 
      options: 'Carbon Fiber Track Package',
      duration: 'Weekend Allocation (3 Days)', 
      price: 1350,
      img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=600&q=80' 
    }
  ]);

  const [addedPackages, setAddedPackages] = useState<number[]>([]);

  const recommendedPackages = [
    { id: 1, packageName: 'Full Circuit Track Insurance', price: 300, desc: 'Zero-deductible coverage while driving on certified racing circuits.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { id: 2, packageName: 'Sim-to-Street Telemetry Export', price: 90, desc: 'Post-drive raw data export to analyze lap metrics in your sim rig.', img: 'https://images.unsplash.com/photo-1549419616-09a2b53c6e9d?auto=format&fit=crop&w=600&q=80' },
  ];

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleTogglePackage = (pkg: any) => {
    if (addedPackages.includes(pkg.id)) {
      setAddedPackages(addedPackages.filter(id => id !== pkg.id));
    } else {
      setAddedPackages([...addedPackages, pkg.id]);
    }
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

      <main className="flex-1 p-6 md:p-10 max-w-6xl w-full mx-auto flex flex-col gap-10 my-4">
        <h1 className="text-3xl font-extrabold text-[#001d3d] border-b-2 border-gray-200 pb-4">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Left Column: Cart Items & Add-ons */}
          <div className="flex-[2] flex flex-col gap-6 w-full">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-md">
                <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
                <a href="/promotions" className="text-[#003566] font-bold hover:underline">Browse Fleet</a>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 flex flex-col sm:flex-row">
                  <div className="h-48 sm:h-auto sm:w-64 overflow-hidden bg-gray-100 shrink-0 relative">
                    <img src={item.img} alt={item.carName} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-[#001d3d]">{item.carName}</h3>
                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 text-sm font-bold hover:underline">Remove</button>
                      </div>
                      <p className="text-sm font-bold text-[#003566] bg-blue-50 w-fit px-2 py-1 rounded mb-2">Option: {item.options}</p>
                      <p className="text-sm text-gray-600 font-medium">Duration: {item.duration}</p>
                    </div>
                    <div className="mt-4 text-right">
                      <span className="text-sm text-gray-500 mr-2">Rate:</span>
                      <span className="text-xl font-extrabold text-[#000814]">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Recommended Packages with specific Telemetry tie-in */}
            <div className="mt-4">
              <h3 className="text-xl font-bold text-[#001d3d] mb-4">Recommended Add-ons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedPackages.map((pkg) => {
                  const isAdded = addedPackages.includes(pkg.id);
                  return (
                    <div key={pkg.id} className={`bg-white border-2 rounded-xl overflow-hidden shadow-sm transition-all ${isAdded ? 'border-[#003566] shadow-md' : 'border-gray-200 hover:border-[#ffd60a]'}`}>
                      <div className="p-5 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-base font-bold text-[#001d3d]">{pkg.packageName}</h4>
                          <span className="bg-[#ffd60a] text-[#000814] font-bold px-2 py-1 rounded text-xs shrink-0">${pkg.price}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 flex-1">{pkg.desc}</p>
                        <button 
                          onClick={() => handleTogglePackage(pkg)}
                          className={`font-bold py-2 rounded-lg text-sm transition-colors w-full ${isAdded ? 'bg-[#003566] text-white' : 'bg-[#f4f4f5] hover:bg-[#001d3d] hover:text-white border border-gray-300 text-[#001d3d]'}`}
                        >
                          {isAdded ? '✓ Added' : '+ Add to Reservation'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Interactive Calculation */}
          <div className="flex-[1] bg-white rounded-2xl p-6 shadow-xl border-t-8 border-[#003566] w-full lg:sticky lg:top-28">
            <h3 className="text-xl font-bold text-[#000814] border-b border-gray-200 pb-4 mb-4">Reservation Summary</h3>
            
            <div className="space-y-4 text-sm font-medium text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Vehicle Base Subtotal</span> 
                <span className="text-[#000814]">${(totals.subtotal - totals.addons).toFixed(2)}</span>
              </div>
              {totals.addons > 0 && (
                <div className="flex justify-between text-[#003566]">
                  <span>Add-ons & Insurance</span> 
                  <span>${totals.addons.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-gray-200 pb-4">
                <span>Taxes & Fees (13%)</span> 
                <span className="text-[#000814]">${totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-[#001d3d]">Total</span> 
                <span className="text-2xl font-extrabold text-[#000814]">${totals.total.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="bg-[#ffd60a] hover:bg-[#ffc300] text-[#000814] rounded-xl py-4 text-center text-lg font-extrabold transition-all shadow-md w-full uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed" disabled={cartItems.length === 0}>
              Complete Checkout
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">Safe and secure payment powered by Vroom Vehicles.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;