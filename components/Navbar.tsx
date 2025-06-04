'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

import MobileNav from './MobileNav';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Performance optimized scroll listener with throttling
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (window.scrollY > 10) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-200",
        scrolled 
          ? "bg-secondary-900/90 backdrop-blur-md py-2 shadow-md" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
          prefetch={true}
        >
          <div className="relative size-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-accent-500 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
            <Image
              src="/icons/logo.svg"
              width={40}
              height={40}
              alt="MeetSync"
              className="relative z-10 p-1.5"
              priority
            />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400 hidden sm:block">
            MeetSync
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/support">Support</NavLink>
        </nav>
        
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  userButtonAvatarBox: "hover:scale-105 transition-transform"
                }
              }}
            />
          </SignedIn>

          <MobileNav />
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link 
      href={href}
      className="text-secondary-100 hover:text-white transition-colors relative group py-1 px-1"
      prefetch={true}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
};

export default Navbar;
