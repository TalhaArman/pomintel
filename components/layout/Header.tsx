import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavItem } from '../../types';
import { PomegranateLogo, SearchIcon, MenuIcon, CloseIcon } from '../IconComponents';
import Dropdown from '../ui/Dropdown';
import { REGION_OPTIONS } from '../../constants';

interface HeaderProps {
  navItems: NavItem[];
  activeSection: string;
  onNavLinkClick: (id: string) => void;
  appName: string;
  onOpenEarlyAccessModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ navItems, activeSection, onNavLinkClick, appName, onOpenEarlyAccessModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>(REGION_OPTIONS[0].value);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 10; // A small buffer to prevent flickering

    // Hides when scrolling down
    if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
      if (isMobileSearchVisible) {
        setIsMobileSearchVisible(false);
      }
    } 
    // Shows when scrolling up
    else if (currentScrollY < lastScrollY.current - scrollThreshold) {
      if (!isMobileSearchVisible) {
        setIsMobileSearchVisible(true);
      }
    }

    // Always show at the very top
    if (currentScrollY < 10) {
        if (!isMobileSearchVisible) {
            setIsMobileSearchVisible(true);
        }
    }

    lastScrollY.current = currentScrollY;
  }, [isMobileSearchVisible]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const desktopLinkClasses = (isActive: boolean) =>
    `px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-300 ${
      isActive
        ? 'text-black border-black font-semibold'
        : 'text-gray-600 border-transparent hover:text-black'
    }`;
  
  const mobileLinkClasses = (isActive: boolean) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors text-left w-full ${
      isActive
        ? 'bg-black text-white'
        : 'text-gray-600 hover:bg-gray-200'
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & App Name */}
          <div className="flex items-center">
            <PomegranateLogo className="h-12 w-12 md:h-20 md:w-20" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); onNavLinkClick(item.id); }}
                  className={desktopLinkClasses(isActive)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          
          {/* Desktop Right Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search here..."
                className="bg-gray-100 text-gray-700 placeholder-gray-500 rounded-md py-2 px-4 pl-10 focus:ring-gray-500 focus:border-gray-500 focus:outline-none border border-gray-300"
              />
              <SearchIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <Dropdown
              options={REGION_OPTIONS}
              selectedValue={selectedRegion}
              onSelect={(value) => setSelectedRegion(value as string)}
            />
            <button 
              onClick={onOpenEarlyAccessModal}
              className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm"
            >
              Early Access
            </button>
          </div>

          {/* Mobile Header Controls */}
          <div className="md:hidden flex items-center">
             <Dropdown
                options={REGION_OPTIONS}
                selectedValue={selectedRegion}
                onSelect={(value) => setSelectedRegion(value as string)}
                buttonClassName="py-1 px-2 text-xs"
              />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <CloseIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (conditionally rendered and animated) */}
       <div className={`md:hidden bg-white px-4 pb-2 pt-1 transition-all duration-300 ease-in-out border-t border-gray-200 ${isMobileSearchVisible ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="relative">
            <input
              type="search"
              placeholder="Search here..."
              className="w-full bg-gray-100 text-gray-700 placeholder-gray-500 rounded-md py-2 px-3 pl-10 focus:ring-gray-500 focus:border-gray-500 focus:outline-none border border-gray-300"
            />
            <SearchIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
      </div>


      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); onNavLinkClick(item.id); setIsMobileMenuOpen(false); }}
                  className={mobileLinkClasses(isActive)}
                >
                  {item.label}
                </a>
              );
            })}
            <button 
              onClick={() => {
                onOpenEarlyAccessModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left mt-2 bg-black hover:bg-gray-800 text-white font-semibold py-2 px-3 rounded-md transition-colors"
            >
              Early Access
            </button>
          </div>
        </div>
      )}

      {/* Subscription Bar (Desktop and wider screens) */}
      <div className="hidden md:block bg-black text-white py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <label htmlFor="desktop-email-subscribe" className="text-sm font-medium text-white">Subscribe for email updates:</label>
          <div className="flex w-full sm:w-auto">
            <input type="email" id="desktop-email-subscribe" placeholder="your@email.com" className="flex-grow sm:flex-grow-0 sm:w-64 bg-black text-white placeholder-white rounded-l-md py-2 px-3 focus:ring-white focus:border-white focus:outline-none text-sm border border-white"/>
            <button className="bg-white hover:bg-gray-200 text-black font-semibold py-2 px-3 rounded-r-md transition-colors text-sm border border-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};