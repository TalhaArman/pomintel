import React, { useState, useMemo } from 'react';
import { MarketPriceDetail } from '../../../types';
import { SortIcon, SortAscIcon, SortDescIcon, DoubleArrowSortIcon } from '../../IconComponents';
import Tooltip from '../../ui/Tooltip';

interface MarketPricesTableProps {
  data: MarketPriceDetail[];
}

type SortKey = keyof MarketPriceDetail | null;
type SortOrder = 'asc' | 'desc';

const columnTooltips: Partial<Record<keyof MarketPriceDetail, string>> = {
    price: "The average speculative price per kilogram in USD, based on multiple sources.",
    status: "Indicates the freshness of the data. 'Fresh' means recently updated.",
};


const MarketPricesTable: React.FC<MarketPricesTableProps> = ({ data }) => {
  const [sortKey, setSortKey] = useState<SortKey>('price');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortKey) {
      sortableData.sort((a, b) => {
        const valA = a[sortKey as keyof MarketPriceDetail];
        const valB = b[sortKey as keyof MarketPriceDetail];

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        }
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortKey, sortOrder]);

  const handleSort = (key: keyof MarketPriceDetail) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (key: keyof MarketPriceDetail) => {
    return <DoubleArrowSortIcon className="w-4 h-4 ml-1 text-gray-400" />;
  };

  const getStatusColor = (status: MarketPriceDetail['status']) => {
    switch (status) {
      case 'Fresh': return 'bg-green-100 text-green-700';
      case '2-day old': return 'bg-yellow-100 text-yellow-700';
      case '3-day old': return 'bg-orange-100 text-orange-700';
      case 'Stale': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  const columns: { key: keyof MarketPriceDetail; label: string; sortable: boolean; }[] = [
    { key: 'country', label: 'Country', sortable: true },
    { key: 'commodity', label: 'Commodity', sortable: true },
    { key: 'price', label: 'Price (USD/kg)', sortable: true },
    { key: 'sources', label: 'Sources', sortable: false },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'lastUpdate', label: 'Last Update', sortable: true },
  ];


  return (
    <div className="overflow-x-auto bg-white p-1 rounded-lg shadow-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(col => (
               <th
                key={col.key}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center">
                  {col.label}
                  {col.sortable && getSortIcon(col.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((item, index) => (
            <tr key={`${item.country}-${item.commodity}-${index}`} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.country}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.commodity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">${item.price.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.sources.map(s => `$${s.toFixed(2)}`).join(', ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastUpdate}</td>
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
                <td colSpan={columns.length} className="text-center py-8 text-gray-500">No data available for current filters.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MarketPricesTable;