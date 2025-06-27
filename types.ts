
export interface NavItem {
  id: string;
  label: string;
}

export interface MarketPrice {
  country: string;
  price: number;
  previousPrice: number;
  lastUpdate: string; // e.g., "5 mins ago"
}

export interface ExporterImporterStat {
  country: string;
  marketShare: number; // percentage
}

export interface YoYGrowthData {
  year: string;
  growth: number; // percentage
}

export interface TradeSnapshotData {
  topExporter: string;
  topImporter: string;
  totalExportVolume: number;
  totalImportVolume: number;
  activeCountriesTracked: number;
}

export interface Article {
  id: string;
  image: string;
  countryTag: string;
  title: string;
  subtitle: string;
  description: string;
  date: string; // e.g., "July 26, 2024"
  fullContent: string;
  referenceUrl?: string;
}

export enum TradeType {
  IMPORT = 'Import',
  EXPORT = 'Export',
  BOTH = 'Both',
}

export interface TradeVolumeDataPoint {
  month: string;
  importVolume?: number;
  exportVolume?: number;
}

export interface TradePerformanceData {
  rank: number;
  country: string;
  exportPrice: number;
  totalExportValue: number;
  importPrice: number | null;
  totalImportValue: number | null;
  yoyGrowth: number;
}

export interface MarketPriceDetail {
  country: string;
  commodity: string;
  price: number;
  sources: number[]; // Array of prices from different sources
  status: 'Fresh' | '2-day old' | '3-day old' | 'Stale';
  lastUpdate: string; // e.g., "2024-07-26 10:00 UTC"
}

export interface HarvestActivityDataPoint {
  month: string;
  [country: string]: number | string; // e.g., Peru: 70, Spain: 50
}

export interface HarvestCalendarEntry {
  country: string;
  period: string; // e.g., "Mar-May (Peak)"
}

export interface ProductionInsight {
  key: string;
  value: string;
}

export enum SeasonIndicator {
    PEAK = "Peak Season",
    START = "Harvest Start",
    OFF = "Off Season"
}

export interface DropdownOption<T = string> {
  value: T;
  label: string;
}

// Added for Early Access Form
export interface EarlyAccessFormData {
  name: string;
  phone: string;
  email: string;
  country: string;
  companyName: string;
  companyWebsite: string;
  type: string; // Corresponds to value of SupplierTypeDropdownOption
  monthlyVolume: string;
  pricePerKg: string;
}

export type SupplierTypeDropdownOption = DropdownOption<string>;