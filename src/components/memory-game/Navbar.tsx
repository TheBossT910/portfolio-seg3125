const Navbar = ({ difficulty = 'Easy', showDifficultySelector = true }) => {
  const isHard = difficulty === 'Hard';

  return (
    <nav className="sticky top-0 z-50 bg-[#fdf0d5]/95 backdrop-blur-md border-b-2 border-[#aed9e0] px-8 py-4 flex justify-between items-center">
      {/* Brand / Logo */}
      <a href="/case-studies/memory-game">
        <div className="flex items-center gap-3">
          <div className="bg-[#003049] text-[#fdf0d5] p-2 rounded-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#003049]">MotorMemory</span>
        </div>
      </a>

      {/* Navigation Links */}
      <div className="hidden md:flex bg-white rounded-full p-1 border-2 border-[#aed9e0] gap-1">
        <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#003049] text-white font-bold text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Play
        </button>
        <button className="flex items-center gap-2 px-6 py-2 rounded-full text-[#003049] hover:bg-[#aed9e0]/40 font-bold text-sm transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Leaderboard (Coming Soon!)
        </button>
      </div>

      {/* Difficulty / Persona Selector */}
      {showDifficultySelector ? (
        <button className="flex items-center gap-2 bg-white hover:bg-[#aed9e0]/30 border-2 border-[#aed9e0] px-3 py-1.5 rounded-full transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#669bbc] text-white flex items-center justify-center font-black text-sm">
            {isHard ? 'YK' : 'FR'}
          </div>
          <span className="font-bold text-[#003049] hidden md:block text-sm pr-1">
            {isHard ? 'Yuki' : 'Fernando'}
          </span>
          <svg className="w-4 h-4 text-[#003049]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      ) : (
        /* Empty div ensures the flex spacing (justify-between) doesn't push the middle nav to the right edge */
        <div className="w-24 hidden md:block pointer-events-none opacity-0"></div>
      )}
    </nav>
  );
};

export default Navbar;