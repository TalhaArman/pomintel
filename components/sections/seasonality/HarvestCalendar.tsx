
import React from 'react';
import { HarvestCalendarEntry } from '../../../types';
import { HARVEST_CALENDAR_DATA } from '../../../constants';

const HarvestCalendar: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Harvest Calendar</h3>
      <ul className="space-y-2">
        {HARVEST_CALENDAR_DATA.map((entry) => (
          <li key={entry.country} className="flex justify-between items-center text-sm py-1 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-700">{entry.country}:</span>
            <span className="text-gray-800 font-medium">{entry.period}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HarvestCalendar;
