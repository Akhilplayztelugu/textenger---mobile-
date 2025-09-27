import React from 'react';
import { cn } from './ui/utils';

interface TypingIndicatorProps {
  className?: string;
  userName?: string;
  size?: 'small' | 'medium' | 'large';
}

export function TypingIndicator({ 
  className,
  userName,
  size = 'medium'
}: TypingIndicatorProps) {
  const sizeClasses = {
    small: 'px-3 py-2',
    medium: 'px-4 py-3',
    large: 'px-5 py-4'
  };

  const dotSizeClasses = {
    small: 'w-1.5 h-1.5',
    medium: 'w-2 h-2',
    large: 'w-2.5 h-2.5'
  };

  return (
    <div className={cn("flex items-center gap-2 mb-4", className)}>
      <div className={cn(
        "bg-card/80 border border-border/60 text-foreground rounded-2xl rounded-bl-md shadow-sm backdrop-blur-sm",
        "flex items-center justify-center",
        sizeClasses[size]
      )}>
        <div className="flex items-center gap-1">
          <div 
            className={cn(
              "bg-muted-foreground rounded-full animate-bounce",
              dotSizeClasses[size]
            )}
            style={{ animationDelay: '0ms', animationDuration: '1.4s' }}
          />
          <div 
            className={cn(
              "bg-muted-foreground rounded-full animate-bounce",
              dotSizeClasses[size]
            )}
            style={{ animationDelay: '160ms', animationDuration: '1.4s' }}
          />
          <div 
            className={cn(
              "bg-muted-foreground rounded-full animate-bounce",
              dotSizeClasses[size]
            )}
            style={{ animationDelay: '320ms', animationDuration: '1.4s' }}
          />
        </div>
      </div>
      {userName && (
        <span className="text-xs text-muted-foreground">
          {userName} is typing...
        </span>
      )}
    </div>
  );
}