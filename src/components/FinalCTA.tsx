import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

const FinalCTA = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-8">
            <Users className="w-8 h-8 text-accent" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Find the Right Intern — Without the Recruitment Hassle
          </h2>

          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you're a business looking for talent or a candidate seeking your first opportunity, ApplyAce makes it simple.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="xl"
              variant="hero"
              onClick={() => scrollToSection("#request")}
            >
              Request Interns
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="xl"
              variant="hero-outline"
              onClick={() => scrollToSection("#apply")}
            >
              Apply as an Intern
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
