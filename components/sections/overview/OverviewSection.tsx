import React, { useState } from 'react';
import SectionWrapper from '../../layout/SectionWrapper';
import StatCard from './StatCard';
import Dropdown from '../../ui/Dropdown';
import ProgressBar from '../../ui/ProgressBar';
import MiniTrendLine from './MiniTrendLine';
import MarketPriceTracker from './MarketPriceTracker';
import Tooltip from '../../ui/Tooltip';
import { TIME_RANGE_OPTIONS, TOP_EXPORTERS_DATA, TOP_IMPORTERS_DATA, YOY_GROWTH_DATA, TRADE_SNAPSHOT_DATA } from '../../../constants';
import { ExporterImporterStat, YoYGrowthData, TradeSnapshotData } from '../../../types';

const OverviewSection: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>(TIME_RANGE_OPTIONS[0].value);

  const exporterColors = ['bg-gray-800', 'bg-gray-700', 'bg-gray-600', 'bg-gray-500', 'bg-gray-400'];
  const importerColors = ['bg-neutral-800', 'bg-neutral-700', 'bg-neutral-600', 'bg-neutral-500', 'bg-neutral-400'];

  return (
    <>
      <MarketPriceTracker />
      <SectionWrapper
        id="overview"
        title="Overview"
        tooltipText="Key pomegranate market indicators and statistics."
        className="bg-gray-50" 
        headerContent={
          <Dropdown
            options={TIME_RANGE_OPTIONS}
            selectedValue={timeRange}
            onSelect={(value) => setTimeRange(value as string)}
            label="Time Range:"
            className="w-full md:w-auto"
            buttonClassName="w-full md:w-auto"
          />
        }
        inlineHeaderContentMobile={false}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Global Export Leaders">
            <ul className="space-y-3">
              {(TOP_EXPORTERS_DATA[timeRange] || []).map((item, index) => (
                <li key={item.country}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">{item.country}</span>
                    <span className="text-sm font-medium text-gray-800">{item.marketShare}%</span>
                  </div>
                  <ProgressBar percentage={item.marketShare} colorClass={exporterColors[index % exporterColors.length]} />
                </li>
              ))}
            </ul>
          </StatCard>

          <StatCard title="Global Import Leaders">
            <ul className="space-y-3">
              {(TOP_IMPORTERS_DATA[timeRange] || []).map((item, index) => (
                <li key={item.country}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">{item.country}</span>
                    <span className="text-sm font-medium text-gray-800">{item.marketShare}%</span>
                  </div>
                  <ProgressBar percentage={item.marketShare} colorClass={importerColors[index % importerColors.length]} />
                </li>
              ))}
            </ul>
          </StatCard>

          <StatCard title="Year-over-Year Growth" isScrollable={true}>
            <ul className="space-y-2">
              {(YOY_GROWTH_DATA[timeRange] || []).map((item) => (
                <li key={item.year} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0 cursor-default">
                  <span className="text-sm text-gray-700">{item.year}</span>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.growth.toFixed(1)}%
                    </span>
                    <MiniTrendLine isUp={item.growth >= 0} className="w-8 h-4 ml-2" />
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-auto pt-2">Source: Pomintel Analysis + Public Export Data</p>
          </StatCard>
          
          <StatCard title="Trade Snapshot">
            <div className="flex flex-col justify-center h-full">
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Top Exporter</span>
                  <span className="font-semibold text-gray-800">{TRADE_SNAPSHOT_DATA[timeRange]?.topExporter}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Top Importer</span>
                  <span className="font-semibold text-gray-800">{TRADE_SNAPSHOT_DATA[timeRange]?.topImporter}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Total Export Volume</span>
                  <span className="font-semibold text-gray-800">{TRADE_SNAPSHOT_DATA[timeRange]?.totalExportVolume} thousand tons</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Total Import Volume</span>
                  <span className="font-semibold text-gray-800">{TRADE_SNAPSHOT_DATA[timeRange]?.totalImportVolume} thousand tons</span>
                </li>
                <li className="flex justify-between items-center pt-2">
                  <span className="text-gray-600">Active Countries Tracked</span>
                  <span className="font-semibold text-gray-800">{TRADE_SNAPSHOT_DATA[timeRange]?.activeCountriesTracked}</span>
                </li>
              </ul>
            </div>
          </StatCard>
        </div>
      </SectionWrapper>
    </>
  );
};

export default OverviewSection;