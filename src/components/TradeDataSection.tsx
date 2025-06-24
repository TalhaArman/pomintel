import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDown, Info, ChevronDown, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const TradeDataSection = () => {
  const chartData = [
    { month: 'JAN', import: 120000, export: 80000 },
    { month: 'FEB', import: 140000, export: 90000 },
    { month: 'MAR', import: 160000, export: 110000 },
    { month: 'APR', import: 180000, export: 130000 },
    { month: 'MAY', import: 200000, export: 150000 },
    { month: 'JUN', import: 220000, export: 170000 },
    { month: 'JUL', import: 240000, export: 190000 },
    { month: 'AUG', import: 260000, export: 210000 },
    { month: 'SEP', import: 280000, export: 230000 },
    { month: 'OCT', import: 300000, export: 250000 },
    { month: 'NOV', import: 320000, export: 270000 },
    { month: 'DEC', import: 340000, export: 290000 },
  ];

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [timeRange, setTimeRange] = useState('Quarterly');
  const [loading, setLoading] = useState(false);
  const [activeTradeTypes, setActiveTradeTypes] = useState({ import: true, export: true });
  const [selectedTradeType, setSelectedTradeType] = useState('Import');
  
  // Generate random initial summary data on each page load
  const [summaryData, setSummaryData] = useState(() => ({
    importVolume: Math.round((3000 + Math.random() * 500) * 1000), // 3,000,000-3,500,000 range
    exportVolume: Math.round((2000 + Math.random() * 400) * 1000), // 2,000,000-2,400,000 range
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
    setLoading(true);
    setTimeout(() => {
      setTimeRange(range);
      setLoading(false);
    }, 1000);
  };

  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{`Month: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value.toLocaleString()} tons`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Auto-update summary data with random changes
  useEffect(() => {
    const updateSummaryData = () => {
      setSummaryData(prev => ({
        importVolume: Math.round(prev.importVolume + (Math.random() - 0.5) * 100000), // ±50K fluctuation
        exportVolume: Math.round(prev.exportVolume + (Math.random() - 0.5) * 80000), // ±40K fluctuation  
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
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-foreground">Trade Data</h2>
            <UITooltip>
              <TooltipTrigger>
                <Info className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">
                  Comprehensive pomegranate trade analytics including bilateral trade flows, volume trends, seasonal patterns, and market share analysis from global customs databases and trade statistics.
                </p>
              </TooltipContent>
            </UITooltip>
            <p className="text-sm text-muted-foreground ml-2">Data shown: 2024 (Quarterly)</p>
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
                      className={`cursor-pointer hover:bg-muted ${timeRange === 'Monthly' ? 'bg-primary text-white' : ''}`}
                    >
                      Monthly {timeRange === 'Monthly' && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleTimeRangeChange('Quarterly')}
                      className={`cursor-pointer hover:bg-muted ${timeRange === 'Quarterly' ? 'bg-primary text-white' : ''}`}
                    >
                      Quarterly {timeRange === 'Quarterly' && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleTimeRangeChange('Yearly')}
                      className={`cursor-pointer hover:bg-muted ${timeRange === 'Yearly' ? 'bg-primary text-white' : ''}`}
                    >
                      Yearly {timeRange === 'Yearly' && <span className="ml-2">✓</span>}
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
                        className={`cursor-pointer hover:bg-muted ${timeRange === 'Monthly' ? 'bg-primary text-white' : ''}`}
                      >
                        Monthly {timeRange === 'Monthly' && <span className="ml-2">✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleTimeRangeChange('Quarterly')}
                        className={`cursor-pointer hover:bg-muted ${timeRange === 'Quarterly' ? 'bg-primary text-white' : ''}`}
                      >
                        Quarterly {timeRange === 'Quarterly' && <span className="ml-2">✓</span>}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleTimeRangeChange('Yearly')}
                        className={`cursor-pointer hover:bg-muted ${timeRange === 'Yearly' ? 'bg-primary text-white' : ''}`}
                      >
                        Yearly {timeRange === 'Yearly' && <span className="ml-2">✓</span>}
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
            {loading ? (
              <div className="flex justify-center items-center h-[350px]">
                <Loader2 className="animate-spin w-8 h-8 text-primary" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}>
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: '#666' }}
                  />
                  <YAxis 
                    label={{ value: 'Trade Volume Legend', angle: -90, dx:-30, dy: 0 }}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  {activeTradeTypes.import && (
                    <Line 
                      type="monotone" 
                      dataKey="import" 
                      stroke="#dc2626" 
                      strokeWidth={2}
                      name="Import"
                      dot={false}
                      activeDot={{ r: 4, stroke: '#dc2626', strokeWidth: 2 }}
                    />
                  )}
                  {activeTradeTypes.export && (
                    <Line 
                      type="monotone" 
                      dataKey="export" 
                      stroke="#16a34a" 
                      strokeWidth={2}
                      name="Export"
                      dot={false}
                      activeDot={{ r: 4, stroke: '#16a34a', strokeWidth: 2 }}
                    />
                  )}
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="line"
                    wrapperStyle={{ paddingTop: '20px' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
            
            {/* Data Summary */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-red-600 transition-all duration-500">
                  {summaryData.importVolume.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Total Import Volume (tons)</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600 transition-all duration-500">
                  {summaryData.exportVolume.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Total Export Volume (tons)</div>
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

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Country Trade Performance</CardTitle>
              <UITooltip>
                <TooltipTrigger>
                  <Info className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm max-w-xs">
                    Comprehensive trade performance rankings by country, including export volumes, import data, trade balance, and year-over-year growth metrics for pomegranate trade.
                  </p>
                </TooltipContent>
              </UITooltip>
            </div>
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
                        <UITooltip>
                          <TooltipTrigger>
                            <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-normal">Average export price per kilogram</p>
                          </TooltipContent>
                        </UITooltip>
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[140px] bg-muted/50 font-bold">
                      <div className="flex items-center">
                        <Button variant="ghost" size="sm" onClick={() => handleSort('exportValue')} className="h-auto p-0 font-bold">
                          Total Export Value (USD) <ArrowUpDown className="ml-1 h-3 w-3" />
                        </Button>
                        <UITooltip>
                          <TooltipTrigger>
                            <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-normal">Total value of exports for the period</p>
                          </TooltipContent>
                        </UITooltip>
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[140px] bg-muted/50 font-bold">
                      <div className="flex items-center">
                        <Button variant="ghost" size="sm" onClick={() => handleSort('importPrice')} className="h-auto p-0 font-bold">
                          Import Price (USD/kg) <ArrowUpDown className="ml-1 h-3 w-3" />
                        </Button>
                        <UITooltip>
                          <TooltipTrigger>
                            <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-normal">Average import price per kilogram</p>
                          </TooltipContent>
                        </UITooltip>
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[140px] bg-muted/50 font-bold">
                      <div className="flex items-center">
                        <Button variant="ghost" size="sm" onClick={() => handleSort('importValue')} className="h-auto p-0 font-bold">
                          Total Import Value (USD) <ArrowUpDown className="ml-1 h-3 w-3" />
                        </Button>
                        <UITooltip>
                          <TooltipTrigger>
                            <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-normal">Total value of imports for the period</p>
                          </TooltipContent>
                        </UITooltip>
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px] bg-muted/50 font-bold">
                      <div className="flex items-center">
                        <Button variant="ghost" size="sm" onClick={() => handleSort('growth')} className="h-auto p-0 font-bold">
                          Year-over-Year Growth (%) <ArrowUpDown className="ml-1 h-3 w-3" />
                        </Button>
                        <UITooltip>
                          <TooltipTrigger>
                            <Info className="ml-1 h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-normal">Percentage change compared to previous year</p>
                          </TooltipContent>
                        </UITooltip>
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
                      <TableCell>{formatLargeCurrency(row.exportValue)}</TableCell>
                      <TableCell>{formatCurrency(row.importPrice)}</TableCell>
                      <TableCell>{formatLargeCurrency(row.importValue)}</TableCell>
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
