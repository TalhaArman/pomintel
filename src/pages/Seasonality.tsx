import DashboardHeader from '@/components/DashboardHeader';
import SeasonalityChart from '@/components/SeasonalityChart';

const SeasonalityPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-4 lg:py-6 mt-[160px] lg:mt-[180px]">
        <SeasonalityChart />
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © 2025 Pomegranate Trade Dashboard. All rights reserved.
        </div>
      </main>
    </div>
  );
};

export default SeasonalityPage;