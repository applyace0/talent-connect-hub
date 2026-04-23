import { CheckCircle2, Users, Clock, Shield, Briefcase } from "lucide-react";
import Reveal from "@/components/Reveal";

const CoreOfferSection = () => {
  const benefits = [
    {
      icon: Users,
      title: "Curated Wholesale Range",
      description: "Furniture and confectionary options curated for consistent supply, clear specs, and buyer-friendly ordering."
    },
    {
      icon: Shield,
      title: "Quality & Consistency",
      description: "Clear product specs and reliability checks so you can reorder with confidence."
    },
    {
      icon: Clock,
      title: "Fast Quotes",
      description: "Quick turnaround on pricing, MOQs, and lead times—without endless back-and-forth."
    },
    {
      icon: Briefcase,
      title: "Flexible Orders",
      description: "From small test runs to ongoing bulk supply, we support orders that fit your business."
    }
  ];

  return (
    <section id="placements" className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Our Core Service
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Wholesale Supply, Made Simple
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We help buyers source furniture and confectionary at wholesale terms with clear options, reliable supply, and delivery support.
          </p>
        </Reveal>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Reveal key={index} delay={`${index * 80}ms`}>
              <div className="glass-card card-hover p-8 group">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Highlight with imagery */}
        <Reveal>
          <div className="glass-card mt-4 p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 space-y-3">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                No guesswork. No endless sourcing.
              </h3>
              <p className="text-muted-foreground">
                We handle product options, specs, and quote details. You receive clear wholesale choices ready to order.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {["Sofas & Seating", "Tables", "Storage", "Chairs", "Confectionary"].map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  {role}
                </span>
              ))}
            </div>
            <div className="w-full max-w-xs md:max-w-sm">
              <div className="relative">
                <div className="grid grid-cols-2 gap-3">
                  <img
                    src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=900"
                    alt="Wholesale furniture items"
                    className="h-52 w-full rounded-2xl object-cover shadow-elevated"
                  />
                  <img
                    src="https://images.pexels.com/photos/4110253/pexels-photo-4110253.jpeg?auto=compress&cs=tinysrgb&w=900"
                    alt="Wholesale confectionary items"
                    className="h-52 w-full rounded-2xl object-cover shadow-elevated"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 hidden sm:block rounded-2xl bg-yellow-500 text-yellow-950 px-4 py-3 shadow-accent">
                  <p className="text-xs font-medium uppercase tracking-[0.18em]">
                    WHOLESALE READY
                  </p>
                  <p className="text-sm font-semibold">
                    Clear specs and dependable supply
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CoreOfferSection;
