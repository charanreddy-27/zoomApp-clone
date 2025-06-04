'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface VirtualBackgroundsProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBackground: (background: string | null) => void;
}

const backgrounds = {
  images: [
    { id: 'bg1', src: '/images/backgrounds/office.jpg', name: 'Office' },
    { id: 'bg2', src: '/images/backgrounds/beach.jpg', name: 'Beach' },
    { id: 'bg3', src: '/images/backgrounds/mountain.jpg', name: 'Mountain' },
    { id: 'bg4', src: '/images/backgrounds/library.jpg', name: 'Library' },
    { id: 'bg5', src: '/images/backgrounds/space.jpg', name: 'Space' },
    { id: 'bg6', src: '/images/backgrounds/forest.jpg', name: 'Forest' },
  ],
  blurs: [
    { id: 'blur1', level: 'Slight', value: 'blur-sm' },
    { id: 'blur2', level: 'Medium', value: 'blur-md' },
    { id: 'blur3', level: 'Strong', value: 'blur-lg' },
  ],
  effects: [
    { id: 'effect1', name: 'Grayscale', value: 'grayscale' },
    { id: 'effect2', name: 'Sepia', value: 'sepia' },
    { id: 'effect3', name: 'Invert', value: 'invert' },
  ]
};

const VirtualBackgrounds = ({ isOpen, onClose, onSelectBackground }: VirtualBackgroundsProps) => {
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  const [selectedBlur, setSelectedBlur] = useState<string | null>(null);
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
  
  const handleBackgroundSelect = (background: string | null) => {
    setSelectedBackground(background);
    onSelectBackground(background);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center animate-fade-in">
      <div className="bg-dark-1 w-[95%] max-w-3xl rounded-2xl shadow-card flex flex-col overflow-hidden border border-dark-3/50 animate-scale-in">
        <div className="bg-dark-3 p-4 flex justify-between items-center">
          <h2 className="text-white font-semibold text-xl">Virtual Backgrounds</h2>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-dark-4"
            onClick={onClose}
          >
            <Image src="/icons/close.svg" width={20} height={20} alt="Close" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="mb-6 flex items-center justify-center">
            <div className="relative w-[320px] h-[180px] rounded-lg overflow-hidden bg-dark-3 border border-dark-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                  src="/images/video-placeholder.jpg" 
                  alt="Preview" 
                  width={320} 
                  height={180}
                  className={cn(
                    selectedEffect,
                    selectedBlur
                  )}
                  style={{
                    backgroundImage: selectedBackground ? `url(${selectedBackground})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-dark-1/80 px-2 py-1 rounded text-xs text-white">
                Preview
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="images" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="blur">Background Blur</TabsTrigger>
              <TabsTrigger value="effects">Effects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="images" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div 
                  className={cn(
                    "relative h-24 rounded-lg overflow-hidden cursor-pointer border-2",
                    selectedBackground === null ? "border-blue-1" : "border-transparent"
                  )}
                  onClick={() => handleBackgroundSelect(null)}
                >
                  <div className="absolute inset-0 bg-dark-3 flex items-center justify-center">
                    <span className="text-white text-sm">None</span>
                  </div>
                </div>
                
                {backgrounds.images.map((bg) => (
                  <div 
                    key={bg.id}
                    className={cn(
                      "relative h-24 rounded-lg overflow-hidden cursor-pointer border-2",
                      selectedBackground === bg.src ? "border-blue-1" : "border-transparent"
                    )}
                    onClick={() => handleBackgroundSelect(bg.src)}
                  >
                    <Image 
                      src={bg.src} 
                      alt={bg.name} 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <span className="text-white text-xs">{bg.name}</span>
                    </div>
                  </div>
                ))}
                
                <div className="relative h-24 rounded-lg overflow-hidden cursor-pointer border-2 border-dashed border-dark-3 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <Image src="/icons/upload.svg" width={24} height={24} alt="Upload" />
                    <span className="text-white text-xs mt-1">Upload</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="blur" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div 
                  className={cn(
                    "relative h-24 rounded-lg overflow-hidden cursor-pointer border-2",
                    selectedBlur === null ? "border-blue-1" : "border-transparent"
                  )}
                  onClick={() => setSelectedBlur(null)}
                >
                  <div className="absolute inset-0 bg-dark-3 flex items-center justify-center">
                    <span className="text-white text-sm">None</span>
                  </div>
                </div>
                
                {backgrounds.blurs.map((blur) => (
                  <div 
                    key={blur.id}
                    className={cn(
                      "relative h-24 rounded-lg overflow-hidden cursor-pointer border-2",
                      selectedBlur === blur.value ? "border-blue-1" : "border-transparent"
                    )}
                    onClick={() => setSelectedBlur(blur.value)}
                  >
                    <Image 
                      src="/images/video-placeholder.jpg" 
                      alt={blur.level} 
                      fill 
                      className={cn("object-cover", blur.value)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <span className="text-white text-xs">{blur.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="effects" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div 
                  className={cn(
                    "relative h-24 rounded-lg overflow-hidden cursor-pointer border-2",
                    selectedEffect === null ? "border-blue-1" : "border-transparent"
                  )}
                  onClick={() => setSelectedEffect(null)}
                >
                  <div className="absolute inset-0 bg-dark-3 flex items-center justify-center">
                    <span className="text-white text-sm">None</span>
                  </div>
                </div>
                
                {backgrounds.effects.map((effect) => (
                  <div 
                    key={effect.id}
                    className={cn(
                      "relative h-24 rounded-lg overflow-hidden cursor-pointer border-2",
                      selectedEffect === effect.value ? "border-blue-1" : "border-transparent"
                    )}
                    onClick={() => setSelectedEffect(effect.value)}
                  >
                    <Image 
                      src="/images/video-placeholder.jpg" 
                      alt={effect.name} 
                      fill 
                      className={cn("object-cover", effect.value)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <span className="text-white text-xs">{effect.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-dark-3/50 p-4 flex justify-end gap-3">
          <Button 
            variant="outline" 
            className="border-dark-3 hover:bg-dark-3/50"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            className="bg-blue-1 hover:bg-blue-2"
            onClick={onClose}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VirtualBackgrounds; 