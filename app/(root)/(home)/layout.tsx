import { Metadata } from 'next';
import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import AIAssistant from '@/components/AIAssistant';

export const metadata: Metadata = {
  title: 'MeetSync',
  description: 'Next-generation video conferencing platform',
};

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className="relative bg-gradient-to-b from-secondary-950 to-secondary-900 min-h-screen text-white">
      <Navbar />

      <div className="flex">
        <Sidebar />
        
        <section className="flex min-h-screen flex-1 flex-col px-4 pb-8 pt-20 md:pl-[200px] md:pr-6 lg:px-8 lg:pl-[200px]">
          <div className="w-full max-w-7xl mx-auto">{children}</div>
        </section>
      </div>
      
      <AIAssistant />
    </main>
  );
};

export default RootLayout;
