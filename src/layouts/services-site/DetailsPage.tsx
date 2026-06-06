import React, { useState } from 'react';
import Navbar from '../../components/services-site/Navbar';
import Footer from '../../components/services-site/Footer';

// Clean SVG Icons
const Icons = {
  Flag: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18M3 15h18l-2-4 2-4H3" /></svg>,
  Shield: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
};

const DetailsPage = () => {
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Image Gallery Array
  const galleryImages = [
    'https://www.topgear.com/sites/default/files/cars-car/carousel/2019/09/192853_thermal_orange_nsx_2020.jpg?w=1784&h=1004',
    'https://www.topgear.com/sites/default/files/cars-car/carousel/2019/09/192845_thermal_orange_nsx_2020.jpg?w=1784&h=1004',
    'https://www.topgear.com/sites/default/files/cars-car/carousel/2019/09/192846_thermal_orange_nsx_2020.jpg?w=1784&h=1004',
    'https://www.topgear.com/sites/default/files/cars-car/carousel/2019/09/192836_thermal_orange_nsx_2020.jpg?w=1784&h=1004',
  ];
  
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  // Colors
  const colors = [
    { id: 'black', hex: '#000814', name: 'Midnight Onyx' },
    { id: 'blue', hex: '#003566', name: 'Yale Metallic Blue' },
    { id: 'yellow', hex: '#ffc300', name: 'Microbus Gold' },
    { id: 'white', hex: '#ffffff', name: 'Performance White' },
  ];

  return (
    <div className="font-sans bg-[#f8fafc] text-[#000814] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col w-full pb-16">
        
        {/* Hero Image with Previews */}
        <div className="relative w-full h-[550px] bg-[#000814]">
          <img 
            src={activeImage} 
            alt="Lotus Emira" 
            className="w-full h-full object-cover opacity-85 transition-opacity duration-300 ease-in-out" 
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent"></div>
          
          <div className="absolute right-6 md:right-10 bottom-32 md:bottom-40 flex gap-3 z-20">
            {galleryImages.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-12 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  activeImage === img 
                    ? 'border-[#ffc300] scale-110 shadow-[0_0_15px_rgba(255,195,0,0.6)] z-10' 
                    : 'border-white/40 opacity-60 hover:opacity-100 hover:border-white'
                }`}
              >
                <img src={img} alt={`Gallery preview ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 w-full px-6 md:px-10 pb-12 max-w-6xl mx-auto right-0 flex flex-col md:flex-row justify-between items-end z-10">
            <div>
              <span className="bg-[#ffc300] text-[#000814] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Last Edition</span>
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight drop-shadow-lg">Honda NSX</h1>
              <p className="text-gray-300 font-medium mt-2 text-lg">Supercharged Hybrid V6 • SH-AWD</p>
            </div>
            <div className="mt-6 md:mt-0 text-right">
              <span className="block text-sm uppercase font-bold text-gray-400 tracking-wider">Base Rate</span>
              <span className="text-4xl md:text-5xl font-black text-[#ffd60a] drop-shadow-md">$250<span className="text-xl font-medium text-gray-300"> / day</span></span>
            </div>
          </div>
        </div>

        {/* Booking Bar */}
        <div className="max-w-6xl w-full mx-auto px-6 -mt-8 relative z-30">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center justify-between">
            
            {/* Color Selector */}
            <div className="flex flex-col gap-2 w-full lg:w-auto">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Configuration</span>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button 
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-10 h-10 rounded-full shadow-inner transition-transform duration-200 hover:scale-110 ${selectedColor === color.id ? 'ring-4 ring-[#ffc300] ring-offset-2 scale-110' : 'border border-gray-200'}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:block w-px h-12 bg-gray-200"></div>

            {/* Date Selection */}
            <div className="flex flex-col gap-2 w-full lg:flex-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Reservation Dates</span>
              <div className="flex gap-4">
                <input 
                  type="date" 
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl text-sm px-4 py-3 outline-none focus:border-[#003566] focus:bg-white transition-colors" 
                />
                <input 
                  type="date" 
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl text-sm px-4 py-3 outline-none focus:border-[#003566] focus:bg-white transition-colors" 
                />
              </div>
            </div>

            <div className="w-full lg:w-auto mt-4 lg:mt-0">
              <a href="/case-studies/services-site/cart" className="block w-full bg-[#001d3d] hover:bg-[#003566] text-[#ffd60a] text-center px-10 py-4 rounded-xl font-extrabold shadow-lg transition-transform hover:-translate-y-1 border border-[#003566]">
                Confirm & Book
              </a>
            </div>

          </div>
        </div>

        {/* Overview & Policies */}
        <div className="max-w-6xl w-full mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-[#001d3d] uppercase tracking-wide mb-6 flex items-center gap-4">
              Vehicle Overview
              <div className="h-1 flex-1 bg-gradient-to-r from-[#ffc300] to-transparent rounded-full"></div>
            </h2>
            <p className="text-[#000814] text-lg leading-relaxed font-medium text-justify">
              The Honda NSX is a supercar like no other. Where the first example introduced everyday ability to a class of car known mostly for histrionics, the model’s second coming in 2015 – a whole decade after its predecessor went out of production – built on this by making the whole thing hybrid-powered.
                <br /> <br />
              A deeply complex system, it combines a 3.5-litre twin-turbo V6 petrol engine with three electric motors, two of those operating on the front axle to make this a four-wheel-driven car. The gearbox is a nine-speed automatic.
                <br /> <br />
              This really is a different kind of supercar, one that doesn’t trade on badge kudos or nape-prickling noise. But nor will it be quite the everyday hero its forebear was thanks to its dismal practicality. This is a flight of fancy akin to a Lexus LFA, a fantastically expensive experiment that sits so at odds to a Jazz or Civic in the Honda showroom as to seem ethereal.
            </p>
          </div>

          {/* Policy Badges */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="bg-[#ffc300] text-[#001d3d] p-3 rounded-xl shadow-inner">
                {Icons.Flag}
              </div>
              <div>
                <span className="block font-bold text-[#001d3d]">Track Validated</span>
                <span className="text-xs text-gray-500 font-medium">Permitted on certified circuits</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="bg-[#ffc300] text-[#001d3d] p-3 rounded-xl shadow-inner">
                {Icons.Shield}
              </div>
              <div>
                <span className="block font-bold text-[#001d3d]">Premium Insurance</span>
                <span className="text-xs text-gray-500 font-medium">Comprehensive racing coverage</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="bg-[#001d3d] text-[#ffd60a] p-3 rounded-xl shadow-inner font-black text-lg w-12 h-12 flex items-center justify-center">
                21+
              </div>
              <div>
                <span className="block font-bold text-[#001d3d]">Age Requirement</span>
                <span className="text-xs text-gray-500 font-medium">Verified ID required at pickup</span>
              </div>
            </div>
          </div>

        </div>

        {/* Reviews */}
        <div className="max-w-6xl w-full mx-auto px-6 mt-16">
          <h2 className="text-2xl font-black text-[#001d3d] uppercase tracking-wide mb-8">Driver Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="text-[#ffc300] text-lg mb-4 tracking-widest">★★★★★</div>
              <p className="text-[#000814] font-medium leading-relaxed mb-6 flex-1">
                "Incredibly responsive on the track. The hydraulic steering feels phenomenal and intuitive. The telemetry data was perfect."
              </p>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="text-[#001d3d] font-bold text-sm">Carlos M.</span>
                <span className="text-xs text-gray-400 font-bold uppercase">Pro Racer</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="text-[#ffc300] text-lg mb-4 tracking-widest">★★★★★</div>
              <p className="text-[#000814] font-medium leading-relaxed mb-6 flex-1">
                "Took it up into the hills for the weekend. The V6 sounds absolutely incredible. Worth every penny for a weekend getaway."
              </p>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="text-[#001d3d] font-bold text-sm">Oscar T.</span>
                <span className="text-xs text-gray-400 font-bold uppercase">Weekend Renter</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="text-[#ffc300] text-lg mb-4 tracking-widest">★★★★☆</div>
              <p className="text-[#000814] font-medium leading-relaxed mb-6 flex-1">
                "Perfect balance of raw sports car feel and modern comfort. Highly recommend opting for the track insurance package."
              </p>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="text-[#001d3d] font-bold text-sm">Sarah K.</span>
                <span className="text-xs text-gray-400 font-bold uppercase">Verified Driver</span>
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