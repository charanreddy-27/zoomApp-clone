import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  return (
    <div className="min-h-screen bg-secondary-950">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 ml-0 md:ml-[240px] pt-20 px-4 md:px-8 lg:px-16">
          {children}
        </main>
      </div>
    </div>
  );
}
