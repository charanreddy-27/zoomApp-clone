'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const tools = [
  { name: 'Pen', icon: '/icons/pen.svg' },
  { name: 'Eraser', icon: '/icons/eraser.svg' },
  { name: 'Text', icon: '/icons/text.svg' },
  { name: 'Shape', icon: '/icons/shape.svg' },
  { name: 'Image', icon: '/icons/image.svg' },
];

const colors = [
  '#FFFFFF', // White
  '#FF5252', // Red
  '#FFEB3B', // Yellow
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#9C27B0', // Purple
];

interface CollaborativeWhiteboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const CollaborativeWhiteboard = ({ isOpen, onClose }: CollaborativeWhiteboardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('Pen');
  const [color, setColor] = useState('#FFFFFF');
  const [lineWidth, setLineWidth] = useState(5);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'You', avatar: '/icons/avatar.svg', color: '#2196F3' },
    { id: 2, name: 'John Doe', avatar: '/icons/avatar.svg', color: '#FF5252' },
  ]);

  useEffect(() => {
    if (!isOpen) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const context = canvas.getContext('2d');
    if (context) {
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      setCtx(context);
    }
    
    // Clear canvas on first load
    context?.clearRect(0, 0, canvas.width, canvas.height);
    
    // Add resize listener
    const handleResize = () => {
      if (canvas) {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCtx?.drawImage(canvas, 0, 0);
        
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        if (context) {
          context.lineCap = 'round';
          context.lineJoin = 'round';
          context.strokeStyle = color;
          context.lineWidth = lineWidth;
          context.drawImage(tempCanvas, 0, 0);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, color, lineWidth]);
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas || !ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.type === 'mousedown' 
      ? (e as React.MouseEvent).clientX - rect.left 
      : (e as React.TouchEvent).touches[0].clientX - rect.left;
    const y = e.type === 'mousedown' 
      ? (e as React.MouseEvent).clientY - rect.top 
      : (e as React.TouchEvent).touches[0].clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.type === 'mousemove' 
      ? (e as React.MouseEvent).clientX - rect.left 
      : (e as React.TouchEvent).touches[0].clientX - rect.left;
    const y = e.type === 'mousemove' 
      ? (e as React.MouseEvent).clientY - rect.top 
      : (e as React.TouchEvent).touches[0].clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const endDrawing = () => {
    setIsDrawing(false);
    if (ctx) ctx.beginPath();
  };
  
  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };
  
  const handleToolChange = (newTool: string) => {
    setTool(newTool);
    if (ctx) {
      if (newTool === 'Eraser') {
        ctx.globalCompositeOperation = 'destination-out';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }
    }
  };
  
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    if (ctx) ctx.strokeStyle = newColor;
  };
  
  const handleLineWidthChange = (value: number[]) => {
    const newWidth = value[0];
    setLineWidth(newWidth);
    if (ctx) ctx.lineWidth = newWidth;
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center animate-fade-in">
      <div className="bg-dark-1 w-[95%] h-[90%] max-w-7xl rounded-2xl shadow-card flex flex-col overflow-hidden border border-dark-3/50 animate-scale-in">
        <div className="bg-dark-3 p-4 flex justify-between items-center">
          <h2 className="text-white font-semibold text-xl">Collaborative Whiteboard</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {participants.map(participant => (
                <div key={participant.id} className="flex items-center gap-1" title={participant.name}>
                  <div className="relative">
                    <Image 
                      src={participant.avatar} 
                      alt={participant.name} 
                      width={32} 
                      height={32} 
                      className="rounded-full border-2"
                      style={{ borderColor: participant.color }}
                    />
                    <span 
                      className="absolute bottom-0 right-0 size-2 rounded-full bg-green-1 border border-dark-3"
                    ></span>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-dark-4"
              onClick={onClose}
            >
              <Image src="/icons/close.svg" width={20} height={20} alt="Close" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          <div className="bg-dark-4 p-3 flex flex-col gap-4">
            {tools.map(item => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "p-2 rounded-lg hover:bg-dark-3",
                  tool === item.name && "bg-blue-1"
                )}
                onClick={() => handleToolChange(item.name)}
                title={item.name}
              >
                <Image src={item.icon} width={24} height={24} alt={item.name} />
              </Button>
            ))}
            
            <div className="h-px bg-dark-3 my-2"></div>
            
            <div className="flex flex-col gap-2">
              {colors.map(c => (
                <Button
                  key={c}
                  variant="ghost"
                  className={cn(
                    "size-8 rounded-full p-0 border-2",
                    color === c ? "border-white" : "border-transparent"
                  )}
                  style={{ backgroundColor: c }}
                  onClick={() => handleColorChange(c)}
                />
              ))}
            </div>
            
            <div className="h-px bg-dark-3 my-2"></div>
            
            <div className="flex flex-col items-center gap-2">
              <span className="text-white text-xs">{lineWidth}px</span>
              <Slider
                defaultValue={[lineWidth]}
                max={20}
                min={1}
                step={1}
                orientation="vertical"
                className="h-32"
                onValueChange={handleLineWidthChange}
              />
            </div>
            
            <div className="mt-auto">
              <Button
                variant="destructive"
                size="sm"
                onClick={clearCanvas}
                className="w-full"
              >
                Clear
              </Button>
            </div>
          </div>
          
          <div className="flex-1 bg-dark-2 relative">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={endDrawing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeWhiteboard; 