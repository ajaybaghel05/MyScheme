'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BackgroundGradientProps {
  className?: string;
}

export function BackgroundGradient({ className }: BackgroundGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    const handleResize = () => {
      window.requestAnimationFrame(resizeCanvas);
    };

    window.addEventListener('resize', handleResize);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const gradientColors = {
      light: [
        'rgba(255, 122, 0, 0.5)',  // Orange
        'rgba(232, 65, 24, 0.3)',   // Red
        'rgba(79, 70, 229, 0.4)',   // Indigo
        'rgba(6, 182, 212, 0.3)',   // Cyan
      ],
      dark: [
        'rgba(255, 122, 0, 0.3)',  // Orange
        'rgba(232, 65, 24, 0.2)',   // Red
        'rgba(79, 70, 229, 0.3)',   // Indigo
        'rgba(6, 182, 212, 0.2)',   // Cyan
      ]
    };

    let animationFrameId: number;

    const animateGradient = () => {
      if (!canvas || !ctx) return;
      
      const { width, height } = canvas.getBoundingClientRect();
      
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      
      const colors = isDarkMode ? gradientColors.dark : gradientColors.light;

      const gradient = ctx.createRadialGradient(
        targetX, targetY, 0,
        targetX, targetY, Math.max(width, height) * 0.8
      );
      
      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
      });
      
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      animationFrameId = requestAnimationFrame(animateGradient);
    };
    
    animateGradient();
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMounted, isDarkMode]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={cn('fixed inset-0 -z-10 overflow-hidden', className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full"
      />
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[100px]" />
    </div>
  );
}