export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-serif font-bold text-neutral-900">
            Why Sangam Works Better
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our advanced AI analyzes personality, values, lifestyle, and compatibility factors to create meaningful connections.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Matching Feature */}
          <div className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
            <div className="bg-[#E91E63]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#E91E63]/20 transition-colors duration-300">
              <i className="fas fa-brain text-[#E91E63] text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">AI-Powered Matching</h3>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Our machine learning algorithms analyze 50+ compatibility factors including personality traits, values, lifestyle preferences, and communication styles.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-[#E91E63] text-sm"></i>
                <span className="text-neutral-700 text-sm">Personality Analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-[#E91E63] text-sm"></i>
                <span className="text-neutral-700 text-sm">Lifestyle Compatibility</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-[#E91E63] text-sm"></i>
                <span className="text-neutral-700 text-sm">Value Alignment</span>
              </div>
            </div>
          </div>

          {/* Smart Profiles Feature */}
          <div className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
            <div className="bg-[#3F51B5]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#3F51B5]/20 transition-colors duration-300">
              <i className="fas fa-user-circle text-[#3F51B5] text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Smart Profiles</h3>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Comprehensive profiles with verification badges, compatibility insights, and AI-generated personality summaries help you understand potential matches better.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-[#3F51B5] text-sm"></i>
                <span className="text-neutral-700 text-sm">Profile Verification</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-[#3F51B5] text-sm"></i>
                <span className="text-neutral-700 text-sm">Personality Insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-[#3F51B5] text-sm"></i>
                <span className="text-neutral-700 text-sm">Compatibility Scores</span>
              </div>
            </div>
          </div>

          {/* Personalized Experience Feature */}
          <div className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
            <div className="bg-[#FF9800]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FF9800]/20 transition-colors duration-300">
              <i className="fas fa-heart text-[#FF9800] text-2xl"></i>
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Personalized Journey</h3>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Get personalized recommendations, compatibility explanations, and relationship guidance powered by AI to help you make informed decisions.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-[#FF9800] text-sm"></i>
                <span className="text-neutral-700 text-sm">Daily Recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-[#FF9800] text-sm"></i>
                <span className="text-neutral-700 text-sm">Match Explanations</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-check-circle text-[#FF9800] text-sm"></i>
                <span className="text-neutral-700 text-sm">Relationship Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
