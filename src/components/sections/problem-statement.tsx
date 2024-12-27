"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card";
import { motion } from "framer-motion";

export function ProblemStatement() {
  return (
    <section className="relative overflow-hidden px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <ScrollReveal className="text-sm font-semibold uppercase tracking-wider text-primary">
              The Problem
            </ScrollReveal>

            <ScrollReveal
              delay={0.1}
              className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            >
              <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                ₹80,000 crore
              </span>
              <br />
              <span>in schemes go unclaimed every year.</span>
            </ScrollReveal>

            <ScrollReveal
              delay={0.2}
              className="mt-4 max-w-2xl text-lg text-muted-foreground"
            >
              We're fixing that by connecting every Indian with the government
              benefits they deserve, breaking down barriers of language,
              literacy, and complexity.
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="mt-8 flex flex-wrap gap-4">
              <div className="rounded-full bg-secondary px-4 py-1 text-sm text-secondary-foreground">
                1000+ Schemes
              </div>
              <div className="rounded-full bg-secondary px-4 py-1 text-sm text-secondary-foreground">
                13+ Languages
              </div>
              <div className="rounded-full bg-secondary px-4 py-1 text-sm text-secondary-foreground">
                28 States & 8 UTs
              </div>
              <div className="rounded-full bg-secondary px-4 py-1 text-sm text-secondary-foreground">
                600+ Offline Centers
              </div>
            </ScrollReveal>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <ScrollReveal delay={0.2} direction="right">
                <GlassmorphismCard className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <svg
                      className="h-10 w-10 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 18v-6m0 0V6m0 6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Language Barriers</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    70% of Indians are more comfortable in regional languages
                  </p>
                </GlassmorphismCard>
              </ScrollReveal>

              <ScrollReveal delay={0.3} direction="right">
                <GlassmorphismCard className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <svg
                      className="h-10 w-10 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Complex Processes</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Eligibility criteria and application forms are often
                    confusing
                  </p>
                </GlassmorphismCard>
              </ScrollReveal>

              <ScrollReveal delay={0.4} direction="right">
                <GlassmorphismCard className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <svg
                      className="h-10 w-10 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Lack of Awareness</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    83% are unaware of schemes they're eligible for
                  </p>
                </GlassmorphismCard>
              </ScrollReveal>

              <ScrollReveal delay={0.5} direction="right">
                <GlassmorphismCard className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <svg
                      className="h-10 w-10 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Digital Divide</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    47% of rural India has limited digital access
                  </p>
                </GlassmorphismCard>
              </ScrollReveal>
            </div>

            <motion.div
              className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <motion.div
              className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
