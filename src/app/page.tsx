import { Navbar, Footer } from "@/components/layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import { MOCK_PROJECTS } from "@/data/mock-projects";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProjects projects={MOCK_PROJECTS} />
      </main>
      <Footer />
    </>
  );
}
