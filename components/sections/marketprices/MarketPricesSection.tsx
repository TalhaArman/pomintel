import React, { useState, useMemo, useEffect } from 'react';
import SectionWrapper from '../../layout/SectionWrapper';
import Dropdown from '../../ui/Dropdown';
import MarketPricesTable from './MarketPricesTable';
import { MARKET_PRICES_DETAIL_DATA, TIME_RANGE_OPTIONS, ALL_COUNTRIES_OPTIONS, MARKET_STATUS_OPTIONS } from '../../../constants';
import { MarketPriceDetail } from '../../../types';

const MarketPricesSection: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>(MARKET_STATUS_OPTIONS[0].value);
  const [countryFilter, setCountryFilter] = useState<string>(ALL_COUNTRIES_OPTIONS[0].value);
  const [timeRange, setTimeRange] = useState<string>(TIME_RANGE_OPTIONS[0].value);
  
  const [tableData, setTableData] = useState<MarketPriceDetail[]>(MARKET_PRICES_DETAIL_DATA);
  const [updateTime, setUpdateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTableData(prevData =>
        prevData.map(item => {
          // 1. Simulate fluctuation for each source
          const newSources = item.sources.map(source => {
            const fluctuation = (Math.random() - 0.5) * 0.04; // -0.02 to 0.02
            return Math.max(0.1, source + fluctuation); // Ensure price doesn't go below 0.1
          });

          // 2. Calculate the new average price from the updated sources
          const newPrice = newSources.reduce((a, b) => a + b, 0) / newSources.length;

          return {
            ...item,
            price: parseFloat(newPrice.toFixed(2)),
            sources: newSources.map(s => parseFloat(s.toFixed(2))),
            status: 'Fresh',
            lastUpdate: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
          };
        })
      );
      setUpdateTime(new Date());
    }, 40000); // Update every 40 seconds

    return () => clearInterval(intervalId);
  }, []); // Run only once on component mount

  const filteredData = useMemo(() => {
    return tableData.filter(item => {
      const statusMatch = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
      const countryMatch = countryFilter === 'all' || item.country.toLowerCase() === countryFilter.toLowerCase();
      return statusMatch && countryMatch;
    });
  }, [tableData, statusFilter, countryFilter, timeRange]);

  const headerControls = (
    <>
      <Dropdown
        options={MARKET_STATUS_OPTIONS}
        selectedValue={statusFilter}
        onSelect={(value) => setStatusFilter(value as string)}
        label="Status:"
      />
      <Dropdown
        options={ALL_COUNTRIES_OPTIONS}
        selectedValue={countryFilter}
        onSelect={(value) => setCountryFilter(value as string)}
        label="Countries:"
      />
      <Dropdown
        options={TIME_RANGE_OPTIONS}
        selectedValue={timeRange}
        onSelect={(value) => setTimeRange(value as string)}
        label="Time Range:"
      />
    </>
  );

  return (
    <SectionWrapper
      id="market-prices"
      title="Market Prices"
      tooltipText="Detailed current market prices for pomegranates."
    >
      {/* Desktop Filters */}
      <div className="hidden md:flex justify-end items-center space-x-4 mb-6 -mt-16">
        {headerControls}
      </div>
      {/* Mobile Filters */}
      <div className="md:hidden flex flex-col items-center space-y-3 mb-6">
        <Dropdown
            options={MARKET_STATUS_OPTIONS} selectedValue={statusFilter} onSelect={(value) => setStatusFilter(value as string)} label="Status:"
            className="w-full" buttonClassName="w-full justify-between"
        />
        <Dropdown
            options={ALL_COUNTRIES_OPTIONS} selectedValue={countryFilter} onSelect={(value) => setCountryFilter(value as string)} label="Countries:"
            className="w-full" buttonClassName="w-full justify-between"
        />
        <Dropdown
            options={TIME_RANGE_OPTIONS} selectedValue={timeRange} onSelect={(value) => setTimeRange(value as string)} label="Time Range:"
            className="w-full" buttonClassName="w-full justify-between"
        />
      </div>

      <div className="text-xs text-gray-600 mb-4 space-y-1">
        <p>Auto-updating every 40 seconds. Last checked: {updateTime.toLocaleTimeString()}</p>
        <p>Speculative data based on public sources. Prices shown are averages and may vary. All data is indicative.</p>
      </div>
      <MarketPricesTable data={filteredData} />
    </SectionWrapper>
  );
};

export default MarketPricesSection;