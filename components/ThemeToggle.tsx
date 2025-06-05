'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  useEffect(() => {
    // Check for system preference or stored preference
    const storedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="rounded-full w-8 h-8 bg-secondary-800/50 hover:bg-secondary-700/50"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 12.5C10.4853 12.5 12.5 10.4853 12.5 8C12.5 5.51472 10.4853 3.5 8 3.5C5.51472 3.5 3.5 5.51472 3.5 8C3.5 10.4853 5.51472 12.5 8 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 1V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 14V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.22 3.22L3.93 3.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.07 12.07L12.78 12.78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 8H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.22 12.78L3.93 12.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.07 3.93L12.78 3.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 8.25C13.4889 9.30118 13.1715 10.3254 12.5862 11.1992C12.0009 12.0731 11.1731 12.7576 10.2013 13.1659C9.22943 13.5742 8.15144 13.6882 7.1098 13.4941C6.06816 13.3 5.10491 12.8054 4.34 12.07C3.57509 11.3345 3.04458 10.3913 2.81323 9.35654C2.58188 8.32177 2.65841 7.24386 3.03255 6.25607C3.40669 5.26827 4.05862 4.41842 4.91414 3.80552C5.76966 3.19262 6.78217 2.84336 7.83 2.8C6.83 4.75 7.22 7.5 9.17 9.45C11.12 11.4 13.87 11.79 15.82 10.79C15.5 11.75 14.9 12.62 14.11 13.29C13.32 13.96 12.36 14.41 11.33 14.59C10.3 14.77 9.24 14.68 8.26 14.32C7.28 13.96 6.41 13.35 5.75 12.55C5.09 11.75 4.66 10.79 4.5 9.77C4.34 8.75 4.46 7.71 4.83 6.75C5.21 5.79 5.84 4.95 6.65 4.31C7.46 3.67 8.43 3.26 9.45 3.12C10.47 2.98 11.51 3.12 12.45 3.52C13.39 3.92 14.2 4.57 14.81 5.4C15.42 6.23 15.8 7.22 15.91 8.25H13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </Button>
  );
};

export default ThemeToggle; 