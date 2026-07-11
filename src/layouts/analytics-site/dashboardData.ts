export const regionalGrowthData = [
  { year: 2021, "North America": { volume: 450000, marketShare: 4.2 }, Europe: { volume: 1200000, marketShare: 10.5 }, Asia: { volume: 2100000, marketShare: 12.1 } },
  { year: 2022, "North America": { volume: 800000, marketShare: 6.8 }, Europe: { volume: 1600000, marketShare: 14.2 }, Asia: { volume: 3400000, marketShare: 18.5 } },
  { year: 2023, "North America": { volume: 1200000, marketShare: 9.1 }, Europe: { volume: 2200000, marketShare: 19.3 }, Asia: { volume: 5100000, marketShare: 24.0 } },
  { year: 2024, "North America": { volume: 1600000, marketShare: 12.4 }, Europe: { volume: 2900000, marketShare: 23.8 }, Asia: { volume: 6800000, marketShare: 31.2 } },
  { year: 2025, "North America": { volume: 2100000, marketShare: 15.8 }, Europe: { volume: 3700000, marketShare: 28.5 }, Asia: { volume: 8500000, marketShare: 39.5 } }
];

export const manufacturerSalesData = {
  2023: [
    { name: "Tesla", nameJa: "テスラ", sales: 1800000, growth: 38, chemistry: "NMC / LFP" },
    { name: "BYD", nameJa: "BYD", sales: 1570000, growth: 62, chemistry: "LFP Blade" },
    { name: "VW Group", nameJa: "フォルクスワーゲン グループ", sales: 770000, growth: 15, chemistry: "NMC" },
    { name: "Geely", nameJa: "吉利汽車", sales: 460000, growth: 22, chemistry: "NMC" }
  ],
  2024: [
    { name: "Tesla", nameJa: "テスラ", sales: 2200000, growth: 22, chemistry: "NMC / LFP" },
    { name: "BYD", nameJa: "BYD", sales: 2400000, growth: 52, chemistry: "LFP Blade" },
    { name: "VW Group", nameJa: "フォルクスワーゲン グループ", sales: 920000, growth: 19, chemistry: "NMC" },
    { name: "Geely", nameJa: "吉利汽車", sales: 680000, growth: 47, chemistry: "LFP / NMC" }
  ],
  2025: [
    { name: "Tesla", nameJa: "テスラ", sales: 2500000, growth: 13, chemistry: "LFP / 4680" },
    { name: "BYD", nameJa: "BYD", sales: 3100000, growth: 29, chemistry: "LFP / Solid-State Prototype" },
    { name: "VW Group", nameJa: "フォルクスワーゲン グループ", sales: 1150000, growth: 25, chemistry: "NMC / LFP" },
    { name: "Geely", nameJa: "吉利汽車", sales: 950000, growth: 39, chemistry: "LFP / Solid-State" }
  ]
};

export const batteryTechData = [
  { year: 2023, nmc: 65, lfp: 30, solid: 5 },
  { year: 2024, nmc: 55, lfp: 40, solid: 5 },
  { year: 2025, nmc: 45, lfp: 45, solid: 10 }
];

export const infraData = [
  { year: 2021, nodes: 120000 },
  { year: 2022, nodes: 180000 },
  { year: 2023, nodes: 290000 },
  { year: 2024, nodes: 450000 },
  { year: 2025, nodes: 720000 }
];

export const dict = {
  en: {
    locale: 'en-US',
    title: "VoltGrid",
    tagline: "EV Market Telemetry",
    genAiDisclaimer: "All figures on this page are AI-generated synthetic data, built for a coursework prototype — not real market data.",
    heroBadge: "2021–2025 Global Snapshot",
    heroTitle: "Global EV market, ",
    heroTitleHighlight: "read like a dashboard.",
    heroSub: "Track how electric vehicle adoption, manufacturer output, battery chemistry and charging infrastructure moved across three regions — filter by year and metric to see the story change.",

    filterYear: "Fiscal year",
    filterMetric: "Primary metric",
    applyBtn: "Update dashboard",

    presetTitle: "Jump to a view",
    preset1Title: "2025 sales volume",
    preset1Sub: "Latest forecasted unit sales",
    preset2Title: "2024 market share",
    preset2Sub: "Share shift, verified year",
    preset3Title: "2023 baseline",
    preset3Sub: "Where the market stood",

    kpi1Label: "Combined volume",
    kpi1Sub: "North America + Europe + Asia",
    kpi2Label: "Asia market share",
    kpi2Sub: "of global EV sales",
    kpi3Label: "Sales leader",
    kpi3Sub: "by units sold this year",

    chart1Title: "Regional adoption, 2021–2025",
    chart1Context: "How each region's electric vehicle output has grown year over year. Hover a point for the exact figure.",
    chart2Title: "Manufacturer output",
    chart2Context: "Units sold by the four largest manufacturers in the selected year, ranked highest to lowest.",
    chart3Title: "Battery chemistry mix",
    chart3Context: "Share of new vehicles using each battery chemistry, by year. Hover a bar to isolate it.",
    chart4Title: "Fast-charging network growth",
    chart4Context: "Cumulative DC fast-charging nodes deployed worldwide. Hover a point for the yearly total.",

    tableTitle: "Manufacturer detail",
    tableContext: "Full figures behind the chart above, for the selected year.",
    colRank: "Rank",
    colMfg: "Manufacturer",
    colSales: "Units sold",
    colGrowth: "YoY growth",
    colChem: "Battery chemistry",

    metricShare: "Market share (%)",
    metricVol: "Volume (units)",
    regionNA: "North America",
    regionEU: "Europe",
    regionAS: "Asia",
    units: "units",
    tooltipYear: "FY",
    batteryNMC: "High-nickel NMC",
    batteryLFP: "Lithium iron (LFP)",
    batterySolid: "Solid-state",
    dataAsOf: "Data compiled",
    footerNote: "SEG3125 — Analysis and Design of User Interfaces, Assignment 5. Designed by Taha Rashid (300403833). Professor Caroline Barrière",
  },
  ja: {
    locale: 'ja-JP',
    title: "VoltGrid",
    tagline: "EV市場テレメトリー",
    genAiDisclaimer: "このページの数値はすべてAIが生成した合成データであり、授業課題用のプロトタイプです。実際の市場データではありません。",
    heroBadge: "2021年〜2025年 世界スナップショット",
    heroTitle: "グローバルEV市場を、",
    heroTitleHighlight: "ダッシュボードで読む。",
    heroSub: "3つの地域における電気自動車の普及、メーカー別生産台数、電池化学組成、充電インフラの推移を追跡。年度と指標を切り替えると、見え方が変わります。",

    filterYear: "会計年度",
    filterMetric: "主要指標",
    applyBtn: "ダッシュボードを更新",

    presetTitle: "表示を切り替える",
    preset1Title: "2025年 販売台数",
    preset1Sub: "最新の予測販売台数",
    preset2Title: "2024年 市場シェア",
    preset2Sub: "検証済み年度のシェア推移",
    preset3Title: "2023年 基準値",
    preset3Sub: "当時の市場の状況",

    kpi1Label: "合計販売台数",
    kpi1Sub: "北米＋欧州＋アジア",
    kpi2Label: "アジアの市場シェア",
    kpi2Sub: "世界のEV販売に占める割合",
    kpi3Label: "販売台数首位",
    kpi3Sub: "今年度の販売台数ベース",

    chart1Title: "地域別普及率（2021年〜2025年）",
    chart1Context: "各地域の電気自動車生産台数の前年比推移。ポイントにカーソルを合わせると数値が表示されます。",
    chart2Title: "メーカー別生産台数",
    chart2Context: "選択した年度における上位4メーカーの販売台数（多い順）。",
    chart3Title: "電池化学組成の構成比",
    chart3Context: "年度別の電池化学組成の割合。バーにカーソルを合わせると強調表示されます。",
    chart4Title: "急速充電網の拡大",
    chart4Context: "世界で導入されたDC急速充電ノードの累計数。ポイントにカーソルを合わせると年度別の合計が表示されます。",

    tableTitle: "メーカー別詳細",
    tableContext: "上記グラフの元データ（選択年度）。",
    colRank: "順位",
    colMfg: "メーカー",
    colSales: "販売台数",
    colGrowth: "前年比成長率",
    colChem: "電池化学組成",

    metricShare: "市場シェア（%）",
    metricVol: "販売台数",
    regionNA: "北米",
    regionEU: "欧州",
    regionAS: "アジア",
    units: "台",
    tooltipYear: "年度",
    batteryNMC: "ハイニッケルNMC",
    batteryLFP: "リン酸鉄リチウム（LFP）",
    batterySolid: "全固体電池",
    dataAsOf: "データ作成日",
    footerNote: "SEG3125「ユーザーインターフェースの分析と設計」課題5のために制作した。製作者：ラシドタハ。教授：先生 Barrière, Caroline ",
  }
};

export const COLORS = {
  bg: '#0A0E13',
  panel: '#12181F',
  panelAlt: '#0E141A',
  border: '#232C36',
  borderSoft: '#1A222B',
  textPrimary: '#EDF2F6',
  textMuted: '#8695A4',
  textFaint: '#586472',
  na: '#2DD4BF',   // teal — North America
  eu: '#F5A623',   // amber — Europe
  asia: '#8B7FF0', // violet — Asia
  bar: '#2DD4BF',
};