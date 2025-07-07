import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Play, Pause, Volume2, Download, CheckCircle, ArrowLeft, Heart } from 'lucide-react';

const LearningContent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const contentType = searchParams.get('type') || 'video';
  const title = searchParams.get('title') || 'Learning Content';
  const titleHindi = searchParams.get('titleHindi') || 'शिक्षा सामग्री';

  const learningContent = {
    video: {
      title: 'Gentle Pregnancy Yoga',
      titleHindi: 'सौम्य गर्भावस्था योग',
      duration: '15:00',
      description: 'Safe and gentle yoga poses specifically designed for expecting mothers',
      steps: [
        'Find a comfortable, quiet space with a yoga mat',
        'Start with deep breathing exercises (2 minutes)',
        'Gentle neck and shoulder rolls',
        'Cat-cow stretches for back relief',
        'Modified child\'s pose',
        'Gentle hip circles while seated',
        'Final relaxation in side-lying position'
      ]
    },
    audio: {
      title: 'Morning Meditation',
      titleHindi: 'सुबह की ध्यान साधना',
      duration: '5:00',
      description: 'Start your day with peace and positive energy',
      steps: [
        'Sit comfortably with your back straight',
        'Close your eyes and take three deep breaths',
        'Focus on your natural breathing rhythm',
        'If thoughts arise, gently return to your breath',
        'Feel gratitude for your body and baby',
        'End with positive affirmations'
      ]
    },
    article: {
      title: 'Iron-Rich Foods Guide',
      titleHindi: 'आयरन युक्त खाद्य गाइड',
      duration: '6:00',
      description: 'Essential iron-rich foods to prevent anemia during pregnancy',
      steps: [
        'Green leafy vegetables: Spinach, fenugreek leaves',
        'Lentils and beans: Masoor dal, rajma, chana',
        'Dry fruits: Dates, raisins, dried apricots',
        'Seeds and nuts: Pumpkin seeds, sesame seeds',
        'Jaggery and fortified cereals',
        'Combine with Vitamin C foods for better absorption'
      ]
    }
  };

  const content = learningContent[contentType as keyof typeof learningContent];

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setCompleted(true);
            return 100;
          }
          return prev + 2;
        });
      }, 300);
    }
  };

  const markComplete = () => {
    setCompleted(true);
    setProgress(100);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-muted"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="sakhi-heading">{content.title}</h1>
          <p className="sakhi-caption text-muted-foreground">{content.titleHindi}</p>
        </div>
      </div>

      {/* Media Player Card */}
      <div className="sakhi-card bg-gradient-to-r from-primary/10 to-sakhi-coral/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <button
              onClick={togglePlayback}
              className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-all"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </button>
            {completed && (
              <CheckCircle className="absolute -top-2 -right-2 w-6 h-6 text-green-500 bg-background rounded-full" />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="sakhi-subheading">{content.title}</h3>
            <p className="sakhi-body text-muted-foreground">{content.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="sakhi-caption">Duration: {content.duration}</span>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-destructive" />
                <span className="sakhi-caption">Trusted Content</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <button className="p-2 rounded-full bg-primary/20 text-primary">
              <Volume2 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-secondary text-secondary-foreground">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>{Math.floor((progress / 100) * parseInt(content.duration.split(':')[0]))}:{Math.floor(((progress / 100) * parseInt(content.duration.split(':')[1])) % 60).toString().padStart(2, '0')}</span>
          <span>{content.duration}</span>
        </div>
      </div>

      {/* Content Steps */}
      <div className="sakhi-card">
        <h3 className="sakhi-subheading mb-4">
          {contentType === 'article' ? 'Key Points' : 'What You\'ll Learn'}
        </h3>
        <div className="space-y-3">
          {content.steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-medium mt-1">
                {index + 1}
              </div>
              <p className="sakhi-body flex-1">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Interaction */}
      <div className="sakhi-card bg-gradient-to-r from-sakhi-sage/20 to-sakhi-lavender/20">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🎙️</div>
          <div className="flex-1">
            <h3 className="sakhi-subheading">Need Help?</h3>
            <p className="sakhi-body">Ask Sakhi AI about this content or any questions you have</p>
          </div>
          <button className="sakhi-button-primary voice-enabled">
            <Volume2 className="w-4 h-4 mr-2" />
            Ask Sakhi
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {!completed && (
          <button 
            onClick={markComplete}
            className="sakhi-button-secondary flex-1"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark Complete
          </button>
        )}
        <button className="sakhi-button-primary flex-1">
          {completed ? 'Review Again' : 'Save for Later'}
        </button>
      </div>

      {/* Completion Message */}
      {completed && (
        <div className="sakhi-card bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="sakhi-subheading text-green-800">Well Done!</h3>
              <p className="sakhi-body text-green-700">You've completed this learning session</p>
              <p className="sakhi-caption text-green-600">आपने यह सीखने का सत्र पूरा किया है</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningContent;