import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SupplierNetworkModal from './SupplierNetworkModal';
import { useToast } from '@/hooks/use-toast';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('Global');
  const [activeSection, setActiveSection] = useState('overview');
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const { toast } = useToast();
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  
  const navItems = [
    { name: 'Overview', path: '/', sectionId: 'overview' },
    { name: 'Market Pulse', path: '/market-pulse', sectionId: 'market-pulse' },
    { name: 'Trade Data', path: '/trade-data', sectionId: 'trade-data' },
    { name: 'Market Price', path: '/market-price', sectionId: 'market-price' },
    { name: 'Seasonality', path: '/seasonality', sectionId: 'seasonality' }
  ];
  const regions = ['Global', 'North America', 'Europe', 'Asia', 'Middle East', 'Africa'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
      
      // Hide search bar when scrolling down, show when scrolling up or at top
      setShowSearchBar(scrollTop < 100);
      
      // Only update active section on homepage
      if (location.pathname === '/') {
        const headerHeight = 200;
        const sections = ['overview', 'market-pulse', 'trade-data', 'market-price', 'seasonality'];
        
        // Find the current active section based on scroll position
        let currentActiveSection = 'overview'; // default to overview
        
        for (let i = 0; i < sections.length; i++) {
          const element = document.getElementById(sections[i]);
          if (element) {
            const elementTop = element.offsetTop - headerHeight - 100;
            const elementBottom = elementTop + element.offsetHeight;
            
            // Check if current scroll position is within this section
            if (scrollTop >= elementTop && scrollTop < elementBottom) {
              currentActiveSection = sections[i];
              break;
            }
            // If we're past all sections, set to the last one
            if (i === sections.length - 1 && scrollTop >= elementTop) {
              currentActiveSection = sections[i];
            }
          }
        }
        
        setActiveSection(currentActiveSection);
      }
    };

    // Set initial active section
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleSubscribe = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!subscribeEmail) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscribeEmail)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }
    setSubscribeLoading(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'c74cd7ff-2723-44af-b9e6-fcd79504b4b4',
          email: subscribeEmail,
          subject: 'New Email Subscription',
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: 'Subscribed!',
          description: 'You have been subscribed for email updates.',
        });
        setSubscribeEmail('');
      } else {
        toast({
          title: 'Subscription Failed',
          description: result.message || 'There was an error subscribing. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Subscription Failed',
        description: 'There was an error subscribing. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubscribeLoading(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300 ${isScrolled ? 'shadow-lg shadow-black/20' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/43909c87-24d3-4214-b746-3b8486e8be80.png" 
                alt="PomIntel Logo" 
                className="w-20 h-20"
              />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navItems.map((item) => {
                const isHomePage = location.pathname === '/';
                const isActive = isHomePage 
                  ? activeSection === item.sectionId 
                  : location.pathname === item.path;

                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (isHomePage && item.sectionId) {
                        const element = document.getElementById(item.sectionId);
                        if (element) {
                          const headerHeight = 200; // Account for fixed header + subscription bar
                          const elementPosition = element.offsetTop - headerHeight;
                          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                        }
                      } else {
                        navigate(item.path);
                      }
                    }}
                    className={`text-sm font-medium transition-colors relative pb-4 ${
                      isActive
                        ? 'text-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search here" 
                className="pl-10 w-64 bg-muted/30"
              />
              <Button size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0">
                <Search className="w-4 h-4" />
              </Button>
            </div>

            {/* Region Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="space-x-2">
                  <span>Region: {selectedRegion}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border shadow-lg">
                {regions.map((region) => (
                  <DropdownMenuItem 
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className="cursor-pointer"
                  >
                    {region}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Early Access Button */}
            <Button 
              className="bg-black text-white hover:bg-black/90"
              onClick={() => setIsSupplierModalOpen(true)}
            >
              Early Access
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Mobile Region Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs h-9 px-3">
                  Region: {selectedRegion}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border shadow-lg z-50">
                {regions.map((region) => (
                  <DropdownMenuItem 
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className="cursor-pointer"
                  >
                    {region}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <div className="flex flex-col space-y-1">
                  <div className="w-6 h-0.5 bg-foreground"></div>
                  <div className="w-6 h-0.5 bg-foreground"></div>
                  <div className="w-6 h-0.5 bg-foreground"></div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col mb-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (location.pathname === '/' && item.sectionId) {
                      const element = document.getElementById(item.sectionId);
                      if (element) {
                        const headerHeight = 200; // Account for fixed header + subscription bar
                        const elementPosition = element.offsetTop - headerHeight;
                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                      }
                    } else {
                      navigate(item.path);
                    }
                    setIsMenuOpen(false);
                  }}
                  className={`text-sm font-medium transition-colors py-3 px-4 text-left border-b border-border/50 ${
                    (location.pathname === item.path) || (location.pathname === '/' && activeSection === item.sectionId)
                      ? 'text-foreground bg-muted/50' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
            
            {/* Mobile Search */}
            <div className="px-4 mb-4">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search here" 
                  className="pl-10 w-full bg-muted/30"
                />
              </div>
            </div>
            
            {/* Mobile Subscribe Section */}
            <div className="px-4 mb-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-3">Subscribe for email updates:</h3>
                <form
                  className="space-y-2"
                  onSubmit={handleSubscribe}
                >
                  <Input
                    placeholder="Enter your email"
                    className="w-full bg-background"
                    value={subscribeEmail}
                    onChange={e => setSubscribeEmail(e.target.value)}
                    type="email"
                    required
                  />
                  <Button
                    className="w-full bg-black text-white hover:bg-black/90"
                    type="submit"
                    disabled={subscribeLoading}
                  >
                    {subscribeLoading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
              </div>
            </div>

            {/* Early Access Button */}
            <div className="px-4">
              <Button 
                className="w-full bg-black text-white hover:bg-black/90 h-12"
                onClick={() => {
                  setIsSupplierModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Early Access
              </Button>
            </div>
          </div>
        )}
        
        {/* Mobile Search Bar - Collapsible on Scroll */}
        <div className={`md:hidden border-t border-border py-3 bg-background/95 backdrop-blur-sm transition-all duration-300 ${
          showSearchBar ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search here..." 
                className="pl-10 w-full bg-muted/30 h-10"
              />
              <Button 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Email Subscription Bar - Hidden on Mobile */}
      <div className="bg-black py-3 hidden md:block">
        <div className="container mx-auto px-4">
          <form
            className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4"
            onSubmit={handleSubscribe}
          >
            <span className="text-white text-sm font-medium">
              Subscribe for email updates:
            </span>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <Input
                placeholder="Enter your email"
                className="w-full sm:w-80 bg-white/10 border-white/20 text-white placeholder:text-white/70 h-9"
                value={subscribeEmail}
                onChange={e => setSubscribeEmail(e.target.value)}
                type="email"
                required
              />
              <Button
                className="w-full sm:w-auto bg-white text-black hover:bg-white/90 h-9"
                type="submit"
                disabled={subscribeLoading}
              >
                {subscribeLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Supplier Network Modal */}
      <SupplierNetworkModal 
        isOpen={isSupplierModalOpen} 
        onClose={() => setIsSupplierModalOpen(false)} 
      />
    </header>
  );
};

export default DashboardHeader;
