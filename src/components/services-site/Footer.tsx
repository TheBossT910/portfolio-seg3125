export default function Footer() {

    return (
      <footer className="bg-[#000814] text-white p-10 md:p-12 mt-auto border-t-8 border-[#ffc300]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-[#ffd60a] font-bold text-2xl mb-2 uppercase tracking-wider">Vroom Vehicles</h3>
            <p className="text-[#ffd60a] font-medium text-sm mb-4">Premium Sports Car Rental Service</p>
            <div className="text-sm text-gray-300 space-y-2">
              <a href="https://maps.app.goo.gl/n4FxyjgosEvuFSRs8"className="flex items-center gap-2 underline">800 King Edward Ave, Ottawa, ON</a>
              <p className="flex items-center gap-2">+1-800-VEHICLE (-123-456)</p>
              <a href="mailto:someone@example.com" className="flex items-center gap-2 underline">contact@vroomvehicles.ca</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-xl">Project Details</h4>
            <p className="text-sm text-gray-400 mb-1">SEG 3125: Analysis and Design of UIs</p>
            <p className="text-sm text-gray-400 mb-1">Professor: Caroline Barrière</p>
            <p className="text-sm text-gray-400 mb-1">Designer: Taha Rashid</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-xl">Quick Links</h4>
            <ul className="text-sm text-gray-400 space-y-3">
              <li><a href="#" className="hover:text-[#ffc300] transition-colors flex items-center gap-2"><span>🏷️</span> Weekend Deals</a></li>
              <li><a href="#" className="hover:text-[#ffc300] transition-colors flex items-center gap-2"><span>🏎️</span> Track Inventory</a></li>
            </ul>
          </div>
        </div>
      </footer>
    );
}