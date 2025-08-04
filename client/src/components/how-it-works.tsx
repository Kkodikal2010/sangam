export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-serif font-bold text-neutral-900">
            How Sangam Works
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our AI-powered process makes finding your perfect match simple, secure, and successful.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="text-center space-y-4 relative">
            <div className="bg-[#E91E63]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <i className="fas fa-user-plus text-[#E91E63] text-2xl"></i>
              <div className="absolute -top-2 -right-2 bg-[#E91E63] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900">Create Your Profile</h3>
            <p className="text-neutral-600">Complete our detailed questionnaire and personality assessment to help our AI understand you better.</p>
          </div>

          {/* Step 2 */}
          <div className="text-center space-y-4 relative">
            <div className="bg-[#3F51B5]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <i className="fas fa-brain text-[#3F51B5] text-2xl"></i>
              <div className="absolute -top-2 -right-2 bg-[#3F51B5] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900">AI Analysis</h3>
            <p className="text-neutral-600">Our machine learning algorithms analyze your personality, values, and preferences to create your unique compatibility profile.</p>
          </div>

          {/* Step 3 */}
          <div className="text-center space-y-4 relative">
            <div className="bg-[#FF9800]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <i className="fas fa-heart text-[#FF9800] text-2xl"></i>
              <div className="absolute -top-2 -right-2 bg-[#FF9800] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900">Get Matches</h3>
            <p className="text-neutral-600">Receive personalized match recommendations with detailed compatibility scores and explanations daily.</p>
          </div>

          {/* Step 4 */}
          <div className="text-center space-y-4 relative">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <i className="fas fa-comments text-green-600 text-2xl"></i>
              <div className="absolute -top-2 -right-2 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900">Connect & Chat</h3>
            <p className="text-neutral-600">Express interest, start meaningful conversations, and build genuine connections with your matches.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
