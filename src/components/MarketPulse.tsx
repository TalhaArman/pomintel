import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar, User, Building2, Info } from 'lucide-react';

const MarketPulse = () => {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedBlog, setSelectedBlog] = useState(null);
  
  const newsCards = [
    {
      title: "RED GOLD OF THE ANDES",
      subtitle: "Peru's Pomegranate Push: A Strategic Climb in Global Trade",
      description: "Export structure that accompanies managers and businessmen to successfully clarify and identify those opportunities in diverse markets in the global pomegranate market.",
      date: "JUN 5, 2024",
      image: "/lovable-uploads/3bcefcfd-4de2-43a7-986d-40333531df8a.png",
      category: "Peru",
      country: "Peru",
      fullContent: {
        title: "Red Gold of the Andes: Peru's Pomegranate Push",
        author: "Editorial Desk – Pomintel Intelligence Division",
        publisher: "Pomintel",
        date: "June 5, 2025",
        content: `Peru has emerged as the global leader in pomegranate exports, revolutionizing the industry with strategic agricultural investments and export infrastructure development.

Key Market Highlights:
• Peru accounts for over 40% of global pomegranate exports
• Export value has grown by 300% in the last decade
• The country has successfully positioned itself as the premium supplier
• Strategic harvest timing allows Peru to supply during off-seasons of other producers

Production Excellence:
Peru's success stems from its unique geographic advantages - the coastal desert climate provides optimal growing conditions with minimal pest pressure. The country has invested heavily in modern irrigation systems and post-harvest technology, ensuring consistent quality that meets international standards.

Export Strategy:
• Primary markets: United States, Europe, and Asia
• Focus on premium varieties like Wonderful and Red California
• Investment in cold chain logistics for extended shelf life
• Development of organic certification programs

Challenges and Opportunities:
While Peru leads the market, challenges remain including water scarcity concerns and increasing competition from emerging producers. However, the country's established infrastructure and quality reputation position it well for continued growth.

Future Outlook:
Industry experts predict Peru will maintain its leadership position through continued investment in technology and sustainable farming practices. The focus on premium markets and value-added products will drive further expansion.`
      }
    },
    {
      title: "Spain POMEGRANATES", 
      subtitle: "Spain's Silent Ascent: Pomegranates at the Crossroads of Climate, Culture, and Commerce",
      description: "Spain is not the loudest voice in the global pomegranate trade—but it may be one of the most quietly influential.",
      date: "JUN 5, 2024",
      image: "/lovable-uploads/e8402e07-f7a7-4e97-87bd-c3deb591bba9.png",
      category: "Spain",
      country: "Spain",
      fullContent: {
        title: "Spain's Silent Ascent: Pomegranates at the Crossroads of Climate, Culture, and Commerce",
        author: "Editorial Desk – Pomintel Intelligence Division",
        publisher: "Pomintel",
        date: "June 5, 2025",
        content: `Spain is not the loudest voice in the global pomegranate trade—but it may be one of the most quietly influential. Nestled between tradition and innovation, Spain's pomegranate industry thrives on heritage cultivars, advanced agricultural practices, and strategic EU market positioning.

Key Observations:
• Production Hub: The Valencia and Murcia regions account for more than 90% of Spain's pomegranate production
• Cultivar Specialty: Spain is globally recognized for the Mollar de Elche variety—a soft-seeded, sweet cultivar with PDO status
• EU Market Access: Spain benefits from frictionless trade within the EU bloc
• Harvest Timeline: The Spanish harvest typically begins in September and runs through November

Challenges:
• Water Scarcity: Spain's ongoing drought crisis has placed long-term strain on irrigation
• Aging Workforce: Farming is increasingly seen as unattractive for younger generations
• Global Competition: Spain faces pressure from lower-cost producers like Egypt and Peru

Strategic Insights:
Spain doesn't aim to compete through volume—but rather through quality, branding, and regional prestige. The Mollar de Elche cultivar gives Spain a premium identity that few other countries can replicate.`
      }
    },
    {
      title: "TURKEY",
      subtitle: "Turkey's Pomegranate Legacy: Between Tradition and Trade Expansion",
      description: "Digitally empowering production of pomegranates in the world's third-largest producer, while keeping close ties to trade patterns and leverage dating back to the Hittite Empire.",
      date: "JUN 5, 2024", 
      image: "/lovable-uploads/c4a1dffa-d9ce-4103-b126-91b9b627c9ee.png",
      category: "Turkey",
      country: "Turkey",
      fullContent: {
        title: "Turkey's Pomegranate Legacy: Between Tradition and Trade Expansion",
        author: "Editorial Desk – Pomintel Intelligence Division",
        publisher: "Pomintel",
        date: "June 5, 2025",
        content: `Turkey stands as the world's third-largest pomegranate producer, with deep-rooted traditions in pomegranate cultivation dating back to the Hittite Empire. The country leverages both traditional knowledge and modern agricultural techniques to maintain its position in the global market.

Historical Context:
• Pomegranate cultivation in Turkey dates back over 4,000 years
• The fruit holds cultural and religious significance in Turkish society
• Traditional varieties like Hicaznar and Ekşinar remain popular
• Ancient irrigation techniques combined with modern technology

Production Landscape:
Turkey's main production regions include Antalya, Mersin, and Adana provinces along the Mediterranean coast. These areas benefit from ideal climate conditions and centuries of accumulated agricultural knowledge passed down through generations.

Market Position:
• Third-largest global producer after Iran and India
• Significant domestic consumption market
• Growing export potential to European and Middle Eastern markets
• Focus on traditional varieties with unique flavor profiles

Challenges:
• Fragmented farm structure with many small producers
• Need for modernization in post-harvest handling
• Competition from larger-scale producers
• Climate change impacts on traditional growing regions

Innovation and Development:
Recent government initiatives focus on consolidating production, improving quality standards, and developing new export markets. Investment in processing facilities and cold storage infrastructure aims to extend the marketing season and add value to fresh production.

Future Strategy:
Turkey's approach emphasizes quality over quantity, leveraging its unique varieties and traditional knowledge while adopting modern agricultural practices to compete in premium market segments.`
      }
    }
  ];

  const countries = ['All', 'Peru', 'Spain', 'Turkey'];
  
  const filteredCards = selectedCountry === 'All' 
    ? newsCards 
    : newsCards.filter(card => card.country === selectedCountry);

  const scrollLeft = () => {
    const container = document.querySelector('.market-pulse-scroll');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.querySelector('.market-pulse-scroll');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <TooltipProvider>
      <div className="mb-6">
        {/* Header with dropdown filter */}
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Market Pulse</h2>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm max-w-xs">
                    Latest market intelligence reports and industry insights from major pomegranate producing countries. Articles compiled by Pomintel Intelligence Division based on market analysis and trade data.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          <div className="flex items-center gap-4">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-48 bg-white border-gray-300 text-gray-900 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm">
                <SelectValue placeholder="Countries: All" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 z-50">
                <SelectItem value="All" className="hover:bg-gray-100 focus:bg-gray-100">
                  Countries: All
                </SelectItem>
                <SelectItem value="Peru" className="hover:bg-gray-100 focus:bg-gray-100">
                  Peru
                </SelectItem>
                <SelectItem value="Spain" className="hover:bg-gray-100 focus:bg-gray-100">
                  Spain
                </SelectItem>
                <SelectItem value="Turkey" className="hover:bg-gray-100 focus:bg-gray-100">
                  Turkey
                </SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs sm:text-sm hidden sm:block rounded-full px-4 py-2"
              onClick={() => window.open('/articles', '_blank')}
            >
              View All
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {filteredCards.map((card, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => setSelectedBlog(card)}>
            <div className="relative">
              <img 
                src={card.image} 
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {card.category}
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{card.title}</h3>
              <h4 className="font-medium text-sm mb-3 text-muted-foreground line-clamp-2">{card.subtitle}</h4>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{card.description}</p>
              <p className="text-xs text-muted-foreground font-medium">{card.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile/Tablet Horizontal Scroll View */}
      <div className="lg:hidden relative">
        {/* Scroll Navigation Buttons */}
        {filteredCards.length > 1 && (
          <>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-gray-200"
                onClick={scrollLeft}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-gray-200"
                onClick={scrollRight}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </>
        )}

        {/* Horizontal Scrolling Container */}
        <div 
          className="market-pulse-scroll flex gap-4 overflow-x-auto pb-4 px-4 scroll-smooth snap-x snap-mandatory"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {filteredCards.map((card, index) => (
            <Card key={index} className="flex-shrink-0 w-80 sm:w-96 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer snap-center" onClick={() => setSelectedBlog(card)}>
              <div className="relative">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {card.category}
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{card.title}</h3>
                <h4 className="font-medium text-sm mb-3 text-muted-foreground line-clamp-2">{card.subtitle}</h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{card.description}</p>
                <p className="text-xs text-muted-foreground font-medium">{card.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .market-pulse-scroll::-webkit-scrollbar {
            display: none;
          }
          .market-pulse-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `
      }} />

      {/* Blog Post Dialog */}
      <Dialog open={!!selectedBlog} onOpenChange={() => setSelectedBlog(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold mb-4">
              {selectedBlog?.fullContent?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedBlog && (
            <div className="space-y-6">
              {/* Hero Image */}
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 pb-6 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span>Published by: {selectedBlog.fullContent.publisher}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedBlog.fullContent.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{selectedBlog.fullContent.author}</span>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none text-foreground">
                <div className="whitespace-pre-line leading-relaxed text-base">
                  {selectedBlog.fullContent.content}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      </div>
    </TooltipProvider>
  );
};

export default MarketPulse;
