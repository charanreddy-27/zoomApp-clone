'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useState } from 'react';

// Sample data for recordings
const recordings = [
  {
    id: '201',
    title: 'Weekly Team Standup',
    date: 'June 8, 2023',
    duration: '28:15',
    size: '42 MB',
    thumbnail: '/images/recording-thumbnail-1.jpg'
  },
  {
    id: '202',
    title: 'Product Demo',
    date: 'June 7, 2023',
    duration: '42:30',
    size: '68 MB',
    thumbnail: '/images/recording-thumbnail-2.jpg'
  },
  {
    id: '203',
    title: 'Client Onboarding',
    date: 'June 5, 2023',
    duration: '55:10',
    size: '84 MB',
    thumbnail: '/images/recording-thumbnail-3.jpg'
  },
  {
    id: '204',
    title: 'Design Review',
    date: 'June 2, 2023',
    duration: '38:45',
    size: '56 MB',
    thumbnail: '/images/recording-thumbnail-4.jpg'
  },
  {
    id: '205',
    title: 'Marketing Strategy',
    date: 'June 1, 2023',
    duration: '45:20',
    size: '72 MB',
    thumbnail: '/images/recording-thumbnail-5.jpg'
  }
];

const RecordingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const filteredRecordings = recordings.filter(recording => 
    recording.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Recordings</h1>
          <p className="text-secondary-400 mt-1">Access your meeting recordings</p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-full md:w-auto md:min-w-[250px]">
            <input
              type="text"
              placeholder="Search recordings..."
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
          <Button 
            variant="outline" 
            className="border-secondary-700 bg-secondary-800 hover:bg-secondary-700"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M4 8H12M2 4H14M6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Filter
          </Button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        <button 
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${selectedFilter === 'all' ? 'bg-primary-600 text-white' : 'bg-secondary-800 text-secondary-300'}`}
          onClick={() => setSelectedFilter('all')}
        >
          All Recordings
        </button>
        <button 
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${selectedFilter === 'recent' ? 'bg-primary-600 text-white' : 'bg-secondary-800 text-secondary-300'}`}
          onClick={() => setSelectedFilter('recent')}
        >
          Recent
        </button>
        <button 
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${selectedFilter === 'shared' ? 'bg-primary-600 text-white' : 'bg-secondary-800 text-secondary-300'}`}
          onClick={() => setSelectedFilter('shared')}
        >
          Shared with me
        </button>
        <button 
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${selectedFilter === 'favorites' ? 'bg-primary-600 text-white' : 'bg-secondary-800 text-secondary-300'}`}
          onClick={() => setSelectedFilter('favorites')}
        >
          Favorites
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecordings.map((recording) => (
          <RecordingCard key={recording.id} recording={recording} />
        ))}
      </div>
      
      {filteredRecordings.length === 0 && (
        <div className="text-center py-12">
          <div className="size-16 bg-secondary-800 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 10L19 14M19 10L15 14M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No recordings found</h3>
          <p className="text-secondary-400">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
};

interface RecordingCardProps {
  recording: {
    id: string;
    title: string;
    date: string;
    duration: string;
    size: string;
    thumbnail: string;
  };
}

const RecordingCard = ({ recording }: RecordingCardProps) => {
  return (
    <Card className="bg-secondary-900 border-secondary-800 overflow-hidden">
      <div className="relative aspect-video bg-secondary-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-14 rounded-full bg-black/50 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 4.99999L19 12L5 19V4.99999Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {recording.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{recording.title}</h3>
        <div className="flex items-center justify-between text-sm text-secondary-400">
          <span>{recording.date}</span>
          <span>{recording.size}</span>
        </div>
        <div className="flex gap-2 mt-4">
          <Button 
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white"
            size="sm"
          >
            Watch
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-secondary-700 bg-secondary-800 hover:bg-secondary-700"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3334 6H8.00008V2L2.66675 8L8.00008 14V10H13.3334V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-secondary-700 bg-secondary-800 hover:bg-secondary-700"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.00008 3.33334V12.6667M3.33341 8.00001H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RecordingsPage;
