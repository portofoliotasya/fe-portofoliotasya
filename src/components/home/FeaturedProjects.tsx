"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/types/api";

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Select hero project and secondary projects
  const mainProject = projects[0] || {
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    title: "Fintech Dashboard Revamp",
    thumbnail: "/images/project_fintech.jpg",
    techStack: ["Figma", "UI/UX"],
  };

  const ecommerceProject = projects[2] || {
    id: "b3d4e5f6-2c3d-4e5f-6a7b-8c9d0e1f2a3b",
    title: "E-Commerce App",
    thumbnail: "/images/project_ecommerce.jpg",
    techStack: ["React Native"],
  };

  const agencyProject = projects[3] || {
    id: "c4e5f6a7-3d4e-5f6a-7b8c-9d0e1f2a3b4c",
    title: "Agency Website",
    thumbnail: "/images/project_agency.jpg",
    techStack: ["Next.js, Tailwind"],
  };

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-dark-slate tracking-tight mb-8 sm:mb-12">
            Featured Projects
          </h2>
        </motion.div>

        {/* Bento Grid Layout matching Mockup 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Hero Project Card (Left Column - 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <Link
              href={`/projects/${mainProject.id}`}
              className="group block relative h-[380px] sm:h-[460px] lg:h-[540px] rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 bg-bg-subtle"
            >
              {/* Background Mockup Image */}
              <Image
                src={mainProject.thumbnail}
                alt={mainProject.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Gradient Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-slate/90 via-dark-slate/30 to-transparent pointer-events-none" />

              {/* Card Footer Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {mainProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-white/90 text-dark-slate rounded-full backdrop-blur-sm shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-soft-pink transition-colors">
                  {mainProject.title}
                </h3>
              </div>
            </Link>
          </motion.div>

          {/* Stacked Cards (Right Column - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {/* Top Card: E-Commerce App */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <Link
                href={`/projects/${ecommerceProject.id}`}
                className="group block relative h-[220px] sm:h-[255px] rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 bg-bg-subtle border border-border-soft/60"
              >
                <Image
                  src={ecommerceProject.thumbnail}
                  alt={ecommerceProject.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />

                {/* Clean Bottom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-dark-slate group-hover:text-deep-rose transition-colors">
                    {ecommerceProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-slate mt-0.5">
                    {Array.isArray(ecommerceProject.techStack)
                      ? ecommerceProject.techStack.join(", ")
                      : ecommerceProject.techStack}
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Bottom Card: Agency Website */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-1"
            >
              <Link
                href={`/projects/${agencyProject.id}`}
                className="group block relative h-[220px] sm:h-[255px] rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 bg-bg-subtle border border-border-soft/60"
              >
                <Image
                  src={agencyProject.thumbnail}
                  alt={agencyProject.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />

                {/* Clean Bottom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-dark-slate group-hover:text-deep-rose transition-colors">
                    {agencyProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-slate mt-0.5">
                    {Array.isArray(agencyProject.techStack)
                      ? agencyProject.techStack.join(", ")
                      : agencyProject.techStack}
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
