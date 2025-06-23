import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

const YOYGrowth = () => {
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

  const MiniChart = ({ value, isNegative }: { value: number; isNegative: boolean }) => (
    <div className="w-20 h-8 flex items-center justify-end">
      <svg width="50" height="20" viewBox="0 0 50 20" className="overflow-visible">
        <path
          d={isNegative ? "M0,10 Q12,14 25,12 T50,16" : "M0,15 Q12,10 25,8 T50,3"}
          stroke={isNegative ? "#ef4444" : "#22c55e"}
          strokeWidth="2.5"
          fill="none"
        />
      </svg>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-3xl font-bold">Year-over-Year Growth</h1>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm max-w-xs">
                Annual percentage change in pomegranate trade volume compared to the previous year. Data compiled from international trade statistics and market reports.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Annual Growth Trends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {yoyGrowthData.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 rounded-lg px-4 border-b border-gray-100 last:border-b-0">
              <span className="text-lg font-medium">{item.year}</span>
              <div className="flex items-center space-x-4">
                <span className={`text-lg font-semibold w-16 text-right ${
                  item.isNegative ? 'text-red-500' : 'text-green-500'
                }`}>
                  {item.isNegative ? '' : '+'}{item.value}%
                </span>
                <MiniChart value={item.value} isNegative={item.isNegative} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <h3 className="text-lg font-semibold text-green-600">Best Year</h3>
            <p className="text-2xl font-bold">2021</p>
            <p className="text-sm text-muted-foreground">+14.1% growth</p>
          </Card>
          <Card className="p-4 text-center">
            <h3 className="text-lg font-semibold text-red-600">Worst Year</h3>
            <p className="text-2xl font-bold">2018</p>
            <p className="text-sm text-muted-foreground">-11.1% decline</p>
          </Card>
        </div>
      </div>
      </div>
    </TooltipProvider>
  );
};

export default YOYGrowth;