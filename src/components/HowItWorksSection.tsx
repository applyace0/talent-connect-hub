import { FileText, Search, UserCheck, Rocket } from "lucide-react";
import Reveal from "@/components/Reveal";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Tell Us Your Needs",
      description: "Share what you need — furniture, confectionary, volumes, delivery location, and timing."
    },
    {
      number: "02",
      icon: Search,
      title: "We Source Options",
      description: "We prepare a short list of suitable products with specs, MOQs, lead times, and pricing."
    },
    {
      number: "03",
      icon: UserCheck,
      title: "You Approve",
      description: "Review the options, confirm quantities, and approve the quote that fits your needs."
    },
    {
      number: "04",
      icon: Rocket,
      title: "We Deliver",
      description: "We coordinate dispatch and delivery. Ongoing support is available for repeat orders."
    }
  ];

  return (
    <section id="how-it-works" className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
      <div className="section-container">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From request to delivery in four simple steps. We've streamlined wholesale ordering so you can focus on your business.
          </p>
        </Reveal>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-border" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Reveal key={index} delay={`${index * 90}ms`}>
                <div className="relative text-center group">
                  {/* Step Number Circle */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center mx-auto relative z-10 group-hover:border-accent transition-colors">
                      <step.icon className="w-7 h-7 text-accent" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground">
                      {step.number.split("0")[1]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="card-elevated p-6 h-full">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
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
