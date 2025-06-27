
import React, { useState } from 'react';
import { ChevronDownIcon } from '../IconComponents';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-3 bg-white shadow-sm">
      <button
        className="w-full flex justify-between items-center p-4 text-left text-gray-800 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title.replace(/\s+/g, '-')}`}
      >
        <span className="font-medium text-sm">{title}</span>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        id={`accordion-content-${title.replace(/\s+/g, '-')}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        role="region"
      >
        <div className="overflow-hidden">
            <div className="px-4 pb-4 text-gray-600 text-sm">
            {children}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
