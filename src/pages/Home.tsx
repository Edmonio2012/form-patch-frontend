import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TrustSection from "@/components/TrustSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingPreviewSection from "@/components/PricingPreviewSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Set page title
    document.title = "Space One - Premium Web Design & Development Agency";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Custom web design and development services. High-performing websites built to convert, scale, and grow your business.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Custom web design and development services. High-performing websites built to convert, scale, and grow your business.';
      document.head.appendChild(meta);
    }
    
    // Set keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'web design, web development, custom websites, digital agency, SaaS development');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'web design, web development, custom websites, digital agency, SaaS development';
      document.head.appendChild(meta);
    }
  }, []);
  return (
    <div className="min-h-screen" style={{ background: "#001d2e" }}>
      <Header />
      <HeroSection />
      <ServicesSection />
      <TrustSection />
      <HowItWorksSection />
      <PricingPreviewSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
