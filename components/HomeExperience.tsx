"use client";

import IntroProvider from "@/components/intro/IntroProvider";
import ExperienceCanvas from "@/components/ExperienceCanvas";
import Navigation from "@/components/ui/Navigation";
import StoryProgress from "@/components/ui/StoryProgress";
import Footer from "@/components/ui/Footer";

import HeroChapter from "@/components/story/HeroChapter";
import DreamChapter from "@/components/story/DreamChapter";
import TrainingChapter from "@/components/story/TrainingChapter";
import TransformationChapter from "@/components/story/TransformationChapter";
import ResultsChapter from "@/components/story/ResultsChapter";
import PerformanceChapter from "@/components/story/PerformanceChapter";
import ConversionChapter from "@/components/story/ConversionChapter";

/**
 * The homepage cinematic. A single fixed 3D stage with the story scrolling
 * over it as a sequence of chapters — Dream → Train → Transform → Perform.
 */
export default function HomeExperience() {
  return (
    <IntroProvider>
      <ExperienceCanvas />
      <Navigation />
      <StoryProgress />

      <main className="relative z-10">
        <HeroChapter />
        <DreamChapter />
        <TrainingChapter />
        <TransformationChapter />
        <ResultsChapter />
        <PerformanceChapter />
        <ConversionChapter />
      </main>

      {/* Footer sits on a solid base so the canvas doesn't bleed past the story */}
      <div className="relative z-10">
        <Footer />
      </div>
    </IntroProvider>
  );
}
