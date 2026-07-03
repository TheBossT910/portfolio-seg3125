import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// product data
export const productsData = [
  { id: "BPD-4892-CER", name: "Ceramic Brake Pad Set", brand: "PowerStop", category: "Brakes", price: 64.99, originalPrice: 89.99, rating: 4.6, reviewCount: 218, inStock: true, compatibility: { makes: ["Honda", "Toyota"] }, partNumber: "BPD-4892", image: "https://www.stohlmansubaruservice.com/assets/shared/images/service/brakes_05.jpg" },
  { id: "EV-BPD-99X", name: "High-Performance EV Brake Pads", brand: "PowerStop", category: "Brakes", price: 119.99, originalPrice: null, rating: 4.9, reviewCount: 84, inStock: true, compatibility: { makes: ["Tesla", "Rivian"] }, partNumber: "EV-BPD-99X", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPz7GrYgQfKvAfAgbdTgnpkB8kwioEGlfcfq9rX7QuqHLC7xmyDDn4oVDi&s=10" },
  { id: "OIL-M1-5W30", name: "Advanced Full Synthetic Motor Oil", brand: "Mobil 1", category: "Fluids", price: 29.99, originalPrice: 35.99, rating: 4.8, reviewCount: 1540, inStock: true, compatibility: { makes: ["Universal"] }, partNumber: "OIL-M1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPhwnc6cZZNyyuFU1zhqQ-rwFuSDYM1jMZpeTjg2_338tTTSJc_k8ass&s=10" },
  { id: "BAT-OPT-RED", name: "RedTop Starting Battery", brand: "Optima", category: "Electrical", price: 249.99, originalPrice: null, rating: 4.7, reviewCount: 312, inStock: false, compatibility: { makes: ["Ford", "Chevrolet"] }, partNumber: "BAT-OPT", image: "https://images.tayna.com/prod-images/1200/Powerline/065-powerline-45-435.jpg" },
  { id: "SUS-RIV-01", name: "R1T Performance Suspension Kit", brand: "Rivian OEM", category: "Suspension", price: 1200.00, originalPrice: 1350.00, rating: 5.0, reviewCount: 12, inStock: true, compatibility: { makes: ["Rivian"] }, partNumber: "SUS-R1T", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ePvQw8MkpNKH750lVifFm5BnCKe6rCDSCPZboskJ6UFC-x0NkmI4Plk&s=10" },
  { id: "AER-LUC-CF", name: "Air Carbon Fiber Spoiler", brand: "Lucid OEM", category: "Accessories", price: 850.00, originalPrice: null, rating: 4.5, reviewCount: 8, inStock: true, compatibility: { makes: ["Lucid"] }, partNumber: "AER-LUC", image: "https://i5.walmartimages.com/asr/74bf05a4-e38e-42fb-80c7-00865ec22f41.0851572fc3efc927199128156f973d83.jpeg" }
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

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('gearhead_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

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