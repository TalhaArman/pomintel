import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, TrendingUp } from 'lucide-react';

const Articles = () => {
  const articles = [
    {
      id: 'peru-pomegranate-push',
      title: 'Peru\'s Pomegranate Push: A Strategic Climb in Global Trade',
      country: 'Peru',
      publishDate: '2025-06-05',
      readTime: '6 min read',
      author: 'Editorial Desk – Pomintel Intelligence Division',
      summary: 'Peru, historically known for its thriving agro-export sectors like avocados, mangoes, and blueberries, is now quietly increasing its presence in the global pomegranate market.',
      image: '/lovable-uploads/c4a1dffa-d9ce-4103-b126-91b9b627c9ee.png',
      tags: ['Peru', 'Export Strategy', 'Market Analysis', 'Trade Intelligence'],
      content: `
        <div class="prose prose-lg max-w-none">
          <div class="bg-muted/30 p-4 rounded-lg mb-6">
            <p class="text-sm text-muted-foreground mb-1"><strong>Published by:</strong> Pomintel</p>
            <p class="text-sm text-muted-foreground mb-1"><strong>Date:</strong> June 5, 2025</p>
            <p class="text-sm text-muted-foreground"><strong>Author:</strong> Editorial Desk – Pomintel Intelligence Division</p>
          </div>
          
          <h2><strong>Overview</strong></h2>
          <p>Peru, historically known for its thriving agro-export sectors like avocados, mangoes, and blueberries, is now quietly increasing its presence in the global pomegranate market. Though not as dominant as traditional powerhouses like India or Turkey, Peru is positioning itself strategically to capture greater market share leveraging both its diverse microclimates and growing export infrastructure.</p>
          
          <h2><strong>Key Observations</strong></h2>
          <ul>
            <li><strong>Emerging Export Player:</strong> According to trade data accessed from SUNAT (Peru's National Customs Authority), Peru's pomegranate exports have increased steadily since 2021. Though exact year-over-year growth rates remain limited in public reports, industry insiders suggest a compound annual growth rate (CAGR) between 6–9%.</li>
            <li><strong>Primary Export Markets:</strong> Europe remains Peru's top destination for pomegranates, especially the Netherlands and Spain, which act as import hubs for redistribution across the EU.</li>
            <li><strong>Harvest Timeline:</strong> The Peruvian harvest typically begins between February and April, offering a counter-seasonal advantage over northern hemisphere producers. This timing allows Peruvian exporters to fill gaps in supply during off-seasons elsewhere.</li>
            <li><strong>Production Zones:</strong> Key producing regions include Ica, Arequipa, and La Libertad—areas already equipped with advanced irrigation systems from Peru's experience in other fruit exports.</li>
            <li><strong>Cultivar Focus:</strong> The 'Wonderful' variety continues to dominate, but exporters are beginning to experiment with Mollar de Elche and other higher-sugar cultivars to meet premium market demand.</li>
          </ul>
          
          <h2><strong>Challenges</strong></h2>
          <ul>
            <li><strong>Supply Chain Volatility:</strong> While Peruvian exporters benefit from proximity to ports and logistics corridors, infrastructure fatigue and freight congestion at Callao and Paita ports remain ongoing concerns.</li>
            <li><strong>Climatic Risks:</strong> The El Niño phenomenon remains a consistent threat, impacting both yield quality and timing.</li>
            <li><strong>Market Recognition:</strong> Unlike its avocado success, Peru's pomegranate sector lacks broad brand visibility. Buyers often associate the fruit with Middle Eastern or South Asian producers, limiting Peru's perceived authority.</li>
          </ul>
          
          <h2><strong>Strategic Insights (Pomintel Analysis)</strong></h2>
          <p>Peru is poised to emerge as a "quiet contender"—not aiming to dominate but to specialize. Its counter-seasonal advantage, maturing cold chain logistics, and proximity to premium markets suggest a strategic lane for growth in boutique and high-value markets such as Germany, Canada, and select East Asian buyers.</p>
          
          <p>By 2027, Pomintel projects Peru could capture 2–4% of global pomegranate export share, particularly if it develops traceability systems, invests in branding efforts, and diversifies beyond the 'Wonderful' cultivar.</p>
          
          <h2><strong>Sources</strong></h2>
          <ul>
            <li>SUNAT (Customs & Trade Intelligence)</li>
            <li>TradeMap.org (Global Trade Data Portal)</li>
            <li>Interviews with exporters in Ica and La Libertad (Pomintel Interviews, Q1 2025)</li>
            <li>Pomintel market analysis and proprietary modeling</li>
          </ul>
        </div>
      `
    },
    {
      id: 'peru-pomegranate-industry',
      title: 'Peru\'s Pomegranate Industry: Leading Global Export Markets',
      country: 'Peru',
      publishDate: '2025-06-15',
      readTime: '8 min read',
      summary: 'Peru has emerged as the world\'s leading pomegranate exporter, with innovative farming techniques and strategic market positioning driving unprecedented growth in international trade.',
      image: '/public/lovable-uploads/cbf0b1fa-0313-4ae4-b95a-265580acca07.png',
      tags: ['Export', 'Peru', 'Market Analysis', 'Agriculture'],
      content: `
        <div class="prose prose-lg max-w-none">
          <h2>Peru's Rise to Global Pomegranate Leadership</h2>
          <p>Peru has transformed from a minor player to the world's dominant pomegranate exporter, capturing over 40% of global export markets. This remarkable achievement stems from strategic agricultural investments, favorable climate conditions, and sophisticated supply chain management.</p>
          
          <h3>Key Success Factors</h3>
          <ul>
            <li><strong>Optimal Growing Conditions:</strong> Peru's diverse microclimates provide year-round growing seasons, enabling counter-seasonal exports to Northern Hemisphere markets.</li>
            <li><strong>Technology Adoption:</strong> Modern irrigation systems, precision agriculture, and post-harvest technology ensure consistent quality and extended shelf life.</li>
            <li><strong>Export Infrastructure:</strong> Strategic port locations and cold chain logistics facilitate efficient global distribution.</li>
            <li><strong>Quality Standards:</strong> Compliance with international food safety standards has opened premium market opportunities.</li>
          </ul>
          
          <h3>Market Performance</h3>
          <p>Peru's pomegranate exports have grown from $50 million in 2010 to over $300 million in 2024, representing a compound annual growth rate of 14.2%. Major export destinations include:</p>
          
          <ul>
            <li>United States (35% of exports)</li>
            <li>European Union (28% of exports)</li>
            <li>China (15% of exports)</li>
            <li>Canada (12% of exports)</li>
            <li>Other markets (10% of exports)</li>
          </ul>
          
          <h3>Production Regions</h3>
          <p>The primary pomegranate-producing regions in Peru include:</p>
          <ul>
            <li><strong>Ica:</strong> 65% of national production, known for premium fruit quality</li>
            <li><strong>La Libertad:</strong> 20% of production, emerging region with expansion potential</li>
            <li><strong>Lima:</strong> 10% of production, focused on domestic and regional markets</li>
            <li><strong>Arequipa:</strong> 5% of production, specialized in organic varieties</li>
          </ul>
          
          <h3>Challenges and Opportunities</h3>
          <p>Despite remarkable success, Peru's pomegranate industry faces several challenges:</p>
          <ul>
            <li>Water scarcity in key growing regions</li>
            <li>Increasing competition from emerging exporters</li>
            <li>Climate change impacts on production cycles</li>
            <li>Need for continued investment in technology and infrastructure</li>
          </ul>
          
          <p>However, opportunities for growth remain substantial:</p>
          <ul>
            <li>Expanding market penetration in Asia-Pacific</li>
            <li>Development of value-added products</li>
            <li>Organic and sustainable production certification</li>
            <li>Direct-to-consumer sales channels</li>
          </ul>
          
          <h3>Future Outlook</h3>
          <p>Industry experts project continued growth for Peru's pomegranate sector, with export values potentially reaching $500 million by 2030. Key drivers include expanding global demand for superfruits, Peru's proven production capabilities, and ongoing investments in agricultural technology.</p>
          
          <p>Peru's success story serves as a model for other agricultural exporters, demonstrating how strategic planning, quality focus, and market development can transform a commodity into a high-value export industry.</p>
        </div>
      `
    },
    {
      id: 'turkey-pomegranate-legacy',
      title: 'Turkey\'s Pomegranate Legacy: Between Tradition and Trade Expansion',
      country: 'Turkey',
      publishDate: '2025-06-05',
      readTime: '6 min read',
      author: 'Editorial Desk – Pomintel Intelligence Division',
      summary: 'Turkey stands as one of the oldest and most culturally entrenched producers of pomegranates in the world. With a historical lineage dating back to the Hittite Empire, the country blends ancient reverence with modern trade ambition.',
      image: '/lovable-uploads/3bcefcfd-4de2-43a7-986d-40333531df8a.png',
      tags: ['Turkey', 'Heritage', 'Export Strategy', 'Trade Analysis'],
      content: `
        <div class="prose prose-lg max-w-none">
          <div class="bg-muted/30 p-4 rounded-lg mb-6">
            <p class="text-sm text-muted-foreground mb-1"><strong>Published by:</strong> Pomintel</p>
            <p class="text-sm text-muted-foreground mb-1"><strong>Date:</strong> June 5, 2025</p>
            <p class="text-sm text-muted-foreground"><strong>Author:</strong> Editorial Desk – Pomintel Intelligence Division</p>
          </div>
          
          <h2><strong>Overview</strong></h2>
          <p>Turkey stands as one of the oldest and most culturally entrenched producers of pomegranates in the world. With a historical lineage dating back to the Hittite Empire, the country blends ancient reverence with modern trade ambition. While much of its pomegranate production still feeds domestic consumption, Turkey has steadily climbed to become one of the top global exporters, with eyes on newer, value-added markets and expanded agritech capacity.</p>
          
          <h2><strong>Key Observations</strong></h2>
          <ul>
            <li><strong>Global Export Position:</strong> According to the Turkish Statistical Institute (TurkStat), Turkey is consistently among the top 5 pomegranate exporters globally, with over 100,000 metric tons exported in 2023.</li>
            <li><strong>Production Regions:</strong> Major growing areas include Antalya, Şanlıurfa, Mersin, and Gaziantep—regions with deep-rooted agricultural infrastructure and generational expertise.</li>
            <li><strong>Cultivar Diversity:</strong> The dominant commercial variety is Hicaznar, known for its deep red color, long shelf life, and high acidity, favored by European buyers.</li>
            <li><strong>Domestic vs. Export Balance:</strong> Despite export strength, Turkey retains over 70% of its pomegranate yield for domestic use due to cultural, religious, and industrial demand—especially in juice processing and traditional medicine.</li>
            <li><strong>Export Markets:</strong> The European Union, particularly Germany, the Netherlands, and the UK, remains Turkey's largest buyer bloc, followed by Russia and Iraq.</li>
          </ul>
          
          <h2><strong>Challenges</strong></h2>
          <ul>
            <li><strong>Climate Instability:</strong> Unpredictable rainfall, early frost, and prolonged heatwaves continue to disrupt flowering and harvest timelines.</li>
            <li><strong>Political Volatility:</strong> Regional instability and currency devaluation (notably the Turkish Lira's fluctuations) complicate long-term pricing, procurement, and foreign investment.</li>
            <li><strong>Logistics Pressure:</strong> Rising fuel costs and occasional bottlenecks in İzmir, Mersin, and İskenderun ports limit fresh export speed and quality preservation.</li>
            <li><strong>Traceability and Certification:</strong> Global ESG standards are tightening. Turkey is under pressure to improve systems for organic certification, pesticide transparency, and labor conditions monitoring.</li>
          </ul>
          
          <h2><strong>Strategic Insights (Pomintel Analysis)</strong></h2>
          <p>Turkey is at a crossroads—straddling its identity as a cultural guardian of the pomegranate and a potential agribusiness titan in global fruit trade. Pomintel forecasts that with continued investment in solar-cooled storage, export co-ops, and digital traceability tech, Turkey could raise its pomegranate export value by 15–20% over the next 3 years.</p>
          
          <p>However, the key lies in brand positioning. While India leads in volume and Peru rises through counter-seasonality, Turkey must own the narrative of "heritage-quality pomegranates" — a blend of tradition, purity, and precision farming. That is where its true strength lies.</p>
          
          <h2><strong>Sources</strong></h2>
          <ul>
            <li>Turkish Statistical Institute (TurkStat)</li>
            <li>Ministry of Agriculture and Forestry, Republic of Turkey</li>
            <li>Pomintel Interviews with exporters in Mersin and Gaziantep (Q1 2025)</li>
            <li>Eurostat trade data (2022–2024)</li>
            <li>Pomintel market modeling and strategic index</li>
          </ul>
        </div>
      `
    },
    {
      id: 'spain-pomegranate-innovation',
      title: 'Spain\'s Pomegranate Innovation: Mediterranean Excellence Meets Technology',
      country: 'Spain',
      publishDate: '2025-06-05',
      readTime: '7 min read',
      summary: 'Spain has positioned itself as a premium pomegranate producer in Europe, leveraging advanced agricultural technology and strategic market positioning to compete with global leaders.',
      image: '/public/lovable-uploads/cbf0b1fa-0313-4ae4-b95a-265580acca07.png',
      tags: ['Spain', 'Innovation', 'Technology', 'Premium Markets'],
      content: `
        <div class="prose prose-lg max-w-none">
          <h2>Spain's Premium Pomegranate Strategy</h2>
          <p>Spain has carved out a distinctive niche in the global pomegranate market by focusing on premium quality, technological innovation, and strategic positioning within European markets. While not among the largest producers by volume, Spain has achieved remarkable success in value-per-unit metrics.</p>
          
          <h3>Strategic Market Positioning</h3>
          <p>Spain's approach to pomegranate production differs significantly from volume-focused competitors. The strategy emphasizes:</p>
          
          <ul>
            <li><strong>Premium Quality Focus:</strong> Targeting high-end European markets with superior fruit quality</li>
            <li><strong>Technological Integration:</strong> Advanced farming techniques and precision agriculture</li>
            <li><strong>Sustainability Leadership:</strong> Environmental stewardship and sustainable farming practices</li>
            <li><strong>Regional Branding:</strong> Leveraging Spain's reputation for quality Mediterranean produce</li>
          </ul>
          
          <h3>Production Centers</h3>
          <p>Spanish pomegranate production is concentrated in regions with optimal Mediterranean climate conditions:</p>
          
          <ul>
            <li><strong>Andalusia:</strong> 70% of national production, particularly in Almería and Granada provinces</li>
            <li><strong>Murcia:</strong> 20% of production, known for early-season varieties</li>
            <li><strong>Valencia:</strong> 10% of production, focused on premium market segments</li>
          </ul>
          
          <h3>Technological Innovation</h3>
          <p>Spain's pomegranate industry has embraced cutting-edge agricultural technology:</p>
          
          <ul>
            <li><strong>Precision Irrigation:</strong> Drip irrigation systems with soil moisture monitoring</li>
            <li><strong>Climate Control:</strong> Protected cultivation in high-tech greenhouses</li>
            <li><strong>Quality Monitoring:</strong> Optical sorting and quality assessment systems</li>
            <li><strong>Traceability Systems:</strong> Complete supply chain tracking from farm to consumer</li>
            <li><strong>Sustainable Practices:</strong> Integrated pest management and organic certification</li>
          </ul>
          
          <h3>Market Performance</h3>
          <p>Spain's pomegranate industry has achieved impressive market performance metrics:</p>
          
          <ul>
            <li>Production: 50,000 tons annually</li>
            <li>Export value: $85 million (2024)</li>
            <li>Average export price: $2.10/kg (premium to global average)</li>
            <li>Growth rate: 12% annually over the past five years</li>
          </ul>
          
          <h3>Export Markets</h3>
          <p>Spanish pomegranates command premium prices in key markets:</p>
          
          <ul>
            <li><strong>Germany:</strong> 30% of exports, high-end retail chains</li>
            <li><strong>France:</strong> 25% of exports, gourmet and organic markets</li>
            <li><strong>United Kingdom:</strong> 20% of exports, premium supermarket segments</li>
            <li><strong>Netherlands:</strong> 15% of exports, re-export hub for Northern Europe</li>
            <li><strong>Scandinavia:</strong> 10% of exports, luxury food markets</li>
          </ul>
          
          <h3>Competitive Advantages</h3>
          <p>Spain's success in premium pomegranate markets stems from several key advantages:</p>
          
          <ul>
            <li><strong>Proximity to Markets:</strong> Short transport distances to major European consumers</li>
            <li><strong>Quality Reputation:</strong> Spain's brand recognition for premium Mediterranean produce</li>
            <li><strong>Advanced Logistics:</strong> Sophisticated cold chain and distribution networks</li>
            <li><strong>Research and Development:</strong> Collaboration with agricultural research institutions</li>
            <li><strong>Seasonal Advantage:</strong> Counter-seasonal production for Northern Hemisphere markets</li>
          </ul>
          
          <h3>Innovation in Varieties</h3>
          <p>Spanish researchers and producers have developed several promising pomegranate varieties:</p>
          
          <ul>
            <li><strong>Mollar de Elche:</strong> Traditional Spanish variety with sweet arils and thin skin</li>
            <li><strong>Red Wonderful:</strong> Adapted variety optimized for Spanish growing conditions</li>
            <li><strong>Early varieties:</strong> Developed to extend the harvest season and capture early market premiums</li>
            <li><strong>Organic selections:</strong> Varieties specifically chosen for organic production systems</li>
          </ul>
          
          <h3>Challenges and Opportunities</h3>
          <p>The Spanish pomegranate industry faces both challenges and opportunities:</p>
          
          <p><strong>Challenges:</strong></p>
          <ul>
            <li>Water scarcity in traditional growing regions</li>
            <li>Competition from lower-cost producers</li>
            <li>Climate change impacts on production patterns</li>
            <li>Need for continued investment in technology</li>
          </ul>
          
          <p><strong>Opportunities:</strong></p>
          <ul>
            <li>Growing European demand for premium superfruits</li>
            <li>Expansion into organic and sustainable certification</li>
            <li>Development of processed products and juice markets</li>
            <li>Potential for geographical indication (DOP) protection</li>
          </ul>
          
          <h3>Future Outlook</h3>
          <p>Spain's pomegranate industry is well-positioned for continued growth in premium market segments. Industry projections suggest:</p>
          
          <ul>
            <li>Production expansion to 75,000 tons by 2030</li>
            <li>Export value growth to $150 million</li>
            <li>Continued focus on quality and sustainability</li>
            <li>Development of value-added product lines</li>
          </ul>
          
          <p>Spain's success demonstrates that focused strategies emphasizing quality, innovation, and market positioning can compete effectively against larger-volume producers in global agricultural markets.</p>
        </div>
      `
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-4 lg:py-6 mt-[160px] lg:mt-[180px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Pomegranate Industry Articles</h1>
          <p className="text-muted-foreground">In-depth analysis and insights from global pomegranate markets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">
                    <MapPin className="w-3 h-3 mr-1" />
                    {article.country}
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.publishDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                  {article.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Article - Full Content Display */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">
                <TrendingUp className="w-3 h-3 mr-1" />
                Featured Article
              </Badge>
              <Badge variant="secondary">
                <MapPin className="w-3 h-3 mr-1" />
                {articles[0].country}
              </Badge>
            </div>
            <CardTitle className="text-2xl">{articles[0].title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(articles[0].publishDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {articles[0].readTime}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <img 
                src={articles[0].image} 
                alt={articles[0].title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: articles[0].content }}
            />
            <div className="flex flex-wrap gap-2 mt-6">
              {articles[0].tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          © 2025 Pomegranate Trade Dashboard. All rights reserved.
        </div>
      </main>
    </div>
  );
};

export default Articles;