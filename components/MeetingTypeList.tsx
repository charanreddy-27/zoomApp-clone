/* eslint-disable camelcase */
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const meetingTypes = [
  {
    id: 'instant',
    title: 'Instant Meeting',
    description: 'Start a meeting right now',
    icon: '/icons/instant-meeting.svg',
    color: 'from-primary-600 to-primary-800',
    hoverColor: 'group-hover:from-primary-500 group-hover:to-primary-700',
    badge: { text: 'Popular', variant: 'gradient' as const }
  },
  {
    id: 'schedule',
    title: 'Schedule Meeting',
    description: 'Plan for later',
    icon: '/icons/schedule.svg',
    color: 'from-accent-600 to-accent-800',
    hoverColor: 'group-hover:from-accent-500 group-hover:to-accent-700',
  },
  {
    id: 'join',
    title: 'Join Meeting',
    description: 'Via invitation code',
    icon: '/icons/join.svg',
    color: 'from-secondary-600 to-secondary-800',
    hoverColor: 'group-hover:from-secondary-500 group-hover:to-secondary-700',
  },
  {
    id: 'personal',
    title: 'Personal Room',
    description: 'Your permanent meeting space',
    icon: '/icons/personal.svg',
    color: 'from-warning-600 to-warning-800',
    hoverColor: 'group-hover:from-warning-500 group-hover:to-warning-700',
    badge: { text: 'New', variant: 'success' as const }
  },
];

const MeetingTypeList = () => {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    switch (id) {
      case 'instant':
        router.push('/meeting/new');
        break;
      case 'schedule':
        router.push('/upcoming/schedule');
        break;
      case 'join':
        router.push('/meeting/join');
        break;
      case 'personal':
        router.push('/personal-room');
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {meetingTypes.map((type) => (
        <Card
          key={type.id}
          variant="default"
          hover="scale"
          padding="lg"
          className="group relative cursor-pointer flex flex-col items-center text-center"
          onClick={() => handleClick(type.id)}
          onMouseEnter={() => setHoveredId(type.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className={cn(
            "absolute inset-0 rounded-xl opacity-10 bg-gradient-to-br transition-all duration-300",
            type.color,
            type.hoverColor
          )}></div>
          
          {type.badge && (
            <Badge 
              variant={type.badge.variant} 
              className="absolute top-3 right-3"
            >
              {type.badge.text}
            </Badge>
          )}
          
          <div className={cn(
            "size-16 rounded-full mb-4 flex items-center justify-center bg-gradient-to-br transition-all duration-300",
            type.color,
            type.hoverColor
          )}>
            <Image 
              src={type.icon} 
              alt={type.title} 
              width={28} 
              height={28} 
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          <h3 className="text-lg font-semibold mb-1">{type.title}</h3>
          <p className="text-sm text-secondary-400">{type.description}</p>
          
          <div className={cn(
            "mt-4 size-8 rounded-full flex items-center justify-center bg-gradient-to-br transition-all duration-300 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
            type.color,
            type.hoverColor
          )}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1L13 7M13 7L7 13M13 7H1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MeetingTypeList;
