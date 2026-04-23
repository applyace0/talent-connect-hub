import { FileText, Search, UserCheck, Rocket } from "lucide-react";
import Reveal from "@/components/Reveal";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Tell Us Your Needs",
      description:
        "Share what you need — furniture, confectionary, volumes, delivery location, and timing.",
    },
    {
      number: "02",
      icon: Search,
      title: "We Source Options",
      description:
        "We prepare a short list of suitable products with specs, MOQs, lead times, and pricing.",
    },
    {
      number: "03",
      icon: UserCheck,
      title: "You Approve",
      description:
        "Review the options, confirm quantities, and approve the quote that fits your needs.",
    },
    {
      number: "04",
      icon: Rocket,
      title: "We Deliver",
      description:
        "We coordinate dispatch and delivery. Ongoing support is available for repeat orders.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="section-padding"
      style={{ background: "var(--gradient-subtle)" }}
    >
      <div className="section-container">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <span className="section-label mb-5">Simple Process</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-foreground mb-6 leading-[1.1]">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            From request to delivery in four simple steps. We've streamlined wholesale ordering so
            you can focus on your business.
          </p>
        </Reveal>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) — subtle amber */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-px bg-amber-200/50" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <Reveal key={index} delay={`${index * 90}ms`}>
                <div className="relative text-center group">
                  {/* Step Number Circle */}
                  <div className="relative mx-auto mb-8">
                    <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto relative z-10 group-hover:border-amber-300 group-hover:shadow-[0_8px_24px_-8px_rgba(217,119,6,0.25)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                      <step.icon className="w-7 h-7 text-slate-500 group-hover:text-amber-600 transition-colors duration-500" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-sm font-semibold text-white shadow-[0_4px_12px_-2px_rgba(217,119,6,0.45)]">
                      {step.number.split("0")[1]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:p-7 h-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.10)] group-hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-[1.7] text-[0.95rem]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
