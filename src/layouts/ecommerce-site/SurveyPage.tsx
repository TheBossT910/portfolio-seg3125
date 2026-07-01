import React, { useState } from 'react';
import { StoreLayout } from './StoreLayout';

// Exporting so it can be reused as a popup in CheckoutPage
export const SurveyContent = ({ isPopup = false, onClose = () => {} }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className={`w-full mx-auto ${isPopup ? '' : 'max-w-2xl px-4 py-16'}`}>
      <div className={`bg-white rounded-xl ${isPopup ? 'p-8' : 'p-8 md:p-12 shadow-md border border-gray-200'}`}>
        
        {isPopup && (
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-xl">&times;</button>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-['Barlow_Condensed'] font-bold text-[#1A1A1A] mb-2 uppercase">Share Your Thoughts</h1>
            <p className="font-['Inter'] text-gray-500 mb-8 border-b border-gray-100 pb-6">Your garage, your rules. Help us fine-tune your Gearhead experience. We read every single response.</p>

            <div className="mb-8 bg-[#F8F9FA] p-6 rounded-lg border border-gray-100">
              <label className="block font-bold text-gray-900 mb-4 text-lg">How easy was it to find the exact part you needed?</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    type="button" 
                    key={star} 
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transform hover:scale-110 transition-transform"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 md:h-12 md:w-12 transition-colors duration-200 ${(hoverRating || rating) >= star ? 'text-[#E67E22]' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
              {rating === 0 && <p className="text-xs text-[#C0392B] mt-2 font-bold">* Please select a rating</p>}
            </div>

            <div className="mb-8">
              <label className="block font-bold text-gray-900 mb-4 text-lg">Would you recommend GearHead to a fellow mechanic?</label>
              <div className="flex gap-8 bg-white p-4 rounded border border-gray-200">
                <label className="flex items-center gap-3 cursor-pointer font-bold text-gray-700 hover:text-black">
                  <input type="radio" name="rec" className="w-5 h-5 accent-[#C0392B]" value="yes" required /> Absolutely Yes
                </label>
                <label className="flex items-center gap-3 cursor-pointer font-bold text-gray-700 hover:text-black">
                  <input type="radio" name="rec" className="w-5 h-5 accent-[#C0392B]" value="no" /> Not yet
                </label>
              </div>
            </div>

            <div className="mb-8">
              <label className="block font-bold text-gray-900 mb-2 text-lg">Anything we could do better?</label>
              <textarea required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#C0392B] focus:ring-2 focus:ring-red-200 outline-none h-24 resize-none text-base transition-all shadow-inner" placeholder="E.g., I wish there was a way to filter parts by specific engine codes..."></textarea>
            </div>

            <button type="submit" disabled={isSending || rating === 0} className="w-full py-4 bg-[#1A1A1A] hover:bg-black text-white text-lg font-bold rounded uppercase tracking-wide transition-all shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-2">
              {isSending ? (
                <><span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span> Submitting...</>
              ) : (
                'Send My Feedback'
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-10 animate-fade-in">
            <div className="text-6xl mb-6">🛠️</div>
            <h2 className="text-4xl font-['Barlow_Condensed'] font-bold text-[#27AE60] mb-4 uppercase tracking-wide">Feedback Received!</h2>
            <p className="font-['Inter'] text-gray-600 mb-10 text-lg max-w-sm mx-auto">You're the reason we keep improving. We appreciate you taking the time out of your day.</p>
            {isPopup ? (
              <button onClick={onClose} className="inline-block px-10 py-4 bg-[#1A1A1A] text-white font-bold rounded uppercase hover:bg-black transition-colors shadow-sm w-full">Close Window</button>
            ) : (
              <a href="/case-studies/ecommerce-site" className="inline-block px-10 py-4 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold rounded uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors shadow-sm">Return to Storefront</a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const SurveyPage = () => <StoreLayout><SurveyContent /></StoreLayout>;