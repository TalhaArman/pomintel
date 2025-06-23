import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { HelpCircle, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQTermsModal = ({ isOpen, onClose }: FAQTermsModalProps) => {
  const [activeTab, setActiveTab] = useState('faq');

  const faqData = [
    {
      question: "What is this platform?",
      answer: "This is a pomegranate trade dashboard that provides market insights, price tracking, and trade data for MVP demonstration purposes."
    },
    {
      question: "How accurate are the price updates?",
      answer: "The prices shown are speculative and based on simulated data for demonstration purposes. This is not real market data."
    },
    {
      question: "How often is the data updated?",
      answer: "Our dummy data system updates prices every 30-60 seconds to simulate real market activity."
    },
    {
      question: "Which countries are covered?",
      answer: "We currently track pomegranate prices for Peru, Turkey, Spain, India, Iran, Chile, USA, and UAE."
    },
    {
      question: "Can I use this data for real trading?",
      answer: "No, this is an MVP demonstration with simulated data. Do not use this information for actual trading decisions."
    },
    {
      question: "How do I contact support?",
      answer: "This is a demonstration platform. For inquiries about the actual product, please contact the development team."
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl w-[95vw] h-[90vh] sm:h-[85vh] p-0 flex flex-col [&>button]:hidden"
      >
        <DialogHeader className="px-3 sm:px-6 pt-3 sm:pt-6 pb-3 sm:pb-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base sm:text-xl font-semibold text-foreground">FAQ & Terms</DialogTitle>
            <DialogDescription className="sr-only">
              Access frequently asked questions and terms of use for the platform
            </DialogDescription>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-accent rounded-full"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <div className="px-3 sm:px-6 pt-2 sm:pt-4 flex-shrink-0">
            <TabsList className="grid w-full grid-cols-2 bg-muted h-8 sm:h-10">
              <TabsTrigger value="faq" className="text-xs sm:text-sm font-medium">FAQ</TabsTrigger>
              <TabsTrigger value="terms" className="text-xs sm:text-sm font-medium">Terms of Use</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">
            <TabsContent value="faq" className="h-full m-0 px-3 sm:px-6 pb-3 sm:pb-6">
              <ScrollArea className="h-full">
                <div className="pt-3 sm:pt-4 pr-2">
                  <h3 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-6 text-foreground">Frequently Asked Questions</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {faqData.map((faq, index) => (
                      <Accordion key={index} type="single" collapsible className="border border-border rounded-lg">
                        <AccordionItem value={`item-${index}`} className="border-none px-3 sm:px-4">
                          <AccordionTrigger className="text-left text-xs sm:text-base font-medium text-foreground hover:no-underline py-3 sm:py-4">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground text-xs sm:text-base leading-relaxed pb-3 sm:pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="terms" className="h-full m-0 px-3 sm:px-6 pb-3 sm:pb-6">
              <ScrollArea className="h-full">
                <div className="pt-3 sm:pt-4 pr-2">
                  <h3 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-6 text-foreground">Terms of Use</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-card border border-border rounded-lg p-3 sm:p-6">
                      <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-xs sm:text-base">1. Acceptance of Terms</h4>
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-base">
                        By accessing and using this platform, you accept and agree to be bound by the terms and provision of this agreement. This is a demonstration platform with simulated data.
                      </p>
                    </div>
                    
                    <div className="bg-card border border-border rounded-lg p-3 sm:p-6">
                      <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-xs sm:text-base">2. Platform Purpose</h4>
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-base">
                        This platform is designed as an MVP demonstration for pomegranate trade data visualization. All data shown is simulated and should not be used for actual trading decisions.
                      </p>
                    </div>
                    
                    <div className="bg-card border border-border rounded-lg p-3 sm:p-6">
                      <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-xs sm:text-base">3. Data Disclaimer</h4>
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-base">
                        All prices, market data, and trade information displayed on this platform are generated for demonstration purposes only. They do not represent real market conditions or actual trade data.
                      </p>
                    </div>
                    
                    <div className="bg-card border border-border rounded-lg p-3 sm:p-6">
                      <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-xs sm:text-base">4. Limitation of Liability</h4>
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-base">
                        The developers and operators of this platform shall not be liable for any damages or losses arising from the use of this demonstration system.
                      </p>
                    </div>
                    
                    <div className="bg-card border border-border rounded-lg p-3 sm:p-6">
                      <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-xs sm:text-base">5. Privacy Policy</h4>
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-base">
                        This is a demonstration platform. Any data entered or interactions performed are for testing purposes only. No real user data is collected or stored.
                      </p>
                    </div>
                    
                    <div className="bg-card border border-border rounded-lg p-3 sm:p-6">
                      <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-xs sm:text-base">6. Changes to Terms</h4>
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-base">
                        These terms may be updated as the platform evolves. Continued use of the platform constitutes acceptance of any changes.
                      </p>
                    </div>
                    
                    <div className="bg-muted border border-border rounded-lg p-3 sm:p-6">
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Last updated:</strong> {new Date().toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        This is placeholder content for the MVP demonstration. Real terms and conditions will be provided in the production version.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FAQTermsModal;