import React, { useState, useMemo, useRef } from 'react';
import { regionalGrowthData, manufacturerSalesData, batteryTechData, infraData, dict } from './dashboardData';

export const DashboardPage = () => {
  const [lang, setLang] = useState<'en' | 'ja'>('en');
  const [metric, setMetric] = useState<'share' | 'volume'>('volume');
  const [year, setYear] = useState<2023 | 2024 | 2025>(2025);
  
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number, y: number, value: number, label: string, year: number } | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const text = dict[lang];

  const formatNumber = (num: number, type: 'standard' | 'percent') => {
    const locale = lang === 'ja' ? 'ja-JP' : 'en-US';
    if (type === 'percent') {
      return new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: 1 }).format(num / 100);
    }
    return new Intl.NumberFormat(locale).format(num);
  };

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Pre-selected Setting Handlers
  const applyPreset = (pYear: 2023|2024|2025, pMetric: 'share'|'volume') => {
    setYear(pYear);
    setMetric(pMetric);
    scrollToDashboard();
  };

  const chart1Width = 700;
  const chart1Height = 280;
  const maxShare = 45;
  const maxVolume = 9000000;
  
  const getChart1DataPoint = (index: number, value: number, max: number) => {
    const x = (index / (regionalGrowthData.length - 1)) * (chart1Width - 100) + 60;
    const y = chart1Height - 40 - (value / max) * (chart1Height - 70);
    return { x, y };
  };

  const chart1Lines = useMemo(() => [
    { id: 'na', label: text.regionNA, color: '#0F172A', dataKey: 'North America' as const }, 
    { id: 'eu', label: text.regionEU, color: '#059669', dataKey: 'Europe' as const }, 
    { id: 'as', label: text.regionAS, color: '#2563EB', dataKey: 'Asia' as const }, 
  ].map(line => ({
    ...line,
    points: regionalGrowthData.map((d, i) => {
      const val = metric === 'share' ? d[line.dataKey].marketShare : d[line.dataKey].volume;
      return {
        ...getChart1DataPoint(i, val, metric === 'share' ? maxShare : maxVolume),
        value: val,
        year: d.year
      };
    })
  })), [metric, text, lang]);

  const currentManufacturers = manufacturerSalesData[year];
  const maxMfgSales = Math.max(...currentManufacturers.map(m => m.sales)) * 1.1;

  // Infra Area Chart Points
  const maxInfra = 800000;
  const infraPoints = infraData.map((d, i) => {
    const x = (i / (infraData.length - 1)) * (chart1Width - 100) + 60;
    const y = chart1Height - 40 - (d.nodes / maxInfra) * (chart1Height - 70);
    return { x, y, val: d.nodes, year: d.year };
  });
  const infraPath = infraPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const infraAreaPath = `${infraPath} L ${infraPoints[infraPoints.length-1].x} ${chart1Height - 40} L ${infraPoints[0].x} ${chart1Height - 40} Z`;

  return (
    <div className="font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col selection:bg-blue-200">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">{text.title}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 p-1 rounded-md border border-slate-200 text-xs font-bold">
              <button onClick={() => setLang('en')} className={`px-3 py-1.5 rounded transition-all ${lang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>EN</button>
              <button onClick={() => setLang('ja')} className={`px-3 py-1.5 rounded transition-all ${lang === 'ja' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>日本語</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero & Settings Configuration Area */}
      <section className="relative pt-20 pb-16 px-6 md:px-10 border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center mb-12">
            <span className="bg-blue-50 text-blue-700 border border-blue-200 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-6 inline-block">
              {text.heroBadge}
            </span>
            <h1 className="text-slate-900 text-5xl md:text-7xl font-bold tracking-tight mb-4">
              {text.heroTitle} <span className="text-blue-600">{text.heroTitleHighlight}</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">{text.heroSub}</p>
          </div>
          
          {/* Main Filtering Bar */}
          <div className="bg-white p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-end w-full shadow-lg border border-slate-200 max-w-4xl mx-auto relative z-20">
            <div className="w-full md:w-1/2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{text.filterYear}</label>
              <select 
                value={year} onChange={(e) => setYear(Number(e.target.value) as 2023|2024|2025)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-900 px-5 py-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer font-bold appearance-none"
              >
                <option value={2025}>2025 (Forecast)</option>
                <option value={2024}>2024 (Verified)</option>
                <option value={2023}>2023 (Historical)</option>
              </select>
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{text.filterMetric}</label>
              <select 
                value={metric} onChange={(e) => setMetric(e.target.value as 'share'|'volume')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-900 px-5 py-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer font-bold appearance-none"
              >
                <option value="volume">{text.metricVol}</option>
                <option value="share">{text.metricShare}</option>
              </select>
            </div>
            <div className="w-full md:w-auto mt-auto">
              <button onClick={scrollToDashboard} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl px-8 py-4 shadow-lg shadow-blue-600/20 transition-all h-[58px] whitespace-nowrap">
                {text.applyBtn}
              </button>
            </div>
          </div>

          {/* Quick Analysis Presets */}
          <div className="max-w-4xl mx-auto mt-12">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-6">{text.presetTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: text.preset1Title, sub: text.preset1Sub, y: 2025, m: 'volume' },
                { title: text.preset2Title, sub: text.preset2Sub, y: 2024, m: 'share' },
                { title: text.preset3Title, sub: text.preset3Sub, y: 2023, m: 'share' }
              ].map((p, idx) => (
                <div key={idx} onClick={() => applyPreset(p.y as 2023|2024|2025, p.m as 'volume'|'share')} className="bg-white border border-slate-200 p-4 rounded-xl cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group text-center">
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{p.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{p.sub}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CORE DASHBOARD */}
      <main ref={dashboardRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-grow">
        
        {/* Context Disclaimer[span_1](start_span)[span_1](end_span) */}
        <div className="mb-8 flex justify-end">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs py-2 px-4 rounded-lg shadow-sm font-medium">
            {text.genAiDisclaimer}
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { label: text.kpi1, value: formatNumber(14300000, 'standard'), color: "bg-blue-600" },
            { label: text.kpi2, value: text.regionAS, color: "bg-emerald-500" },
            { label: text.kpi3, value: lang === 'en' ? "BYD" : "比亜迪", color: "bg-slate-800" }
          ].map((card, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 relative overflow-hidden shadow-sm">
              <div className={`absolute top-0 left-0 w-1.5 h-full ${card.color}`}></div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{card.label}</p>
              <p className="text-3xl font-extrabold text-slate-900">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Top 2 Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          
          {/* Chart 1: Regional Adoption Line Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-6">{text.chart1Title}</h3>
            <div className="relative w-full aspect-[16/9] bg-slate-50/50 rounded-xl border border-slate-100 flex items-center justify-center p-4">
              <svg viewBox={`0 0 ${chart1Width} ${chart1Height}`} className="w-full h-full overflow-visible" onMouseLeave={() => setHoveredPoint(null)}>
                {[0.25, 0.5, 0.75].map((ratio, tIdx) => {
                  const yPos = chart1Height - 40 - (ratio * (chart1Height - 70));
                  return (
                    <g key={tIdx}>
                      <line x1="50" y1={yPos} x2={chart1Width - 40} y2={yPos} stroke="#E2E8F0" strokeDasharray="4 4" />
                      <text x="40" y={yPos + 4} fill="#64748B" fontSize="11" textAnchor="end" className="font-medium">
                        {metric === 'share' ? formatNumber(ratio * maxShare, 'standard') : formatNumber(ratio * maxVolume, 'standard')}
                      </text>
                    </g>
                  );
                })}
                <line x1="50" y1={chart1Height - 40} x2={chart1Width - 40} y2={chart1Height - 40} stroke="#CBD5E1" strokeWidth="2" />
                
                {chart1Lines.map((line, lIdx) => (
                  <g key={lIdx}>
                    <path d={line.points.map((p, pIdx) => `${pIdx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')} fill="none" stroke={line.color} strokeWidth="3" className="transition-all duration-700 ease-in-out" />
                    {line.points.map((p, pIdx) => (
                      <circle 
                        key={pIdx} cx={p.x} cy={p.y} r={hoveredPoint?.x === p.x && hoveredPoint?.y === p.y ? "7" : "4.5"}
                        fill="#FFFFFF" stroke={line.color} strokeWidth="2.5"
                        className="cursor-pointer transition-all duration-150"
                        onMouseEnter={() => setHoveredPoint({ x: p.x, y: p.y, value: p.value, label: line.label, year: p.year })}
                      />
                    ))}
                  </g>
                ))}
                {regionalGrowthData.map((d, idx) => (
                  <text key={idx} x={(idx / (regionalGrowthData.length - 1)) * (chart1Width - 100) + 60} y={chart1Height - 15} fill="#475569" fontSize="12" fontWeight="bold" textAnchor="middle">{d.year}</text>
                ))}
              </svg>

              {hoveredPoint && (
                <div className="absolute bg-white border border-slate-200 p-3 rounded-lg shadow-xl pointer-events-none z-40 transition-all duration-150 transform -translate-x-1/2 -translate-y-[130%]" style={{ left: `${((hoveredPoint.x) / chart1Width) * 100}%`, top: `${(hoveredPoint.y / chart1Height) * 100}%` }}>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">{hoveredPoint.label} • {hoveredPoint.year}</p>
                  <p className="text-xl font-black text-slate-900">
                    {metric === 'share' ? formatNumber(hoveredPoint.value, 'percent') : formatNumber(hoveredPoint.value, 'standard')}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-5 mt-6 pt-5 border-t border-slate-100">
              {chart1Lines.map(line => (
                <div key={line.id} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: line.color }}></span>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{line.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 2: Manufacturer Output Bar Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">{text.chart2Title} ({year})</h3>
            </div>
            <div className="space-y-6 flex-grow flex flex-col justify-center bg-slate-50/50 p-6 rounded-xl border border-slate-100">
              {currentManufacturers.map((mfg, idx) => {
                const barWidth = (mfg.sales / maxMfgSales) * 100;
                const resolvedName = lang === 'ja' ? mfg.nameJa : mfg.name;
                return (
                  <div key={`${year}-${idx}`} className="space-y-2 group">
                    <div className="flex justify-between items-end text-sm">
                      <span className="text-slate-700 font-bold group-hover:text-blue-600 transition-colors">{resolvedName}</span>
                      <span className="text-slate-500 text-xs">
                        <strong className="text-slate-900 text-base">{formatNumber(mfg.sales, 'standard')}</strong> {text.sales}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-5 rounded-sm overflow-hidden">
                      <div 
                        className="h-full rounded-sm transition-all duration-1000 ease-out bg-emerald-500"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
              <span>0 Base</span>
              <span>Max: {formatNumber(maxMfgSales, 'standard')}</span>
            </div>
          </div>

        </div>

        {/* Bottom 2 Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          
          {/* Chart 3: Battery Chemistry (Horizontal Stacked Bar) */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">{text.chart3Title}</h3>
            <div className="space-y-6">
              {batteryTechData.map((d, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-xs font-bold text-slate-500">{d.year}</div>
                  <div className="flex w-full h-8 rounded-sm overflow-hidden text-[10px] text-white font-bold leading-8 text-center shadow-inner">
                    <div className="bg-slate-800 transition-all duration-500" style={{ width: `${d.nmc}%` }}>{d.nmc > 10 ? 'NMC' : ''}</div>
                    <div className="bg-blue-500 transition-all duration-500" style={{ width: `${d.lfp}%` }}>{d.lfp > 10 ? 'LFP' : ''}</div>
                    <div className="bg-emerald-400 transition-all duration-500" style={{ width: `${d.solid}%` }}>{d.solid > 10 ? 'Solid' : ''}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-slate-800 rounded-sm"></span><span className="text-xs font-bold text-slate-600">NMC</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded-sm"></span><span className="text-xs font-bold text-slate-600">LFP</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-emerald-400 rounded-sm"></span><span className="text-xs font-bold text-slate-600">Solid-State</span></div>
            </div>
          </div>

          {/* Chart 4: Infrastructure Area Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">{text.chart4Title}</h3>
            <div className="relative w-full aspect-[16/9] bg-slate-50/50 rounded-xl border border-slate-100 p-4">
              <svg viewBox={`0 0 ${chart1Width} ${chart1Height}`} className="w-full h-full overflow-visible">
                <line x1="50" y1={chart1Height - 40} x2={chart1Width - 40} y2={chart1Height - 40} stroke="#CBD5E1" strokeWidth="2" />
                <path d={infraAreaPath} fill="rgba(37, 99, 235, 0.1)" />
                <path d={infraPath} fill="none" stroke="#2563EB" strokeWidth="3" />
                {infraPoints.map((p, idx) => (
                  <circle key={idx} cx={p.x} cy={p.y} r="4" fill="#2563EB" />
                ))}
                {infraPoints.map((p, idx) => (
                  <text key={idx} x={p.x} y={chart1Height - 15} fill="#475569" fontSize="12" fontWeight="bold" textAnchor="middle">{p.year}</text>
                ))}
              </svg>
            </div>
          </div>

        </div>

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-16">
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-900">{text.tableTitle} ({year})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="p-4 border-b border-slate-200">{text.colRank}</th>
                  <th className="p-4 border-b border-slate-200">{text.colMfg}</th>
                  <th className="p-4 border-b border-slate-200">{text.colSales}</th>
                  <th className="p-4 border-b border-slate-200">{text.colGrowth}</th>
                  <th className="p-4 border-b border-slate-200">{text.colChem}</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-slate-700">
                {currentManufacturers.sort((a,b) => b.sales - a.sales).map((mfg, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 border-b border-slate-100">#{idx + 1}</td>
                    <td className="p-4 border-b border-slate-100 font-bold text-slate-900">{lang === 'ja' ? mfg.nameJa : mfg.name}</td>
                    <td className="p-4 border-b border-slate-100">{formatNumber(mfg.sales, 'standard')}</td>
                    <td className="p-4 border-b border-slate-100 text-emerald-600">+{mfg.growth}%</td>
                    <td className="p-4 border-b border-slate-100 text-slate-500">{mfg.chemistry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 px-6 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <span className="font-bold text-slate-900">{text.title}</span>
          </div>
          <p>SEG 3125 Analysis and Design of User Interfaces • © 2026</p>
        </div>
      </footer>
    </div>
  );
};