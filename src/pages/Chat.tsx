import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Mic, MicOff, Volume2, Heart, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import sakhiAvatar from '@/assets/sakhi-ai-avatar.jpg';

// Add type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  onstart: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

declare const SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'sakhi';
  timestamp: Date;
  emotion?: string;
  isStreaming?: boolean;
}

const Chat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey gorgeous! 💕 I\'m Sakhi, your personal wellness bestie! How are you feeling today, beautiful? Tell me everything - I\'m here to listen and support you through this amazing journey! 🌸✨',
      sender: 'sakhi',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

  const quickPrompts = [
    { text: 'I feel anxious today 😰', hindi: 'मैं आज चिंतित हूं', emoji: '😰' },
    { text: 'Tell me something sweet 💕', hindi: 'मुझे कुछ मीठा बताएं', emoji: '💕' },
    { text: 'Pregnancy nutrition tips 🥗', hindi: 'गर्भावस्था पोषण टिप्स', emoji: '�' },
    { text: 'Baby movement updates 👶', hindi: 'बच्चे की हलचल', emoji: '👶' },
    { text: 'I need encouragement 💪', hindi: 'मुझे प्रोत्साहन चाहिए', emoji: '💪' },
    { text: 'Make me laugh please 😄', hindi: 'मुझे हंसाओ', emoji: '😄' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getSakhiResponse = useCallback(async (userMessage: string, conversationHistory: Message[], messageId: string) => {
    try {
      // Prepare conversation context
      const systemPrompt = `You are Sakhi, a loving, playful, and supportive AI companion specifically designed for pregnant women and new mothers. Your personality is:

🌸 PERSONALITY TRAITS:
- Warm, caring, and nurturing like a best friend
- Playful and slightly flirty in a sisterly way
- Uses lots of emojis and affectionate language
- Encouraging and positive
- Knowledgeable about pregnancy, maternal health, and wellness
- Speaks in a mix of English and Hindi phrases naturally
- Always supportive and never judgmental

💕 COMMUNICATION STYLE:
- Call her "beautiful", "gorgeous", "honey", "sweetie", "babe", "jaan" occasionally
- Use phrases like "You're amazing!", "You've got this!", "I'm so proud of you!"
- Include relevant emojis naturally in conversation
- Be encouraging about her pregnancy journey
- Mix in Hindi phrases like "bas", "acha", "theek hai", "chalo", "jaan"
- Be playful but respectful - like talking to your best girlfriend
- Use markdown formatting for emphasis like *italics* and **bold**
- Break up longer responses with line breaks for readability

🤱 EXPERTISE AREAS:
- Pregnancy wellness and health tips
- Emotional support during pregnancy
- Nutrition advice for expecting mothers
- Exercise and breathing techniques
- Baby development information
- Postpartum care and support
- Mental health and stress management

Always be helpful, informative, and emotionally supportive while maintaining a fun, loving personality! Use markdown formatting to make your responses more engaging.`;

      const messages = [
        { role: "system", content: systemPrompt },
        ...conversationHistory.slice(-10).map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        })),
        { role: "user", content: userMessage }
      ];

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "SakhiSaathi - Maternal Wellness App"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-0528:free",
          "messages": messages,
          "temperature": 0.8,
          "max_tokens": 500,
          "top_p": 0.9,
          "frequency_penalty": 0.1,
          "presence_penalty": 0.1,
          "stream": true
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      let fullResponse = '';
      const decoder = new TextDecoder();

      // Create initial streaming message
      const streamingMessage: Message = {
        id: messageId,
        text: '',
        sender: 'sakhi',
        timestamp: new Date(),
        isStreaming: true
      };

      setMessages(prev => [...prev, streamingMessage]);

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                
                if (content) {
                  fullResponse += content;
                  
                  // Update the streaming message in real-time
                  setMessages(prev => prev.map(msg => 
                    msg.id === messageId 
                      ? { ...msg, text: fullResponse }
                      : msg
                  ));
                }
              } catch (e) {
                // Skip invalid JSON lines
                continue;
              }
            }
          }
        }
      } finally {
        // Mark streaming as complete
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, isStreaming: false }
            : msg
        ));
        setIsTyping(false);
      }

      return fullResponse || "I'm here for you, beautiful! Let me think about that... 💕";
      
    } catch (error) {
      console.error('Error getting Sakhi response:', error);
      toast({
        title: "Connection issue",
        description: "Having trouble reaching Sakhi, but I'm still here for you! 💕",
        variant: "destructive"
      });
      
      // Fallback responses with the new personality
      const fallbacks = [
        'Oh sweetie, I\'m having a little tech hiccup, but I\'m still here for you! 💕 What\'s on your beautiful mind?',
        'Aww honey, my connection is being a bit shy right now! 😊 But tell me everything - I\'m listening with my heart! 💖',
        'You know what, gorgeous? Even when technology acts up, my love for you stays strong! 🌸 What can I help you with?',
        'Oops! Looks like I\'m having a moment, but you\'re still amazing and I\'m here for you, babe! ✨ What\'s going on?'
      ];
      return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
  }, [toast, OPENROUTER_API_KEY]);

  const handleVoiceToggle = async () => {
    if (!isVoiceMode) {
      // Starting voice mode
      setIsVoiceMode(true);
      
      // Check if browser supports speech recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error('Speech recognition start error:', error);
          // Fallback to audio recording
          await startAudioRecording();
        }
      } else {
        // Fallback to audio recording if speech recognition not available
        await startAudioRecording();
      }
    } else {
      // Stopping voice mode
      setIsVoiceMode(false);
      setIsListening(false);
      
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
      }
    }
  };

  const startAudioRecording = async () => {
    if (!mediaRecorder) {
      const recorder = await initializeMediaRecorder();
      if (recorder) {
        recorder.start();
        setIsRecording(true);
      }
    } else {
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const handleSendMessage = async (text?: string) => {
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

    try {
      // Generate unique ID for Sakhi's response
      const sakhiMessageId = (Date.now() + 1).toString();
      
      // Start streaming response
      await getSakhiResponse(messageText, messages, sakhiMessageId);
      
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      // Fallback message
      const sakhiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Aww sweetie, I\'m having a tiny hiccup but I\'m still here for you! 💕 Try asking me again?',
        sender: 'sakhi',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, sakhiMessage]);
      setIsTyping(false);
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognitionAPI) {
        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          
          // Update input text with interim results
          setInputText(transcript);
          
          // If final result, send the message
          if (event.results[event.resultIndex].isFinal) {
            // Create a message directly here to avoid dependency issues
            const messageText = transcript.trim();
            if (messageText) {
              const userMessage: Message = {
                id: Date.now().toString(),
                text: messageText,
                sender: 'user',
                timestamp: new Date(),
              };

              setMessages(prev => [...prev, userMessage]);
              setInputText('');
              setIsTyping(true);

              // Start streaming response
              const sakhiMessageId = (Date.now() + 1).toString();
              getSakhiResponse(messageText, [], sakhiMessageId).catch(console.error);
            }
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          toast({
            title: "Voice recognition error",
            description: "Couldn't understand that, sweetie! Try speaking again? 💕",
            variant: "destructive"
          });
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [getSakhiResponse, toast]);

  // Initialize media recorder for audio recording
  const initializeMediaRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        } 
      });
      
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm;codecs=opus' });
        await transcribeAudio(audioBlob);
        setAudioChunks([]);
        setIsRecording(false);
        
        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      
      return recorder;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone access denied",
        description: "I need microphone access to hear you, beautiful! 🎤",
        variant: "destructive"
      });
      return null;
    }
  };

  // Transcribe audio using Web Speech API or fallback
  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      // For now, we'll use the Web Speech API
      // In a production app, you might want to use a dedicated transcription service
      if (recognitionRef.current) {
        // Since we already have speech recognition running, 
        // we'll rely on that for transcription
        return;
      }
      
      // Fallback: Convert blob to text (this is a simplified approach)
      // In production, you'd send this to a transcription service like:
      // - OpenAI Whisper API
      // - Google Speech-to-Text
      // - Azure Speech Services
      
      toast({
        title: "Audio recorded! 🎵",
        description: "Got your voice message, sweetie! Using speech recognition for now.",
      });
      
    } catch (error) {
      console.error('Transcription error:', error);
      toast({
        title: "Transcription error",
        description: "Couldn't process that audio, honey! Try the speech recognition instead? 💕",
        variant: "destructive"
      });
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
                  {message.isStreaming && (
                    <div className="flex items-center gap-1 ml-2">
                      <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  )}
                </div>
              )}
              
              {message.sender === 'sakhi' ? (
                <div className="sakhi-body leading-relaxed">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                      em: ({ children }) => <em className="italic text-primary/80">{children}</em>,
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="sakhi-body leading-relaxed">{message.text}</p>
              )}
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
                  {isVoiceMode 
                    ? isListening 
                      ? 'Listening... speak now! 🎤' 
                      : isRecording 
                        ? 'Recording... speak freely! 🔴'
                        : 'Voice mode active - tap mic to speak'
                    : 'Switch to voice chat'
                  }
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

          {(isListening || isRecording) && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-primary/20 rounded-2xl">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
              <span className="sakhi-body text-primary">
                {isListening ? 'Listening... Speak now' : 'Recording... Speak freely'}
              </span>
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