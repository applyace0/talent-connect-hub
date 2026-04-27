import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, CheckCircle2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

const SUPPORT_EMAIL = "contactus@applyace.io";
const FORMS_API_URL = import.meta.env.VITE_FORMS_API_URL || "http://localhost:3001";

const BusinessForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      if (!supabase) {
        throw new Error("Supabase client not configured");
      }

      const { error } = await supabase.from("business_leads").insert({
        company_name: data.companyName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone || null,
        role_title: data.roleTitle,
        department: data.department || null,
        skills_required: data.skills || null,
        duration: data.duration || null,
        location: data.location || null,
        start_date: data.startDate || null,
        notes: data.notes || null,
      });

      if (error) {
        throw error;
      }

      fetch(`${FORMS_API_URL}/api/forms/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "Buyer quote request",
          payload: {
            companyName: data.companyName,
            contactName: data.contactName,
            email: data.email,
            phone: data.phone || "",
            itemsOrCategory: data.roleTitle,
            category: data.department,
            specifications: data.skills,
            orderSize: data.duration,
            deliveryType: data.location,
            preferredDeliveryDate: data.startDate || "",
            notes: data.notes || "",
          },
        }),
      }).catch((err) => console.warn("[BusinessForm] notify failed", err));

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Request Submitted!",
        description: "We'll be in touch within 24 hours to confirm items, quantities, and delivery details.",
      });
    } catch (error) {
      console.error("Business form email failed", error);
      setIsSubmitting(false);
      toast({
        title: "Something went wrong",
        description: `We couldn't send your request. Please try again later or email us at ${SUPPORT_EMAIL}.`,
        variant: "destructive",
      });
    }
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
              For Buyers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Request a Wholesale Quote
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Tell us what you want to source. We'll respond with options, pricing, MOQs, and lead times.
            </p>

            <div className="space-y-6">
              {[
                "Quick response within 24 hours",
                "Clear options with specs and MOQs",
                "No obligation until you approve the quote",
                "Support for repeat orders"
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
                  <p className="text-sm text-muted-foreground">Retailers, hospitality, and independent stores</p>
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
                  <Input id="companyName" name="companyName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input id="contactName" name="contactName" required />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input id="phone" name="phone" type="tel" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roleTitle">Items / Category *</Label>
                  <Input id="roleTitle" name="roleTitle" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Category *</Label>
                  <Select name="department" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="confectionary">Confectionary</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Specifications / Notes *</Label>
                <Input id="skills" name="skills" required />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Order Size *</Label>
                  <Select name="duration" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sample">Samples / small test</SelectItem>
                      <SelectItem value="small">Small bulk</SelectItem>
                      <SelectItem value="medium">Medium bulk</SelectItem>
                      <SelectItem value="large">Large bulk / recurring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Delivery Type *</Label>
                  <Select name="location" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="pickup">Collection / Pickup</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Preferred Delivery Date</Label>
                <Input id="startDate" name="startDate" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
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
                    Submit Quote Request
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Prefer email?{" "}
                <a
                  className="text-accent underline underline-offset-4 hover:opacity-90"
                  href={`mailto:${SUPPORT_EMAIL}`}
                >
                  {SUPPORT_EMAIL}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessForm;
