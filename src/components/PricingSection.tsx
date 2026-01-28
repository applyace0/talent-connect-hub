import { CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    "Access to our curated intern talent pool",
    "Thorough candidate screening and vetting",
    "Skills and culture-fit assessment",
    "Candidate profile presentation",
    "Interview coordination support",
    "Ongoing placement support"
  ];

  return (
    <section id="pricing" className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Fees & Commercial Model
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Simple, fair pricing with no hidden costs. We succeed when you find the right intern for your team.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Placement Fee Card */}
          <div className="card-elevated p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Primary Fee
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Placement Fee
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A one-time fee applies when an intern is successfully matched and begins their placement with your business.
              </p>
              <ul className="space-y-3">
                {features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hiring Fee Card */}
          <div className="card-elevated p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-highlight/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-highlight/10 text-highlight text-sm font-medium mb-4">
                Optional
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Hiring Fee
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                If you choose to permanently hire an intern after their placement, a separate hiring fee applies. There's no obligation to hire.
              </p>
              <ul className="space-y-3">
                {features.slice(3).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-highlight flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
          <HelpCircle className="w-12 h-12 text-accent mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Pricing Discussed Upfront
          </h3>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            We believe in complete transparency. All fees are discussed before any placement begins, so you always know exactly what to expect. No surprises, just straightforward partnership.
          </p>
          <Button
            variant="hero"
            size="lg"
            onClick={() => scrollToSection("#request")}
          >
            Get a Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
