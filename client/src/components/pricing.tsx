import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-serif font-bold text-neutral-900">
            Choose Your Plan
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Start free and upgrade to unlock premium AI features and enhanced matching capabilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 hover:shadow-lg transition-all duration-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-2">Basic</h3>
              <div className="text-4xl font-bold text-neutral-900 mb-1">Free</div>
              <p className="text-neutral-600">Perfect to get started</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-500"></i>
                <span className="text-neutral-700">Basic profile creation</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-500"></i>
                <span className="text-neutral-700">5 profile views per day</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-500"></i>
                <span className="text-neutral-700">Basic compatibility scores</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-500"></i>
                <span className="text-neutral-700">Express interest feature</span>
              </li>
            </ul>
            <Button className="w-full bg-neutral-200 text-neutral-700 py-3 rounded-xl font-medium hover:bg-neutral-300 transition-colors duration-200">
              Get Started Free
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="bg-[#E91E63] rounded-2xl p-8 text-white transform scale-105 shadow-xl relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#FF9800] text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-1">₹2,999</div>
              <p className="text-white/80">per month</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-[#FF9800]"></i>
                <span>Unlimited profile views</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-[#FF9800]"></i>
                <span>Advanced AI matching</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-[#FF9800]"></i>
                <span>Detailed compatibility insights</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-[#FF9800]"></i>
                <span>Priority customer support</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-[#FF9800]"></i>
                <span>Profile verification badge</span>
              </li>
            </ul>
            <Button className="w-full bg-white text-[#E91E63] py-3 rounded-xl font-medium hover:bg-neutral-50 transition-colors duration-200">
              Start Premium Trial
            </Button>
          </div>

          {/* Elite Plan */}
          <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 hover:shadow-lg transition-all duration-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-2">Elite</h3>
              <div className="text-4xl font-bold text-neutral-900 mb-1">₹4,999</div>
              <p className="text-neutral-600">per month</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-500"></i>
                <span className="text-neutral-700">Everything in Premium</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-500"></i>
                <span className="text-neutral-700">Personal relationship coach</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-500"></i>
                <span className="text-neutral-700">Background verification</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-500"></i>
                <span className="text-neutral-700">Exclusive elite matches</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-500"></i>
                <span className="text-neutral-700">Video calling feature</span>
              </li>
            </ul>
            <Button className="w-full bg-[#3F51B5] text-white py-3 rounded-xl font-medium hover:bg-[#3F51B5]/90 transition-colors duration-200">
              Go Elite
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
