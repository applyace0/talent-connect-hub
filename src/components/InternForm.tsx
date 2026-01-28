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
        description: "We'll review your application and be in touch soon with matching opportunities.",
      });
    } catch (error) {
      console.error("Intern form email failed", error);
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
              Thank you for applying to ApplyAce. We'll review your application and match you with suitable opportunities.
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
              For Interns
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Apply to ApplyAce
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join our talent pool and get matched with exciting internship opportunities at growing businesses. We'll help you find the right placement for your skills and goals.
            </p>

            <div className="space-y-6 mb-12">
              {[
                "Apply once, get matched to multiple opportunities",
                "We advocate for you with potential employers",
                "Support throughout your entire placement",
                "Build real-world experience and skills"
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
                  <p className="text-sm text-muted-foreground">500+ interns placed in real-world roles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card-elevated p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" name="fullName" required placeholder="Alex Johnson" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="internEmail">Email *</Label>
                  <Input id="internEmail" name="email" type="email" required placeholder="alex@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="internPhone">Phone *</Label>
                  <Input id="internPhone" name="phone" type="tel" required placeholder="+44 7343012410" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="interest">Area of Interest *</Label>
                  <Select name="interest" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="engineering">Software Engineering</SelectItem>
                      <SelectItem value="design">Design / UX</SelectItem>
                      <SelectItem value="data">Data / Analytics</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Education Level *</Label>
                  <Select name="education" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="highschool">High School</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="bootcamp">Bootcamp / Certification</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv">Upload CV *</Label>
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
                <Label htmlFor="motivation">Why do you want to intern? *</Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  required
                  placeholder="Tell us about your career goals, what you hope to learn, and why you'd be a great intern..."
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
                    Apply as an Intern
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
