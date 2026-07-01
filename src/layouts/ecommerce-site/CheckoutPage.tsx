import React, { useState } from 'react';
import { StoreLayout } from './StoreLayout';
import { useCart } from './StoreContext';

const CheckoutContent = () => {
  const { cartItems, cartTotal, isLoaded, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate network request for system status feedback
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      setStep(4);
    }, 1500);
  };

  if (!isLoaded) return <div className="p-8 text-center text-gray-500 font-bold animate-pulse">Loading Cart...</div>;

  if (cartItems.length === 0 && step < 4) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl font-['Barlow_Condensed'] font-bold text-[#1A1A1A] mb-2 uppercase">Your bay is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any parts to your cart yet.</p>
        <a href="/case-studies/ecommerce-site/shop" className="inline-block px-8 py-4 bg-[#C0392B] hover:bg-[#922B21] text-white font-bold rounded uppercase tracking-wide transition-colors shadow-lg">Head to the Shop</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Custom Progress Indicator */}
      <div className="flex justify-between items-center mb-12 relative max-w-2xl mx-auto">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2 rounded"></div>
        <div className="absolute left-0 top-1/2 h-1 bg-[#C0392B] -z-10 transform -translate-y-1/2 transition-all duration-500 ease-in-out rounded" style={{width: `${((step - 1) / 3) * 100}%`}}></div>
        
        {[ {num: 1, label: "Review"}, {num: 2, label: "Shipping"}, {num: 3, label: "Payment"}, {num: 4, label: "Done"} ].map((s) => (
          <div key={s.num} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors duration-300 shadow-sm ${step >= s.num ? 'bg-[#C0392B] border-[#C0392B] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
              {step > s.num ? '✓' : s.num}
            </div>
            <span className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${step >= s.num ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 md:p-10 rounded-xl shadow-md border border-gray-200 relative overflow-hidden">
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-['Barlow_Condensed'] font-bold text-[#1A1A1A] mb-6 border-b pb-4 uppercase">Review Your Parts</h2>
            <div className="space-y-4 mb-8">
              {cartItems.map((item: any) => (
                <div key={item.product.id} className="flex gap-4 items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded border border-gray-200" />
                  <div className="flex-1">
                    <p className="font-bold text-[#1A1A1A] leading-tight">{item.product.name}</p>
                    <p className="text-xs font-['JetBrains_Mono'] text-gray-500 mt-1 uppercase">Part No: {item.product.partNumber}</p>
                    <p className="text-xs font-['Inter'] text-gray-500 mt-1">Qty: <span className="font-bold text-black">{item.quantity}</span></p>
                  </div>
                  <p className="font-['JetBrains_Mono'] font-bold text-lg text-[#C0392B]">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-2xl font-bold text-[#1A1A1A] mb-8 bg-[#F8F9FA] p-6 rounded-lg border border-gray-200">
              <span className="uppercase font-['Barlow_Condensed']">Order Subtotal:</span>
              <span className="font-['JetBrains_Mono'] text-[#1A1A1A]">${cartTotal.toFixed(2)}</span>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-4 bg-[#C0392B] hover:bg-[#922B21] text-white font-bold rounded uppercase tracking-wide transition-colors shadow-md">Proceed to Shipping</button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="animate-fade-in">
            <h2 className="text-2xl font-['Barlow_Condensed'] font-bold text-[#1A1A1A] mb-6 border-b pb-4 uppercase">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">First Name <span className="text-[#C0392B]">*</span></label>
                <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#C0392B] focus:ring-2 focus:ring-red-200 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Last Name <span className="text-[#C0392B]">*</span></label>
                <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#C0392B] focus:ring-2 focus:ring-red-200 outline-none transition-all" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Street Address <span className="text-[#C0392B]">*</span></label>
                <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#C0392B] focus:ring-2 focus:ring-red-200 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">City <span className="text-[#C0392B]">*</span></label>
                <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#C0392B] focus:ring-2 focus:ring-red-200 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code <span className="text-[#C0392B]">*</span></label>
                <input type="text" required placeholder="A1A 1A1" pattern="[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d" title="Please enter a valid Canadian Postal Code" className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#C0392B] focus:ring-2 focus:ring-red-200 outline-none uppercase transition-all" />
              </div>
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="px-8 py-4 border border-gray-300 text-gray-600 font-bold rounded hover:bg-gray-100 transition-colors uppercase text-sm tracking-wide">Back</button>
              <button type="submit" className="flex-1 py-4 bg-[#C0392B] hover:bg-[#922B21] text-white font-bold rounded uppercase tracking-wide transition-colors shadow-md">Continue to Payment</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePayment} className="animate-fade-in">
            <h2 className="text-2xl font-['Barlow_Condensed'] font-bold text-[#1A1A1A] mb-6 border-b pb-4 uppercase">Secure Payment</h2>
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-8 text-sm flex items-start gap-3">
              <span className="text-xl">ℹ️</span>
              <p><strong>Demo Mode:</strong> No real payment is processed. Enter dummy values to test the validation.</p>
            </div>
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Card Number <span className="text-[#C0392B]">*</span></label>
                <input type="text" required pattern="\d{16}" title="16 digit card number" placeholder="1234 5678 1234 5678" maxLength={16} className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['JetBrains_Mono'] focus:border-[#C0392B] focus:ring-2 focus:ring-red-200 outline-none transition-all tracking-widest text-lg" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Expiry <span className="text-[#C0392B]">*</span></label>
                  <input type="text" required placeholder="MM/YY" pattern="\d{2}/\d{2}" title="Format: MM/YY" className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['JetBrains_Mono'] focus:border-[#C0392B] focus:ring-2 focus:ring-red-200 outline-none transition-all text-lg tracking-widest" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">CVV <span className="text-[#C0392B]">*</span></label>
                  <input type="password" required placeholder="•••" maxLength={4} pattern="\d{3,4}" className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['JetBrains_Mono'] focus:border-[#C0392B] focus:ring-2 focus:ring-red-200 outline-none transition-all text-lg tracking-widest" />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button type="button" disabled={isProcessing} onClick={() => setStep(2)} className="px-8 py-4 border border-gray-300 text-gray-600 font-bold rounded hover:bg-gray-100 transition-colors uppercase text-sm tracking-wide disabled:opacity-50">Back</button>
              <button type="submit" disabled={isProcessing} className="flex-1 py-4 bg-[#1A1A1A] hover:bg-black text-white font-bold rounded uppercase tracking-wide transition-all shadow-md flex justify-center items-center gap-2 disabled:bg-gray-600">
                {isProcessing ? (
                  <><span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span> Processing...</>
                ) : (
                  `Place Order ($${cartTotal.toFixed(2)})`
                )}
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-24 h-24 bg-[#27AE60] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-lg border-4 border-green-200">✓</div>
            <h2 className="text-4xl font-['Barlow_Condensed'] font-bold uppercase mb-2 text-[#1A1A1A]">Order Confirmed!</h2>
            <p className="font-['JetBrains_Mono'] text-gray-500 mb-8 font-bold bg-gray-100 inline-block px-4 py-1 rounded">Order #GH-{Math.floor(10000 + Math.random() * 90000)}</p>
            
            <div className="bg-[#F8F9FA] border-l-4 border-[#27AE60] p-6 rounded mb-8 text-left max-w-lg mx-auto shadow-sm">
              <h3 className="font-bold text-lg mb-2 text-[#1A1A1A]">What's Next?</h3>
              <p className="text-sm text-gray-600">Your order is being processed and will ship within 1 business day. You'll receive a tracking email shortly. Your garage is about to get an upgrade.</p>
            </div>

            <div className="border-2 border-[#C0392B] bg-white p-8 rounded-xl max-w-lg mx-auto shadow-sm">
              <h3 className="font-bold text-xl mb-2 text-[#C0392B]">How did we do?</h3>
              <p className="text-sm text-gray-700 mb-6">We want to keep getting better — and your voice is how we do it. It only takes 60 seconds.</p>
              <a href="/case-studies/ecommerce-site/survey" className="inline-block px-8 py-4 bg-[#C0392B] hover:bg-[#922B21] text-white font-bold rounded uppercase tracking-wide transition-colors w-full shadow-md">Take the Quick Survey</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CheckoutPage = () => <StoreLayout><CheckoutContent /></StoreLayout>;