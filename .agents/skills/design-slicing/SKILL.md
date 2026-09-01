---
name: design-slicing
description: >-
  Use this skill when slicing UI components and pages from design mockups and PRD specifications
  for the Tasya Portfolio frontend, ensuring 100% visual fidelity, responsive layouts, and proper styling tokens.
---

# Design Slicing & Visual Fidelity Skill

This skill provides the comprehensive design system, visual specifications, color tokens, layout hierarchy, and component rules required to achieve pixel-perfect fidelity with the Tasya Portfolio design mockups and PRD V1.1.

---

## 1. Design Tokens & Color Palette

Adhere strictly to the color palette specified in PRD V1.1 and the visual mockups:

| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| **Clean White** | `#FFFFFF` | Primary background, card background, input fields |
| **Soft Modern Pink** | `#FFD1DC` / `#FEE4EC` | Badge pill backgrounds, hover states, active indicators |
| **Rose Accent** | `#E85A70` | Secondary accent, interactive icons, active link underlines |
| **Plum / Deep Rose** | `#8B3A4A` / `#9B334B` | Primary CTA buttons ("View Work", "Admin Login"), Dark pill buttons |
| **Dark Slate Grey** | `#2D3748` | Primary headings, body copy, form labels |
| **Muted Slate** | `#718096` | Subtitles, helper texts, inactive breadcrumbs |
| **Border Soft** | `#E2E8F0` / `#EDF2F7` | Form inputs, card borders, separators |
| **Footer Tint** | `#EEF3FB` | Soft lavender/blue-gray tint for the global footer section |

### Typography Guidelines
- **Primary Font**: Modern Sans-Serif (Inter, Plus Jakarta Sans, or Outfit).
- **Headings**: SemiBold to Bold (`font-semibold` / `font-bold`), letter-spacing tight.
- **Body**: Regular (`font-normal`), line-height relaxed (`leading-relaxed`), text color `#2D3748`.

---

## 2. Layouts & Pages Specification

### A. Global Navigation Header
- **Logo**: "Tasya" on the left (`text-2xl font-bold text-[#8B3A4A]`).
- **Nav Links**: "Home", "Projects", "Contact" centered. Active link has an underline indicator (`border-b-2 border-[#8B3A4A]`).
- **Action Button**: "Admin Login" on the far right (rounded pill, deep rose `#8B3A4A`, text white, hover effect with subtle shadow).
- **Sticky / Header Behavior**: Glassmorphism backdrop blur on scroll (`backdrop-blur-md bg-white/90 sticky top-0 z-50`).

---

### B. Landing Page (`/`)
1. **Hero Section**:
   - **Left Column**:
     - Headline: `Welcome to Tasya Portfolio` (Display font, bold `#2D3748`, responsive `text-4xl md:text-6xl`).
     - Bio: Crisp paragraph summarizing Tasya's focus on clean, intuitive, and modern digital experiences.
     - Action Buttons (Flex row):
       - Primary: `View Work` (Pill button, bg `#9B334B`, text white, subtle scale on hover).
       - Secondary: `Get in Touch` (Pill button, border `border-[#FFD1DC]`, text `#9B334B`, hover bg `#FFF0F3`).
   - **Right Column**:
     - Circular Framed Portrait: High-resolution professional portrait of Tasya in a circular mask with subtle outer glow/shadow.
2. **Featured Projects Section**:
   - Headline: `Featured Projects` (`text-2xl md:text-3xl font-bold text-[#2D3748] mb-8`).
   - **Grid Architecture**:
     - Large Main Card (Left/Span): Laptop showcase displaying hero project (e.g., "Fintech Dashboard Revamp"), tags (`Figma`, `UI/UX`), title overlay.
     - Stacked Cards (Right):
       - Card 1: E-Commerce App (Mobile screen mockup, tag `React Native`).
       - Card 2: Agency Website (Desktop screen mockup, tags `Next.js`, `Tailwind`).
   - Card Hover Effect: Subtle image zoom (`scale-105 transition-transform duration-300`) and shadow elevation.

---

### C. Project Detail Page (`/projects/[id]`)
1. **Header & Navigation**:
   - `← Back to Projects` link leading back to the home/projects view with smooth transition.
2. **Title & Subtitle**:
   - Large bold title (e.g. `Aura Wellness App`).
   - Subtitle with muted tone explaining the project scope.
3. **Media Showcase (3-Image Gallery Grid)**:
   - Left / Featured: Large vertical aspect ratio mockup (e.g., iPhone mobile mockups on pedestal).
   - Right: Two stacked landscape cards (e.g., Branding stationery mockup + Desktop monitor mockup).
   - Rounded corners (`rounded-2xl`), subtle border and clean shadow.
4. **Detail Content (2-Column Grid)**:
   - **Left Column (Story & Problem Solving)**:
     - Section `◎ The Goal`: Icon + Heading + thorough explanation of objectives.
     - Section `⚲ Challenges`: Icon + Heading + deep dive into challenges overcome.
   - **Right Column (Metadata Cards)**:
     - Card `My Role`: Bullet points (`Lead UI/UX Designer`, `Interaction Design`, `Design Systems`).
     - Card `Tech Stack`: Rounded pill badges with soft pink background (`#FDE8EC` / `#FFD1DC`).
     - Card `Project Links`:
       - `Live Demo` button (Maroon pill `#6E4D58`, external link icon, white text).
       - `GitHub Repo` button (White pill, pink outline `border-[#FFD1DC]`, code icon).

---

### D. Contact Page (`/contact`)
1. **Headline**:
   - `Let's Create Together` (Bold display font).
   - Supporting subtitle: *"Whether you have a specific project in mind or just want to explore possibilities, I'm here to help translate your vision into a refined digital experience."*
2. **Card Container**:
   - Elevated clean white card (`bg-white rounded-3xl shadow-xl p-8 md:p-12`).
   - **Left Column (Contact Info)**:
     - Title: `Contact Info` (`text-xl font-bold text-[#2D3748]`).
     - Email: Mail icon with `hello@tasya.design`.
     - Location: Map pin icon with `San Francisco, CA`.
     - Social Connect icons: Links for portfolio/web, GitHub, Instagram.
   - **Right Column (Interactive Form)**:
     - Name & Email (2-column row).
     - WhatsApp (Optional) & Company (Optional) (2-column row).
     - Project Type (Dropdown select with options: Web Application, Mobile App, UI/UX Design, Branding).
     - Estimated Budget (Dropdown select: `< $5,000`, `$5,000 - $10,000`, `> $10,000`).
     - Project Details (Textarea with 4-5 lines).
     - Submit Button: `Send Message` with paper plane icon, gradient rose background (`from-[#E85A70] to-[#D64560]`), white text.
3. **Feedback UI**:
   - Success Toast with checkmark on 201 response.
   - Inline error messages below input fields on validation failure.

---

### E. Admin CMS Pages
1. **Admin Login (`/admin/login`)**:
   - Minimalist centered card with email, password fields, and submit button.
   - Clear validation and error alerts for invalid credentials.
2. **Admin Dashboard (`/admin/dashboard`)**:
   - Summary statistics (Total Projects, Total Inquiries).
   - Project Management Table: Thumbnail, Title, Tech Stack, Actions (Edit, Delete).
   - Add/Edit Project Modal: Title, Description, Goal, Challenges, Role, Tech Stack (tag input), Demo URL, Repo URL, Media Uploader with image preview.
   - Soft Delete Confirmation Modal: Explicit prompt before calling `DELETE /api/projects/{id}`.
   - Inquiries Inbox: View table of all received contact submissions with date and contact info.

---

### F. Global Footer
- Background: Soft lavender/blue tint (`#EEF3FB`).
- Left: Logo `Tasya`.
- Center: `© 2024 Tasya. All rights reserved.`.
- Right: Social links (`LinkedIn`, `GitHub`, `Instagram`, `Contact`).

---

## 3. Slicing Verification Checklist

- [ ] Match exact typography size, weights, and letter spacings.
- [ ] Ensure all corner radii are consistent (`rounded-xl` for inputs/badges, `rounded-2xl` for cards, `rounded-3xl` for main hero containers).
- [ ] Verify hover and active micro-interactions using Framer Motion.
- [ ] Test layout responsiveness at 375px (mobile), 768px (tablet), and 1440px (desktop).
- [ ] Never use low-resolution placeholder images; use generated clean mockups or SVG placeholders.
