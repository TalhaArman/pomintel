import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

const TradeSnapshot = () => {
  const tradeSnapshot = [
    { label: 'Top Exporter', value: 'Peru', icon: '🏆' },
    { label: 'Top Importer', value: 'USA', icon: '📈' },
    { label: 'Total Export Volume', value: '5,889', unit: 'thousand tons', icon: '📦' },
    { label: 'Total Import Volume', value: '4,776', unit: 'thousand tons', icon: '🚢' },
    { label: 'Active Countries Tracked', value: '5', unit: 'countries', icon: '🌍' },
    { label: 'Average Export Price', value: '$1.15/kg', unit: 'Global Weighted Avg', icon: '💲', tooltip: 'Weighted average export price per kilogram across all tracked countries.' },
  ];

  const additionalStats = [
    { label: 'Trade Balance', value: '+1,113', unit: 'thousand tons', trend: 'positive' },
    { label: 'Market Coverage', value: '85%', unit: 'global share', trend: 'stable' },
    { label: 'Growth Rate', value: '+2.1%', unit: 'YoY', trend: 'positive' },
  ];

  return (
    <TooltipProvider>
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-3xl font-bold">Trade Snapshot</h1>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm max-w-xs">
                Overview of global pomegranate trade volumes, key market players, and trade balance metrics. Data compiled from international trade databases and customs records.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tradeSnapshot.map((item, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">{item.icon}</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              <h3 className="text-lg font-semibold text-muted-foreground">{item.label}</h3>
              <Tooltip>
                <TooltipTrigger><Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                <TooltipContent>
                  {item.tooltip ? item.tooltip :
                    item.label === 'Top Exporter' && 'Country with the highest export volume.' ||
                    item.label === 'Top Importer' && 'Country with the highest import volume.' ||
                    item.label === 'Total Export Volume' && 'Total quantity exported (thousand tons).' ||
                    item.label === 'Total Import Volume' && 'Total quantity imported (thousand tons).' ||
                    item.label === 'Active Countries Tracked' && 'Number of countries included in trade tracking.'
                  }
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-2xl font-bold">{item.value}</p>
            {item.unit && (
              <p className="text-sm text-muted-foreground mt-1">{item.unit}</p>
            )}
          </Card>
        ))}
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Additional Trade Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalStats.map((stat, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <h4 className="text-sm font-medium text-muted-foreground">{stat.label}</h4>
                  <Tooltip>
                    <TooltipTrigger><Info className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                    <TooltipContent>
                      {stat.label === 'Trade Balance' && 'Difference between total exports and imports.'}
                      {stat.label === 'Market Coverage' && 'Share of global market covered by tracked countries.'}
                      {stat.label === 'Growth Rate' && 'Year-over-year change in trade volume.'}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className={`text-xl font-bold ${
                  stat.trend === 'positive' ? 'text-green-600' : 
                  stat.trend === 'negative' ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{stat.unit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 max-w-3xl mx-auto">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Market Insights</h3>
          <div className="space-y-3 text-sm">
            <p className="flex items-start space-x-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>Peru maintains its position as the leading exporter with 45% market share</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>USA leads imports with strong domestic demand of 38% share</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>Export volumes exceed import volumes by 1,113 thousand tons</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>Current tracking covers 5 major countries representing 85% of global trade</span>
            </p>
          </div>
        </Card>
      </div>
      </div>
    </TooltipProvider>
  );
};

export default TradeSnapshot;