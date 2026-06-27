import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export const productsData = [
  { id: "BPD-4892-CER", name: "Ceramic Brake Pad Set", brand: "PowerStop", category: "Brakes", price: 64.99, originalPrice: 89.99, rating: 4.6, reviewCount: 218, inStock: true, compatibility: { makes: ["Honda", "Toyota"], years: [2018, 2023] }, partNumber: "BPD-4892-CER", image: "https://images.unsplash.com/photo-1600705722908-bab1e6191b41?auto=format&fit=crop&w=400&q=80", description: "Compatible with 2018–2023 Honda Civic models. Produces 40% less dust than standard pads.", specs: { "Material": "Ceramic", "Position": "Front" }, tags: ["brake", "ceramic"] },
  { id: "EV-BPD-99X", name: "High-Performance EV Brake Pads", brand: "PowerStop", category: "Brakes", price: 119.99, originalPrice: null, rating: 4.9, reviewCount: 84, inStock: true, compatibility: { makes: ["Tesla", "Rivian", "Lucid"], years: [2021, 2024] }, partNumber: "EV-BPD-99X", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=400&q=80", description: "Optimized for heavy regenerative braking systems. Fits Tesla Model 3 and Rivian R1T.", specs: { "Material": "Carbon-Ceramic", "Position": "Front/Rear" }, tags: ["ev", "brakes", "performance"] },
  { id: "OIL-M1-5W30", name: "Advanced Full Synthetic Motor Oil 5W-30", brand: "Mobil 1", category: "Fluids", price: 29.99, originalPrice: 35.99, rating: 4.8, reviewCount: 1540, inStock: true, compatibility: { makes: ["All Makes"], years: [2000, 2024] }, partNumber: "OIL-M1", image: "https://images.unsplash.com/photo-1621252178225-b44c66e74640?auto=format&fit=crop&w=400&q=80", description: "Protects for 10,000 miles. Excellent engine protection.", specs: { "Viscosity": "5W-30", "Volume": "5 Quart" }, tags: ["oil", "synthetic"] },
  { id: "BAT-OPT-RED", name: "RedTop Starting Battery", brand: "Optima", category: "Electrical", price: 249.99, originalPrice: null, rating: 4.7, reviewCount: 312, inStock: false, compatibility: { makes: ["Ford", "Chevrolet"], years: [2010, 2022] }, partNumber: "BAT-OPT", image: "https://images.unsplash.com/photo-1616781296068-185d26392095?auto=format&fit=crop&w=400&q=80", description: "High power delivery and extreme resistance to battery failure.", specs: { "Type": "AGM", "CCA": "800" }, tags: ["battery", "electrical"] }
];

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gearhead_cart');
    if (saved) setCartItems(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem('gearhead_cart', JSON.stringify(cartItems));
  }, [cartItems, isLoaded]);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0), [cartItems]);
  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, cartTotal, cartCount, isLoaded }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);