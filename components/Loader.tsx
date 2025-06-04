import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-3/30 rounded-full blur-xl animate-pulse"></div>
        <Image
          src="/icons/loading-circle.svg"
          alt="Loading..."
          width={60}
          height={60}
          className="animate-spin-slow relative z-10"
        />
      </div>
    </div>
  );
};

export default Loader;
