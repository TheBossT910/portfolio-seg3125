import React, { useState, useEffect } from 'react';
import { StoreLayout } from './StoreLayout';
import { useCart } from './StoreContext';

const CheckoutContent = () => {
  const { cartItems, cartTotal, isLoaded, clearCart } = useCart() || { cartItems: [], cartTotal: 0, isLoaded: true };
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // forced survey state
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  // automatically trigger popup
  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => setShowSurvey(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (clearCart) clearCart();
      setStep(4);
    }, 1500);
  };

  const submitSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    setSurveySubmitted(true);
    setTimeout(() => setShowSurvey(false), 2000);
  };

  if (!isLoaded) return <div className="p-8 text-center text-gray-500 font-bold animate-pulse">Loading secure checkout...</div>;

  if (cartItems.length === 0 && step < 4) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl font-['Barlow_Condensed'] font-bold text-[#1A1A1A] mb-2 uppercase">Your bay is empty</h2>
        <a href="/case-studies/ecommerce-site/shop" className="inline-block mt-4 px-8 py-4 bg-[#C0392B] hover:bg-[#922B21] text-white font-bold rounded uppercase tracking-wide transition-colors">Return to Shop</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative">
      
      {showSurvey && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl max-w-lg w-full relative animate-fade-in">
            {!surveySubmitted ? (
              <form onSubmit={submitSurvey}>
                <h2 className="text-3xl font-['Barlow_Condensed'] font-bold text-[#C0392B] mb-2 uppercase">Hold Up!</h2>
                <p className="font-['Inter'] text-gray-600 mb-6 border-b border-gray-100 pb-4">Help us fine-tune your Gearhead experience. We read every response.</p>
                
                <div className="mb-6 bg-[#F8F9FA] p-4 rounded border border-gray-200">
                  <label className="block font-bold text-gray-900 mb-3 text-center">How easy was checkout today?</label>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button type="button" key={star} onClick={() => setRating(star)} className="focus:outline-none transform hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${rating >= star ? 'text-[#E67E22]' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block font-bold text-gray-900 mb-2">Anything we could do better?</label>
                  <textarea required className="w-full px-3 py-2 border border-gray-300 rounded focus:border-[#C0392B] outline-none h-24 resize-none" placeholder="Drop your thoughts here..."></textarea>
                </div>

                <button type="submit" disabled={rating === 0} className="w-full py-4 bg-[#1A1A1A] hover:bg-black text-white font-bold rounded uppercase tracking-wide transition-all disabled:bg-gray-400">
                  Submit Feedback
                </button>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">🔧</div>
                <h3 className="text-3xl font-['Barlow_Condensed'] font-bold text-[#27AE60] uppercase">Feedback Locked In!</h3>
              </div>
            )}
          </div>
        </div>
      )}

      {/* progress bar */}
      <div className="flex justify-between items-center mb-12 relative max-w-2xl mx-auto">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2 rounded"></div>
        <div className="absolute left-0 top-1/2 h-1 bg-[#C0392B] -z-10 transform -translate-y-1/2 transition-all duration-500 rounded" style={{width: `${((step - 1) / 3) * 100}%`}}></div>
        {[ {num: 1, label: "Review"}, {num: 2, label: "Shipping"}, {num: 3, label: "Payment"}, {num: 4, label: "Done"} ].map((s) => (
          <div key={s.num} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors duration-300 shadow-sm ${step >= s.num ? 'bg-[#C0392B] border-[#C0392B] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
              {step > s.num ? '✓' : s.num}
            </div>
            <span className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${step >= s.num ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 md:p-10 rounded-xl shadow-md border border-gray-200">
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-['Barlow_Condensed'] font-bold text-[#1A1A1A] mb-6 border-b pb-4 uppercase">Review Your Parts</h2>
            <div className="space-y-4 mb-8">
              {cartItems.map((item: any) => (
                <div key={item.product.id} className="flex gap-4 items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <img src={item.product.image} className="w-20 h-20 object-cover rounded border border-gray-200" />
                  <div className="flex-1">
                    <p className="font-bold text-[#1A1A1A]">{item.product.name}</p>
                    <p className="text-xs text-gray-500 mt-1 uppercase">Part No: {item.product.partNumber}</p>
                    <p className="text-xs text-gray-500 mt-1">Qty: <span className="font-bold text-black">{item.quantity}</span></p>
                  </div>
                  <p className="font-['JetBrains_Mono'] font-bold text-lg text-[#C0392B]">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-2xl font-bold mb-8 bg-[#F8F9FA] p-6 rounded-lg border border-gray-200">
              <span className="uppercase font-['Barlow_Condensed']">Order Subtotal:</span>
              <span className="font-['JetBrains_Mono']">${cartTotal.toFixed(2)}</span>
            </div>
            <button onClick={() => setStep(2)} className="w-full py-4 bg-[#C0392B] hover:bg-[#922B21] text-white font-bold rounded uppercase tracking-wide">Proceed to Shipping</button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="animate-fade-in">
            <h2 className="text-2xl font-['Barlow_Condensed'] font-bold text-[#1A1A1A] mb-6 border-b pb-4 uppercase">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <input type="text" required placeholder="First Name *" className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#C0392B] outline-none" />
              <input type="text" required placeholder="Last Name *" className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#C0392B] outline-none" />
              <input type="text" required placeholder="Street Address *" className="md:col-span-2 w-full px-4 py-3 border border-gray-300 rounded focus:border-[#C0392B] outline-none" />
              <input type="text" required placeholder="City *" className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#C0392B] outline-none" />
              <input type="text" required placeholder="Postal Code (e.g. A1A 1A1) *" pattern="[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d" className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#C0392B] outline-none uppercase" />
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="px-8 py-4 border border-gray-300 text-gray-600 font-bold rounded uppercase">Back</button>
              <button type="submit" className="flex-1 py-4 bg-[#C0392B] hover:bg-[#922B21] text-white font-bold rounded uppercase">Continue</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePayment} className="animate-fade-in">
            <h2 className="text-2xl font-['Barlow_Condensed'] font-bold text-[#1A1A1A] mb-6 border-b pb-4 uppercase">Secure Payment</h2>
            <div className="space-y-6 mb-8">
              <input type="text" required placeholder="Card Number (16 Digits)" pattern="\d{16}" maxLength={16} className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['JetBrains_Mono'] focus:border-[#C0392B] outline-none" />
              <div className="grid grid-cols-2 gap-6">
                <input type="text" required placeholder="MM/YY" pattern="\d{2}/\d{2}" className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['JetBrains_Mono'] focus:border-[#C0392B] outline-none" />
                <input type="password" required placeholder="CVV" maxLength={4} pattern="\d{3,4}" className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['JetBrains_Mono'] focus:border-[#C0392B] outline-none" />
              </div>
            </div>
            <div className="flex gap-4">
              <button type="button" disabled={isProcessing} onClick={() => setStep(2)} className="px-8 py-4 border border-gray-300 text-gray-600 font-bold rounded uppercase disabled:opacity-50">Back</button>
              <button type="submit" disabled={isProcessing} className="flex-1 py-4 bg-[#1A1A1A] hover:bg-black text-white font-bold rounded uppercase disabled:bg-gray-600">
                {isProcessing ? 'Processing...' : `Place Order ($${cartTotal.toFixed(2)})`}
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-24 h-24 bg-[#27AE60] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">✓</div>
            <h2 className="text-4xl font-['Barlow_Condensed'] font-bold uppercase mb-2 text-[#1A1A1A]">Order Confirmed!</h2>
            <p className="text-gray-500 mb-8 font-bold">Order #GH-{Math.floor(10000 + Math.random() * 90000)}</p>
            <a href="/case-studies/ecommerce-site" className="text-[#C0392B] font-bold uppercase border-b border-[#C0392B]">Return to Homepage</a>
          </div>
        )}
      </div>
    </div>
  );
};

export const CheckoutPage = () => <StoreLayout><CheckoutContent /></StoreLayout>;