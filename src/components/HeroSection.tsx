import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown } from "lucide-react";

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
    <section className="hero-interior relative flex min-h-[min(78svh,760px)] flex-col overflow-hidden bg-white pt-24 pb-16 md:min-h-[min(82svh,820px)] md:pt-32 md:pb-20">
      {/* Masked video — floats as an island inside the white canvas */}
      <div className="pointer-events-none absolute inset-0 z-0 hero-video-root">
        <div className="hero-pan-viewport h-full w-full">
          <div className="hero-pan-strip h-full w-full">
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
        <div className="hero-cinematic" />
      </div>

      {/* White inward gradient — bleeds in from all four edges */}
      <div className="hero-light-vignette" aria-hidden="true" />

      <div className="section-container relative z-10 flex flex-1 flex-col justify-center py-10 md:py-14">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          <div className="w-full space-y-8 md:space-y-10">

            {/* Badge */}
            <div className="flex justify-center animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/8 bg-white/80 px-5 py-2 shadow-sm backdrop-blur-md">
                <Crown className="h-3 w-3 text-slate-500" />
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  General wholesale
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-5">
              <h1
                className="font-serif text-4xl font-medium leading-[1.08] tracking-[-0.01em] text-balance text-slate-900 sm:text-5xl md:text-[3.4rem] animate-fade-up"
                style={{ animationDelay: "0.07s" }}
              >
                Wholesale shaped by
                <span className="block text-slate-700">quality and trust.</span>
              </h1>
              <p
                className="mx-auto max-w-md text-[0.9rem] leading-relaxed text-slate-500 md:text-[0.95rem] animate-fade-up"
                style={{ animationDelay: "0.13s" }}
              >
                Reliable bulk supply of furniture and confectionary — straightforward
                quotes, flexible MOQs, and delivery support you can count on.
              </p>
            </div>

            {/* CTAs */}
            <div
              className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center animate-fade-up"
              style={{ animationDelay: "0.19s" }}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("#request")}
                className="h-12 w-full rounded-full border-0 bg-slate-900 px-9 text-[0.85rem] font-medium text-white shadow-md hover:bg-slate-800 sm:w-auto"
              >
                Request a quote
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("#apply")}
                className="h-12 w-full rounded-full border-slate-200 bg-white/60 px-9 text-[0.85rem] font-medium text-slate-700 backdrop-blur-sm hover:bg-white hover:border-slate-300 sm:w-auto"
              >
                Become a supplier
              </Button>
            </div>

            {/* Stats */}
            <div
              className="mx-auto grid w-full max-w-md grid-cols-3 gap-px overflow-hidden rounded-2xl border border-slate-900/8 bg-slate-900/8 shadow-sm animate-fade-up"
              style={{ animationDelay: "0.26s" }}
            >
              <div className="bg-white/80 px-4 py-4 text-center backdrop-blur-md">
                <p className="text-xl font-semibold tabular-nums text-slate-900">
                  <CountUp end={120} suffix="+" />
                </p>
                <p className="mt-0.5 text-[0.67rem] font-medium uppercase tracking-wide text-slate-400">Product lines</p>
              </div>
              <div className="bg-white/80 px-4 py-4 text-center backdrop-blur-md">
                <p className="text-xl font-semibold tabular-nums text-slate-900">
                  <CountUp end={24} suffix="h" />
                </p>
                <p className="mt-0.5 text-[0.67rem] font-medium uppercase tracking-wide text-slate-400">Quote turnaround</p>
              </div>
              <div className="bg-white/80 px-4 py-4 text-center backdrop-blur-md">
                <p className="text-xl font-semibold tabular-nums text-slate-900">
                  <CountUp end={87} suffix="%" />
                </p>
                <p className="mt-0.5 text-[0.67rem] font-medium uppercase tracking-wide text-slate-400">Returning buyers</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
