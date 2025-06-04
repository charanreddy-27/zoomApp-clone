'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import CollaborativeWhiteboard from './CollaborativeWhiteboard';
import LiveTranscription from './LiveTranscription';
import VirtualBackgrounds from './VirtualBackgrounds';

interface EnhancedMeetingControlsProps {
  className?: string;
}

const EnhancedMeetingControls = ({ className }: EnhancedMeetingControlsProps) => {
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isTranscriptionOpen, setIsTranscriptionOpen] = useState(false);
  const [isBackgroundsOpen, setIsBackgroundsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [reactions, setReactions] = useState<string[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);

  // Simulate reaction animation
  const addReaction = (emoji: string) => {
    setReactions(prev => [...prev, emoji]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r !== emoji));
    }, 3000);
  };

  return (
    <>
      <div className={cn(
        "fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-dark-1/90 backdrop-blur-md rounded-full px-4 py-3 flex items-center gap-2 shadow-card border border-dark-3/30",
        className
      )}>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "rounded-full size-12",
            isMuted ? "bg-red-500 hover:bg-red-600" : "bg-dark-3 hover:bg-dark-4"
          )}
          onClick={() => setIsMuted(!isMuted)}
        >
          <Image 
            src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"} 
            width={24} 
            height={24} 
            alt={isMuted ? "Unmute" : "Mute"} 
          />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "rounded-full size-12",
            isVideoOff ? "bg-red-500 hover:bg-red-600" : "bg-dark-3 hover:bg-dark-4"
          )}
          onClick={() => setIsVideoOff(!isVideoOff)}
        >
          <Image 
            src={isVideoOff ? "/icons/video-off.svg" : "/icons/video-on.svg"} 
            width={24} 
            height={24} 
            alt={isVideoOff ? "Turn video on" : "Turn video off"} 
          />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "rounded-full size-12",
            isScreenSharing ? "bg-green-1 hover:bg-green-2" : "bg-dark-3 hover:bg-dark-4"
          )}
          onClick={() => setIsScreenSharing(!isScreenSharing)}
        >
          <Image 
            src="/icons/screen-share.svg" 
            width={24} 
            height={24} 
            alt="Screen share" 
          />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "rounded-full size-12",
            isRecording ? "bg-red-500 hover:bg-red-600" : "bg-dark-3 hover:bg-dark-4"
          )}
          onClick={() => setIsRecording(!isRecording)}
        >
          <div className="relative">
            <Image 
              src="/icons/record.svg" 
              width={24} 
              height={24} 
              alt="Record" 
            />
            {isRecording && (
              <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </div>
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "rounded-full size-12",
            isHandRaised ? "bg-yellow-1 hover:bg-yellow-2" : "bg-dark-3 hover:bg-dark-4"
          )}
          onClick={() => setIsHandRaised(!isHandRaised)}
        >
          <Image 
            src="/icons/hand-raise.svg" 
            width={24} 
            height={24} 
            alt="Raise hand" 
          />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full size-12 bg-dark-3 hover:bg-dark-4"
          onClick={() => setIsWhiteboardOpen(true)}
        >
          <Image 
            src="/icons/whiteboard.svg" 
            width={24} 
            height={24} 
            alt="Whiteboard" 
          />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full size-12 bg-dark-3 hover:bg-dark-4"
          onClick={() => setIsTranscriptionOpen(true)}
        >
          <Image 
            src="/icons/transcription.svg" 
            width={24} 
            height={24} 
            alt="Live transcription" 
          />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full size-12 bg-dark-3 hover:bg-dark-4"
          onClick={() => setIsBackgroundsOpen(true)}
        >
          <Image 
            src="/icons/background.svg" 
            width={24} 
            height={24} 
            alt="Virtual backgrounds" 
          />
        </Button>

        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full size-12 bg-dark-3 hover:bg-dark-4"
          >
            <Image 
              src="/icons/reactions.svg" 
              width={24} 
              height={24} 
              alt="Reactions" 
            />
          </Button>
          
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-dark-1 rounded-full p-2 shadow-card border border-dark-3/30 flex gap-1">
            {["👍", "👏", "❤️", "😂", "😮"].map(emoji => (
              <button 
                key={emoji} 
                className="hover:bg-dark-3 rounded-full p-1 transition-all"
                onClick={() => addReaction(emoji)}
              >
                <span className="text-xl">{emoji}</span>
              </button>
            ))}
          </div>
        </div>

        <Button 
          variant="destructive" 
          size="icon" 
          className="rounded-full size-12 ml-2"
        >
          <Image 
            src="/icons/end-call.svg" 
            width={24} 
            height={24} 
            alt="End call" 
          />
        </Button>
      </div>

      {/* Reactions floating animation */}
      <div className="fixed bottom-24 left-1/2 pointer-events-none">
        {reactions.map((emoji, i) => (
          <div 
            key={`${emoji}-${i}`} 
            className="absolute animate-float text-3xl"
            style={{
              left: `${Math.random() * 100 - 50}px`,
              animationDuration: `${2 + Math.random()}s`,
              animationDelay: `${Math.random() * 0.5}s`
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Feature modals */}
      <CollaborativeWhiteboard 
        isOpen={isWhiteboardOpen} 
        onClose={() => setIsWhiteboardOpen(false)} 
      />
      
      <LiveTranscription 
        isOpen={isTranscriptionOpen} 
        onClose={() => setIsTranscriptionOpen(false)} 
      />
      
      <VirtualBackgrounds 
        isOpen={isBackgroundsOpen} 
        onClose={() => setIsBackgroundsOpen(false)}
        onSelectBackground={setSelectedBackground}
      />
    </>
  );
};

export default EnhancedMeetingControls; 