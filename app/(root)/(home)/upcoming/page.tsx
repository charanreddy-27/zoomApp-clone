'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import MeetingCard from '@/components/MeetingCard';
import Image from 'next/image';
import Link from 'next/link';

// Sample data for upcoming meetings
const upcomingMeetings = [
  {
    id: '1',
    title: 'Weekly Team Standup',
    date: '2023-06-15',
    time: '10:00 AM',
    duration: 30,
    participants: 6,
    host: 'John Doe',
    type: 'recurring'
  },
  {
    id: '2',
    title: 'Product Review',
    date: '2023-06-15',
    time: '2:00 PM',
    duration: 45,
    participants: 4,
    host: 'Sarah Johnson',
    type: 'scheduled'
  },
  {
    id: '3',
    title: 'Client Presentation',
    date: '2023-06-16',
    time: '11:30 AM',
    duration: 60,
    participants: 8,
    host: 'John Doe',
    type: 'scheduled'
  },
  {
    id: '4',
    title: 'Marketing Strategy',
    date: '2023-06-17',
    time: '3:00 PM',
    duration: 45,
    participants: 5,
    host: 'Emily Chen',
    type: 'scheduled'
  }
];

const UpcomingPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Upcoming Meetings</h1>
          <p className="text-secondary-400 mt-1">Your scheduled meetings for the next 7 days</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-secondary-700 bg-secondary-800 hover:bg-secondary-700"
          >
            <Image src="/icons/calendar.svg" width={18} height={18} alt="Calendar" className="mr-2" />
            Calendar View
          </Button>
          <Button 
            className="bg-primary-600 hover:bg-primary-700 text-white"
          >
            <Image src="/icons/add-meeting.svg" width={18} height={18} alt="Schedule" className="mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-secondary-900 rounded-lg border border-secondary-800">
        <div className="size-10 rounded-full bg-primary-600/20 flex items-center justify-center">
          <Image src="/icons/calendar.svg" width={20} height={20} alt="Today" />
        </div>
        <div>
          <p className="font-medium">Today, Thursday</p>
          <p className="text-sm text-secondary-400">You have 2 meetings scheduled</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingMeetings.slice(0, 2).map((meeting) => (
          <MeetingCard 
            key={meeting.id}
            title={meeting.title}
            time={meeting.time}
            date="Today"
            duration={meeting.duration}
            participants={meeting.participants}
            id={meeting.id}
            isUpcoming={true}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 p-4 bg-secondary-900 rounded-lg border border-secondary-800">
        <div className="size-10 rounded-full bg-primary-600/20 flex items-center justify-center">
          <Image src="/icons/calendar.svg" width={20} height={20} alt="Tomorrow" />
        </div>
        <div>
          <p className="font-medium">Tomorrow, Friday</p>
          <p className="text-sm text-secondary-400">You have 1 meeting scheduled</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingMeetings.slice(2, 3).map((meeting) => (
          <MeetingCard 
            key={meeting.id}
            title={meeting.title}
            time={meeting.time}
            date="Tomorrow"
            duration={meeting.duration}
            participants={meeting.participants}
            id={meeting.id}
            isUpcoming={true}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 p-4 bg-secondary-900 rounded-lg border border-secondary-800">
        <div className="size-10 rounded-full bg-primary-600/20 flex items-center justify-center">
          <Image src="/icons/calendar.svg" width={20} height={20} alt="Saturday" />
        </div>
        <div>
          <p className="font-medium">Saturday</p>
          <p className="text-sm text-secondary-400">You have 1 meeting scheduled</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingMeetings.slice(3, 4).map((meeting) => (
          <MeetingCard 
            key={meeting.id}
            title={meeting.title}
            time={meeting.time}
            date="Saturday"
            duration={meeting.duration}
            participants={meeting.participants}
            id={meeting.id}
            isUpcoming={true}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingPage;
