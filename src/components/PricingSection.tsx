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
    "Wholesale pricing and clear MOQs",
    "Product specs and availability checks",
    "Samples / test order guidance where possible",
    "Options comparison and quote preparation",
    "Delivery coordination support",
    "Ongoing support for repeat orders"
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
            Pricing & Commercial Model
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Simple, fair wholesale terms with no hidden costs. We succeed when your orders arrive on time and as expected.
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
                Order Pricing
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Pricing is based on the products, quantities (MOQ), and delivery requirements agreed in your quote.
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
                Delivery & Handling
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Depending on your order, delivery and handling may be quoted separately. We’ll confirm everything upfront.
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
            We believe in complete transparency. All pricing and delivery terms are discussed before you place an order, so you always know exactly what to expect. No surprises, just straightforward partnership.
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
