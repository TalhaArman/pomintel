import { BarChart3, TrendingUp, Shield, Zap, Users, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: BarChart3,
      title: "Business Analytics",
      description: "Data-driven insights to optimize your business performance and identify growth opportunities.",
      features: ["Performance Metrics", "Market Analysis", "ROI Optimization"]
    },
    {
      icon: TrendingUp,
      title: "Growth Strategy",
      description: "Comprehensive strategies to accelerate your business growth and market expansion.",
      features: ["Market Entry", "Scaling Solutions", "Revenue Growth"]
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Identify, assess, and mitigate risks to protect your business investments.",
      features: ["Risk Assessment", "Compliance", "Security Audits"]
    },
    {
      icon: Zap,
      title: "Digital Transformation",
      description: "Modernize your operations with cutting-edge technology and digital solutions.",
      features: ["Process Automation", "Tech Integration", "Digital Strategy"]
    },
    {
      icon: Users,
      title: "Team Development",
      description: "Build high-performing teams through strategic organizational development.",
      features: ["Leadership Training", "Team Building", "Performance Management"]
    },
    {
      icon: Target,
      title: "Strategic Planning",
      description: "Long-term strategic planning to achieve your business objectives effectively.",
      features: ["Goal Setting", "Resource Planning", "Execution Strategy"]
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive consulting solutions tailored to your business needs and objectives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;