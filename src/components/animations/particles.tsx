'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

interface Circle {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  originalX: number;
  originalY: number;
}

export function Particles({
  className,
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const animationFrameId = useRef<number>();
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsDarkMode(document.documentElement.classList.contains('dark'));

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

    return () => observer.disconnect();
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isMounted) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mousePosition.current.x = e.clientX - rect.left;
      mousePosition.current.y = e.clientY - rect.top;
    }
  }, [isMounted]);

  const resizeCanvas = useCallback(() => {
    if (!isMounted || !canvasContainerRef.current || !canvasRef.current || !context.current) return;
    
    circles.current = [];
    canvasSize.current.w = canvasContainerRef.current.offsetWidth;
    canvasSize.current.h = canvasContainerRef.current.offsetHeight;
    
    const dpr = window.devicePixelRatio || 1;
    canvasRef.current.width = canvasSize.current.w * dpr;
    canvasRef.current.height = canvasSize.current.h * dpr;
    canvasRef.current.style.width = `${canvasSize.current.w}px`;
    canvasRef.current.style.height = `${canvasSize.current.h}px`;
    context.current.scale(dpr, dpr);
    
    initCircles();
  }, [isMounted]);

  const drawCircle = useCallback((circle: Circle, update = false) => {
    if (!isMounted || !context.current) return;
    
    const { x, y, size, opacity, color } = circle;
    context.current.beginPath();
    context.current.arc(x, y, size, 0, 2 * Math.PI);
    context.current.fillStyle = `rgba(${color}, ${opacity})`;
    context.current.fill();
    context.current.closePath();

    if (!update) {
      circles.current.push(circle);
    }
  }, [isMounted]);

  const initCircles = useCallback(() => {
    if (!isMounted || canvasSize.current.w <= 0 || canvasSize.current.h <= 0) return;
    
    circles.current = [];
    const color = isDarkMode ? '255, 255, 255' : '0, 0, 0';
    
    for (let i = 0; i < quantity; i++) {
      const x = Math.random() * canvasSize.current.w;
      const y = Math.random() * canvasSize.current.h;
      
      drawCircle({
        x,
        y,
        size: Math.random() * 2 + 0.5,
        color,
        opacity: 0.2,
        originalX: x,
        originalY: y,
      });
    }
  }, [drawCircle, isMounted, isDarkMode, quantity]);

  const animate = useCallback(() => {
    if (!isMounted || !context.current || !canvasRef.current) return;
    
    const { width, height } = canvasRef.current;
    context.current.clearRect(0, 0, width, height);
    
    mouse.current.x += (mousePosition.current.x - mouse.current.x) / ease;
    mouse.current.y += (mousePosition.current.y - mouse.current.y) / ease;

    circles.current.forEach((circle) => {
      const dx = mouse.current.x - circle.x;
      const dy = mouse.current.y - circle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 100;

      if (distance < maxDistance) {
        const angle = Math.atan2(dy, dx);
        const force = (maxDistance - distance) / maxDistance;
        const deltaX = Math.cos(angle) * force * staticity;
        const deltaY = Math.sin(angle) * force * staticity;

        circle.x -= deltaX;
        circle.y -= deltaY;
      } else {
        circle.x += (circle.originalX - circle.x) * 0.05;
        circle.y += (circle.originalY - circle.y) * 0.05;
      }

      circle.color = isDarkMode ? '255, 255, 255' : '0, 0, 0';
      
      const opacityDistance = Math.sqrt(
        Math.pow(circle.x - mouse.current.x, 2) +
        Math.pow(circle.y - mouse.current.y, 2)
      );
      
      circle.opacity = Math.min(
        0.5,
        Math.max(0.1, 0.5 - opacityDistance / (canvasSize.current.w / 2))
      );

      drawCircle(circle, true);
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, [drawCircle, ease, isMounted, isDarkMode, staticity]);

  useEffect(() => {
    if (!isMounted) return;

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', onMouseMove);
    
    resizeCanvas();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate, isMounted, onMouseMove, resizeCanvas]);

  useEffect(() => {
    if (isMounted) {
      resizeCanvas();
    }
  }, [isMounted, resizeCanvas, refresh]);

  if (!isMounted) {
    return null;
  }

  return (
    <div ref={canvasContainerRef} className={cn('absolute inset-0', className)}>
      <canvas ref={canvasRef} />
    </div>
  );
}