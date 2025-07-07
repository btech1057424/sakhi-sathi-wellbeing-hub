import { Phone, MessageCircle, MapPin, Volume2, Heart, Shield, Users, BookOpen } from 'lucide-react';

const Help = () => {
  const emergencyContacts = [
    {
      name: 'ASHA Worker',
      nameHindi: 'आशा कार्यकर्ता',
      phone: '+91 98765 43210',
      description: 'Your local health worker',
      available: '24/7',
      priority: 'high'
    },
    {
      name: 'ANM (Nurse)',
      nameHindi: 'ए.एन.एम. (नर्स)',
      phone: '+91 98765 43211',
      description: 'Auxiliary Nurse Midwife',
      available: '8 AM - 8 PM',
      priority: 'high'
    },
    {
      name: 'District Hospital',
      nameHindi: 'जिला अस्पताल',
      phone: '108',
      description: 'Emergency medical services',
      available: '24/7',
      priority: 'emergency'
    },
    {
      name: 'Women Helpline',
      nameHindi: 'महिला हेल्पलाइन',
      phone: '181',
      description: 'Support for women in distress',
      available: '24/7',
      priority: 'medium'
    }
  ];

  const helpCategories = [
    {
      title: 'Health Concerns',
      titleHindi: 'स्वास्थ्य संबंधी चिंताएं',
      icon: <Heart className="w-6 h-6" />,
      description: 'Medical questions and symptoms',
      topics: ['Pregnancy symptoms', 'Pain management', 'Nutrition concerns', 'Exercise safety']
    },
    {
      title: 'Mental Wellness',
      titleHindi: 'मानसिक स्वास्थ्य',
      icon: <Shield className="w-6 h-6" />,
      description: 'Emotional support and mental health',
      topics: ['Anxiety management', 'Depression support', 'Stress relief', 'Sleep issues']
    },
    {
      title: 'App Support',
      titleHindi: 'ऐप सहायता',
      icon: <MessageCircle className="w-6 h-6" />,
      description: 'How to use SakhiSaathi app',
      topics: ['Voice features', 'Offline mode', 'Reminders setup', 'Language settings']
    },
    {
      title: 'Community',
      titleHindi: 'समुदाय',
      icon: <Users className="w-6 h-6" />,
      description: 'Connect with other mothers',
      topics: ['Support groups', 'Local meetups', 'Share experiences', 'Ask questions']
    }
  ];

  const quickHelp = [
    {
      question: 'How do I track my mood?',
      questionHindi: 'मैं अपना मूड कैसे ट्रैक करूं?',
      answer: 'Go to Home screen and tap on the emoji that matches your current feeling.',
      category: 'app'
    },
    {
      question: 'What if I miss taking my medicine?',
      questionHindi: 'अगर मैं दवा लेना भूल जाऊं तो क्या करूं?',
      answer: 'Take it as soon as you remember, unless it\'s almost time for the next dose.',
      category: 'health'
    },
    {
      question: 'Can I use the app without internet?',
      questionHindi: 'क्या मैं इंटरनेट के बिना ऐप का उपयोग कर सकती हूं?',
      answer: 'Yes! Most features work offline. Look for the green dot indicator.',
      category: 'app'
    },
    {
      question: 'When should I call for emergency help?',
      questionHindi: 'मुझे आपातकालीन सहायता कब बुलानी चाहिए?',
      answer: 'Severe pain, heavy bleeding, difficulty breathing, or severe headaches.',
      category: 'emergency'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health': return '🏥';
      case 'app': return '📱';
      case 'emergency': return '🚨';
      default: return '❓';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency': return 'border-destructive bg-destructive/10';
      case 'high': return 'border-primary bg-primary/10';
      case 'medium': return 'border-sakhi-sage bg-sakhi-sage/10';
      default: return 'border-border bg-card';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="sakhi-heading">Help & Support</h1>
        <p className="sakhi-caption text-muted-foreground">सहायता और समर्थन</p>
        <p className="sakhi-body mt-2">We're here for you, every step of the way</p>
      </div>

      {/* Emergency Contacts */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-destructive" />
          <h2 className="sakhi-subheading">Emergency Contacts</h2>
        </div>
        
        {emergencyContacts.map((contact, index) => (
          <div key={index} className={`sakhi-card border-2 ${getPriorityColor(contact.priority)}`}>
            <div className="flex items-center gap-4">
              <div className="text-2xl">
                {contact.priority === 'emergency' ? '🚨' : '👩‍⚕️'}
              </div>
              
              <div className="flex-1">
                <h3 className="sakhi-subheading">{contact.name}</h3>
                <p className="sakhi-caption text-muted-foreground">{contact.nameHindi}</p>
                <p className="sakhi-body">{contact.description}</p>
                <p className="sakhi-caption text-muted-foreground">Available: {contact.available}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="voice-enabled p-2 rounded-full bg-primary/10 text-primary">
                  <Volume2 className="w-4 h-4" />
                </button>
                <a 
                  href={`tel:${contact.phone}`}
                  className="sakhi-button-primary px-4 py-2 text-sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Help Categories */}
      <div className="space-y-4">
        <h2 className="sakhi-subheading">Browse Help Topics</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {helpCategories.map((category, index) => (
            <div key={index} className="sakhi-card hover:bg-card/80 transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="sakhi-subheading">{category.title}</h3>
                  <p className="sakhi-caption text-muted-foreground mb-2">{category.titleHindi}</p>
                  <p className="sakhi-body text-sm mb-3">{category.description}</p>
                  <div className="space-y-1">
                    {category.topics.slice(0, 2).map((topic, i) => (
                      <p key={i} className="sakhi-caption text-muted-foreground">• {topic}</p>
                    ))}
                    <p className="sakhi-caption text-primary">View all topics...</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Help / FAQ */}
      <div className="space-y-4">
        <h2 className="sakhi-subheading">Frequently Asked Questions</h2>
        
        {quickHelp.map((item, index) => (
          <div key={index} className="sakhi-card">
            <div className="flex items-start gap-3">
              <div className="text-2xl mt-1">{getCategoryIcon(item.category)}</div>
              <div className="flex-1">
                <h3 className="sakhi-body font-medium mb-1">{item.question}</h3>
                <p className="sakhi-caption text-muted-foreground mb-2">{item.questionHindi}</p>
                <p className="sakhi-body text-primary">{item.answer}</p>
              </div>
              <button className="voice-enabled p-2 rounded-full bg-primary/10 text-primary">
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="sakhi-card bg-gradient-to-r from-primary/10 to-sakhi-coral/10 border border-primary/20">
        <div className="text-center">
          <h3 className="sakhi-subheading text-primary mb-2">Still Need Help?</h3>
          <p className="sakhi-body mb-4">Chat with our support team or browse more resources</p>
          <div className="flex gap-3 justify-center">
            <button className="sakhi-button-secondary flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Browse Guides
            </button>
            <button className="sakhi-button-primary flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat Support
            </button>
          </div>
        </div>
      </div>

      {/* Location Services */}
      <div className="sakhi-card">
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-primary" />
          <div className="flex-1">
            <h3 className="sakhi-subheading">Find Nearby Services</h3>
            <p className="sakhi-body">Locate health centers, pharmacies, and support groups near you</p>
          </div>
          <button className="sakhi-button-primary px-4 py-2">
            Find Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;