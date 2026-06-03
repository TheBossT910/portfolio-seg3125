import React from 'react';

const Navbar = () => (
  <nav className="bg-[#001d3d] px-6 md:px-10 py-4 flex justify-between items-center w-full shadow-lg z-50 border-b-2 border-[#ffd60a] sticky top-0">
    <div className="text-[#ffd60a] font-extrabold text-2xl tracking-wider uppercase flex items-center gap-2">
      <span>Vroom</span><span className="text-white font-light">Vehicles</span>
    </div>
    <div className="hidden md:flex gap-8 text-white font-medium">
      <a href="/" className="hover:text-[#ffc300] transition-colors pb-1">Home</a>
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
        <div className="text-sm text-gray-300 space-y-1 mb-4">
          <p>📍 800 King Edward Ave, Ottawa, ON</p>
          <p>📞 1-800-555-VROOM</p>
        </div>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4 text-lg">Project Details</h4>
        <p className="text-sm text-gray-400 mb-1">SEG 3125 | Prof: Caroline Barrière</p>
        <p className="text-[#ffd60a] font-bold mt-2">Designed by Taha Rashid</p>
      </div>
    </div>
  </footer>
);

const DetailsPage = () => {
  return (
    <div className="font-sans bg-[#f4f4f5] text-[#000814] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col gap-8 p-6 md:p-10 max-w-6xl mx-auto w-full my-4">
        
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#001d3d]">Porsche 911 GT3</h1>
            <p className="text-gray-500 font-medium mt-1">992 Generation • 4.0L Naturally Aspirated Flat-Six</p>
          </div>
          <div className="bg-[#ffd60a] px-6 py-3 rounded-xl shadow-md text-center">
            <span className="block text-xs uppercase font-bold text-[#003566]">Base Rate</span>
            <span className="text-2xl font-extrabold text-[#000814]">$400 <span className="text-sm font-medium">/ day</span></span>
          </div>
        </div>

        {/* Main Card: Image & Car Options (Carlos' requirement for trims/packages) */}
        <div className="bg-white rounded-2xl p-6 flex flex-col lg:flex-row gap-8 shadow-lg border border-gray-200">
          <div className="flex-[3] rounded-xl overflow-hidden h-[400px] bg-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80" 
              alt="Porsche 911 GT3" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="flex-[2] flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#001d3d] border-b border-gray-200 pb-2">Select Car Options</h3>
            
            {/* Packages/Trims */}
            <div className="flex flex-col gap-3">
              <label className="flex justify-between items-center p-4 border-2 border-[#ffd60a] rounded-xl cursor-pointer bg-yellow-50">
                <div className="flex items-center gap-3">
                  <input type="radio" name="trim" defaultChecked className="w-5 h-5 accent-[#003566]" />
                  <div>
                    <span className="block font-bold text-[#000814]">Carbon Fiber Track Package</span>
                    <span className="text-xs text-gray-500">Includes carbon bucket seats & roll cage</span>
                  </div>
                </div>
                <span className="font-bold text-[#003566]">+$50/day</span>
              </label>

              <label className="flex justify-between items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#003566] transition-colors">
                <div className="flex items-center gap-3">
                  <input type="radio" name="trim" className="w-5 h-5 accent-[#003566]" />
                  <div>
                    <span className="block font-bold text-[#000814]">Touring Package</span>
                    <span className="text-xs text-gray-500">Wingless, comfort seats, manual trans</span>
                  </div>
                </div>
                <span className="font-bold text-[#003566]">Included</span>
              </label>
            </div>

            <button className="mt-auto bg-[#001d3d] hover:bg-[#003566] text-white py-4 rounded-xl text-lg font-bold shadow-md transition-colors w-full">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Carlos' Policy Icons & Description Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Policy Rules */}
          <div className="md:col-span-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-200 h-fit">
            <h3 className="text-lg font-bold text-[#001d3d] mb-4">Racing & Usage Policy</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ffc300] flex items-center justify-center text-2xl shadow-sm">🏁</div>
                <div>
                  <span className="block font-bold text-[#000814]">Track Approved</span>
                  <span className="text-xs text-gray-500">Valid on certified circuits only.</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#003566] flex items-center justify-center text-2xl shadow-sm">🏆</div>
                <div>
                  <span className="block font-bold text-white bg-[#003566] px-2 rounded w-fit">Pros Only</span>
                  <span className="text-xs text-gray-500">Requires proof of racing license.</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-black text-[#001d3d] border-2 border-[#001d3d] shadow-sm">21+</div>
                <div>
                  <span className="block font-bold text-[#000814]">Age Restriction</span>
                  <span className="text-xs text-gray-500">Driver must be 21 or older.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Reviews */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[#001d3d]">
              <h2 className="text-xl font-bold text-[#001d3d] mb-3">Vehicle Overview</h2>
              <p className="text-[#000814] leading-relaxed">
                The GT3 is the purest expression of Porsche's motorsport division. With a 9,000 RPM redline and unparalleled steering feedback, this car is designed to set lap times at Calabogie Motorsports Park while still being able to drive you home. Selecting the Carbon Fiber Track package fulfills all harness and safety requirements for advanced track days.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="bg-white border-l-4 border-[#ffd60a] rounded-xl p-6 flex-1 shadow-md">
                <strong className="text-[#003566] block mb-1">Incredible Track Weapon</strong>
                <div className="flex text-[#ffc300] text-sm mb-2">★★★★★</div>
                <p className="text-sm italic text-gray-600">"Rented this with the Carbon Package for a weekend at the track. The grip is phenomenal." - Carlos M.</p>
              </div>
              <div className="bg-white border-l-4 border-[#ffd60a] rounded-xl p-6 flex-1 shadow-md">
                <strong className="text-[#003566] block mb-1">Dream Weekend</strong>
                <div className="flex text-[#ffc300] text-sm mb-2">★★★★★</div>
                <p className="text-sm italic text-gray-600">"Split the cost with a friend for my birthday. Best weekend of my life driving around the city." - Oscar T.</p>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default DetailsPage;