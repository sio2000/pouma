import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import RevealStatement from "@/components/sections/RevealStatement";
import { HomeSectionsWithQuotes } from "@/components/sections/ScatteredScrollQuotes";
import DimitraVideosSection from "@/components/sections/DimitraVideosSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import PersonalizationSection from "@/components/sections/PersonalizationSection";
import CommunicationSection from "@/components/sections/CommunicationSection";
import MethodSection from "@/components/sections/MethodSection";
import PumaStory from "@/components/sections/PumaStory";
import DifferenceSection from "@/components/sections/DifferenceSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaSection from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <RevealStatement />
      <HomeSectionsWithQuotes>
        <CommunicationSection />
        <MethodSection />
        <PhilosophySection />
        <PersonalizationSection />
        <DimitraVideosSection />
        <PumaStory />
        <DifferenceSection />
        <TestimonialsSection />
        <CtaSection />
      </HomeSectionsWithQuotes>
    </>
  );
}
