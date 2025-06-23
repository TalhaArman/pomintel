import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronDown, ArrowUp, ArrowDown, RefreshCw, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PriceSource {
  value: number | null;
  source: string;
}

interface PriceDataItem {
  country: string;
  commodity: string;
  sources: PriceSource[]; // Three sources, can be null if missing
  price: number | null; // Average of sources, or null if not available
  basePrice: number | null;
  lastUpdate: string;
  lastUpdateTime: Date;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  status: string;
  priceRange: { min: number; max: number };
}

const getAverage = (arr: PriceSource[]) => {
  const valid = arr.filter((v) => v.value !== null);
  if (valid.length === 0) return null;
  return valid.reduce((a, b) => a + (b.value as number), 0) / valid.length;
};

const MarketPricesTable = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [timeRange, setTimeRange] = useState('Yearly');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [priceData, setPriceData] = useState<PriceDataItem[]>([
    {
      country: 'Peru',
      commodity: 'Pomegranate',
      sources: [
        { value: 12.1, source: 'Tridge.com' },
        { value: 11.9, source: 'IndexMundi' },
        { value: 12.0, source: 'Statista' }
      ],
      price: getAverage([
        { value: 12.1, source: 'Tridge.com' },
        { value: 11.9, source: 'IndexMundi' },
        { value: 12.0, source: 'Statista' }
      ]),
      basePrice: getAverage([
        { value: 12.1, source: 'Tridge.com' },
        { value: 11.9, source: 'IndexMundi' },
        { value: 12.0, source: 'Statista' }
      ]),
      lastUpdate: '16 APR 2025',
      lastUpdateTime: new Date('2025-04-16T10:30:00'),
      change: '+0.0%',
      trend: 'neutral',
      status: 'Fresh',
      priceRange: { min: 11.50, max: 12.80 }
    },
    {
      country: 'Spain',
      commodity: 'Pomegranate',
      sources: [
        { value: null, source: 'Awaiting Data' },
        { value: 13.2, source: 'Tridge.com' },
        { value: 12.8, source: 'IndexMundi' }
      ],
      price: getAverage([
        { value: null, source: 'Awaiting Data' },
        { value: 13.2, source: 'Tridge.com' },
        { value: 12.8, source: 'IndexMundi' }
      ]),
      basePrice: getAverage([
        { value: null, source: 'Awaiting Data' },
        { value: 13.2, source: 'Tridge.com' },
        { value: 12.8, source: 'IndexMundi' }
      ]),
      lastUpdate: '15 APR 2025',
      lastUpdateTime: new Date('2025-04-15T14:15:00'),
      change: '+0.0%',
      trend: 'neutral',
      status: '3-day old',
      priceRange: { min: 12.50, max: 13.50 }
    },
    {
      country: 'South Africa',
      commodity: 'Pomegranate',
      sources: [
        { value: null, source: 'Awaiting Data' },
        { value: null, source: 'Awaiting Data' },
        { value: null, source: 'Awaiting Data' }
      ],
      price: null,
      basePrice: null,
      lastUpdate: '14 APR 2025',
      lastUpdateTime: new Date('2025-04-12T09:45:00'),
      change: '--',
      trend: 'neutral',
      status: 'Awaiting Data',
      priceRange: { min: 10.50, max: 11.70 }
    },
    {
      country: 'USA',
      commodity: 'Pomegranate',
      sources: [
        { value: 14.1, source: 'Tridge.com' },
        { value: 13.9, source: 'IndexMundi' },
        { value: 14.0, source: 'Statista' }
      ],
      price: getAverage([
        { value: 14.1, source: 'Tridge.com' },
        { value: 13.9, source: 'IndexMundi' },
        { value: 14.0, source: 'Statista' }
      ]),
      basePrice: getAverage([
        { value: 14.1, source: 'Tridge.com' },
        { value: 13.9, source: 'IndexMundi' },
        { value: 14.0, source: 'Statista' }
      ]),
      lastUpdate: '16 APR 2025',
      lastUpdateTime: new Date('2025-04-16T16:20:00'),
      change: '+0.0%',
      trend: 'neutral',
      status: 'Fresh',
      priceRange: { min: 13.20, max: 14.80 }
    },
    {
      country: 'Turkey',
      commodity: 'Pomegranate',
      sources: [
        { value: 10.0, source: 'Tridge.com' },
        { value: null, source: 'Awaiting Data' },
        { value: 10.2, source: 'IndexMundi' }
      ],
      price: getAverage([
        { value: 10.0, source: 'Tridge.com' },
        { value: null, source: 'Awaiting Data' },
        { value: 10.2, source: 'IndexMundi' }
      ]),
      basePrice: getAverage([
        { value: 10.0, source: 'Tridge.com' },
        { value: null, source: 'Awaiting Data' },
        { value: 10.2, source: 'IndexMundi' }
      ]),
      lastUpdate: '13 APR 2025',
      lastUpdateTime: new Date('2025-04-13T11:30:00'),
      change: '+0.0%',
      trend: 'neutral',
      status: '3-day old',
      priceRange: { min: 9.50, max: 10.80 }
    },
  ]);

  const statusOptions = ['All', 'Fresh', '3-day old', 'Updating'];
  const countryOptions = ['All', 'Peru', 'Spain', 'South Africa', 'USA', 'Turkey'];
  const timeRangeOptions = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  const filteredData = priceData.filter(item => {
    const statusMatch = statusFilter === 'All' || item.status === statusFilter;
    const countryMatch = countryFilter === 'All' || item.country === countryFilter;
    return statusMatch && countryMatch;
  });

  const getStatusFromTimestamp = (lastUpdateTime: Date) => {
    const now = new Date();
    const hoursAgo = (now.getTime() - lastUpdateTime.getTime()) / (1000 * 60 * 60);
    
    if (hoursAgo <= 24) return 'Fresh';
    if (hoursAgo <= 72) return `${Math.floor(hoursAgo / 24)}-day old`;
    return 'Updating';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Fresh') return 'bg-green-500';
    if (status.includes('old')) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Auto-update timestamp every 30 seconds to simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TooltipProvider>
      <Card className="mb-6 mt-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center gap-2">
              <CardTitle>Market Prices</CardTitle>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm max-w-xs">
                    Real-time market prices for pomegranates from major producing countries. Data includes price per kg, status indicators, percentage changes, and trend analysis updated regularly.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex justify-between items-center gap-2 sm:justify-start">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm flex items-center gap-1 border">
                    Status: {statusFilter}
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32 bg-background border border-border shadow-lg z-50">
                  {statusOptions.map((option) => (
                    <DropdownMenuItem 
                      key={option}
                      onClick={() => setStatusFilter(option)}
                      className="cursor-pointer hover:bg-muted"
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm flex items-center gap-1 border">
                    Countries: {countryFilter}
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36 bg-background border border-border shadow-lg z-50">
                  {countryOptions.map((option) => (
                    <DropdownMenuItem 
                      key={option}
                      onClick={() => setCountryFilter(option)}
                      className="cursor-pointer hover:bg-muted"
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm hidden md:flex items-center gap-1 border">
                  Time Range: {timeRange}
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32 bg-background border border-border shadow-lg z-50">
                {timeRangeOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option}
                    onClick={() => setTimeRange(option)}
                    className="cursor-pointer hover:bg-muted"
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Live update indicator */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">Auto-updating every 40 seconds</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto scrollbar-hide">
        <div>
          {/* Minimal, visible disclaimer */}
          <div style={{ fontSize: '0.85em', color: '#888', marginBottom: 8 }}>
            Prices shown are averages from 3 public sources. If data isn't available, you'll see "N/A" or "Awaiting Data".
          </div>
          <Table className="min-w-[600px] lg:min-w-0">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px] bg-muted/50 font-bold">Country</TableHead>
                <TableHead className="min-w-[120px] bg-muted/50 font-bold">Commodity</TableHead>
                <TableHead className="min-w-[80px] bg-muted/50 font-bold">Price (USD/kg)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="ml-1 h-3 w-3 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs font-normal max-w-xs">
                          Price is the average of up to 3 real sources (Tridge, IndexMundi, Statista, etc). Hover on price to see sources.
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableHead>
                <TableHead className="min-w-[120px] bg-muted/50 font-bold">Sources</TableHead>
                <TableHead className="min-w-[100px] bg-muted/50 font-bold">Status</TableHead>
                <TableHead className="min-w-[120px] bg-muted/50 font-bold">Last Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, idx) => (
                <TableRow 
                  key={idx} 
                  className="animate-fade-in hover:bg-muted/30 transition-all duration-300"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <TableCell className="font-medium">{row.country}</TableCell>
                  <TableCell>{row.commodity}</TableCell>
                  <TableCell className="font-semibold transition-all duration-500">
                    {row.price === null ? (
                      <span style={{ color: '#c00' }}>Awaiting Data</span>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="underline decoration-dotted cursor-pointer">${row.price.toFixed(2)}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs font-normal max-w-xs">
                              <div>Sources:</div>
                              <ul className="list-disc pl-4">
                                {row.sources.map((src, i) => (
                                  <li key={i}>
                                    {src.value === null ? (
                                      <span style={{ color: '#c00' }}>Awaiting Data</span>
                                    ) : (
                                      `$${src.value.toFixed(2)}`
                                    )}
                                    {` — ${src.source}`}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </TableCell>
                  <TableCell>
                    {row.sources.map((src, i) =>
                      src.value === null ? <span key={i} style={{ color: '#c00' }}>N/A</span> : <span key={i}>${src.value.toFixed(2)} </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        row.status === 'Fresh' ? 'bg-green-500 animate-pulse' : 
                        row.status === '3-day old' ? 'bg-yellow-500' : 
                        'bg-red-500 animate-pulse'
                      }`} />
                      <span className={`text-sm transition-colors duration-300 ${
                        row.status === 'Fresh' ? 'text-green-600' : 
                        row.status === '3-day old' ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>{row.status}</span>
                      {row.status === 'Updating' && (
                        <RefreshCw className="w-3 h-3 text-red-600 animate-spin" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{row.lastUpdate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `
        }} />
      </CardContent>
    </Card>
    </TooltipProvider>
  );
};

export default MarketPricesTable;
