import { CheckCircle2, Users, Clock, Shield, Briefcase } from "lucide-react";

const CoreOfferSection = () => {
  const benefits = [
    {
      icon: Users,
      title: "Direct Applicant Pool",
      description: "Interns apply directly to ApplyAce. We build and maintain a curated talent pipeline so you don't have to."
    },
    {
      icon: Shield,
      title: "Pre-Vetted Candidates",
      description: "Every intern is screened for skills, motivation, and cultural fit before being presented to your business."
    },
    {
      icon: Clock,
      title: "Save Time & Resources",
      description: "No job ads, no application management. Focus on your business while we handle recruitment."
    },
    {
      icon: Briefcase,
      title: "Flexible Placements",
      description: "From short-term projects to longer internships, we match the right talent to your specific needs."
    }
  ];

  return (
    <section id="placements" className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Our Core Service
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Interns Provided by ApplyAce
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We manage the entire intern recruitment process. Candidates apply to us, we screen them thoroughly, and present you with the best matches for your roles.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card-elevated card-hover p-8 group"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Highlight */}
        <div className="bg-secondary rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                No Advertising. No Application Management.
              </h3>
              <p className="text-muted-foreground">
                We handle everything from sourcing to screening. You simply receive qualified, motivated candidates ready to contribute to your team.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {["Marketing", "Design", "Engineering", "Operations", "Sales"].map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreOfferSection;
