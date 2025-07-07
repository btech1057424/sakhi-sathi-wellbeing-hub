import { useState } from 'react';
import { Plus, Calendar, Clock, MapPin, Pill, Heart, Volume2, Bell } from 'lucide-react';

const Reminders = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingReminders = [
    {
      id: '1',
      type: 'appointment',
      title: 'Doctor Visit',
      titleHindi: 'डॉक्टर की जांच',
      description: 'Monthly checkup with Dr. Sharma',
      date: new Date(2024, 6, 10, 10, 0),
      location: 'Primary Health Center',
      priority: 'high',
      completed: false
    },
    {
      id: '2',
      type: 'medication',
      title: 'Iron Tablets',
      titleHindi: 'आयरन की गोलियां',
      description: 'Take 2 tablets after breakfast',
      date: new Date(2024, 6, 8, 9, 0),
      location: undefined,
      priority: 'medium',
      completed: false
    },
    {
      id: '3',
      type: 'wellness',
      title: 'Mood Check-in',
      titleHindi: 'मानसिक स्थिति जांच',
      description: 'Daily wellness tracking',
      date: new Date(2024, 6, 8, 20, 0),
      location: undefined,
      priority: 'low',
      completed: false
    },
    {
      id: '4',
      type: 'appointment',
      title: 'Ultrasound Scan',
      titleHindi: 'अल्ट्रासाउंड स्कैन',
      description: 'Growth monitoring scan',
      date: new Date(2024, 6, 15, 14, 30),
      location: 'District Hospital',
      priority: 'high',
      completed: false
    }
  ];

  const completedReminders = [
    {
      id: '5',
      type: 'medication',
      title: 'Folic Acid',
      titleHindi: 'फोलिक एसिड',
      description: 'Morning dose completed',
      date: new Date(2024, 6, 7, 8, 0),
      location: undefined,
      priority: 'medium',
      completed: true
    },
    {
      id: '6',
      type: 'wellness',
      title: 'Exercise Session',
      titleHindi: 'व्यायाम सत्र',
      description: 'Prenatal yoga completed',
      date: new Date(2024, 6, 7, 16, 0),
      location: undefined,
      priority: 'low',
      completed: true
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar className="w-5 h-5" />;
      case 'medication': return <Pill className="w-5 h-5" />;
      case 'wellness': return <Heart className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'appointment': return 'bg-primary/20 text-primary';
      case 'medication': return 'bg-sakhi-peach/20 text-sakhi-sunset';
      case 'wellness': return 'bg-sakhi-sage/20 text-sakhi-sage';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive bg-destructive/5';
      case 'medium': return 'border-l-primary bg-primary/5';
      case 'low': return 'border-l-sakhi-sage bg-sakhi-sage/5';
      default: return 'border-l-muted';
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const currentReminders = activeTab === 'upcoming' ? upcomingReminders : completedReminders;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="sakhi-heading">My Reminders</h1>
          <p className="sakhi-caption text-muted-foreground">मेरी याददाश्त</p>
        </div>
        <button className="sakhi-button-primary p-3 rounded-full">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="sakhi-card text-center">
          <div className="text-2xl font-bold text-primary">4</div>
          <div className="sakhi-caption text-muted-foreground">Upcoming</div>
        </div>
        <div className="sakhi-card text-center">
          <div className="text-2xl font-bold text-green-500">2</div>
          <div className="sakhi-caption text-muted-foreground">Completed</div>
        </div>
        <div className="sakhi-card text-center">
          <div className="text-2xl font-bold text-destructive">1</div>
          <div className="sakhi-caption text-muted-foreground">Overdue</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-muted rounded-2xl p-1">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-3 px-4 rounded-xl transition-all font-medium ${
            activeTab === 'upcoming'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Upcoming ({upcomingReminders.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-3 px-4 rounded-xl transition-all font-medium ${
            activeTab === 'completed'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Completed ({completedReminders.length})
        </button>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {currentReminders.map((reminder) => (
          <div 
            key={reminder.id}
            className={`sakhi-card border-l-4 ${getPriorityColor(reminder.priority)} hover:bg-card/80 transition-all`}
          >
            <div className="flex items-start gap-4">
              {/* Type Icon */}
              <div className={`p-3 rounded-2xl ${getTypeColor(reminder.type)}`}>
                {getTypeIcon(reminder.type)}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="sakhi-subheading">{reminder.title}</h3>
                    <p className="sakhi-caption text-muted-foreground">{reminder.titleHindi}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="voice-enabled p-2 rounded-full bg-primary/10 text-primary">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="sakhi-body mb-3">{reminder.description}</p>
                
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="sakhi-caption">
                      {formatDate(reminder.date)} at {formatTime(reminder.date)}
                    </span>
                  </div>
                  
                  {reminder.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="sakhi-caption">{reminder.location}</span>
                    </div>
                  )}
                </div>
                
                {!reminder.completed && (
                  <div className="flex items-center gap-3 mt-4">
                    <button className="sakhi-button-secondary text-sm px-4 py-2">
                      Reschedule
                    </button>
                    <button className="sakhi-button-primary text-sm px-4 py-2">
                      Mark Complete
                    </button>
                  </div>
                )}
                
                {reminder.completed && (
                  <div className="flex items-center gap-2 mt-4 text-green-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="sakhi-caption">Completed successfully</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Reminder Alert */}
      <div className="sakhi-card bg-gradient-to-r from-primary/10 to-sakhi-coral/10 border border-primary/20">
        <div className="flex items-center gap-3">
          <div className="text-2xl">⏰</div>
          <div className="flex-1">
            <h3 className="sakhi-subheading text-primary">Next Reminder</h3>
            <p className="sakhi-body">Iron tablets in 2 hours</p>
            <p className="sakhi-caption text-muted-foreground">2 घंटे में आयरन की गोलियां</p>
          </div>
          <button className="sakhi-button-primary px-4 py-2">
            <Bell className="w-4 h-4 mr-2" />
            Set Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reminders;