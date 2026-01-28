import { FileText, Search, UserCheck, Rocket } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Tell Us Your Needs",
      description: "Share the intern role you need filled — skills, duration, and any specific requirements."
    },
    {
      number: "02",
      icon: Search,
      title: "We Match Candidates",
      description: "We search our pre-vetted intern pool and identify the best-fit candidates for your role."
    },
    {
      number: "03",
      icon: UserCheck,
      title: "You Approve",
      description: "Review candidate profiles, conduct interviews if you wish, and approve your chosen intern."
    },
    {
      number: "04",
      icon: Rocket,
      title: "Intern Starts",
      description: "Your new intern joins your team, ready to contribute. We provide ongoing support."
    }
  ];

  return (
    <section id="how-it-works" className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From requirement to placement in four simple steps. We've streamlined the process so you can focus on what matters most.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-border" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative text-center group"
              >
                {/* Step Number Circle */}
                <div className="relative mx-auto mb-6">
                  <div className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center mx-auto relative z-10 group-hover:border-accent transition-colors">
                    <step.icon className="w-7 h-7 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground">
                    {step.number.split('0')[1]}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
