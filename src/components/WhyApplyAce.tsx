import { Users, ShieldCheck, Banknote, GraduationCap, HeartHandshake } from "lucide-react";

const WhyApplyAce = () => {
  const reasons = [
    {
      icon: Users,
      title: "Intern-First Model",
      description: "Our focus is on building genuine talent. Interns apply to us, ensuring motivated and engaged candidates."
    },
    {
      icon: ShieldCheck,
      title: "Pre-Vetted Candidates",
      description: "Every intern is thoroughly screened for skills, attitude, and reliability before placement."
    },
    {
      icon: Banknote,
      title: "Transparent Fees",
      description: "Simple, upfront pricing with no hidden costs. You always know exactly what you're paying for."
    },
    {
      icon: GraduationCap,
      title: "Optional Training",
      description: "Role-specific training available when you need interns prepared for your specific tools and workflows."
    },
    {
      icon: HeartHandshake,
      title: "Ongoing Support",
      description: "We stay involved throughout the placement, supporting both businesses and interns for success."
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            The ApplyAce Difference
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose ApplyAce?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We've built a better way to connect businesses with early-career talent. Here's what sets us apart.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <reason.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyApplyAce;
