import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Heart, Shield, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import welcomeIllustration from '@/assets/welcome-illustration.jpg';

const Join = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formType, setFormType] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('hindi');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const languages = [
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇬🇧' },
    { code: 'bengali', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'gujarati', name: 'ગુજરાતી', flag: '🇮🇳' },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Prepare form data for API
      const purposeData = {
        formType,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        language: currentLanguage,
        timestamp: new Date().toISOString(),
        ...(formType === 'signup' && { 
          agreeToTerms: formData.agreeToTerms,
          confirmPassword: formData.confirmPassword
        })
      };

      // Send data to backend
      const response = await fetch(
        `https://hono-cloudflare-d1-backend.shraj.workers.dev/collect-email?email=${encodeURIComponent(formData.email)}&purpose=${encodeURIComponent(JSON.stringify(purposeData))}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        // Success - show success message and navigate
        toast({
          title: formType === 'login' ? 'Welcome back!' : 'Account created successfully!',
          description: formType === 'login' ? 'You have been logged in successfully.' : 'Your account has been created and you are now logged in.',
        });
        navigate('/home');
      } else {
        // Handle error
        console.error('API call failed:', response.statusText);
        toast({
          title: 'Something went wrong',
          description: 'Please try again later. You will be redirected to continue.',
          variant: 'destructive',
        });
        // Still navigate to home for now (in production, might want to stay on form)
        setTimeout(() => navigate('/home'), 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Connection error',
        description: 'Unable to connect to server. You will be redirected to continue.',
        variant: 'destructive',
      });
      // Still navigate to home for now (in production, might want to stay on form)
      setTimeout(() => navigate('/home'), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    if (formType === 'login') {
      return formData.email && formData.password;
    } else {
      return formData.name && formData.email && formData.phone && 
             formData.password && formData.confirmPassword && 
             formData.password === formData.confirmPassword && 
             formData.agreeToTerms;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sakhi-cream to-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <ArrowRight className="w-5 h-5 rotate-180" />
          <span className="text-sm font-medium">Back</span>
        </Link>
        
        {/* Language Selector */}
        <div className="relative">
          <select
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value)}
            className="flex items-center gap-2 px-3 py-2 rounded-full transition-all bg-card border border-border text-sm font-medium cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-32 h-24 mb-6 rounded-2xl overflow-hidden shadow-lg mx-auto">
            <img 
              src={welcomeIllustration} 
              alt="SakhiSaathi Logo"
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="sakhi-heading text-2xl mb-2 text-primary">
            Welcome to SakhiSaathi
          </h1>
          <p className="sakhi-caption text-muted-foreground">
            {formType === 'login' ? 'Sign in to continue your wellness journey' : 'Create your account to get started'}
          </p>
          <p className="sakhi-caption text-muted-foreground mt-1">
            {formType === 'login' ? 'अपनी स्वास्थ्य यात्रा जारी रखने के लिए साइन इन करें' : 'शुरुआत करने के लिए अपना खाता बनाएं'}
          </p>
        </div>

        {/* Form Toggle */}
        <div className="flex bg-muted p-1 rounded-xl mb-6 w-full">
          <button
            onClick={() => setFormType('login')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              formType === 'login'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setFormType('signup')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              formType === 'signup'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {formType === 'signup' && (
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Full Name / पूरा नाम
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Email Address / ईमेल पता
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          {formType === 'signup' && (
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Phone Number / फ़ोन नंबर
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Password / पासवर्ड
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {formType === 'signup' && (
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Confirm Password / पासवर्ड की पुष्टि करें
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
              )}
            </div>
          )}

          {formType === 'signup' && (
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                className="mt-1"
                required
              />
              <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                <br />
                <span className="text-xs">
                  मैं सेवा की शर्तों और गोपनीयता नीति से सहमत हूं
                </span>
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid() || isLoading}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              isFormValid() && !isLoading
                ? 'bg-primary text-white hover:bg-primary/90 hover:scale-105'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Please wait...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>{formType === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </button>

          {formType === 'login' && (
            <div className="text-center">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot your password? / पासवर्ड भूल गए?
              </Link>
            </div>
          )}
        </form>

        {/* Social Login */}
        <div className="w-full mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 border border-border rounded-xl hover:bg-muted/50 transition-colors">
              <span className="text-lg">📱</span>
              <span className="text-sm font-medium">Phone</span>
            </button>
            <button 
              onClick={() => navigate('/home')}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-border rounded-xl hover:bg-muted/50 transition-colors"
            >
              <span className="text-lg">🎭</span>
              <span className="text-sm font-medium">Guest</span>
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 w-full">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-green-100 rounded-full mb-2">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs text-muted-foreground">Secure</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-2 bg-blue-100 rounded-full mb-2">
                <Heart className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs text-muted-foreground">Trusted</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-2 bg-purple-100 rounded-full mb-2">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs text-muted-foreground">Global</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            By joining SakhiSaathi, you're taking the first step towards better maternal health.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            सखीसाथी में शामिल होकर, आप बेहतर मातृ स्वास्थ्य की दिशा में पहला कदम उठा रहे हैं।
          </p>
        </div>
      </div>
    </div>
  );
};

export default Join;
