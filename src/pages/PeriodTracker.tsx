import { useState } from 'react';
import { Calendar, Heart, User, Share2, AlertCircle, Droplet, Moon, Sun } from 'lucide-react';

const PeriodTracker = () => {
  const [currentCycle, setCurrentCycle] = useState({
    lastPeriod: new Date(2024, 6, 1),
    cycleLength: 28,
    periodLength: 5,
    nextPeriod: new Date(2024, 6, 29),
  });

  const [mood, setMood] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [partnerConnected, setPartnerConnected] = useState(false);

  const moodOptions = [
    { emoji: '😊', value: 'happy', color: 'mood-happy' },
    { emoji: '😌', value: 'calm', color: 'mood-calm' },
    { emoji: '😰', value: 'anxious', color: 'mood-anxious' },
    { emoji: '😢', value: 'sad', color: 'mood-sad' },
    { emoji: '⚡', value: 'energetic', color: 'mood-energetic' },
  ];

  const symptomsList = [
    'Cramps', 'Headache', 'Bloating', 'Mood swings', 'Fatigue', 'Tender breasts'
  ];

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const daysUntilPeriod = Math.ceil((currentCycle.nextPeriod.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="sakhi-heading">Period Tracker</h1>
        <p className="sakhi-caption text-muted-foreground">माहवारी ट्रैकर</p>
        <p className="sakhi-body mt-2">Track your cycle and connect with your partner</p>
      </div>

      {/* Next Period Card */}
      <div className="sakhi-card bg-gradient-to-r from-sakhi-coral/20 to-sakhi-peach/20 border border-primary/20">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/20">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="sakhi-subheading text-primary">Next Period</h3>
            <p className="sakhi-body">
              {daysUntilPeriod > 0 ? `In ${daysUntilPeriod} days` : 'Today'}
            </p>
            <p className="sakhi-caption text-muted-foreground">
              {currentCycle.nextPeriod.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-4xl">🌸</div>
        </div>
      </div>

      {/* Partner Connection */}
      <div className="sakhi-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-primary" />
            <div>
              <h3 className="sakhi-subheading">Partner Connection</h3>
              <p className="sakhi-caption text-muted-foreground">साझेदार कनेक्शन</p>
            </div>
          </div>
          {!partnerConnected && (
            <button 
              onClick={() => setPartnerConnected(true)}
              className="sakhi-button-primary flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Connect
            </button>
          )}
        </div>
        
        {partnerConnected ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-2xl">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="sakhi-body font-medium text-green-800">Connected with Rahul</p>
                <p className="sakhi-caption text-green-600">Your partner can see your mood and cycle</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-sakhi-sage/20 rounded-xl text-center">
                <p className="sakhi-caption text-muted-foreground">Mood Shared</p>
                <p className="text-xl">{mood ? moodOptions.find(m => m.value === mood)?.emoji : '😊'}</p>
              </div>
              <div className="p-3 bg-sakhi-lavender/20 rounded-xl text-center">
                <p className="sakhi-caption text-muted-foreground">Cycle Info</p>
                <p className="sakhi-body font-medium">Day {Math.ceil((new Date().getTime() - currentCycle.lastPeriod.getTime()) / (1000 * 60 * 60 * 24))}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="sakhi-body text-muted-foreground">
              Connect with your partner to share your cycle information and mood updates
            </p>
            <p className="sakhi-caption text-muted-foreground mt-1">
              अपने साथी के साथ जुड़ें और अपनी जानकारी साझा करें
            </p>
          </div>
        )}
      </div>

      {/* Today's Mood */}
      <div className="sakhi-card">
        <h3 className="sakhi-subheading mb-4">How are you feeling today?</h3>
        <div className="grid grid-cols-5 gap-3">
          {moodOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setMood(option.value)}
              className={`p-4 rounded-2xl text-center transition-all ${
                mood === option.value 
                  ? `${option.color} scale-110 shadow-lg` 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <div className="text-3xl mb-2">{option.emoji}</div>
              <div className="sakhi-caption capitalize">{option.value}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Symptoms Tracking */}
      <div className="sakhi-card">
        <h3 className="sakhi-subheading mb-4">Track Symptoms</h3>
        <div className="grid grid-cols-2 gap-3">
          {symptomsList.map((symptom) => (
            <button
              key={symptom}
              onClick={() => toggleSymptom(symptom)}
              className={`p-3 rounded-xl text-left transition-all ${
                symptoms.includes(symptom)
                  ? 'bg-primary/20 border-2 border-primary text-primary'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  symptoms.includes(symptom) ? 'bg-primary' : 'bg-muted-foreground'
                }`} />
                <span className="sakhi-body">{symptom}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Support */}
      <div className="sakhi-card bg-gradient-to-r from-destructive/10 to-sakhi-sunset/10 border border-destructive/20">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-destructive" />
          <div className="flex-1">
            <h3 className="sakhi-subheading text-destructive">Need Support?</h3>
            <p className="sakhi-body">
              Feeling overwhelmed? Chat with Sakhi AI or connect with emergency help
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="sakhi-button-primary text-sm px-4 py-2">
              Chat with Sakhi
            </button>
          </div>
        </div>
      </div>

      {/* Cycle Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="sakhi-card text-center">
          <Droplet className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-xl font-bold text-primary">{currentCycle.cycleLength}</div>
          <div className="sakhi-caption text-muted-foreground">Average Cycle</div>
        </div>
        <div className="sakhi-card text-center">
          <Moon className="w-8 h-8 text-sakhi-lavender mx-auto mb-2" />
          <div className="text-xl font-bold text-sakhi-lavender">{currentCycle.periodLength}</div>
          <div className="sakhi-caption text-muted-foreground">Period Length</div>
        </div>
      </div>
    </div>
  );
};

export default PeriodTracker;