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
    { year: 2024, "North America": { volume: 1600000, marketShare: 12.4 }, Europe: { volume: 2900000, marketShare: 23.8 }, Asia: { volume: 6800000, marketShare: 31.2 } },
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
      heroBadge: "Q3 Market Report",
      heroTitle: "Global EV Market ",
      heroTitleHighlight: "Telemetry",
      heroSub: "Professional-grade analytics platform tracking regional adoption firmware, battery supply chain metrics, and manufacturer output data.",
      
      filterYear: "Fiscal Year",
      filterMetric: "Primary Metric",
      applyBtn: "Apply & View Dashboard ↓",
      
      presetTitle: "Quick Analysis Presets",
      preset1Title: "2025 Volume Max",
      preset1Sub: "Set to 2025 Sales Volume",
      preset2Title: "Market Share Shift",
      preset2Sub: "Set to 2024 Market Share",
      preset3Title: "Historical Baseline",
      preset3Sub: "Set to 2023 Market Share",
      
      kpi1: "Global Baseline Volume",
      kpi2: "Highest Growth Grid",
      kpi3: "Leading Manufacturer",
      
      chart1Title: "Regional Adoption Trajectory",
      chart2Title: "Manufacturer Output Profiles",
      chart3Title: "Battery Chemistry Evolution (%)",
      chart4Title: "DC Fast-Charging Nodes Deployed",
      
      tableTitle: "Manufacturer Granular Data",
      colRank: "Rank",
      colMfg: "Manufacturer",
      colSales: "Units Sold",
      colGrowth: "YoY Growth",
      colChem: "Primary Chemistry",
      
      toggleMetric: "Metric:",
      metricShare: "Market Share (%)",
      metricVol: "Volume (Units)",
      regionNA: "North America",
      regionEU: "Europe",
      regionAS: "Asia",
      sales: "Units"
    },
    ja: {
      title: "AeroDynamics EV",
      langLabel: "言語",
      genAiDisclaimer: "データセット注記: この視覚化はAI生成の合成市場データによって提供されています。",
      heroBadge: "第3四半期市場レポート",
      heroTitle: "グローバルEV市場",
      heroTitleHighlight: "テレメトリ",
      heroSub: "地域別の普及ファームウェア、バッテリーサプライチェーンの指標、およびメーカーの生産データを追跡するプロフェッショナル向け分析プラットフォーム。",
      
      filterYear: "会計年度",
      filterMetric: "主要指標",
      applyBtn: "適用してダッシュボードを表示 ↓",
      
      presetTitle: "クイック分析プリセット",
      preset1Title: "2025年 最大生産量",
      preset1Sub: "2025年の販売台数に設定",
      preset2Title: "市場シェアの推移",
      preset2Sub: "2024年の市場シェアに設定",
      preset3Title: "過去のベースライン",
      preset3Sub: "2023年の市場シェアに設定",
      
      kpi1: "グローバル基準台数",
      kpi2: "最高成長グリッド",
      kpi3: "トップメーカー",
      
      chart1Title: "地域別普及の軌跡",
      chart2Title: "メーカー生産プロファイル",
      chart3Title: "バッテリー化学組成の進化 (%)",
      chart4Title: "DC急速充電ノードの展開",
      
      tableTitle: "メーカー別詳細データ",
      colRank: "順位",
      colMfg: "メーカー",
      colSales: "販売台数",
      colGrowth: "前年比成長",
      colChem: "主要バッテリー",
      
      toggleMetric: "指標:",
      metricShare: "市場シェア (%)",
      metricVol: "生産台数 (ユニット)",
      regionNA: "北米",
      regionEU: "欧州",
      regionAS: "アジア",
      sales: "台"
    }
  };