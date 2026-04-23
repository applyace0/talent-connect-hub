import { Users, ShieldCheck, Banknote, GraduationCap, HeartHandshake } from "lucide-react";
import Reveal from "@/components/Reveal";

const WhyApplyAce = () => {
  const reasons = [
    {
      icon: Users,
      title: "Wholesale-First Model",
      description:
        "Our focus is on straightforward wholesale ordering — clear options, reliable supply, and repeatable terms.",
    },
    {
      icon: ShieldCheck,
      title: "Reliable Supply",
      description:
        "We prioritize consistency and clear specs so you can reorder without surprises.",
    },
    {
      icon: Banknote,
      title: "Transparent Pricing",
      description:
        "Upfront pricing and delivery terms. You always know what you're paying for before ordering.",
    },
    {
      icon: GraduationCap,
      title: "Optional Logistics Support",
      description:
        "Support available for packaging, labeling, and delivery coordination when you need it.",
    },
    {
      icon: HeartHandshake,
      title: "Ongoing Support",
      description:
        "We stay involved through dispatch and beyond — supporting buyers and suppliers for smooth repeat orders.",
    },
  ];

  const renderCard = (reason: typeof reasons[number], index: number) => (
    <Reveal key={index} delay={`${index * 80}ms`}>
      <div className="group relative h-full text-center p-8 lg:p-10 rounded-2xl bg-white border border-slate-100 border-t-2 border-t-amber-400/0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-t-amber-400/80 hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-amber-50 flex items-center justify-center mx-auto mb-6 transition-colors duration-500">
          <reason.icon className="w-6 h-6 text-slate-600 group-hover:text-amber-600 transition-colors duration-500" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground mb-3">
          {reason.title}
        </h3>
        <p className="text-muted-foreground leading-[1.7] text-[0.95rem]">
          {reason.description}
        </p>
      </div>
    </Reveal>
  );

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <span className="section-label mb-5">The Difference</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-foreground mb-6 leading-[1.1]">
            Why Choose Us?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            We've built a better way to source furniture and confectionary at wholesale terms.
            Here's what sets us apart.
          </p>
        </Reveal>

        {/* 3 + 2 layout: first 3 in a row, last 2 centered */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 mb-7">
          {reasons.slice(0, 3).map((reason, index) => renderCard(reason, index))}
        </div>
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-7 max-w-3xl mx-auto">
          {reasons.slice(3).map((reason, index) => renderCard(reason, index + 3))}
        </div>
      </div>
    </section>
  );
};

export default WhyApplyAce;
