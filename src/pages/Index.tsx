import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoreOfferSection from "@/components/CoreOfferSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import TrainingSection from "@/components/TrainingSection";
import BusinessForm from "@/components/BusinessForm";
import InternForm from "@/components/InternForm";
import WhyApplyAce from "@/components/WhyApplyAce";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CoreOfferSection />
      <HowItWorksSection />
      <PricingSection />
      <TrainingSection />
      <BusinessForm />
      <InternForm />
      <WhyApplyAce />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
