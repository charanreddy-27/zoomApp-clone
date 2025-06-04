'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', route: '/' },
  { label: 'Personal Room', route: '/personal-room' },
  { label: 'Upcoming', route: '/upcoming' },
  { label: 'Previous', route: '/previous' },
  { label: 'Recordings', route: '/recordings' },
  { label: 'Features', route: '/features' },
  { label: 'Pricing', route: '/pricing' },
  { label: 'Support', route: '/support' },
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
            className="flex flex-col gap-1.5 p-2 focus:outline-none" 
            aria-label="Menu"
          >
            <span className={cn(
              "block w-6 h-0.5 bg-white transition-all duration-300",
              isOpen && "translate-y-2 rotate-45"
            )}></span>
            <span className={cn(
              "block w-6 h-0.5 bg-white transition-all duration-300",
              isOpen && "opacity-0"
            )}></span>
            <span className={cn(
              "block w-6 h-0.5 bg-white transition-all duration-300",
              isOpen && "-translate-y-2 -rotate-45"
            )}></span>
          </button>
        </SheetTrigger>
        
        <SheetContent 
          side="right" 
          className="w-full max-w-[300px] p-0 border-none bg-secondary-900"
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-secondary-800">
              <div className="flex items-center gap-3">
                <div className="relative size-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-accent-500 rounded-lg" />
                  <Image
                    src="/icons/logo.svg"
                    width={40}
                    height={40}
                    alt="MeetSync"
                    className="relative z-10 p-1.5"
                    priority
                  />
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                  MeetSync
                </span>
              </div>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-6 px-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                  
                  return (
                    <li key={link.route}>
                      <button
                        onClick={() => handleNavigation(link.route)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3",
                          isActive 
                            ? "bg-primary-600/20 text-primary-400" 
                            : "text-secondary-100 hover:bg-secondary-800"
                        )}
                      >
                        <span className="text-lg">{link.label}</span>
                        {isActive && (
                          <span className="ml-auto">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            <div className="p-6 border-t border-secondary-800">
              <div className="flex flex-col gap-4">
                <button 
                  className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  onClick={() => handleNavigation('/meeting/new')}
                >
                  New Meeting
                </button>
                <button 
                  className="w-full py-2.5 px-4 bg-secondary-800 hover:bg-secondary-700 text-white rounded-lg transition-colors"
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
