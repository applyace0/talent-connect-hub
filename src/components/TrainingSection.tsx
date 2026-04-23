import { GraduationCap, Settings, Calendar, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";

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
      title: "Order-Specific",
      description: "Guidance designed around your exact product specs, packaging, and delivery requirements."
    },
    {
      icon: Settings,
      title: "Packaging & Labeling",
      description: "Clear requirements for carton labeling, palletization, and basic compliance."
    },
    {
      icon: Calendar,
      title: "Flexible Timing",
      description: "We align timelines to lead times, dispatch windows, and delivery slots."
    },
    {
      icon: GraduationCap,
      title: "Ready to Ship",
      description: "Orders are prepared for dispatch with agreed specs and documentation."
    }
  ];

  return (
    <section id="training" className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <Reveal>
            <div>
            <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              Optional Add-On
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Logistics & Order Support
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              For buyers that want extra confidence, we offer optional support around packaging, labeling, and delivery coordination. Everything is aligned to your order requirements.
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
              Ask About Delivery Support
            </Button>
            </div>
          </Reveal>

          {/* Visual Card */}
          <Reveal delay="120ms" className="relative">
            <div className="card-elevated p-8 md:p-10">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Support Is Optional
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Not every order needs extra coordination. Standard wholesale quotes already cover the essentials; additional support is available when you need it.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Palletization", "Labeling", "Delivery slots", "Documentation"].map((tag) => (
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
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
