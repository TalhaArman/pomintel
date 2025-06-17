import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDown, Info, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const TradeDataSection = () => {
  const chartData = [
    { month: 'JAN', import: 120, export: 80 },
    { month: 'FEB', import: 140, export: 90 },
    { month: 'MAR', import: 160, export: 110 },
    { month: 'APR', import: 180, export: 130 },
    { month: 'MAY', import: 200, export: 150 },
    { month: 'JUN', import: 220, export: 170 },
    { month: 'JUL', import: 240, export: 190 },
    { month: 'AUG', import: 260, export: 210 },
    { month: 'SEP', import: 280, export: 230 },
    { month: 'OCT', import: 300, export: 250 },
    { month: 'NOV', import: 320, export: 270 },
    { month: 'DEC', import: 340, export: 290 },
  ];

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [timeRange, setTimeRange] = useState('Quarterly');
  const [activeTradeTypes, setActiveTradeTypes] = useState({ import: true, export: true });
  const [selectedTradeType, setSelectedTradeType] = useState('Import');
  
  // Generate random initial summary data on each page load
  const [summaryData, setSummaryData] = useState(() => ({
    importVolume: Math.round(3000 + Math.random() * 500), // 3000-3500K range
    exportVolume: Math.round(2000 + Math.random() * 400), // 2000-2400K range
    activeCountries: Math.round(5 + Math.random() * 3), // 5-8 range
    yoyGrowth: parseFloat((5 + Math.random() * 8).toFixed(1)) // 5-13% range
  }));

  // Generate random initial trade data on each page load
  const [tradeData, setTradeData] = useState(() => [
    { 
      rank: 1, 
      country: 'Peru', 
      exportPrice: parseFloat((1.20 + Math.random() * 0.3).toFixed(2)), // 1.20-1.50 range
      exportValue: Math.round(900000 + Math.random() * 300000), // 900K-1.2M range
      importPrice: parseFloat((1.15 + Math.random() * 0.25).toFixed(2)), // 1.15-1.40 range
      importValue: Math.round(850000 + Math.random() * 350000), // 850K-1.2M range
      growth: parseFloat((-2 + Math.random() * 6).toFixed(1)) // -2% to 4% range
    },
    { 
      rank: 2, 
      country: 'Spain', 
      exportPrice: parseFloat((1.60 + Math.random() * 0.25).toFixed(2)), // 1.60-1.85 range
      exportValue: Math.round(1000000 + Math.random() * 400000), // 1M-1.4M range
      importPrice: parseFloat((1.55 + Math.random() * 0.3).toFixed(2)), // 1.55-1.85 range
      importValue: Math.round(950000 + Math.random() * 450000), // 950K-1.4M range
      growth: parseFloat((-6 + Math.random() * 8).toFixed(1)) // -6% to 2% range
    },
    { 
      rank: 3, 
      country: 'South Africa', 
      exportPrice: parseFloat((0.85 + Math.random() * 0.25).toFixed(2)), // 0.85-1.10 range
      exportValue: Math.round(800000 + Math.random() * 400000), // 800K-1.2M range
      importPrice: parseFloat((0.90 + Math.random() * 0.20).toFixed(2)), // 0.90-1.10 range
      importValue: Math.round(850000 + Math.random() * 350000), // 850K-1.2M range
      growth: parseFloat((-4 + Math.random() * 6).toFixed(1)) // -4% to 2% range
    },
    { 
      rank: 4, 
      country: 'USA', 
      exportPrice: parseFloat((0.95 + Math.random() * 0.25).toFixed(2)), // 0.95-1.20 range
      exportValue: Math.round(8000000 + Math.random() * 4000000), // 8M-12M range
      importPrice: parseFloat((0.90 + Math.random() * 0.30).toFixed(2)), // 0.90-1.20 range
      importValue: Math.round(800000 + Math.random() * 400000), // 800K-1.2M range
      growth: parseFloat((-3 + Math.random() * 5).toFixed(1)) // -3% to 2% range
    },
    { 
      rank: 5, 
      country: 'Turkey', 
      exportPrice: parseFloat((1.05 + Math.random() * 0.25).toFixed(2)), // 1.05-1.30 range
      exportValue: Math.round(700000 + Math.random() * 300000), // 700K-1M range
      importPrice: parseFloat((1.00 + Math.random() * 0.30).toFixed(2)), // 1.00-1.30 range
      importValue: Math.round(650000 + Math.random() * 350000), // 650K-1M range
      growth: parseFloat((1 + Math.random() * 6).toFixed(1)) // 1% to 7% range
    },
  ]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatLargeCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...tradeData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    const aValue = a[key as keyof typeof a];
    const bValue = b[key as keyof typeof b];
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleTradeTypeToggle = (type: 'import' | 'export') => {
    setActiveTradeTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleTradeTypeFilter = (filter: 'All' | 'Import' | 'Export') => {
    setSelectedTradeType(filter);
    if (filter === 'All') {
      setActiveTradeTypes({ import: true, export: true });
    } else if (filter === 'Import') {
      setActiveTradeTypes({ import: true, export: false });
    } else {
      setActiveTradeTypes({ import: false, export: true });
    }
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  // Auto-update summary data with random changes
  useEffect(() => {
    const updateSummaryData = () => {
      setSummaryData(prev => ({
        importVolume: Math.round(prev.importVolume + (Math.random() - 0.5) * 100), // ±50K fluctuation
        exportVolume: Math.round(prev.exportVolume + (Math.random() - 0.5) * 80), // ±40K fluctuation  
        activeCountries: Math.max(5, Math.min(8, prev.activeCountries + Math.round((Math.random() - 0.5) * 2))), // 5-8 range
        yoyGrowth: parseFloat((prev.yoyGrowth + (Math.random() - 0.5) * 2).toFixed(1)) // ±1% fluctuation
      }));
    };

    const interval = setInterval(updateSummaryData, 35000); // Update every 35 seconds
    return () => clearInterval(interval);
  }, []);

  // Auto-update trade table data with random changes
  useEffect(() => {
    const updateTradeData = () => {
      setTradeData(prev => 
        prev.map(item => ({
          ...item,
          exportPrice: parseFloat((item.exportPrice + (Math.random() - 0.5) * 0.1).toFixed(2)), // ±$0.05 fluctuation
          exportValue: Math.round(item.exportValue + (Math.random() - 0.5) * 200000), // ±100K fluctuation
          importPrice: parseFloat((item.importPrice + (Math.random() - 0.5) * 0.08).toFixed(2)), // ±$0.04 fluctuation
          importValue: Math.round(item.importValue + (Math.random() - 0.5) * 150000), // ±75K fluctuation
          growth: parseFloat((item.growth + (Math.random() - 0.5) * 3).toFixed(1)) // ±1.5% fluctuation
        }))
      );
    };

    const interval = setInterval(updateTradeData, 42000); // Update every 42 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header with Data Range */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              Trade Data
              <Tooltip>
                <TooltipTrigger><Info className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                <TooltipContent>Overview of global pomegranate import and export trends.</TooltipContent>
              </Tooltip>
            </h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Data shown: 2024 (Quarterly)
              <Tooltip>
                <TooltipTrigger><Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                <TooltipContent>Data is currently filtered to display quarterly statistics for the year 2024.</TooltipContent>
              </Tooltip>
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
              <CardTitle className="text-xl font-semibold text-foreground">Trade Data</CardTitle>
              
              {/* Desktop: All controls in one row */}
              <div className="hidden lg:flex flex-wrap gap-3 items-center">
                {/* Trade Type Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm flex items-center gap-1 border border-border">
                      Trade Type: {selectedTradeType}
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-background border border-border shadow-lg z-50">
                    <DropdownMenuItem 
                      onClick={() => handleTradeTypeFilter('All')}
                      className="cursor-pointer hover:bg-muted"
                    >
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleTradeTypeFilter('Import')}
                      className="cursor-pointer hover:bg-muted"
                    >
                      Import
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleTradeTypeFilter('Export')}
                      className="cursor-pointer hover:bg-muted"
                    >
                      Export
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Time Range Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm flex items-center gap-1 border border-border">
                      Time Range: {timeRange}
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-background border border-border shadow-lg z-50">
                    <DropdownMenuItem 
                      onClick={() => handleTimeRangeChange('Monthly')}
                      className="cursor-pointer hover:bg-muted"
                    >
                      Monthly
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleTimeRangeChange('Quarterly')}
                      className="cursor-pointer hover:bg-muted"
                    >
                      Quarterly
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleTimeRangeChange('Yearly')}
                      className="cursor-pointer hover:bg-muted"
                    >
                      Yearly
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Import/Export Toggle Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTradeTypeToggle('import')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTradeTypes.import 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-current"></div>
                    Import
                  </button>
                  <button
                    onClick={() => handleTradeTypeToggle('export')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTradeTypes.export 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-current"></div>
                    Export
                  </button>
                </div>
              </div>

              {/* Mobile: Top row with dropdowns */}
              <div className="flex flex-col sm:flex-row gap-3 lg:hidden">
                <div className="flex gap-2 flex-1">
                  {/* Trade Type Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-xs sm:text-sm flex items-center gap-1 border border-border flex-1 justify-between">
                        Trade Type: {selectedTradeType}
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 bg-background border border-border shadow-lg z-50">
                      <DropdownMenuItem 
                        onClick={() => handleTradeTypeFilter('All')}
                        className="cursor-pointer hover:bg-muted"
                      >
                        All
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleTradeTypeFilter('Import')}
                        className="cursor-pointer hover:bg-muted"
                      >
                        Import
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleTradeTypeFilter('Export')}
                        className="cursor-pointer hover:bg-muted"
                      >
                        Export
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Time Range Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-xs sm:text-sm flex items-center gap-1 border border-border flex-1 justify-between">
                        Time Range: {timeRange}
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 bg-background border border-border shadow-lg z-50">
                      <DropdownMenuItem 
                        onClick={() => handleTimeRangeChange('Monthly')}
                        className="cursor-pointer hover:bg-muted"
                      >
                        Monthly
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleTimeRangeChange('Quarterly')}
                        className="cursor-pointer hover:bg-muted"
                      >
                        Quarterly
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleTimeRangeChange('Yearly')}
                        className="cursor-pointer hover:bg-muted"
                      >
                        Yearly
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Mobile: Bottom row with Import/Export Toggle Buttons */}
              <div className="flex items-center justify-center gap-2 lg:hidden">
                <button
                  onClick={() => handleTradeTypeToggle('import')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTradeTypes.import 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-current"></div>
                  Import
                </button>
                <button
                  onClick={() => handleTradeTypeToggle('export')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTradeTypes.export 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-current"></div>
                  Export
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData}>
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#666' }}
                />
                <YAxis 
                  label={{ value: 'Volume (Thousands USD)', angle: -90, position: 'insideLeft' }}
                  tick={{ fontSize: 11 }}
                />
                {activeTradeTypes.import && (
                  <Line 
                    type="monotone" 
                    dataKey="import" 
                    stroke="#dc2626" 
                    strokeWidth={3}
                    name="Import"
                    dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#dc2626', strokeWidth: 2 }}
                  />
                )}
                {activeTradeTypes.export && (
                  <Line 
                    type="monotone" 
                    dataKey="export" 
                    stroke="#16a34a" 
                    strokeWidth={3}
                    name="Export"
                    dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#16a34a', strokeWidth: 2 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
            
            {/* Data Summary */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-red-600 transition-all duration-500">
                  {summaryData.importVolume.toLocaleString()}K
                </div>
                <div className="text-xs text-muted-foreground">Total Import Volume</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600 transition-all duration-500">
                  {summaryData.exportVolume.toLocaleString()}K
                </div>
                <div className="text-xs text-muted-foreground">Total Export Volume</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold transition-all duration-500">
                  {summaryData.activeCountries}
                </div>
                <div className="text-xs text-muted-foreground">Active Countries</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold transition-all duration-500 ${
                  summaryData.yoyGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {summaryData.yoyGrowth >= 0 ? '+' : ''}{summaryData.yoyGrowth}%
                </div>
                <div className="text-xs text-muted-foreground">YoY Growth</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Country Trade Performance
              <Tooltip>
                <TooltipTrigger><Info className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                <TooltipContent>Detailed performance metrics for individual countries in pomegranate trade.</TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto scrollbar-hide">
              <Table className="min-w-[800px] lg:min-w-0">
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="min-w-[60px] bg-muted/50 font-bold">
                      <Button variant="ghost" size="sm" onClick={() => handleSort('rank')} className="h-auto p-0 font-bold">
                        Rank <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[100px] bg-muted/50 font-bold">
                      <Button variant="ghost" size="sm" onClick={() => handleSort('country')} className="h-auto p-0 font-bold">
                        Country <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="min-w-[140px] bg-muted/50 font-bold">
                      <div className="flex items-center">
                        <Button variant="ghost" size="sm" onClick={() => handleSort('exportPrice')} className="h-auto p-0 font-bold">
                          Export Price (USD/kg) <ArrowUpDown className="ml-1 h-3 w-3" />
                        </Button>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Average export price per kilogram</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px] bg-muted/50 font-bold">
                      <span className="flex items-center gap-1">
                        Total Export Value
                        <Tooltip>
                          <TooltipTrigger><Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                          <TooltipContent>Total value of exports in USD.</TooltipContent>
                        </Tooltip>
                      </span>
                    </TableHead>
                    <TableHead className="min-w-[140px] bg-muted/50 font-bold">
                      <div className="flex items-center">
                        <Button variant="ghost" size="sm" onClick={() => handleSort('importPrice')} className="h-auto p-0 font-bold">
                          Import Price (USD/kg) <ArrowUpDown className="ml-1 h-3 w-3" />
                        </Button>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Average import price per kilogram</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px] bg-muted/50 font-bold">
                      <span className="flex items-center gap-1">
                        Total Import Value
                        <Tooltip>
                          <TooltipTrigger><Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                          <TooltipContent>Total value of imports in USD.</TooltipContent>
                        </Tooltip>
                      </span>
                    </TableHead>
                    <TableHead className="min-w-[120px] bg-muted/50 font-bold">
                      <div className="flex items-center">
                        <Button variant="ghost" size="sm" onClick={() => handleSort('growth')} className="h-auto p-0 font-bold">
                          Year-over-Year Growth (%) <ArrowUpDown className="ml-1 h-3 w-3" />
                        </Button>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Percentage change compared to previous year</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.map((row) => (
                    <TableRow key={row.rank}>
                      <TableCell>{row.rank}</TableCell>
                      <TableCell className="font-medium">{row.country}</TableCell>
                      <TableCell>{formatCurrency(row.exportPrice)}</TableCell>
                      <TableCell className="font-semibold">{formatLargeCurrency(row.exportValue)}</TableCell>
                      <TableCell>{formatCurrency(row.importPrice)}</TableCell>
                      <TableCell className="font-semibold">{formatLargeCurrency(row.importValue)}</TableCell>
                      <TableCell className={row.growth >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                        {row.growth >= 0 ? '+' : ''}{row.growth.toFixed(1)}%
                      </TableCell>
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
      </div>
    </TooltipProvider>
  );
};

export default TradeDataSection;