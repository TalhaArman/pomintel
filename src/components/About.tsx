import { Award, Users, Globe, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Clients Served"
    },
    {
      icon: Award,
      number: "98%",
      label: "Success Rate"
    },
    {
      icon: Globe,
      number: "25+",
      label: "Countries"
    },
    {
      icon: Clock,
      number: "10+",
      label: "Years Experience"
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                About PomIntel
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are a leading consulting firm dedicated to helping businesses achieve 
                sustainable growth through strategic intelligence and innovative solutions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">Our Mission</h3>
                <p className="text-muted-foreground">
                  To empower organizations with the insights and strategies they need to 
                  thrive in an ever-evolving business landscape.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">Our Approach</h3>
                <p className="text-muted-foreground">
                  We combine deep industry expertise with cutting-edge analytics to deliver 
                  actionable insights that drive real business impact.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">Our Values</h3>
                <p className="text-muted-foreground">
                  Integrity, innovation, and excellence guide everything we do. We believe 
                  in building long-term partnerships based on trust and measurable results.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop"
                alt="Professional team meeting"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-3 p-6 bg-muted/50 rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;