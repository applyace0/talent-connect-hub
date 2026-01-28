import { Button } from "@/components/ui/button";
import { ArrowRight, Users, CheckCircle, Zap } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20" style={{ background: "var(--gradient-hero)" }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-8 animate-fade-up">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground/90">
              Trusted by 200+ growing businesses
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-up leading-tight" style={{ animationDelay: "0.1s" }}>
            Intern Talent,{" "}
            <span className="gradient-text">Supplied Simply.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
            ApplyAce recruits, screens, and places motivated interns into businesses — saving you time, reducing hiring risk, and building future talent.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button
              size="xl"
              variant="hero"
              onClick={() => scrollToSection("#request")}
              className="w-full sm:w-auto"
            >
              Request Interns
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="xl"
              variant="hero-outline"
              onClick={() => scrollToSection("#apply")}
              className="w-full sm:w-auto"
            >
              Apply as an Intern
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Users, text: "500+ Interns Placed" },
              { icon: CheckCircle, text: "Pre-Vetted Candidates" },
              { icon: Zap, text: "Average 5-Day Placement" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 text-primary-foreground/70"
              >
                <item.icon className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
