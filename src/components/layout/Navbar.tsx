"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full transition-all duration-300
        ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-border-soft/50"
            : "bg-white border-b border-border-soft"
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-deep-rose tracking-tight hover:text-plum transition-colors"
          >
            Tasya
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative text-sm font-medium transition-colors duration-200
                  ${
                    isActive(link.href)
                      ? "text-dark-slate"
                      : "text-muted-slate hover:text-dark-slate"
                  }
                `}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-deep-rose rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Admin Login Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <Link
              href="/admin/login"
              className="
                px-5 py-2 text-sm font-semibold text-white
                bg-plum rounded-full
                hover:bg-deep-rose hover:shadow-md
                transition-all duration-200
                active:scale-[0.97]
              "
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-dark-slate hover:text-deep-rose transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border-soft"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      block px-4 py-3 text-sm font-medium rounded-xl transition-colors
                      ${
                        isActive(link.href)
                          ? "bg-light-pink text-deep-rose"
                          : "text-muted-slate hover:bg-bg-subtle hover:text-dark-slate"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 px-4">
                  <Link
                    href="/admin/login"
                    className="
                      block w-full text-center px-5 py-2.5 text-sm font-semibold text-white
                      bg-plum rounded-xl
                      hover:bg-deep-rose transition-all duration-200
                    "
                  >
                    Admin Login
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
