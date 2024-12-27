'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  backgroundClassName?: string;
  className?: string;
  as?: React.ElementType;
  containerClassName?: string;
  borderWidth?: number;
  offset?: number;
}

export function MovingBorder({
  children,
  as: Component = 'button',
  className,
  containerClassName,
  backgroundClassName,
  duration = 2000,
  borderWidth = 2,
  offset = 20,
}: MovingBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const moveGradient = (event: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Set CSS variables to control the gradient position
    containerRef.current.style.setProperty('--x', `${x}px`);
    containerRef.current.style.setProperty('--y', `${y}px`);
  };
  
  const resetGradient = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--x', '50%');
    containerRef.current.style.setProperty('--y', '50%');
  };
  
  useEffect(() => {
    resetGradient();
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', moveGradient);
      container.addEventListener('mouseleave', resetGradient);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', moveGradient);
        container.removeEventListener('mouseleave', resetGradient);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden rounded-full',
        containerClassName
      )}
      style={
        {
          '--x': '50%',
          '--y': '50%',
          '--duration': `${duration}ms`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'absolute inset-0 z-[-1] h-full w-full',
          backgroundClassName
        )}
        style={{
          background: `radial-gradient(800px circle at var(--x) var(--y), hsl(var(--primary)/0.15), transparent 40%)`,
          transition: 'opacity 0.2s',
        }}
      />
      <Component
        className={cn(
          'relative rounded-full bg-background p-[2px] transition-all',
          className
        )}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(600px circle at var(--x) var(--y), hsl(var(--primary)), transparent ${offset}%)`,
            width: '100%',
            height: '100%',
            WebkitMask: `radial-gradient(calc(100% - ${borderWidth}px) circle at 50% 50%, transparent 100%, black 100%)`,
            mask: `radial-gradient(calc(100% - ${borderWidth}px) circle at 50% 50%, transparent 100%, black 100%)`,
          }}
        />
        <div className="relative z-10 p-4">{children}</div>
      </Component>
    </div>
  );
}