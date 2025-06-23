import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const SeasonalityChart = () => {
  const [selectedCountry, setSelectedCountry] = useState('all');

  const countries = [
    { key: 'peru', name: 'Peru', color: '#dc2626' },
    { key: 'spain', name: 'Spain', color: '#2563eb' },
    { key: 'southAfrica', name: 'South Africa', color: '#ea580c' },
    { key: 'usa', name: 'USA', color: '#16a34a' },
    { key: 'turkey', name: 'Turkey', color: '#9333ea' },
  ];

  const seasonalData = [
    { month: 'JAN', peru: 80, spain: 140, southAfrica: 160, usa: 180, turkey: 120 },
    { month: 'FEB', peru: 90, spain: 160, southAfrica: 180, usa: 200, turkey: 140 },
    { month: 'MAR', peru: 160, spain: 180, southAfrica: 200, usa: 160, turkey: 100 },
    { month: 'APR', peru: 200, spain: 140, southAfrica: 220, usa: 140, turkey: 80 },
    { month: 'MAY', peru: 220, spain: 100, southAfrica: 200, usa: 120, turkey: 60 },
    { month: 'JUN', peru: 160, spain: 80, southAfrica: 180, usa: 100, turkey: 40 },
    { month: 'JUL', peru: 120, spain: 60, southAfrica: 160, usa: 80, turkey: 30 },
    { month: 'AUG', peru: 100, spain: 40, southAfrica: 140, usa: 60, turkey: 40 },
    { month: 'SEP', peru: 80, spain: 60, southAfrica: 120, usa: 80, turkey: 160 },
    { month: 'OCT', peru: 60, spain: 120, southAfrica: 100, usa: 140, turkey: 200 },
    { month: 'NOV', peru: 70, spain: 160, southAfrica: 80, usa: 180, turkey: 220 },
    { month: 'DEC', peru: 75, spain: 180, southAfrica: 70, usa: 200, turkey: 180 },
  ];

  const getHarvestStage = (country: string, month: string, value: number) => {
    if (value >= 180) return 'Peak Harvest';
    if (value >= 120) return 'Active Harvest';
    if (value >= 80) return 'Harvest Start';
    return 'Off Season';
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm mb-2">{`${label} 2024`}</p>
          {payload.map((entry: any, index: number) => {
            const country = countries.find(c => c.key === entry.dataKey);
            const stage = getHarvestStage(entry.dataKey, label, entry.value);
            return (
              <div key={index} className="flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="font-medium">{country?.name}:</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{entry.value}%</div>
                  <div className="text-muted-foreground">{stage}</div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const getSelectedCountryName = () => {
    if (selectedCountry === 'all') {
      return 'All Countries';
    }
    const country = countries.find(c => c.key === selectedCountry);
    return country ? country.name : 'All Countries';
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="flex items-center gap-2">
              <CardTitle>Seasonality</CardTitle>
              <UITooltip>
                <TooltipTrigger>
                  <Info className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm max-w-xs">
                    Seasonal harvest patterns showing peak production periods for pomegranate-producing countries. Data based on agricultural reports and historical harvest cycles.
                  </p>
                </TooltipContent>
              </UITooltip>
            </div>
            <div className="flex overflow-x-auto scrollbar-hide gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm flex items-center gap-1 border w-full sm:w-auto">
                    Country: {getSelectedCountryName()}
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36 bg-background border border-border shadow-lg z-50">
                  <DropdownMenuItem
                    onClick={() => setSelectedCountry('all')}
                    className="cursor-pointer hover:bg-muted"
                  >
                    All Countries
                  </DropdownMenuItem>
                  {countries.map((country) => (
                    <DropdownMenuItem 
                      key={country.key}
                      onClick={() => setSelectedCountry(country.key)}
                      className="cursor-pointer hover:bg-muted"
                    >
                      {country.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
      </CardHeader>
      <CardContent>
   {/*
  <div className="mb-4">
    <div className="text-sm text-muted-foreground mb-2">Harvest Activity Level (%)</div>
    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
      {countries.map((country) => (
        <div key={country.key} className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded" 
            style={{ backgroundColor: country.color }}
          />
          <span className="text-sm font-medium">{country.name}</span>
        </div>
      ))}
    </div>
  </div>
*/}

        
        <ResponsiveContainer width="100%" height={300} className="sm:h-[450px]">
          <BarChart 
            data={seasonalData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            barCategoryGap="15%"
          >
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fontWeight: 'bold' }}
              tickLine={{ stroke: '#666' }}
              axisLine={{ stroke: '#666' }}
            />
            <YAxis 
              label={{ value: 'Harvest Activity (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: '12px' } }}
              tick={{ fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="rect"
            />
            {countries.map((country) => 
              (selectedCountry === 'all' || selectedCountry === country.key) && (
                <Bar 
                  key={country.key}
                  dataKey={country.key} 
                  fill={country.color} 
                  name={country.name}
                  radius={[2, 2, 0, 0]}
                />
              )
            )}
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Harvest Calendar */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">Harvest Calendar</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                <span className="font-medium">Peru:</span>
                <span className="text-muted-foreground">Mar-May (Peak)</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                <span className="font-medium">Spain:</span>
                <span className="text-muted-foreground">Oct-Feb (Peak)</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                <span className="font-medium">Turkey:</span>
                <span className="text-muted-foreground">Sep-Dec (Peak)</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                <span className="font-medium">USA:</span>
                <span className="text-muted-foreground">Oct-Feb (Peak)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">South Africa:</span>
                <span className="text-muted-foreground">Apr-Aug (Peak)</span>
              </div>
            </div>
          </div>

          {/* Production Insights */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">Production Insights</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                <span className="font-medium">Global Peak:</span>
                <span className="text-green-600 font-semibold">Oct-Feb</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                <span className="font-medium">Supply Gap:</span>
                <span className="text-orange-600 font-semibold">Jun-Aug</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                <span className="font-medium">Counter Season:</span>
                <span className="text-blue-600 font-semibold">South Africa</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                <span className="font-medium">Leading Producer:</span>
                <span className="text-purple-600 font-semibold">Peru</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Market Coverage:</span>
                <span className="text-emerald-600 font-semibold">Year-round</span>
              </div>
            </div>
          </div>
          
          {/* Season Legend */}
          <div className="lg:col-span-2 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded animate-pulse"></div>
              <span className="text-muted-foreground">Peak Season</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-muted-foreground">Harvest Start</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-muted-foreground">Off Season</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </TooltipProvider>
  );
};

export default SeasonalityChart;
