import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinks = {
    services: [
      { label: "Wholesale Range", href: "#placements" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "Logistics Support", href: "#training" },
    ],
    getStarted: [
      { label: "Request a Quote", href: "#request" },
      { label: "Become a Supplier", href: "#apply" },
      { label: "Testimonials", href: "#testimonials" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="section-container py-20 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center shadow-[0_4px_12px_-2px_rgba(217,119,6,0.45)]">
                <span className="text-white font-semibold text-lg">A</span>
              </div>
              <span className="font-semibold text-xl tracking-tight text-white">Wholesale</span>
            </div>
            <p className="text-slate-400 mb-7 leading-relaxed max-w-sm">
              General wholesale of furniture and confectionary. Clear quotes, reliable supply, and
              delivery support for buyers and suppliers.
            </p>
            <div className="space-y-3.5">
              <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Mail className="w-[18px] h-[18px] text-slate-500" />
                <span className="text-sm">contactus@applyace.io</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Phone className="w-[18px] h-[18px] text-slate-500" />
                <span className="text-sm">07846651931</span>
              </div>
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-[18px] h-[18px] mt-0.5 text-slate-500" />
                <span className="text-sm leading-relaxed">
                  Company number 16676029
                  <br />
                  Registered office address
                  <br />
                  128 City Road, London, United Kingdom, EC1V 2NX
                </span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-[0.14em] text-slate-300 mb-5">
              Services
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-[0.14em] text-slate-300 mb-5">
              Get Started
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.getStarted.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-[0.14em] text-slate-300 mb-5">
              Company
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} General Wholesale. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
