import { Mail, MapPin, Globe, CodeXml, Camera } from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { ToastProvider } from "@/components/ui/Toast";
import ContactForm from "./ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tasya for project inquiries, collaborations, or design consultations.",
};

export default function ContactPage() {
  return (
    <ToastProvider>
      <Navbar />
      <main className="flex-1 py-12 md:py-20 bg-bg-subtle/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Subtitle matching Mockup 1 */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-dark-slate tracking-tight">
              Let&apos;s Create <br className="hidden sm:inline" />
              Together
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-slate leading-relaxed">
              Whether you have a specific project in mind or just want to explore
              possibilities, I&apos;m here to help translate your vision into a
              refined digital experience.
            </p>
          </div>

          {/* Main Elevated Card Container (Split Layout) */}
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-border-soft overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border-soft">
              {/* Left Column: Contact Info Card (5 cols) */}
              <div className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between bg-white">
                <div>
                  <h2 className="text-xl font-bold text-dark-slate mb-8">
                    Contact Info
                  </h2>

                  <div className="space-y-6">
                    {/* Email */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-light-pink flex items-center justify-center text-deep-rose flex-shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <a
                          href="mailto:hello@tasya.design"
                          className="text-sm font-medium text-dark-slate hover:text-deep-rose transition-colors"
                        >
                          hello@tasya.design
                        </a>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-light-pink flex items-center justify-center text-deep-rose flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dark-slate">
                          San Francisco, CA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Connect Icons */}
                <div className="pt-10">
                  <p className="text-xs font-semibold text-muted-slate uppercase tracking-wider mb-4">
                    Connect
                  </p>
                  <div className="flex items-center gap-4 text-dark-slate">
                    <a
                      href="https://tasya.design"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-light-pink hover:text-deep-rose transition-colors"
                      aria-label="Website"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                    <a
                      href="https://github.com/tasya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-light-pink hover:text-deep-rose transition-colors"
                      aria-label="GitHub"
                    >
                      <CodeXml className="w-5 h-5" />
                    </a>
                    <a
                      href="https://instagram.com/tasya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-light-pink hover:text-deep-rose transition-colors"
                      aria-label="Instagram"
                    >
                      <Camera className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Contact Form (8 cols) */}
              <div className="lg:col-span-8 p-8 sm:p-10 bg-white">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ToastProvider>
  );
}
