'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

type AIAssistantProps = {
  isInMeeting?: boolean;
};

type Message = {
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
};

type AICommand = {
  name: string;
  description: string;
  icon: string;
};

const aiCommands: AICommand[] = [
  { name: 'summarize', description: 'Summarize meeting content', icon: '/icons/summary.svg' },
  { name: 'action-items', description: 'List action items', icon: '/icons/task.svg' },
  { name: 'schedule', description: 'Suggest meeting times', icon: '/icons/calendar.svg' },
  { name: 'transcript', description: 'Generate transcript', icon: '/icons/transcript.svg' },
];

const AIAssistant = ({ isInMeeting = false }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showCommands, setShowCommands] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Add user query to responses
    const userMessage = { type: 'user' as const, text: query, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    setShowCommands(false);
    
    // Simulate AI response (in a real app, this would call your AI service)
    setTimeout(() => {
      let aiResponse = '';
      
      if (query.toLowerCase().includes('summarize')) {
        aiResponse = "I've analyzed the meeting and here are the key points discussed:\n\n1. Project timeline needs to be adjusted by 2 weeks\n2. Marketing campaign will launch next Monday\n3. Budget approval for Q3 is pending\n4. New team members will join on the 15th";
      } else if (query.toLowerCase().includes('action')) {
        aiResponse = "Based on the meeting, here are the action items:\n\n• John: Finalize the design by Friday\n• Sarah: Contact the client for feedback\n• Team: Review documentation before next meeting\n• Alex: Prepare budget proposal";
      } else if (query.toLowerCase().includes('schedule') || query.toLowerCase().includes('next')) {
        aiResponse = "I suggest scheduling the next meeting on Wednesday at 2:00 PM. Most participants are available at this time based on their calendars.";
      } else {
        aiResponse = "I'm your meeting assistant. I can help summarize discussions, identify action items, suggest meeting times, and more. Just ask me anything about your meetings!";
      }
      
      const aiMessage = { type: 'ai' as const, text: aiResponse, timestamp: new Date() };
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
      setQuery('');
    }, 1000);
  };

  const handleCommandClick = (command: string) => {
    let commandText = '';
    
    switch (command) {
      case 'summarize':
        commandText = 'Summarize this meeting';
        break;
      case 'action-items':
        commandText = 'What are the action items?';
        break;
      case 'schedule':
        commandText = 'Schedule next meeting';
        break;
      case 'transcript':
        commandText = 'Generate meeting transcript';
        break;
      default:
        commandText = command;
    }
    
    setQuery(commandText);
    setShowCommands(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Add welcome message when first opening
      const welcomeMessage = { 
        type: 'ai' as const, 
        text: "👋 Hi there! I'm your AI meeting assistant. How can I help you today?", 
        timestamp: new Date() 
      };
      setMessages([welcomeMessage]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 flex flex-col items-end",
      isInMeeting && "bottom-24"
    )}>
      {isOpen && (
        <Card 
          variant="glassDark" 
          className="mb-4 w-[350px] max-h-[500px] flex flex-col animate-scale overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-white/20 flex items-center justify-center">
                <Image 
                  src="/icons/ai-assistant.svg" 
                  width={16} 
                  height={16} 
                  alt="AI" 
                />
              </div>
              <h3 className="text-white font-semibold">AI Assistant</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20"
              onClick={toggleAssistant}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13M1 1L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 max-h-[320px]">
            {messages.length === 0 ? (
              <div className="text-center text-secondary-400 py-8">
                <div className="size-16 mx-auto mb-4 rounded-full bg-primary-600/20 flex items-center justify-center">
                  <Image 
                    src="/icons/ai-assistant.svg" 
                    width={32} 
                    height={32} 
                    alt="AI Assistant" 
                  />
                </div>
                <p>How can I help you with your meetings?</p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {aiCommands.map((command) => (
                    <Button 
                      key={command.name} 
                      variant="outline" 
                      size="sm" 
                      className="bg-secondary-800 border-none text-sm hover:bg-secondary-700"
                      onClick={() => handleCommandClick(command.name)}
                    >
                      {command.description}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "p-3 rounded-xl max-w-[90%] relative",
                    message.type === 'user' 
                      ? "bg-primary-600 text-white self-end" 
                      : "bg-secondary-800 text-white self-start"
                  )}
                >
                  <div className="absolute -bottom-2 right-2 text-[10px] text-secondary-400">
                    {formatTime(message.timestamp)}
                  </div>
                  {message.text.split('\n').map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-1" : ""}>{line}</p>
                  ))}
                </div>
              ))
            )}
            {isProcessing && (
              <div className="bg-secondary-800 p-3 rounded-xl max-w-[90%] self-start flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <p className="text-sm text-secondary-300">Thinking...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t border-secondary-800 relative">
            {showCommands && (
              <div className="absolute bottom-full left-0 w-full bg-secondary-900 border-t border-secondary-800 rounded-t-lg overflow-hidden">
                <div className="p-2 max-h-[200px] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {aiCommands.map((command) => (
                      <button
                        key={command.name}
                        type="button"
                        className="flex items-center gap-2 p-2 hover:bg-secondary-800 rounded-lg text-left text-sm transition-colors"
                        onClick={() => handleCommandClick(command.name)}
                      >
                        <div className="size-8 rounded-full bg-primary-600/20 flex items-center justify-center">
                          <Image 
                            src={command.icon} 
                            width={16} 
                            height={16} 
                            alt={command.name} 
                          />
                        </div>
                        <div>
                          <div className="font-medium">{command.description}</div>
                          <div className="text-xs text-secondary-400">/{command.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input 
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowCommands(true)}
                  placeholder="Ask about your meeting..."
                  className="bg-secondary-800 border-none focus-visible:ring-primary-500 pr-8"
                />
                <button 
                  type="button" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-white"
                  onClick={() => setShowCommands(!showCommands)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <Button 
                type="submit" 
                className="bg-primary-600 hover:bg-primary-700"
                disabled={isProcessing}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
            
            <div className="mt-2 flex justify-between items-center">
              <div className="flex gap-1">
                <Badge variant="secondary" size="sm" className="cursor-pointer" onClick={() => handleCommandClick('summarize')}>
                  /summarize
                </Badge>
                <Badge variant="secondary" size="sm" className="cursor-pointer" onClick={() => handleCommandClick('action-items')}>
                  /action-items
                </Badge>
              </div>
              {isInMeeting && (
                <Badge variant="success" size="sm">
                  <span className="size-2 bg-accent-500 rounded-full mr-1 animate-pulse"></span>
                  Live
                </Badge>
              )}
            </div>
          </form>
        </Card>
      )}
      
      <Button 
        onClick={toggleAssistant} 
        className={cn(
          "rounded-full size-14 shadow-lg bg-gradient-to-r from-primary-600 to-accent-600 hover:shadow-xl p-0 transition-all duration-200",
          isOpen && "rotate-45"
        )}
      >
        <Image 
          src={isOpen ? "/icons/close.svg" : "/icons/ai-assistant.svg"} 
          width={28} 
          height={28} 
          alt="AI Assistant" 
          className="transition-transform duration-200"
        />
      </Button>
    </div>
  );
};

export default AIAssistant; 