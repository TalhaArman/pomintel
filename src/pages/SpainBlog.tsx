import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SpainBlog = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-4 lg:py-6 mt-[160px] lg:mt-[180px]">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>

        {/* Hero Image */}
        <div className="relative mb-8 rounded-lg overflow-hidden">
          <img 
            src="/lovable-uploads/e8402e07-f7a7-4e97-87bd-c3deb591bba9.png"
            alt="Spain Pomegranates"
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Article Content */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6 md:p-8 lg:p-12">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Spain's Silent Ascent: Pomegranates at the Crossroads of Climate, Culture, and Commerce
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>Published by: Pomintel</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>June 5, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Editorial Desk – Pomintel Intelligence Division</span>
              </div>
            </div>

            {/* Divider */}
            <div className="text-center mb-8">
              <span className="text-2xl text-muted-foreground">⸻</span>
            </div>

            {/* Overview Section */}
            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Spain is not the loudest voice in the global pomegranate trade—but it may be one of the most quietly influential. Nestled between tradition and innovation, Spain's pomegranate industry thrives on heritage cultivars, advanced agricultural practices, and strategic EU market positioning. As the demand for antioxidant-rich "superfruits" grows, Spain's producers—primarily centered in the southeast—are optimizing production while facing mounting climate and water-related pressures.
              </p>
            </section>

            {/* Divider */}
            <div className="text-center mb-8">
              <span className="text-2xl text-muted-foreground">⸻</span>
            </div>

            {/* Key Observations Section */}
            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Key Observations</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-medium">•</span>
                  <div>
                    <strong>Production Hub:</strong> The Valencia and Murcia regions account for more than 90% of Spain's pomegranate production, with the town of Elche in Alicante serving as the symbolic and logistical heart of the industry.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-medium">•</span>
                  <div>
                    <strong>Cultivar Specialty:</strong> Spain is globally recognized for the Mollar de Elche variety—a soft-seeded, sweet cultivar with Protected Designation of Origin (PDO) status within the European Union.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-medium">•</span>
                  <div>
                    <strong>EU Market Access:</strong> Spain benefits from frictionless trade within the EU bloc, allowing for rapid distribution to France, Germany, the Netherlands, and Italy—its top intra-European buyers.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-medium">•</span>
                  <div>
                    <strong>Harvest Timeline:</strong> The Spanish harvest typically begins in September and runs through November, positioning Spain as a dominant northern hemisphere supplier ahead of the winter holiday surge.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-medium">•</span>
                  <div>
                    <strong>Export Footprint:</strong> According to data from the Spanish Ministry of Agriculture and ICEX (Spain's Export Promotion Agency), over 55% of production is consumed domestically, with the rest exported—mostly fresh, but increasingly as juice and extract.
                  </div>
                </li>
              </ul>
            </section>

            {/* Divider */}
            <div className="text-center mb-8">
              <span className="text-2xl text-muted-foreground">⸻</span>
            </div>

            {/* Challenges Section */}
            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Challenges</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-destructive font-medium">•</span>
                  <div>
                    <strong>Water Scarcity:</strong> Spain's ongoing drought crisis, particularly in the Segura and Júcar river basins, has placed long-term strain on irrigation, especially in Murcia.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive font-medium">•</span>
                  <div>
                    <strong>Aging Workforce:</strong> As with many sectors in southern Spain, farming is increasingly seen as an unattractive profession for younger generations, creating a labor pipeline issue.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive font-medium">•</span>
                  <div>
                    <strong>Global Competition:</strong> Spain faces growing pressure from lower-cost producers like Egypt and Peru during overlapping market windows, driving down price margins.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-destructive font-medium">•</span>
                  <div>
                    <strong>Certification Costs:</strong> Organic and GlobalG.A.P. certifications, though valuable, remain expensive—limiting access for smaller co-ops and independent growers.
                  </div>
                </li>
              </ul>
            </section>

            {/* Divider */}
            <div className="text-center mb-8">
              <span className="text-2xl text-muted-foreground">⸻</span>
            </div>

            {/* Strategic Insights Section */}
            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Strategic Insights (Pomintel Analysis)</h2>
              <div className="bg-accent/50 p-6 rounded-lg">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Spain doesn't aim to compete through volume—but rather through quality, branding, and regional prestige. The Mollar de Elche cultivar gives Spain a premium identity that few other countries can replicate. Pomintel believes that with continued investment in water efficiency, export syndication, and traceability tools, Spain could double its premium export share by 2028—particularly in luxury grocery segments and functional food industries across Europe and North America.
                </p>
                <p className="font-semibold text-foreground">
                  Spain's edge lies not in expansion, but in refinement.
                </p>
              </div>
            </section>

            {/* Divider */}
            <div className="text-center mb-8">
              <span className="text-2xl text-muted-foreground">⸻</span>
            </div>

            {/* Sources Section */}
            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Sources</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-medium">•</span>
                  <span>Spanish Ministry of Agriculture (Ministerio de Agricultura, Pesca y Alimentación)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-medium">•</span>
                  <span>ICEX – España Exportación e Inversiones</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-medium">•</span>
                  <span>Mollar de Elche PDO Consortium</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-medium">•</span>
                  <span>Pomintel field interviews with farmers in Alicante and Murcia (Q1 2025)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-medium">•</span>
                  <span>Proprietary Pomintel forecasting models</span>
                </li>
              </ul>
            </section>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
              <Button 
                variant="outline" 
                onClick={() => navigate('/articles')}
                className="flex-1"
              >
                More Articles
              </Button>
              <Button 
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © 2025 Pomegranate Trade Dashboard. All rights reserved.
        </div>
      </main>
    </div>
  );
};

export default SpainBlog;