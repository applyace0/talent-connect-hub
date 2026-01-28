import { GraduationCap, Settings, Calendar, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const TrainingSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const trainingFeatures = [
    {
      icon: Target,
      title: "Role-Specific",
      description: "Training designed around your exact job requirements and expectations."
    },
    {
      icon: Settings,
      title: "Tools & Systems",
      description: "Interns learn your specific software, processes, and workflows."
    },
    {
      icon: Calendar,
      title: "Flexible Timing",
      description: "Training delivered before or during the placement, as needed."
    },
    {
      icon: GraduationCap,
      title: "Ready on Day One",
      description: "Interns arrive prepared to contribute immediately."
    }
  ];

  return (
    <section id="training" className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              Optional Add-On
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Job-Ready Preparation & Training
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              For businesses that require interns to hit the ground running, we offer optional, tailored training solutions. Your interns arrive prepared for your specific tools, systems, and role requirements.
            </p>

            <div className="space-y-4 mb-8">
              {trainingFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="accent"
              size="lg"
              onClick={() => scrollToSection("#request")}
            >
              Ask About Trained Interns
            </Button>
          </div>

          {/* Visual Card */}
          <div className="relative">
            <div className="card-elevated p-8 md:p-10">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Training Is Optional
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Not every placement needs pre-training. Our standard intern placements are already vetted for skills and motivation. Training is available when you need that extra level of preparation.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["CRM Systems", "Design Tools", "Analytics", "Communication"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-secondary text-sm font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-2xl border-2 border-accent/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
