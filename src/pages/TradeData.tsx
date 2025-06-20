import DashboardHeader from '@/components/DashboardHeader';
import TradeDataSection from '@/components/TradeDataSection';
import MarketPricesTable from '@/components/MarketPricesTable';

const TradeDataPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-4 lg:py-6 mt-[160px] lg:mt-[180px]">
        <div className="space-y-16">
          <section className="bg-card rounded-lg border p-6">
            <TradeDataSection />
          </section>
          <section className="bg-card rounded-lg border p-6">
            <MarketPricesTable />
          </section>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © 2025 Pomegranate Trade Dashboard. All rights reserved.
        </div>
      </main>
    </div>
  );
};

export default TradeDataPage;