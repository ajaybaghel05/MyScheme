'use client';

import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  className?: string;
  delay?: number;
}

function FeatureCard({
  title,
  description,
  icon,
  className,
  delay = 0,
}: FeatureCardProps) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <GlassmorphismCard className={cn('h-full', className)}>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </GlassmorphismCard>
    </ScrollReveal>
  );
}

export function Features() {
  const features = [
    {
      title: 'AI Match Engine',
      description: 'Our advanced algorithms match you with schemes based on your profile, location, and needs.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Voice Chat',
      description: 'Speak naturally in your language, and Saarthi will understand and respond to your queries.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      title: 'Multilingual Support',
      description: 'Available in 13+ Indian languages to serve citizens across all states and territories.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
    },
    {
      title: 'Offline Centers',
      description: 'Find nearby help centers where trained assistants can guide you in person.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'Document Assistance',
      description: 'Get help with required documents, filling forms, and submission procedures.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: 'PDF Summaries',
      description: 'Download personalized reports of matching schemes with all important details.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="overflow-hidden px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <ScrollReveal className="text-sm font-semibold uppercase tracking-wider text-primary">
            Key Features
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            How Saarthi Helps You
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Powerful features designed to simplify access to government schemes for every Indian.
          </ScrollReveal>
        </div>

        <div className="relative">
          <motion.div
            className="absolute -right-64 top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          
          <motion.div
            className="absolute -left-64 -bottom-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          
          <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={0.1 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}