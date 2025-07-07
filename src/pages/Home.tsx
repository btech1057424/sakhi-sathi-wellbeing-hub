import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Heart, Smile, Cloud, Sun, Zap, Wifi, WifiOff, Volume2, Globe } from 'lucide-react';
import wellnessHands from '@/assets/wellness-hands.jpg';

const Home = () => {
  const [currentMood, setCurrentMood] = useState<string>('');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('hindi');

  const languages = [
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇬🇧' },
    { code: 'bengali', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'gujarati', name: 'ગુજરાતી', flag: '🇮🇳' },
  ];

  const moodOptions = [
    { 
      id: 'happy', 
      emoji: '😊', 
      label: 'Happy', 
      labelHindi: 'खुश',
      icon: Smile,
      color: 'mood-happy',
      bgColor: '#FFF9C4',
      message: "We're so glad you're feeling good today. Keep smiling, Sakhi!"
    },
    { 
      id: 'calm', 
      emoji: '😌', 
      label: 'Calm', 
      labelHindi: 'शांत',
      icon: Cloud,
      color: 'mood-calm',
      bgColor: '#B3E5FC',
      message: "Peace of mind is a gift. Breathe, rest, and stay centered."
    },
    { 
      id: 'anxious', 
      emoji: '�', 
      label: 'Anxious', 
      labelHindi: 'चिंतित',
      icon: Sun,
      color: 'mood-anxious',
      bgColor: '#FFE0B2',
      message: "It's okay to feel uneasy. We're here to walk with you."
    },
    { 
      id: 'sad', 
      emoji: '😢', 
      label: 'Sad', 
      labelHindi: 'उदास',
      icon: Cloud,
      color: 'mood-sad',
      bgColor: '#E1BEE7',
      message: "You're not alone. Reach out or take a moment to care for yourself."
    },
    { 
      id: 'frustrated', 
      emoji: '😠', 
      label: 'Frustrated', 
      labelHindi: 'नाराज़',
      icon: Zap,
      color: 'mood-frustrated',
      bgColor: '#FF8A80',
      message: "Let it out gently. Every emotion matters — even the tough ones."
    },
    { 
      id: 'tired', 
      emoji: '😴', 
      label: 'Tired', 
      labelHindi: 'थका हुआ',
      icon: Cloud,
      color: 'mood-tired',
      bgColor: '#CFD8DC',
      message: "Rest is strength. Your body and mind deserve a break."
    },
  ];

  const quickActions = [
    { 
      title: 'Chat with Sakhi', 
      titleHindi: 'सखी से बात करें',
      subtitle: 'Ask anything about your wellness',
      icon: '💬',
      path: '/chat',
      offline: true
    },
    { 
      title: 'Today\'s Learning', 
      titleHindi: 'आज की शिक्षा',
      subtitle: 'Breathing exercises & nutrition tips',
      icon: '📚',
      path: '/learn',
      offline: true
    },
    { 
      title: 'My Reminders', 
      titleHindi: 'मेरी याददाश्त',
      subtitle: '2 upcoming reminders',
      icon: '🔔',
      path: '/reminders',
      offline: false
    },
  ];

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header with offline toggle and language selector */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="sakhi-heading">
            Namaste! 🙏
          </h1>
          <p className="sakhi-caption">
            {getCurrentDate()}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
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
          
          {/* Offline Toggle */}
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
              isOfflineMode 
                ? 'bg-sakhi-sage/20 text-sakhi-sage' 
                : 'bg-primary/20 text-primary'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {isOfflineMode ? 'Offline' : 'Online'}
            </span>
          </button>
        </div>
      </div>

      {/* Wellness Check-in */}
      <div className="sakhi-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden">
            <img 
              src={wellnessHands} 
              alt="Wellness meditation"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="sakhi-subheading">How are you feeling?</h2>
            <p className="sakhi-caption">आप कैसा महसूस कर रही हैं?</p>
          </div>
          <button className="voice-enabled p-3 rounded-full bg-primary/10 text-primary">
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Mood Selector */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {moodOptions.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setCurrentMood(mood.id)}
              className={`flex flex-col items-center p-3 rounded-2xl transition-all touch-friendly hover:scale-105 border-2 ${
                currentMood === mood.id
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-transparent bg-muted hover:bg-muted/80'
              }`}
              style={{
                backgroundColor: currentMood === mood.id ? mood.bgColor : undefined
              }}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs font-medium text-center leading-tight">
                {mood.label}
              </span>
              <span className="text-xs opacity-75 leading-tight">
                {mood.labelHindi}
              </span>
            </button>
          ))}
        </div>

        {currentMood && (
          <div className="mt-4 p-4 rounded-xl border-2 border-primary/20" 
               style={{ backgroundColor: moodOptions.find(m => m.id === currentMood)?.bgColor }}>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">Message for you:</span>
            </div>
            <p className="sakhi-body text-foreground">
              {moodOptions.find(m => m.id === currentMood)?.message}
            </p>
          </div>
        )}
      </div>

      {/* Connect with Partner Section */}
      <div className="sakhi-card bg-gradient-to-r from-sakhi-coral/10 to-sakhi-peach/10 border border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-3xl">👫</div>
          <div className="flex-1">
            <h3 className="sakhi-subheading text-primary">Connect with Partner</h3>
            <p className="sakhi-caption text-muted-foreground">अपने साथी के साथ जुड़ें</p>
            <p className="sakhi-body">Share your mood and get support from your partner</p>
          </div>
          <button className="sakhi-button-primary px-4 py-2 rounded-full">
            Share
          </button>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
          <div className="text-2xl">💕</div>
          <div className="flex-1">
            <p className="sakhi-caption text-muted-foreground">Last shared mood</p>
            <p className="sakhi-body font-medium">
              {currentMood ? moodOptions.find(m => m.id === currentMood)?.label : 'Not shared yet'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="sakhi-subheading">Quick Actions</h3>
        
        {quickActions.map((action, index) => (
          <Link 
            key={index}
            to={action.path}
            className={`sakhi-card flex items-center gap-4 cursor-pointer hover:bg-card/80 transition-all ${
              action.offline ? 'offline-available' : ''
            }`}
          >
            <div className="text-3xl">{action.icon}</div>
            <div className="flex-1">
              <h4 className="sakhi-body font-medium">{action.title}</h4>
              <p className="sakhi-caption text-muted-foreground">{action.titleHindi}</p>
              <p className="sakhi-caption">{action.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              {action.offline && (
                <div className="w-2 h-2 bg-green-500 rounded-full" title="Available offline" />
              )}
              <button className="voice-enabled p-2 rounded-full bg-primary/10 text-primary">
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Period Tracker Card */}
      <div className="sakhi-card bg-gradient-to-r from-sakhi-coral/20 to-sakhi-peach/20 border border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-full bg-primary/20">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="sakhi-subheading text-primary">Period Tracker</h3>
            <p className="sakhi-caption text-muted-foreground">माहवारी ट्रैकर</p>
            <p className="sakhi-body">Track your cycle and connect with partner</p>
          </div>
          <Link to="/period-tracker" className="sakhi-button-primary px-4 py-2">
            Track Now
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-sakhi-sage/20 rounded-xl text-center">
            <div className="text-2xl mb-1">🌸</div>
            <p className="sakhi-caption text-muted-foreground">Cycle Day</p>
            <p className="sakhi-body font-medium">14</p>
          </div>
          <div className="p-3 bg-sakhi-lavender/20 rounded-xl text-center">
            <div className="text-2xl mb-1">💕</div>
            <p className="sakhi-caption text-muted-foreground">Next Period</p>
            <p className="sakhi-body font-medium">14 days</p>
          </div>
        </div>
      </div>

      {/* Today's Wellness Tip */}
      <div className="sakhi-card bg-gradient-to-r from-sakhi-peach/20 to-sakhi-coral/20">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div className="flex-1">
            <h3 className="sakhi-subheading mb-2">Today's Wellness Tip</h3>
            <p className="sakhi-body">
              Take 5 deep breaths whenever you feel overwhelmed. 
              Remember: You and your baby are both precious.
            </p>
            <p className="sakhi-caption text-muted-foreground mt-2">
              जब भी आप परेशान महसूस करें तो 5 गहरी सांसें लें।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;