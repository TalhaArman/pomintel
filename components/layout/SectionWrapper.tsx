import React from 'react';
import Tooltip from '../ui/Tooltip'; // Import the new component

interface SectionWrapperProps {
  id: string;
  title: string;
  tooltipText?: string;
  children: React.ReactNode;
  className?: string;
  headerContent?: React.ReactNode; // For filters or other controls in the header
  inlineHeaderContentMobile?: boolean; // New prop
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, tooltipText, children, className = '', headerContent, inlineHeaderContentMobile = false }) => {
  return (
    <section id={id} className={`py-12 md:py-16 bg-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`mb-8 flex ${inlineHeaderContentMobile ? 'flex-row items-center justify-start flex-wrap' : 'flex-col'} md:flex-row md:justify-between md:items-center`}
        >
          {/* Title, InfoIcon, and potentially inline mobile header content */}
          <div className={`flex items-center ${inlineHeaderContentMobile ? 'mr-auto' : ''} ${inlineHeaderContentMobile ? '' : 'mb-4'} md:mb-0`}>
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            {tooltipText && (
              <div className="ml-2 flex items-center">
                <Tooltip content={tooltipText} className="w-4 h-4" />
              </div>
            )}
            {/* Render headerContent inline for mobile if specified */}
            {headerContent && inlineHeaderContentMobile && (
              <div className="ml-4 md:hidden">{headerContent}</div>
            )}
          </div>
          
          {/* headerContent for desktop, or for mobile if not inline */}
          {headerContent && (
            <div 
              className={`
                ${inlineHeaderContentMobile ? 'hidden md:flex' : 'flex'} 
                items-center space-x-2 md:space-x-4 
                ${!inlineHeaderContentMobile ? 'w-full md:w-auto mt-4 md:mt-0' : ''}
              `}
            >
              {headerContent}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
