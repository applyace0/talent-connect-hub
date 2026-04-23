import { CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";

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
    "Ongoing support for repeat orders",
  ];

  return (
    <section id="pricing" className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <span className="section-label mb-5">Transparent Pricing</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-foreground mb-6 leading-[1.1]">
            Pricing &amp; Commercial Model
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Simple, fair wholesale terms with no hidden costs. We succeed when your orders arrive on
            time and as expected.
          </p>
        </Reveal>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-20">
          {/* Primary Fee Card */}
          <Reveal>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-8 lg:p-10 relative overflow-hidden h-full hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-50 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-xs font-semibold uppercase tracking-wider mb-5">
                  Primary Fee
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
                  Order Pricing
                </h3>
                <p className="text-muted-foreground mb-7 leading-relaxed">
                  Pricing is based on the products, quantities (MOQ), and delivery requirements
                  agreed in your quote.
                </p>
                <ul className="space-y-3.5">
                  {features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Optional Card */}
          <Reveal delay="90ms">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-8 lg:p-10 relative overflow-hidden h-full hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold uppercase tracking-wider mb-5">
                  Optional
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
                  Delivery &amp; Handling
                </h3>
                <p className="text-muted-foreground mb-7 leading-relaxed">
                  Depending on your order, delivery and handling may be quoted separately. We'll
                  confirm everything upfront.
                </p>
                <ul className="space-y-3.5">
                  {features.slice(3).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Trust Section */}
        <Reveal>
          <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center mx-auto mb-7">
                <HelpCircle className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-5">
                Pricing Discussed Upfront
              </h3>
              <p className="text-slate-300 max-w-2xl mx-auto mb-9 leading-relaxed">
                We believe in complete transparency. All pricing and delivery terms are discussed
                before you place an order, so you always know exactly what to expect. No surprises,
                just straightforward partnership.
              </p>
              <Button variant="hero" size="lg" onClick={() => scrollToSection("#request")}>
                Get a Quote
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PricingSection;
