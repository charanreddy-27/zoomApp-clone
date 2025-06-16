'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { label: 'Home', route: '/', imgURL: '/icons/home.svg' },
  { label: 'Personal Room', route: '/personal-room', imgURL: '/icons/room.svg' },
  { label: 'Upcoming', route: '/upcoming', imgURL: '/icons/calendar.svg' },
  { label: 'Previous', route: '/previous', imgURL: '/icons/history.svg' },
  { label: 'Recordings', route: '/recordings', imgURL: '/icons/recording.svg' },
  { label: 'Join Meeting', route: '/meeting/join', imgURL: '/icons/join.svg' },
  { label: 'Settings', route: '/settings', imgURL: '/icons/settings.svg' },
  { label: 'Support', route: '/support', imgURL: '/icons/support.svg' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Prefetch all routes for instant navigation
  useEffect(() => {
    sidebarLinks.forEach(link => {
      router.prefetch(link.route);
    });
  }, [router]);

  return (
    <aside className="hidden md:flex flex-col h-screen w-[240px] bg-gradient-to-b from-secondary-900 to-secondary-950 border-r border-secondary-800/50 fixed left-0 top-0 z-40">
      <div className="flex flex-col flex-1 overflow-y-auto pt-16 pb-4 px-3 scrollbar-thin scrollbar-thumb-secondary-700 scrollbar-track-transparent">
        <div className="space-y-1.5">
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
            
            return (
              <Link
                href={item.route}
                key={item.label}
                prefetch={true}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm',
                  isActive 
                    ? 'bg-gradient-to-r from-purple-500/20 to-accent-600/20 text-purple-400 shadow-sm' 
                    : 'text-secondary-300 hover:bg-secondary-800/80 hover:text-white'
                )}
              >
                <div className="relative flex-shrink-0 size-5 flex items-center justify-center">
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={18}
                    height={18}
                    className={cn(
                      "brightness-110 contrast-125",
                      isActive ? "text-purple-400 filter-none" : "opacity-80"
                    )}
                  />
                  {isActive && (
                    <span className="absolute -right-0.5 -top-0.5 size-2 bg-purple-500 rounded-full animate-pulse" />
                  )}
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      
      <div className="p-3 mt-auto border-t border-secondary-800/50 bg-secondary-900/95">
        <div className="space-y-2.5">
          <Link
            href="/meeting/new"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-gradient-to-r from-purple-500 to-accent-600 hover:from-purple-600 hover:to-accent-700 text-white rounded-lg transition-all shadow-md"
          >
            <Image 
              src="/icons/add-meeting.svg" 
              alt="New Meeting" 
              width={16} 
              height={16} 
              className="brightness-110"
            />
            <span className="text-sm font-medium">New Meeting</span>
          </Link>
          
          <Link
            href="/meeting/join"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-secondary-800 hover:bg-secondary-750 text-white rounded-lg transition-colors border border-secondary-700/50"
          >
            <Image 
              src="/icons/join.svg" 
              alt="Join Meeting" 
              width={16} 
              height={16} 
              className="brightness-110"
            />
            <span className="text-sm font-medium">Join Meeting</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
