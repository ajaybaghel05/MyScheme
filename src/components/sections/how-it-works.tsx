'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { cn } from '@/lib/utils';

export function HowItWorks() {
  const stepsRef = useRef(null);
  const isInView = useInView(stepsRef, { once: true, amount: 0.3 });

  const steps = [
    {
      step: 1,
      title: 'Answer',
      description: 'Answer a few simple questions in your language through voice or text.',
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      step: 2,
      title: 'Match',
      description: 'Our AI matches you with all the government schemes you qualify for.',
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      step: 3,
      title: 'Apply',
      description: 'Get guided through the application process with step-by-step instructions.',
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="overflow-hidden px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <ScrollReveal className="text-sm font-semibold uppercase tracking-wider text-primary">
            Simple Process
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            How Saarthi Works
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Three simple steps to connect you with the government schemes you deserve.
          </ScrollReveal>
        </div>

        <div ref={stepsRef} className="relative">
          {/* Connector Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:translate-x-0 md:translate-y-12" />
          
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <ScrollReveal
                key={step.step}
                delay={0.2 + index * 0.2}
                direction={index % 2 === 0 ? 'left' : 'right'}
                className="relative"
              >
                <GlassmorphismCard
                  className={cn(
                    'relative z-10 flex flex-col items-center md:items-start md:text-left',
                    (index === 1) && 'md:mt-16'
                  )}
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {step.icon}
                  </div>
                  
                  <motion.div
                    className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    animate={isInView ? { scale: [0, 1.2, 1] } : { scale: 0 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                  >
                    {step.step}
                  </motion.div>
                  
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </GlassmorphismCard>
                
                {/* Animated circle on the line */}
                {isInView && (
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary md:left-0 md:top-12"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                  />
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}