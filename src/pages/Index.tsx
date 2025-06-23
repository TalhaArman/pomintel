import DashboardHeader from '@/components/DashboardHeader';
import MarketPriceTracker from '@/components/MarketPriceTracker';
import OverviewSection from '@/components/OverviewSection';
import MarketPulse from '@/components/MarketPulse';
import TradeDataSection from '@/components/TradeDataSection';
import MarketPricesTable from '@/components/MarketPricesTable';
import SeasonalityChart from '@/components/SeasonalityChart';
import FAQFloatingButton from '@/components/FAQFloatingButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 lg:py-6 mt-[160px] lg:mt-[180px]">
        <div id="overview">
          <MarketPriceTracker />
          <OverviewSection />
        </div>
        <div id="market-pulse">
          <MarketPulse />
        </div>
        <div id="trade-data">
          <TradeDataSection />
        </div>
        <div id="market-price">
          <MarketPricesTable />
        </div>
        <div id="seasonality">
          <SeasonalityChart />
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © 2025 Pomegranate Trade Dashboard. All rights reserved.
        </div>
      </main>
      
      {/* Floating FAQ & Terms Button */}
      <FAQFloatingButton />
    </div>
  );
};

export default Index;
