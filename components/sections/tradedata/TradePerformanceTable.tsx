import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { TradePerformanceData } from '../../../types';
import { ArrowUpShortIcon, ArrowDownShortIcon, SortIcon, SortAscIcon, SortDescIcon, DoubleArrowSortIcon } from '../../IconComponents';
import Tooltip from '../../ui/Tooltip'; // Import Tooltip
import { INITIAL_TRADE_PERFORMANCE_DATA } from '../../../constants';

type SortKey = keyof TradePerformanceData;
type SortOrder = 'asc' | 'desc';

const columnTooltips: Record<SortKey, string> = {
    rank: "Country's rank based on overall trade performance.",
    country: "The country being measured.",
    exportPrice: "Average price per kilogram for exports from this country.",
    totalExportValue: "Total value of all pomegranate exports from this country in USD.",
    importPrice: "Average price per kilogram for imports to this country.",
    totalImportValue: "Total value of all pomegranate imports to this country in USD.",
    yoyGrowth: "Year-over-Year growth percentage of the country's total trade value.",
};

const TradePerformanceTable: React.FC = () => {
  const [data, setData] = useState<TradePerformanceData[]>(INITIAL_TRADE_PERFORMANCE_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const itemsPerPage = 5;

  const simulateDataRefresh = useCallback(() => {
    setData(prevData =>
      prevData.map(item => ({
        ...item,
        yoyGrowth: parseFloat((item.yoyGrowth + (Math.random() - 0.5) * 0.5).toFixed(1)) // Simulate small changes
      }))
    );
  }, []);
  
  useEffect(() => {
    const intervalId = setInterval(simulateDataRefresh, 120000); // Refresh every 2 minutes
    return () => clearInterval(intervalId);
  }, [simulateDataRefresh]);


  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortKey !== null) {
      sortableData.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA === null) return 1; // Null values go to the end
        if (valB === null) return -1;
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

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };
  
  const getSortIcon = (key: SortKey) => {
    return <DoubleArrowSortIcon className="w-4 h-4 ml-1 text-gray-400" />;
  };

  const columns: { key: SortKey; label: string; sortable: boolean, numeric?: boolean }[] = [
    { key: 'rank', label: 'Rank', sortable: true, numeric: true },
    { key: 'country', label: 'Country', sortable: true },
    { key: 'exportPrice', label: 'Export Price (USD/kg)', sortable: true, numeric: true },
    { key: 'totalExportValue', label: 'Total Export Value', sortable: true, numeric: true },
    { key: 'importPrice', label: 'Import Price (USD/kg)', sortable: true, numeric: true },
    { key: 'totalImportValue', label: 'Total Import Value', sortable: true, numeric: true },
    { key: 'yoyGrowth', label: 'YoY Growth', sortable: true, numeric: true },
  ];

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Trade Performance</h3>
      </div>
      <div className="overflow-x-auto">
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
            {paginatedData.map((item) => (
              <tr key={item.rank} className="hover:bg-gray-50 transition-colors">
                {columns.map(col => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {(() => {
                        const value = item[col.key];

                        if (value === null || typeof value === 'undefined') {
                            return <span className="text-gray-400">N/A</span>;
                        }

                        if (col.key === 'yoyGrowth') {
                            const numericValue = value as number;
                            return (
                                <span className={`flex items-center ${numericValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {numericValue >= 0 ? <ArrowUpShortIcon className="w-4 h-4 mr-1" /> : <ArrowDownShortIcon className="w-4 h-4 mr-1" />}
                                    {numericValue.toFixed(1)}%
                                </span>
                            );
                        }
                        
                        if (col.numeric) {
                            if (col.key.toLowerCase().includes('price')) {
                                return `$${(value as number).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                            }
                            if (col.key.toLowerCase().includes('value')) {
                                return `$${(value as number).toLocaleString()}`;
                            }
                            return (value as number).toLocaleString();
                        }
                        
                        return value;
                    })()}
                  </td>
                ))}
              </tr>
            ))}
             {paginatedData.length === 0 && (
                <tr>
                    <td colSpan={columns.length} className="text-center py-8 text-gray-500">No data available.</td>
                </tr>
             )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt; Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default TradePerformanceTable;