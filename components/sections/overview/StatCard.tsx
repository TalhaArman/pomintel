import React from 'react';
import { ExternalLinkIcon } from '../../IconComponents';
import Tooltip from '../../ui/Tooltip';

interface StatCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  isScrollable?: boolean;
  tooltipText?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, children, className = '', isScrollable = false, tooltipText }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md flex flex-col border border-gray-200 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {tooltipText && (
              <div className="ml-2 flex items-center">
                <Tooltip content={tooltipText} className="w-4 h-4" />
              </div>
            )}
        </div>
      </div>
      <div className={`flex-grow ${isScrollable ? 'overflow-y-auto' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default StatCard;