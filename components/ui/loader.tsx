import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Loader = ({ className, size = 'md' }: LoaderProps) => {
  const sizeClasses = {
    sm: 'size-4 border-2',
    md: 'size-8 border-3',
    lg: 'size-12 border-4',
  };

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[100px]">
      <div 
        className={cn(
          "border-t-transparent border-primary-500 rounded-full animate-spin",
          sizeClasses[size],
          className
        )}
        style={{ borderStyle: 'solid' }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loader; 