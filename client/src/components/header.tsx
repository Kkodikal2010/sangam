import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-neutral-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E91E63] to-[#3F51B5] rounded-lg flex items-center justify-center">
                <i className="fas fa-heart text-white text-lg"></i>
              </div>
              <span className="text-2xl font-serif font-bold text-neutral-900">Sangam</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <a href="#how-it-works" className="text-neutral-600 hover:text-[#E91E63] transition-colors duration-200">How It Works</a>
              <a href="#testimonials" className="text-neutral-600 hover:text-[#E91E63] transition-colors duration-200">Success Stories</a>
              <a href="#pricing" className="text-neutral-600 hover:text-[#E91E63] transition-colors duration-200">Pricing</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-neutral-600 hover:text-[#E91E63] transition-colors duration-200">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#E91E63] text-white px-6 py-2 rounded-lg hover:bg-[#E91E63]/90 transition-colors duration-200 font-medium">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
