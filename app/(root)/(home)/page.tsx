import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <section className="flex size-full flex-col gap-6 text-white animate-fade-in">
      <div className="h-[320px] w-full rounded-[24px] bg-hero bg-cover shadow-card overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-1/70 to-transparent"></div>
        <div className="relative flex h-full flex-col justify-between max-md:px-6 max-md:py-8 lg:p-12">
          <div className="flex items-center">
            <h2 className="glassmorphism max-w-[280px] rounded-full py-2.5 px-4 text-center text-base font-medium shadow-soft animate-pulse-gentle">
              Upcoming Meeting at: 12:30 PM
            </h2>
          </div>
          <div className="flex flex-col gap-3 animate-slide-up">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
