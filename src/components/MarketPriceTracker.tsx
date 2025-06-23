import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Check, RotateCcw, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PriceData {
  country: string;
  price: number;
  previousPrice: number;
  change: string;
  isPositive: boolean;
  status: 'success' | 'warning' | 'loading';
  priceRange: { min: number; max: number };
  lastUpdated: string;
}

const MarketPriceTracker = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [timeRange, setTimeRange] = useState('Yearly');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatedPrices, setAnimatedPrices] = useState<boolean[]>([]);
  const [priceData, setPriceData] = useState<PriceData[]>([
    { 
      country: 'Peru', 
      price: 1.32,
      previousPrice: 1.27,
      change: '+4.15%', 
      isPositive: true, 
      status: 'warning',
      priceRange: { min: 1.25, max: 1.40 },
      lastUpdated: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true,
        timeZone: 'UTC'
      })
    },
    { 
      country: 'Turkey', 
      price: 1.12,
      previousPrice: 1.13,
      change: '-0.98%', 
      isPositive: false, 
      status: 'success',
      priceRange: { min: 1.05, max: 1.20 },
      lastUpdated: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true,
        timeZone: 'UTC'
      })
    },
    { 
      country: 'Spain', 
      price: 1.70,
      previousPrice: 1.73,
      change: '-1.62%', 
      isPositive: false, 
      status: 'success',
      priceRange: { min: 1.60, max: 1.80 },
      lastUpdated: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true,
        timeZone: 'UTC'
      })
    },
    { 
      country: 'India', 
      price: 0.82,
      previousPrice: 0.80,
      change: '+2.45%', 
      isPositive: true, 
      status: 'success',
      priceRange: { min: 0.75, max: 0.90 },
      lastUpdated: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true,
        timeZone: 'UTC'
      })
    },
    { 
      country: 'Iran', 
      price: 0.75,
      previousPrice: 0.75,
      change: '-0.71%', 
      isPositive: false, 
      status: 'success',
      priceRange: { min: 0.70, max: 0.80 },
      lastUpdated: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true,
        timeZone: 'UTC'
      })
    },
    { 
      country: 'Chile', 
      price: 1.68,
      previousPrice: 1.65,
      change: '+1.85%', 
      isPositive: true, 
      status: 'success',
      priceRange: { min: 1.60, max: 1.75 },
      lastUpdated: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true,
        timeZone: 'UTC'
      })
    },
    { 
      country: 'USA', 
      price: 1.02,
      previousPrice: 1.01,
      change: '+0.95%', 
      isPositive: true, 
      status: 'success',
      priceRange: { min: 0.95, max: 1.10 },
      lastUpdated: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true,
        timeZone: 'UTC'
      })
    },
    { 
      country: 'UAE', 
      price: 1.10,
      previousPrice: 1.10,
      change: '-0.45%', 
      isPositive: false, 
      status: 'success',
      priceRange: { min: 1.00, max: 1.20 },
      lastUpdated: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true,
        timeZone: 'UTC'
      })
    },
  ]);

  // Price ticker logic - update prices within realistic ranges
  useEffect(() => {
    const updatePrices = () => {
      setPriceData(prevData => 
        prevData.map(item => {
          const { min, max } = item.priceRange;
          const currentPrice = item.price;
          
          // Small fluctuation within range
          const fluctuation = (Math.random() - 0.5) * 0.02; // ±1% fluctuation
          let newPrice = currentPrice + fluctuation;
          
          // Keep within bounds
          newPrice = Math.max(min, Math.min(max, newPrice));
          
          // Calculate change percentage from previous price
          const changePercent = ((newPrice - item.previousPrice) / item.previousPrice * 100);
          const changeStr = changePercent >= 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`;
          
          return {
            ...item,
            price: parseFloat(newPrice.toFixed(2)),
            change: changeStr,
            isPositive: changePercent >= 0,
            lastUpdated: new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit', 
              hour12: true,
              timeZone: 'UTC'
            })
          };
        })
      );
    };

    const interval = setInterval(updatePrices, 45000); // Update every 45 seconds
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll effect (right to left marquee)
  useEffect(() => {
    const scrollContainer = document.querySelector('.marquee-scroll');
    if (!scrollContainer) return;

    const scrollStep = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scrollStep, 30);
    return () => clearInterval(interval);
  }, []);

  // Price animation effect
  useEffect(() => {
    const newAnimated = new Array(priceData.length).fill(false);
    setAnimatedPrices(newAnimated);
    
    const timeout = setTimeout(() => {
      setAnimatedPrices(new Array(priceData.length).fill(true));
    }, 500);

    return () => clearTimeout(timeout);
  }, [priceData.length]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <Check className="w-5 h-5 text-green-500 animate-pulse" />;
      case 'warning':
        return <RotateCcw className="w-5 h-5 text-yellow-500 animate-spin" />;
      default:
        return <Check className="w-5 h-5 text-green-500 animate-pulse" />;
    }
  };

  // Find the country with the biggest absolute percentage change
  const getTopMover = () => {
    return priceData.reduce((prev, current) => {
      const prevChange = Math.abs(parseFloat(prev.change.replace(/[+%]/g, '')));
      const currentChange = Math.abs(parseFloat(current.change.replace(/[+%]/g, '')));
      return currentChange > prevChange ? current : prev;
    });
  };

  const topMover = getTopMover();

  return (
    <TooltipProvider>
      <div className="mb-3">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-2 lg:space-y-0 mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground">Market Price Tracker</h2>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm max-w-xs space-y-2">
                  <p className="font-medium">Dummy Data System: Speculative Live Feed</p>
                  <p>This data is speculative and estimated using public data, web-scraped figures, and market patterns. It auto-updates every 30–60 seconds for MVP purposes.</p>
                  <p className="text-xs text-muted-foreground">Simulated pricing based on agricultural commodity exchanges, wholesale market reports, and historical price patterns.</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        {/* Auto-updating status */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">Auto-updating every 45 seconds</span>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-muted-foreground">Market activity is simulated for MVP preview</span>
        </div>
      
      {/* Horizontal Scrolling Container */}
      <div className="relative">
        <div 
          className="marquee-scroll flex overflow-x-auto gap-3 sm:gap-4 pb-4 scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {priceData.map((item, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-72 sm:w-80 md:w-64 bg-background border border-border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Pomegranate in {item.country}</h3>
                  <p className="text-xs text-muted-foreground">Last updated: {item.lastUpdated}</p>
                </div>
                {getStatusIcon(item.status)}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-bold text-foreground">${item.price.toFixed(2)}/kg</span>
                    <span className="text-xs text-muted-foreground">Previous: ${item.previousPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {item.isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-500 animate-bounce" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 animate-bounce" />
                    )}
                    <span 
                      className={`text-sm font-bold transition-all duration-700 ${
                        animatedPrices[index] ? 'scale-110' : 'scale-100'
                      } ${item.isPositive ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Duplicate cards for infinite scroll effect */}
          {priceData.map((item, index) => (
            <div
              key={`duplicate-${index}`}
              className="relative flex-shrink-0 w-72 sm:w-80 md:w-64 bg-background border border-border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Pomegranate in {item.country}</h3>
                  <p className="text-xs text-muted-foreground">Last updated: {item.lastUpdated}</p>
                </div>
                {getStatusIcon(item.status)}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-bold text-foreground">${item.price.toFixed(2)}/kg</span>
                    <span className="text-xs text-muted-foreground">Previous: ${item.previousPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {item.isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-bold ${item.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
      </div>
    </TooltipProvider>
  );
};

export default MarketPriceTracker;
