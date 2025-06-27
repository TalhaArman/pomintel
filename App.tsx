import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Header } from './components/layout/Header';
import Footer from './components/layout/Footer';
import OverviewSection from './components/sections/overview/OverviewSection';
import MarketPulseSection from './components/sections/marketpulse/MarketPulseSection';
import TradeDataSection from './components/sections/tradedata/TradeDataSection';
import MarketPricesSection from './components/sections/marketprices/MarketPricesSection';
import SeasonalitySection from './components/sections/seasonality/SeasonalitySection';
import Modal from './components/ui/Modal'; // Import Modal
import EarlyAccessForm from './components/forms/EarlyAccessForm'; // Import EarlyAccessForm
import FaqAndTermsModal from './components/sections/shared/FaqAndTermsModal';
import { NAVIGATION_ITEMS, APP_NAME } from './constants';
import { NavItem } from './types';
import { QuestionMarkCircleIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(NAVIGATION_ITEMS[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // State for Early Access Modal
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const openEarlyAccessModal = () => setIsEarlyAccessModalOpen(true);
  const closeEarlyAccessModal = () => setIsEarlyAccessModalOpen(false);

  // State for FAQ & Terms Modal
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const openFaqModal = () => setIsFaqModalOpen(true);
  const closeFaqModal = () => setIsFaqModalOpen(false);


  const handleNavLinkClick = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      const headerOffset = 120; 
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const onScroll = useCallback(() => {
    let currentSection = NAVIGATION_ITEMS[0].id;
    const headerOffset = 150; 
    
    for (const item of NAVIGATION_ITEMS) {
      const element = sectionRefs.current[item.id];
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= headerOffset && rect.bottom >= headerOffset) {
          currentSection = item.id;
          break;
        }
      }
    }
    if (window.pageYOffset < headerOffset / 2) {
        currentSection = NAVIGATION_ITEMS[0].id;
    }
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (window.pageYOffset + clientHeight >= scrollHeight - 50) { 
        currentSection = NAVIGATION_ITEMS[NAVIGATION_ITEMS.length - 1].id;
    }

    setActiveSection(currentSection);
  }, []); 

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header
        navItems={NAVIGATION_ITEMS}
        activeSection={activeSection}
        onNavLinkClick={handleNavLinkClick}
        appName={APP_NAME}
        onOpenEarlyAccessModal={openEarlyAccessModal}
      />
      <main className="flex-grow">
        <div ref={el => { sectionRefs.current['overview'] = el; }}><OverviewSection /></div>
        <div ref={el => { sectionRefs.current['market-pulse'] = el; }}><MarketPulseSection /></div>
        <div ref={el => { sectionRefs.current['trade-data'] = el; }}><TradeDataSection /></div>
        <div ref={el => { sectionRefs.current['market-prices'] = el; }}><MarketPricesSection /></div>
        <div ref={el => { sectionRefs.current['seasonality'] = el; }}><SeasonalitySection /></div>
      </main>
      <Footer />

      {/* Early Access Modal */}
      <Modal 
        isOpen={isEarlyAccessModalOpen} 
        onClose={closeEarlyAccessModal} 
        title="Join the Pomintel Supplier Network"
      >
        <EarlyAccessForm onClose={closeEarlyAccessModal} />
      </Modal>

      {/* FAQ & Terms Modal */}
      <Modal 
        isOpen={isFaqModalOpen} 
        onClose={closeFaqModal} 
        title="FAQ & Terms"
      >
        <FaqAndTermsModal />
      </Modal>

      {/* Floating FAQ Button */}
      <button
        onClick={openFaqModal}
        className="fixed bottom-6 right-6 bg-black hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
        aria-label="Open FAQ and Terms"
      >
        <QuestionMarkCircleIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default App;