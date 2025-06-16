import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MarketPulsePage from "./pages/MarketPulse";
import TradeDataPage from "./pages/TradeData";
import MarketPricePage from "./pages/MarketPrice";
import SeasonalityPage from "./pages/Seasonality";
import Articles from "./pages/Articles";
import SpainBlog from "./pages/SpainBlog";
import TopExporters from "./components/TopExporters";
import TopImporters from "./components/TopImporters";
import YOYGrowth from "./components/YOYGrowth";
import TradeSnapshot from "./components/TradeSnapshot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/market-pulse" element={<MarketPulsePage />} />
          <Route path="/trade-data" element={<TradeDataPage />} />
          <Route path="/market-price" element={<MarketPricePage />} />
          <Route path="/seasonality" element={<SeasonalityPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/spain-blog" element={<SpainBlog />} />
          <Route path="/exporters" element={<TopExporters />} />
          <Route path="/importers" element={<TopImporters />} />
          <Route path="/growth" element={<YOYGrowth />} />
          <Route path="/snapshot" element={<TradeSnapshot />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
