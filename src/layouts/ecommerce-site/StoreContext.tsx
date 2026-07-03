import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Unified and Expanded Product Data
export const productsData = [
  { id: "BPD-4892-CER", name: "Ceramic Brake Pad Set", brand: "PowerStop", category: "Brakes", price: 64.99, originalPrice: 89.99, rating: 4.6, reviewCount: 218, inStock: true, compatibility: { makes: ["Honda", "Toyota"] }, partNumber: "BPD-4892", image: "https://images.unsplash.com/photo-1600705722908-bab1e6191b41?auto=format&fit=crop&w=400&q=80" },
  { id: "EV-BPD-99X", name: "High-Performance EV Brake Pads", brand: "PowerStop", category: "Brakes", price: 119.99, originalPrice: null, rating: 4.9, reviewCount: 84, inStock: true, compatibility: { makes: ["Tesla", "Rivian"] }, partNumber: "EV-BPD-99X", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=400&q=80" },
  { id: "OIL-M1-5W30", name: "Advanced Full Synthetic Motor Oil", brand: "Mobil 1", category: "Fluids", price: 29.99, originalPrice: 35.99, rating: 4.8, reviewCount: 1540, inStock: true, compatibility: { makes: ["Universal"] }, partNumber: "OIL-M1", image: "https://images.unsplash.com/photo-1621252178225-b44c66e74640?auto=format&fit=crop&w=400&q=80" },
  { id: "BAT-OPT-RED", name: "RedTop Starting Battery", brand: "Optima", category: "Electrical", price: 249.99, originalPrice: null, rating: 4.7, reviewCount: 312, inStock: false, compatibility: { makes: ["Ford", "Chevrolet"] }, partNumber: "BAT-OPT", image: "https://images.unsplash.com/photo-1616781296068-185d26392095?auto=format&fit=crop&w=400&q=80" },
  { id: "SUS-RIV-01", name: "R1T Performance Suspension Kit", brand: "Rivian OEM", category: "Suspension", price: 1200.00, originalPrice: 1350.00, rating: 5.0, reviewCount: 12, inStock: true, compatibility: { makes: ["Rivian"] }, partNumber: "SUS-R1T", image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=400&q=80" },
  { id: "AER-LUC-CF", name: "Air Carbon Fiber Spoiler", brand: "Lucid OEM", category: "Accessories", price: 850.00, originalPrice: null, rating: 4.5, reviewCount: 8, inStock: true, compatibility: { makes: ["Lucid"] }, partNumber: "AER-LUC", image: "https://images.unsplash.com/photo-1563720225384-9d0b64d008bb?auto=format&fit=crop&w=400&q=80" }
];

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [globalVehicle, setGlobalVehicleState] = useState("Select Vehicle");
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('gearhead_cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));
      
      const savedVehicle = localStorage.getItem('gearhead_vehicle');
      if (savedVehicle) setGlobalVehicleState(savedVehicle);
    }
    setIsLoaded(true);
  }, []);

  // Cart persistence can stay effect-driven; nothing navigates away right after adding to cart.
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('gearhead_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // IMPORTANT: the vehicle write can be immediately followed by a hard
  // navigation (window.location.href from "Find Parts" / "Save Vehicle").
  // If we relied on a useEffect here, the browser can navigate away before
  // React ever runs the effect, and the localStorage write is lost — which
  // is exactly what caused the top bar to look "out of sync" after
  // selecting a vehicle. So this setter writes to localStorage synchronously,
  // in the same tick as the state update, instead of waiting on an effect.
  const setGlobalVehicle = (vehicle: string) => {
    setGlobalVehicleState(vehicle);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gearhead_vehicle', vehicle);
    }
  };

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    
    setToastMessage(`Added ${product.name} to cart!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0), [cartItems]);
  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, cartTotal, cartCount, isLoaded, globalVehicle, setGlobalVehicle }}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-[#27AE60] text-white px-6 py-3 rounded shadow-xl font-bold z-50 animate-bounce">
          ✓ {toastMessage}
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);