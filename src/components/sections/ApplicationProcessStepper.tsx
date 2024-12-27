import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card";
import { cn } from "@/lib/utils";
import { User, FileText, CheckCircle2, Gift } from "lucide-react";

// Accepts a steps prop (array of strings) to render each step as a card
export function ApplicationProcessStepper({
  steps,
  className,
}: {
  steps: string[];
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Choose a set of Lucide icons for up to 4 steps, fallback to User for extras
  const icons = [User, FileText, CheckCircle2, Gift];

  if (!steps || steps.length === 0) return null;

  return (
    <section className={cn("relative py-16 px-2 md:px-8", className)}>
      <div className="mx-auto max-w-4xl px-8">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl text-foreground">
          Application Process
        </h2>
        <div ref={ref} className="relative flex flex-col items-center">
          {/* Gradient connector line */}
          <div
            className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent pointer-events-none"
            style={{ zIndex: 0 }}
          />
          <div className="flex flex-col gap-16 w-full">
            {steps.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              const Icon = icons[idx] || User;
              return (
                <div
                  key={idx}
                  className={cn(
                    "relative flex flex-col md:flex-row items-center w-full",
                    isLeft ? "md:justify-start" : "md:justify-end"
                  )}
                >
                  {/* Card */}
                  <div
                    className={cn(
                      "w-full md:w-1/2 z-10",
                      isLeft
                        ? "md:pr-12 md:items-end"
                        : "md:pl-12 md:items-start"
                    )}
                  >
                    <GlassmorphismCard className="flex flex-col md:flex-row items-center md:items-center gap-4 p-6 shadow-lg">
                      <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-lg border-4 border-background overflow-hidden">
                        <Icon className="w-7 h-7 rounded-full bg-primary text-primary-foreground" />
                      </div>
                      <div className="md:ml-6 text-center md:text-left">
                        <h3 className="text-xl font-semibold mb-1 text-foreground">
                          Step {idx + 1}
                        </h3>
                        <p className="text-muted-foreground text-base">
                          {step}
                        </p>
                      </div>
                    </GlassmorphismCard>
                  </div>
                  {/* Animated dot on the line, now positioned beside the card */}
                  <motion.div
                    className={cn(
                      "absolute h-5 w-5 rounded-full bg-primary/80 border-4 border-background shadow-md",
                      isLeft
                        ? "md:left-[calc(50%-2.5rem)] left-1/2 -translate-x-full md:translate-x-0"
                        : "md:left-[calc(48%+2.5rem)] left-1/2 translate-x-0 md:translate-x-0"
                    )}
                    style={{
                      top: "50%",
                      transform: isLeft
                        ? "translateY(-50%)"
                        : "translateY(-50%)",
                    }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.2 + idx * 0.15, duration: 0.4 }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
