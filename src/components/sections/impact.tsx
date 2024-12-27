'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';

export function Impact() {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.3 });

  const testimonials = [
    {
      quote: "I never knew I was eligible for a housing subsidy. Saarthi helped me discover and apply for it in my language.",
      name: "Lakshmi",
      location: "Tamil Nadu",
      image: "https://images.pexels.com/photos/3786525/pexels-photo-3786525.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      quote: "As a farmer, I found the process confusing. Saarthi simplified everything and helped me secure an agricultural loan.",
      name: "Rajesh",
      location: "Punjab",
      image: "https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      quote: "When I lost my job, Saarthi connected me with skill development programs and unemployment benefits.",
      name: "Priya",
      location: "Karnataka",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  const metrics = [
    { label: 'Success Rate', value: '87%', description: 'of applications approved' },
    { label: 'First-Time Users', value: '70%', description: 'had no prior knowledge of schemes' },
    { label: 'Languages', value: '13+', description: 'regional languages supported' },
    { label: 'Offline Centers', value: '600+', description: 'across rural and urban India' },
  ];

  return (
    <section id="impact" className="overflow-hidden px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <ScrollReveal className="text-sm font-semibold uppercase tracking-wider text-primary">
            Real Impact
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Changing Lives Across India
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Hear from people who found life-changing government schemes through Saarthi.
          </ScrollReveal>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={0.2 + index * 0.1}>
              <GlassmorphismCard className="h-full">
                <div className="flex flex-col">
                  <div className="mb-4 text-xl italic text-muted-foreground">
                    "{testimonial.quote}"
                  </div>
                  <div className="mt-auto flex items-center">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              </GlassmorphismCard>
            </ScrollReveal>
          ))}
        </div>

        <div
          ref={statsRef}
          className="mt-20 grid gap-6 rounded-2xl border border-border/40 bg-background/50 p-8 backdrop-blur-lg sm:grid-cols-2 lg:grid-cols-4"
        >
          {metrics.map((metric, index) => (
            <div key={metric.label} className="text-center">
              <motion.div
                className="text-4xl font-bold md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                {metric.value}
              </motion.div>
              <motion.div
                className="mt-2 font-medium"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {metric.label}
              </motion.div>
              <motion.div
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                {metric.description}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}