'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

type AIAssistantProps = {
  isInMeeting?: boolean;
};

const AIAssistant = ({ isInMeeting = false }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [responses, setResponses] = useState<{ type: 'user' | 'ai'; text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [responses, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Add user query to responses
    setResponses(prev => [...prev, { type: 'user', text: query }]);
    setIsProcessing(true);
    
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
      
      setResponses(prev => [...prev, { type: 'ai', text: aiResponse }]);
      setIsProcessing(false);
      setQuery('');
    }, 1000);
  };

  const suggestions = [
    "Summarize this meeting",
    "What are the action items?",
    "Schedule next meeting",
    "Generate meeting notes"
  ];

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 flex flex-col items-end",
      isInMeeting && "bottom-24"
    )}>
      {isOpen && (
        <div className="bg-secondary-900 rounded-2xl shadow-lg mb-4 w-[350px] max-h-[500px] flex flex-col animate-scale border border-secondary-800 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 flex justify-between items-center">
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13M1 1L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 max-h-[320px]">
            {responses.length === 0 ? (
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
                  {suggestions.map((suggestion, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      size="sm" 
                      className="bg-secondary-800 border-none text-sm hover:bg-secondary-700"
                      onClick={() => {
                        setQuery(suggestion);
                        handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              responses.map((response, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "p-3 rounded-xl max-w-[90%]",
                    response.type === 'user' 
                      ? "bg-primary-600 text-white self-end" 
                      : "bg-secondary-800 text-white self-start"
                  )}
                >
                  {response.text.split('\n').map((line, j) => (
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
          
          <form onSubmit={handleSubmit} className="p-4 border-t border-secondary-800 flex gap-2">
            <Input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about your meeting..."
              className="bg-secondary-800 border-none focus-visible:ring-primary-500"
            />
            <Button 
              type="submit" 
              className="bg-primary-600 hover:bg-primary-700"
              disabled={isProcessing}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </form>
        </div>
      )}
      
      <Button 
        onClick={() => setIsOpen(!isOpen)} 
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