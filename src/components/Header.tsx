import { useState } from 'react';
import { Menu, X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FAQTermsModal from './FAQTermsModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              PomIntel
            </div>
          </div>
          
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors">
                Services
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </nav>

          <div className="hidden md:block">
            <Button>Get Started</Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <a href="#home" className="block px-3 py-2 text-foreground hover:text-primary">
                Home
              </a>
              <a href="#services" className="block px-3 py-2 text-foreground hover:text-primary">
                Services
              </a>
              <a href="#about" className="block px-3 py-2 text-foreground hover:text-primary">
                About
              </a>
              <a href="#contact" className="block px-3 py-2 text-foreground hover:text-primary">
                Contact
              </a>
              <button 
                onClick={() => setIsFAQModalOpen(true)} 
                className="w-full text-left block px-3 py-2 text-foreground hover:text-primary flex items-center gap-2"
              >
                <HelpCircle className="h-4 w-4" />
                FAQ & Terms
              </button>
              <div className="px-3 py-2">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        )}
        
        <FAQTermsModal 
          isOpen={isFAQModalOpen} 
          onClose={() => setIsFAQModalOpen(false)} 
        />
      </div>
    </header>
  );
};

export default Header;