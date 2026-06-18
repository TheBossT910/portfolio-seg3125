import React, { useState } from 'react';
import Navbar from '../../components/memory-game/Navbar';
import Footer from '../../components/memory-game/Footer';

// Palette:
// #780000 – deep burgundy (danger/destructive accent)
// #c1121f – red (primary CTA, highlights)
// #fdf0d5 – cream (page background)
// #003049 – navy (primary text, buttons)
// #669bbc – medium blue (secondary UI)
// #aed9e0 – light blue (borders, backgrounds, muted accents)

const StepDivider = () => (
  <div className="flex flex-col items-center my-4 select-none" aria-hidden="true">
    <div className="w-0.5 h-6 bg-[#aed9e0]" />
    <svg className="w-6 h-6 text-[#669bbc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
    <div className="w-0.5 h-6 bg-[#aed9e0]" />
  </div>
);

const IndexPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const categories = [
    { id: 'japan',   label: 'Japan',   flag: '🇯🇵', desc: 'Honda, Toyota, Nissan & more' },
    { id: 'usa',     label: 'USA',     flag: '🇺🇸', desc: 'Ford, Chevrolet, Dodge & more' },
    { id: 'germany', label: 'Germany', flag: '🇩🇪', desc: 'BMW, Mercedes, Porsche & more' },
    { id: 'italy',   label: 'Italy',   flag: '🇮🇹', desc: 'Ferrari, Lamborghini & more' },
    { id: 'korea',   label: 'Korea',   flag: '🇰🇷', desc: 'Hyundai, Kia & more' },
    { id: 'retro',   label: 'Retro',   flag: '🏁',  desc: 'Classic cars across all eras' },
  ];

  const difficulties = [
    {
      id: 'Easy',
      label: 'Easy',
      icon: '🟢',
      timerLabel: 'No Timer',
      desc: 'Browse cars at your own pace. No pressure — ideal for casual players.',
      color: 'border-[#669bbc]',
      activeColor: 'bg-[#669bbc] text-white border-[#669bbc]',
    },
    {
      id: 'Medium',
      label: 'Medium',
      icon: '🟡',
      timerLabel: '30s Timer',
      desc: 'A 30-second timer per question. Fair challenge for most players.',
      color: 'border-[#003049]',
      activeColor: 'bg-[#003049] text-white border-[#003049]',
    },
    {
      id: 'Hard',
      label: 'Hard',
      icon: '🔴',
      timerLabel: '10s Timer',
      desc: 'Only 10 seconds per question. A grid of 6 cards — under pressure.',
      color: 'border-[#c1121f]',
      activeColor: 'bg-[#780000] text-white border-[#780000]',
    },
  ];

  const canStart = selectedCategory && selectedDifficulty;

  return (
    <div className="min-h-screen bg-[#fdf0d5] font-sans text-[#003049] selection:bg-[#c1121f] selection:text-white flex flex-col">
      <Navbar difficulty={selectedDifficulty} showDifficultySelector={true} />

      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-12">

        {/* hero */}
        <header className="mb-14 text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#669bbc] mb-3">SEG 3125 · Memory Game</p>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight text-[#003049] mb-5 leading-none">
            Motor<span className="text-[#c1121f]">Memory</span>
          </h1>
          <p className="text-lg text-[#003049]/70 font-medium max-w-xl mx-auto leading-relaxed">
            Memorize iconic cars from around the world, then answer questions under pressure. How sharp is your automotive recall?
          </p>
        </header>

        {/* category */}
        <section aria-labelledby="step1-heading" className="mb-2">
          {/* section header */}
          <div className="flex items-center gap-4 mb-5">
            <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#003049] text-[#fdf0d5] flex items-center justify-center font-black text-base">1</span>
            <div>
              <h2 id="step1-heading" className="text-2xl font-black text-[#003049]">Choose a Category</h2>
              <p className="text-sm text-[#003049]/60 font-medium">Which country's cars will you test yourself on?</p>
            </div>
          </div>

          {/* common region (same background groups all category cards) */}
          <div className="bg-white/60 border-2 border-[#aed9e0] rounded-3xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all duration-200 ${
                      active
                        ? 'bg-white border-[#c1121f] shadow-lg shadow-[#c1121f]/10 scale-[1.02]'
                        : 'bg-white/80 border-transparent hover:border-[#669bbc] hover:bg-white hover:shadow-md'
                    }`}
                    aria-pressed={active}
                  >
                    <span className="text-5xl mb-3 group-hover:-translate-y-0.5 transition-transform">{cat.flag}</span>
                    <span className={`font-black text-lg mb-1 ${active ? 'text-[#c1121f]' : 'text-[#003049]'}`}>{cat.label}</span>
                    <span className="text-xs text-[#003049]/50 leading-tight">{cat.desc}</span>
                    {active && (
                      <span className="mt-2 text-xs font-bold text-[#c1121f] flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* continuation arrows guides eye downward */}
        <StepDivider />

        {/* difficulty */}
        <section aria-labelledby="step2-heading" className="mb-2">
          <div className="flex items-center gap-4 mb-5">
            <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#003049] text-[#fdf0d5] flex items-center justify-center font-black text-base">2</span>
            <div>
              <h2 id="step2-heading" className="text-2xl font-black text-[#003049]">Select Difficulty</h2>
              <p className="text-sm text-[#003049]/60 font-medium">Difficulty controls the timer. Easy has no timer at all.</p>
            </div>
          </div>

          {/* common region groups all difficulty cards */}
          <div className="bg-white/60 border-2 border-[#aed9e0] rounded-3xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {difficulties.map((diff) => {
                const active = selectedDifficulty === diff.id;
                return (
                  <button
                    key={diff.id}
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className={`flex flex-col p-6 rounded-2xl border-2 text-left transition-all duration-200 ${
                      active
                        ? `${diff.activeColor} shadow-lg scale-[1.02]`
                        : `bg-white border-transparent hover:border-[#aed9e0] hover:shadow-md text-[#003049]`
                    }`}
                    aria-pressed={active}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{diff.icon}</span>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                        active ? 'bg-white/20 text-inherit' : 'bg-[#aed9e0]/40 text-[#003049]/70'
                      }`}>{diff.timerLabel}</span>
                    </div>
                    <span className="font-black text-xl mb-2">{diff.label}</span>
                    <span className={`text-sm leading-relaxed ${active ? 'opacity-80' : 'text-[#003049]/60'}`}>{diff.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <StepDivider />

        {/* start */}
        <section aria-labelledby="step3-heading" className="mb-2">
          <div className="flex items-center gap-4 mb-5">
            <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#003049] text-[#fdf0d5] flex items-center justify-center font-black text-base">3</span>
            <div>
              <h2 id="step3-heading" className="text-2xl font-black text-[#003049]">Start Your Game</h2>
              <p className="text-sm text-[#003049]/60 font-medium">Press the ignition when you're ready.</p>
            </div>
          </div>

          <div className="bg-white/60 border-2 border-[#aed9e0] rounded-3xl p-8 flex flex-col items-center">

            {/* shows what was chosen, proximity groups them */}
            <div className="flex gap-4 mb-8 flex-wrap justify-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                selectedCategory ? 'bg-[#003049] text-white border-[#003049]' : 'bg-white text-[#003049]/40 border-[#aed9e0] border-dashed'
              }`}>
                {selectedCategory
                  ? <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> {categories.find(c => c.id === selectedCategory)?.label}</>
                  : '— Category not selected'
                }
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                selectedDifficulty ? 'bg-[#003049] text-white border-[#003049]' : 'bg-white text-[#003049]/40 border-[#aed9e0] border-dashed'
              }`}>
                {selectedDifficulty
                  ? <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> {selectedDifficulty}</>
                  : '— Difficulty not selected'
                }
              </div>
            </div>

            {/* engine start/stop button */}
            <a href="/case-studies/memory-game/game">
              <button
                disabled={!canStart}
                className={`relative flex flex-col items-center justify-center w-56 h-56 rounded-full transition-all duration-300 ${
                  canStart
                    ? 'bg-[#c1121f] border-[16px] border-[#003049] shadow-2xl shadow-[#c1121f]/40 hover:bg-[#780000] hover:scale-105 active:scale-95 cursor-pointer'
                    : 'bg-[#aed9e0]/50 border-[16px] border-[#aed9e0] cursor-not-allowed'
                }`}
                aria-label="Start game"
              >
                {/* dashed inner ring */}
                <div className={`absolute inset-3 rounded-full border-2 border-dashed ${canStart ? 'border-white/30' : 'border-white/20'}`} />
                <span className={`text-xs font-black tracking-[0.2em] uppercase mb-1 ${canStart ? 'text-white/70' : 'text-[#003049]/30'}`}>Engine</span>
                <span className={`text-5xl font-black tracking-wide ${canStart ? 'text-white' : 'text-[#003049]/30'}`}>START</span>
                <span className={`text-xs font-black tracking-[0.2em] uppercase mt-1 ${canStart ? 'text-white/70' : 'text-[#003049]/30'}`}>Stop</span>
              </button>
            </a>

            {!canStart && (
              <p className="mt-6 text-sm font-bold text-[#c1121f]/70 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Select a category and difficulty to unlock the ignition.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IndexPage;