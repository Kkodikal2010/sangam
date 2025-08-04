export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E91E63] to-[#3F51B5] rounded-lg flex items-center justify-center">
                <i className="fas fa-heart text-white text-lg"></i>
              </div>
              <span className="text-2xl font-serif font-bold">Sangam</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              India's most trusted AI-powered matrimonial platform, helping millions find their perfect life partner through advanced compatibility matching.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-[#E91E63] transition-colors duration-200">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-[#E91E63] transition-colors duration-200">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-[#E91E63] transition-colors duration-200">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-[#E91E63] transition-colors duration-200">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">How It Works</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">AI Matching</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Profile Verification</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Success Stories</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Mobile App</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Safety Tips</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Community Guidelines</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Report Issues</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Cookie Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Data Protection</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-400 text-sm">
            © 2024 Sangam.com. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-neutral-400 text-sm">Trusted by 1M+ users</span>
            <div className="flex items-center space-x-2">
              <i className="fas fa-shield-alt text-[#E91E63]"></i>
              <span className="text-neutral-400 text-sm">Secure & Verified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
