import Link from "next/link";

const footerNavLinks = [
  { href: "https://linkedin.com/in/tasya", label: "LinkedIn" },
  { href: "https://github.com/tasya", label: "GitHub" },
  { href: "https://instagram.com/tasya", label: "Instagram" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-footer-tint border-t border-border-soft/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-dark-slate tracking-tight hover:text-deep-rose transition-colors"
          >
            Tasya
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            {footerNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-sm text-muted-slate hover:text-dark-slate transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-slate">
            © {new Date().getFullYear()} Tasya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
