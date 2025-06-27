import React, { useState, useEffect } from 'react';
import SectionWrapper from '../../layout/SectionWrapper';
import Dropdown from '../../ui/Dropdown';
import HarvestActivityChart from './HarvestActivityChart';
import HarvestCalendar from './HarvestCalendar';
import ProductionInsights from './ProductionInsights.tsx'; // Added .tsx extension
import { HARVEST_ACTIVITY_CHART_DATA, ALL_COUNTRIES_OPTIONS, HARVEST_COUNTRY_COLORS } from '../../../constants';
import { DropdownOption } from '../../../types';

const SeasonalitySection: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>(ALL_COUNTRIES_OPTIONS[0].value);
  const [harvestData, setHarvestData] = useState(HARVEST_ACTIVITY_CHART_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setHarvestData(currentData =>
        currentData.map(monthData => {
          const newMonthData = { ...monthData };
          Object.keys(HARVEST_COUNTRY_COLORS).forEach(country => {
            if (typeof newMonthData[country] === 'number') {
              const fluctuation = (Math.random() - 0.5) * 4; // small change
              newMonthData[country] = Math.max(0, Math.min(100, (newMonthData[country] as number) + fluctuation));
            }
          });
          return newMonthData;
        })
      );
    }, 60000); // every minute

    return () => clearInterval(interval);
  }, []);

  const countryOptionsForSeasonality: DropdownOption[] = [
    ALL_COUNTRIES_OPTIONS[0],
    ...Object.keys(HARVEST_ACTIVITY_CHART_DATA[0])
      .filter(key => key !== 'month')
      .map(countryName => ({
        value: countryName.toLowerCase(),
        label: countryName
      }))
  ];

  return (
    <SectionWrapper
      id="seasonality"
      title="Seasonality"
      tooltipText="Pomegranate harvest schedules and production insights. Harvest activity is speculative and updated periodically."
      className="bg-gray-50"
      headerContent={
        <Dropdown
          options={countryOptionsForSeasonality}
          selectedValue={selectedCountry}
          onSelect={(value) => setSelectedCountry(value as string)}
          label="Country:"
          className="w-full md:w-auto"
          buttonClassName="w-full md:w-auto"
        />
      }
    >
      <div className="mb-8">
        <HarvestActivityChart data={harvestData} selectedCountry={selectedCountry} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <HarvestCalendar />
        <ProductionInsights />
      </div>
    </SectionWrapper>
  );
};

export default SeasonalitySection;