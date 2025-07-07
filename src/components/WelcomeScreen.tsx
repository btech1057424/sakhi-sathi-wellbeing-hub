import { useState } from 'react';
import { ChevronRight, Volume2, Globe } from 'lucide-react';
import welcomeIllustration from '@/assets/welcome-illustration.jpg';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');

  const languages = [
    { code: 'hindi', name: 'हिंदी', englishName: 'Hindi' },
    { code: 'english', name: 'English', englishName: 'English' },
    { code: 'bengali', name: 'বাংলা', englishName: 'Bengali' },
    { code: 'gujarati', name: 'ગુજરાતી', englishName: 'Gujarati' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sakhi-cream to-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-64 h-48 mb-8 rounded-3xl overflow-hidden shadow-lg">
          <img 
            src={welcomeIllustration} 
            alt="Peaceful pregnant woman in garden"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="sakhi-heading text-3xl mb-4 text-primary">
          SakhiSaathi
        </h1>
        
        <p className="sakhi-subheading text-center mb-2">
          Your voice, your care, your companion
        </p>
        
        <p className="sakhi-body text-center mb-8 text-muted-foreground max-w-sm">
          आपकी आवाज़, आपकी देखभाल, आपका साथी
        </p>

        {/* Language Selection */}
        <div className="w-full max-w-sm mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <span className="sakhi-body font-medium">Choose Language</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`p-4 rounded-2xl border-2 transition-all touch-friendly ${
                  selectedLanguage === lang.code
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card text-foreground hover:border-primary/50'
                }`}
              >
                <div className="text-lg font-medium">{lang.name}</div>
                <div className="text-sm opacity-75">{lang.englishName}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Voice Support Indicator */}
        <div className="flex items-center gap-2 mb-8 px-4 py-3 bg-sakhi-sage/20 rounded-full">
          <Volume2 className="w-5 h-5 text-sakhi-sage" />
          <span className="sakhi-caption text-sakhi-sage font-medium">
            Voice support available
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-6">
        <button
          onClick={onComplete}
          className="sakhi-button-primary w-full flex items-center justify-center gap-2 text-lg"
        >
          <span>Start Journey</span>
          <span>यात्रा शुरू करें</span>
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
        
        <p className="sakhi-caption text-center mt-4">
          Safe, private, and designed with love for you
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;