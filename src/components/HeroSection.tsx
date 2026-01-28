import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown, Sparkles, ShieldCheck, LineChart } from "lucide-react";

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
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.4),_rgba(249,250,251,1))] pt-28 pb-24">
      {/* subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* glow orbs */}
      <div className="pointer-events-none absolute -top-32 -right-16 h-72 w-72 rounded-full bg-sky-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />

      <div className="section-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
          {/* Left: copy */}
          <div className="space-y-8">
            {/* Logo + pill */}
            <div className="flex items-center gap-3 animate-fade-up">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 shadow-soft backdrop-blur">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Crown className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  APPLYACE TALENT CONNECT
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground text-balance animate-fade-up"
                style={{ animationDelay: "0.05s" }}
              >
                <span className="block gradient-text">
                  Interns that feel
                </span>
                <span className="block">like part of your team.</span>
              </h1>
              <p
                className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                ApplyAce connects you with pre-vetted, job‑ready interns trained
                on modern tools, communication, and ownership—so you get impact
                in weeks, not months.
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
                  className="w-full sm:w-auto px-7 shadow-accent"
                >
                  Request interns
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("#apply")}
                  className="w-full sm:w-auto px-7"
                >
                  Apply as an intern
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground sm:pl-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Sparkles className="h-3 w-3" />
                </span>
                <span>3–6 week placements • Global‑ready communication</span>
              </div>
            </div>

            {/* Mini stats */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 animate-fade-up"
              style={{ animationDelay: "0.22s" }}
            >
              <div className="glass-card card-hover px-4 py-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Interns placed
                </p>
                <p className="mt-1 text-xl font-semibold text-foreground">
                  <CountUp end={120} suffix="+" />
                </p>
              </div>
              <div className="glass-card card-hover px-4 py-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Avg. ramp‑up time
                </p>
                <p className="mt-1 text-xl font-semibold text-foreground">
                  <CountUp end={10} /> days
                </p>
              </div>
              <div className="glass-card card-hover px-4 py-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Returning employers
                </p>
                <p className="mt-1 text-xl font-semibold text-foreground">
                  <CountUp end={87} suffix="%" />
                </p>
              </div>
            </div>
          </div>

          {/* Right: product-style panel */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.18s" }}>
            {/* background card */}
            <div className="absolute -top-10 -right-6 hidden h-40 w-40 rounded-3xl bg-gradient-to-br from-sky-100 to-blue-100 shadow-elevated lg:block" />

            <div className="relative mx-auto max-w-md">
              <div className="glass-card card-hover p-4 md:p-5 shadow-elevated">
                {/* window header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Talent pipeline · Live
                  </span>
                </div>

                <div className="grid gap-4">
                  {/* row: employer pipeline */}
                  <div className="rounded-2xl bg-white/80 p-3.5 shadow-soft">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                          <LineChart className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            SaaS Startup · Product Intern
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            3 candidates shortlisted
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[11px] font-medium text-emerald-600">
                          Match quality · 92%
                        </span>
                        <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-sky-500 to-emerald-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* row: intern readiness */}
                  <div className="flex flex-col gap-3 rounded-2xl bg-white/75 p-3.5 shadow-soft">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                          AA
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground">
                            Cohort Q1 · Interns
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            Trained on client communication, async work
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Ready to deploy
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
                      <div className="rounded-xl bg-slate-50 px-2.5 py-2">
                        <p className="font-medium text-foreground text-xs">
                          40+
                        </p>
                        <p>task projects</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 px-2.5 py-2">
                        <p className="font-medium text-foreground text-xs">
                          4.8/5
                        </p>
                        <p>manager rating</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 px-2.5 py-2">
                        <p className="font-medium text-foreground text-xs">
                          Global
                        </p>
                        <p>time‑zones</p>
                      </div>
                    </div>
                  </div>

                  {/* row: compliance / support */}
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-slate-50/80 px-3.5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900 text-slate-50">
                        <ShieldCheck className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          Screening, compliance & support
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          We handle interviews, documentation, and onboarding.
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">
                      Included for every placement
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
