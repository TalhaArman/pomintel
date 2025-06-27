
import React from 'react';
import { ProductionInsight } from '../../../types';
import { PRODUCTION_INSIGHTS_DATA, SEASON_INDICATOR_LEGEND } from '../../../constants';

const ProductionInsights: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Insights</h3>
      <ul className="space-y-2 mb-6">
        {PRODUCTION_INSIGHTS_DATA.map((insight) => (
          <li key={insight.key} className="flex justify-between items-center text-sm py-1 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-600">{insight.key}:</span>
            <span className="text-gray-800 font-medium">{insight.value}</span>
          </li>
        ))}
      </ul>
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Season Indicators Legend:</h4>
        <ul className="space-y-1 text-xs">
          {SEASON_INDICATOR_LEGEND.map(indicator => (
             <li key={indicator.name} className="flex items-center">
                <span className={`w-3 h-3 rounded-full mr-2 ${indicator.color}`}></span>
                <span className="text-gray-600">{indicator.name}</span>
             </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductionInsights;
