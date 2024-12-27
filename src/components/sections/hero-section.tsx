"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { RevealText } from "@/components/animations/reveal-text";
import { MovingBorder } from "@/components/ui/moving-border";
import { Particles } from "@/components/animations/particles";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex sm:min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24"
    >
      <Particles className="absolute inset-0 z-10 opacity-40" quantity={40} />

      <div className="relative z-20 mx-auto max-w-5xl text-center px-2 sm:px-4">
        <div className="mb-6 sm:mb-8 inline-block rounded-full bg-muted px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm font-medium text-muted-foreground">
          AI-powered access to government schemes for all Indians
        </div>

        <h1 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
          <RevealText
            text="Your guide to access"
            className="text-foreground"
            duration={0.6}
          />
          <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#FF7A00] via-[#FF0070] to-[#9747FF] bg-clip-text text-transparent">
              <RevealText
                text="government schemes"
                duration={0.6}
                delay={0.4}
              />
            </span>
          </span>
        </h1>

        <ScrollReveal
          delay={0.6}
          className="mb-8 sm:mb-10 max-w-xs sm:max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground md:text-xl"
        >
          Discover, understand, and apply for government schemes in your
          language, with personalized guidance from SchemeConnect, your AI
          companion.
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/schemes";
            }}
            className="flex flex-col items-center space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button
              size="lg"
              className="relative font-medium text-base px-6 sm:px-8 w-full sm:w-auto"
              type="submit"
            >
              Find schemes tailored to you
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.form>
          <Button
            variant="outline"
            size="lg"
            className="px-6 sm:px-8 w-full sm:w-auto"
          >
            Explore all schemes
          </Button>
        </div>
      </div>

      <div className="absolute  bottom-1 z-20 flex animate-bounce flex-col items-center">
        <span className="text-sm text-muted-foreground">
          Scroll to learn more
        </span>
        <motion.div
          className="mt-1 h-6 w-6 rounded-full border-2 border-muted-foreground"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <motion.div
            className="h-1.5 w-1.5 translate-x-[7px] translate-y-[7px] rounded-full bg-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
