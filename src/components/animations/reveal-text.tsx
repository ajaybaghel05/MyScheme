'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: React.ElementType;
}

export function RevealText({
  text,
  className,
  delay = 0.1,
  duration = 0.5,
  once = true,
  as: Component = 'span',
}: RevealTextProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  // Split text into words
  const words = text.split(' ');

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, isInView, once]);

  const wordVariants = {
    hidden: {},
    visible: {},
  };

  const characterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
      },
    },
  };

  return (
    <Component
      ref={ref}
      className={cn('inline-block', className)}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={`word-${wordIndex}`}
          className="inline-block mr-[0.25em] last:mr-0"
          variants={wordVariants}
          initial="hidden"
          animate={controls}
        >
          {Array.from(word).map((char, charIndex) => (
            <motion.span
              key={`char-${charIndex}`}
              className="inline-block"
              variants={characterVariants}
              initial="hidden"
              animate={controls}
              transition={{
                delay: delay + (wordIndex * 0.1) + (charIndex * 0.02),
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </Component>
  );
}