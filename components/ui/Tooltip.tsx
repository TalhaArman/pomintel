import React, { useState, useRef, useEffect, ReactNode, MouseEvent } from 'react';
import { InfoIcon } from '../IconComponents';

interface TooltipProps {
  content: string;
  children?: ReactNode;
  className?: string;
  position?: 'top' | 'bottom';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className, position = 'bottom' }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const trigger = children || <InfoIcon className={`w-4 h-4 text-gray-500 align-middle ${className || ''}`} />;

  return (
    <div className="relative inline-block align-middle" ref={tooltipRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center justify-center align-middle"
        aria-expanded={isOpen}
        aria-label="Toggle tooltip"
        style={{ verticalAlign: 'middle' }}
      >
        {trigger}
      </button>
      {isOpen && (
        <div>
          {/* Desktop Tooltip */}
          <div
            className={`hidden sm:block ${position === 'top' ? 'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2' : 'absolute top-full left-0 right-0 mx-auto mt-2'} w-max max-w-xs px-3 py-2 bg-gray-800 text-white text-xs rounded-md shadow-lg z-20`}
            style={{ minWidth: '120px', maxWidth: '90vw' }}
            role="tooltip"
          >
            {content}
            {/* Arrow */}
            {position === 'top' ? (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
            ) : (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-gray-800"></div>
            )}
          </div>
          {/* Mobile Tooltip: fixed, centered, always readable */}
          <div
            className={`block sm:hidden fixed left-1/2 bottom-6 transform -translate-x-1/2 w-[90vw] max-w-xs px-4 py-3 bg-gray-800 text-white text-sm rounded-lg shadow-2xl z-[9999] border border-gray-700`}
            style={{ minWidth: '120px', maxWidth: '90vw' }}
            role="tooltip"
          >
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
