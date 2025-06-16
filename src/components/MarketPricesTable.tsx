import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

const MarketPricesTable = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [timeRange, setTimeRange] = useState('Yearly');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const priceData = [
    { 
      country: 'Peru', 
      commodity: 'Pomegranate', 
      price: '$12', 
      lastUpdate: '16 APR 2025', 
      lastUpdateTime: new Date('2025-04-16T10:30:00'),
      change: '+23.3%',
      trend: 'up',
      status: 'Fresh'
    },
    { 
      country: 'Spain', 
      commodity: 'Pomegranate', 
      price: '$13', 
      lastUpdate: '15 APR 2025', 
      lastUpdateTime: new Date('2025-04-15T14:15:00'),
      change: '-1.67%',
      trend: 'down',
      status: '3-day old'
    },
    { 
      country: 'South Africa', 
      commodity: 'Pomegranate', 
      price: '$11', 
      lastUpdate: '14 APR 2025', 
      lastUpdateTime: new Date('2025-04-12T09:45:00'),
      change: '--',
      trend: 'neutral',
      status: 'Updating'
    },
    { 
      country: 'USA', 
      commodity: 'Pomegranate', 
      price: '$14', 
      lastUpdate: '16 APR 2025', 
      lastUpdateTime: new Date('2025-04-16T16:20:00'),
      change: '+12.1%',
      trend: 'up',
      status: 'Fresh'
    },
    { 
      country: 'Turkey', 
      commodity: 'Pomegranate', 
      price: '$10', 
      lastUpdate: '13 APR 2025', 
      lastUpdateTime: new Date('2025-04-13T11:30:00'),
      change: '-2.5%',
      trend: 'down',
      status: '3-day old'
    },
  ];

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
    <Card className="mt-6 mb-6">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <CardTitle>Market Prices</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex justify-between items-center gap-2 sm:justify-start">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm flex items-center gap-1">
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
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm flex items-center gap-1">
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
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm hidden md:flex items-center gap-1">
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
      </CardHeader>
      <CardContent className="overflow-x-auto scrollbar-hide">
          <Table className="min-w-[600px] lg:min-w-0">
           <TableHeader>
             <TableRow>
               <TableHead className="min-w-[100px] bg-muted/50 font-bold">Country</TableHead>
               <TableHead className="min-w-[120px] bg-muted/50 font-bold">Commodity</TableHead>
               <TableHead className="min-w-[80px] bg-muted/50 font-bold">
                 <span className="flex items-center gap-1">
                   Price / KG
                   <Tooltip>
                     <TooltipTrigger><Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                     <TooltipContent>Latest market price per kilogram in USD.</TooltipContent>
                   </Tooltip>
                 </span>
               </TableHead>
               <TableHead className="min-w-[120px] bg-muted/50 font-bold">Last Update</TableHead>
               <TableHead className="min-w-[100px] bg-muted/50 font-bold">
                 <span className="flex items-center gap-1">
                   Status
                   <Tooltip>
                     <TooltipTrigger><Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                     <TooltipContent>Freshness of the price data (e.g., Fresh, 3-day old, Updating).</TooltipContent>
                   </Tooltip>
                 </span>
               </TableHead>
               <TableHead className="min-w-[80px] bg-muted/50 font-bold">
                 <span className="flex items-center gap-1">
                   Change %
                   <Tooltip>
                     <TooltipTrigger><Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                     <TooltipContent>Percentage change compared to previous price.</TooltipContent>
                   </Tooltip>
                 </span>
               </TableHead>
               <TableHead className="min-w-[80px] bg-muted/50 font-bold">
                 <span className="flex items-center gap-1">
                   Trend
                   <Tooltip>
                     <TooltipTrigger><Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                     <TooltipContent>Direction of price movement (up, down, neutral).</TooltipContent>
                   </Tooltip>
                 </span>
               </TableHead>
             </TableRow>
           </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow 
                key={index} 
                className="animate-fade-in hover:bg-muted/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TableCell className="font-medium">{row.country}</TableCell>
                <TableCell>{row.commodity}</TableCell>
                <TableCell className="font-semibold">${row.price.replace(/\$/,'')}</TableCell>
                <TableCell>{row.lastUpdate}</TableCell>
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
                <TableCell className={`font-semibold transition-all duration-300 ${
                  row.change.startsWith('+') ? 'text-green-600' : 
                  row.change.startsWith('-') ? 'text-red-600' : 'text-muted-foreground'
                }`}>
                  <div className="flex items-center gap-1">
                    {row.change.startsWith('+') && <ArrowUp className="w-3 h-3" />}
                    {row.change.startsWith('-') && <ArrowDown className="w-3 h-3" />}
                    {row.change}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    {row.trend === 'up' ? (
                      <div className="transition-all duration-500 hover:scale-110">
                        <ArrowUp className="w-5 h-5 text-green-600 animate-[bounce_2s_infinite]" />
                      </div>
                    ) : row.trend === 'down' ? (
                      <div className="transition-all duration-500 hover:scale-110">
                        <ArrowDown className="w-5 h-5 text-red-600 animate-[bounce_2s_infinite]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 bg-muted rounded-full animate-pulse" />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
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
  );
};

export default MarketPricesTable;