import { Quote, Star, Building2, User } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      type: "business",
      quote: "ApplyAce saved us weeks of recruitment time. The intern they placed with us was pre-vetted, motivated, and hit the ground running. We've since used them for three more placements.",
      author: "Sarah Mitchell",
      role: "Head of Marketing",
      company: "TechFlow Agency",
      rating: 5
    },
    {
      type: "business",
      quote: "We hired our intern permanently after just 4 months. The quality of candidates from ApplyAce was far better than posting job ads ourselves. Highly recommend.",
      author: "James Chen",
      role: "Founder & CEO",
      company: "Spark Digital",
      rating: 5
    },
    {
      type: "intern",
      quote: "Applying to ApplyAce was the best decision I made. They matched me with a company that aligned perfectly with my goals, and I gained invaluable experience.",
      author: "Emma Rodriguez",
      role: "Marketing Intern",
      company: "Placed at BrightStart Media",
      rating: 5
    },
    {
      type: "business",
      quote: "The optional training service was exactly what we needed. Our intern arrived already familiar with our tools and processes. Worth every penny.",
      author: "Michael Torres",
      role: "Operations Director",
      company: "ScaleUp Solutions",
      rating: 5
    },
    {
      type: "intern",
      quote: "Unlike other platforms where you apply endlessly, ApplyAce actively matched me with opportunities. I felt supported throughout my entire placement journey.",
      author: "David Park",
      role: "Software Engineering Intern",
      company: "Placed at Nexus Tech",
      rating: 5
    },
    {
      type: "business",
      quote: "As a small business without an HR team, we couldn't manage recruitment. ApplyAce handled everything and found us the perfect fit for our team.",
      author: "Lisa Thompson",
      role: "Managing Director",
      company: "Creative Edge Studio",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by Businesses & Interns
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Don't just take our word for it. Here's what our clients and placed interns have to say.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-elevated card-hover p-6 flex flex-col"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
