import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { Badge } from "@/components/ui";
import { MOCK_PROJECTS } from "@/data/mock-projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore all design projects, case studies, and digital experiences created by Tasya.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-slate tracking-tight">
              All Projects
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-slate leading-relaxed">
              A curated collection of UI/UX designs, web applications, and
              interactive brand identities.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {MOCK_PROJECTS.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group block bg-white rounded-3xl overflow-hidden border border-border-soft shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="relative h-64 sm:h-72 w-full bg-bg-subtle overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-dark-slate group-hover:text-deep-rose transition-colors">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-slate line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
