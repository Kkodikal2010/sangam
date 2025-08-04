import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import MatchCard from "@/components/match-card";

interface SearchFilters {
  minAge?: number;
  maxAge?: number;
  religion?: string;
  education?: string;
  location?: string;
  minIncome?: string;
  maxIncome?: string;
}

const RELIGIONS = [
  "Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Jewish", "Parsi", "Other"
];

const EDUCATION_LEVELS = [
  "High School", "Bachelor's Degree", "Master's Degree", "PhD", "Professional Degree",
  "Diploma", "Certificate", "Other"
];

const INCOME_RANGES = [
  "0-3 Lakhs", "3-5 Lakhs", "5-10 Lakhs", "10-15 Lakhs", "15-25 Lakhs", "25+ Lakhs"
];

export default function Matches() {
  const [activeTab, setActiveTab] = useState<"recommendations" | "matches" | "search">("recommendations");
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [ageRange, setAgeRange] = useState([22, 35]);
  const [showFilters, setShowFilters] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["/api/profile"],
    enabled: !!localStorage.getItem("token"),
  });

  const { data: recommendations, isLoading: loadingRecommendations } = useQuery({
    queryKey: ["/api/recommendations"],
    enabled: !!localStorage.getItem("token") && activeTab === "recommendations",
  });

  const { data: matches, isLoading: loadingMatches } = useQuery({
    queryKey: ["/api/matches"],
    enabled: !!localStorage.getItem("token") && activeTab === "matches",
  });

  const { data: searchResults, isLoading: loadingSearch, refetch: searchProfiles } = useQuery({
    queryKey: ["/api/search", searchFilters],
    enabled: false,
  });

  const expressInterestMutation = useMutation({
    mutationFn: async (data: { toUserId: string; message?: string }) => {
      const response = await apiRequest("POST", "/api/interests", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/interests"] });
      toast({
        title: "Interest expressed!",
        description: "Your interest has been sent successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to express interest",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    setSearchFilters(prev => ({
      ...prev,
      minAge: ageRange[0],
      maxAge: ageRange[1],
    }));
  }, [ageRange]);

  const handleSearch = () => {
    searchProfiles();
  };

  const handleExpressInterest = (userId: string, message?: string) => {
    expressInterestMutation.mutate({ toUserId: userId, message });
  };

  const resetFilters = () => {
    setSearchFilters({});
    setAgeRange([22, 35]);
  };

  if (!profile?.profile) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <i className="fas fa-user-plus text-4xl text-[#E91E63] mb-4"></i>
            <h2 className="text-2xl font-bold mb-2">Complete Your Profile First</h2>
            <p className="text-neutral-600 mb-6">
              Create your profile to start browsing and matching with potential partners.
            </p>
            <Link href="/profile">
              <Button className="bg-[#E91E63] hover:bg-[#E91E63]/90">
                Complete Profile
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
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-neutral-900">Find Your Match</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <i className="fas fa-filter mr-2"></i>
              Filters
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-4 bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("recommendations")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "recommendations"
                  ? "bg-white text-[#E91E63] shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <i className="fas fa-heart mr-2"></i>
              AI Recommendations
            </button>
            <button
              onClick={() => setActiveTab("matches")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "matches"
                  ? "bg-white text-[#E91E63] shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <i className="fas fa-users mr-2"></i>
              My Matches
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "search"
                  ? "bg-white text-[#E91E63] shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <i className="fas fa-search mr-2"></i>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"} lg:col-span-1`}>
            <Card className="sticky top-24">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Age Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Age Range</label>
                  <div className="px-3">
                    <Slider
                      value={ageRange}
                      onValueChange={setAgeRange}
                      max={60}
                      min={18}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>{ageRange[0]} years</span>
                    <span>{ageRange[1]} years</span>
                  </div>
                </div>

                <Separator />

                {/* Religion */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Religion</label>
                  <Select
                    value={searchFilters.religion}
                    onValueChange={(value) => setSearchFilters(prev => ({ ...prev, religion: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any Religion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Religion</SelectItem>
                      {RELIGIONS.map(religion => (
                        <SelectItem key={religion} value={religion}>{religion}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Education</label>
                  <Select
                    value={searchFilters.education}
                    onValueChange={(value) => setSearchFilters(prev => ({ ...prev, education: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any Education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Education</SelectItem>
                      {EDUCATION_LEVELS.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="Enter city/state"
                    value={searchFilters.location || ""}
                    onChange={(e) => setSearchFilters(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                {/* Income */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Income Range</label>
                  <Select
                    value={searchFilters.minIncome}
                    onValueChange={(value) => setSearchFilters(prev => ({ ...prev, minIncome: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any Income" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Income</SelectItem>
                      {INCOME_RANGES.map(range => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {activeTab === "search" && (
                  <Button
                    onClick={handleSearch}
                    className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90"
                    disabled={loadingSearch}
                  >
                    {loadingSearch ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-search mr-2"></i>
                        Search Profiles
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* AI Recommendations Tab */}
            {activeTab === "recommendations" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900">AI Recommendations</h2>
                    <p className="text-neutral-600">Profiles curated specially for you based on compatibility</p>
                  </div>
                  <Badge className="bg-[#E91E63]/10 text-[#E91E63] border-[#E91E63]/20">
                    <i className="fas fa-brain mr-1"></i>
                    AI Powered
                  </Badge>
                </div>

                {loadingRecommendations ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
                        <div className="h-4 bg-neutral-200 rounded mb-4"></div>
                        <div className="h-3 bg-neutral-200 rounded mb-2"></div>
                        <div className="h-3 bg-neutral-200 rounded mb-4"></div>
                        <div className="h-8 bg-neutral-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : recommendations && recommendations.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {recommendations.map((rec: any, index: number) => (
                      <MatchCard
                        key={index}
                        profile={rec.profile}
                        compatibility={rec.compatibility}
                        onExpressInterest={handleExpressInterest}
                        isLoading={expressInterestMutation.isPending}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="pt-12 pb-12 text-center">
                      <i className="fas fa-heart text-4xl text-neutral-300 mb-4"></i>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">No Recommendations Yet</h3>
                      <p className="text-neutral-600 mb-6">
                        Complete your profile to get AI-powered recommendations tailored for you.
                      </p>
                      <Link href="/profile">
                        <Button className="bg-[#E91E63] hover:bg-[#E91E63]/90">
                          Complete Profile
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* My Matches Tab */}
            {activeTab === "matches" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">My Matches</h2>
                  <p className="text-neutral-600">Profiles that have shown mutual interest</p>
                </div>

                {loadingMatches ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2].map(i => (
                      <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
                        <div className="h-4 bg-neutral-200 rounded mb-4"></div>
                        <div className="h-3 bg-neutral-200 rounded mb-2"></div>
                        <div className="h-3 bg-neutral-200 rounded mb-4"></div>
                        <div className="h-8 bg-neutral-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : matches && matches.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {matches.map((match: any) => (
                      <MatchCard
                        key={match.id}
                        profile={match.matchedUser.profile}
                        user={match.matchedUser}
                        compatibility={{
                          overallScore: match.compatibilityScore,
                          scoreBreakdown: match.scoreBreakdown,
                          insights: match.aiInsights,
                          explanation: "Matched based on compatibility analysis"
                        }}
                        onExpressInterest={handleExpressInterest}
                        isLoading={expressInterestMutation.isPending}
                        showChatButton={true}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="pt-12 pb-12 text-center">
                      <i className="fas fa-users text-4xl text-neutral-300 mb-4"></i>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">No Matches Yet</h3>
                      <p className="text-neutral-600 mb-6">
                        Start expressing interest in profiles to create matches.
                      </p>
                      <Button
                        onClick={() => setActiveTab("recommendations")}
                        className="bg-[#E91E63] hover:bg-[#E91E63]/90"
                      >
                        Browse Recommendations
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Search Tab */}
            {activeTab === "search" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">Search Profiles</h2>
                  <p className="text-neutral-600">Use filters to find profiles that match your preferences</p>
                </div>

                {searchResults && searchResults.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {searchResults.map((profile: any) => (
                      <MatchCard
                        key={profile.id}
                        profile={profile}
                        onExpressInterest={handleExpressInterest}
                        isLoading={expressInterestMutation.isPending}
                      />
                    ))}
                  </div>
                ) : searchResults && searchResults.length === 0 ? (
                  <Card>
                    <CardContent className="pt-12 pb-12 text-center">
                      <i className="fas fa-search text-4xl text-neutral-300 mb-4"></i>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">No Results Found</h3>
                      <p className="text-neutral-600 mb-6">
                        Try adjusting your search filters to find more profiles.
                      </p>
                      <Button onClick={resetFilters} variant="outline">
                        Reset Filters
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="pt-12 pb-12 text-center">
                      <i className="fas fa-search text-4xl text-neutral-300 mb-4"></i>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">Start Your Search</h3>
                      <p className="text-neutral-600 mb-6">
                        Use the filters on the left and click search to find profiles that match your preferences.
                      </p>
                      <Button
                        onClick={handleSearch}
                        className="bg-[#E91E63] hover:bg-[#E91E63]/90"
                        disabled={loadingSearch}
                      >
                        <i className="fas fa-search mr-2"></i>
                        Search Now
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
