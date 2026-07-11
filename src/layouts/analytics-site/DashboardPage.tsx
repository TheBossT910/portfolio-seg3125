import React, { useState, useMemo, useRef } from 'react';
import { Zap, Globe2, ChevronDown, Award, ArrowUpRight, Info, BatteryCharging } from 'lucide-react';
import { regionalGrowthData, manufacturerSalesData, batteryTechData, infraData, dict, COLORS } from './dashboardData';

export const DashboardPage = () => {
  const [lang, setLang] = useState<'en' | 'ja'>('en');
  const [metric, setMetric] = useState('volume');
  const [year, setYear] = useState(2025);
  const [tip, setTip] = useState<{ x: number, y: number, title: string, items: {label: string, value: string, color?: string}[] } | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const text = dict[lang];

  const formatNumber = (num: number, type = 'standard') => {
    const locale = text.locale;
    if (type === 'percent') {
      return new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: 1 }).format(num / 100);
    }
    return new Intl.NumberFormat(locale).format(Math.round(num));
  };

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat(text.locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date('2026-07-11'));
  }, [text.locale]);

  const scrollToDashboard = () => dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const applyPreset = (pYear: number, pMetric: string) => {
    setYear(pYear);
    setMetric(pMetric);
    scrollToDashboard();
  };

  const showTip = (e: React.MouseEvent, title: string, items: any) => {
    setTip({ x: e.clientX, y: e.clientY, title, items });
  };
  const hideTip = () => setTip(null);

  /* regional line chart */
  const chartWidth = 640;
  const chartHeight = 300;
  const maxShare = 45;
  const maxVolume = 9000000;

  const getPoint = (index: number, value: number, max: number, len: number) => {
    const x = (index / (len - 1)) * (chartWidth - 110) + 60;
    const y = chartHeight - 46 - (value / max) * (chartHeight - 76);
    return { x, y };
  };

  const chart1Lines = useMemo(() => [
    { id: 'na', label: text.regionNA, color: COLORS.na, dataKey: 'North America' as const },
    { id: 'eu', label: text.regionEU, color: COLORS.eu, dataKey: 'Europe' as const },
    { id: 'as', label: text.regionAS, color: COLORS.asia, dataKey: 'Asia' as const },
  ].map(line => ({
    ...line,
    points: regionalGrowthData.map((d, i) => {
      const val = metric === 'share' ? d[line.dataKey].marketShare : d[line.dataKey].volume;
      return { ...getPoint(i, val, metric === 'share' ? maxShare : maxVolume, regionalGrowthData.length), value: val, year: d.year };
    })
  })), [metric, text]);

  /* KPIs (all react to the year filter) */
  const yearRow = regionalGrowthData.find(d => d.year === year)!;
  const combinedVolume = yearRow["North America"].volume + yearRow.Europe.volume + yearRow.Asia.volume;
  const asiaShare = yearRow.Asia.marketShare;

  const currentManufacturers = manufacturerSalesData[year as 2023|2024|2025];
  const salesLeader = [...currentManufacturers].sort((a, b) => b.sales - a.sales)[0];
  const maxMfgSales = Math.max(...currentManufacturers.map(m => m.sales)) * 1.12;

  /* infra area chart */
  const maxInfra = 800000;
  const infraPoints = infraData.map((d, i) => {
    const p = getPoint(i, d.nodes, maxInfra, infraData.length);
    return { ...p, val: d.nodes, year: d.year };
  });
  const infraPath = infraPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const infraAreaPath = `${infraPath} L ${infraPoints[infraPoints.length - 1].x} ${chartHeight - 46} L ${infraPoints[0].x} ${chartHeight - 46} Z`;

  const batteryLegend = [
    { key: 'nmc', label: text.batteryNMC, color: '#4B5563' },
    { key: 'lfp', label: text.batteryLFP, color: COLORS.na },
    { key: 'solid', label: text.batterySolid, color: COLORS.eu },
  ];

  return (
    <div className="min-h-screen w-full ff-body" style={{ background: COLORS.bg, color: COLORS.textPrimary }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
        .ff-display { font-family: 'Space Grotesk', sans-serif; }
        .ff-body { font-family: 'Inter', sans-serif; }
        .ff-mono { font-family: 'IBM Plex Mono', monospace; }
        .focus-ring:focus-visible { outline: 2px solid ${COLORS.na}; outline-offset: 2px; }
        select { color-scheme: dark; }
      `}} />

      {/* floating tooltip shared across all charts */}
      {tip && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-2 rounded-lg shadow-2xl ff-mono text-xs"
          style={{
            left: tip.x + 14, top: tip.y + 14,
            background: '#050709', border: `1px solid ${COLORS.border}`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}
        >
          <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: COLORS.textFaint }}>{tip.title}</div>
          {tip.items.map((it, i) => (
            <div key={i} className="flex items-center gap-2">
              {it.color && <span className="w-2 h-2 rounded-full" style={{ background: it.color }} />}
              <span style={{ color: COLORS.textMuted }}>{it.label}</span>
              <span className="font-semibold" style={{ color: COLORS.textPrimary }}>{it.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-md" style={{ background: 'rgba(10,14,19,0.85)', borderBottom: `1px solid ${COLORS.border}` }}>
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${COLORS.na}, #14969E)` }}>
              <Zap className="w-4 h-4" style={{ color: '#04211E' }} strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="ff-display font-bold text-[15px] tracking-tight">{text.title}</div>
              <div className="ff-mono text-[10px] uppercase tracking-widest" style={{ color: COLORS.textFaint }}>{text.tagline}</div>
            </div>
          </div>

          <div role="group" aria-label="Language selection" className="flex items-center rounded-lg p-1 text-xs font-semibold" style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.border}` }}>
            <button
              onClick={() => setLang('en')} aria-pressed={lang === 'en'}
              className="focus-ring px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5"
              style={lang === 'en' ? { background: COLORS.na, color: '#04211E' } : { color: COLORS.textMuted }}
            ><Globe2 className="w-3 h-3" /> English</button>
            <button
              onClick={() => setLang('ja')} aria-pressed={lang === 'ja'}
              className="focus-ring px-3 py-1.5 rounded-md transition-all"
              style={lang === 'ja' ? { background: COLORS.na, color: '#04211E' } : { color: COLORS.textMuted }}
            >日本語</button>
          </div>
        </div>
      </nav>

      {/* hero */}
      <section className="relative px-5 pt-16 pb-14 overflow-hidden" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.border} 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="ff-mono inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-widest mb-6" style={{ background: 'rgba(45,212,191,0.08)', border: `1px solid rgba(45,212,191,0.25)`, color: COLORS.na }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.na }} />
            {text.heroBadge}
          </span>
          <h1 className="ff-display text-4xl sm:text-5xl font-bold tracking-tight mb-5 leading-[1.15]">
            {text.heroTitle}<span style={{ color: COLORS.na }}>{text.heroTitleHighlight}</span>
          </h1>
          <p className="text-base max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: COLORS.textMuted }}>{text.heroSub}</p>

          {/* filter panel */}
          <div className="rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-end max-w-2xl mx-auto text-left" style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}` }}>
            <div className="w-full sm:w-1/2">
              <label htmlFor="year-select" className="ff-mono block text-[10px] uppercase tracking-widest mb-2" style={{ color: COLORS.textFaint }}>{text.filterYear}</label>
              <div className="relative">
                <select
                  id="year-select" value={year} onChange={(e) => setYear(Number(e.target.value))}
                  className="focus-ring w-full rounded-lg px-3.5 py-3 outline-none cursor-pointer font-semibold text-sm appearance-none"
                  style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.border}`, color: COLORS.textPrimary }}
                >
                  <option value={2025}>2025</option>
                  <option value={2024}>2024</option>
                  <option value={2023}>2023</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: COLORS.textFaint }} />
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <label htmlFor="metric-select" className="ff-mono block text-[10px] uppercase tracking-widest mb-2" style={{ color: COLORS.textFaint }}>{text.filterMetric}</label>
              <div className="relative">
                <select
                  id="metric-select" value={metric} onChange={(e) => setMetric(e.target.value)}
                  className="focus-ring w-full rounded-lg px-3.5 py-3 outline-none cursor-pointer font-semibold text-sm appearance-none"
                  style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.border}`, color: COLORS.textPrimary }}
                >
                  <option value="volume">{text.metricVol}</option>
                  <option value="share">{text.metricShare}</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: COLORS.textFaint }} />
              </div>
            </div>
            <button
              onClick={scrollToDashboard}
              className="focus-ring w-full sm:w-auto rounded-lg px-5 py-3 text-sm font-semibold whitespace-nowrap transition-transform active:scale-[0.98]"
              style={{ background: COLORS.na, color: '#04211E' }}
            >{text.applyBtn}</button>
          </div>

          {/* presets */}
          <div className="max-w-2xl mx-auto mt-10 pt-8" style={{ borderTop: `1px solid ${COLORS.borderSoft}` }}>
            <h3 className="ff-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: COLORS.textFaint }}>{text.presetTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: text.preset1Title, sub: text.preset1Sub, y: 2025, m: 'volume' },
                { title: text.preset2Title, sub: text.preset2Sub, y: 2024, m: 'share' },
                { title: text.preset3Title, sub: text.preset3Sub, y: 2023, m: 'share' }
              ].map((p, idx) => (
                <button
                  key={idx} onClick={() => applyPreset(p.y, p.m)}
                  className="focus-ring text-left p-4 rounded-xl transition-colors"
                  style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}` }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = COLORS.na}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = COLORS.border}
                >
                  <div className="font-semibold text-sm">{p.title}</div>
                  <div className="text-xs mt-1" style={{ color: COLORS.textFaint }}>{p.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main ref={dashboardRef} className="max-w-6xl mx-auto px-5 py-14 scroll-mt-16">

        {/* disclosures */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mb-8 text-xs">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg" style={{ background: 'rgba(245,166,35,0.06)', border: `1px solid rgba(245,166,35,0.2)`, color: '#E0AD5C' }}>
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{text.genAiDisclaimer}</span>
          </div>
          <div className="ff-mono flex items-center gap-1.5 px-3.5 py-2 rounded-lg" style={{ color: COLORS.textFaint, border: `1px solid ${COLORS.borderSoft}` }}>
            {text.dataAsOf}: {formattedDate}
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="rounded-2xl p-6" style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}` }}>
            <p className="ff-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: COLORS.textFaint }}>{text.kpi1Label}</p>
            <p className="ff-display text-3xl font-bold tracking-tight">{formatNumber(combinedVolume)}</p>
            <p className="text-xs mt-1.5" style={{ color: COLORS.textMuted }}>{text.kpi1Sub} · FY{year}</p>
          </div>

          <div className="rounded-2xl p-6 flex flex-col items-center text-center" style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}` }}>
            <p className="ff-mono text-[10px] uppercase tracking-widest mb-3 self-start" style={{ color: COLORS.textFaint }}>{text.kpi2Label}</p>
            <GaugeRing value={asiaShare} max={maxShare} color={COLORS.asia} track={COLORS.borderSoft} display={formatNumber(asiaShare, 'percent')} />
            <p className="text-xs mt-2" style={{ color: COLORS.textMuted }}>{text.kpi2Sub} · FY{year}</p>
          </div>

          <div className="rounded-2xl p-6" style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}` }}>
            <p className="ff-mono text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1.5" style={{ color: COLORS.textFaint }}><Award className="w-3 h-3" /> {text.kpi3Label}</p>
            <p className="ff-display text-3xl font-bold tracking-tight">{lang === 'ja' ? salesLeader.nameJa : salesLeader.name}</p>
            <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: COLORS.textMuted }}>
              {formatNumber(salesLeader.sales)} {text.units}
              <span className="inline-flex items-center gap-0.5 font-semibold" style={{ color: COLORS.na }}><ArrowUpRight className="w-3 h-3" />{salesLeader.growth}%</span>
            </p>
          </div>
        </div>

        {/* line + bar */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

          {/* line */}
          <div className="rounded-2xl p-6" style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}` }}>
            <h3 className="ff-display text-lg font-bold tracking-tight mb-1">{text.chart1Title}</h3>
            <p className="text-xs mb-5" style={{ color: COLORS.textMuted }}>{text.chart1Context}</p>

            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto" onMouseLeave={hideTip}>
              {[0.25, 0.5, 0.75].map((ratio, i) => {
                const yPos = chartHeight - 46 - (ratio * (chartHeight - 76));
                const val = metric === 'share' ? ratio * maxShare : ratio * maxVolume;
                return (
                  <g key={i}>
                    <line x1="55" y1={yPos} x2={chartWidth - 20} y2={yPos} stroke={COLORS.borderSoft} strokeWidth="1" strokeDasharray="3 4" />
                    <text x="48" y={yPos + 4} fill={COLORS.textFaint} fontSize="10" textAnchor="end" className="ff-mono">{metric === 'share' ? formatNumber(val, 'percent') : formatNumber(val)}</text>
                  </g>
                );
              })}
              <line x1="55" y1={chartHeight - 46} x2={chartWidth - 20} y2={chartHeight - 46} stroke={COLORS.border} strokeWidth="1.5" />

              {chart1Lines.map((line, li) => (
                <g key={li}>
                  <path d={line.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')} fill="none" stroke={line.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {line.points.map((p, i) => (
                    <circle
                      key={i} cx={p.x} cy={p.y} r="4.5" fill={COLORS.bg} stroke={line.color} strokeWidth="2.5"
                      className="cursor-pointer"
                      onMouseEnter={(e) => showTip(e, `${line.label} · FY${p.year}`, [{ label: text.metricVol.split(' ')[0], value: metric === 'share' ? formatNumber(p.value, 'percent') : formatNumber(p.value), color: line.color }])}
                    />
                  ))}
                </g>
              ))}
              {regionalGrowthData.map((d, i) => (
                <text key={i} x={(i / (regionalGrowthData.length - 1)) * (chartWidth - 110) + 60} y={chartHeight - 14} fill={COLORS.textFaint} fontSize="10" fontWeight="600" textAnchor="middle" className="ff-mono">{d.year}</text>
              ))}
            </svg>

            <div className="flex flex-wrap gap-4 mt-5 pt-4" style={{ borderTop: `1px solid ${COLORS.borderSoft}` }}>
              {chart1Lines.map(line => (
                <div key={line.id} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: line.color }} />
                  <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>{line.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* bar */}
          <div className="rounded-2xl p-6" style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}` }}>
            <h3 className="ff-display text-lg font-bold tracking-tight mb-1">{text.chart2Title} — {year}</h3>
            <p className="text-xs mb-5" style={{ color: COLORS.textMuted }}>{text.chart2Context}</p>

            <div className="space-y-5">
              {[...currentManufacturers].sort((a, b) => b.sales - a.sales).map((mfg, idx) => {
                const barWidth = (mfg.sales / maxMfgSales) * 100;
                const resolvedName = lang === 'ja' ? mfg.nameJa : mfg.name;
                return (
                  <div key={`${year}-${idx}`} className="space-y-1.5">
                    <div className="flex justify-between items-end text-xs">
                      <span className="font-semibold">{resolvedName}</span>
                      <span className="ff-mono" style={{ color: COLORS.textFaint }}>{formatNumber(mfg.sales)} {text.units}</span>
                    </div>
                    <div
                      className="w-full h-3.5 rounded-full overflow-hidden cursor-pointer"
                      style={{ background: COLORS.borderSoft }}
                      onMouseEnter={(e) => showTip(e, resolvedName, [
                        { label: text.colSales, value: `${formatNumber(mfg.sales)} ${text.units}` },
                        { label: text.colGrowth, value: `+${mfg.growth}%`, color: COLORS.na }
                      ])}
                      onMouseLeave={hideTip}
                    >
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${barWidth}%`, background: `linear-gradient(90deg, #14969E, ${COLORS.na})` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* stacked bar + area */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

          {/* stacked composition */}
          <div className="rounded-2xl p-6" style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}` }}>
            <h3 className="ff-display text-lg font-bold tracking-tight mb-1">{text.chart3Title}</h3>
            <p className="text-xs mb-5" style={{ color: COLORS.textMuted }}>{text.chart3Context}</p>

            <div className="space-y-5">
              {batteryTechData.map((d, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="ff-mono text-[11px]" style={{ color: COLORS.textFaint }}>{text.tooltipYear} {d.year}</div>
                  <div className="flex w-full h-7 rounded-lg overflow-hidden">
                    {[
                      { key: 'nmc', val: d.nmc, color: '#4B5563', label: text.batteryNMC },
                      { key: 'lfp', val: d.lfp, color: COLORS.na, label: text.batteryLFP },
                      { key: 'solid', val: d.solid, color: COLORS.eu, label: text.batterySolid },
                    ].map(seg => (
                      <div
                        key={seg.key}
                        className="h-full flex items-center justify-center text-[10px] font-semibold ff-mono cursor-pointer transition-opacity"
                        style={{ width: `${seg.val}%`, background: seg.color, color: '#04211E' }}
                        onMouseEnter={(e) => showTip(e, `${seg.label} · ${text.tooltipYear} ${d.year}`, [{ label: text.chart3Title.split(' ')[0], value: `${seg.val}%`, color: seg.color }])}
                        onMouseLeave={hideTip}
                      >{seg.val}%</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-5 pt-4" style={{ borderTop: `1px solid ${COLORS.borderSoft}` }}>
              {batteryLegend.map(b => (
                <div key={b.key} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: b.color }} />
                  <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* area */}
          <div className="rounded-2xl p-6" style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}` }}>
            <h3 className="ff-display text-lg font-bold tracking-tight mb-1 flex items-center gap-2"><BatteryCharging className="w-4 h-4" style={{ color: COLORS.na }} />{text.chart4Title}</h3>
            <p className="text-xs mb-5" style={{ color: COLORS.textMuted }}>{text.chart4Context}</p>

            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto" onMouseLeave={hideTip}>
              {[200000, 400000, 600000].map((tick, i) => {
                const y = chartHeight - 46 - (tick / maxInfra) * (chartHeight - 76);
                return (
                  <g key={i}>
                    <line x1="55" y1={y} x2={chartWidth - 20} y2={y} stroke={COLORS.borderSoft} strokeDasharray="3 4" />
                    <text x="48" y={y + 4} fill={COLORS.textFaint} fontSize="10" textAnchor="end" className="ff-mono">{formatNumber(tick)}</text>
                  </g>
                );
              })}
              <line x1="55" y1={chartHeight - 46} x2={chartWidth - 20} y2={chartHeight - 46} stroke={COLORS.border} strokeWidth="1.5" />
              <defs>
                <linearGradient id="infraFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.na} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={COLORS.na} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={infraAreaPath} fill="url(#infraFill)" />
              <path d={infraPath} fill="none" stroke={COLORS.na} strokeWidth="2.5" strokeLinecap="round" />
              {infraPoints.map((p, i) => (
                <circle
                  key={i} cx={p.x} cy={p.y} r="4.5" fill={COLORS.bg} stroke={COLORS.na} strokeWidth="2.5"
                  className="cursor-pointer"
                  onMouseEnter={(e) => showTip(e, `${text.tooltipYear} ${p.year}`, [{ label: text.chart4Title, value: formatNumber(p.val), color: COLORS.na }])}
                />
              ))}
              {infraPoints.map((p, i) => (
                <text key={i} x={p.x} y={chartHeight - 14} fill={COLORS.textFaint} fontSize="10" fontWeight="600" textAnchor="middle" className="ff-mono">{p.year}</text>
              ))}
            </svg>
          </div>
        </div>

        {/* table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}` }}>
          <div className="p-6" style={{ borderBottom: `1px solid ${COLORS.borderSoft}` }}>
            <h3 className="ff-display text-lg font-bold tracking-tight mb-0.5">{text.tableTitle} — {year}</h3>
            <p className="text-xs" style={{ color: COLORS.textMuted }}>{text.tableContext}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="ff-mono text-[10px] uppercase tracking-widest" style={{ color: COLORS.textFaint, borderBottom: `1px solid ${COLORS.borderSoft}` }}>
                  <th className="p-4 pl-6">{text.colRank}</th>
                  <th className="p-4">{text.colMfg}</th>
                  <th className="p-4">{text.colSales}</th>
                  <th className="p-4">{text.colGrowth}</th>
                  <th className="p-4 pr-6">{text.colChem}</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[...currentManufacturers].sort((a, b) => b.sales - a.sales).map((mfg, idx) => (
                  <tr key={idx} className="transition-colors" style={{ borderBottom: `1px solid ${COLORS.borderSoft}` }}>
                    <td className="p-4 pl-6 ff-mono text-xs" style={{ color: COLORS.textFaint }}>0{idx + 1}</td>
                    <td className="p-4 font-semibold">{lang === 'ja' ? mfg.nameJa : mfg.name}</td>
                    <td className="p-4 ff-mono">{formatNumber(mfg.sales)}</td>
                    <td className="p-4 ff-mono font-semibold" style={{ color: COLORS.na }}>+{mfg.growth}%</td>
                    <td className="p-4 pr-6 text-xs" style={{ color: COLORS.textMuted }}>{mfg.chemistry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="px-5 py-8 text-center" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <p className="ff-mono text-[11px]" style={{ color: COLORS.textFaint }}>{text.footerNote}</p>
      </footer>
    </div>
  );
}

/* charge-ring gauge used for the Asia market-share KPI */
function GaugeRing({ value, max, color, track, display }: any) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const pct = Math.min(Math.max(value / max, 0), 1);
  const offset = c * (1 - pct);
  return (
    <div className="relative w-28 h-28">
      <svg viewBox="0 0 108 108" className="w-full h-full -rotate-90">
        <circle cx="54" cy="54" r={r} fill="none" stroke={track} strokeWidth="9" />
        <circle
          cx="54" cy="54" r={r} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 700ms ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="ff-mono font-bold text-xl">{display}</span>
      </div>
    </div>
  );
}