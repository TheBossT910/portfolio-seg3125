import React, { useState } from 'react';
import { regionalGrowthData, manufacturerSalesData, dict } from './dashboardData';

export const DashboardPage = () => {
  const [lang, setLang] = useState<'en' | 'ja'>('en');
  const [metric, setMetric] = useState<'share' | 'volume'>('share');
  const [year, setYear] = useState<2023 | 2024 | 2025>(2025);

  const text = dict[lang];

  // Helper values for reactive Chart 1 (SVG coordinate calculation)
  const chart1Width = 500;
  const chart1Height = 200;
  const getChart1DataPoint = (index: number, value: number, max: number) => {
    const x = (index / (regionalGrowthData.length - 1)) * (chart1Width - 60) + 40;
    const y = chart1Height - 30 - (value / max) * (chart1Height - 50);
    return { x, y };
  };

  // Resolve dynamic dataset strings based on localized states
  const naLabel = text.regionNA;
  const euLabel = text.regionEU;
  const asLabel = text.regionAS;

  const chart1Lines = [
    { label: naLabel, color: '#C0392B', points: regionalGrowthData.map((d, i) => getChart1DataPoint(i, metric === 'share' ? d['North America'].marketShare : d['North America'].volume, metric === 'share' ? 45 : 9000000)) },
    { label: euLabel, color: '#E67E22', points: regionalGrowthData.map((d, i) => getChart1DataPoint(i, metric === 'share' ? d['Europe'].marketShare : d['Europe'].volume, metric === 'share' ? 45 : 9000000)) },
    { label: asLabel, color: '#2980B9', points: regionalGrowthData.map((d, i) => getChart1DataPoint(i, metric === 'share' ? d['Asia'].marketShare : d['Asia'].volume, metric === 'share' ? 45 : 9000000)) },
  ];

  // Data processing for Chart 2
  const currentManufacturers = manufacturerSalesData[year];
  const maxMfgSales = 3500000;

  return (
    <div className="bg-[#1A1A1A] min-h-screen text-white font-['Inter'] pb-16">
      
      {/* Dashboard Sticky Control Bar */}
      <div className="bg-black border-b border-gray-800 sticky top-0 z-30 py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-['JetBrains_Mono'] tracking-widest text-[#E67E22] uppercase font-bold">⚡ Core Analytics System</span>
          </div>
          
          {/* Strict Language Selection Interface Widget */}
          <div className="flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-lg border border-gray-800">
            <span className="text-xs font-bold text-gray-400 font-['JetBrains_Mono'] uppercase">{text.langLabel}:</span>
            <button 
              onClick={() => setLang('en')} 
              className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded transition-all ${lang === 'en' ? 'bg-[#C0392B] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('ja')} 
              className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded transition-all ${lang === 'ja' ? 'bg-[#C0392B] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              JA
            </button>
          </div>
        </div>
      </div>

      {/* Main Core Dashboard Content Area */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Header Block with visual hierarchy alignment */}
        <header className="mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-4xl md:text-6xl font-['Barlow_Condensed'] font-extrabold uppercase tracking-tight mb-2 text-white">
            {text.title}
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl font-medium">
            {text.sub}
          </p>
          <div className="mt-4 inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 font-['JetBrains_Mono'] text-xs py-2 px-4 rounded-md">
            {text.genAiDisclaimer}
          </div>
        </header>

        {/* Dynamic Multi-Chart Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Visualizing Chart 1: Regional Dynamics Line Graph */}
          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-6 flex flex-col justify-between hover:border-gray-700 transition-all">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-xl font-['Barlow_Condensed'] font-black uppercase tracking-wide text-white">
                  {text.chart1Title}
                </h3>
                
                {/* Metric Selector Controls */}
                <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                  <label className="text-[10px] text-gray-400 font-['JetBrains_Mono'] uppercase tracking-wider">{text.toggleMetric}</label>
                  <div className="bg-black p-1 rounded-md flex border border-gray-800">
                    <button 
                      onClick={() => setMetric('share')}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded transition-all ${metric === 'share' ? 'bg-[#E67E22] text-white' : 'text-gray-400'}`}
                    >
                      {text.metricShare}
                    </button>
                    <button 
                      onClick={() => setMetric('volume')}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded transition-all ${metric === 'volume' ? 'bg-[#E67E22] text-white' : 'text-gray-400'}`}
                    >
                      {text.metricVol}
                    </button>
                  </div>
                </div>
              </div>

              {/* Functional Scalable SVG Render Platform */}
              <div className="w-full bg-black/40 p-2 rounded-lg border border-gray-800/60 flex justify-center">
                <svg viewBox={`0 0 ${chart1Width} ${chart1Height}`} className="w-full h-auto overflow-visible">
                  {/* Internal Clean Background Grid Line Matrices */}
                  <line x1="40" y1="30" x2={chart1Width - 20} y2="30" stroke="#333" strokeDasharray="4" />
                  <line x1="40" y1="85" x2={chart1Width - 20} y2="85" stroke="#333" strokeDasharray="4" />
                  <line x1="40" y1="140" x2={chart1Width - 20} y2="140" stroke="#333" strokeDasharray="4" />
                  <line x1="40" y1={chart1Height - 30} x2={chart1Width - 20} y2={chart1Height - 30} stroke="#555" strokeWidth="1.5" />

                  {/* Render Data Lines Dynamically Based on Language Context Variables */}
                  {chart1Lines.map((line, lIdx) => (
                    <g key={lIdx}>
                      <path
                        d={line.points.map((p, pIdx) => `${pIdx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
                        fill="none"
                        stroke={line.color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-500 ease-in-out"
                      />
                      {line.points.map((p, pIdx) => (
                        <circle 
                          key={pIdx} 
                          cx={p.x} 
                          cy={p.y} 
                          r="4" 
                          fill="white" 
                          stroke={line.color} 
                          strokeWidth="2.5"
                          className="cursor-pointer group hover:r-6 transition-all"
                        />
                      ))}
                    </g>
                  ))}

                  {/* Render Localized X-Axis Time Identifiers */}
                  {regionalGrowthData.map((d, idx) => {
                    const x = (idx / (regionalGrowthData.length - 1)) * (chart1Width - 60) + 40;
                    return (
                      <text key={idx} x={x} y={chart1Height - 10} fill="#888" fontSize="10" fontWeight="bold" textAnchor="middle" className="font-['JetBrains_Mono']">
                        {d.year}
                      </text>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Micro-Legend Framework */}
            <div className="flex gap-4 mt-4 bg-black/20 p-2 rounded-md border border-gray-800/30">
              {chart1Lines.map((line, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: line.color }}></span>
                  <span className="text-xs font-bold text-gray-300">{line.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visualizing Chart 2: Manufacturer Scale Metric Profiles */}
          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-6 flex flex-col justify-between hover:border-gray-700 transition-all">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-xl font-['Barlow_Condensed'] font-black uppercase tracking-wide text-white">
                  {text.chart2Title}
                </h3>

                {/* Reporting Parameter Dropdowns */}
                <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                  <label className="text-[10px] text-gray-400 font-['JetBrains_Mono'] uppercase tracking-wider">{text.selectYear}</label>
                  <select 
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value) as 2023 | 2024 | 2025)}
                    className="bg-black border border-gray-800 rounded-md text-xs font-bold px-3 py-2 outline-none hover:border-gray-600 transition-colors text-white cursor-pointer"
                  >
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                  </select>
                </div>
              </div>

              {/* Structured Flex Clean Horizontal Data Bars */}
              <div className="space-y-4 bg-black/40 p-4 rounded-lg border border-gray-800/60">
                {currentManufacturers.map((mfg, idx) => {
                  const widthPercent = Math.min((mfg.sales / maxMfgSales) * 100, 100);
                  const localizedName = lang === 'ja' ? mfg.nameJa : mfg.name;

                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold font-['JetBrains_Mono']">
                        <span className="text-gray-200 uppercase tracking-wide">{localizedName}</span>
                        <span className="text-[#C0392B]">{mfg.sales.toLocaleString()} {text.sales}</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-4 rounded-sm overflow-hidden border border-neutral-700/30">
                        <div 
                          className="bg-gradient-to-r from-[#C0392B] to-[#E67E22] h-full transition-all duration-700 ease-out rounded-sm"
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Context/Clutter Balance Note */}
            <div className="mt-4 text-[11px] text-gray-500 font-medium italic border-t border-gray-800/50 pt-3">
              * Data dynamically sorted for relative scale comparison models.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};