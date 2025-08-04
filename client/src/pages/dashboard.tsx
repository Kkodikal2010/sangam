import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["/api/profile"],
    enabled: !!localStorage.getItem("token"),
  });

  const { data: recommendations } = useQuery({
    queryKey: ["/api/recommendations"],
    enabled: !!localStorage.getItem("token"),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E91E63] mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <i className="fas fa-user-plus text-4xl text-[#E91E63] mb-4"></i>
            <h2 className="text-2xl font-bold mb-2">Complete Your Profile</h2>
            <p className="text-neutral-600 mb-6">
              Create your profile to start finding perfect matches with our AI-powered system.
            </p>
            <Link href="/profile">
              <Button className="bg-[#E91E63] hover:bg-[#E91E63]/90">
                Create Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#E91E63] to-[#3F51B5] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={profile.profile?.photos?.[0] || "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64"} 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover border-4 border-white/20" 
              />
              <div>
                <h1 className="text-2xl font-semibold">
                  Welcome back, {profile.firstName}!
                </h1>
                <p className="text-white/80">Ready to find your perfect match?</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{profile.profile?.profileCompleteness || 0}%</div>
              <div className="text-white/80 text-sm">Profile Complete</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Today's Recommendations
                  <Button variant="ghost" className="text-[#E91E63]">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recommendations && recommendations.length > 0 ? (
                  <div className="space-y-4">
                    {recommendations.slice(0, 3).map((rec: any, index: number) => (
                      <div key={index} className="bg-neutral-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={rec.profile?.photos?.[0] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60"} 
                            alt="Match" 
                            className="w-15 h-15 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{rec.profile?.bio || "Professional Profile"}</h3>
                              <div className="text-[#E91E63] font-bold">
                                {rec.compatibility?.overallScore || 85}%
                              </div>
                            </div>
                            <p className="text-neutral-600 text-sm">
                              {rec.profile?.age} years • {rec.profile?.occupation} • {rec.profile?.location}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="text-sm text-neutral-500">
                                Values: {rec.compatibility?.scoreBreakdown?.values || 90}% match
                              </div>
                              <Button size="sm" className="bg-[#E91E63] hover:bg-[#E91E63]/90">
                                Express Interest
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <i className="fas fa-heart text-4xl text-neutral-300 mb-4"></i>
                    <p className="text-neutral-600">No recommendations yet. Complete your profile to get better matches!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Progress</span>
                    <span className="font-semibold">{profile.profile?.profileCompleteness || 0}%</span>
                  </div>
                  <Progress value={profile.profile?.profileCompleteness || 0} className="h-2" />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Add more photos</span>
                      <span className="text-[#FF9800] font-medium">+15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Complete personality test</span>
                      <span className="text-[#FF9800] font-medium">+20%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/matches">
                  <Button className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90">
                    <i className="fas fa-search mr-2"></i>
                    Browse Matches
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full">
                    <i className="fas fa-edit mr-2"></i>
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Activity Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-eye text-[#3F51B5]"></i>
                      <span className="text-neutral-600">Profile Views</span>
                    </div>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-heart text-[#E91E63]"></i>
                      <span className="text-neutral-600">Interests Received</span>
                    </div>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-comments text-[#FF9800]"></i>
                      <span className="text-neutral-600">Active Chats</span>
                    </div>
                    <span className="font-semibold">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
