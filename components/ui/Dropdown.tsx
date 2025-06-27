import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '../IconComponents';
import { DropdownOption } from '../../types';

interface DropdownProps<T = string> {
  options: DropdownOption<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
  label?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
}

const Dropdown = <T extends string | number,>({ 
  options, 
  selectedValue, 
  onSelect, 
  label,
  className = '',
  buttonClassName = '',
  menuClassName = ''
}: DropdownProps<T>): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === selectedValue) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {label && <span className="mr-2 text-sm text-gray-600">{label}</span>}
      <div>
        <button
          type="button"
          className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-gray-400 focus:bg-gray-100 transition-all duration-150 ${buttonClassName}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption?.label || 'Select...'}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" />
        </button>
      </div>

      {isOpen && (
        <div className={`origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white border border-gray-200 z-50 ${menuClassName}`}>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <a
                href="#"
                key={option.value.toString()}
                className={`block px-4 py-2 text-sm rounded transition-all duration-100 ${option.value === selectedValue ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                role="menuitem"
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
