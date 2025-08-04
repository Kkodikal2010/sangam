import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="gradient-bg text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight">
                Find Your Perfect
                <span className="text-[#FF9800]"> Life Partner</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Our AI-powered platform analyzes compatibility across 50+ dimensions to help you find meaningful connections that last a lifetime.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button className="bg-white text-[#E91E63] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-neutral-50 transition-all duration-200 shadow-lg">
                  Start Your Journey
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#E91E63] transition-all duration-200">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold">1M+</div>
                <div className="text-white/80">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-white/80">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-white/80">Match Accuracy</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            {/* Success story showcase with profile cards */}
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#FF9800]/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
              
              {/* Main success story card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="flex items-center space-x-4 mb-6">
                  {/* Profile images with compatibility indicator */}
                  <div className="relative">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64" alt="Priya's profile" className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg" />
                  </div>
                  <div className="text-4xl text-[#FF9800] animate-pulse-slow">
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className="relative">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64" alt="Arjun's profile" className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/90 font-medium">AI Compatibility Score</span>
                    <span className="text-[#FF9800] font-bold text-lg">94%</span>
                  </div>
                  
                  <blockquote className="text-white/90 italic leading-relaxed">
                    "Sangam's AI found what we couldn't - perfect compatibility in values, lifestyle, and dreams. Married 6 months ago!"
                  </blockquote>
                  
                  <div className="text-white/70 text-sm">
                    - Priya & Arjun, Mumbai
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
