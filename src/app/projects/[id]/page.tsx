import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { Badge } from "@/components/ui";
import { MOCK_PROJECTS } from "@/data/mock-projects";
import type { Metadata } from "next";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MOCK_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project =
    MOCK_PROJECTS.find((p) => p.id === id) || MOCK_PROJECTS[1]; // fallback to Aura

  return {
    title: `${project.title} — Tasya Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  // Look up project or default to Aura Wellness App (matching Mockup 2)
  const project =
    MOCK_PROJECTS.find((p) => p.id === id) ||
    MOCK_PROJECTS.find((p) => p.title.toLowerCase().includes("aura")) ||
    MOCK_PROJECTS[0];

  if (!project) {
    notFound();
  }

  // Gallery images matching Mockup 2
  const heroImage = "/images/aura_hero_phone.jpg";
  const rebrandImage = "/images/aura_rebrand.jpg";
  const desktopImage = "/images/aura_desktop.jpg";

  // Parse role items into list
  const roleList = project.role
    ? project.role.split("\n").filter(Boolean)
    : ["Lead UI/UX Designer", "Interaction Design", "Design Systems"];

  return (
    <>
      <Navbar />
      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Projects Navigation */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-slate hover:text-dark-slate transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Projects</span>
            </Link>
          </div>

          {/* Project Title & Subtitle */}
          <div className="max-w-3xl mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-slate tracking-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-slate leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* 3-Image Showcase Gallery Grid (Matching Mockup 2) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16">
            {/* Left Large Vertical Showcase (7 cols) */}
            <div className="lg:col-span-7 relative h-[420px] sm:h-[520px] lg:h-[620px] rounded-3xl overflow-hidden shadow-card border border-border-soft/60 bg-bg-subtle">
              <Image
                src={heroImage}
                alt={`${project.title} mobile showcase`}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {/* Right Stacked Landscape Showcases (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
              {/* Top Landscape: Rebrand & Guidelines */}
              <div className="relative h-[200px] sm:h-[245px] lg:h-[295px] rounded-3xl overflow-hidden shadow-card border border-border-soft/60 bg-bg-subtle">
                <Image
                  src={rebrandImage}
                  alt={`${project.title} rebrand guidelines`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Bottom Landscape: Desktop Interface */}
              <div className="relative h-[200px] sm:h-[245px] lg:h-[295px] rounded-3xl overflow-hidden shadow-card border border-border-soft/60 bg-bg-subtle">
                <Image
                  src={desktopImage}
                  alt={`${project.title} desktop display`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* Deep Dive Content & Metadata Grid (Matching Mockup 2) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: The Goal & Challenges (7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              {/* Section: The Goal */}
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-xl text-dark-slate">◎</span>
                  <h2 className="text-2xl font-bold text-dark-slate tracking-tight">
                    The Goal
                  </h2>
                </div>
                <p className="text-base text-muted-slate leading-relaxed">
                  {project.goal ||
                    "The primary objective was to design an intuitive, serene mobile experience that demystifies mindfulness for beginners while providing depth for advanced practitioners. We aimed to create an interface that felt less like a utility and more like a quiet sanctuary, utilizing generous whitespace and fluid transitions to reduce cognitive load."}
                </p>
              </div>

              {/* Section: Challenges */}
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-xl text-dark-slate">⚲</span>
                  <h2 className="text-2xl font-bold text-dark-slate tracking-tight">
                    Challenges
                  </h2>
                </div>
                <p className="text-base text-muted-slate leading-relaxed">
                  {project.challenges ||
                    "Balancing data-rich tracking features with a minimalist aesthetic proved challenging. The user needed to see detailed analytics without feeling overwhelmed. We solved this by implementing progressive disclosure patterns and utilizing subtle ambient shadows to create clear visual hierarchies without resorting to harsh borders."}
                </p>
              </div>
            </div>

            {/* Right Column: Metadata Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: My Role */}
              <div className="bg-white rounded-2xl p-6 border border-border-soft shadow-sm">
                <h3 className="text-lg font-bold text-dark-slate mb-4">
                  My Role
                </h3>
                <ul className="space-y-2.5">
                  {roleList.map((roleItem) => (
                    <li
                      key={roleItem}
                      className="flex items-center gap-2.5 text-sm text-dark-slate"
                    >
                      <span className="w-1.5 h-1.5 rounded-full border border-dark-slate/60" />
                      <span>{roleItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2: Tech Stack */}
              <div className="bg-white rounded-2xl p-6 border border-border-soft shadow-sm">
                <h3 className="text-lg font-bold text-dark-slate mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="default"
                      className="px-3.5 py-1.5 text-xs font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Card 3: Action Links (Live Demo & GitHub) */}
              <div className="bg-white rounded-2xl p-6 border border-border-soft shadow-sm space-y-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-full flex items-center justify-center gap-2
                      px-6 py-3 text-sm font-semibold text-white
                      bg-[#6E4D58] hover:bg-deep-rose
                      rounded-xl shadow-sm hover:shadow
                      transition-all duration-200 active:scale-[0.98]
                    "
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-full flex items-center justify-center gap-2
                      px-6 py-3 text-sm font-semibold text-dark-slate
                      bg-white border border-soft-pink hover:bg-light-pink
                      rounded-xl transition-all duration-200 active:scale-[0.98]
                    "
                  >
                    <Code2 className="w-4 h-4" />
                    <span>GitHub Repo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
