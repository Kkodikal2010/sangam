import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const profileSchema = z.object({
  age: z.number().min(18, "Must be at least 18 years old").max(100, "Age must be realistic"),
  gender: z.string().min(1, "Please select your gender"),
  religion: z.string().optional(),
  caste: z.string().optional(),
  motherTongue: z.string().optional(),
  height: z.number().min(100, "Height must be realistic").max(250, "Height must be realistic").optional(),
  weight: z.number().min(30, "Weight must be realistic").max(200, "Weight must be realistic").optional(),
  education: z.string().min(1, "Please enter your education"),
  occupation: z.string().min(1, "Please enter your occupation"),
  income: z.string().optional(),
  location: z.string().min(1, "Please enter your location"),
  bio: z.string().min(50, "Bio must be at least 50 characters").max(500, "Bio must be less than 500 characters"),
  interests: z.array(z.string()).min(3, "Please select at least 3 interests"),
  values: z.array(z.string()).min(3, "Please select at least 3 values"),
});

type ProfileForm = z.infer<typeof profileSchema>;

const INTERESTS_OPTIONS = [
  "Reading", "Traveling", "Cooking", "Music", "Dancing", "Sports", "Movies", "Photography",
  "Art", "Fitness", "Yoga", "Meditation", "Gaming", "Technology", "Nature", "Animals",
  "Volunteering", "Writing", "Learning Languages", "Fashion", "Food", "Adventure Sports"
];

const VALUES_OPTIONS = [
  "Family", "Career", "Spirituality", "Health", "Adventure", "Stability", "Growth",
  "Honesty", "Loyalty", "Compassion", "Independence", "Tradition", "Innovation",
  "Social Service", "Environmental Care", "Financial Security", "Work-Life Balance"
];

const RELIGIONS = [
  "Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Jewish", "Parsi", "Other"
];

const EDUCATION_LEVELS = [
  "High School", "Bachelor's Degree", "Master's Degree", "PhD", "Professional Degree",
  "Diploma", "Certificate", "Other"
];

export default function Profile() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["/api/profile"],
    enabled: !!localStorage.getItem("token"),
  });

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      age: 25,
      gender: "",
      religion: "",
      caste: "",
      motherTongue: "",
      height: undefined,
      weight: undefined,
      education: "",
      occupation: "",
      income: "",
      location: "",
      bio: "",
      interests: [],
      values: [],
    },
  });

  useEffect(() => {
    if (profile?.profile) {
      const p = profile.profile;
      form.reset({
        age: p.age || 25,
        gender: p.gender || "",
        religion: p.religion || "",
        caste: p.caste || "",
        motherTongue: p.motherTongue || "",
        height: p.height || undefined,
        weight: p.weight || undefined,
        education: p.education || "",
        occupation: p.occupation || "",
        income: p.income || "",
        location: p.location || "",
        bio: p.bio || "",
        interests: p.interests || [],
        values: p.values || [],
      });
      setSelectedInterests(p.interests || []);
      setSelectedValues(p.values || []);
    }
  }, [profile, form]);

  const createProfileMutation = useMutation({
    mutationFn: async (data: ProfileForm) => {
      const response = await apiRequest("POST", "/api/profile", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({
        title: "Profile created!",
        description: "Your profile has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create profile",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<ProfileForm>) => {
      const response = await apiRequest("PUT", "/api/profile", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({
        title: "Profile updated!",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update profile",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileForm) => {
    const profileData = {
      ...data,
      interests: selectedInterests,
      values: selectedValues,
    };

    if (profile?.profile) {
      updateProfileMutation.mutate(profileData);
    } else {
      createProfileMutation.mutate(profileData);
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      const updated = prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest];
      form.setValue("interests", updated);
      return updated;
    });
  };

  const toggleValue = (value: string) => {
    setSelectedValues(prev => {
      const updated = prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value];
      form.setValue("values", updated);
      return updated;
    });
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step: number): (keyof ProfileForm)[] => {
    switch (step) {
      case 1:
        return ["age", "gender", "religion", "motherTongue"];
      case 2:
        return ["education", "occupation", "location"];
      case 3:
        return ["bio"];
      case 4:
        return ["interests", "values"];
      default:
        return [];
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E91E63] mx-auto mb-4"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">
                  {profile?.profile ? "Edit Profile" : "Create Your Profile"}
                </h1>
                <p className="text-neutral-600">Step {currentStep} of {totalSteps}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32">
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <span className="text-sm font-medium text-neutral-600">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-user text-[#E91E63]"></i>
                  <span>Basic Information</span>
                </CardTitle>
                <CardDescription>
                  Tell us about yourself to help us find better matches
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      {...form.register("age", { valueAsNumber: true })}
                      className={form.formState.errors.age ? "border-red-500" : ""}
                    />
                    {form.formState.errors.age && (
                      <p className="text-sm text-red-500">{form.formState.errors.age.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={form.watch("gender")} onValueChange={(value) => form.setValue("gender", value)}>
                      <SelectTrigger className={form.formState.errors.gender ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.gender && (
                      <p className="text-sm text-red-500">{form.formState.errors.gender.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="religion">Religion</Label>
                    <Select value={form.watch("religion")} onValueChange={(value) => form.setValue("religion", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        {RELIGIONS.map(religion => (
                          <SelectItem key={religion} value={religion}>{religion}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motherTongue">Mother Tongue</Label>
                    <Input
                      id="motherTongue"
                      {...form.register("motherTongue")}
                      placeholder="e.g., Hindi, English, Tamil"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      {...form.register("height", { valueAsNumber: true })}
                      placeholder="e.g., 170"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      {...form.register("weight", { valueAsNumber: true })}
                      placeholder="e.g., 65"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Professional Information */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-briefcase text-[#3F51B5]"></i>
                  <span>Professional Information</span>
                </CardTitle>
                <CardDescription>
                  Share your educational and professional background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="education">Education *</Label>
                  <Select value={form.watch("education")} onValueChange={(value) => form.setValue("education", value)}>
                    <SelectTrigger className={form.formState.errors.education ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {EDUCATION_LEVELS.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.education && (
                    <p className="text-sm text-red-500">{form.formState.errors.education.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Input
                    id="occupation"
                    {...form.register("occupation")}
                    placeholder="e.g., Software Engineer, Doctor, Teacher"
                    className={form.formState.errors.occupation ? "border-red-500" : ""}
                  />
                  {form.formState.errors.occupation && (
                    <p className="text-sm text-red-500">{form.formState.errors.occupation.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income</Label>
                  <Input
                    id="income"
                    {...form.register("income")}
                    placeholder="e.g., 5-10 Lakhs, 10-15 Lakhs"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    {...form.register("location")}
                    placeholder="e.g., Mumbai, Delhi, Bangalore"
                    className={form.formState.errors.location ? "border-red-500" : ""}
                  />
                  {form.formState.errors.location && (
                    <p className="text-sm text-red-500">{form.formState.errors.location.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: About You */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-heart text-[#E91E63]"></i>
                  <span>About You</span>
                </CardTitle>
                <CardDescription>
                  Write something about yourself that makes you unique
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    {...form.register("bio")}
                    placeholder="Tell potential matches about yourself, your hobbies, what you're looking for in a partner..."
                    className={`min-h-32 ${form.formState.errors.bio ? "border-red-500" : ""}`}
                  />
                  <div className="flex justify-between items-center">
                    {form.formState.errors.bio && (
                      <p className="text-sm text-red-500">{form.formState.errors.bio.message}</p>
                    )}
                    <p className="text-sm text-neutral-500 ml-auto">
                      {form.watch("bio")?.length || 0}/500 characters
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-lightbulb text-blue-600 mt-1"></i>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Tips for a great bio:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Be authentic and genuine</li>
                        <li>• Mention your hobbies and interests</li>
                        <li>• Share what you're looking for in a partner</li>
                        <li>• Keep it positive and engaging</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Interests & Values */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <i className="fas fa-star text-[#FF9800]"></i>
                  <span>Interests & Values</span>
                </CardTitle>
                <CardDescription>
                  Help our AI find better matches by selecting your interests and values
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-medium">Your Interests *</Label>
                    <span className="text-sm text-neutral-500">
                      {selectedInterests.length} selected (minimum 3)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {INTERESTS_OPTIONS.map(interest => (
                      <Badge
                        key={interest}
                        variant={selectedInterests.includes(interest) ? "default" : "outline"}
                        className={`cursor-pointer text-center justify-center py-2 hover:scale-105 transition-transform ${
                          selectedInterests.includes(interest)
                            ? "bg-[#E91E63] hover:bg-[#E91E63]/90"
                            : "hover:border-[#E91E63] hover:text-[#E91E63]"
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  {form.formState.errors.interests && (
                    <p className="text-sm text-red-500">{form.formState.errors.interests.message}</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-medium">Your Values *</Label>
                    <span className="text-sm text-neutral-500">
                      {selectedValues.length} selected (minimum 3)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {VALUES_OPTIONS.map(value => (
                      <Badge
                        key={value}
                        variant={selectedValues.includes(value) ? "default" : "outline"}
                        className={`cursor-pointer text-center justify-center py-2 hover:scale-105 transition-transform ${
                          selectedValues.includes(value)
                            ? "bg-[#3F51B5] hover:bg-[#3F51B5]/90"
                            : "hover:border-[#3F51B5] hover:text-[#3F51B5]"
                        }`}
                        onClick={() => toggleValue(value)}
                      >
                        {value}
                      </Badge>
                    ))}
                  </div>
                  {form.formState.errors.values && (
                    <p className="text-sm text-red-500">{form.formState.errors.values.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i + 1 <= currentStep ? "bg-[#E91E63]" : "bg-neutral-300"
                  }`}
                />
              ))}
            </div>

            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep} className="bg-[#E91E63] hover:bg-[#E91E63]/90">
                Next
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-[#E91E63] hover:bg-[#E91E63]/90"
                disabled={createProfileMutation.isPending || updateProfileMutation.isPending}
              >
                {createProfileMutation.isPending || updateProfileMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-2"></i>
                    {profile?.profile ? "Update Profile" : "Create Profile"}
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
