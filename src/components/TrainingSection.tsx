import { GraduationCap } from "lucide-react";
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
      title: "Order-Specific",
      description:
        "Guidance designed around your exact product specs, packaging, and delivery requirements.",
    },
    {
      title: "Packaging & Labeling",
      description:
        "Clear requirements for carton labeling, palletization, and basic compliance.",
    },
    {
      title: "Flexible Timing",
      description: "We align timelines to lead times, dispatch windows, and delivery slots.",
    },
    {
      title: "Ready to Ship",
      description: "Orders are prepared for dispatch with agreed specs and documentation.",
    },
  ];

  return (
    <section
      id="training"
      className="section-padding"
      style={{ background: "var(--gradient-subtle)" }}
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <Reveal>
            <div>
              <span className="section-label mb-5">Optional Add-On</span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-foreground mb-6 leading-[1.1]">
                Logistics &amp; Order Support
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                For buyers that want extra confidence, we offer optional support around packaging,
                labeling, and delivery coordination. Everything is aligned to your order
                requirements.
              </p>

              <div className="space-y-5 mb-10">
                {trainingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <div>
                      <h4 className="font-semibold text-foreground tracking-tight mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-slate-600 leading-[1.7]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="accent" size="lg" onClick={() => scrollToSection("#request")}>
                Ask About Delivery Support
              </Button>
            </div>
          </Reveal>

          {/* Visual Card */}
          <Reveal delay="120ms" className="relative">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-10 md:p-12">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-100/60 flex items-center justify-center mx-auto mb-7">
                  <GraduationCap className="w-10 h-10 text-amber-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-4">
                  Support Is Optional
                </h3>
                <p className="text-muted-foreground mb-7 leading-relaxed">
                  Not every order needs extra coordination. Standard wholesale quotes already cover
                  the essentials; additional support is available when you need it.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Palletization", "Labeling", "Delivery slots", "Documentation"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-full bg-slate-100 text-sm font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative offset border — subtle amber */}
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-3xl border border-amber-200/40" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
