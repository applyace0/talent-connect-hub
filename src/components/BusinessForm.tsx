import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, CheckCircle2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BusinessForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Request Submitted!",
      description: "We'll be in touch within 24 hours to discuss your intern requirements.",
    });
  };

  if (isSubmitted) {
    return (
      <section id="request" className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Request Received!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your interest. Our team will review your requirements and get back to you within 24 hours.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="request" className="section-padding bg-background">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Content */}
          <div>
            <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              For Businesses
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Request Intern Talent
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Tell us about the role you need filled. We'll match you with pre-vetted candidates from our intern pool and have options ready within days.
            </p>

            <div className="space-y-6">
              {[
                "Quick response within 24 hours",
                "Pre-vetted candidates matched to your needs",
                "No obligation until you're satisfied",
                "Ongoing support throughout placement"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-xl bg-secondary">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Trusted by Growing Companies</p>
                  <p className="text-sm text-muted-foreground">SMEs, startups, and agencies across all industries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card-elevated p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input id="companyName" name="companyName" required placeholder="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input id="contactName" name="contactName" required placeholder="John Smith" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+44 7123 456789" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roleTitle">Role Title *</Label>
                  <Input id="roleTitle" name="roleTitle" required placeholder="Marketing Intern" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department / Function *</Label>
                  <Select name="department" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills Required *</Label>
                <Input id="skills" name="skills" required placeholder="e.g., Social media, Content writing, Analytics" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Internship Duration *</Label>
                  <Select name="duration" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3months">1-3 months</SelectItem>
                      <SelectItem value="3-6months">3-6 months</SelectItem>
                      <SelectItem value="6-12months">6-12 months</SelectItem>
                      <SelectItem value="12+months">12+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location / Remote *</Label>
                  <Select name="location" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="remote">Fully Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Preferred Start Date</Label>
                <Input id="startDate" name="startDate" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Any specific requirements, tools the intern should know, or other details..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Intern Requirements
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessForm;
