'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Prefetch all routes for instant navigation
  useEffect(() => {
    sidebarLinks.forEach(link => {
      router.prefetch(link.route);
    });
  }, [router]);

  const handleNavigation = (route: string) => {
    // Direct DOM navigation for even faster transitions
    window.location.href = route;
  };

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px] shadow-soft border-r border-dark-3/30">
      <div className="flex flex-1 flex-col gap-5">
        {sidebarLinks.map((item, index) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          
          return (
            <div
              key={item.label}
              onClick={() => handleNavigation(item.route)}
              className={cn(
                'flex gap-4 items-center p-4 rounded-xl transition-all duration-200 cursor-pointer',
                {
                  'bg-blue-1 shadow-button': isActive,
                  'hover:bg-dark-3/50': !isActive,
                }
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={24}
                  height={24}
                  className={cn("transition-transform duration-200", {
                    "scale-110": isActive
                  })}
                  priority={true}
                />
                {isActive && (
                  <span className="absolute -bottom-1 -right-1 size-2 bg-white rounded-full animate-pulse-gentle" />
                )}
              </div>
              <p className={cn("text-lg font-medium max-lg:hidden transition-all duration-200", {
                "font-semibold": isActive
              })}>
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
