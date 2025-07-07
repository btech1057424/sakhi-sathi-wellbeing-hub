import { useState } from 'react';
import { Plus, Calendar, Clock, MapPin, Pill, Heart, Volume2, Bell, Check, X, Edit3 } from 'lucide-react';

interface Reminder {
  id: string;
  type: 'appointment' | 'medication' | 'wellness';
  title: string;
  titleHindi: string;
  description: string;
  date: Date;
  location?: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const Reminders = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming');
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Doctor Visit',
      titleHindi: 'डॉक्टर की जांच',
      description: 'Monthly checkup with Dr. Sharma',
      date: new Date(2025, 6, 10, 10, 0),
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
      date: new Date(2025, 6, 8, 9, 0),
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
      date: new Date(2025, 6, 8, 20, 0),
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
      date: new Date(2025, 6, 15, 14, 30),
      location: 'District Hospital',
      priority: 'high',
      completed: false
    },
    {
      id: '5',
      type: 'medication',
      title: 'Calcium Supplement',
      titleHindi: 'कैल्शियम की गोलियां',
      description: 'Take 1 tablet at bedtime',
      date: new Date(2025, 6, 8, 22, 0),
      location: undefined,
      priority: 'medium',
      completed: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    type: 'appointment',
    priority: 'medium',
    completed: false
  });

  const markAsCompleted = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id ? { ...reminder, completed: true } : reminder
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const addReminder = () => {
    if (newReminder.title && newReminder.date) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        type: newReminder.type || 'appointment',
        title: newReminder.title,
        titleHindi: newReminder.titleHindi || '',
        description: newReminder.description || '',
        date: new Date(newReminder.date),
        location: newReminder.location,
        priority: newReminder.priority || 'medium',
        completed: false
      };
      setReminders(prev => [...prev, reminder]);
      setShowAddForm(false);
      setNewReminder({
        type: 'appointment',
        priority: 'medium',
        completed: false
      });
    }
  };

  const getFilteredReminders = () => {
    switch (activeTab) {
      case 'upcoming':
        return reminders.filter(r => !r.completed);
      case 'completed':
        return reminders.filter(r => r.completed);
      default:
        return reminders;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-5 h-5" />;
      case 'medication':
        return <Pill className="w-5 h-5" />;
      case 'wellness':
        return <Heart className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredReminders = getFilteredReminders();

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="sakhi-heading">My Reminders</h1>
          <p className="sakhi-caption text-muted-foreground">मेरी याददाश्त</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="sakhi-button-primary flex items-center gap-2 px-4 py-2 rounded-full"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-xl">
        {[
          { id: 'upcoming', label: 'Upcoming', count: reminders.filter(r => !r.completed).length },
          { id: 'completed', label: 'Completed', count: reminders.filter(r => r.completed).length },
          { id: 'all', label: 'All', count: reminders.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'upcoming' | 'completed' | 'all')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Add Reminder Form */}
      {showAddForm && (
        <div className="sakhi-card bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="sakhi-subheading">Add New Reminder</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 rounded-full hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={newReminder.type}
                onChange={(e) => setNewReminder(prev => ({ ...prev, type: e.target.value as 'appointment' | 'medication' | 'wellness' }))}
                className="w-full p-3 border border-border rounded-lg bg-background"
              >
                <option value="appointment">Doctor Appointment</option>
                <option value="medication">Medication</option>
                <option value="wellness">Wellness Check</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={newReminder.title || ''}
                onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter reminder title"
                className="w-full p-3 border border-border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={newReminder.description || ''}
                onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description"
                className="w-full p-3 border border-border rounded-lg bg-background"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date & Time</label>
              <input
                type="datetime-local"
                value={newReminder.date ? new Date(newReminder.date).toISOString().slice(0, 16) : ''}
                onChange={(e) => setNewReminder(prev => ({ ...prev, date: new Date(e.target.value) }))}
                className="w-full p-3 border border-border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location (Optional)</label>
              <input
                type="text"
                value={newReminder.location || ''}
                onChange={(e) => setNewReminder(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location"
                className="w-full p-3 border border-border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                value={newReminder.priority}
                onChange={(e) => setNewReminder(prev => ({ ...prev, priority: e.target.value as 'high' | 'medium' | 'low' }))}
                className="w-full p-3 border border-border rounded-lg bg-background"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={addReminder}
                className="flex-1 sakhi-button-primary py-3 rounded-lg"
              >
                Add Reminder
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-muted text-muted-foreground py-3 rounded-lg hover:bg-muted/80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="sakhi-subheading text-muted-foreground">No reminders found</h3>
            <p className="sakhi-caption text-muted-foreground">
              {activeTab === 'upcoming' && 'All your reminders are completed!'}
              {activeTab === 'completed' && 'No completed reminders yet.'}
              {activeTab === 'all' && 'Add your first reminder to get started.'}
            </p>
          </div>
        ) : (
          filteredReminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`sakhi-card border-l-4 ${
                reminder.completed ? 'opacity-75 bg-muted/50' : 'bg-card'
              } ${
                reminder.priority === 'high' 
                  ? 'border-l-red-500' 
                  : reminder.priority === 'medium' 
                    ? 'border-l-yellow-500' 
                    : 'border-l-green-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-full ${reminder.completed ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                      {getTypeIcon(reminder.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className={`sakhi-subheading ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {reminder.title}
                      </h3>
                      <p className="sakhi-caption text-muted-foreground">
                        {reminder.titleHindi}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(reminder.priority)}`}>
                      {reminder.priority}
                    </span>
                  </div>
                  
                  <p className="sakhi-body text-muted-foreground mb-3">
                    {reminder.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDate(reminder.date)}
                    </div>
                    {reminder.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {reminder.location}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 rounded-full hover:bg-muted">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  
                  {!reminder.completed && (
                    <button
                      onClick={() => markAsCompleted(reminder.id)}
                      className="p-2 rounded-full hover:bg-green-50 text-green-600"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="p-2 rounded-full hover:bg-red-50 text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="sakhi-card bg-gradient-to-r from-primary/10 to-sakhi-coral/10">
        <h3 className="sakhi-subheading mb-3">Quick Add</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setNewReminder({
                type: 'appointment',
                title: 'Doctor Visit',
                titleHindi: 'डॉक्टर की जांच',
                description: 'Monthly checkup',
                priority: 'high',
                completed: false
              });
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 p-3 bg-background rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Doctor Visit</span>
          </button>
          <button
            onClick={() => {
              setNewReminder({
                type: 'medication',
                title: 'Take Medicine',
                titleHindi: 'दवा लें',
                description: 'Daily medication',
                priority: 'medium',
                completed: false
              });
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 p-3 bg-background rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Pill className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Medicine</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reminders;