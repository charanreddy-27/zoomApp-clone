'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Prefetch all routes for instant navigation
  useEffect(() => {
    sidebarLinks.forEach(link => {
      router.prefetch(link.route);
    });
  }, [router]);

  const handleNavigation = (route: string, closeSheet: () => void) => {
    closeSheet();
    // Direct DOM navigation for even faster transitions
    window.location.href = route;
  };

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        {({ open, setOpen }) => (
          <>
            <SheetTrigger asChild>
              <div className="relative group cursor-pointer">
                <Image
                  src="/icons/hamburger.svg"
                  width={38}
                  height={38}
                  alt="hamburger icon"
                  className="cursor-pointer sm:hidden transition-transform duration-200 group-hover:scale-105"
                  priority={true}
                />
                <div className="absolute inset-0 bg-blue-3 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="border-none bg-dark-1 shadow-lg">
              <div className="flex items-center gap-2 group" onClick={() => handleNavigation('/', () => setOpen(false))}>
                <div className="relative overflow-hidden">
                  <Image
                    src="/icons/logo.svg"
                    width={36}
                    height={36}
                    alt="MEET HERE logo"
                    className="transition-transform duration-200 group-hover:scale-110"
                    priority={true}
                  />
                  <div className="absolute inset-0 bg-blue-3 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                </div>
                <p className="text-[26px] font-extrabold text-white transition-all duration-200 group-hover:text-blue-3">
                  MEET HERE
                </p>
              </div>
              <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                <section className="flex h-full flex-col gap-5 pt-16 text-white">
                  {sidebarLinks.map((item, index) => {
                    const isActive = pathname === item.route;

                    return (
                      <div
                        key={item.route}
                        className={cn(
                          'flex gap-4 items-center p-4 rounded-xl w-full max-w-60 transition-all duration-200 animate-slide-up cursor-pointer',
                          {
                            'bg-blue-1 shadow-button': isActive,
                            'hover:bg-dark-3/50': !isActive,
                          }
                        )}
                        style={{ animationDelay: `${index * 0.05}s` }}
                        onClick={() => handleNavigation(item.route, () => setOpen(false))}
                      >
                        <div className="relative">
                          <Image
                            src={item.imgURL}
                            alt={item.label}
                            width={22}
                            height={22}
                            className={cn("transition-transform duration-200", {
                              "scale-110": isActive
                            })}
                            priority={true}
                          />
                          {isActive && (
                            <span className="absolute -bottom-1 -right-1 size-1.5 bg-white rounded-full animate-pulse-gentle" />
                          )}
                        </div>
                        <p className={cn("font-medium transition-all duration-200", {
                          "font-semibold": isActive
                        })}>
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </section>
              </div>
            </SheetContent>
          </>
        )}
      </Sheet>
    </section>
  );
};

export default MobileNav;
