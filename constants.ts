import { NavItem, MarketPrice, ExporterImporterStat, YoYGrowthData, TradeSnapshotData, Article, TradeType, TradeVolumeDataPoint, TradePerformanceData, MarketPriceDetail, HarvestActivityDataPoint, HarvestCalendarEntry, ProductionInsight, SeasonIndicator, DropdownOption, SupplierTypeDropdownOption } from './types';

export const APP_NAME = "The World's First Pomegranate Intelligence Agency";

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'market-pulse', label: 'Market Pulse' },
  { id: 'trade-data', label: 'Trade Data' },
  { id: 'market-prices', label: 'Market Prices' },
  { id: 'seasonality', label: 'Seasonality' },
];

export const REGION_OPTIONS: DropdownOption[] = [
  { value: 'global', label: 'Global' },
  { value: 'usa', label: 'USA' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia', label: 'Asia' },
];

export const TIME_RANGE_OPTIONS: DropdownOption[] = [
  { value: 'yearly', label: 'Yearly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'monthly', label: 'Monthly' },
];

export const MARKET_PRICES_DATA: MarketPrice[] = [
  { country: 'Peru', price: 12.00, previousPrice: 12.10, lastUpdate: '16 APR 2025' },
  { country: 'Spain', price: 13.00, previousPrice: 13.20, lastUpdate: '15 APR 2025' },
  { country: 'South Africa', price: 0, previousPrice: 0, lastUpdate: '14 APR 2025' },
  { country: 'USA', price: 14.00, previousPrice: 14.10, lastUpdate: '16 APR 2025' },
  { country: 'Turkey', price: 10.10, previousPrice: 10.00, lastUpdate: '13 APR 2025' },
];

export const TOP_EXPORTERS_DATA: Record<string, ExporterImporterStat[]> = {
  yearly: [
    { country: 'Turkey', marketShare: 25 },
    { country: 'India', marketShare: 20 },
    { country: 'USA', marketShare: 15 },
    { country: 'Spain', marketShare: 12 },
    { country: 'Peru', marketShare: 10 },
  ],
  quarterly: [
    { country: 'Turkey', marketShare: 22 },
    { country: 'India', marketShare: 21 },
    { country: 'USA', marketShare: 16 },
    { country: 'Spain', marketShare: 13 },
    { country: 'Peru', marketShare: 11 },
  ],
  monthly: [
    { country: 'Turkey', marketShare: 20 },
    { country: 'India', marketShare: 19 },
    { country: 'USA', marketShare: 17 },
    { country: 'Spain', marketShare: 14 },
    { country: 'Peru', marketShare: 12 },
  ],
};

export const TOP_IMPORTERS_DATA: Record<string, ExporterImporterStat[]> = {
  yearly: [
    { country: 'Germany', marketShare: 18 },
    { country: 'Netherlands', marketShare: 15 },
    { country: 'UK', marketShare: 12 },
    { country: 'Russia', marketShare: 10 },
    { country: 'UAE', marketShare: 9 },
  ],
  quarterly: [
    { country: 'Germany', marketShare: 17 },
    { country: 'Netherlands', marketShare: 16 },
    { country: 'UK', marketShare: 13 },
    { country: 'Russia', marketShare: 11 },
    { country: 'UAE', marketShare: 10 },
  ],
  monthly: [
    { country: 'Germany', marketShare: 16 },
    { country: 'Netherlands', marketShare: 14 },
    { country: 'UK', marketShare: 13 },
    { country: 'Russia', marketShare: 12 },
    { country: 'UAE', marketShare: 11 },
  ],
};

export const YOY_GROWTH_DATA: Record<string, YoYGrowthData[]> = {
  yearly: [
    { year: '2023', growth: 5.2 },
    { year: '2022', growth: -1.5 },
    { year: '2021', growth: 8.0 },
    { year: '2020', growth: 3.1 },
    { year: '2019', growth: -0.5 },
    { year: '2018', growth: 6.5 },
  ],
  quarterly: [
    { year: 'Q1 2024', growth: 2.1 },
    { year: 'Q4 2023', growth: 1.5 },
    { year: 'Q3 2023', growth: 2.8 },
    { year: 'Q2 2023', growth: 0.9 },
  ],
  monthly: [
    { year: 'Apr 2024', growth: 0.5 },
    { year: 'Mar 2024', growth: 0.3 },
    { year: 'Feb 2024', growth: 0.2 },
    { year: 'Jan 2024', growth: 0.1 },
  ],
};

export const TRADE_SNAPSHOT_DATA: Record<string, TradeSnapshotData> = {
  yearly: {
    topExporter: 'Peru',
    topImporter: 'USA',
    totalExportVolume: 5624,
    totalImportVolume: 5712,
    activeCountriesTracked: 8,
  },
  quarterly: {
    topExporter: 'Turkey',
    topImporter: 'Germany',
    totalExportVolume: 1400,
    totalImportVolume: 1500,
    activeCountriesTracked: 7,
  },
  monthly: {
    topExporter: 'India',
    topImporter: 'Netherlands',
    totalExportVolume: 400,
    totalImportVolume: 420,
    activeCountriesTracked: 6,
  },
};

export const ARTICLES_DATA: Article[] = [
  {
    id: 'red-gold-of-the-andes',
    image: '/images/peru.jpeg',
    countryTag: 'PERU',
    title: "Red Gold of the Andes: Peru's Pomegranate Push",
    subtitle: "RED GOLD OF THE ANDES",
    description: "Peru has emerged as the global leader in pomegranate exports, revolutionizing the industry with strategic agricultural investments and export infrastructure development.",
    date: 'June 5, 2025',
    fullContent: `Published by: Pomintel\nJune 5, 2025\nEditorial Desk – Pomintel Intelligence Division\n\nPeru has emerged as the global leader in pomegranate exports, revolutionizing the industry with strategic agricultural investments and export infrastructure development.\n\nKey Market Highlights:\n• Peru accounts for over 40% of global pomegranate exports\n• Export value has grown by 300% in the last decade\n• The country has successfully positioned itself as the premium supplier\n• Strategic harvest timing allows Peru to supply during off-seasons of other producers\n\nProduction Excellence:\nPeru's success stems from its unique geographic advantages - the coastal desert climate provides optimal growing conditions with minimal pest pressure. The country has invested heavily in modern irrigation systems and post-harvest technology, ensuring consistent quality that meets international standards.\n\nExport Strategy:\n• Primary markets: United States, Europe, and Asia\n• Focus on premium varieties like Wonderful and Red California\n• Investment in cold chain logistics for extended shelf life\n• Development of organic certification programs\n\nChallenges and Opportunities:\nWhile Peru leads the market, challenges remain including water scarcity concerns and increasing competition from emerging producers. However, the country's established infrastructure and quality reputation position it well for continued growth.\n\nFuture Outlook:\nIndustry experts predict Peru will maintain its leadership position through continued investment in technology and sustainable farming practices. The focus on premium markets and value-added products will drive further expansion.`,
    referenceUrl: undefined
  },
  { id: '2', image: '/images/spain.jpeg', countryTag: 'SPAIN', title: "Spain's Silent Ascent: Pomegranates at the Crossroads of Climate, Culture, and Commerce", subtitle: "SPAIN", description: 'Spain is not the loudest voice in the global pomegranate trade—but it may be one of the most quietly influential.', date: 'JUN 5, 2024', fullContent: 'Spain is not the loudest voice in the global pomegranate trade—but it may be one of the most quietly influential.\n\nDrought conditions affecting yield.\n\nSpanish pomegranate production is under pressure due to ongoing drought conditions in key growing regions. Farmers are struggling with water scarcity, which may impact both the quantity and quality of this year\'s crop.\n\nWater reservoirs are at historic lows, and restrictions on irrigation are being implemented. This situation could lead to higher prices for Spanish pomegranates and an increased demand for imports from other countries. The government is exploring long-term solutions, but immediate relief is uncertain.', referenceUrl: 'https://example.com/news/spain-drought-impact' },
  { id: '3', image: '/images/turkey.jpeg', countryTag: 'TURKEY', title: "Turkey's Pomegranate Legacy: Between Tradition and Trade Expansion", subtitle: "TURKEY", description: "Turkey stands as the world's third-largest pomegranate producer, with deep-rooted traditions in pomegranate cultivation dating back to the Hittite Empire. The country leverages both traditional knowledge and modern agricultural techniques to maintain its position in the global market.", date: 'June 5, 2025', fullContent: `Published by: Pomintel\nJune 5, 2025\nEditorial Desk – Pomintel Intelligence Division\n\nTurkey stands as the world's third-largest pomegranate producer, with deep-rooted traditions in pomegranate cultivation dating back to the Hittite Empire. The country leverages both traditional knowledge and modern agricultural techniques to maintain its position in the global market.\n\nHistorical Context:\n• Pomegranate cultivation in Turkey dates back over 4,000 years\n• The fruit holds cultural and religious significance in Turkish society\n• Traditional varieties like Hicaznar and Ekşinar remain popular\n• Ancient irrigation techniques combined with modern technology\n\nProduction Landscape:\nTurkey's main production regions include Antalya, Mersin, and Adana provinces along the Mediterranean coast. These areas benefit from ideal climate conditions and centuries of accumulated agricultural knowledge passed down through generations.\n\nMarket Position:\n• Third-largest global producer after Iran and India\n• Significant domestic consumption market\n• Growing export potential to European and Middle Eastern markets\n• Focus on traditional varieties with unique flavor profiles\n\nChallenges:\n• Fragmented farm structure with many small producers\n• Need for modernization in post-harvest handling\n• Competition from larger-scale producers\n• Climate change impacts on traditional growing regions\n\nInnovation and Development:\nRecent government initiatives focus on consolidating production, improving quality standards, and developing new export markets. Investment in processing facilities and cold storage infrastructure aims to extend the marketing season and add value to fresh production.\n\nFuture Strategy:\nTurkey's approach emphasizes quality over quantity, leveraging its unique varieties and traditional knowledge while adopting modern agricultural practices to compete in premium market segments.`, referenceUrl: undefined },
];

export const TRADE_VOLUME_CHART_DATA: TradeVolumeDataPoint[] = [
  { month: 'JAN', importVolume: 100, exportVolume: 120 }, { month: 'FEB', importVolume: 90, exportVolume: 110 },
  { month: 'MAR', importVolume: 110, exportVolume: 130 }, { month: 'APR', importVolume: 105, exportVolume: 140 },
  { month: 'MAY', importVolume: 120, exportVolume: 150 }, { month: 'JUN', importVolume: 95, exportVolume: 125 },
  { month: 'JUL', importVolume: 80, exportVolume: 110 }, { month: 'AUG', importVolume: 85, exportVolume: 100 },
  { month: 'SEP', importVolume: 130, exportVolume: 160 }, { month: 'OCT', importVolume: 150, exportVolume: 180 },
  { month: 'NOV', importVolume: 140, exportVolume: 170 }, { month: 'DEC', importVolume: 160, exportVolume: 190 },
];

export const TRADE_TYPE_OPTIONS: DropdownOption<TradeType>[] = [
    { value: TradeType.BOTH, label: 'Both Import & Export' },
    { value: TradeType.IMPORT, label: 'Import Only' },
    { value: TradeType.EXPORT, label: 'Export Only' },
];

export const INITIAL_TRADE_PERFORMANCE_DATA: TradePerformanceData[] = [
  { rank: 1, country: 'Peru', exportPrice: 1.68, totalExportValue: 1022304, importPrice: 1.15, totalImportValue: 1248543, yoyGrowth: -1.2 },
  { rank: 2, country: 'Spain', exportPrice: 1.51, totalExportValue: 1255950, importPrice: 1.83, totalImportValue: 1582441, yoyGrowth: 0.1 },
  { rank: 3, country: 'South Africa', exportPrice: 0.97, totalExportValue: 1643474, importPrice: 0.69, totalImportValue: 389878, yoyGrowth: -6.6 },
  { rank: 4, country: 'USA', exportPrice: 1.17, totalExportValue: 9685587, importPrice: 1.08, totalImportValue: 1156375, yoyGrowth: 2.6 },
  { rank: 5, country: 'Turkey', exportPrice: 1.05, totalExportValue: 428848, importPrice: 1.33, totalImportValue: 736406, yoyGrowth: -3.7 },
];

export const MARKET_PRICES_DETAIL_DATA: MarketPriceDetail[] = [
  { country: 'Peru', commodity: 'Pomegranate', price: 12.00, sources: [12.10, 11.90, 12.00], status: 'Fresh', lastUpdate: '16 APR 2025' },
  { country: 'Spain', commodity: 'Pomegranate', price: 13.00, sources: [0, 13.20, 12.80], status: '3-day old', lastUpdate: '15 APR 2025' },
  { country: 'South Africa', commodity: 'Pomegranate', price: 0, sources: [0, 0, 0], status: 'Stale', lastUpdate: '14 APR 2025' },
  { country: 'USA', commodity: 'Pomegranate', price: 14.00, sources: [14.10, 13.90, 14.00], status: 'Fresh', lastUpdate: '16 APR 2025' },
  { country: 'Turkey', commodity: 'Pomegranate', price: 10.10, sources: [10.00, 0, 10.20], status: '3-day old', lastUpdate: '13 APR 2025' },
];

export const MARKET_STATUS_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'fresh', label: 'Fresh' },
  { value: '2-day old', label: '2-day old' },
  { value: '3-day old', label: '3-day old' },
  { value: 'stale', label: 'Stale' },
];

export const ALL_COUNTRIES_OPTIONS: DropdownOption[] = [
    { value: 'all', label: 'All Countries' },
    { value: 'usa', label: 'USA' },
    { value: 'spain', label: 'Spain' },
    { value: 'turkey', label: 'Turkey' },
    { value: 'india', label: 'India' },
    { value: 'peru', label: 'Peru' },
];

export const HARVEST_ACTIVITY_CHART_DATA: HarvestActivityDataPoint[] = [
  { month: 'JAN', Peru: 10, Spain: 5, SouthAfrica: 60, USA: 70, Turkey: 80 }, { month: 'FEB', Peru: 20, Spain: 10, SouthAfrica: 70, USA: 60, Turkey: 70 },
  { month: 'MAR', Peru: 70, Spain: 15, SouthAfrica: 80, USA: 30, Turkey: 40 }, { month: 'APR', Peru: 80, Spain: 20, SouthAfrica: 70, USA: 10, Turkey: 20 },
  { month: 'MAY', Peru: 60, Spain: 30, SouthAfrica: 50, USA: 5, Turkey: 10 }, { month: 'JUN', Peru: 30, Spain: 40, SouthAfrica: 20, USA: 0, Turkey: 5 },
  { month: 'JUL', Peru: 10, Spain: 60, SouthAfrica: 10, USA: 0, Turkey: 0 }, { month: 'AUG', Peru: 5, Spain: 80, SouthAfrica: 5, USA: 10, Turkey: 5 },
  { month: 'SEP', Peru: 0, Spain: 70, SouthAfrica: 0, USA: 30, Turkey: 20 }, { month: 'OCT', Peru: 0, Spain: 50, SouthAfrica: 0, USA: 80, Turkey: 60 },
  { month: 'NOV', Peru: 0, Spain: 30, SouthAfrica: 20, USA: 90, Turkey: 90 }, { month: 'DEC', Peru: 5, Spain: 10, SouthAfrica: 40, USA: 80, Turkey: 90 },
];

export const HARVEST_COUNTRY_COLORS: {[key: string]: string} = {
    Peru: '#ef4444', // red-500
    Spain: '#3b82f6', // blue-500
    SouthAfrica: '#f97316', // orange-500
    USA: '#22c55e', // green-500
    Turkey: '#a855f7' // purple-500
};

export const HARVEST_CALENDAR_DATA: HarvestCalendarEntry[] = [
  { country: 'Peru', period: 'Mar-May (Peak)' },
  { country: 'Spain', period: 'Aug-Oct (Peak)' },
  { country: 'South Africa', period: 'Feb-Apr (Peak)' },
  { country: 'USA (California)', period: 'Oct-Jan (Peak)' },
  { country: 'Turkey', period: 'Oct-Dec (Peak)' },
  { country: 'India', period: 'Sep-Nov & Feb-Apr' },
];

export const PRODUCTION_INSIGHTS_DATA: ProductionInsight[] = [
  { key: 'Global Peak', value: 'Oct-Feb' },
  { key: 'Northern Hemisphere Peak', value: 'Sep-Jan' },
  { key: 'Southern Hemisphere Peak', value: 'Mar-May' },
  { key: 'Potential Supply Gap', value: 'Jun-Aug' },
];

export const SEASON_INDICATOR_LEGEND: { name: SeasonIndicator; color: string }[] = [
    { name: SeasonIndicator.PEAK, color: 'bg-green-500' },
    { name: SeasonIndicator.START, color: 'bg-yellow-500' },
    { name: SeasonIndicator.OFF, color: 'bg-red-500' },
];

// Added for Early Access Form
export const SUPPLIER_TYPE_OPTIONS: SupplierTypeDropdownOption[] = [
  { value: 'farmer', label: 'Farmer / Grower' },
  { value: 'exporter', label: 'Exporter' },
  { value: 'importer', label: 'Importer' },
  { value: 'processor', label: 'Processor' },
  { value: 'distributor', label: 'Distributor / Wholesaler' },
  { value: 'other', label: 'Other' },
];
