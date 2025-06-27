import React from 'react';
import { MarketPrice } from '../../../types';
import { ArrowUpShortIcon, ArrowDownShortIcon } from '../../IconComponents';

interface PriceCardProps {
  data: MarketPrice;
}

const PriceCard: React.FC<PriceCardProps> = ({ data }) => {
  const change = data.price - data.previousPrice;
  const percentageChange = data.previousPrice !== 0 ? (change / data.previousPrice) * 100 : 0;
  const isPositive = change >= 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-64 mx-2 flex-shrink-0 marquee-item-wrapper border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900">{data.country} Pomegranates</h3>
      <p className="text-xs text-gray-500 mb-2">Last updated: {data.lastUpdate}</p>
      <div className="flex items-baseline mb-1">
        <p className="text-2xl font-bold text-gray-800">${data.price.toFixed(2)}/kg</p>
        <div className={`ml-2 text-sm flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUpShortIcon className="w-4 h-4 mr-1" /> : <ArrowDownShortIcon className="w-4 h-4 mr-1" />}
          <span>{percentageChange.toFixed(1)}%</span>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2">Previous Price: ${data.previousPrice.toFixed(2)}</div>
    </div>
  );
};

export default PriceCard;
