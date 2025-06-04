'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px] shadow-soft border-r border-dark-3/30">
      <div className="flex flex-1 flex-col gap-5">
        {sidebarLinks.map((item, index) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'flex gap-4 items-center p-4 rounded-xl transition-all duration-300',
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
                  className={cn("transition-transform duration-300", {
                    "scale-110": isActive
                  })}
                />
                {isActive && (
                  <span className="absolute -bottom-1 -right-1 size-2 bg-white rounded-full animate-pulse-gentle" />
                )}
              </div>
              <p className={cn("text-lg font-medium max-lg:hidden transition-all duration-300", {
                "font-semibold": isActive
              })}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
