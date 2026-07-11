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
    { name: "Tesla", nameJa: "テスラ", sales: 1800000 },
    { name: "BYD", nameJa: "比亜迪", sales: 1570000 },
    { name: "VW Group", nameJa: "VWグループ", sales: 770000 },
    { name: "Geely", nameJa: "吉利汽車", sales: 460000 }
  ],
  2024: [
    { name: "Tesla", nameJa: "テスラ", sales: 2200000 },
    { name: "BYD", nameJa: "比亜迪", sales: 2400000 },
    { name: "VW Group", nameJa: "VWグループ", sales: 920000 },
    { name: "Geely", nameJa: "吉利汽車", sales: 680000 }
  ],
  2025: [
    { name: "Tesla", nameJa: "テスラ", sales: 2500000 },
    { name: "BYD", nameJa: "比亜迪", sales: 3100000 },
    { name: "VW Group", nameJa: "VWグループ", sales: 1150000 },
    { name: "Geely", nameJa: "吉利汽車", sales: 950000 }
  ]
};

// UI Localization dictionary matching project constraints
export const dict = {
  en: {
    title: "EV Market Insight Dashboard",
    sub: "Global trends in electric vehicle infrastructure and manufacturing.",
    genAiDisclaimer: "⚠️ Notice: This dashboard displays synthetic market data generated for evaluation purposes.",
    langLabel: "Language / 言語",
    chart1Title: "Regional Adoption Trends (2021-2025)",
    chart2Title: "Top Manufacturer Performance Profiles",
    toggleMetric: "Toggle Display Metric:",
    metricShare: "Market Share (%)",
    metricVol: "Sales Volume (Units)",
    selectYear: "Filter Reporting Year:",
    regionNA: "North America",
    regionEU: "Europe",
    regionAS: "Asia",
    sales: "Units Sold"
  },
  ja: {
    title: "EV市場インサイト・ダッシュボード",
    sub: "電気自動車の普及インフラと製造における世界的動向。",
    genAiDisclaimer: "⚠️ 注意: このダッシュボードは評価目的で生成された人工的（合成）データを使用しています。",
    langLabel: "Language / 言語",
    chart1Title: "地域別普及推移 (2021-2025)",
    chart2Title: "主要メーカー実績プロファイル",
    toggleMetric: "表示指標の切り替え:",
    metricShare: "市場シェア (%)",
    metricVol: "販売台数 (ユニット)",
    selectYear: "レポート対象年の選択:",
    regionNA: "北米",
    regionEU: "欧州",
    regionAS: "アジア",
    sales: "販売台数"
  }
};