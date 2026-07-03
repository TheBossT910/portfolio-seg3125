import React, { useState, useMemo, useEffect } from 'react';
import { StoreLayout } from './StoreLayout';
import { productsData, useCart } from './StoreContext';

const ShopContent = () => {
  // 1. Extract globalVehicle from the context
  const cartContext = useCart() || { addToCart: () => {}, globalVehicle: "Select Vehicle" };
  const { addToCart, globalVehicle } = cartContext;

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({ 
    search: "", 
    category: "All", 
    brand: "All",
    inStockOnly: false, 
    dealsOnly: false,
    minRating: 0,
    minPrice: 0,
    maxPrice: 2000,
    sort: "featured"
  });

  // read URL on mount to check if we arrived via a deals link
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('deals') === 'true') {
        setFilters(prev => ({ ...prev, dealsOnly: true }));
      }
    }
  }, []);

  const brands = ["All", ...Array.from(new Set(productsData.map(p => p.brand)))];

  const filteredProducts = useMemo(() => {
    let result = productsData.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(filters.search.toLowerCase()) || p.partNumber.toLowerCase().includes(filters.search.toLowerCase());
      const matchCat = filters.category === "All" || p.category === filters.category;
      const matchBrand = filters.brand === "All" || p.brand === filters.brand;
      const matchStock = !filters.inStockOnly || p.inStock;
      const matchRating = p.rating >= filters.minRating;
      const matchPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      const matchDeals = !filters.dealsOnly || p.originalPrice !== null; // Filter logic for deals
      
      return matchSearch && matchCat && matchBrand && matchStock && matchRating && matchPrice && matchDeals;
    });

    if (filters.sort === 'price-low') result.sort((a, b) => a.price - b.price);
    if (filters.sort === 'price-high') result.sort((a, b) => b.price - a.price);
    if (filters.sort === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [filters]);

  const activeFilterCount = (filters.category !== "All" ? 1 : 0) + 
                            (filters.brand !== "All" ? 1 : 0) + 
                            (filters.inStockOnly ? 1 : 0) + 
                            (filters.dealsOnly ? 1 : 0) + 
                            (filters.minRating > 0 ? 1 : 0) +
                            (filters.search !== "" ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <div className="mb-6">
        <div className="text-xs text-gray-500 mb-4 font-['Inter'] flex items-center gap-2 uppercase tracking-wider font-bold">
          <a href="/case-studies/ecommerce-site" className="hover:text-[#C0392B] transition-colors">Home</a>
          <span>/</span>
          <span className="text-gray-900">Store Catalog</span>
        </div>
        
        {/* 2. Dynamic Banner based on Vehicle Selection */}
        {globalVehicle !== "Select Vehicle" && globalVehicle ? (
          <div className="bg-[#E8F8F5] border border-[#27AE60] p-3 rounded flex items-center gap-3">
            <span className="text-[#27AE60] text-xl">✓</span>
            <p className="text-sm text-[#1A1A1A] font-bold">Showing parts that fit your <span className="bg-white px-2 py-0.5 border border-gray-200 rounded mx-1 shadow-sm">{globalVehicle}</span></p>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 p-3 rounded flex items-center gap-3">
            <span className="text-blue-500 text-xl">ℹ️</span>
            <p className="text-sm text-[#1A1A1A] font-bold">Showing universal parts. <span className="underline decoration-blue-500 underline-offset-2">Select your vehicle</span> in the top menu for guaranteed fitment.</p>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8 sticky top-24 h-fit bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-end border-b-2 border-[#C0392B] pb-2">
            <h2 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase text-[#1A1A1A]">Filters</h2>
            {activeFilterCount > 0 && <span className="text-xs bg-[#C0392B] text-white px-2 py-1 rounded font-bold">{activeFilterCount} Active</span>}
          </div>
          
          <div>
            <label className="font-bold text-sm text-[#1A1A1A] block mb-2">Search Part No. or Name</label>
            <input type="text" placeholder="e.g. BPD-4892..." className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] outline-none transition-all text-sm shadow-inner" value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} />
          </div>

          <div>
            <label className="font-bold text-sm text-[#1A1A1A] block mb-2">Category</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#C0392B] outline-none transition-all text-sm bg-white cursor-pointer shadow-sm" value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})}>
              {["All", "Brakes", "Fluids", "Electrical", "Suspension", "Accessories"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="font-bold text-sm text-[#1A1A1A] block mb-2">Brand</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#C0392B] outline-none transition-all text-sm bg-white cursor-pointer shadow-sm" value={filters.brand} onChange={e => setFilters({...filters, brand: e.target.value})}>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div>
            <label className="font-bold text-sm text-[#1A1A1A] block mb-2">Price Range</label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">$</span>
                <input type="number" min="0" className="w-full pl-6 pr-2 py-2 border border-gray-300 rounded focus:border-[#C0392B] outline-none text-sm shadow-inner" value={filters.minPrice} onChange={e => setFilters({...filters, minPrice: Number(e.target.value)})} />
              </div>
              <span className="text-gray-400 font-bold">-</span>
              <div className="relative flex-1">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">$</span>
                <input type="number" min="0" className="w-full pl-6 pr-2 py-2 border border-gray-300 rounded focus:border-[#C0392B] outline-none text-sm shadow-inner" value={filters.maxPrice} onChange={e => setFilters({...filters, maxPrice: Number(e.target.value)})} />
              </div>
            </div>
          </div>

          <div>
            <label className="font-bold text-sm text-[#1A1A1A] block mb-2">Minimum Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button 
                  key={star} 
                  onClick={() => setFilters({...filters, minRating: star === filters.minRating ? 0 : star})}
                  className={`text-2xl transition-colors ${filters.minRating >= star ? 'text-[#E67E22]' : 'text-gray-200 hover:text-gray-300'}`}
                >
                  ★
                </button>
              ))}
              <span className="text-xs text-gray-500 ml-2 font-bold">{filters.minRating > 0 ? `${filters.minRating} & Up` : 'Any'}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-3 cursor-pointer p-3 bg-[#FFF5F5] border border-red-200 hover:bg-red-50 rounded transition-colors">
              <input type="checkbox" className="w-5 h-5 accent-[#C0392B] rounded cursor-pointer" checked={filters.dealsOnly} onChange={e => setFilters({...filters, dealsOnly: e.target.checked})} />
              <span className="font-bold text-sm text-[#C0392B] uppercase tracking-wide">🔥 Deals Only</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded transition-colors">
              <input type="checkbox" className="w-5 h-5 accent-[#C0392B] rounded cursor-pointer" checked={filters.inStockOnly} onChange={e => setFilters({...filters, inStockOnly: e.target.checked})} />
              <span className="font-bold text-sm text-[#1A1A1A]">In Store Only</span>
            </label>
          </div>

          <button className="w-full py-3 border-2 border-gray-300 text-gray-600 font-bold text-sm rounded hover:bg-gray-100 hover:text-black transition-colors uppercase tracking-wide" onClick={() => setFilters({search: "", category: "All", brand: "All", inStockOnly: false, dealsOnly: false, minRating: 0, minPrice: 0, maxPrice: 2000, sort: "featured"})}>
            Reset All Filters
          </button>
        </aside>

        <div className="flex-1 flex flex-col">
          
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-3xl font-['Barlow_Condensed'] font-extrabold uppercase text-[#1A1A1A]">Available Parts</h2>
              <span className="text-sm text-gray-500 font-semibold">{filteredProducts.length} items match your search</span>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <select className="px-3 py-2 border border-gray-300 rounded text-sm font-bold text-gray-700 outline-none bg-white shadow-sm flex-1 sm:flex-none" value={filters.sort} onChange={e => setFilters({...filters, sort: e.target.value})}>
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              
              <div className="flex bg-gray-100 p-1 rounded border border-gray-200">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow text-[#C0392B]' : 'text-gray-500 hover:text-black'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                </button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow text-[#C0392B]' : 'text-gray-500 hover:text-black'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                </button>
              </div>
            </div>
          </div>
          
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.category !== "All" && <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs font-bold text-gray-700 flex items-center gap-1 cursor-pointer hover:bg-gray-200" onClick={() => setFilters({...filters, category: "All"})}>Category: {filters.category} ✕</span>}
              {filters.brand !== "All" && <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs font-bold text-gray-700 flex items-center gap-1 cursor-pointer hover:bg-gray-200" onClick={() => setFilters({...filters, brand: "All"})}>Brand: {filters.brand} ✕</span>}
              {filters.inStockOnly && <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs font-bold text-gray-700 flex items-center gap-1 cursor-pointer hover:bg-gray-200" onClick={() => setFilters({...filters, inStockOnly: false})}>In Stock Only ✕</span>}
              {filters.dealsOnly && <span className="px-3 py-1 bg-red-100 border border-red-200 rounded-full text-xs font-bold text-red-700 flex items-center gap-1 cursor-pointer hover:bg-red-200" onClick={() => setFilters({...filters, dealsOnly: false})}>Deals Only ✕</span>}
            </div>
          )}
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-xl border-2 border-dashed border-gray-300">
              <div className="text-5xl text-gray-300 mb-4">🔍</div>
              <h3 className="text-2xl font-['Barlow_Condensed'] font-bold text-gray-800 mb-2 uppercase">No parts found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">We couldn't find any items matching your current filters. Try broadening your search or resetting the parameters.</p>
              <button onClick={() => setFilters({search: "", category: "All", brand: "All", inStockOnly: false, dealsOnly: false, minRating: 0, minPrice: 0, maxPrice: 2000, sort: "featured"})} className="px-6 py-3 bg-[#1A1A1A] hover:bg-black text-white font-bold rounded uppercase tracking-wide transition-colors">Clear All Filters</button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
              {filteredProducts.map(product => (
                <div key={product.id} className={`bg-white rounded-lg shadow-sm hover:shadow-xl border border-gray-200 overflow-hidden flex transition-all group ${viewMode === 'grid' ? 'flex-col' : 'flex-col sm:flex-row h-auto sm:h-auto'}`}>
                  
                  <div className={`relative bg-white p-4 flex items-center justify-center shrink-0 ${viewMode === 'grid' ? 'h-48 border-b border-gray-100' : 'sm:w-64 border-b sm:border-b-0 sm:border-r border-gray-100'}`}>
                    {!product.inStock && <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center backdrop-blur-[2px]"><span className="bg-[#1A1A1A] text-white text-xs font-bold px-4 py-2 rounded shadow uppercase tracking-widest">Out of Stock</span></div>}
                    {product.originalPrice && <div className="absolute top-2 left-2 bg-[#C0392B] text-white text-[10px] font-bold px-2 py-1 rounded z-10 uppercase">Sale</div>}
                    <img src={product.image} alt={product.name} className="object-contain max-h-full w-full rounded mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  
                  <div className={`p-5 flex flex-col flex-grow bg-gray-50 ${viewMode === 'grid' ? '' : 'justify-between'}`}>
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-[10px] font-['JetBrains_Mono'] text-gray-500 uppercase tracking-widest">{product.brand} • {product.partNumber}</p>
                        
                        {/* 3. Exact Fit badge only displays if a vehicle is selected globally */}
                        {globalVehicle !== "Select Vehicle" && globalVehicle && (
                          <span className="text-[#27AE60] text-[10px] font-bold bg-[#E8F8F5] px-2 py-0.5 rounded border border-[#27AE60]/30 whitespace-nowrap">✓ Exact Fit</span>
                        )}
                      </div>
                      <h3 className={`font-['Inter'] font-extrabold leading-tight text-[#1A1A1A] group-hover:text-[#C0392B] transition-colors ${viewMode === 'grid' ? 'text-lg mb-2 line-clamp-2' : 'text-xl mb-2'}`}>{product.name}</h3>
                      
                      <div className="flex text-[#E67E22] text-xs mb-3">
                        {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))} 
                        <span className="text-gray-400 ml-1 font-medium">({product.reviewCount})</span>
                      </div>

                      {viewMode === 'list' && (
                        <div className="hidden sm:block text-sm text-gray-600 mb-4 bg-white p-3 rounded border border-gray-100 shadow-inner">
                          <p><strong>Category:</strong> {product.category}</p>
                          <p><strong>Shipping:</strong> Free next-day delivery eligible</p>
                        </div>
                      )}
                    </div>

                    <div className={`mt-auto pt-4 flex flex-col gap-4 border-t border-gray-200/60 ${viewMode === 'list' ? 'sm:border-t-0 sm:pt-0' : ''}`}>
                      <div className="flex flex-col items-start">
                        {product.originalPrice && <span className="text-xs text-gray-400 line-through block">${product.originalPrice.toFixed(2)}</span>}
                        <span className="text-2xl font-['JetBrains_Mono'] font-black text-[#C0392B]">${product.price.toFixed(2)}</span>
                      </div>
                      
                      <button 
                        onClick={() => addToCart(product)} 
                        disabled={!product.inStock} 
                        className="w-full py-3 bg-[#1A1A1A] hover:bg-[#C0392B] disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-bold rounded shadow transition-all active:scale-95 uppercase flex justify-center items-center gap-2"
                      >
                        {product.inStock ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            Add to Cart
                          </>
                        ) : 'Unavailable'}
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