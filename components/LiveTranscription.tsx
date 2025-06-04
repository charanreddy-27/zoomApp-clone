'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LiveTranscriptionProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TranscriptionEntry {
  id: number;
  speaker: string;
  text: string;
  timestamp: string;
  avatar: string;
}

const LiveTranscription = ({ isOpen, onClose }: LiveTranscriptionProps) => {
  const [isActive, setIsActive] = useState(true);
  const [language, setLanguage] = useState('English');
  const [transcriptions, setTranscriptions] = useState<TranscriptionEntry[]>([]);
  
  // Simulate incoming transcriptions
  useEffect(() => {
    if (!isOpen || !isActive) return;
    
    const speakers = [
      { name: 'You', avatar: '/icons/avatar.svg' },
      { name: 'John Doe', avatar: '/icons/avatar.svg' },
      { name: 'Sarah Smith', avatar: '/icons/avatar.svg' },
    ];
    
    const texts = [
      "I think we should focus on improving the user interface first.",
      "Yes, and we need to address the performance issues on mobile devices.",
      "The analytics dashboard also needs an update before the next release.",
      "Let's prioritize these tasks and create a timeline.",
      "I agree. We should also consider user feedback from the last survey.",
      "The new feature should be ready by next week if everything goes as planned.",
    ];
    
    const addTranscription = () => {
      const speaker = speakers[Math.floor(Math.random() * speakers.length)];
      const text = texts[Math.floor(Math.random() * texts.length)];
      const now = new Date();
      const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setTranscriptions(prev => [
        ...prev,
        {
          id: Date.now(),
          speaker: speaker.name,
          text,
          timestamp,
          avatar: speaker.avatar
        }
      ]);
    };
    
    // Add initial transcriptions
    if (transcriptions.length === 0) {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => addTranscription(), i * 500);
      }
    }
    
    // Add new transcription every few seconds
    const interval = setInterval(addTranscription, 5000);
    return () => clearInterval(interval);
  }, [isOpen, isActive, transcriptions.length]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-24 right-6 z-40 w-[400px] max-h-[500px] bg-dark-1 rounded-2xl shadow-card flex flex-col animate-scale-in overflow-hidden border border-dark-3/50">
      <div className="bg-gradient-to-r from-purple-1 to-blue-1 p-4 flex justify-between items-center">
        <h3 className="text-white font-semibold">Live Transcription</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch 
              checked={isActive} 
              onCheckedChange={setIsActive} 
              className="data-[state=checked]:bg-green-1"
            />
            <Label className="text-white text-sm">{isActive ? 'On' : 'Off'}</Label>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20"
            onClick={onClose}
          >
            <Image src="/icons/close.svg" width={16} height={16} alt="Close" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-4 py-2 bg-dark-3/50">
        <div className="flex gap-2 items-center">
          <Image src="/icons/language.svg" width={18} height={18} alt="Language" />
          <span className="text-white text-sm">Language:</span>
        </div>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-dark-4 text-white text-sm border-none rounded-md px-2 py-1 focus:ring-1 focus:ring-blue-1"
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Japanese">Japanese</option>
        </select>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 max-h-[320px]">
        {transcriptions.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>Transcription will appear here when someone speaks</p>
          </div>
        ) : (
          transcriptions.map((entry) => (
            <div key={entry.id} className="flex gap-3">
              <Image 
                src={entry.avatar} 
                width={32} 
                height={32} 
                alt={entry.speaker} 
                className="rounded-full" 
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-white">{entry.speaker}</span>
                  <span className="text-xs text-gray-400">{entry.timestamp}</span>
                </div>
                <p className="text-gray-200">{entry.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 border-t border-dark-3/50 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs border-dark-3 hover:bg-dark-3/50"
        >
          <Image src="/icons/download.svg" width={14} height={14} alt="Download" className="mr-1" />
          Save Transcript
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs border-dark-3 hover:bg-dark-3/50"
        >
          <Image src="/icons/copy.svg" width={14} height={14} alt="Copy" className="mr-1" />
          Copy All
        </Button>
      </div>
    </div>
  );
};

export default LiveTranscription; 