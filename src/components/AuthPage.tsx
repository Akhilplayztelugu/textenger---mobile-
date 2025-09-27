import React, { useState } from 'react';
import { Button } from './ui/button';
import { SignUpModal } from './modals/SignUpModal';
import { SignInModal } from './modals/SignInModal';
import { TermsOfServicePage, PrivacyPolicyPage } from './LegalPages';
import { EmailConfirmationPage } from './ErrorPages';

type AuthState = 'landing' | 'signUp' | 'signIn' | 'emailConfirmation' | 'terms' | 'privacy';

interface AuthPageProps {
  onAuthenticated: (userData: {
    username: string;
    displayName: string;
    email: string;
    password: string;
  }) => void;
}

export function AuthPage({ onAuthenticated }: AuthPageProps) {
  const [authState, setAuthState] = useState<AuthState>('landing');
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');

  const handleSignUp = (userData: {
    username: string;
    displayName: string;
    email: string;
    password: string;
  }) => {
    // Store user data in localStorage for persistence
    localStorage.setItem('textenger_user', JSON.stringify(userData));
    
    // Show email confirmation screen instead of directly authenticating
    setConfirmationEmail(userData.email);
    setIsSignUpModalOpen(false);
    setAuthState('emailConfirmation');
  };

  const handleSignIn = (userData: {
    username: string;
    displayName: string;
    email: string;
    password: string;
  }) => {
    onAuthenticated(userData);
  };

  const handleSwitchToSignUp = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const handleSwitchToSignIn = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(true);
  };

  const handleBackToLanding = () => {
    setAuthState('landing');
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(false);
  };

  const handleContinueToSignIn = () => {
    setAuthState('landing');
    setIsSignInModalOpen(true);
  };

  // Render based on auth state
  if (authState === 'terms') {
    return <TermsOfServicePage onBack={handleBackToLanding} />;
  }

  if (authState === 'privacy') {
    return <PrivacyPolicyPage onBack={handleBackToLanding} />;
  }

  if (authState === 'emailConfirmation') {
    return (
      <EmailConfirmationPage
        email={confirmationEmail}
        onContinueToSignIn={handleContinueToSignIn}
        onResendEmail={() => {
          // Mock resend email functionality
          console.log('Resending email to:', confirmationEmail);
        }}
      />
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Enhanced background with moving gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-violet-600/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-1000">
          {/* Enhanced Logo and Branding */}
          <div className="space-y-6">
            <div className="relative">
              <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-2xl ring-4 ring-purple-400/30 neon-glow animate-in zoom-in duration-700">
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-violet-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-2 -left-4 w-4 h-4 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-700 delay-300">
                Textenger
              </h1>
              <p className="text-lg text-muted-foreground font-medium animate-in slide-in-from-bottom-4 duration-700 delay-500">
                Connect • Share • Chat
              </p>
            </div>
          </div>

          {/* Enhanced Welcome Message */}
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-700">
            <h2 className="text-2xl font-semibold text-foreground">
              Welcome to the Future
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Experience social like never before. Share stories, create connections, and discover amazing content in our vibrant community.
            </p>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-1000">
            <Button
              onClick={() => setIsSignUpModalOpen(true)}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 neon-glow"
            >
              Get Started
            </Button>
            
            <Button
              onClick={() => setIsSignInModalOpen(true)}
              variant="outline"
              className="w-full h-12 font-semibold text-lg border-2 border-purple-500/50 hover:bg-purple-500/10 hover:border-purple-400/70 transition-all duration-300 active:scale-95 cyber-glow"
            >
              Sign In
            </Button>
          </div>

          {/* Enhanced Footer */}
          <div className="text-center space-y-3 animate-in slide-in-from-bottom-4 duration-700 delay-1200">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our{' '}
              <button 
                onClick={() => setAuthState('terms')}
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button 
                onClick={() => setAuthState('privacy')}
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
              >
                Privacy Policy
              </button>
            </p>
            
            {/* Feature highlights */}
            <div className="flex justify-center space-x-6 pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                End-to-End Encryption
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Real-time Chat
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modals */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSignUp={handleSignUp}
        onSwitchToSignIn={handleSwitchToSignIn}
        onOpenTerms={() => setAuthState('terms')}
        onOpenPrivacy={() => setAuthState('privacy')}
      />

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSignIn={handleSignIn}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
    </div>
  );
}