'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { Card } from './ui/card';

type AIAssistantProps = {
  isInMeeting?: boolean;
};

type Message = {
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
};

const aiCommands = [
  { name: 'summarize', description: 'Summarize meeting', icon: '/icons/summary.svg' },
  { name: 'action-items', description: 'List action items', icon: '/icons/task.svg' },
  { name: 'schedule', description: 'Suggest meeting times', icon: '/icons/calendar.svg' },
];

const AIAssistant = ({ isInMeeting = false }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
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
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "I'm your meeting assistant. I can help summarize discussions, identify action items, and suggest meeting times.";
      
      const aiMessage = { type: 'ai' as const, text: aiResponse, timestamp: new Date() };
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
      setQuery('');
    }, 800);
  };

  const handleCommandClick = (command: string) => {
    setQuery(`${command} this meeting`);
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
        text: "👋 Hi there! I'm your meeting assistant. How can I help you today?", 
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
          className="mb-4 w-[350px] max-h-[500px] flex flex-col animate-scale overflow-hidden bg-secondary-900 border border-secondary-800"
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-3 flex justify-between items-center">
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
            {messages.map((message, i) => (
              <div 
                key={i} 
                className={cn(
                  "p-3 rounded-xl max-w-[90%] relative",
                  message.type === 'user' 
                    ? "bg-primary-600 text-white self-end" 
                    : "bg-secondary-800 text-white self-start"
                )}
              >
                <p>{message.text}</p>
                <div className="absolute -bottom-2 right-2 text-[10px] text-secondary-400">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="self-start bg-secondary-800 p-3 rounded-xl flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="size-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="size-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="size-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="p-3 border-t border-secondary-800 flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ask me anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-secondary-800 border-secondary-700"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isProcessing || !query.trim()}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 8L1 15L3 8L1 1L15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </form>
        </Card>
      )}
      
      <Button
        onClick={toggleAssistant}
        className={cn(
          "size-14 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 hover:shadow-lg transition-all p-0 flex items-center justify-center",
          isOpen && "bg-secondary-800"
        )}
      >
        <Image 
          src="/icons/ai-assistant.svg" 
          width={28} 
          height={28} 
          alt="AI Assistant" 
          className="text-white"
        />
      </Button>
    </div>
  );
};

export default AIAssistant; 