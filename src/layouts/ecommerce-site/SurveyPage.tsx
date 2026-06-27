import React, { useState } from 'react';
import { StoreLayout } from './StoreLayout';

// 1. Content component containing the UI logic
const SurveyContent = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(4); // Default to a 4-star

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <h1 className="text-3xl font-['Barlow_Condensed'] font-bold text-[#C0392B] mb-2 uppercase">Share Your Thoughts</h1>
            <p className="font-['Inter'] text-gray-600 mb-8 border-b pb-6">How was your experience today? We read every response to ensure we're serving you right.</p>

            <div className="mb-8">
              <label className="block font-bold text-gray-900 mb-4">How easy was it to find the part you needed?</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button type="button" key={star} onClick={() => setRating(star)} className="focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 transition-colors ${rating >= star ? 'text-[#E67E22]' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block font-bold text-gray-900 mb-4">Would you recommend GearHead to a friend?</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                  <input type="radio" name="rec" className="w-5 h-5 accent-[#C0392B]" value="yes" required /> Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                  <input type="radio" name="rec" className="w-5 h-5 accent-[#C0392B]" value="no" /> No
                </label>
              </div>
            </div>

            <div className="mb-8">
              <label className="block font-bold text-gray-900 mb-2">Anything we could do better?</label>
              <textarea required className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#C0392B] focus:ring-1 focus:ring-[#C0392B] outline-none h-32 resize-none text-sm" placeholder="Tell us what you think..."></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-[#1A1A1A] hover:bg-black text-white text-lg font-bold rounded uppercase tracking-wide transition-colors">Send My Feedback</button>
          </form>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-4xl font-['Barlow_Condensed'] font-bold text-[#27AE60] mb-4 uppercase tracking-wide">Thank You!</h2>
            <p className="font-['Inter'] text-gray-600 mb-8 text-lg">You're the reason we keep improving. We appreciate your time.</p>
            {/* Updated back-link to match Astro router */}
            <a href="/case-studies/ecommerce-site" className="inline-block px-8 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold rounded uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors">Back to Home</a>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Wrapper provides the Layout
export const SurveyPage = () => {
  return (
    <StoreLayout>
      <SurveyContent />
    </StoreLayout>
  );
};