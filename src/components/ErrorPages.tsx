import React from 'react';
import { Button } from './ui/button';
import { WifiOff, RefreshCw } from 'lucide-react';

interface NoInternetPageProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

export function NoInternetPage({ onRetry, isRetrying = false }: NoInternetPageProps) {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-4" style={{ background: 'var(--background)' }}>
      <div className="max-w-sm w-full text-center space-y-8">
        {/* Illustration */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/20">
            <WifiOff className="w-16 h-16 text-red-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500/20 animate-pulse" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-orange-500/20 animate-pulse delay-300" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-foreground">
            No Internet Connection
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Looks like you're offline. Check your internet connection and try again.
          </p>
        </div>

        {/* Retry Button */}
        <Button
          onClick={onRetry}
          disabled={isRetrying}
          className="w-full h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 font-semibold transition-all duration-300 active:scale-95"
        >
          {isRetrying ? (
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Retrying...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </div>
          )}
        </Button>

        {/* Footer */}
        <p className="text-sm text-muted-foreground">
          Make sure you have a stable internet connection
        </p>
      </div>
    </div>
  );
}

interface EmailConfirmationPageProps {
  email: string;
  onContinueToSignIn: () => void;
  onResendEmail?: () => void;
}

export function EmailConfirmationPage({ email, onContinueToSignIn, onResendEmail }: EmailConfirmationPageProps) {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-4" style={{ background: 'var(--background)' }}>
      <div className="max-w-md w-full text-center space-y-8">
        {/* Success Illustration */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/20">
            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-foreground">
            Check Your Email
          </h1>
          <div className="space-y-2">
            <p className="text-muted-foreground leading-relaxed">
              We've sent a confirmation email to:
            </p>
            <p className="text-primary font-medium break-all">
              {email}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Please click the link in the email to verify your account and continue to Textenger.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onContinueToSignIn}
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 font-semibold transition-all duration-300 active:scale-95"
          >
            Continue to Sign In
          </Button>
          
          {onResendEmail && (
            <Button
              onClick={onResendEmail}
              variant="outline"
              className="w-full h-10 border-purple-500/50 hover:bg-purple-500/10 hover:border-purple-400/70 transition-all duration-300"
            >
              Resend Email
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Didn't receive the email? Check your spam folder.</p>
          <p>The link will expire in 24 hours.</p>
        </div>
      </div>
    </div>
  );
}