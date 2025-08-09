import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SangamLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-rose-600 dark:text-rose-400 mb-4">
            SANGAM
          </h1>
          <div className="w-32 h-32 mx-auto mb-6 bg-rose-100 dark:bg-rose-900 rounded-full flex items-center justify-center">
            <span className="text-rose-600 dark:text-rose-400 text-4xl">❤️</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="text-lg leading-relaxed space-y-6 text-gray-700 dark:text-gray-300">
                <p>
                  Konkanis are a small community worldwide already and shrinking because of inter-community marriages. 
                  Konkani, as a language and as a cultural community, need to be preserved, so our Konkani Saraswat 
                  identity is preserved for future generations.
                </p>
                
                <p>
                  <strong>"Sangam"</strong> is a small effort to ensure the continuity of our Konkani Saraswat language 
                  and culture - developed for eligible Konkani Saraswats from around the world of marriageable age and 
                  with the intention to get to know each other and hopefully find their suitable match.
                </p>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Looking for a Konkani Saraswat match will be a 3-step process:
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">Registration:</h4>
                        <p>Register your details in the form below. (Only if you are a Konkani or have a Konkani background/roots.)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">Verification:</h4>
                        <p>Someone will contact you personally and will verify the information that you provided, including checking if you are a Konkani or have a Konkani background.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">Access to prospects:</h4>
                        <p>Once you are verified then you will be able to access suitable prospects who have registered and have been verified.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="mb-8 border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
              <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">Note:</h3>
              <div className="text-sm text-orange-700 dark:text-orange-300 space-y-2">
                <p><strong>Sangam is not responsible for:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Whether the person you are interacting with is a Konkani or has a Konkani background.</li>
                  <li>The outcome of the interaction you have with prospects, in terms of any emotional, social or financial implications.</li>
                  <li>The success of the subsequent alliance.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Link href="/sangam-register">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 text-lg">
                Begin Registration
              </Button>
            </Link>
            
            <div className="space-x-4">
              <Link href="/terms-conditions">
                <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                  Terms & Conditions
                </Button>
              </Link>
              
              <Link href="/login">
                <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                  Already Registered? Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}