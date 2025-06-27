import React, { useState, useMemo } from 'react';
import SectionWrapper from '../../layout/SectionWrapper';
import Dropdown from '../../ui/Dropdown';
import TradeVolumeChart from './TradeVolumeChart';
import TradePerformanceTable from './TradePerformanceTable';
import { DotIcon } from '../../IconComponents';
import { TIME_RANGE_OPTIONS, TRADE_VOLUME_CHART_DATA, TRADE_TYPE_OPTIONS, INITIAL_TRADE_PERFORMANCE_DATA } from '../../../constants';
import { TradeType } from '../../../types';

const TradeDataSection: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>(TIME_RANGE_OPTIONS[0].value);
  const [tradeType, setTradeType] = useState<TradeType>(TradeType.BOTH);
  const [showImport, setShowImport] = useState(true);
  const [showExport, setShowExport] = useState(true);

  const handleTradeTypeChange = (selectedType: TradeType) => {
    setTradeType(selectedType);
    if (selectedType === TradeType.IMPORT) {
      setShowImport(true);
      setShowExport(false);
    } else if (selectedType === TradeType.EXPORT) {
      setShowImport(false);
      setShowExport(true);
    } else {
      setShowImport(true);
      setShowExport(true);
    }
  };

  const toggleImport = () => {
    const newShowImport = !showImport;
    setShowImport(newShowImport);
    if (!newShowImport && !showExport) setTradeType(TradeType.BOTH); 
    else if (newShowImport && !showExport) setTradeType(TradeType.IMPORT);
    else if (!newShowImport && showExport) setTradeType(TradeType.EXPORT);
    else setTradeType(TradeType.BOTH);
  };
  
  const toggleExport = () => {
    const newShowExport = !showExport;
    setShowExport(newShowExport);
    if (!showImport && !newShowExport) setTradeType(TradeType.BOTH);
    else if (showImport && !newShowExport) setTradeType(TradeType.IMPORT);
    else if (!showImport && newShowExport) setTradeType(TradeType.EXPORT);
    else setTradeType(TradeType.BOTH);
  };

  const summaryStats = useMemo(() => {
    const totalImportValue = INITIAL_TRADE_PERFORMANCE_DATA.reduce((sum, item) => sum + (item.totalImportValue || 0), 0);
    const totalExportValue = INITIAL_TRADE_PERFORMANCE_DATA.reduce((sum, item) => sum + item.totalExportValue, 0);

    const formatValue = (value: number) => {
      if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(0)}M`;
      }
      if (value >= 1_000) {
        return `$${(value / 1_000).toFixed(0)}K`;
      }
      return `$${value}`;
    };
    
    const yoyGrowth = 5.8;
    return {
      totalImportValue: formatValue(totalImportValue),
      totalExportValue: formatValue(totalExportValue),
      activeCountries: 42,
      yoyGrowth: `${yoyGrowth.toFixed(1)}%`,
      isGrowthPositive: yoyGrowth >= 0,
    };
  }, []);


  const desktopControls = (
    <>
      <Dropdown
        options={TRADE_TYPE_OPTIONS}
        selectedValue={tradeType}
        onSelect={(value) => handleTradeTypeChange(value as TradeType)}
      />
      <Dropdown
        options={TIME_RANGE_OPTIONS}
        selectedValue={timeRange}
        onSelect={(value) => setTimeRange(value as string)}
      />
      <button 
        onClick={toggleImport}
        className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${showImport ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-red-400 hover:text-white'}`}
      >
        <DotIcon className="w-2 h-2 mr-2"/> Import
      </button>
      <button 
        onClick={toggleExport}
        className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${showExport ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-400 hover:text-white'}`}
      >
        <DotIcon className="w-2 h-2 mr-2"/> Export
      </button>
    </>
  );
  
  return (
    <SectionWrapper
      id="trade-data"
      title="Trade Data"
      tooltipText="Detailed import/export volumes and performance metrics."
      className="bg-gray-50" 
      headerContent={<div className="hidden md:flex items-center space-x-2 md:space-x-4">{desktopControls}</div>}
    >
      {/* Mobile Controls */}
      <div className="md:hidden mb-6">
        <h3 className="text-lg font-semibold text-center text-gray-800 mb-3">Trade Data Controls</h3>
        <div className="flex justify-center mb-3">
            <Dropdown
                options={TRADE_TYPE_OPTIONS}
                selectedValue={tradeType}
                onSelect={(value) => handleTradeTypeChange(value as TradeType)}
                className="w-full max-w-xs"
                buttonClassName="w-full"
            />
        </div>
        <div className="flex justify-center mb-4">
            <Dropdown
                options={TIME_RANGE_OPTIONS}
                selectedValue={timeRange}
                onSelect={(value) => setTimeRange(value as string)}
                className="w-full max-w-xs"
                buttonClassName="w-full"
            />
        </div>
        <div className="flex justify-center space-x-3">
        <button 
            onClick={toggleImport}
            className={`flex items-center justify-center w-full max-w-xs px-4 py-2 rounded-md text-sm font-medium transition-colors ${showImport ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-red-400 hover:text-white'}`}
        >
            <DotIcon className="w-2 h-2 mr-2"/> Import
        </button>
        <button 
            onClick={toggleExport}
            className={`flex items-center justify-center w-full max-w-xs px-4 py-2 rounded-md text-sm font-medium transition-colors ${showExport ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-400 hover:text-white'}`}
        >
            <DotIcon className="w-2 h-2 mr-2"/> Export
        </button>
        </div>
      </div>

      <TradeVolumeChart data={TRADE_VOLUME_CHART_DATA} tradeType={tradeType} showImport={showImport} showExport={showExport} />

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-600">Total Import Value</p>
          <p className="text-xl font-bold text-red-600">{summaryStats.totalImportValue}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-600">Total Export Value</p>
          <p className="text-xl font-bold text-green-600">{summaryStats.totalExportValue}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-600">Active Countries</p>
          <p className="text-xl font-bold text-gray-800">{summaryStats.activeCountries}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-600">YoY Growth</p>
          <p className={`text-xl font-bold ${summaryStats.isGrowthPositive ? 'text-green-600' : 'text-red-600'}`}>{summaryStats.yoyGrowth}</p>
        </div>
      </div>

      <TradePerformanceTable />
    </SectionWrapper>
  );
};

export default TradeDataSection;