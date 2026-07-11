// dashboardData.ts

export interface RegionalData {
  year: number;
  "North America": { volume: number; marketShare: number };
  Europe: { volume: number; marketShare: number };
  Asia: { volume: number; marketShare: number };
}

export interface ManufacturerData {
  [year: number]: {
    name: string;
    nameJa: string;
    sales: number;
    growth: number;
    chemistry: string;
  }[];
}

export const regionalGrowthData: RegionalData[] = [
  { year: 2021, "North America": { volume: 450000, marketShare: 4.2 }, Europe: { volume: 1200000, marketShare: 10.5 }, Asia: { volume: 2100000, marketShare: 12.1 } },
  { year: 2022, "North America": { volume: 800000, marketShare: 6.8 }, Europe: { volume: 1600000, marketShare: 14.2 }, Asia: { volume: 3400000, marketShare: 18.5 } },
  { year: 2023, "North America": { volume: 1200000, marketShare: 9.1 }, Europe: { volume: 2200000, marketShare: 19.3 }, Asia: { volume: 5100000, marketShare: 24.0 } },
  { year: 2024, "North America": { volume: 1600000, marketShare: 12.4 }, Europe: { volume: 2900000, stroke: '#059669', marketShare: 23.8 }, Asia: { volume: 6800000, marketShare: 31.2 } },
  { year: 2025, "North America": { volume: 2100000, marketShare: 15.8 }, Europe: { volume: 3700000, marketShare: 28.5 }, Asia: { volume: 8500000, marketShare: 39.5 } }
];

export const manufacturerSalesData: ManufacturerData = {
  2023: [
    { name: "Tesla", nameJa: "テスラ", sales: 1800000, growth: 38, chemistry: "NMC / LFP" },
    { name: "BYD", nameJa: "比亜迪", sales: 1570000, growth: 62, chemistry: "LFP Blade" },
    { name: "VW Group", nameJa: "VWグループ", sales: 770000, growth: 15, chemistry: "NMC" },
    { name: "Geely", nameJa: "吉利汽車", sales: 460000, growth: 22, chemistry: "NMC" }
  ],
  2024: [
    { name: "Tesla", nameJa: "テスラ", sales: 2200000, growth: 22, chemistry: "NMC / LFP" },
    { name: "BYD", nameJa: "比亜迪", sales: 2400000, growth: 52, chemistry: "LFP Blade" },
    { name: "VW Group", nameJa: "VWグループ", sales: 920000, growth: 19, chemistry: "NMC" },
    { name: "Geely", nameJa: "吉利汽車", sales: 680000, growth: 47, chemistry: "LFP / NMC" }
  ],
  2025: [
    { name: "Tesla", nameJa: "テスラ", sales: 2500000, growth: 13, chemistry: "LFP / 4680" },
    { name: "BYD", nameJa: "比亜迪", sales: 3100000, growth: 29, chemistry: "LFP / Solid-State Prototype" },
    { name: "VW Group", nameJa: "VWグループ", sales: 1150000, growth: 25, chemistry: "NMC / LFP" },
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
    title: "AeroDynamics EV",
    langLabel: "Language",
    genAiDisclaimer: "Dataset Note: Visualization powered by AI-generated synthetic market data.",
    heroBadge: "Q3 Global Market Report",
    heroTitle: "Global EV Market ",
    heroTitleHighlight: "Telemetry Platform",
    heroSub: "Professional-grade analytics platform tracking regional adoption curves, battery chemistry supply chains, and production output data.",
    
    filterYear: "Fiscal Year",
    filterMetric: "Primary Metric",
    applyBtn: "Apply Configurations ↓",
    
    presetTitle: "Quick-Action Parameter Presets",
    preset1Title: "2025 Volume Max",
    preset1Sub: "Set dashboard to 2025 Sales Volumes",
    preset2Title: "Market Share Shift",
    preset2Sub: "Set dashboard to 2024 Shares",
    preset3Title: "Historical Baseline",
    preset3Sub: "Set dashboard to 2023 Shares",
    
    kpi1: "Global Cumulative Volume",
    kpi2: "Highest Growth Grid",
    kpi3: "Market Share Leader",
    
    chart1Title: "Regional Adoption Trajectory (2021 - 2025)",
    chart1Context: "Tracks continuous year-over-year electric vehicle distribution curves within target infrastructure blocks.",
    chart2Title: "Manufacturer Production Profiles",
    chart2Context: "Provides cross-sectional categorical volume output matching chosen localized criteria.",
    chart3Title: "Battery Chemistry Composition Mix (%)",
    chart3Context: "Monitors categorical parts-of-a-whole baseline transitions across global raw material supply constraints.",
    chart4Title: "DC Ultra-Fast Charging Nodes Deployed",
    chart4Context: "Cumulative infrastructure deployment footprint cross-referenced against global network capacity.",
    
    tableTitle: "Granular Manufacturer Telemetry Matrix",
    tableContext: "Raw tabular dataset for deep verification auditing.",
    colRank: "Rank",
    colMfg: "Manufacturer",
    colSales: "Units Dispatched",
    colGrowth: "YoY Acceleration",
    colChem: "Primary Battery Family",
    
    toggleMetric: "Active Metric:",
    metricShare: "Market Share (%)",
    metricVol: "Volume (Units)",
    regionNA: "North America",
    regionEU: "Europe",
    regionAS: "Asia",
    sales: "Units",
    tooltipYear: "FY"
  },
  ja: {
    title: "AeroDynamics EV",
    langLabel: "言語",
    genAiDisclaimer: "データセット注記: この視覚化はAI生成の合成市場データによって提供されています。",
    heroBadge: "第3四半期 世界市場レポート",
    heroTitle: "グローバルEV市場",
    heroTitleHighlight: "テレメトリプラットフォーム",
    heroSub: "地域別の普及曲線、バッテリー化学組成のサプライチェーン、および製造出力データを追跡するプロフェッショナル向け分析プラットフォーム。",
    
    filterYear: "会計年度",
    filterMetric: "主要指標",
    applyBtn: "設定を適用してダッシュボードを表示 ↓",
    
    presetTitle: "クイックアクション・パラメータプリセット",
    preset1Title: "2025年 最大生産量",
    preset1Sub: "ダッシュボードを2025年の販売台数に設定",
    preset2Title: "市場シェアの推移",
    preset2Sub: "ダッシュボードを2024年の市場シェアに設定",
    preset3Title: "過去のベースライン",
    preset3Sub: "ダッシュボードを2023年の市場シェアに設定",
    
    kpi1: "グローバル累計販売台数",
    kpi2: "最高成長グリッド",
    kpi3: "市場シェアリーダー",
    
    chart1Title: "地域別普及の軌跡 (2021年 - 2025年)",
    chart1Context: "対象インフラブロック内における電気自動車の継続的な前年比普及曲線を追跡します。",
    chart2Title: "メーカー生産実績プロファイル",
    chart2Context: "選択されたローカライズ基準に一致する横断的なカテゴリ別生産数量を出力します。",
    chart3Title: "バッテリー化学組成構成ミックス (%)",
    chart3Context: "世界的な原材料供給の制約全体における、カテゴリ別の全体に対する部分の推移を監視します。",
    chart4Title: "展開されたDC超急速充電ノード数",
    chart4Context: "世界的なネットワーク容量とクロスリファレンスされた、累積的なインフラストラクチャ展開フットプリント。",
    
    tableTitle: "メーカー別詳細テレメトリマトリクス",
    tableContext: "詳細な検証監査のための生の表形式データセット。",
    colRank: "順位",
    colMfg: "メーカー",
    colSales: "出荷台数",
    colGrowth: "前年比加速",
    colChem: "主要バッテリーファミリー",
    
    toggleMetric: "有効な指標:",
    metricShare: "市場シェア (%)",
    metricVol: "生産台数 (ユニット)",
    regionNA: "北米",
    regionEU: "欧州",
    regionAS: "アジア",
    sales: "台",
    tooltipYear: "年度"
  }
};