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
    <section className="section-padding bg-slate-900 relative overflow-hidden">
      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Soft amber glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/[0.06] blur-3xl rounded-full pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center mx-auto mb-9">
            <Users className="w-8 h-8 text-amber-400" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-white mb-7 leading-[1.1]">
            Wholesale Supply
            <br />
            <span className="text-slate-400">Without the Sourcing Hassle.</span>
          </h2>

          <p className="text-lg text-slate-300 mb-11 max-w-2xl mx-auto leading-relaxed">
            Whether you're a buyer sourcing stock or a supplier looking for repeat orders, we make
            it simple.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" variant="hero" onClick={() => scrollToSection("#request")}>
              Request a Quote
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="xl"
              variant="hero-outline"
              onClick={() => scrollToSection("#apply")}
            >
              Become a Supplier
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
