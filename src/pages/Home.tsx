import { HeroSection } from "@/components/sections/hero-section";
import { ProblemStatement } from "@/components/sections/problem-statement";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { Impact } from "@/components/sections/impact";
import { DemoSection } from "@/components/sections/demo-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemStatement />
      <HowItWorks />
      <Features />
      <Impact />
      <DemoSection />
    </>
  );
}
