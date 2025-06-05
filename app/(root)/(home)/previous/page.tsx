'use client';

import { Button } from '@/components/ui/button';
import MeetingCard from '@/components/MeetingCard';
import Image from 'next/image';
import { useState } from 'react';

// Sample data for previous meetings
const previousMeetings = [
  {
    id: '101',
    title: 'Weekly Team Standup',
    date: 'June 8, 2023',
    time: '10:00 AM',
    duration: 28,
    participants: 6,
  },
  {
    id: '102',
    title: 'Product Demo',
    date: 'June 7, 2023',
    time: '2:00 PM',
    duration: 42,
    participants: 8,
  },
  {
    id: '103',
    title: 'Client Onboarding',
    date: 'June 5, 2023',
    time: '11:30 AM',
    duration: 55,
    participants: 4,
  },
  {
    id: '104',
    title: 'Design Review',
    date: 'June 2, 2023',
    time: '3:00 PM',
    duration: 38,
    participants: 5,
  },
  {
    id: '105',
    title: 'Marketing Strategy',
    date: 'June 1, 2023',
    time: '1:00 PM',
    duration: 45,
    participants: 7,
  },
  {
    id: '106',
    title: 'Budget Planning',
    date: 'May 30, 2023',
    time: '11:00 AM',
    duration: 62,
    participants: 4,
  }
];

const PreviousPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredMeetings = previousMeetings.filter(meeting => 
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Previous Meetings</h1>
          <p className="text-secondary-400 mt-1">Access recordings and notes from past meetings</p>
        </div>
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <input
            type="text"
            placeholder="Search meetings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary-800 border border-secondary-700 rounded-lg py-2 px-4 pl-10 text-white placeholder:text-secondary-400"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14L11 11" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-secondary-900 rounded-lg border border-secondary-800">
        <div className="size-10 rounded-full bg-primary-600/20 flex items-center justify-center">
          <Image src="/icons/history.svg" width={20} height={20} alt="History" />
        </div>
        <div>
          <p className="font-medium">Recent Meetings</p>
          <p className="text-sm text-secondary-400">Last 30 days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMeetings.map((meeting) => (
          <MeetingCard 
            key={meeting.id}
            id={meeting.id}
            title={meeting.title}
            date={meeting.date}
            time={meeting.time}
            duration={meeting.duration}
            participants={meeting.participants}
            isPrevious={true}
          />
        ))}
      </div>
      
      {filteredMeetings.length === 0 && (
        <div className="text-center py-12">
          <div className="size-16 bg-secondary-800 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No meetings found</h3>
          <p className="text-secondary-400">Try adjusting your search query</p>
        </div>
      )}
      
      {filteredMeetings.length > 0 && filteredMeetings.length < previousMeetings.length && (
        <div className="text-center">
          <p className="text-secondary-400">
            Showing {filteredMeetings.length} of {previousMeetings.length} meetings
          </p>
        </div>
      )}
    </div>
  );
};

export default PreviousPage;
