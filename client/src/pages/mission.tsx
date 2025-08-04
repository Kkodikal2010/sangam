import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Star, Shield, Globe, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Mission() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-rose-100 dark:bg-rose-900/20 rounded-full">
              <Heart className="h-12 w-12 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Our Mission
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            To revolutionize the way people find meaningful relationships by combining 
            ancient wisdom of traditional matchmaking with cutting-edge AI technology.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 border-none shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
              Bringing Hearts Together
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
              At Sangam, we believe that finding your life partner should be a journey of 
              discovery, not a game of chance. Our AI-powered platform analyzes personality 
              traits, values, lifestyle preferences, and compatibility factors to create 
              meaningful connections that go beyond surface-level attraction. We honor the 
              sacred tradition of marriage while embracing modern technology to help you 
              find your perfect match.
            </p>
          </CardContent>
        </Card>

        {/* Core Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-none shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl">Authentic Connections</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 dark:text-gray-300">
                We foster genuine relationships built on shared values, mutual respect, 
                and deep compatibility beyond superficial attributes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl">Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Your personal information is sacred to us. We employ industry-leading 
                security measures to protect your data and privacy.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit">
                <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl">AI-Powered Insights</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Our advanced AI analyzes personality traits and compatibility factors 
                to provide intelligent match recommendations and insights.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full w-fit">
                <Star className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-xl">Excellence in Service</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 dark:text-gray-300">
                We're committed to providing exceptional service and support throughout 
                your journey to finding your life partner.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-teal-100 dark:bg-teal-900/20 rounded-full w-fit">
                <Globe className="h-8 w-8 text-teal-600 dark:text-teal-400" />
              </div>
              <CardTitle className="text-xl">Global Community</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 dark:text-gray-300">
                We celebrate diversity and welcome people from all backgrounds, 
                cultures, and walks of life to find their perfect match.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-pink-100 dark:bg-pink-900/20 rounded-full w-fit">
                <Heart className="h-8 w-8 text-pink-600 dark:text-pink-400" />
              </div>
              <CardTitle className="text-xl">Sacred Commitment</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 dark:text-gray-300">
                We honor the sanctity of marriage and are dedicated to helping you 
                find a life partner for lasting happiness and fulfillment.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="inline-block border-none shadow-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Journey?</h3>
              <p className="text-rose-100 mb-6">
                Join thousands of people who have found their perfect match through Sangam
              </p>
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-rose-600 hover:bg-rose-50">
                  Start Your Journey
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}