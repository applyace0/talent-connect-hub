import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, CheckCircle2, Send, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

const InternForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      if (!supabase) {
        throw new Error("Supabase client not configured");
      }

      const { error } = await supabase.from("intern_applications").insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || null,
        area_of_interest: data.interest,
        education_level: data.education || null,
        cv_url: fileName || null,
        motivation: data.motivation,
      });

      if (error) {
        throw error;
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll review your details and be in touch soon about next steps.",
      });
    } catch (error) {
      console.error("Supplier form submission failed", error);
      setIsSubmitting(false);
      toast({
        title: "Something went wrong",
        description: "We couldn't send your application. Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (isSubmitted) {
    return (
      <section id="apply" className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Application Received!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you. We'll review your information and follow up with onboarding details if there's a fit.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setFileName("");
              }}
            >
              Submit Another Application
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Content */}
          <div>
            <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              For Suppliers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Become a Supplier
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Share your catalog and capabilities. We'll reach out when we have buyer demand that matches your product range.
            </p>

            <div className="space-y-6 mb-12">
              {[
                "Simple onboarding and repeat orders",
                "Clear requirements and order details",
                "Support through dispatch and delivery",
                "Long-term wholesale partnerships"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-background border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Start Your Career Journey</p>
                  <p className="text-sm text-muted-foreground">Build repeat wholesale demand with reliable buyers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card-elevated p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" name="fullName" required />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="internEmail">Email *</Label>
                  <Input id="internEmail" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="internPhone">Phone *</Label>
                  <Input id="internPhone" name="phone" type="tel" required />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="interest">Product Category *</Label>
                  <Select name="interest" required>
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
                <div className="space-y-2">
                  <Label htmlFor="education">Capacity / Lead Time *</Label>
                  <Select name="education" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stock">In stock</SelectItem>
                      <SelectItem value="1-2weeks">1–2 weeks</SelectItem>
                      <SelectItem value="3-4weeks">3–4 weeks</SelectItem>
                      <SelectItem value="6+weeks">6+ weeks</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv">Upload catalog / spec sheet *</Label>
                <div className="relative">
                  <input
                    id="cv"
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-border hover:border-accent/50 transition-colors">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {fileName || "Click to upload PDF or Word document"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Tell us about your products and terms *</Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  required
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
                    Register as a Supplier
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By applying, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternForm;
