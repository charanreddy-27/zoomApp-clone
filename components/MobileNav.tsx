'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', route: '/', icon: '/icons/home.svg' },
  { label: 'Personal Room', route: '/personal-room', icon: '/icons/room.svg' },
  { label: 'Upcoming', route: '/upcoming', icon: '/icons/calendar.svg' },
  { label: 'Previous', route: '/previous', icon: '/icons/history.svg' },
  { label: 'Recordings', route: '/recordings', icon: '/icons/recording.svg' },
  { label: 'Features', route: '/features', icon: '/icons/features.svg' },
  { label: 'Pricing', route: '/pricing', icon: '/icons/pricing.svg' },
  { label: 'Support', route: '/support', icon: '/icons/support.svg' },
];

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  // Prefetch all routes for instant navigation
  useEffect(() => {
    navLinks.forEach(link => {
      router.prefetch(link.route);
    });
  }, [router]);

  const handleNavigation = (route: string) => {
    setIsOpen(false);
    router.push(route);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button 
            className="flex flex-col gap-1 p-1.5 focus:outline-none" 
            aria-label="Menu"
          >
            <span className={cn(
              "block w-5 h-0.5 bg-white transition-all duration-300",
              isOpen && "translate-y-1.5 rotate-45"
            )}></span>
            <span className={cn(
              "block w-5 h-0.5 bg-white transition-all duration-300",
              isOpen && "opacity-0"
            )}></span>
            <span className={cn(
              "block w-5 h-0.5 bg-white transition-all duration-300",
              isOpen && "-translate-y-1.5 -rotate-45"
            )}></span>
          </button>
        </SheetTrigger>
        
        <SheetContent 
          side="right" 
          className="w-full max-w-[280px] p-0 border-none bg-secondary-900"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-secondary-800">
              <div className="flex items-center gap-2">
                <div className="relative size-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-accent-500 rounded-lg" />
                  <Image
                    src="/icons/logo.svg"
                    width={32}
                    height={32}
                    alt="MeetSync"
                    className="relative z-10 p-1"
                    priority
                  />
                </div>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                  MeetSync
                </span>
              </div>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                  
                  return (
                    <li key={link.route}>
                      <button
                        onClick={() => handleNavigation(link.route)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-3",
                          isActive 
                            ? "bg-primary-600/20 text-primary-400" 
                            : "text-secondary-200 hover:bg-secondary-800 hover:text-white"
                        )}
                      >
                        <div className="relative flex-shrink-0 size-4">
                          <Image
                            src={link.icon}
                            alt=""
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
                        <span className="text-sm font-medium">{link.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            <div className="p-3 border-t border-secondary-800">
              <div className="flex flex-col gap-3">
                <button 
                  className="w-full py-2 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  onClick={() => handleNavigation('/meeting/new')}
                >
                  <Image 
                    src="/icons/add-meeting.svg" 
                    alt="" 
                    width={16} 
                    height={16} 
                  />
                  New Meeting
                </button>
                <button 
                  className="w-full py-2 px-3 bg-secondary-800 hover:bg-secondary-700 text-white rounded-lg transition-colors text-sm font-medium"
                  onClick={() => handleNavigation('/sign-out')}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
