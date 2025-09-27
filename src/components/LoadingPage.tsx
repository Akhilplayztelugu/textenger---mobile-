import React from 'react';

export function LoadingPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
      <div className="text-center space-y-8">
        {/* Logo with enhanced animation */}
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-2xl ring-4 ring-purple-400/20 animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent animate-in fade-in duration-1000">
            Textenger
          </h1>
          <p className="text-muted-foreground">Connect • Share • Chat</p>
        </div>
        
        {/* Enhanced Loading Animation */}
        <div className="flex items-center justify-center">
          <div className="relative">
            {/* Main spinner */}
            <div className="w-16 h-16 border-4 border-purple-200/20 border-t-purple-500 rounded-full animate-spin"></div>
            
            {/* Inner spinner */}
            <div className="absolute inset-2 w-12 h-12 border-4 border-transparent border-r-violet-500 rounded-full animate-spin" style={{ animationDelay: '0.15s', animationDirection: 'reverse' }}></div>
            
            {/* Center pulse */}
            <div className="absolute inset-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full animate-pulse"></div>
            
            {/* Outer glow ring */}
            <div className="absolute -inset-2 w-20 h-20 border border-purple-500/30 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
          </div>
        </div>
        
        {/* Loading text with typing animation */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground animate-pulse">
            Preparing your experience...
          </p>
          <div className="flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}