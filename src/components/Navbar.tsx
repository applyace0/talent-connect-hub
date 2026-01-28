import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Crown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#placements", label: "Intern Placements" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Fees" },
    { href: "#training", label: "Training" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/70 bg-[rgba(249,250,251,0.86)] backdrop-blur-xl">
      <div className="section-container">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-accent">
              <Crown className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                APPLYACE
              </span>
              <span className="text-sm md:text-base font-semibold tracking-tight text-slate-900">
                Talent Connect
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-1.5 py-1 text-xs shadow-soft">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="rounded-full px-3 py-1 text-[13px] font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("#apply")}
              className="text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Apply as intern
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => scrollToSection("#request")}
              className="text-xs font-semibold px-4"
            >
              Request interns
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden rounded-full border border-slate-200 bg-white/80 p-2 text-foreground shadow-sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 pt-1 animate-fade-in">
            <div className="flex flex-col gap-1.5 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-soft">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scrollToSection("#apply")}
                  className="w-full"
                >
                  Apply as intern
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => scrollToSection("#request")}
                  className="w-full"
                >
                  Request interns
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
