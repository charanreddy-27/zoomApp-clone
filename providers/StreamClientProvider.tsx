'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    
    if (!API_KEY) {
      console.error('Stream API key is missing');
      setError('Stream API key is missing. Please check your environment variables.');
      return;
    }

    try {
      const client = new StreamVideoClient({
        apiKey: API_KEY,
        user: {
          id: user?.id,
          name: user?.username || user?.id,
          image: user?.imageUrl,
        },
        tokenProvider,
      });

      setVideoClient(client);
    } catch (err) {
      console.error('Error initializing Stream client:', err);
      setError('Failed to initialize video client');
    }
  }, [user, isLoaded]);

  if (error) {
    return (
      <div className="flex-center h-screen w-full flex-col">
        <p className="text-red-500">{error}</p>
        <p className="text-sm text-gray-400 mt-2">Check your environment variables configuration</p>
      </div>
    );
  }

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
