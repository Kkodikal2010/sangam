import { Button } from "@/components/ui/button";

export default function DashboardPreview() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-serif font-bold text-neutral-900">
            Your Personalized Dashboard
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Get AI-powered insights, compatibility analysis, and personalized recommendations all in one place.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-[#E91E63] to-[#3F51B5] p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64" alt="User profile" className="w-16 h-16 rounded-full object-cover border-4 border-white/20" />
                <div>
                  <h3 className="text-2xl font-semibold">Welcome back, Priya!</h3>
                  <p className="text-white/80">Last login: Today at 9:30 AM</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">87%</div>
                <div className="text-white/80 text-sm">Profile Complete</div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Match Recommendations */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-semibold text-neutral-900">Today's Recommendations</h4>
                  <Button variant="ghost" className="text-[#E91E63] hover:text-[#E91E63]/80 font-medium">View All</Button>
                </div>

                {/* Match Card 1 */}
                <div className="bg-neutral-50 rounded-2xl p-6 hover:shadow-md transition-all duration-300 border border-neutral-100">
                  <div className="flex items-start space-x-6">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80" alt="Match profile" className="w-20 h-20 rounded-xl object-cover" />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-xl font-semibold text-neutral-900">Arjun Sharma</h5>
                        <div className="flex items-center space-x-2">
                          <div className="relative w-12 h-12">
                            <div className="compatibility-ring w-12 h-12 rounded-full" style={{"--percentage": "324deg"} as any}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-bold text-neutral-900">90%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-4 text-neutral-600">
                          <span>28 years</span>
                          <span>•</span>
                          <span>Software Engineer</span>
                          <span>•</span>
                          <span>Mumbai</span>
                        </div>
                        <p className="text-neutral-600 text-sm">Values family, loves traveling, and enjoys cooking. Looking for a life partner who shares similar values.</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <i className="fas fa-heart text-[#E91E63] text-sm"></i>
                            <span className="text-sm text-neutral-600">Values: 95% match</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <i className="fas fa-users text-[#3F51B5] text-sm"></i>
                            <span className="text-sm text-neutral-600">Lifestyle: 88% match</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Button variant="ghost" size="sm" className="p-2 text-neutral-600 hover:text-[#E91E63] hover:bg-[#E91E63]/10 rounded-lg transition-all duration-200">
                            <i className="fas fa-eye"></i>
                          </Button>
                          <Button className="bg-[#E91E63] text-white px-6 py-2 rounded-lg hover:bg-[#E91E63]/90 transition-all duration-200 font-medium">
                            Express Interest
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Card 2 */}
                <div className="bg-neutral-50 rounded-2xl p-6 hover:shadow-md transition-all duration-300 border border-neutral-100">
                  <div className="flex items-start space-x-6">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80" alt="Match profile" className="w-20 h-20 rounded-xl object-cover" />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-xl font-semibold text-neutral-900">Vikram Patel</h5>
                        <div className="flex items-center space-x-2">
                          <div className="relative w-12 h-12">
                            <div className="compatibility-ring w-12 h-12 rounded-full" style={{"--percentage": "302deg"} as any}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-bold text-neutral-900">84%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-4 text-neutral-600">
                          <span>30 years</span>
                          <span>•</span>
                          <span>Doctor</span>
                          <span>•</span>
                          <span>Delhi</span>
                        </div>
                        <p className="text-neutral-600 text-sm">Passionate about healthcare and social work. Enjoys reading and classical music. Seeking a thoughtful life partner.</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <i className="fas fa-heart text-[#E91E63] text-sm"></i>
                            <span className="text-sm text-neutral-600">Values: 89% match</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <i className="fas fa-users text-[#3F51B5] text-sm"></i>
                            <span className="text-sm text-neutral-600">Lifestyle: 82% match</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Button variant="ghost" size="sm" className="p-2 text-neutral-600 hover:text-[#E91E63] hover:bg-[#E91E63]/10 rounded-lg transition-all duration-200">
                            <i className="fas fa-eye"></i>
                          </Button>
                          <Button className="bg-[#E91E63] text-white px-6 py-2 rounded-lg hover:bg-[#E91E63]/90 transition-all duration-200 font-medium">
                            Express Interest
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Dashboard Stats & Actions */}
              <div className="space-y-6">
                {/* Profile Completion */}
                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                  <h4 className="text-lg font-semibold text-neutral-900 mb-4">Complete Your Profile</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Overall Progress</span>
                      <span className="font-semibold text-neutral-900">87%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-[#E91E63] h-2 rounded-full" style={{width: "87%"}}></div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600">Add more photos</span>
                        <span className="text-[#FF9800] font-medium">+5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600">Complete personality test</span>
                        <span className="text-[#FF9800] font-medium">+8%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Stats */}
                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                  <h4 className="text-lg font-semibold text-neutral-900 mb-4">Your Activity</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-eye text-[#3F51B5]"></i>
                        <span className="text-neutral-600">Profile Views</span>
                      </div>
                      <span className="font-semibold text-neutral-900">124</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-heart text-[#E91E63]"></i>
                        <span className="text-neutral-600">Interests Received</span>
                      </div>
                      <span className="font-semibold text-neutral-900">18</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-comments text-[#FF9800]"></i>
                        <span className="text-neutral-600">Active Chats</span>
                      </div>
                      <span className="font-semibold text-neutral-900">7</span>
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-to-br from-[#E91E63]/5 to-[#3F51B5]/5 rounded-2xl p-6 border border-[#E91E63]/10">
                  <h4 className="text-lg font-semibold text-neutral-900 mb-4">
                    <i className="fas fa-lightbulb text-[#FF9800] mr-2"></i>
                    AI Insight
                  </h4>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                    Based on your recent activity, profiles with verified education status receive 3x more responses. Consider verifying your credentials to increase visibility.
                  </p>
                  <Button variant="ghost" className="text-[#E91E63] font-medium text-sm hover:text-[#E91E63]/80 p-0">
                    Verify Now →
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <Button className="w-full bg-[#E91E63] text-white py-3 rounded-xl font-medium hover:bg-[#E91E63]/90 transition-colors duration-200">
                    <i className="fas fa-search mr-2"></i>
                    Search Profiles
                  </Button>
                  <Button variant="outline" className="w-full bg-neutral-100 text-neutral-700 py-3 rounded-xl font-medium hover:bg-neutral-200 transition-colors duration-200">
                    <i className="fas fa-edit mr-2"></i>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
