'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassmorphismCard({
  children,
  className,
  hoverEffect = true,
}: GlassmorphismCardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border/40 bg-background/50 p-6 backdrop-blur-xl',
        hoverEffect && 'transition-all duration-300 hover:bg-background/70 hover:shadow-lg',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={
        hoverEffect
          ? {
              scale: 1.02,
              boxShadow: '0 20px 80px -20px rgba(0, 0, 0, 0.1)',
            }
          : {}
      }
    >
      {children}
    </motion.div>
  );
}