"use client";

import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { MovingBorder } from "@/components/ui/moving-border";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export function DemoSection() {
  return (
    <section id="demo" className="relative overflow-hidden px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#FF7A00]/20 via-[#FF0070]/20 to-[#9747FF]/20 blur-xl" />

          <div className="relative z-10 grid items-center gap-8 rounded-3xl border border-border/40 bg-background/50 p-8 backdrop-blur-xl md:grid-cols-2 md:p-12 lg:p-16">
            <div>
              <ScrollReveal className="text-sm font-semibold uppercase tracking-wider text-primary">
                Try It Yourself
              </ScrollReveal>
              <ScrollReveal
                delay={0.1}
                className="mt-4 text-3xl font-bold md:text-4xl"
              >
                Experience Saarthi In Action
              </ScrollReveal>
              <ScrollReveal
                delay={0.2}
                className="mt-4 max-w-md text-lg text-muted-foreground"
              >
                See how Saarthi can help you discover and access government
                schemes in just a few minutes.
              </ScrollReveal>

              <ScrollReveal
                delay={0.3}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                {/* <MovingBorder containerClassName="w-fit"> */}
                <Button size="lg" className="relative font-medium px-8">
                  Start Demo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                {/* </MovingBorder> */}

                <Button variant="outline" size="lg" className="px-8">
                  Learn More
                </Button>
              </ScrollReveal>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-xl border border-border/40 bg-background/50 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
                >
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
