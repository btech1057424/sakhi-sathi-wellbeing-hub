import { Phone, MapPin, Clock, AlertTriangle, Heart, Shield } from 'lucide-react';

const Emergency = () => {
  const emergencyNumbers = [
    {
      name: 'Emergency Services',
      number: '108',
      description: 'Immediate medical help',
      available: '24/7'
    },
    {
      name: 'ASHA Worker',
      number: '+91 98765 43210',
      description: 'Your local health worker',
      available: '24/7'
    },
    {
      name: 'District Hospital',
      number: '+91 98765 43212',
      description: 'Emergency department',
      available: '24/7'
    }
  ];

  const warningSignsGeneral = [
    'Severe abdominal pain',
    'Heavy bleeding',
    'Severe headache with vision changes',
    'Difficulty breathing',
    'Chest pain',
    'Severe vomiting',
    'High fever (over 101°F)',
    'Severe dizziness or fainting'
  ];

  const warningSignsPregnancy = [
    'Decreased baby movement',
    'Leaking fluid from vagina',
    'Severe back pain',
    'Regular contractions before 37 weeks',
    'Swelling in face or hands',
    'Severe mood changes',
    'Thoughts of self-harm',
    'Unable to keep food/water down'
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">🚨</div>
        <h1 className="sakhi-heading text-destructive">Emergency Help</h1>
        <p className="sakhi-body">आपातकालीन सहायता</p>
      </div>

      {/* Quick Action Buttons */}
      <div className="space-y-4 mb-8">
        {emergencyNumbers.map((contact, index) => (
          <a
            key={index}
            href={`tel:${contact.number}`}
            className="block sakhi-card bg-destructive/10 border-2 border-destructive hover:bg-destructive/20 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-destructive text-destructive-foreground rounded-2xl">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="sakhi-subheading text-destructive">{contact.name}</h3>
                <p className="sakhi-body font-mono text-lg">{contact.number}</p>
                <p className="sakhi-caption text-muted-foreground">{contact.description}</p>
              </div>
              <div className="text-right">
                <div className="sakhi-caption text-green-500 font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1"></div>
                  {contact.available}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Location Services */}
      <div className="sakhi-card mb-6 bg-primary/10 border border-primary">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-6 h-6 text-primary" />
          <div>
            <h3 className="sakhi-subheading text-primary">Share Your Location</h3>
            <p className="sakhi-caption text-muted-foreground">Help responders find you quickly</p>
          </div>
        </div>
        <button className="sakhi-button-primary w-full">
          <MapPin className="w-5 h-5 mr-2" />
          Send Location to Emergency Contacts
        </button>
      </div>

      {/* Warning Signs */}
      <div className="space-y-6">
        <div className="sakhi-card">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
            <h3 className="sakhi-subheading text-destructive">When to Call for Help</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="sakhi-body font-medium mb-2 text-primary">General Warning Signs:</h4>
              <div className="grid grid-cols-1 gap-2">
                {warningSignsGeneral.map((sign, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0"></div>
                    <span className="sakhi-body">{sign}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="sakhi-body font-medium mb-2 text-primary">Pregnancy-Specific Signs:</h4>
              <div className="grid grid-cols-1 gap-2">
                {warningSignsPregnancy.map((sign, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0"></div>
                    <span className="sakhi-body">{sign}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* What to Do */}
        <div className="sakhi-card bg-sakhi-sage/10">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-sakhi-sage" />
            <h3 className="sakhi-subheading">What to Do in Emergency</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <p className="sakhi-body">Stay calm and call emergency services immediately</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <p className="sakhi-body">Share your location and describe your symptoms clearly</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <p className="sakhi-body">Stay on the line and follow the operator's instructions</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">4</div>
              <p className="sakhi-body">Have someone stay with you until help arrives</p>
            </div>
          </div>
        </div>

        {/* Mental Health Crisis */}
        <div className="sakhi-card bg-sakhi-lavender/10">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-purple-600" />
            <h3 className="sakhi-subheading">Mental Health Crisis</h3>
          </div>
          
          <p className="sakhi-body mb-4">
            If you're having thoughts of harming yourself or your baby, please reach out immediately:
          </p>
          
          <div className="space-y-3">
            <a 
              href="tel:181"
              className="block p-4 bg-purple-100 border border-purple-200 rounded-xl hover:bg-purple-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium text-purple-600">Women Helpline: 181</div>
                  <div className="text-sm text-muted-foreground">24/7 support for women in crisis</div>
                </div>
              </div>
            </a>
            
            <div className="p-4 bg-background border border-border rounded-xl">
              <p className="sakhi-body text-center">
                <strong>Remember:</strong> You are not alone. Your feelings are valid, and help is available.
                <br />
                <span className="text-muted-foreground">याद रखें: आप अकेली नहीं हैं। आपकी भावनाएं सही हैं, और मदद उपलब्ध है।</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <button 
          onClick={() => window.history.back()}
          className="sakhi-button-secondary px-6 py-3"
        >
          Go Back to Safety
        </button>
      </div>
    </div>
  );
};

export default Emergency;