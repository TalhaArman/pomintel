import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronDown, ExternalLink, Info } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OverviewSection = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('Yearly');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const timeRanges = ['Yearly', 'Monthly', 'Quarterly'];

  const topExporters = [
    { country: 'Peru', percentage: 45, volume: 2654, color: 'bg-black' },
    { country: 'Spain', percentage: 28, volume: 1652, color: 'bg-gray-400' },
    { country: 'South Africa', percentage: 15, volume: 885, color: 'bg-gray-600' },
    { country: 'USA', percentage: 8, volume: 471, color: 'bg-gray-300' },
    { country: 'Turkey', percentage: 4, volume: 236, color: 'bg-gray-200' },
  ];

  const topImporters = [
    { country: 'USA', percentage: 38, volume: 1814, color: 'bg-black' },
    { country: 'UAE', percentage: 30, volume: 1433, color: 'bg-gray-400' },
    { country: 'Spain', percentage: 20, volume: 955, color: 'bg-gray-600' },
    { country: 'Turkey', percentage: 7, volume: 334, color: 'bg-gray-300' },
    { country: 'South Africa', percentage: 5, volume: 239, color: 'bg-gray-200' },
  ];

  const yoyGrowthData = [
    { year: '2017', value: -9.1, isNegative: true },
    { year: '2018', value: -11.1, isNegative: true },
    { year: '2019', value: -5.8, isNegative: true },
    { year: '2020', value: 9.7, isNegative: false },
    { year: '2021', value: 14.1, isNegative: false },
    { year: '2022', value: 3.4, isNegative: false },
    { year: '2023', value: 2.1, isNegative: false },
    { year: '2024', value: -7.9, isNegative: true },
  ];

  const tradeSnapshot = [
    { label: 'Top Exporter', value: 'Peru' },
    { label: 'Top Importer', value: 'USA' },
    { label: 'Total Export Volume', value: '5,889 thousand tons' },
    { label: 'Total Import Volume', value: '4,776 thousand tons' },
    { label: 'Active Countries Tracked', value: '8' },
  ];

  const handleCountryClick = (country: string) => {
    setSelectedCountry(selectedCountry === country ? null : country);
  };

  const ProgressBar = ({ percentage, color }: { percentage: number; color: string }) => (
    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  const MiniChart = ({ value, isNegative }: { value: number; isNegative: boolean }) => (
    <div className="w-16 h-6 flex items-center justify-end">
      <svg width="40" height="16" viewBox="0 0 40 16" className="overflow-visible">
        <path
          d={isNegative ? "M0,8 Q10,12 20,10 T40,14" : "M0,12 Q10,8 20,6 T40,2"}
          stroke={isNegative ? "#ef4444" : "#22c55e"}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="mb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">
                  Comprehensive overview of global pomegranate trade including top exporters, importers, year-over-year growth trends, and key trade metrics. Data compiled from international trade databases.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="space-x-2">
              <span>Time Range: {timeRange}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background border border-border shadow-lg">
            {timeRanges.map((range) => (
              <DropdownMenuItem 
                key={range}
                onClick={() => setTimeRange(range)}
                className="cursor-pointer"
              >
                {range}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Cards Grid - Compact 4-card layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Top Exporters */}
        <Card className="h-[280px] flex flex-col">
          <CardHeader className="pb-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Top Exporters</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/exporters')}
                className="h-6 w-6 p-0"
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-2 overflow-y-auto p-4 pt-0">
            {topExporters.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between cursor-pointer transition-all duration-200 rounded-md p-1.5 ${
                  selectedCountry === item.country ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleCountryClick(item.country)}
              >
                <span className="text-xs font-medium">{item.country}</span>
                <div className="flex items-center space-x-2">
                  <ProgressBar percentage={item.percentage} color={item.color} />
                  <span className="text-xs font-semibold w-8 text-right" title="Share of Total Trade (%)">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Importers */}
        <Card className="h-[280px] flex flex-col">
          <CardHeader className="pb-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Top Importers</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/importers')}
                className="h-6 w-6 p-0"
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-2 overflow-y-auto p-4 pt-0">
            {topImporters.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between cursor-pointer transition-all duration-200 rounded-md p-1.5 ${
                  selectedCountry === item.country ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleCountryClick(item.country)}
              >
                <span className="text-xs font-medium">{item.country}</span>
                <div className="flex items-center space-x-2">
                  <ProgressBar percentage={item.percentage} color={item.color} />
                  <span className="text-xs font-semibold w-8 text-right" title="Share of Total Trade (%)">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* YOY Growth */}
        <Card className="h-[280px] flex flex-col">
          <CardHeader className="pb-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">YOY Growth</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/growth')}
                className="h-6 w-6 p-0"
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-1.5 overflow-y-auto p-4 pt-0">
            {/* Chart Legend */}
            <div className="flex justify-between items-center mb-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-0.5 bg-green-500"></div>
                  <span>Positive</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-0.5 bg-red-500"></div>
                  <span>Negative</span>
                </div>
              </div>
            </div>
            {yoyGrowthData.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1.5 hover:bg-gray-50 rounded-md px-1.5 transition-colors">
                <span className="text-xs font-medium">{item.year}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-semibold w-10 text-right ${
                    item.isNegative ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {item.isNegative ? '' : '+'}{item.value}%
                  </span>
                  <MiniChart value={item.value} isNegative={item.isNegative} />
                </div>
              </div>
            ))}
            {/* Data Source */}
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-muted-foreground">Source: Pomintel Analysis + Public Export Data</p>
            </div>
          </CardContent>
        </Card>

        {/* Trade Snapshot */}
        <Card className="h-[280px] flex flex-col">
          <CardHeader className="pb-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Trade Snapshot</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/snapshot')}
                className="h-6 w-6 p-0"
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-3 overflow-y-auto p-4 pt-0">
            {tradeSnapshot.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-1.5 hover:bg-gray-50 rounded-md px-1.5 transition-colors">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className="text-xs font-semibold">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Selected Country Details */}
      {selectedCountry && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            Selected Country: {selectedCountry}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700">Export Rank: </span>
              <span className="font-medium">
                {topExporters.findIndex(e => e.country === selectedCountry) + 1 || 'Not in top 5'}
              </span>
            </div>
            <div>
              <span className="text-blue-700">Import Rank: </span>
              <span className="font-medium">
                {topImporters.findIndex(i => i.country === selectedCountry) + 1 || 'Not in top 5'}
              </span>
            </div>
          </div>
        </div>
      )}
      </div>
    </TooltipProvider>
  );
};

export default OverviewSection;