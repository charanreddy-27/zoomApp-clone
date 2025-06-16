'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const SupportPage = () => {
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message sent",
        description: "We've received your message and will get back to you soon.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-2">Support & Contact</h1>
      <p className="text-secondary-400 mb-8">Get help or contact our team</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-secondary-900 border-secondary-800 p-6">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-secondary-800 border-secondary-700 mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary-800 border-secondary-700 mt-2"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What's your message about?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-secondary-800 border-secondary-700 mt-2"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-secondary-800 border-secondary-700 mt-2 min-h-32"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </Card>
          
          <Card className="bg-secondary-900 border-secondary-800 p-6">
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <FaqItem 
                question="How do I start a new meeting?" 
                answer="To start a new meeting, click on the 'Start New Meeting' button on the home page or navigate to the 'New Meeting' page. You can choose between an instant meeting or schedule a meeting for later."
              />
              
              <FaqItem 
                question="How do I invite participants to my meeting?" 
                answer="After creating a meeting, you can share the meeting ID or link with participants. They can use this information to join your meeting through the 'Join Meeting' page."
              />
              
              <FaqItem 
                question="How do I record a meeting?" 
                answer="During a meeting, click on the 'Record' button in the meeting controls at the bottom of the screen. All participants will be notified that the meeting is being recorded."
              />
              
              <FaqItem 
                question="Where can I find my recordings?" 
                answer="All your recordings can be found in the 'Recordings' section. You can view, download, or share these recordings from there."
              />
              
              <FaqItem 
                question="How do I change my audio/video settings?" 
                answer="Go to the 'Settings' page and select the 'Audio/Video' tab. Here you can select your preferred camera, microphone, and speakers, as well as enable features like noise suppression."
              />
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-secondary-900 border-secondary-800 p-6">
            <h2 className="text-lg font-bold mb-4">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-lg bg-primary-600/20 flex items-center justify-center mt-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 6.66667L9.0755 11.0755C9.63533 11.4439 10.3647 11.4439 10.9245 11.0755L17.5 6.66667M4.16667 15.8333H15.8333C16.7538 15.8333 17.5 15.0871 17.5 14.1667V5.83333C17.5 4.91286 16.7538 4.16667 15.8333 4.16667H4.16667C3.24619 4.16667 2.5 4.91286 2.5 5.83333V14.1667C2.5 15.0871 3.24619 15.8333 4.16667 15.8333Z" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-secondary-400">support@meetsync.com</p>
                  <p className="text-sm text-secondary-400">info@meetsync.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-lg bg-primary-600/20 flex items-center justify-center mt-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 5.83333C2.5 4.91286 3.24619 4.16667 4.16667 4.16667H5.69333C6.11428 4.16667 6.48796 4.43114 6.63533 4.82562L7.83333 8.01562C7.99496 8.44161 7.8557 8.92536 7.49833 9.21936L6.5775 10.0068C6.38883 10.1654 6.3318 10.4188 6.44318 10.6292C7.62172 13.0208 9.47922 14.8783 11.8708 16.0568C12.0812 16.1682 12.3346 16.1112 12.4933 15.9225L13.2807 15.0017C13.5747 14.6443 14.0584 14.505 14.4844 14.6667L17.6744 15.8647C18.0689 16.012 18.3333 16.3857 18.3333 16.8067V17.5C18.3333 18.4205 17.5871 19.1667 16.6667 19.1667H15C8.09644 19.1667 2.5 13.5702 2.5 6.66667V5.83333Z" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-secondary-400">+1 (555) 123-4567</p>
                  <p className="text-sm text-secondary-400">Mon-Fri, 9AM-5PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-lg bg-primary-600/20 flex items-center justify-center mt-1">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 18.3333C14.1667 14.1667 18.3333 11.2156 18.3333 8.33333C18.3333 5.45107 14.6421 3.33333 10 3.33333C5.35787 3.33333 1.66667 5.45107 1.66667 8.33333C1.66667 11.2156 5.83333 14.1667 10 18.3333Z" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-sm text-secondary-400">123 Tech Park Avenue</p>
                  <p className="text-sm text-secondary-400">San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-secondary-900 border-secondary-800 p-6">
            <h2 className="text-lg font-bold mb-4">Support Resources</h2>
            
            <div className="space-y-3">
              <a 
                href="/help-center" 
                className="flex items-center justify-between p-3 bg-secondary-800 rounded-lg hover:bg-secondary-750 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-primary-600/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5.33333V8M8 10.6667H8.00667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Help Center</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              
              <a 
                href="/tutorials" 
                className="flex items-center justify-between p-3 bg-secondary-800 rounded-lg hover:bg-secondary-750 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-primary-600/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2.66667L9.88 6.52667L14.1333 7.18L11.0667 10.1467L11.8267 14.3733L8 12.3867L4.17333 14.3733L4.93333 10.1467L1.86667 7.18L6.12 6.52667L8 2.66667Z" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Video Tutorials</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              
              <a 
                href="/documentation" 
                className="flex items-center justify-between p-3 bg-secondary-800 rounded-lg hover:bg-secondary-750 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-primary-600/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.66667 8H11.3333M4.66667 5.33333H11.3333M4.66667 10.6667H8M3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V3.33333C14 2.59695 13.403 2 12.6667 2H3.33333C2.59695 2 2 2.59695 2 3.33333V12.6667C2 13.403 2.59695 14 3.33333 14Z" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Documentation</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              
              <a 
                href="/community" 
                className="flex items-center justify-between p-3 bg-secondary-800 rounded-lg hover:bg-secondary-750 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-primary-600/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.33333 14V12.6667C5.33333 11.9594 5.61428 11.2811 6.11438 10.781C6.61448 10.281 7.29276 10 8 10H13.3333C14.0406 10 14.7189 10.281 15.219 10.781C15.719 11.2811 16 11.9594 16 12.6667V14M12 4.66667C12 6.13943 10.8061 7.33333 9.33333 7.33333C7.86057 7.33333 6.66667 6.13943 6.66667 4.66667C6.66667 3.19391 7.86057 2 9.33333 2C10.8061 2 12 3.19391 12 4.66667ZM4 8.66667V5.33333M2.33333 7H5.66667" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Community Forum</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-secondary-800 rounded-lg overflow-hidden">
      <button 
        className="w-full flex items-center justify-between p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium">{question}</h3>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {isOpen && (
        <div className="p-4 pt-0 text-sm text-secondary-300">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default SupportPage;