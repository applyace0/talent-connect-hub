import { CheckCircle2, Users, Clock, Shield, Briefcase } from "lucide-react";
import Reveal from "@/components/Reveal";

const CoreOfferSection = () => {
  const benefits = [
    {
      icon: Users,
      title: "Curated Wholesale Range",
      description:
        "Furniture and confectionary options curated for consistent supply, clear specs, and buyer-friendly ordering.",
    },
    {
      icon: Shield,
      title: "Quality & Consistency",
      description:
        "Clear product specs and reliability checks so you can reorder with confidence.",
    },
    {
      icon: Clock,
      title: "Fast Quotes",
      description:
        "Quick turnaround on pricing, MOQs, and lead times — without endless back-and-forth.",
    },
    {
      icon: Briefcase,
      title: "Flexible Orders",
      description:
        "From small test runs to ongoing bulk supply, we support orders that fit your business.",
    },
  ];

  return (
    <section id="placements" className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <span className="section-label mb-5">Our Core Service</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-foreground mb-6 leading-[1.1]">
            Wholesale Supply,
            <br />
            <span className="text-slate-500">Made Simple.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We help buyers source furniture and confectionary at wholesale terms with clear options,
            reliable supply, and delivery support.
          </p>
        </Reveal>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <Reveal key={index} delay={`${index * 80}ms`}>
              <div className="group relative bg-white rounded-2xl border border-slate-100 border-l-2 border-l-amber-400/60 p-8 lg:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.10)] hover:border-l-amber-500 hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-amber-50 flex items-center justify-center transition-colors duration-500">
                    <benefit.icon className="w-6 h-6 text-slate-600 group-hover:text-amber-600 transition-colors duration-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2.5">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-[1.7]">{benefit.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Highlight with imagery */}
        <Reveal>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-12">
              <div className="flex-1 space-y-5">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-tight">
                  No guesswork. No endless sourcing.
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We handle product options, specs, and quote details. You receive clear wholesale
                  choices ready to order.
                </p>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {["Sofas & Seating", "Tables", "Storage", "Chairs", "Confectionary"].map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-sm font-medium text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-500" />
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-auto lg:max-w-md">
                <div className="relative">
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=900"
                      alt="Wholesale furniture items"
                      className="h-56 w-full rounded-2xl object-cover shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
                    />
                    <img
                      src="https://images.pexels.com/photos/4110253/pexels-photo-4110253.jpeg?auto=compress&cs=tinysrgb&w=900"
                      alt="Wholesale confectionary items"
                      className="h-56 w-full rounded-2xl object-cover shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 hidden sm:block rounded-2xl bg-amber-500 text-white px-4 py-3 shadow-[0_10px_24px_-8px_rgba(217,119,6,0.45)]">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-amber-50">
                      Wholesale Ready
                    </p>
                    <p className="text-sm font-semibold mt-0.5">
                      Clear specs, dependable supply
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
