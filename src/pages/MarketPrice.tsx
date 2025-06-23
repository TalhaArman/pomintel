import DashboardHeader from '@/components/DashboardHeader';
import MarketPriceTracker from '@/components/MarketPriceTracker';
import MarketPricesTable from '@/components/MarketPricesTable';

const MarketPricePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-4 lg:py-6 mt-[160px] lg:mt-[180px]">
        <MarketPriceTracker />
        <MarketPricesTable />
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © 2025 Pomegranate Trade Dashboard. All rights reserved.
        </div>
      </main>
    </div>
  );
};

export default MarketPricePage;