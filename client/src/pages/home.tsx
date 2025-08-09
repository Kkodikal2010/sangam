import { Link } from "wouter";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import DashboardPreview from "@/components/dashboard-preview";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DashboardPreview />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join over 1 million users who trust Sangam's AI-powered matching to find their life partner. 
              Start your journey today with our comprehensive personality assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/sangam-landing">
                <button className="bg-white text-[#E91E63] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-neutral-50 transition-all duration-200 shadow-lg">
                  <i className="fas fa-heart mr-2"></i>
                  Sangam Registration
                </button>
              </Link>
              <Link href="/register">
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#E91E63] transition-all duration-200">
                  <i className="fas fa-user-plus mr-2"></i>
                  General Registration
                </button>
              </Link>
            </div>
            <div className="text-white/80 text-sm pt-4">
              Free to start • No credit card required • AI matching in 24 hours
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
