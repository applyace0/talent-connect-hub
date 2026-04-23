import { Quote, Star, Building2, User } from "lucide-react";
import Reveal from "@/components/Reveal";

const TestimonialsSection = () => {
  const testimonials = [
    {
      type: "business",
      quote: "They saved us weeks of sourcing time. The wholesale options were clear, pricing was straightforward, and delivery was handled smoothly. We've since reordered multiple times.",
      author: "Sarah Mitchell",
      role: "Procurement Manager",
      company: "RetailCo",
      rating: 5
    },
    {
      type: "business",
      quote: "We trialed a small order first, then scaled to regular bulk purchases. Quality was consistent and communication was fast. Highly recommend.",
      author: "James Chen",
      role: "Owner",
      company: "Chen Home & Goods",
      rating: 5
    },
    {
      type: "intern",
      quote: "As a supplier, it was easy to share our catalog and specs. The process was organized and helped us get repeat orders.",
      author: "Emma Rodriguez",
      role: "Supplier Partner",
      company: "Confectionary Manufacturer",
      rating: 5
    },
    {
      type: "business",
      quote: "The delivery coordination support was exactly what we needed. Packaging and labeling requirements were handled properly. Worth it.",
      author: "Michael Torres",
      role: "Operations Director",
      company: "Warehouse & Distribution",
      rating: 5
    },
    {
      type: "intern",
      quote: "Unlike marketplaces with endless back-and-forth, quotes were clear and we knew exactly what would be delivered. Support was solid throughout.",
      author: "David Park",
      role: "Wholesale Buyer",
      company: "Independent Retail",
      rating: 5
    },
    {
      type: "business",
      quote: "As a small business, we don’t have time to chase suppliers. They handled options, pricing, and delivery and made ordering simple.",
      author: "Lisa Thompson",
      role: "Managing Director",
      company: "Thompson Interiors",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
      <div className="section-container">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by Buyers & Suppliers
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Don't just take our word for it. Here's what buyers and suppliers have to say.
          </p>
        </Reveal>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} delay={`${(index % 3) * 90}ms`}>
              <div className="card-elevated card-hover p-6 flex flex-col">
                {/* Quote Icon & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8 text-accent/30" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-foreground leading-relaxed flex-1 mb-6">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    {testimonial.type === "business" ? (
                      <Building2 className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <User className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
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
