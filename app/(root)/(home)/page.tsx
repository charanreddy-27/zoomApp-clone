'use client';

import MeetingTypeList from '@/components/MeetingTypeList';
import AIAssistant from '@/components/AIAssistant';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-950 to-secondary-900 pb-16">
      {/* Header section with animated particles */}
      <section className="relative pt-24 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="particles-container">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="particle absolute rounded-full bg-primary-500/20"
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 20 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-6 animate-fade">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-600/20 text-primary-400 text-sm mb-2">
              <span className="size-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
              Next-Generation Video Conferencing
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-gradient">MeetSync</span> <br />
              <span className="typewriter">Smarter Meetings.</span>
            </h1>
            <p className="text-lg text-secondary-300 max-w-lg">
              Experience seamless collaboration with AI-powered features, real-time tools, and superior performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                Start New Meeting
              </button>
              <button className="px-6 py-3 bg-secondary-800 hover:bg-secondary-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all group">
                Join Meeting
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] animate-fade">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="glass rounded-2xl p-6 w-full max-w-md transform hover:scale-[1.02] transition-transform duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg text-white">Today</h2>
                  <span className="text-primary-400">{time}</span>
                </div>
                <p className="text-secondary-300 mb-6">{date}</p>
                
                <div className="space-y-4">
                  <div className="bg-secondary-800/50 p-4 rounded-lg border border-secondary-700/50 hover-card">
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
                  
                  <div className="bg-secondary-800/50 p-4 rounded-lg border border-secondary-700/50 hover-card">
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
      
      {/* Features section with tabs */}
      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Why Choose MeetSync?</h2>
        <p className="text-center text-secondary-400 max-w-2xl mx-auto mb-8">Discover how our platform transforms your meeting experience with cutting-edge features</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </TabButton>
          <TabButton 
            active={activeTab === 'ai'} 
            onClick={() => setActiveTab('ai')}
          >
            AI Features
          </TabButton>
          <TabButton 
            active={activeTab === 'collaboration'} 
            onClick={() => setActiveTab('collaboration')}
          >
            Collaboration
          </TabButton>
          <TabButton 
            active={activeTab === 'security'} 
            onClick={() => setActiveTab('security')}
          >
            Security
          </TabButton>
        </div>
        
        <div className="tab-content animate-fade">
          {activeTab === 'overview' && (
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
          )}
          
          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="gradient" padding="lg" className="md:col-span-2">
                <h3 className="text-xl font-bold mb-4 text-gradient">AI-Powered Meeting Experience</h3>
                <p className="text-secondary-300 mb-4">Our advanced AI features transform how you conduct and follow up on meetings.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <AIFeatureItem title="Smart Summaries" description="AI automatically creates concise meeting summaries" />
                  <AIFeatureItem title="Action Item Detection" description="Identifies and tracks tasks mentioned during meetings" />
                  <AIFeatureItem title="Sentiment Analysis" description="Understands meeting mood and participant engagement" />
                  <AIFeatureItem title="Voice Commands" description="Control meetings with natural language instructions" />
                </div>
              </Card>
              <FeatureCard 
                icon="/icons/ai-assistant.svg"
                title="AI Meeting Assistant"
                description="Your personal meeting copilot that helps organize, summarize and extract key information."
              />
              <FeatureCard 
                icon="/icons/transcription.svg"
                title="Multilingual Transcription"
                description="Real-time transcription with support for over 30 languages and dialects."
              />
            </div>
          )}
          
          {activeTab === 'collaboration' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard 
                icon="/icons/whiteboard.svg"
                title="Interactive Whiteboard"
                description="Collaborate with multiple drawing tools, templates, and real-time editing."
              />
              <FeatureCard 
                icon="/icons/document.svg"
                title="Document Collaboration"
                description="Edit documents together during meetings with version history."
              />
              <FeatureCard 
                icon="/icons/polls.svg"
                title="Live Polls & Surveys"
                description="Gather feedback and make decisions with interactive polls."
              />
              <FeatureCard 
                icon="/icons/breakout.svg"
                title="Breakout Rooms"
                description="Split into smaller groups for focused discussions."
              />
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="gradient" padding="lg" className="md:col-span-2">
                <h3 className="text-xl font-bold mb-4 text-gradient">Enterprise-Grade Security</h3>
                <p className="text-secondary-300 mb-4">MeetSync provides end-to-end encryption and advanced security features to keep your meetings private and secure.</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="px-3 py-1 bg-secondary-800 rounded-full text-sm">End-to-End Encryption</span>
                  <span className="px-3 py-1 bg-secondary-800 rounded-full text-sm">SOC 2 Compliant</span>
                  <span className="px-3 py-1 bg-secondary-800 rounded-full text-sm">GDPR Compliant</span>
                  <span className="px-3 py-1 bg-secondary-800 rounded-full text-sm">HIPAA Compliant</span>
                  <span className="px-3 py-1 bg-secondary-800 rounded-full text-sm">SSO Integration</span>
                </div>
              </Card>
              <FeatureCard 
                icon="/icons/lock.svg"
                title="Meeting Access Control"
                description="Waiting rooms, password protection, and host controls."
              />
              <FeatureCard 
                icon="/icons/shield.svg"
                title="Data Protection"
                description="Your meeting data is encrypted at rest and in transit."
              />
            </div>
          )}
        </div>
      </section>
      
      {/* Stats section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="glass-dark rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <StatItem value="99.9%" label="Uptime" />
          <StatItem value="30+" label="Languages" />
          <StatItem value="256-bit" label="Encryption" />
          <StatItem value="24/7" label="Support" />
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
    <Card variant="default" hover="scale" padding="lg">
      <CardContent className="flex flex-col items-center text-center">
        <div className="size-12 rounded-lg bg-primary-600/20 flex items-center justify-center mb-4">
          <Image src={icon} alt={title} width={24} height={24} />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-secondary-400">{description}</p>
      </CardContent>
    </Card>
  );
};

interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ children, active, onClick }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg transition-all",
        active 
          ? "bg-primary-600 text-white shadow-md" 
          : "bg-secondary-800/50 text-secondary-300 hover:bg-secondary-800 hover:text-white"
      )}
    >
      {children}
    </button>
  );
};

interface AIFeatureItemProps {
  title: string;
  description: string;
}

const AIFeatureItem = ({ title, description }: AIFeatureItemProps) => {
  return (
    <div className="flex gap-3">
      <div className="size-6 rounded-full bg-primary-600/30 flex-shrink-0 flex items-center justify-center mt-1">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <h4 className="font-medium text-white">{title}</h4>
        <p className="text-sm text-secondary-400">{description}</p>
      </div>
    </div>
  );
};

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => {
  return (
    <div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-secondary-400">{label}</div>
    </div>
  );
};

export default Home;
