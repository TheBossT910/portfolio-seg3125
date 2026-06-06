export default function Navbar() {

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#001d3d]/95 backdrop-blur-md px-6 md:px-10 py-4 flex justify-between items-center shadow-lg border-b-2 border-[#ffd60a]">
          <a href="/case-studies/services-site/" className="text-[#ffd60a] font-extrabold text-2xl tracking-wider uppercase flex items-center gap-2 cursor-pointer">
            <span>Vroom</span><span className="text-white font-light">Vehicles</span>
          </a>
          <div className="hidden md:flex gap-8 text-white font-medium text-sm">
            <a href="/case-studies/services-site/" className="hover:text-[#ffc300] transition-colors pb-1">Home</a>
            <a href="/case-studies/services-site/content" className="hover:text-[#ffc300] transition-colors pb-1">Search Fleet</a>
            <a href="/case-studies/services-site/cart" className="hover:text-[#ffc300] transition-colors pb-1">Cart</a>
          </div>
        </nav>
      );
}