import DashboardHeader from '@/components/DashboardHeader';
import TradeDataSection from '@/components/TradeDataSection';
import MarketPricesTable from '@/components/MarketPricesTable';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

const TradeDataPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <TooltipProvider>
        <main className="max-w-screen-lg mx-auto px-4 py-4 lg:py-6 mt-[160px] lg:mt-[180px]">
          <div className="space-y-16">
            <section className="bg-card rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold">Trade Data</h2>
                <Tooltip>
                  <TooltipTrigger><Info className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                  <TooltipContent>Interactive charts and summary of global pomegranate trade flows.</TooltipContent>
                </Tooltip>
              </div>
              <TradeDataSection />
            </section>
            <section className="bg-card rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold">Country Trade Performance</h2>
                <Tooltip>
                  <TooltipTrigger><Info className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                  <TooltipContent>Compare export/import values, prices, and growth by country.</TooltipContent>
                </Tooltip>
              </div>
              <MarketPricesTable />
            </section>
            <section className="bg-card rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  Market Prices
                  <Tooltip>
                    <TooltipTrigger><Info className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-help" /></TooltipTrigger>
                    <TooltipContent>Latest market prices per kilogram for major producing countries and an overview of their market trends.</TooltipContent>
                  </Tooltip>
                </h2>
              </div>
              {/* Insert Market Prices Table or relevant component here if needed */}
            </section>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © 2025 Pomegranate Trade Dashboard. All rights reserved.
          </div>
        </main>
      </TooltipProvider>
    </div>
  );
};

export default TradeDataPage;