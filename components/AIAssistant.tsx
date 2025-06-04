'use client';

import { useState } from 'react';
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
    }, 1500);
  };

  const suggestions = [
    "Summarize this meeting",
    "What are the action items?",
    "Schedule next meeting",
    "Generate meeting notes"
  ];

  return (
    <div className={cn(
      "fixed bottom-24 right-6 z-50 flex flex-col items-end",
      isInMeeting && "bottom-28"
    )}>
      {isOpen && (
        <div className="bg-dark-1 rounded-2xl shadow-card mb-4 w-[350px] max-h-[500px] flex flex-col animate-scale-in overflow-hidden border border-dark-3/50">
          <div className="bg-gradient-to-r from-blue-1 to-purple-1 p-4 flex justify-between items-center">
            <h3 className="text-white font-semibold">Meeting Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <Image src="/icons/close.svg" width={16} height={16} alt="Close" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 max-h-[320px]">
            {responses.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <p>Ask me anything about your meetings!</p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {suggestions.map((suggestion, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      size="sm" 
                      className="bg-dark-3/50 border-none text-sm"
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
                      ? "bg-blue-1 text-white self-end" 
                      : "bg-dark-3 text-white self-start"
                  )}
                >
                  {response.text.split('\n').map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              ))
            )}
            {isProcessing && (
              <div className="bg-dark-3 p-3 rounded-xl max-w-[90%] self-start flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-blue-3 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-blue-3 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-blue-3 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <p className="text-sm text-gray-300">Thinking...</p>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t border-dark-3/50 flex gap-2">
            <Input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about your meeting..."
              className="bg-dark-3 border-none focus-visible:ring-blue-1"
            />
            <Button 
              type="submit" 
              className="bg-blue-1 hover:bg-blue-2"
              disabled={isProcessing}
            >
              <Image src="/icons/send.svg" width={18} height={18} alt="Send" />
            </Button>
          </form>
        </div>
      )}
      
      <Button 
        onClick={() => setIsOpen(!isOpen)} 
        className={cn(
          "rounded-full size-14 shadow-button bg-gradient-to-r from-blue-1 to-purple-1 hover:shadow-lg p-0 transition-all duration-300",
          isOpen && "rotate-45"
        )}
      >
        <Image 
          src={isOpen ? "/icons/close.svg" : "/icons/ai-assistant.svg"} 
          width={28} 
          height={28} 
          alt="AI Assistant" 
          className="transition-transform duration-300"
        />
      </Button>
    </div>
  );
};

export default AIAssistant; 