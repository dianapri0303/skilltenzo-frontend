import { Suspense } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import TrendingSection from "../components/TrendingSection/TrendingSection";
import TopicsSection from "../components/TopicsSection/TopicsSection";
import SkeletonGrid from "../components/SkeletonCard/SkeletonGrid";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<SkeletonGrid count={6} />}>
        <TrendingSection />
      </Suspense>
      <TopicsSection />
    </main>
  );
}
