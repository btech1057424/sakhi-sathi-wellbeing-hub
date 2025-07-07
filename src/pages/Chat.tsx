import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, Heart, MessageSquare } from 'lucide-react';
import sakhiAvatar from '@/assets/sakhi-ai-avatar.jpg';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'sakhi';
  timestamp: Date;
  emotion?: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! I am Sakhi, your wellness companion. How are you feeling today? 🙏',
      sender: 'sakhi',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { text: 'I feel anxious', hindi: 'मैं चिंतित हूं', emoji: '😰' },
    { text: 'Tell me about nutrition', hindi: 'पोषण के बारे में बताएं', emoji: '🥗' },
    { text: 'Breathing exercises', hindi: 'सांस की कसरत', emoji: '🫁' },
    { text: 'Baby\'s movement', hindi: 'बच्चे की हलचल', emoji: '👶' },
    { text: 'I need encouragement', hindi: 'मुझे प्रोत्साहन चाहिए', emoji: '💪' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate Sakhi's response
    setTimeout(() => {
      const responses = [
        'I understand how you\'re feeling. It\'s completely normal to have these emotions during pregnancy. Let\'s work through this together. 💕',
        'That\'s a great question! Here\'s what I recommend for your wellness journey... 🌸',
        'You\'re doing wonderfully! Remember, every small step towards your health matters. 🌟',
        'Thank you for sharing that with me. Your feelings are valid and important. 🤗',
      ];

      const sakhiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'sakhi',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, sakhiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    setIsVoiceMode(!isVoiceMode);
    if (!isVoiceMode) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        handleSendMessage("I'm feeling a bit anxious about my pregnancy");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Chat Header */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={sakhiAvatar}
            alt="Sakhi AI Assistant"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="sakhi-subheading">Sakhi AI</h2>
          <p className="sakhi-caption text-muted-foreground flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Always here for you • हमेशा आपके साथ
          </p>
        </div>
        <button className="p-2 rounded-full bg-primary/10 text-primary">
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs sm:max-w-sm ${message.sender === 'user'
                ? 'bg-primary text-primary-foreground ml-4'
                : 'bg-card mr-4'
              } rounded-2xl px-4 py-3 shadow-sm`}>
              {message.sender === 'sakhi' && (
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Sakhi</span>
                </div>
              )}
              <p className="sakhi-body leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 ${message.sender === 'user'
                  ? 'text-primary-foreground/70'
                  : 'text-muted-foreground'
                }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card rounded-2xl px-4 py-3 shadow-sm mr-4">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Sakhi</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Mode Toggle */}
      <div className="p-4 bg-card/50 border-t border-border">
        <div className="sakhi-card bg-gradient-to-r from-primary/10 to-sakhi-coral/10 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-primary" />
              <div>
                <h3 className="sakhi-subheading">Voice Mode</h3>
                <p className="sakhi-caption text-muted-foreground">
                  {isVoiceMode ? 'Voice chat active - speak freely' : 'Switch to voice chat'}
                </p>
              </div>
            </div>
            <button
              onClick={handleVoiceToggle}
              className={`p-3 rounded-full transition-all ${isVoiceMode
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
            >
              {isVoiceMode ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
          </div>

          {isListening && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-primary/20 rounded-2xl">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
              <span className="sakhi-body text-primary">Listening... Speak now</span>
              <div className="flex gap-1 ml-auto">
                <div className="w-2 h-4 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-6 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-8 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(prompt.text)}
              className="flex-shrink-0 bg-secondary text-secondary-foreground px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap hover:bg-secondary/80 transition-colors"
            >
              <span className="mr-1">{prompt.emoji}</span>
              {prompt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 bg-input rounded-full px-4 py-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isVoiceMode ? "Voice mode active... Tap mic to speak" : "Type your message... अपना संदेश लिखें..."}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none sakhi-body"
              disabled={isVoiceMode && isListening}
            />
            <button
              onClick={handleVoiceToggle}
              className={`p-2 rounded-full transition-all ${isListening
                  ? 'bg-destructive text-destructive-foreground animate-pulse'
                  : isVoiceMode
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="sakhi-button-primary p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <p className="sakhi-caption text-center text-muted-foreground mt-2">
          Speak or type in Hindi/English • हिंदी/अंग्रेजी में बोलें या लिखें
        </p>
      </div>
    </div>
  );
};

export default Chat;