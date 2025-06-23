import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import FAQTermsModal from './FAQTermsModal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const FAQFloatingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground"
              size="icon"
            >
              <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>FAQ & Terms</p>
          </TooltipContent>
        </Tooltip>
        
        <FAQTermsModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </TooltipProvider>
  );
};

export default FAQFloatingButton;