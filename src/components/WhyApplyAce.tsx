import { Users, ShieldCheck, Banknote, GraduationCap, HeartHandshake } from "lucide-react";
import Reveal from "@/components/Reveal";

const WhyApplyAce = () => {
  const reasons = [
    {
      icon: Users,
      title: "Wholesale-First Model",
      description: "Our focus is on straightforward wholesale ordering—clear options, reliable supply, and repeatable terms."
    },
    {
      icon: ShieldCheck,
      title: "Reliable Supply",
      description: "We prioritize consistency and clear specs so you can reorder without surprises."
    },
    {
      icon: Banknote,
      title: "Transparent Pricing",
      description: "Upfront pricing and delivery terms. You always know what you’re paying for before ordering."
    },
    {
      icon: GraduationCap,
      title: "Optional Logistics Support",
      description: "Support available for packaging, labeling, and delivery coordination when you need it."
    },
    {
      icon: HeartHandshake,
      title: "Ongoing Support",
      description: "We stay involved through dispatch and beyond—supporting buyers and suppliers for smooth repeat orders."
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            The Difference
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose Us?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We've built a better way to source furniture and confectionary at wholesale terms. Here's what sets us apart.
          </p>
        </Reveal>

        {/* Reasons Grid with subtle colour */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <Reveal key={index} delay={`${index * 80}ms`}>
              <div className="group text-center p-8 rounded-2xl border border-slate-200 bg-white/70 shadow-soft hover:border-accent/50 hover:bg-amber-50/80 transition-colors">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyApplyAce;
