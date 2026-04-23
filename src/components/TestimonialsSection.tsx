import { Quote, Star, Building2, User } from "lucide-react";
import Reveal from "@/components/Reveal";

const TestimonialsSection = () => {
  const testimonials = [
    {
      type: "business",
      quote:
        "They saved us weeks of sourcing time. The wholesale options were clear, pricing was straightforward, and delivery was handled smoothly. We've since reordered multiple times.",
      author: "Sarah Mitchell",
      role: "Procurement Manager",
      company: "RetailCo",
      rating: 5,
    },
    {
      type: "business",
      quote:
        "We trialed a small order first, then scaled to regular bulk purchases. Quality was consistent and communication was fast. Highly recommend.",
      author: "James Chen",
      role: "Owner",
      company: "Chen Home & Goods",
      rating: 5,
    },
    {
      type: "intern",
      quote:
        "As a supplier, it was easy to share our catalog and specs. The process was organized and helped us get repeat orders.",
      author: "Emma Rodriguez",
      role: "Supplier Partner",
      company: "Confectionary Manufacturer",
      rating: 5,
    },
    {
      type: "business",
      quote:
        "The delivery coordination support was exactly what we needed. Packaging and labeling requirements were handled properly. Worth it.",
      author: "Michael Torres",
      role: "Operations Director",
      company: "Warehouse & Distribution",
      rating: 5,
    },
    {
      type: "intern",
      quote:
        "Unlike marketplaces with endless back-and-forth, quotes were clear and we knew exactly what would be delivered. Support was solid throughout.",
      author: "David Park",
      role: "Wholesale Buyer",
      company: "Independent Retail",
      rating: 5,
    },
    {
      type: "business",
      quote:
        "As a small business, we don't have time to chase suppliers. They handled options, pricing, and delivery and made ordering simple.",
      author: "Lisa Thompson",
      role: "Managing Director",
      company: "Thompson Interiors",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{ background: "var(--gradient-subtle)" }}
    >
      <div className="section-container">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <span className="section-label mb-5">Testimonials</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-foreground mb-6 leading-[1.1]">
            Trusted by Buyers
            <br />
            <span className="text-slate-500">&amp; Suppliers</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Don't just take our word for it. Here's what buyers and suppliers have to say.
          </p>
        </Reveal>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} delay={`${(index % 3) * 90}ms`}>
              <div className="group bg-white rounded-2xl border border-slate-100 p-7 lg:p-8 flex flex-col h-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                {/* Quote Icon & Rating */}
                <div className="flex items-center justify-between mb-5">
                  <Quote className="w-9 h-9 text-slate-200" strokeWidth={1.5} />
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-slate-700 leading-[1.7] flex-1 mb-7">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    {testimonial.type === "business" ? (
                      <Building2 className="w-5 h-5 text-slate-500" />
                    ) : (
                      <User className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm tracking-tight">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {testimonial.role} &middot; {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
