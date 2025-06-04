'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

// Simple loader component
const Loader = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[100px]">
    <div 
      className="size-8 border-3 border-t-transparent border-primary-500 rounded-full animate-spin"
      style={{ borderStyle: 'solid' }}
      role="status"
      aria-label="Loading"
    />
  </div>
);

interface StreamClientProviderProps {
  children: ReactNode;
}

const StreamClientProvider = ({ children }: StreamClientProviderProps) => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [isClientReady, setIsClientReady] = useState(false);
  
  // Performance optimization: Use lazy initialization and cleanup
  useEffect(() => {
    if (!isUserLoaded || !user) return;
    
    // API key from environment variable
    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    if (!apiKey) {
      console.error('Stream API key is missing');
      return;
    }
    
    // Create client with minimal initial options
    const streamClient = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.fullName || user.username || user.id,
        image: user.imageUrl,
      },
      // Token provider will be set during connection
    });
    
    // Connect user asynchronously
    const connectUser = async () => {
      try {
        // Get token from backend
        const response = await fetch('/api/get-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (!response.ok) {
          throw new Error('Failed to get token');
        }
        
        const { token } = await response.json();
        
        // Connect with token
        await streamClient.connectUser({ id: user.id }, token);
        setClient(streamClient);
        setIsClientReady(true);
      } catch (error) {
        console.error('Error connecting to Stream:', error);
      }
    };
    
    connectUser();
    
    // Cleanup on unmount
    return () => {
      const disconnect = async () => {
        if (streamClient) {
          await streamClient.disconnectUser();
          setClient(null);
          setIsClientReady(false);
        }
      };
      
      disconnect();
    };
  }, [user, isUserLoaded]);
  
  if (!isUserLoaded || !isClientReady) {
    return <Loader />;
  }
  
  return <>{client && children}</>;
};

export default StreamClientProvider;
