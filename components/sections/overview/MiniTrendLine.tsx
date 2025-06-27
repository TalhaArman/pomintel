
import React from 'react';

interface MiniTrendLineProps {
  isUp: boolean;
  className?: string;
}

const MiniTrendLine: React.FC<MiniTrendLineProps> = ({ isUp, className = "w-8 h-4" }) => {
  const color = isUp ? 'stroke-green-500' : 'stroke-red-500';
  const d = isUp ? "M1 10 L5 6 L9 8 L13 3" : "M1 3 L5 7 L9 5 L13 10";

  return (
    <svg className={className} viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={d} className={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default MiniTrendLine;
    