import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/sangam-landing">
            <h1 className="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2 cursor-pointer hover:text-rose-700">
              KHUSHI KAHANI
            </h1>
          </Link>
          <p className="text-gray-600 dark:text-gray-400">Terms & Conditions</p>
        </div>

        {/* Terms Content */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-rose-600 dark:text-rose-400">
                Terms & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-gray max-w-none dark:prose-invert">
                <h3>1. Acceptance of Terms</h3>
                <p>
                  By using Khushi Kahani matrimonial platform, you agree to be bound by these Terms and Conditions. 
                  If you do not agree to these terms, please do not use our services.
                </p>

                <h3>2. Eligibility</h3>
                <p>
                  Khushi Kahani is exclusively for individuals of Konkani Saraswat heritage or those with Konkani 
                  background/roots. Users must be of legal marriageable age in their jurisdiction and 
                  genuinely seeking matrimonial alliances.
                </p>

                <h3>3. Registration and Verification</h3>
                <ul>
                  <li>All information provided during registration must be accurate and truthful</li>
                  <li>Khushi Kahani reserves the right to verify any information provided</li>
                  <li>False information may result in immediate account termination</li>
                  <li>Verification process may include personal contact and background checks</li>
                </ul>

                <h3>4. User Responsibilities</h3>
                <ul>
                  <li>Maintain confidentiality of your account credentials</li>
                  <li>Report any suspicious or inappropriate behavior</li>
                  <li>Respect other users and maintain appropriate communication</li>
                  <li>Do not share personal contact information until verification is complete</li>
                </ul>

                <h3>5. Disclaimer of Responsibility</h3>
                <p><strong>Khushi Kahani is not responsible for:</strong></p>
                <ul>
                  <li>Verification of Konkani heritage of registered users</li>
                  <li>The outcome of interactions between users</li>
                  <li>Any emotional, social, or financial implications arising from user interactions</li>
                  <li>The success or failure of matrimonial alliances formed through the platform</li>
                  <li>Any misrepresentation by users regarding their background, status, or intentions</li>
                </ul>

                <h3>6. Privacy and Data Protection</h3>
                <ul>
                  <li>User data will be kept confidential and secure</li>
                  <li>Information will only be shared with verified, compatible matches</li>
                  <li>Users can request account deactivation or data deletion at any time</li>
                  <li>Photos and personal information will not be used for any purpose other than matchmaking</li>
                </ul>

                <h3>7. Prohibited Activities</h3>
                <ul>
                  <li>Creating fake profiles or providing false information</li>
                  <li>Harassment, abuse, or inappropriate behavior toward other users</li>
                  <li>Commercial use of the platform for non-matrimonial purposes</li>
                  <li>Sharing or distributing other users' personal information</li>
                </ul>

                <h3>8. Account Termination</h3>
                <p>
                  Khushi Kahani reserves the right to terminate accounts that violate these terms, 
                  engage in inappropriate behavior, or are found to have provided false information.
                </p>

                <h3>9. Limitation of Liability</h3>
                <p>
                  Users acknowledge that matrimonial matching involves personal choices and that 
                  Khushi Kahani cannot guarantee successful matches or relationships. Users participate 
                  at their own risk and discretion.
                </p>

                <h3>10. Modifications</h3>
                <p>
                  Khushi Kahani reserves the right to modify these terms at any time. Users will be 
                  notified of significant changes and continued use constitutes acceptance of 
                  modified terms.
                </p>

                <h3>11. Contact Information</h3>
                <p>
                  For questions about these terms or the service, please contact us through 
                  the platform's support system.
                </p>
              </div>

              <div className="border-t pt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  By clicking "I Agree", you acknowledge that you have read, understood, and agree 
                  to be bound by these Terms and Conditions.
                </p>
                
                <div className="space-y-4">
                  <Link href="/sangam-register">
                    <Button className="bg-rose-600 hover:bg-rose-700 text-white px-8">
                      I Agree - Proceed to Registration
                    </Button>
                  </Link>
                  
                  <div>
                    <Link href="/sangam-landing">
                      <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}