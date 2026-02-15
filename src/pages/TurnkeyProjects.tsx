
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/turnkey/HeroSection";
import ServicesOverview from "@/components/turnkey/ServicesOverview";
import ProcessTimeline from "@/components/turnkey/ProcessTimeline";
import CostEstimator from "@/components/turnkey/CostEstimator";
import PortfolioSection from "@/components/turnkey/PortfolioSection";
import FurnitureAdvantage from "@/components/turnkey/FurnitureAdvantage";
import MaterialsSelection from "@/components/turnkey/MaterialsSelection";
import Testimonials from "@/components/turnkey/Testimonials";
import FAQSection from "@/components/turnkey/FAQSection";
import LeadCaptureForm from "@/components/turnkey/LeadCaptureForm";
import FinalCTA from "@/components/turnkey/FinalCTA";

const TurnkeyProjects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <main>
        <HeroSection />
        <ServicesOverview />
        <ProcessTimeline />
        <CostEstimator />
        <PortfolioSection />
        <FurnitureAdvantage />
        <MaterialsSelection />
        <Testimonials />
        <FAQSection />
        <LeadCaptureForm />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default TurnkeyProjects;
