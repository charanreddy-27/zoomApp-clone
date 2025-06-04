import MeetingTypeList from '@/components/MeetingTypeList';
import AIAssistant from '@/components/AIAssistant';
import Image from 'next/image';

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-950 to-secondary-900 pb-16">
      {/* Header section */}
      <section className="pt-24 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-gradient">Next-Generation</span> <br />
              Video Conferencing
            </h1>
            <p className="text-lg text-secondary-300 max-w-lg">
              Experience seamless meetings with AI-powered features, collaborative tools, and superior performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                Start New Meeting
              </button>
              <button className="px-6 py-3 bg-secondary-800 hover:bg-secondary-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                Join Meeting
              </button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] animate-fade">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="glass rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg text-white">Today</h2>
                  <span className="text-primary-400">{time}</span>
                </div>
                <p className="text-secondary-300 mb-6">{date}</p>
                
                <div className="space-y-4">
                  <div className="bg-secondary-800/50 p-4 rounded-lg border border-secondary-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Weekly Team Sync</h3>
                      <span className="text-sm text-primary-400">12:30 PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary-400">
                      <span>4 participants</span>
                      <span className="size-1 rounded-full bg-secondary-500"></span>
                      <span>30 min</span>
                    </div>
                  </div>
                  
                  <div className="bg-secondary-800/50 p-4 rounded-lg border border-secondary-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Product Review</h3>
                      <span className="text-sm text-primary-400">3:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary-400">
                      <span>6 participants</span>
                      <span className="size-1 rounded-full bg-secondary-500"></span>
                      <span>45 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meeting options section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Quick Actions</h2>
        <MeetingTypeList />
      </section>
      
      {/* Features section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Advanced Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon="/icons/ai-assistant.svg"
            title="AI Meeting Assistant"
            description="Get real-time meeting summaries, action items, and smart suggestions."
          />
          <FeatureCard 
            icon="/icons/whiteboard.svg"
            title="Collaborative Whiteboard"
            description="Draw and collaborate in real-time with your team."
          />
          <FeatureCard 
            icon="/icons/transcription.svg"
            title="Live Transcription"
            description="Automatic speech-to-text with multiple language support."
          />
          <FeatureCard 
            icon="/icons/background.svg"
            title="Virtual Backgrounds"
            description="Choose from a variety of backgrounds or upload your own."
          />
          <FeatureCard 
            icon="/icons/reactions.svg"
            title="Live Reactions"
            description="Express yourself with animated emoji reactions."
          />
          <FeatureCard 
            icon="/icons/recording.svg"
            title="Cloud Recording"
            description="Record meetings and access them anytime."
          />
        </div>
      </section>
      
      {/* AI Assistant is always available */}
      <AIAssistant />
    </div>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-secondary-800/50 p-6 rounded-xl border border-secondary-700/30 hover-card">
      <div className="size-12 rounded-lg bg-primary-600/20 flex items-center justify-center mb-4">
        <Image src={icon} alt={title} width={24} height={24} />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-secondary-400">{description}</p>
    </div>
  );
};

export default Home;
