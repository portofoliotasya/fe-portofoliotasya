import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Tasya Portfolio — UI/UX Designer",
    template: "%s | Tasya Portfolio",
  },
  description:
    "I'm a UI Designer focused on creating clean, intuitive, and modern digital experiences. Explore my portfolio of beautiful interfaces and creative projects.",
  keywords: [
    "UI Designer",
    "UX Designer",
    "Portfolio",
    "Tasya",
    "Web Design",
    "Digital Experience",
  ],
  authors: [{ name: "Tasya" }],
  openGraph: {
    title: "Tasya Portfolio — UI/UX Designer",
    description:
      "Explore the portfolio of Tasya, a UI Designer creating clean, intuitive, and modern digital experiences.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
