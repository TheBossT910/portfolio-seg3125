import React, { useState, useMemo } from 'react';
import { StoreLayout } from './StoreLayout';
import { productsData, useCart } from './StoreContext';

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
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Faceted Search Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6 sticky top-24 h-fit bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase border-b-2 border-[#C0392B] pb-2 text-[#1A1A1A]">Filters</h2>
          
          <div>
            <label className="font-bold text-sm text-[#1A1A1A] block mb-2">Search Part No. or Name</label>
            <input type="text" placeholder="e.g. BPD-4892..." className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] outline-none transition-all text-sm" value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} />
          </div>

          <div>
            <label className="font-bold text-sm text-[#1A1A1A] block mb-2">Category</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#C0392B] outline-none transition-all text-sm bg-white cursor-pointer" value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})}>
              {["All", "Brakes", "Fluids", "Electrical", "Suspension", "Accessories"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded">
            <input type="checkbox" className="w-5 h-5 accent-[#C0392B] rounded cursor-pointer" checked={filters.inStockOnly} onChange={e => setFilters({...filters, inStockOnly: e.target.checked})} />
            <span className="font-bold text-sm text-[#1A1A1A]">In Stock Only</span>
          </label>

          <button className="w-full py-2 border border-gray-300 text-gray-600 font-bold text-sm rounded hover:bg-gray-100 hover:text-black transition-colors" onClick={() => setFilters({search: "", category: "All", inStockOnly: false, minRating: 0})}>
            Reset Filters
          </button>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-end border-b border-gray-200 pb-2">
            <h2 className="text-2xl font-['Barlow_Condensed'] font-bold uppercase">Available Parts</h2>
            <span className="text-sm text-gray-500 font-semibold">{filteredProducts.length} Results</span>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
              <h3 className="text-xl font-bold text-gray-800 mb-2">No parts found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or searching for a different part number.</p>
              <button onClick={() => setFilters({search: "", category: "All", inStockOnly: false, minRating: 0})} className="text-[#C0392B] font-bold hover:underline">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-xl border border-gray-200 overflow-hidden flex flex-col transition-all group">
                  <div className="h-48 relative bg-white p-4 overflow-hidden">
                    {!product.inStock && <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center backdrop-blur-[2px]"><span className="bg-[#E74C3C] text-white text-sm font-bold px-4 py-2 rounded shadow uppercase tracking-widest">Out of Stock</span></div>}
                    <img src={product.image} alt={product.name} className="object-cover h-full w-full rounded group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5 flex flex-col flex-grow bg-gray-50 border-t border-gray-100">
                    <p className="text-xs font-['JetBrains_Mono'] text-gray-500 uppercase tracking-wider mb-1">{product.brand} • {product.partNumber}</p>
                    <h3 className="text-lg font-['Inter'] font-bold leading-tight mb-2 text-[#1A1A1A] line-clamp-2">{product.name}</h3>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div>
                        {product.originalPrice && <span className="text-xs text-gray-400 line-through block">${product.originalPrice}</span>}
                        <span className="text-xl font-['JetBrains_Mono'] font-extrabold text-[#C0392B]">${product.price}</span>
                      </div>
                      <button onClick={() => addToCart(product)} disabled={!product.inStock} className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#C0392B] disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-bold rounded shadow transition-all active:scale-95">
                        {product.inStock ? 'Add to Cart' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ShopPage = () => <StoreLayout><ShopContent /></StoreLayout>;