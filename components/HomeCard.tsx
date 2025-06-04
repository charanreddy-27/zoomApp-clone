'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <section
      className={cn(
        'bg-orange-1 px-5 py-7 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[16px] cursor-pointer hover-card shadow-card transition-all duration-300',
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-14 rounded-[12px] shadow-soft">
        <Image 
          src={img} 
          alt="meeting" 
          width={28} 
          height={28}
          className="animate-pulse-gentle" 
        />
      </div>
      
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal opacity-90">{description}</p>
      </div>
    </section>
  );
};

export default HomeCard;
