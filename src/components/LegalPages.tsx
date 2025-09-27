import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, FileText, Shield } from 'lucide-react';

interface LegalPageProps {
  onBack: () => void;
}

export function TermsOfServicePage({ onBack }: LegalPageProps) {
  return (
    <div className="h-screen w-screen overflow-y-auto" style={{ background: 'var(--background)' }}>
      <div className="min-h-screen p-4">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border/50 -mx-4 px-4 py-3 mb-6">
          <div className="flex items-center gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="w-10 h-10 p-0 border-purple-500/50 hover:bg-purple-500/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-semibold">Terms of Service</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Welcome to Textenger</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service ("Terms") govern your use of Textenger ("Service") operated by Textenger Inc. ("us", "we", or "our").
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="font-medium">1. Acceptance of Terms</h3>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-medium">2. User Accounts</h3>
              <div className="space-y-2 text-muted-foreground leading-relaxed">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
                <p>You are responsible for safeguarding the password and for maintaining the confidentiality of your account.</p>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="font-medium">3. Content Policy</h3>
              <div className="space-y-2 text-muted-foreground leading-relaxed">
                <p>You retain your rights to any content you submit, post or display on or through the Service.</p>
                <p>You may not post content that is illegal, harmful, threatening, abusive, or violates any laws.</p>
                <p>We reserve the right to remove any content that violates these terms.</p>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="font-medium">4. Privacy and Data</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-medium">5. Prohibited Uses</h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>You may not use our service:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>For any unlawful purpose</li>
                  <li>To harass, abuse, insult, harm, or threaten others</li>
                  <li>To spam or send unsolicited messages</li>
                  <li>To impersonate another person or entity</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="font-medium">6. Termination</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-medium">7. Contact Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at legal@textenger.com
              </p>
            </section>
          </div>

          <div className="pt-8 pb-safe">
            <Button
              onClick={onBack}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 font-semibold transition-all duration-300"
            >
              I Understand
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPolicyPage({ onBack }: LegalPageProps) {
  return (
    <div className="h-screen w-screen overflow-y-auto" style={{ background: 'var(--background)' }}>
      <div className="min-h-screen p-4">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border/50 -mx-4 px-4 py-3 mb-6">
          <div className="flex items-center gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="w-10 h-10 p-0 border-purple-500/50 hover:bg-purple-500/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-semibold">Privacy Policy</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Your Privacy Matters</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy describes how Textenger collects, uses, and protects your personal information when you use our service.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="font-medium">1. Information We Collect</h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>We collect information you provide directly to us, such as:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Account information (username, email, display name)</li>
                  <li>Profile information and preferences</li>
                  <li>Content you create and share (posts, messages, media)</li>
                  <li>Communications with us</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="font-medium">2. How We Use Your Information</h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send notifications</li>
                  <li>Respond to your comments and questions</li>
                  <li>Ensure the security of our platform</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="font-medium">3. Information Sharing</h3>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-medium">4. Data Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-medium">5. Your Rights</h3>
              <div className="text-muted-foreground leading-relaxed">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct or update your information</li>
                  <li>Delete your account and data</li>
                  <li>Opt out of certain communications</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="font-medium">6. Cookies and Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage, and personalize content.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-medium">7. Children's Privacy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-medium">8. Contact Us</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@textenger.com
              </p>
            </section>
          </div>

          <div className="pt-8 pb-safe">
            <Button
              onClick={onBack}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 font-semibold transition-all duration-300"
            >
              I Understand
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}