import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, Sparkles } from "lucide-react";

type CountUpProps = {
  end: number;
  duration?: number;
  suffix?: string;
};

const CountUp = ({ end, duration = 1200, suffix = "" }: CountUpProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * end);
      setValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  return (
    <span>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-compact relative flex min-h-[min(58svh,640px)] flex-col overflow-hidden pt-24 pb-14 md:min-h-[min(52svh,580px)] md:pt-28 md:pb-16">
      {/* Full-bleed hero video */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-pan-viewport">
          <div className="hero-pan-strip">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              <source src="/hero-banner.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Cinematic treatment (vignette + grain) */}
        <div className="hero-cinematic" />

        {/* Inverted-mask gradient stack */}
        <div className="hero-invert-mask" />
        <div className="hero-sheen" />

        {/* Letterbox bars */}
        <div className="hero-letterbox top" />
        <div className="hero-letterbox bottom" />
      </div>

      {/* subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(226, 232, 240, 0.11) 1px, transparent 1px), linear-gradient(to bottom, rgba(226, 232, 240, 0.11) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* glow orbs */}
      <div className="pointer-events-none absolute -top-32 -right-16 h-72 w-72 rounded-full bg-cyan-300/22 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl" />

      <div className="section-container relative z-10 flex flex-1 flex-col justify-center py-8 md:py-10">
        {/* Dark scrim behind copy so text stays readable on any frame of the video */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[min(100%,42rem)] bg-gradient-to-r from-slate-950/88 via-slate-950/55 to-transparent md:from-slate-950/82 md:via-slate-950/45"
          aria-hidden="true"
        />
        <div className="relative z-10 flex w-full items-center">
          <div className="w-full max-w-2xl space-y-6 md:space-y-7">
            {/* Logo + pill */}
            <div className="flex items-center gap-3 animate-fade-up">
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 shadow-soft backdrop-blur-md">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Crown className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/90">
                  GENERAL WHOLESALE
                </span>
              </div>
            </div>

            <div className="space-y-4 md:space-y-5">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance animate-fade-up"
                style={{ animationDelay: "0.05s" }}
              >
                <span className="block text-amber-200 [text-shadow:0_2px_28px_rgba(0,0,0,0.92)]">
                  General wholesale
                </span>
                <span className="block text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.88)]">
                  of furniture & confectionary.
                </span>
              </h1>
              <p
                className="text-sm md:text-base text-white/95 max-w-xl leading-relaxed [text-shadow:0_1px_18px_rgba(0,0,0,0.82)] animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                Source reliable bulk supply for furniture and confectionary with
                straightforward quotes, flexible MOQs, and delivery support—so you
                can restock and fulfill orders with confidence.
              </p>
            </div>

            {/* CTAs + secondary info */}
            <div
              className="flex flex-col sm:flex-row sm:items-center gap-4 animate-fade-up"
              style={{ animationDelay: "0.16s" }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  variant="accent"
                  onClick={() => scrollToSection("#request")}
                  className="w-full sm:w-auto px-7 bg-yellow-400 text-slate-950 hover:bg-yellow-300 hover:text-slate-950 shadow-accent ring-1 ring-black/10"
                >
                  Request a quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("#apply")}
                  className="w-full sm:w-auto px-7 border-white/30 bg-white/10 text-white hover:bg-white/15"
                >
                  Become a supplier
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.75)] sm:pl-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white/80">
                  <Sparkles className="h-3 w-3" />
                </span>
                <span>Furniture & confectionary • Wholesale-first terms</span>
              </div>
            </div>

            {/* Mini stats */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 md:gap-4 md:pt-3 animate-fade-up"
              style={{ animationDelay: "0.22s" }}
            >
              <div className="rounded-2xl border border-white/20 bg-black/45 px-4 py-3 backdrop-blur-md shadow-elevated">
                <p className="text-xs font-medium text-white/85">
                  Product lines
                </p>
                <p className="mt-1 text-xl font-semibold text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.65)]">
                  <CountUp end={120} suffix="+" />
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-black/45 px-4 py-3 backdrop-blur-md shadow-elevated">
                <p className="text-xs font-medium text-white/85">
                  Quote turnaround
                </p>
                <p className="mt-1 text-xl font-semibold text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.65)]">
                  <CountUp end={24} /> hrs
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-black/45 px-4 py-3 backdrop-blur-md shadow-elevated">
                <p className="text-xs font-medium text-white/85">
                  Returning buyers
                </p>
                <p className="mt-1 text-xl font-semibold text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.65)]">
                  <CountUp end={87} suffix="%" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
