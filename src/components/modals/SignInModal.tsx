import React, { useState } from 'react';
import { 
  ImprovedDialog as Dialog, 
  ImprovedDialogContent as DialogContent, 
  ImprovedDialogHeader as DialogHeader, 
  ImprovedDialogTitle as DialogTitle,
  ImprovedDialogBody as DialogBody 
} from '../ui/improved-dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (userData: {
    username: string;
    displayName: string;
    email: string;
    password: string;
  }) => void;
  onSwitchToSignUp?: () => void;
}

export function SignInModal({ isOpen, onClose, onSignIn, onSwitchToSignUp }: SignInModalProps) {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    // Clear global error when user makes changes
    if (globalError) {
      setGlobalError('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Email or Username validation
    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or username is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Add shake animation to form
      const form = e.currentTarget;
      form.classList.add('animate-shake');
      setTimeout(() => form.classList.remove('animate-shake'), 500);
      return;
    }

    setIsLoading(true);
    setGlobalError('');
    setErrors({});
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Check if user exists in localStorage (mock authentication)
        const storedUser = localStorage.getItem('textenger_user');
        
        if (storedUser) {
          const user = JSON.parse(storedUser);
          
          // Check if credentials match
          const isEmailMatch = user.email.toLowerCase() === formData.emailOrUsername.toLowerCase();
          const isUsernameMatch = user.username.toLowerCase() === formData.emailOrUsername.toLowerCase();
          const isPasswordMatch = user.password === formData.password;
          
          if ((isEmailMatch || isUsernameMatch) && isPasswordMatch) {
            onSignIn(user);
            onClose();
            setFormData({ emailOrUsername: '', password: '' });
            setErrors({});
            setGlobalError('');
          } else {
            setGlobalError('Invalid email or password');
            // Add shake animation to password field
            const passwordInput = document.getElementById('password');
            passwordInput?.classList.add('animate-shake');
            setTimeout(() => passwordInput?.classList.remove('animate-shake'), 500);
          }
        } else {
          setGlobalError('No account found. Please sign up first.');
        }
        
        setIsLoading(false);
      } catch (error) {
        setGlobalError('Something went wrong. Please try again.');
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setFormData({ emailOrUsername: '', password: '' });
    setErrors({});
    setGlobalError('');
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent size="default">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Welcome back to <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Textenger</span>
          </DialogTitle>
        </DialogHeader>
        
        <DialogBody>
          {/* Global Error Alert */}
          {globalError && (
            <Alert className="border-red-500 bg-red-500/10 animate-in slide-in-from-top-2 duration-300 mb-4">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-500">
                {globalError}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email or Username */}
          <div className="space-y-2">
            <Label htmlFor="emailOrUsername">Email or Username</Label>
            <Input
              id="emailOrUsername"
              type="text"
              placeholder="Enter your email or username"
              value={formData.emailOrUsername}
              onChange={(e) => handleInputChange('emailOrUsername', e.target.value)}
              className={`transition-colors ${errors.emailOrUsername ? 'border-red-500 focus:border-red-500' : ''}`}
              autoComplete="username"
            />
            {errors.emailOrUsername && (
              <p className="text-sm text-red-500">{errors.emailOrUsername}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`pr-10 transition-colors ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
              onClick={() => {
                // Mock forgot password
                console.log('Forgot password clicked');
              }}
            >
              Forgot password?
            </button>
          </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 font-semibold transition-all duration-300 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6 pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  handleClose();
                  onSwitchToSignUp?.();
                }}
                className="text-primary hover:underline font-medium"
              >
                Sign up here
              </button>
            </p>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}