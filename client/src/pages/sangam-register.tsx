import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Upload, X } from "lucide-react";
import { Link } from "wouter";

export default function SangamRegister() {
  const [currentSection, setCurrentSection] = useState(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [horoscopeFile, setHoroscopeFile] = useState<File | null>(null);

  const sections = [
    "Personal Information",
    "Educational Information", 
    "Professional Information",
    "Social Media Information",
    "Horoscope Information",
    "Family Information"
  ];

  const countries = [
    "United States", "India", "Canada", "United Kingdom", "Australia", 
    "Germany", "France", "Japan", "Singapore", "UAE", "Other"
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).slice(0, 10 - photos.length);
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/sangam-landing">
            <h1 className="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2 cursor-pointer hover:text-rose-700">
              SANGAM
            </h1>
          </Link>
          <p className="text-gray-600 dark:text-gray-400">Registration Form</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-4">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`flex items-center ${index < sections.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === currentSection
                      ? 'bg-rose-600 text-white'
                      : index < currentSection
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                {index < sections.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      index < currentSection ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {sections[currentSection]}
            </h2>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-rose-600 dark:text-rose-400">
                {sections[currentSection]}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Personal Information */}
              {currentSection === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="Enter first name" required />
                    </div>
                    <div>
                      <Label htmlFor="middleName">Middle Name</Label>
                      <Input id="middleName" placeholder="Enter middle name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Enter last name" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="Enter email address" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" type="tel" placeholder="Enter phone number" required />
                    </div>
                    <div>
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input id="dob" type="date" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="heightFeet">Height (Feet)</Label>
                      <Input id="heightFeet" placeholder="5" />
                    </div>
                    <div>
                      <Label htmlFor="heightInches">Height (Inches)</Label>
                      <Input id="heightInches" placeholder="8" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="citizenship">Country of Citizenship *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map(country => (
                            <SelectItem key={country} value={country.toLowerCase()}>{country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="maritalStatus">Marital Status *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="divorced">Divorced</SelectItem>
                          <SelectItem value="widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="religion">Religion *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hindu">Hindu</SelectItem>
                        <SelectItem value="muslim">Muslim</SelectItem>
                        <SelectItem value="christian">Christian</SelectItem>
                        <SelectItem value="jain">Jain</SelectItem>
                        <SelectItem value="parsi">Parsi</SelectItem>
                        <SelectItem value="sikh">Sikh</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Current Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="currentCountry">Country *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map(country => (
                              <SelectItem key={country} value={country.toLowerCase()}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="currentState">State</Label>
                        <Input id="currentState" placeholder="Enter state" />
                      </div>
                      <div>
                        <Label htmlFor="currentCity">City</Label>
                        <Input id="currentCity" placeholder="Enter city" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="languages">Languages Spoken</Label>
                    <Input id="languages" placeholder="e.g., Konkani, English, Hindi" />
                  </div>

                  <div>
                    <Label htmlFor="kuladevata">Kuladevata (Family God)</Label>
                    <Input id="kuladevata" placeholder="Enter kuladevata" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Birth Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="birthCountry">Country</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map(country => (
                              <SelectItem key={country} value={country.toLowerCase()}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="birthState">State</Label>
                        <Input id="birthState" placeholder="Enter state" />
                      </div>
                      <div>
                        <Label htmlFor="birthCity">City</Label>
                        <Input id="birthCity" placeholder="Enter city" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="hobbies">Hobbies</Label>
                    <Textarea id="hobbies" placeholder="Tell us about your hobbies and interests..." rows={4} />
                  </div>

                  <div>
                    <Label htmlFor="aboutMe">About Me</Label>
                    <Textarea id="aboutMe" placeholder="Tell us about yourself..." rows={4} />
                  </div>

                  <div>
                    <Label htmlFor="lookingFor">What am I looking for in my future spouse</Label>
                    <Textarea id="lookingFor" placeholder="Describe what you're looking for in a partner..." rows={4} />
                  </div>

                  <div>
                    <Label htmlFor="photos">Photos (Max 10)</Label>
                    <div className="space-y-4">
                      <Input
                        id="photos"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('photos')?.click()}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photos
                      </Button>
                      {photos.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {photos.map((photo, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(photo)}
                                alt={`Photo ${index + 1}`}
                                className="w-full h-24 object-cover rounded"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1 w-6 h-6 p-0"
                                onClick={() => removePhoto(index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Educational Information */}
              {currentSection === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="education">Highest Education Qualification</Label>
                    <Input id="education" placeholder="e.g., Bachelor's in Engineering, MBA" />
                  </div>

                  <div>
                    <Label htmlFor="college">College/University</Label>
                    <Input id="college" placeholder="e.g., University of Mumbai, MIT" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Education Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="eduCountry">Country</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map(country => (
                              <SelectItem key={country} value={country.toLowerCase()}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="eduState">State</Label>
                        <Input id="eduState" placeholder="Enter state" />
                      </div>
                      <div>
                        <Label htmlFor="eduCity">City</Label>
                        <Input id="eduCity" placeholder="Enter city" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Professional Information */}
              {currentSection === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="workingStatus">Working Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select working status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="working-full-time">Working Full time</SelectItem>
                        <SelectItem value="working-part-time">Working Part time</SelectItem>
                        <SelectItem value="not-working">Not working</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="visaStatus">Visa/Residency Status</Label>
                    <Input id="visaStatus" placeholder="e.g., US Citizen, Indian Citizen, H1B, Green Card" />
                  </div>
                </div>
              )}

              {/* Social Media Information */}
              {currentSection === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="facebook">Facebook Profile</Label>
                    <Input id="facebook" placeholder="https://facebook.com/username" />
                  </div>

                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Profile</Label>
                    <Input id="whatsapp" placeholder="WhatsApp number or profile" />
                  </div>

                  <div>
                    <Label htmlFor="instagram">Instagram Profile</Label>
                    <Input id="instagram" placeholder="https://instagram.com/username" />
                  </div>

                  <div>
                    <Label htmlFor="twitter">Twitter Profile</Label>
                    <Input id="twitter" placeholder="https://twitter.com/username" />
                  </div>

                  <div>
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input id="linkedin" placeholder="https://linkedin.com/in/username" />
                  </div>
                </div>
              )}

              {/* Horoscope Information */}
              {currentSection === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Birth Location (from Personal Information)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input placeholder="Country" disabled className="bg-gray-100" />
                      <Input placeholder="State" disabled className="bg-gray-100" />
                      <Input placeholder="City" disabled className="bg-gray-100" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="birthTime">Time of Birth</Label>
                    <Input id="birthTime" type="time" />
                  </div>

                  <div>
                    <Label htmlFor="horoscope">Horoscope File</Label>
                    <div className="space-y-4">
                      <Input
                        id="horoscope"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => e.target.files && setHoroscopeFile(e.target.files[0])}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('horoscope')?.click()}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Horoscope
                      </Button>
                      {horoscopeFile && (
                        <p className="text-sm text-gray-600">
                          Selected: {horoscopeFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="nakshatra">Nakshatra</Label>
                      <Input id="nakshatra" placeholder="Enter nakshatra" />
                    </div>
                    <div>
                      <Label htmlFor="rashi">Rashi</Label>
                      <Input id="rashi" placeholder="Enter rashi" />
                    </div>
                    <div>
                      <Label htmlFor="gotra">Gotra</Label>
                      <Input id="gotra" placeholder="Enter gotra" />
                    </div>
                  </div>
                </div>
              )}

              {/* Family Information */}
              {currentSection === 5 && (
                <div className="space-y-8">
                  {/* Father's Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Father's Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fatherFirstName">Father's First Name</Label>
                        <Input id="fatherFirstName" placeholder="Enter father's first name" />
                      </div>
                      <div>
                        <Label htmlFor="fatherLastName">Father's Last Name</Label>
                        <Input id="fatherLastName" placeholder="Enter father's last name" />
                      </div>
                      <div>
                        <Label htmlFor="fatherEmail">Father's Email</Label>
                        <Input id="fatherEmail" type="email" placeholder="Enter father's email" />
                      </div>
                      <div>
                        <Label htmlFor="fatherPhone">Father's Phone</Label>
                        <Input id="fatherPhone" type="tel" placeholder="Enter father's phone" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="fatherResidence">Father's Residence (City/State/Country)</Label>
                      <Input id="fatherResidence" placeholder="Enter father's residence" />
                    </div>
                  </div>

                  {/* Mother's Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Mother's Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="motherFirstName">Mother's First Name</Label>
                        <Input id="motherFirstName" placeholder="Enter mother's first name" />
                      </div>
                      <div>
                        <Label htmlFor="motherLastName">Mother's Last Name</Label>
                        <Input id="motherLastName" placeholder="Enter mother's last name" />
                      </div>
                      <div>
                        <Label htmlFor="motherEmail">Mother's Email</Label>
                        <Input id="motherEmail" type="email" placeholder="Enter mother's email" />
                      </div>
                      <div>
                        <Label htmlFor="motherPhone">Mother's Phone</Label>
                        <Input id="motherPhone" type="tel" placeholder="Enter mother's phone" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="motherResidence">Mother's Residence (City/State/Country)</Label>
                      <Input id="motherResidence" placeholder="Enter mother's residence" />
                    </div>
                  </div>

                  {/* Siblings Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Siblings Information</h3>
                    {[1, 2, 3, 4, 5].map((index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-3">Sibling {index}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor={`sibling${index}Type`}>Relationship</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="brother">Brother</SelectItem>
                                <SelectItem value="sister">Sister</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor={`sibling${index}Email`}>Email</Label>
                            <Input id={`sibling${index}Email`} type="email" placeholder="Enter email" />
                          </div>
                          <div>
                            <Label htmlFor={`sibling${index}Phone`}>Phone</Label>
                            <Input id={`sibling${index}Phone`} type="tel" placeholder="Enter phone" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Native Origin */}
                  <div>
                    <Label htmlFor="nativeOrigin">Native Origin (e.g., Mulky, Udupi)</Label>
                    <Input id="nativeOrigin" placeholder="Enter native origin" />
                  </div>

                  {/* Hide Profile Option */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hideProfile" />
                    <Label htmlFor="hideProfile">Hide/De-activate profile</Label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevSection}
                  disabled={currentSection === 0}
                >
                  Previous
                </Button>
                
                {currentSection < sections.length - 1 ? (
                  <Button type="button" onClick={nextSection}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
                    Submit Registration
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}