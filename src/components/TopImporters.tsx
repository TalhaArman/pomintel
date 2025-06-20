import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { useState } from 'react';

const TopImporters = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const topImporters = [
    { country: 'USA', percentage: 38, volume: 1814, color: 'bg-black' },
    { country: 'UAE', percentage: 30, volume: 1433, color: 'bg-gray-400' },
    { country: 'Spain', percentage: 20, volume: 955, color: 'bg-gray-600' },
    { country: 'Turkey', percentage: 7, volume: 334, color: 'bg-gray-300' },
    { country: 'South Africa', percentage: 5, volume: 239, color: 'bg-gray-200' },
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

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-3xl font-bold">Top Importers</h1>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm max-w-xs">
                Top importing nations ranked by annual pomegranate volumes. Includes market share analysis, trade growth rates, and consumption patterns derived from customs data and agricultural trade databases.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Global Import Leaders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topImporters.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between cursor-pointer transition-all duration-200 rounded-lg p-4 ${
                selectedCountry === item.country ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleCountryClick(item.country)}
            >
              <div>
                <span className="text-lg font-medium">{item.country}</span>
                <p className="text-sm text-muted-foreground">Volume: {item.volume}K tons</p>
              </div>
              <div className="flex items-center space-x-4">
                <ProgressBar percentage={item.percentage} color={item.color} />
                <span className="text-lg font-semibold w-12 text-right">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedCountry && (
        <div className="mt-8 max-w-2xl mx-auto p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            Selected Country: {selectedCountry}
          </h3>
          <div className="text-sm">
            <span className="text-blue-700">Import Rank: </span>
            <span className="font-medium">
              #{topImporters.findIndex(i => i.country === selectedCountry) + 1}
            </span>
          </div>
        </div>
      )}
      </div>
    </TooltipProvider>
  );
};

export default TopImporters;