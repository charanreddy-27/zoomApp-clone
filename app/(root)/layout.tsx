import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-950 to-secondary-900 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 ml-0 md:ml-[240px] pt-20 px-4 md:px-8 lg:px-12 transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
