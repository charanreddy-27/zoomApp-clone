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
    <aside className="hidden md:flex flex-col h-screen w-[220px] bg-secondary-900 border-r border-secondary-800 fixed left-0 top-0 pt-20">
      <div className="flex flex-col flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          
          return (
            <Link
              href={item.route}
              key={item.label}
              prefetch={true}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                isActive 
                  ? 'bg-primary-600/20 text-primary-400' 
                  : 'text-secondary-100 hover:bg-secondary-800'
              )}
            >
              <div className="relative flex-shrink-0 size-5">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={cn({
                    "text-primary-400": isActive
                  })}
                />
                {isActive && (
                  <span className="absolute -right-0.5 -top-0.5 size-2 bg-primary-500 rounded-full animate-pulse" />
                )}
              </div>
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="p-3 border-t border-secondary-800">
        <Link
          href="/meeting/new"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Image 
            src="/icons/add-meeting.svg" 
            alt="New Meeting" 
            width={18} 
            height={18} 
          />
          <span className="text-sm font-medium">New Meeting</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
