import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10 shadow-soft backdrop-blur-sm bg-opacity-90">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="relative overflow-hidden">
          <Image
            src="/icons/logo.svg"
            width={36}
            height={36}
            alt="MEET HERE logo"
            className="max-sm:size-10 transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-blue-3 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </div>
        <p className="text-[28px] font-extrabold text-white max-sm:hidden transition-all duration-300 group-hover:text-blue-3">
          MEET HERE
        </p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton 
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                userButtonAvatarBox: "hover:scale-110 transition-transform duration-300"
              }
            }}
          />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
