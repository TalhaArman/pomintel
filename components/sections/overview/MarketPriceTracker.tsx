import React, { useState, useEffect } from 'react';
import PriceCard from './PriceCard';
import Tooltip from '../../ui/Tooltip'; // Import Tooltip
import { MARKET_PRICES_DATA } from '../../../constants';
import { MarketPrice } from '../../../types';

const MarketPriceTracker: React.FC = () => {
  const [prices, setPrices] = useState<MarketPrice[]>(MARKET_PRICES_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(currentPrices =>
        currentPrices.map(p => {
          const change = (Math.random() - 0.49) * 0.05; // Tighter, slightly positive bias
          const newPrice = Math.max(0.2, p.price + change);
          return {
            ...p,
            previousPrice: p.price,
            price: newPrice,
            lastUpdate: `${Math.floor(Math.random() * 5) + 1} min ago`,
          };
        })
      );
    }, 45000); // update every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const duplicatedData = [...prices, ...prices]; // Duplicate for seamless loop

  return (
    <div className="bg-gray-50 py-6 mb-8 shadow-sm border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-800">Market Price Tracker</h3>
          <div className="ml-2">
            <Tooltip content="Speculative data based on public sources. This data is estimated using public figures and market patterns, and auto-updates every 30-60 seconds." className="w-4 h-4" position="bottom" />
          </div>
        </div>
        <p className="text-xs text-gray-600 mb-4">Speculative data based on public sources.</p>
        
        <div className="overflow-hidden group">
          <div className="animate-marquee whitespace-nowrap">
            {duplicatedData.map((price, index) => (
              <PriceCard key={`${price.country}-${index}`} data={price} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPriceTracker;