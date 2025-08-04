import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface MatchCardProps {
  profile: any;
  user?: any;
  compatibility?: {
    overallScore: number;
    scoreBreakdown?: {
      values?: number;
      lifestyle?: number;
      personality?: number;
      interests?: number;
      goals?: number;
    };
    insights?: string;
    explanation?: string;
  };
  onExpressInterest: (userId: string, message?: string) => void;
  isLoading?: boolean;
  showChatButton?: boolean;
}

export default function MatchCard({
  profile,
  user,
  compatibility,
  onExpressInterest,
  isLoading = false,
  showChatButton = false,
}: MatchCardProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleExpressInterest = () => {
    onExpressInterest(user?.id || profile.userId, message);
    setShowMessage(false);
    setMessage("");
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 70) return "text-[#FF9800] bg-[#FF9800]/10 border-[#FF9800]/20";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getCompatibilityRingStyle = (score: number) => {
    const percentage = (score / 100) * 360;
    return { "--percentage": `${percentage}deg` } as React.CSSProperties;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border border-neutral-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <img
              src={profile.photos?.[0] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"}
              alt="Profile"
              className="w-20 h-20 rounded-xl object-cover border-2 border-neutral-200"
            />
            {profile.verificationStatus === "verified" && (
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <i className="fas fa-check text-white text-xs"></i>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-semibold text-neutral-900 truncate">
                  {user ? `${user.firstName} ${user.lastName}` : "Profile"}
                </h3>
                {profile.verificationStatus === "verified" && (
                  <Badge variant="secondary" className="text-xs">
                    <i className="fas fa-shield-check mr-1"></i>
                    Verified
                  </Badge>
                )}
              </div>
              
              {/* Compatibility Score */}
              {compatibility && (
                <div className="flex items-center space-x-2">
                  <div className="relative w-12 h-12">
                    <div
                      className="compatibility-ring w-12 h-12 rounded-full"
                      style={getCompatibilityRingStyle(compatibility.overallScore)}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-neutral-900">
                        {compatibility.overallScore}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-4 text-neutral-600 text-sm">
                {profile.age && <span>{profile.age} years</span>}
                {profile.occupation && (
                  <>
                    <span>•</span>
                    <span>{profile.occupation}</span>
                  </>
                )}
                {profile.location && (
                  <>
                    <span>•</span>
                    <span>{profile.location}</span>
                  </>
                )}
              </div>
              
              {profile.bio && (
                <p className="text-neutral-600 text-sm line-clamp-2">
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Compatibility Breakdown */}
            {compatibility?.scoreBreakdown && (
              <div className="flex items-center space-x-4 mb-4 text-xs">
                {compatibility.scoreBreakdown.values && (
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-heart text-[#E91E63]"></i>
                    <span className="text-neutral-600">Values: {compatibility.scoreBreakdown.values}%</span>
                  </div>
                )}
                {compatibility.scoreBreakdown.lifestyle && (
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-users text-[#3F51B5]"></i>
                    <span className="text-neutral-600">Lifestyle: {compatibility.scoreBreakdown.lifestyle}%</span>
                  </div>
                )}
              </div>
            )}

            {/* Interests */}
            {profile.interests && profile.interests.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {profile.interests.slice(0, 3).map((interest: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
                {profile.interests.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{profile.interests.length - 3} more
                  </Badge>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              {/* View Details */}
              <Dialog open={showDetails} onOpenChange={setShowDetails}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-[#E91E63] hover:bg-[#E91E63]/10">
                    <i className="fas fa-eye mr-2"></i>
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <span>{user ? `${user.firstName} ${user.lastName}` : "Profile Details"}</span>
                      {compatibility && (
                        <Badge className={getCompatibilityColor(compatibility.overallScore)}>
                          {compatibility.overallScore}% Compatible
                        </Badge>
                      )}
                    </DialogTitle>
                    <DialogDescription>
                      Detailed profile information and compatibility analysis
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Profile Image */}
                    <div className="text-center">
                      <img
                        src={profile.photos?.[0] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"}
                        alt="Profile"
                        className="w-32 h-32 rounded-xl object-cover mx-auto border-4 border-neutral-200"
                      />
                    </div>

                    {/* Basic Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-neutral-900">Basic Information</h4>
                        <div className="text-sm space-y-1">
                          {profile.age && <p><span className="font-medium">Age:</span> {profile.age} years</p>}
                          {profile.gender && <p><span className="font-medium">Gender:</span> {profile.gender}</p>}
                          {profile.religion && <p><span className="font-medium">Religion:</span> {profile.religion}</p>}
                          {profile.motherTongue && <p><span className="font-medium">Mother Tongue:</span> {profile.motherTongue}</p>}
                          {profile.height && <p><span className="font-medium">Height:</span> {profile.height} cm</p>}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-neutral-900">Professional</h4>
                        <div className="text-sm space-y-1">
                          {profile.education && <p><span className="font-medium">Education:</span> {profile.education}</p>}
                          {profile.occupation && <p><span className="font-medium">Occupation:</span> {profile.occupation}</p>}
                          {profile.income && <p><span className="font-medium">Income:</span> {profile.income}</p>}
                          {profile.location && <p><span className="font-medium">Location:</span> {profile.location}</p>}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Bio */}
                    {profile.bio && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-neutral-900">About</h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">{profile.bio}</p>
                      </div>
                    )}

                    {/* Interests and Values */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {profile.interests && profile.interests.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-neutral-900">Interests</h4>
                          <div className="flex flex-wrap gap-1">
                            {profile.interests.map((interest: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {profile.values && profile.values.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-neutral-900">Values</h4>
                          <div className="flex flex-wrap gap-1">
                            {profile.values.map((value: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Compatibility Analysis */}
                    {compatibility && (
                      <>
                        <Separator />
                        <div className="space-y-4">
                          <h4 className="font-semibold text-neutral-900">Compatibility Analysis</h4>
                          
                          {compatibility.scoreBreakdown && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {Object.entries(compatibility.scoreBreakdown).map(([key, value]) => (
                                <div key={key} className="text-center">
                                  <div className="text-2xl font-bold text-[#E91E63]">{value}%</div>
                                  <div className="text-sm text-neutral-600 capitalize">{key}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {compatibility.insights && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="flex items-start space-x-3">
                                <i className="fas fa-lightbulb text-blue-600 mt-1"></i>
                                <div>
                                  <h5 className="font-medium text-blue-900 mb-1">AI Insights</h5>
                                  <p className="text-sm text-blue-800">{compatibility.insights}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {showChatButton ? (
                  <Button size="sm" className="bg-[#3F51B5] hover:bg-[#3F51B5]/90 text-white">
                    <i className="fas fa-comments mr-2"></i>
                    Chat
                  </Button>
                ) : (
                  <Dialog open={showMessage} onOpenChange={setShowMessage}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="bg-[#E91E63] hover:bg-[#E91E63]/90 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-heart mr-2"></i>
                            Express Interest
                          </>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Express Interest</DialogTitle>
                        <DialogDescription>
                          Send a personalized message to express your interest (optional)
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Write a thoughtful message (optional)..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="min-h-24"
                        />
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowMessage(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleExpressInterest}
                            className="bg-[#E91E63] hover:bg-[#E91E63]/90"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            ) : (
                              <i className="fas fa-heart mr-2"></i>
                            )}
                            Send Interest
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
