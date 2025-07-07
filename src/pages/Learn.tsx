import { useState } from 'react';
import { Play, Download, Volume2, CheckCircle, Clock, Heart } from 'lucide-react';

const Learn = () => {
  const [activeCategory, setActiveCategory] = useState('wellness');

  const categories = [
    { id: 'wellness', name: 'Wellness', hindi: 'कल्याण', icon: '🧘', color: 'bg-sakhi-sage/20' },
    { id: 'nutrition', name: 'Nutrition', hindi: 'पोषण', icon: '🥗', color: 'bg-sakhi-peach/20' },
    { id: 'hygiene', name: 'Hygiene', hindi: 'स्वच्छता', icon: '🧼', color: 'bg-sakhi-coral/20' },
    { id: 'breathing', name: 'Breathing', hindi: 'सांस लेना', icon: '🫁', color: 'bg-sakhi-lavender/20' },
  ];

  const learningContent = {
    wellness: [
      {
        title: 'Morning Meditation',
        titleHindi: 'सुबह की ध्यान साधना',
        duration: '5 min',
        description: 'Start your day with peace and positivity',
        offline: true,
        completed: false,
        type: 'audio'
      },
      {
        title: 'Gentle Pregnancy Yoga',
        titleHindi: 'सौम्य गर्भावस्था योग',
        duration: '15 min',
        description: 'Safe yoga poses for expecting mothers',
        offline: true,
        completed: true,
        type: 'video'
      },
      {
        title: 'Stress Relief Techniques',
        titleHindi: 'तनाव मुक्ति तकनीक',
        duration: '8 min',
        description: 'Simple ways to manage daily stress',
        offline: false,
        completed: false,
        type: 'article'
      }
    ],
    nutrition: [
      {
        title: 'Iron-Rich Foods Guide',
        titleHindi: 'आयरन युक्त खाद्य गाइड',
        duration: '6 min',
        description: 'Prevent anemia with the right foods',
        offline: true,
        completed: false,
        type: 'article'
      },
      {
        title: 'Healthy Meal Planning',
        titleHindi: 'स्वस्थ भोजन नियोजन',
        duration: '12 min',
        description: 'Weekly meal prep for busy mothers',
        offline: true,
        completed: false,
        type: 'video'
      }
    ],
    hygiene: [
      {
        title: 'Hand Washing Demonstration',
        titleHindi: 'हाथ धोने का प्रदर्शन',
        duration: '3 min',
        description: 'Proper handwashing to prevent infections',
        offline: true,
        completed: true,
        type: 'video'
      },
      {
        title: 'Clean Water Storage',
        titleHindi: 'स्वच्छ पानी का भंडारण',
        duration: '5 min',
        description: 'Safe water storage practices',
        offline: true,
        completed: false,
        type: 'article'
      }
    ],
    breathing: [
      {
        title: 'Deep Breathing Exercise',
        titleHindi: 'गहरी सांस की कसरत',
        duration: '4 min',
        description: 'Calm your mind and body',
        offline: true,
        completed: false,
        type: 'audio'
      },
      {
        title: 'Breathing for Labor',
        titleHindi: 'प्रसव के लिए सांस',
        duration: '10 min',
        description: 'Breathing techniques for childbirth',
        offline: true,
        completed: false,
        type: 'video'
      }
    ]
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '📹';
      case 'audio': return '🎵';
      case 'article': return '📝';
      default: return '📚';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="sakhi-heading">Learning Center</h1>
        <p className="sakhi-caption text-muted-foreground">सीखने का केंद्र</p>
        <p className="sakhi-body mt-2">Knowledge that empowers you and your baby</p>
      </div>

      {/* Category Pills */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl transition-all ${
              activeCategory === category.id
                ? `${category.color} border-2 border-primary scale-105`
                : 'bg-card border border-border hover:bg-card/80'
            }`}
          >
            <span className="text-xl">{category.icon}</span>
            <div className="text-left">
              <div className="sakhi-body font-medium">{category.name}</div>
              <div className="sakhi-caption text-muted-foreground">{category.hindi}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Content Cards */}
      <div className="space-y-4">
        {learningContent[activeCategory as keyof typeof learningContent]?.map((item, index) => (
          <div key={index} className="sakhi-card hover:bg-card/80 transition-all">
            <div className="flex items-start gap-4">
              {/* Type Icon */}
              <div className="text-2xl mt-1">{getTypeIcon(item.type)}</div>
              
              {/* Content Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="sakhi-subheading">{item.title}</h3>
                    <p className="sakhi-caption text-muted-foreground">{item.titleHindi}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.offline && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" title="Available offline" />
                    )}
                    {item.completed && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
                
                <p className="sakhi-body mb-3">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="sakhi-caption">{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span className="sakhi-caption">Trusted</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="voice-enabled p-2 rounded-full bg-primary/10 text-primary">
                      <Volume2 className="w-4 h-4" />
                    </button>
                    
                    {!item.offline && (
                      <button className="p-2 rounded-full bg-secondary text-secondary-foreground">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    
                    <button className={`sakhi-button-primary px-2  flex items-center ${
                      item.completed ? 'opacity-75' : ''
                    }`} onClick={() => {
                      const params = new URLSearchParams({
                        type: item.type,
                        title: item.title,
                        titleHindi: item.titleHindi
                      });
                      window.location.href = `/learning-content?${params.toString()}`;
                    }}>
                      <Play className="w-4 h-4 mr-2" />
                      {item.completed ? 'Review' : 'Start'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="sakhi-card bg-gradient-to-r from-primary/10 to-sakhi-coral/10">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🎯</div>
          <div className="flex-1">
            <h3 className="sakhi-subheading">Your Progress</h3>
            <p className="sakhi-body">You've completed 2 out of 8 lessons this week!</p>
            <p className="sakhi-caption text-muted-foreground">आपने इस सप्ताह 8 में से 2 पाठ पूरे किए हैं!</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">25%</div>
            <div className="sakhi-caption text-muted-foreground">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;