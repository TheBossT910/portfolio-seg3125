import React, { useState, useMemo } from 'react';
import { StoreLayout } from './StoreLayout';
import { productsData, useCart } from './StoreContext';

// 1. Logic lives here, inside the CartProvider scope
const ShopContent = () => {
  const { addToCart } = useCart();
  const [filters, setFilters] = useState({ search: "", category: "All", inStockOnly: false, minRating: 0 });

  const filteredProducts = useMemo(() => {
    return productsData.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(filters.search.toLowerCase()) || p.partNumber.toLowerCase().includes(filters.search.toLowerCase());
      const matchCat = filters.category === "All" || p.category === filters.category;
      const matchStock = !filters.inStockOnly || p.inStock;
      const matchRating = p.rating >= filters.minRating;
      return matchSearch && matchCat && matchStock && matchRating;
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Updated links for portfolio routing */}
      <div className="text-sm text-gray-500 mb-6 font-['Inter'] flex gap-2">
        <a href="/case-studies/ecommerce-site" className="hover:text-[#C0392B]">Home</a>
        <span>/</span>
        <span className="text-gray-900 font-medium">Shop</span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <h2 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase border-b-2 border-[#C0392B] pb-2 text-[#1A1A1A]">Filters</h2>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 accent-[#C0392B] rounded cursor-pointer" checked={filters.inStockOnly} onChange={e => setFilters({...filters, inStockOnly: e.target.checked})} />
            <span className="font-bold text-sm text-[#1A1A1A]">In Stock Only</span>
          </label>

          <div>
            <label className="font-bold text-sm text-[#1A1A1A] block mb-2">Search Part No. or Name</label>
            <input type="text" placeholder="e.g. BPD-4892..." className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] outline-none transition-all text-sm" value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} />
          </div>

          <div>
            <label className="font-bold text-sm text-[#1A1A1A] block mb-2">Category</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#C0392B] outline-none transition-all text-sm bg-white" value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})}>
              {["All", "Brakes", "Fluids", "Electrical", "Accessories"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="font-bold text-sm text-[#1A1A1A] block mb-2">Minimum Rating ({filters.minRating}★+)</label>
            <input type="range" min={0} max={5} value={filters.minRating} className="w-full accent-[#C0392B]" step={1} onChange={e => setFilters({...filters, minRating: parseInt(e.target.value)})} />
            <div className="w-full flex justify-between text-xs text-gray-500 font-medium mt-1">
              <span>Any</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5★</span>
            </div>
          </div>
          <button className="w-full py-2 border border-gray-300 text-gray-600 font-bold text-sm rounded hover:bg-gray-100 transition-colors" onClick={() => setFilters({search: "", category: "All", inStockOnly: false, minRating: 0})}>Clear All Filters</button>
        </aside>

        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-500 font-semibold border-b border-gray-200 pb-2">Showing {filteredProducts.length} results</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg border border-gray-200 overflow-hidden flex flex-col transition-all">
                <div className="h-48 relative bg-white p-4">
                  {!product.inStock && <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center backdrop-blur-sm"><span className="bg-[#E74C3C] text-white text-xs font-bold px-3 py-1 rounded shadow uppercase">Out of Stock</span></div>}
                  <img src={product.image} alt={product.name} className="object-cover h-full w-full rounded" />
                </div>
                <div className="p-4 flex flex-col flex-grow bg-gray-50 border-t border-gray-100">
                  <p className="text-[10px] font-['JetBrains_Mono'] text-gray-500 uppercase tracking-wider mb-1">{product.brand} • {product.partNumber}</p>
                  <h3 className="text-base font-['Inter'] font-semibold leading-snug mb-2 text-[#1A1A1A] line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-[#27AE60] font-semibold mb-4">✓ Fits: {product.compatibility.makes.join(", ")}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-['JetBrains_Mono'] font-bold text-[#1A1A1A]">${product.price}</span>
                    <button onClick={() => addToCart(product)} disabled={!product.inStock} className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#C0392B] disabled:bg-gray-300 disabled:text-gray-500 text-white text-sm font-bold rounded transition-colors">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Wrapper provides the Context for the content above
export const ShopPage = () => {
  return (
    <StoreLayout>
      <ShopContent />
    </StoreLayout>
  );
};