"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark-slate tracking-tight leading-[1.15]">
              Welcome to <br />
              <span className="text-dark-slate">Tasya Portfolio</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-muted-slate leading-relaxed max-w-xl">
              I&apos;m a UI Designer focused on creating clean, intuitive, and
              modern digital experiences. With a background in creative
              collaborations, I blend aesthetics with usability to build
              interfaces that feel both premium and accessible.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="#projects"
                className="
                  inline-flex items-center justify-center
                  px-7 py-3 text-sm font-semibold text-white
                  bg-plum rounded-full shadow-md
                  hover:bg-deep-rose hover:shadow-lg
                  active:scale-[0.98] transition-all duration-200
                "
              >
                View Work
              </Link>
              <Link
                href="/contact"
                className="
                  inline-flex items-center justify-center
                  px-7 py-3 text-sm font-semibold text-plum
                  bg-white border-2 border-soft-pink rounded-full
                  hover:bg-light-pink hover:border-rose-accent
                  active:scale-[0.98] transition-all duration-200
                "
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>

          {/* Right Circular Portrait Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Soft decorative background glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-soft-pink/40 to-light-pink/20 blur-2xl transform scale-105 pointer-events-none" />

              {/* Masked Circular Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/hero_portrait.jpg"
                  alt="Tasya - UI/UX Designer"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 288px, 384px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
