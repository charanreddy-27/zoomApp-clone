"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import Link from "next/link";

interface MeetingCardProps {
  id: string;
  title: string;
  date: string;
  time?: string;
  duration?: number;
  participants?: number;
  isUpcoming?: boolean;
  isPrevious?: boolean;
}

const MeetingCard = ({
  id,
  title,
  date,
  time,
  duration,
  participants,
  isUpcoming = false,
  isPrevious = false,
}: MeetingCardProps) => {
  const { toast } = useToast();
  
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://meetsync.com'}/meeting/${id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    toast({
      title: "Link Copied",
      description: "Meeting link copied to clipboard"
    });
  };

  return (
    <div className="bg-secondary-900 rounded-lg border border-secondary-800 p-5 hover:border-secondary-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-secondary-400 mt-1">
            <span>{date}</span>
            {time && (
              <>
                <span className="size-1 rounded-full bg-secondary-600"></span>
                <span>{time}</span>
              </>
            )}
            {duration && (
              <>
                <span className="size-1 rounded-full bg-secondary-600"></span>
                <span>{duration} min</span>
              </>
            )}
          </div>
        </div>
        <div className="bg-primary-600/20 text-primary-400 text-xs px-2 py-1 rounded-full">
          {isUpcoming ? "Upcoming" : isPrevious ? "Previous" : "Meeting"}
        </div>
      </div>
      
      {participants && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex -space-x-2">
            {[...Array(Math.min(participants, 3))].map((_, i) => (
              <div 
                key={i} 
                className="size-8 rounded-full bg-secondary-700 border-2 border-secondary-900 flex items-center justify-center text-xs"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            {participants > 3 && (
              <div className="size-8 rounded-full bg-secondary-800 border-2 border-secondary-900 flex items-center justify-center text-xs">
                +{participants - 3}
              </div>
            )}
          </div>
          <span className="text-sm text-secondary-400">{participants} participants</span>
        </div>
      )}
      
      <div className="flex gap-2 mt-4">
        {isUpcoming && (
          <Link 
            href={`/meeting/${id}`}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-3 rounded-md text-sm font-medium text-center"
          >
            Join Meeting
          </Link>
        )}
        
        {isPrevious && (
          <Link 
            href={`/recordings/${id}`}
            className="flex-1 bg-secondary-800 hover:bg-secondary-700 text-white py-2 px-3 rounded-md text-sm font-medium text-center"
          >
            View Recording
          </Link>
        )}
        
        <button 
          onClick={handleCopyLink}
          className="bg-secondary-800 hover:bg-secondary-700 text-white py-2 px-3 rounded-md text-sm font-medium flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M13.3334 6H8.00008V2L2.66675 8L8.00008 14V10H13.3334V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Share
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;
