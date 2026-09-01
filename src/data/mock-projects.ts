import type { Project } from "@/types/api";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    title: "Fintech Dashboard Revamp",
    description:
      "A modern dashboard offering analytics, investments, and assets allocation views with intuitive financial data visualization.",
    goal: "To transform complex portfolio performance data into serene, easy-to-digest visual metrics that empower confident investment decisions.",
    challenges:
      "Balancing data-rich tracking features with a minimalist aesthetic was challenging. Solved by progressive disclosure and subtle card grouping.",
    role: "Lead UI/UX Designer",
    thumbnail: "/images/project_fintech.jpg",
    techStack: ["Figma", "UI/UX", "Next.js", "Tailwind"],
    demoUrl: "https://fintech-demo.tasya.design",
    repoUrl: "https://github.com/tasya/fintech-dashboard",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "a2c3e4f5-1b2c-3d4e-5f6a-7b8c9d0e1f2a",
    title: "Aura Wellness App",
    description:
      "A holistic digital platform connecting users with mindful practices and personalized wellness journeys.",
    goal: "The primary objective was to design an intuitive, serene mobile experience that demystifies mindfulness for beginners while providing depth for advanced practitioners. We aimed to create an interface that felt less like a utility and more like a quiet sanctuary, utilizing generous whitespace and fluid transitions to reduce cognitive load.",
    challenges:
      "Balancing data-rich tracking features with a minimalist aesthetic proved challenging. The user needed to see detailed analytics without feeling overwhelmed. We solved this by implementing progressive disclosure patterns and utilizing subtle ambient shadows to create clear visual hierarchies without resorting to harsh borders.",
    role: "Lead UI/UX Designer\nInteraction Design\nDesign Systems",
    thumbnail: "/images/aura_hero_phone.jpg",
    techStack: ["Figma", "Protopie", "React Native", "Tailwind"],
    demoUrl: "https://aura-demo.tasya.design",
    repoUrl: "https://github.com/tasya/aura-wellness",
    createdAt: "2024-02-10T08:00:00Z",
    updatedAt: "2024-02-18T16:00:00Z",
  },
  {
    id: "b3d4e5f6-2c3d-4e5f-6a7b-8c9d0e1f2a3b",
    title: "E-Commerce App",
    description:
      "High-conversion mobile shopping experience tailored for sustainable fashion and luxury handcrafted goods.",
    goal: "Create a seamless and immersive checkout flow that decreases abandonment rate while retaining a boutique catalog aesthetic.",
    challenges:
      "Maintaining swift response times on mobile image galleries and building fluid touch gestures for quick-filtering and item variant selection.",
    role: "Product Designer & Frontend Engineer",
    thumbnail: "/images/project_ecommerce.jpg",
    techStack: ["React Native", "Tailwind", "Figma"],
    demoUrl: "https://ecommerce-demo.tasya.design",
    repoUrl: "https://github.com/tasya/ecommerce-app",
    createdAt: "2024-03-01T12:00:00Z",
    updatedAt: "2024-03-10T11:00:00Z",
  },
  {
    id: "c4e5f6a7-3d4e-5f6a-7b8c-9d0e1f2a3b4c",
    title: "Agency Website",
    description:
      "Brand storytelling and creative portfolio site built for a forward-thinking digital strategy and design collective.",
    goal: "Elevate brand perception through editorial typography, smooth scroll-triggered storytelling, and clean interactive case studies.",
    challenges:
      "Optimizing rich image mockups and interactive animations for near-instant load times across both mobile and desktop viewports.",
    role: "Lead Creative Designer",
    thumbnail: "/images/project_agency.jpg",
    techStack: ["Next.js", "Tailwind", "Framer Motion"],
    demoUrl: "https://agency-demo.tasya.design",
    repoUrl: "https://github.com/tasya/agency-website",
    createdAt: "2024-04-05T09:00:00Z",
    updatedAt: "2024-04-12T15:00:00Z",
  },
];
