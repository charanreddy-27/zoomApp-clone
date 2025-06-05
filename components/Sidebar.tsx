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
    <aside className="hidden md:flex flex-col h-screen w-[200px] bg-secondary-900/95 border-r border-secondary-800/70 fixed left-0 top-0 pt-16">
      <div className="flex flex-col flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          
          return (
            <Link
              href={item.route}
              key={item.label}
              prefetch={true}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-sm',
                isActive 
                  ? 'bg-primary-600/20 text-primary-400' 
                  : 'text-secondary-200 hover:bg-secondary-800 hover:text-white'
              )}
            >
              <div className="relative flex-shrink-0 size-4">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={16}
                  height={16}
                  className={cn({
                    "text-primary-400": isActive
                  })}
                />
                {isActive && (
                  <span className="absolute -right-0.5 -top-0.5 size-1.5 bg-primary-500 rounded-full animate-pulse" />
                )}
              </div>
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="p-2 border-t border-secondary-800/70">
        <Link
          href="/meeting/new"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Image 
            src="/icons/add-meeting.svg" 
            alt="New Meeting" 
            width={16} 
            height={16} 
          />
          <span className="text-sm font-medium">New Meeting</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
