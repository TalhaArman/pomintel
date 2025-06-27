
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TradeVolumeDataPoint, TradeType } from '../../../types';

interface TradeVolumeChartProps {
  data: TradeVolumeDataPoint[];
  tradeType: TradeType;
  showImport: boolean;
  showExport: boolean;
}

const TradeVolumeChart: React.FC<TradeVolumeChartProps> = ({ data, tradeType, showImport, showExport }) => {
  // Custom tooltip formatter for clarity. Data is in Tons, which is equivalent to "Thousand KG".
  const tooltipFormatter = (value: number, name: string) => {
    return [`${value.toLocaleString()}k KG`, name]; 
  };

  return (
    <div className="h-96 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /> {/* gray-200 */}
          <XAxis dataKey="month" stroke="#6b7280" dy={5} /> {/* gray-500, push labels down */}
          <YAxis 
            stroke="#6b7280" /* gray-500 */
            label={{ value: "Trade Volume (Thousand KG)", angle: -90, position: 'insideLeft', fill: '#4b5563', dy: 90, dx: -15, fontSize: 12 }} /* gray-600 */
            tick={{dx: -5}}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} /* white, gray-200 border, shadow */
            labelStyle={{ color: '#1f2937', fontWeight: 'bold', marginBottom: '4px', display: 'block' }} /* gray-800 */
            itemStyle={{ color: '#374151' }} /* gray-700 */
            formatter={tooltipFormatter}
          />
          <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '15px' }} />
          {(tradeType === TradeType.IMPORT || tradeType === TradeType.BOTH) && showImport && (
            <Line type="monotone" dataKey="importVolume" name="Import Volume" stroke="#F56565" strokeWidth={2} dot={false} activeDot={{ r: 6, strokeWidth: 2, stroke: '#c53030' }} />
          )}
          {(tradeType === TradeType.EXPORT || tradeType === TradeType.BOTH) && showExport && (
            <Line type="monotone" dataKey="exportVolume" name="Export Volume" stroke="#48BB78" strokeWidth={2} dot={false} activeDot={{ r: 6, strokeWidth: 2, stroke: '#2f855a' }} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TradeVolumeChart;
